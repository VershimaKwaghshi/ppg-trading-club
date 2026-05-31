// src/components/Dashboard.jsx — The Central Switchboard Router
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import AdminDashboard from './AdminDashboard';
import ManagerDashboard from './ManagerDashboard';
import TraderDashboard from './TraderDashboard';

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        window.location.href = '/login';
        return;
      }

      // Read role and user profile traits from the authenticated database stream
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      
      // Inject authentic fallback email if missing from the profile structure
      if (data && !data.email) {
        data.email = user.email;
      }

      setProfile(data);
    } catch (err) {
      console.error('System Routing Intercept Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#02040a', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#c4a050', fontFamily: 'Georgia, serif', fontStyle: 'italic', letterSpacing: '0.05em' }}>
        Synchronizing Secure Terminal Connection...
      </div>
    );
  }

  // Multi-tenant operational switchboard router
  if (profile?.role === 'admin') {
    return <AdminDashboard profile={profile} onLogout={handleLogout} />;
  }

  if (profile?.role === 'manager') {
    return <ManagerDashboard profile={profile} onLogout={handleLogout} />;
  }

  // Fallback defaults natively to the institutional Trader Workspace Terminal
  return <TraderDashboard profile={profile} onLogout={handleLogout} refreshProfile={fetchUserProfile} />;
}
