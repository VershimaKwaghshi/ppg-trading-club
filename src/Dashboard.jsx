import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient'; // Explicit lowercase file resolution matching directory configuration
import TraderDashboard from './components/TraderDashboard';
import ManagerDashboard from './components/ManagerDashboard';
import AdminDashboard from './components/AdminDashboard';

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorr, setErrorr] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProfile() {
      try {
        setLoading(true);
        
        // Resolve underlying user identity session anchor
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
          navigate('/login');
          return;
        }

        // Query database record using verified system identifier 
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileError) throw profileError;

        // Form unified data node with fallback variables
        const unifiedProfile = {
          ...profileData,
          email: user.email || profileData?.email
        };

        setProfile(unifiedProfile);
      } catch (err) {
        console.error('Core Dashboard Router Intercept Error:', err);
        setErrorr('Failed to load profile secure session.');
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#02040a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c4a050', fontFamily: 'sans-serif' }}>
        <div style={{ textAlign: 'center', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '11px', fontWeight: '700' }}>
          Initializing Secure Environment Workspace...
        </div>
      </div>
    );
  }

  if (errorr) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#02040a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444', fontFamily: 'sans-serif', padding: '24px' }}>
        <div style={{ textTransform: 'uppercase', fontSize: '11px', fontWeight: '700', border: '1px solid #ef4444', padding: '20px', borderRadius: '4px', letterSpacing: '0.05em' }}>
          {errorr}
        </div>
      </div>
    );
  }

  const userRole = profile?.role?.toLowerCase();

  if (userRole === 'admin') {
    return <AdminDashboard profile={profile} onLogout={handleLogout} />;
  }

  if (userRole === 'manager') {
    return <ManagerDashboard profile={profile} onLogout={handleLogout} />;
  }

  return <TraderDashboard profile={profile} onLogout={handleLogout} />;
}
