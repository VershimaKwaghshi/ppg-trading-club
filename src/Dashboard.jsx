import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import TraderDashboard from './components/TraderDashboard';
import ManagerDashboard from './components/ManagerDashboard';
import AdminDashboard from './components/AdminDashboard';

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAndLinkProfile() {
      try {
        setLoading(true);
        
        // 1. Retrieve current active user session from Supabase Auth
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
          navigate('/login');
          return;
        }

        // 2. Fetch the corresponding profile row using the authenticated user ID
        const { data: dbProfile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileError) throw profileError;

        // 3. Strict mapping bridge: Combines auth metadata and database columns 
        // to match exactly what your child dashboards read.
        const connectedProfile = {
          id: dbProfile.id,
          role: dbProfile.role || 'trader',
          full_name: dbProfile.full_name || 'Club Member',
          email: user.email || dbProfile.email,
          
          // Map potential variations in column naming schemas to secure data flow
          status: dbProfile.status || dbProfile.account_status || 'active',
          referral_code: dbProfile.referral_code || dbProfile.group_id || 'Ppg0028',
          kyc_status: dbProfile.kyc_status || dbProfile.kyc || 'VERIFIED'
        };

        setProfile(connectedProfile);
      } catch (err) {
        console.error('Data Propagation Intercept Error:', err);
        setError('Failed to establish profile data connection.');
      } finally {
        setLoading(false);
      }
    }

    fetchAndLinkProfile();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#02040a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c4a050', fontFamily: 'sans-serif' }}>
        <div style={{ letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '11px', fontWeight: '700' }}>
          Syncing Core Terminal Network...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#02040a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444', fontFamily: 'sans-serif', padding: '24px' }}>
        <div style={{ textTransform: 'uppercase', fontSize: '11px', fontWeight: '700', border: '1px solid #ef4444', padding: '20px', borderRadius: '4px' }}>
          {error}
        </div>
      </div>
    );
  }

  // 4. Component Routing: Passes the verified connectedProfile object forward
  const currentRole = profile?.role?.toLowerCase();

  if (currentRole === 'admin') {
    return <AdminDashboard profile={profile} onLogout={handleLogout} />;
  }

  if (currentRole === 'manager') {
    return <ManagerDashboard profile={profile} onLogout={handleLogout} />;
  }

  // Default fallback routing node ensures uninterrupted trader workspace visualization
  return <TraderDashboard profile={profile} onLogout={handleLogout} />;
}
