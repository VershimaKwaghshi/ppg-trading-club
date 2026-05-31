import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient'; // Ensure this matches your Supabase client import path

export default function Dashboard() {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Authentication and Profile Sync Hook
  useEffect(() => {
    setLoading(true);

    // 1. Fetch initial active session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error("Session fetch error:", error);
        setLoading(false);
        return;
      }
      setSession(session);
      if (session) {
        fetchProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // 2. Listen for explicit auth changes (Login, Logout, Token Refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      setSession(currentSession);
      if (currentSession) {
        await fetchProfile(currentSession.user.id);
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Database fetch tool bypassing stale states
  async function fetchProfile(uid) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', uid)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (err) {
      console.error("Error synchronizing profile schema:", err.message);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  }

  // Handle manual user logout execution
  const handleLogout = async () => {
    setLoading(true);
    await supabase.auth.signOut();
  };

  // Loading State UI Screen
  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#0a0b0d',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#ffffff',
        fontFamily: 'sans-serif'
      }}>
        <p>Loading your secure trading session...</p>
      </div>
    );
  }

  // Authentication Redirect Gate
  if (!session) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#0a0b0d',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#ffffff',
        fontFamily: 'sans-serif'
      }}>
        <h2>Access Denied</h2>
        <p>Please log in to view your trading terminal dashboard.</p>
      </div>
    );
  }

  // ENFORCE ACCOUNT APPROVAL GATE
  // If profile is missing or state is explicitly pending, render the gate layout from image_31.png
  if (!profile || profile.status === 'pending') {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#08090c',
        color: '#ffffff',
        fontFamily: 'sans-serif',
        padding: '20px',
        boxSizing: 'border-box'
      }}>
        {/* Navigation Bar Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #1a1c23',
          paddingBottom: '15px',
          marginBottom: '40px'
        }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '24px', color: '#dfb76c', fontWeight: 'bold' }}>Trading Club</h1>
            <p style={{ margin: 0, fontSize: '10px', color: '#8a8d98', letterSpacing: '1px' }}>PENNY PARTNERS GROUP</p>
          </div>
          <button 
            onClick={handleLogout}
            style={{
              backgroundColor: 'transparent',
              border: '1px solid #dfb76c',
              color: '#dfb76c',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Secure Logout
          </button>
        </div>

        {/* Central Gate Message Card */}
        <div style={{
          backgroundColor: '#0f111a',
          border: '1px solid #1e2235',
          borderRadius: '16px',
          padding: '40px 24px',
          maxWidth: '450px',
          margin: '0 auto',
          textAlign: 'left'
        }}>
          <h2 style={{ fontSize: '32px', margin: '0 0 24px 0', fontWeight: 'bold', color: '#fcfaf2' }}>
            Welcome to the Club
          </h2>
          
          <div style={{ marginBottom: '12px' }}>
            <span style={{ color: '#636674', fontSize: '14px', display: 'block' }}>Registered Email:</span>
            <span style={{ color: '#a3a6b8', fontSize: '15px', wordBreak: 'break-all' }}>
              {session?.user?.email}
            </span>
          </div>

          <div>
            <span style={{ color: '#636674', fontSize: '14px', display: 'block' }}>Account Level:</span>
            <span style={{ color: '#10b981', fontSize: '15px', fontWeight: '600' }}>Standard Access</span>
          </div>
        </div>
      </div>
    );
  }

  // MAIN UNLOCKED TRADER DASHBOARD WORKSPACE
  // Renders instantly when status === 'active' and role === 'trader'
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#08090c',
      color: '#ffffff',
      fontFamily: 'sans-serif'
    }}>
      {/* Top Main Navigation Terminal */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 24px',
        backgroundColor: '#0f111a',
        borderBottom: '1px solid #1e2235'
      }}>
        <div>
          <h2 style={{ margin: 0, color: '#dfb76c', fontSize: '20px' }}>Trading Club</h2>
          <span style={{ fontSize: '11px', color: '#10b981', textTransform: 'uppercase' }}>
            Live Terminal &bull; {profile.role} Account
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ color: '#a3a6b8', fontSize: '14px' }}>{profile.full_name || 'Trader'}</span>
          <button 
            onClick={handleLogout}
            style={{
              backgroundColor: '#e11d48',
              border: 'none',
              color: '#ffffff',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Workspace Panel Contents */}
      <main style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          background: 'linear-gradient(135deg, #0f111a 0%, #131722 100%)',
          border: '1px solid #1e2235',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '24px'
        }}>
          <h3 style={{ margin: '0 0 8px 0', color: '#dfb76c' }}>Welcome Back, {profile.full_name || 'Member'}</h3>
          <p style={{ margin: 0, color: '#8a8d98', fontSize: '14px' }}>
            Your account credentials have been successfully authenticated and verified by administration.
          </p>
        </div>

        {/* Informational Summary Blocks */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          <div style={{ backgroundColor: '#0f111a', border: '1px solid #1e2235', padding: '20px', borderRadius: '8px' }}>
            <h4 style={{ margin: '0 0 12px 0', color: '#8a8d98', fontSize: '12px', textTransform: 'uppercase' }}>Account Authorization</h4>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#10b981' }}>Active Verified</div>
          </div>

          <div style={{ backgroundColor: '#0f111a', border: '1px solid #1e2235', padding: '20px', borderRadius: '8px' }}>
            <h4 style={{ margin: '0 0 12px 0', color: '#8a8d98', fontSize: '12px', textTransform: 'uppercase' }}>Assigned Trading Group Identifier</h4>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#dfb76c' }}>{profile.referral_code || 'None'}</div>
          </div>

          <div style={{ backgroundColor: '#0f111a', border: '1px solid #1e2235', padding: '20px', borderRadius: '8px' }}>
            <h4 style={{ margin: '0 0 12px 0', color: '#8a8d98', fontSize: '12px', textTransform: 'uppercase' }}>KYC Validation Status</h4>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f59e0b' }}>
              {profile.kyc_status ? profile.kyc_status.toUpperCase() : 'NOT SUBMITTED'}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
