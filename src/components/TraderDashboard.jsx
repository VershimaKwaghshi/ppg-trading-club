import React from 'react';

const C = {
  bg:       '#02040a',
  bg2:      '#050814',
  bg3:      '#0a0d1e',
  border:   'rgba(196, 160, 80, 0.15)',
  gold:     '#c4a050',
  goldMuted:'rgba(196, 160, 80, 0.40)',
  text:     '#f4eee0',
  muted:    '#7884a6',
  green:    '#10b981',
  orange:   '#f59e0b',
};

export default function TraderDashboard({ profile, onLogout }) {
  // Normalize variable resolution from backend database naming conventions
  const accountStatus = profile?.status || profile?.account_status || 'Active Verified';
  const groupIdentifier = profile?.referral_code || profile?.group_id || 'Ppg0028';
  const registrationEmail = profile?.email || 'Not Provided';
  const kycRawStatus = profile?.kyc_status || profile?.kyc || 'VERIFIED';
  
  const normalizedKyc = kycRawStatus.toUpperCase();
  const kycTextColor = normalizedKyc === 'VERIFIED' ? C.green : C.orange;

  return (
    <div style={{ minHeight: '100vh', background: C.bg, color: C.text, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', paddingBottom: '60px' }}>
      
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
        .metric-card-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .metric-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid ${C.border};
          padding-bottom: 14px;
          gap: 16px;
        }
        .metric-label {
          color: ${C.muted};
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .metric-value {
          text-align: right;
          word-break: break-all;
          font-size: 14px;
          font-weight: 600;
          color: ${C.text};
          max-width: 100%;
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
            gap: 6px !important;
          }
          .metric-value {
            text-align: left !important;
            width: 100%;
          }
        }
      `}</style>

      {/* Corporate Platform Branding Header Rail */}
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
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '12px' }}>
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '10px', color: C.muted, display: 'block', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Authenticated Member</span>
              <span style={{ fontSize: '14px', color: C.text, fontWeight: '600' }}>{profile?.full_name || 'Club Operator'}</span>
            </div>
            <button onClick={onLogout} style={{ background: 'transparent', border: `1px solid ${C.gold}`, borderRadius: '4px', color: C.gold, padding: '10px 20px', cursor: 'pointer', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', transition: 'all 0.2s', backgroundColor: 'rgba(196,160,80,0.03)' }}>
              Secure Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Terminal Layout Viewport */}
      <main style={{ padding: '40px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <div className="layout-grid">
          
          {/* Main Workspace Frame Panel */}
          <section style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ background: `linear-gradient(145deg, ${C.bg2}, ${C.bg3})`, border: `1px solid ${C.border}`, borderRadius: '4px', padding: '32px', boxShadow: '0 12px 50px rgba(0,0,0,0.4)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: C.green, display: 'inline-block', boxShadow: `0 0 8px ${C.green}` }}></span>
                <h3 style={{ color: C.gold, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.12em', margin: 0, fontWeight: '700' }}>
                  Market Terminal Engine
                </h3>
              </div>
              <div style={{ height: '300px', background: C.bg, borderRadius: '4px', border: `1px solid rgba(196,160,80,0.06)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.muted, fontSize: '13px', letterSpacing: '0.06em', fontStyle: 'italic', backgroundImage: `radial-gradient(rgba(196,160,80,0.05) 1px, transparent 1px)`, backgroundSize: '20px 20px' }}>
                [ System Metrics Chart Engine Interface Placement ]
              </div>
            </div>
          </section>

          {/* Account Credentials Validation Side-Panel Block */}
          <aside style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ background: `linear-gradient(145deg, ${C.bg2}, ${C.bg3})`, border: `1px solid ${C.border}`, borderRadius: '4px', padding: '32px', boxShadow: '0 12px 50px rgba(0,0,0,0.4)' }}>
              <h3 style={{ color: C.gold, marginBottom: '24px', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: 0, fontWeight: '700', borderBottom: `1px solid ${C.border}`, paddingBottom: '12px' }}>
                Account Execution
              </h3>
              
              <div className="metric-card-container">
                <div className="metric-row">
                  <span className="metric-label">Identity Status</span>
                  <span className="metric-value">{accountStatus}</span>
                </div>

                <div className="metric-row">
                  <span className="metric-label">Trading Group ID</span>
                  <span className="metric-value" style={{ color: C.gold, fontFamily: 'monospace', fontSize: '15px' }}>{groupIdentifier}</span>
                </div>

                <div className="metric-row">
                  <span className="metric-label">Registered Email</span>
                  <span className="metric-value" style={{ fontFamily: 'monospace', fontSize: '13px' }}>{registrationEmail}</span>
                </div>

                <div className="metric-row" style={{ borderBottom: 'none', paddingBottom: 0 }}>
                  <span className="metric-label">KYC Validation</span>
                  <span className="metric-value" style={{ color: kycTextColor, fontWeight: '900', letterSpacing: '0.05em' }}>{normalizedKyc}</span>
                </div>
              </div>

            </div>
          </aside>

        </div>
      </main>
    </div>
  );
}
