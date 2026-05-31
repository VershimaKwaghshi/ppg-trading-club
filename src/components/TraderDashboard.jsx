// TraderDashboard.jsx — PPG Trading Club Member Layout

import React from 'react';

const C = {
  bg:       '#050814',
  bg2:      '#070a1a',
  bg3:      '#0a0d1e',
  border:   'rgba(196,160,80,0.12)',
  gold:     '#c4a050',
  text:     '#f0e8d0',
  muted:    '#7878a0',
};

export default function TraderDashboard({ profile, onLogout, refreshProfile }) {
  return (
    <div style={{ minHeight: '100vh', background: C.bg, color: C.text, fontFamily: 'sans-serif' }}>
      
      {/* Top Header Rail */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', borderBottom: `1px solid ${C.border}`, background: C.bg2 }}>
        <div>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '20px', color: C.gold, fontStyle: 'italic' }}>PPG Trading Club</h1>
          <p style={{ fontSize: '11px', color: C.muted, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Trader Workspace</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '13px', color: C.text }}>{profile.full_name}</span>
          <button onClick={onLogout} style={{ background: 'transparent', border: `1px solid ${C.border}`, borderRadius: '6px', color: C.gold, padding: '6px 12px', cursor: 'pointer', fontSize: '12px', fontWeight: 700 }}>
            Secure Logout
          </button>
        </div>
      </header>

      {/* Main Trading Workspace Layout */}
      <main style={{ padding: '32px 24px', maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        
        {/* Terminal Left Panel: Charts and Core Infrastructure */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ background: C.bg3, border: `1px solid ${C.border}`, borderRadius: '12px', padding: '24px' }}>
            <h3 style={{ color: C.gold, marginBottom: '12px', fontSize: '14px', textTransform: 'uppercase' }}>Market Terminal</h3>
            <div style={{ height: '300px', background: C.bg, borderRadius: '8px', border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.muted }}>
              [ Trading Chart Engine Terminal Placement ]
            </div>
          </div>
        </section>

        {/* Terminal Right Panel: Metrics & Position Attributes */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ background: C.bg3, border: `1px solid ${C.border}`, borderRadius: '12px', padding: '24px' }}>
            <h3 style={{ color: C.gold, marginBottom: '16px', fontSize: '14px', textTransform: 'uppercase' }}>Account Execution</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: `1px solid ${C.border}`, paddingBottom: '8px' }}>
                <span style={{ color: C.muted, fontSize: '13px' }}>Identity Status:</span>
                <span style={{ color: C.text, fontSize: '13px', fontWeight: 700 }}>Verified Trader</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: `1px solid ${C.border}`, paddingBottom: '8px' }}>
                <span style={{ color: C.muted, fontSize: '13px' }}>Registered Email:</span>
                <span style={{ color: C.text, fontSize: '13px' }}>{profile.email}</span>
              </div>
            </div>
          </div>
        </aside>

      </main>
    </div>
  );
}
