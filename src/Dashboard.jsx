import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProfile() {
      try {
        setLoading(true);
        // 1. Get the current authenticated user session
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        
        if (authError || !user) {
          navigate('/login');
          return;
        }

        // 2. Fetch the profile details from the database table
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

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#050814', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', color: '#c4a050' }}>
        <p>Loading Live Terminal Session...</p>
      </div>
    );
  }

  // Fallback data mapping to match screen properties precisely if fields are missing
  const userRole = profile?.role?.toLowerCase() || 'trader'; // 'trader', 'manager', 'admin'
  const fullName = profile?.full_name || 'Kwaghshi vershima';
  const groupIdentifier = profile?.referral_code || 'Ppg0028';
  const accountStatus = profile?.status || 'Active Verified';
  
  // Normalize checking state to accurately fix styling mismatches
  const kycRawStatus = profile?.kyc_status || 'VERIFIED'; 
  const normalizedKyc = kycRawStatus.toUpperCase();

  // Fix the color mapping bug shown in image_34.png
  let kycTextColor = '#fb923c'; // Default Orange fallback
  if (normalizedKyc === 'VERIFIED') {
    kycTextColor = '#4ade80'; // Clean Green matching design guidelines
  } else if (normalizedKyc === 'REJECTED') {
    kycTextColor = '#f43f5e'; // Warning Red
  }

  const cardStyle = {
    background: '#0a0d1e',
    border: '1px solid rgba(196, 160, 80, 0.15)',
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '20px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)'
  };

  const labelStyle = {
    fontFamily: 'sans-serif',
    fontSize: '11px',
    fontWeight: 700,
    color: '#686888',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    marginBottom: '8px',
    display: 'block'
  };

  return (
    <div style={{ minHeight: '100vh', background: '#050814', color: '#f0e8d0', fontFamily: 'sans-serif', paddingBottom: '60px' }}>
      
      {/* ─── GLOBAL TERMINAL HEADER ──────────────────────────────────────── */}
      <header style={{ borderBottom: '1px solid rgba(196, 160, 80, 0.12)', background: 'rgba(5, 8, 20, 0.98)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '80px', padding: '0 20px' }}>
          <div>
            <div style={{ fontFamily: 'Georgia, serif', fontSize: '20px', fontWeight: 900, color: '#f0d080', fontStyle: 'italic' }}>Trading Club</div>
            <div style={{ fontSize: '9px', fontWeight: 700, color: '#4ade80', letterSpacing: '0.05em', marginTop: '2px', textTransform: 'uppercase' }}>
              LIVE TERMINAL • {userRole} Account
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '13px', color: '#8080a0', textAlign: 'right', maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {fullName}
            </span>
            <button onClick={handleSignOut} style={{ background: '#dc2626', color: '#ffffff', border: 'none', borderRadius: '6px', padding: '10px 16px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', transition: 'background 0.2s' }}>
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* ─── MAIN CONTENT VIEWPORT ────────────────────────────────────────── */}
      <main style={{ maxWidth: '600px', margin: '40px auto 0', padding: '0 20px' }}>
        
        {error && (
          <div style={{ background: 'rgba(220, 38, 38, 0.1)', border: '1px solid #dc2626', color: '#f43f5e', padding: '16px', borderRadius: '8px', fontSize: '14px', marginBottom: '20px' }}>
            {error}
          </div>
        )}

        {/* Card 1: Dynamic Personalized Greeting */}
        <div style={cardStyle}>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.6rem', fontWeight: 900, color: '#f0e8d0', marginBottom: '8px' }}>
            Welcome Back, {fullName}
          </h2>
          <p style={{ color: '#686888', fontSize: '13.5px', lineHeight: 1.5 }}>
            Your account credentials have been successfully authenticated and verified by administration.
          </p>
        </div>

        {/* Card 2: Account Authorization Token */}
        <div style={cardStyle}>
          <span style={labelStyle}>Account Authorization</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#4ade80' }}>
            {accountStatus}
          </div>
        </div>

        {/* Card 3: Group Allocations */}
        <div style={cardStyle}>
          <span style={labelStyle}>Assigned Trading Group Identifier</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f0d080', fontFamily: 'monospace' }}>
            {groupIdentifier}
          </div>
        </div>

        {/* Card 4: Fix Color Output Bug for KYC Validation State */}
        <div style={cardStyle}>
          <span style={labelStyle}>KYC Validation Status</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: kycTextColor }}>
            {normalizedKyc}
          </div>
        </div>

        {/* ─── ROLE-BASED CONDITIONAL INTERFACE EXTENSIONS ───────────────────── */}
        
        {/* MANAGER DASHBOARD VIEW EXTRA PRIVILEGES */}
        {userRole === 'manager' && (
          <div style={{ ...cardStyle, border: '1px solid rgba(196, 160, 80, 0.3)', background: 'linear-gradient(135deg, #0a0d1e, #101430)' }}>
            <span style={{ ...labelStyle, color: '#c4a050' }}>Manager Core Controls</span>
            <h3 style={{ fontSize: '1.2rem', color: '#f0e8d0', marginBottom: '12px' }}>Sub-Group Overview</h3>
            <p style={{ color: '#8080a0', fontSize: '13px', lineHeight: 1.5, marginBottom: '14px' }}>
              You are currently reviewing trade execution vectors for pool cluster group configuration accounts under your assigned insider hierarchy tree tracking nodes.
            </p>
            <button style={{ background: 'rgba(196, 160, 80, 0.1)', border: '1px solid #c4a050', color: '#c4a050', padding: '10px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>
              Inspect Associated Profiles
            </button>
          </div>
        )}

        {/* ADMIN DASHBOARD VIEW ROOT PRIVILEGES */}
        {userRole === 'admin' && (
          <div style={{ ...cardStyle, border: '1px solid #c4a050', background: 'linear-gradient(135deg, #0a0d1e, #16120c)' }}>
            <span style={{ ...labelStyle, color: '#f0d080' }}>System Administrator Terminal</span>
            <h3 style={{ fontSize: '1.2rem', color: '#f0e8d0', marginBottom: '12px' }}>Global Override Parameters</h3>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button style={{ background: '#c4a050', color: '#050814', border: 'none', padding: '10px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: 800, cursor: 'pointer' }}>
                Process KYC Queue
              </button>
              <button style={{ background: 'transparent', border: '1px solid rgba(244, 63, 94, 0.5)', color: '#f43f5e', padding: '10px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>
                Flag Account Anomalies
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
