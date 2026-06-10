import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import OnboardingActivationFlow from './OnboardingActivationFlow';
import AdminDashboard from './AdminDashboard';

// Placeholder layouts for roles that remain unchanged
function ManagerDashboard({ profile, onLogout }) {
  return (
    <div style={{ padding: '40px', color: '#fff' }}>
      <h2>Manager Dashboard Terminal</h2>
      <button onClick={onLogout}>Disconnect</button>
    </div>
  );
}

function TraderDashboard({ profile, onLogout }) {
  return (
    <div style={{ padding: '40px', color: '#fff' }}>
      <h2>Verified Trader Active Terminal</h2>
      <p>Welcome back, {profile.full_name}. Systems operational.</p>
      <button onClick={onLogout}>Disconnect</button>
    </div>
  );
}

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfileData();
  }, []);

  async function fetchProfileData() {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No authorized session found.");

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#02040a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c4a050' }}>
        <div>Syncing Core Terminal Network...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#02040a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444' }}>
        <div>Profile record unavailable. Please verify authentication status.</div>
      </div>
    );
  }

  // Intercept unactivated user nodes before reaching core dashboard layouts
  if (profile.role === 'trader' && profile.activation_stage !== 'ACTIVE') {
    return <OnboardingActivationFlow profile={profile} onLogout={handleLogout} />;
  }

  const currentRole = profile?.role?.toLowerCase();
  if (currentRole === 'admin') return <AdminDashboard profile={profile} onLogout={handleLogout} />;
  if (currentRole === 'manager') return <ManagerDashboard profile={profile} onLogout={handleLogout} />;
  
  return <TraderDashboard profile={profile} onLogout={handleLogout} />;
}
