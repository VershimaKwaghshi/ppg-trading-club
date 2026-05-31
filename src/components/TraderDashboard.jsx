// src/components/TraderDashboard.jsx — Premium Mobile-First Layout
import React from 'react';

const C = {
  bg:       '#030611',                    // Deeper, obsidian rich luxury black
  bg2:      '#070b1e',                    // Polished navy header rail
  bg3:      '#0c122c',                    // Deep container card background
  border:   'rgba(196, 160, 80, 0.15)',   // Fine, sharp premium gold thread border
  gold:     '#c4a050',                    // Signature PPG Gold accent
  goldGlow: 'rgba(196, 160, 80, 0.04)',   // Muted gold back-lighting tint
  text:     '#f4eee0',                    // Soft premium off-white text
  muted:    '#8a95b3',                    // Platinum slate metadata tone
  green:    '#10b981',                    // Clear Emerald ledger green
  orange:   '#f59e0b',                    // Amber caution execution tone
};

export default function TraderDashboard({ profile, onLogout, refreshProfile }) {
  // Normalize verification metrics coming from the database
  const kycRawStatus = profile?.kyc_status || 'VERIFIED';
  const normalizedKyc = kycRawStatus.toUpperCase();
  const kycTextColor = normalizedKyc === 'VERIFIED' ? C.green : C.orange;

  // Add responsive styling injection directly into the header space
  return (
    <div style={{ minHeight: '100vh', background: C.bg, color: C.text, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', paddingBottom: '40px' }}>
      
      {/* Dynamic Mobile CSS Overrides injected into runtime head */}
      <style>{`
        .trading-layout-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 24px;
        }
        .header-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }
        .data-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          border-bottom: 1px solid ${C.border};
          padding-bottom: 12px;
          gap: 12px;
        }
        .data-value {
          text-align: right;
          word-break: break-all;
          font-size: 14px;
        }
        @media (max-width: 820px) {
          .trading-layout-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .header-container {
            flex-direction: column !important;
            gap: 16px !important;
            text-align: center;
          }
          .data-row {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 4px !important;
          }
          .data-value {
            text-align: left !important;
          }
        }
      `}</style>

      {/* ─── PREMIUM BRANDING HEADER RAIL ───────────────────────────────── */}
      <header style={{ padding: '20px 24px', borderBottom: `1px solid ${C.border}`, background: C.bg2, boxShadow: '0 4px 30px rgba(0,0,0,0.4)' }}>
        <div className="header-container">
          <div>
            <h1 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: '22px', color: C.gold, fontStyle: 'italic', margin: 0, letterSpacing: '0.03em', fontWeight: '900' }}>
              PPG Trading Club
            </h1>
            <p style={{ fontSize: '10px', color: C.muted, textTransform: 'uppercase', letterSpacing: '0.12em', margin: '4px 0 0 0', fontWeight: '700' }}>
              Institutional Workspace Terminal
            </p>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '11px', color: C.muted, display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Authenticated Trader</span>
              <span style={{ fontSize: '14px', color: C.text, fontWeight: '600' }}>{profile?.full_name || 'Kwaghshi Vershima'}</span>
            </div>
            <button onClick={onLogout} style={{ background: 'transparent', border: `1px solid ${C.gold}`, borderRadius: '4px', color: C.gold, padding: '8px 16px', cursor: 'pointer', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', transition: 'all 0.2s', backgroundColor: 'rgba(196,160,80,0.03)' }}>
              Secure Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* ─── MAIN CONTENT CONTAINER VIEWPORT ─────────────────────────────── */}
      <main style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
        <div className="trading-layout-grid">
          
          {/* LEFT INTERFACE PANEL: Market Instruments & Chart Module */}
          <section style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ background: `linear-gradient(135deg, ${C.bg2}, ${C.bg3})`, border: `1px solid ${C.border}`, borderRadius: '8px', padding: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: C.green, display: 'inline-block' }}></span>
                <h3 style={{ color: C.gold, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0, fontWeight: '700' }}>
                  Market Terminal Engine
                </h3>
              </div>
              <div style={{ height: '320px', background: C.bg, borderRadius: '6px', border: `1px solid rgba(196,160,80,0.08)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.muted, fontSize: '13px', letterSpacing: '0.05em', fontStyle: 'italic', backgroundImage: `radial-gradient(${C.border} 1px, transparent 1px)`, backgroundSize: '16px 16px' }}>
                [ System Metrics Chart Engine Interface Placement ]
              </div>
            </div>
          </section>

          {/* RIGHT INTERFACE PANEL: Account Ledger & Parameters */}
          <aside style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ background: `linear-gradient(135deg, ${C.bg2}, ${C.bg3})`, border: `1px solid ${C.border}`, borderRadius: '8px', padding: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.3)' }}>
              <h3 style={{ color: C.gold, marginBottom: '20px', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 0, fontWeight: '700', borderBottom: `1px solid ${C.border}`, paddingBottom: '10px' }}>
                Execution Parameters
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                
                <div className="data-row">
                  <span style={{ color: C.muted, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Identity Matrix</span>
                  <span className="data-value" style={{ color: C.text, fontWeight: '700', letterSpacing: '0.02em' }}>
                    {profile?.status || 'Active Verified'}
                  </span>
                </div>

                <div className="data-row">
                  <span style={{ color: C.muted, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Allocation ID</span>
                  <span className="data-value" style={{ color: C.gold, fontWeight: '700', fontFamily: 'monospace', fontSize: '15px' }}>
                    {profile?.referral_code || 'Ppg0028'}
                  </span>
                </div>

                <div className="data-row">
                  <span style={{ color: C.muted, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Secure Node Email</span>
                  <span className="data-value" style={{ color: C.text, fontFamily: 'monospace' }}>
                    {profile?.email || 'user@example.com'}
                  </span>
                </div>

                <div className="data-row" style={{ borderBottom: 'none', paddingBottom: 0 }}>
                  <span style={{ color: C.muted, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>KYC Clearance</span>
                  <span className="data-value" style={{ color: kycTextColor, fontWeight: '900', letterSpacing: '0.08em', fontSize: '14px' }}>
                    {normalizedKyc}
                  </span>
                </div>

              </div>
            </div>
          </aside>

        </div>
      </main>
    </div>
  );
}
