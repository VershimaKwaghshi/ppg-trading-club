// src/components/ManagerDashboard.jsx — Premium Risk & Allocation Suite
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

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
  crimson:  '#ef4444'
};

export default function ManagerDashboard({ profile, onLogout }) {
  const [traders, setTraders] = useState([]);
  const [selectedTrader, setSelectedTrader] = useState('');
  const [assetPair, setAssetPair] = useState('EURUSD');
  const [tradeType, setTradeType] = useState('BUY');
  const [lotSize, setLotSize] = useState('');
  const [pnl, setPnl] = useState('');
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchAssignedTraders();
  }, []);

  const fetchAssignedTraders = async () => {
    try {
      const { data } = await supabase
        .from('profiles')
        .select('id, full_name')
        .eq('role', 'trader');
      if (data) setTraders(data);
    } catch (err) {
      console.error('Error fetching data nodes:', err);
    }
  };

  const handleLogTrade = async (e) => {
    e.preventDefault();
    if (!selectedTrader || !lotSize || !pnl) {
      setStatusMsg({ type: 'error', text: 'Please complete all metric parameters.' });
      return;
    }

    setSubmitting(true);
    setStatusMsg({ type: '', text: '' });

    try {
      const { error } = await supabase.from('trade_logs').insert([
        {
          user_id: selectedTrader,
          manager_id: profile.id,
          asset_pair: assetPair,
          trade_type: tradeType,
          lot_size: parseFloat(lotSize),
          pnl: parseFloat(pnl),
        }
      ]);

      if (error) throw error;

      setStatusMsg({ type: 'success', text: 'Performance execution logged cleanly. Ledger synchronized.' });
      setLotSize('');
      setPnl('');
    } catch (err) {
      setStatusMsg({ type: 'error', text: err.message || 'Failed to sync ledger allocation event.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: C.bg, color: C.text, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', paddingBottom: '60px' }}>
      
      <style>{`
        .split-panel {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
        }
        .manager-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }
        .input-box {
          width: 100%;
          padding: 12px;
          border-radius: 4px;
          background-color: #02040a;
          border: 1px solid ${C.border};
          color: #f4eee0;
          box-sizing: border-box;
          outline: none;
        }
        .input-box:focus {
          border-color: ${C.gold};
        }
        @media (max-width: 850px) {
          .split-panel {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .manager-header {
            flex-direction: column !important;
            gap: 20px !important;
            text-align: center;
          }
        }
      `}</style>

      {/* Header */}
      <header style={{ padding: '24px', borderBottom: `1px solid ${C.border}`, background: C.bg2, boxShadow: '0 4px 40px rgba(0,0,0,0.5)' }}>
        <div className="manager-header">
          <div>
            <h1 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: '24px', color: C.gold, fontStyle: 'italic', margin: 0, letterSpacing: '0.02em', fontWeight: '900' }}>
              PPG Trading Club
            </h1>
            <p style={{ fontSize: '10px', color: C.goldMuted, textTransform: 'uppercase', letterSpacing: '0.15em', margin: '4px 0 0 0', fontWeight: '700' }}>
              Risk & Allocation Executive Suite
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '10px', color: C.muted, display: 'block', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Account Manager</span>
              <span style={{ fontSize: '14px', color: C.text, fontWeight: '600' }}>{profile?.full_name || 'System Operator'}</span>
            </div>
            <button onClick={onLogout} style={{ background: 'transparent', border: `1px solid ${C.gold}`, borderRadius: '4px', color: C.gold, padding: '10px 20px', cursor: 'pointer', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Secure Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ padding: '40px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <div className="split-panel">
          
          <div style={{ background: `linear-gradient(145deg, ${C.bg2}, ${C.bg3})`, border: `1px solid ${C.border}`, borderRadius: '4px', padding: '32px', boxShadow: '0 12px 50px rgba(0,0,0,0.4)' }}>
            <h2 style={{ color: C.gold, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 0, marginBottom: '24px', borderBottom: `1px solid ${C.border}`, paddingBottom: '12px' }}>
              Log Performance Execution
            </h2>

            {statusMsg.text && (
              <div style={{ padding: '14px', borderRadius: '4px', marginBottom: '20px', backgroundColor: statusMsg.type === 'success' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', border: `1px solid ${statusMsg.type === 'success' ? C.green : C.crimson}`, color: statusMsg.type === 'success' ? C.green : C.crimson, fontSize: '13px' }}>
                {statusMsg.text}
              </div>
            )}

            <form onSubmit={handleLogTrade} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '11px', textTransform: 'uppercase', color: C.muted, letterSpacing: '0.05em' }}>Allocated Trader Target</label>
                <select value={selectedTrader} onChange={(e) => setSelectedTrader(e.target.value)} className="input-box">
                  <option value="">-- Choose Profile Node --</option>
                  {traders.map(t => <option key={t.id} value={t.id} style={{ background: C.bg2 }}>{t.full_name}</option>)}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '11px', textTransform: 'uppercase', color: C.muted, letterSpacing: '0.05em' }}>Asset Instrument</label>
                  <select value={assetPair} onChange={(e) => setAssetPair(e.target.value)} className="input-box">
                    <option value="EURUSD">EURUSD</option>
                    <option value="GBPUSD">GBPUSD</option>
                    <option value="XAUUSD">XAUUSD (Gold)</option>
                    <option value="BTCUSD">BTCUSD</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '11px', textTransform: 'uppercase', color: C.muted, letterSpacing: '0.05em' }}>Market Vector</label>
                  <select value={tradeType} onChange={(e) => setTradeType(e.target.value)} className="input-box">
                    <option value="BUY">BUY (Long)</option>
                    <option value="SELL">SELL (Short)</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '11px', textTransform: 'uppercase', color: C.muted, letterSpacing: '0.05em' }}>Volume Allocation (Lots)</label>
                  <input type="number" step="0.01" value={lotSize} onChange={(e) => setLotSize(e.target.value)} placeholder="0.10" className="input-box" />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '11px', textTransform: 'uppercase', color: C.muted, letterSpacing: '0.05em' }}>Net PnL Impact ($)</label>
                  <input type="number" step="0.01" value={pnl} onChange={(e) => setPnl(e.target.value)} placeholder="500.00" className="input-box" />
                </div>
              </div>

              <button type="submit" disabled={submitting} style={{ backgroundColor: 'transparent', border: `1px solid ${C.gold}`, color: C.gold, padding: '14px', borderRadius: '4px', cursor: submitting ? 'not-allowed' : 'pointer', fontWeight: 'bold', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '12px', transition: 'all 0.2s', background: 'rgba(196,160,80,0.02)' }}>
                {submitting ? 'Synchronizing Ledger Node...' : 'Commit Performance Log'}
              </button>
            </form>
          </div>

          <div style={{ background: `linear-gradient(145deg, ${C.bg2}, ${C.bg3})`, border: `1px solid ${C.border}`, borderRadius: '4px', padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3 style={{ fontFamily: '"Playfair Display", Georgia, serif', color: C.gold, fontStyle: 'italic', fontSize: '20px', margin: '0 0 12px 0' }}>The Assurance of Integrity</h3>
            <p style={{ color: C.muted, fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
              Every transaction and performance log committed from this terminal updates the system database instantly. Trader metrics update in real time on the secure ledger without manual intervention.
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}
