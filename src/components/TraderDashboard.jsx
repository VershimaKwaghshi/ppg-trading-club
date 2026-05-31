// src/components/TraderDashboard.jsx — Premium Institutional Workspace Terminal
import React from 'react';

const C = {
  bg:       '#02040a',                    // Deepest obsidian royal black
  bg2:      '#050814',                    // Matte navy panel background
  bg3:      '#0a0d1e',                    // Elevated card background
  border:   'rgba(196, 160, 80, 0.15)',   // Ultra-thin architectural gold border thread
  gold:     '#c4a050',                    // Signature PPG Premium Gold
  goldMuted:'rgba(196, 160, 80, 0.40)',   // Subdued gold text label tint
  text:     '#f4eee0',                    // High-contrast off-white reading layer
  muted:    '#7884a6',                    // Muted technical metric label
  green:    '#10b981',                    // Emerald execution validation color
  orange:   '#f59e0b',                    // Amber caution execution color
};

export default function TraderDashboard({ profile, onLogout }) {
  // Normalize verification metrics coming from the database
  const kycRawStatus = profile?.kyc_status || 'VERIFIED';
  const normalizedKyc = kycRawStatus.toUpperCase();
  const kycTextColor = normalizedKyc === 'VERIFIED' ? C.green : C.orange;

  return (
    <div style={{ minHeight: '100vh', background: C.bg, color: C.text, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', paddingBottom: '60px' }}>
      
      {/* Structural Mobile CSS Head Overrides */}
      <style>{`
        .layout-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 32px;
        }
        .header-box {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }
        .metric-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          border-bottom: 1px solid ${C.border};
          padding-bottom: 14px;
          gap: 16px;
        }
        .metric-value {
          text-align: right;
          word-break: break-all;
          font-size: 14px;
          font-weight: 600;
        }
        @media (max-width: 850px) {
          .layout-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .header-box {
            flex-direction: column !important;
            gap: 20px !important;
            text-align: center;
          }
          .metric-row {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 4px !important;
          }
          .metric-value {
            text-align: left !important;
          }
        }
      `}</style>

      {/* ─── PRIVATE CLUB BRANDING HEADER RAIL ──────────────────────────── */}
      <header style={{ padding: '24px', borderBottom: `1px solid ${C.border}`, background: C.bg2, boxShadow: '0 4px 40px rgba(0,0,0,0.5)' }}>
        <div className="header-box">
          <div>
            <h1 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: '24px', color: C.gold, fontStyle: 'italic', margin: 0, letterSpacing: '0.02em', fontWeight: '900' }}>
              PPG Trading Club
            </h1>
            <p style={{ fontSize: '10px', color: C.goldMuted, textTransform: 'uppercase', letterSpacing: '0.15em', margin: '4px 0 0 0', fontWeight: '700' }}>
              Institutional Workspace Terminal
            </p>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '10px', color: C.muted, display: 'block', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Authenticated Member</span>
              <span style={{ fontSize: '14px', color: C.text, fontWeight: '600', letterSpacing: '0.02em' }}>{profile?.full_name || 'Kwaghshi Vershima'}</span>
            </div>
            <button onClick={onLogout} style={{ background: 'transparent', border: `1px solid ${C.gold}`, borderRadius: '4px', color: C.gold, padding: '10px 20px', cursor: 'pointer', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', transition: 'all 0.2s', backgroundColor: 'rgba(196,160,80,0.03)' }}>
              Secure Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* ─── TERMINAL VIEWPORT ─────────────────────────────────────────── */}
      <main style={{ padding: '40px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <div className="layout-grid">
          
          {/* LEFT INTERFACE: Premium Performance Mapping Area */}
          <section style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ background: `linear-gradient(145deg, ${C.bg2}, ${C.bg3})`, border: `1px solid ${C.border}`, borderRadius: '4px', padding: '32px', boxShadow: '0 12px 50px rgba(0,0,0,0.4)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: C.green, display: 'inline-block', boxShadow: `0 0 8px ${C.green}` }}></span>
                <h3 style={{ color: C.gold, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.12em', margin: 0, fontWeight: '700' }}>
                  Market Terminal Engine
                </h3>
              </div>
              <div style={{ height: '360px', background: C.bg, borderRadius: '4px', border: `1px solid rgba(196,160,80,0.06)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.muted, fontSize: '13px', letterSpacing: '0.06em', fontStyle: 'italic', backgroundImage: `radial-gradient(rgba(196,160,80,0.05) 1px, transparent 1px)`, backgroundSize: '20px 20px' }}>
                [ System Metrics Chart Engine Interface Placement ]
              </div>
            </div>
          </section>

          {/* RIGHT INTERFACE: Account Verification Parameters (Digital Passport) */}
          <aside style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ background: `linear-gradient(145deg, ${C.bg2}, ${C.bg3})`, border: `1px solid ${C.border}`, borderRadius: '4px', padding: '32px', boxShadow: '0 12px 50px rgba(0,0,0,0.4)' }}>
              <h3 style={{ color: C.gold, marginBottom: '24px', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: 0, fontWeight: '700', borderBottom: `1px solid ${C.border}`, paddingBottom: '12px' }}>
                Account Execution
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                <div className="layout-grid" style={{ gridTemplateColumns: '1fr', gap: '20px' }}>
                  <div className="metric-row">
                    <span style={{ color: C.muted, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Identity Status</span>
                    <span className="metric-value" style={{ color: C.text }}>
                      {profile?.status || 'Active Verified'}
                    </span>
                  </div>

                  <div className="metric-row">
                    <span style={{ color: C.muted, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Trading Group ID</span>
                    <span className="metric-value" style={{ color: C.gold, fontFamily: 'monospace', fontSize: '15px' }}>
                      {profile?.referral_code || 'Ppg0028'}
                    </span>
                  </div>

                  <div className="metric-row">
                    <span style={{ color: C.muted, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Registered Email</span>
                    <span className="metric-value" style={{ color: C.text, fontFamily: 'monospace', fontSize: '13px' }}>
                      {profile?.email || 'user@example.com'}
                    </span>
                  </div>

                  <div className="metric-row" style={{ borderBottom: 'none', paddingBottom: 0 }}>
                    <span style={{ color: C.muted, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>KYC Validation</span>
                    <span className="metric-value" style={{ color: kycTextColor, fontWeight: '900', letterSpacing: '0.05em' }}>
                      {normalizedKyc}
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </aside>

        </div>
      </main>
    </div>
  );
}
