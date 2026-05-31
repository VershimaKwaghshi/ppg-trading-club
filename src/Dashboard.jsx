import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { useNavigate } from 'react-router-dom';

// IMPORT THE DISTRIBUTED SUB-COMPONENTS FROM YOUR FILE PATHS
import TraderDashboard from './components/TraderDashboard';
import ManagerDashboard from './components/ManagerDashboard';
import AdminDashboard from './components/AdminDashboard';

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProfile() {
      try {
        setLoading(true);
        // 1. Authenticate user logging credentials from Supabase session storage
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        
        if (authError || !user) {
          navigate('/login');
          return;
        }

        // 2. Fetch data parameters matching the current identity tracking ID
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileError) throw profileError;
        setProfile(profileData);
      } catch (err) {
        setError(err.message || 'Failed to load user profile configuration.');
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const refreshProfile = async () => {
    // Re-trigger sync protocols to fetch updated database parameters dynamically
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      if (data) setProfile(data);
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#050814', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', color: '#c4a050' }}>
        <p>Loading Live Terminal Session...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: '100vh', background: '#050814', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', color: '#f43f5e', padding: '20px' }}>
        <p>Configuration Error: {error}</p>
      </div>
    );
  }

  // Read role property parameters directly from current database configuration
  const userRole = profile?.role?.toLowerCase() || 'trader';

  // CONTROL SWITCH ROUTER: Dynamically forwards session tokens to matching layouts
  switch (userRole) {
    case 'admin':
      return (
        <AdminDashboard 
          profile={profile} 
          onLogout={handleSignOut} 
          refreshProfile={refreshProfile} 
        />
      );
    case 'manager':
      return (
        <ManagerDashboard 
          profile={profile} 
          onLogout={handleSignOut} 
          refreshProfile={refreshProfile} 
        />
      );
    case 'trader':
    default:
      return (
        <TraderDashboard 
          profile={profile} 
          onLogout={handleSignOut} 
          refreshProfile={refreshProfile} 
        />
      );
  }
}
