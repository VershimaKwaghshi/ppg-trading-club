import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'; // CORRECTED IMPORT PATH

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
    const fetchTraders = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('id, full_name')
        .eq('role', 'trader');
      if (data) setTraders(data);
    };
    fetchTraders();
  }, []);

  // Secure, Calculation-Free Submission
  const handleLogTrade = async (e) => {
    e.preventDefault();
    if (!selectedTrader || !lotSize || !pnl) {
      setStatusMsg({ type: 'error', text: 'Please complete all metric fields.' });
      return;
    }

    setSubmitting(true);
    setStatusMsg({ type: '', text: '' });

    try {
      // Calculation-Free Front-End: Zero balance math happens here. 
      // The database trigger automatically captures this record and secures the ledger.
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

      setStatusMsg({ type: 'success', text: 'Trade logged successfully. Ledger optimized on-chain.' });
      setLotSize('');
      setPnl('');
    } catch (err) {
      setStatusMsg({ type: 'error', text: err.message || 'Failed to sync ledger event.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ padding: '24px', backgroundColor: '#0B0F17', minHeight: '100vh', color: '#E2E8F0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#FFF', margin: 0 }}>Manager Workspace</h1>
          <p style={{ color: '#94A3B8', fontSize: '14px', margin: '4px 0 0 0' }}>Account Manager: {profile?.full_name}</p>
        </div>
        <button onClick={onLogout} style={{ backgroundColor: '#DC2626', color: '#FFF', padding: '8px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontWeight: '600' }}>
          Logout
        </button>
      </div>

      <div style={{ maxWidth: '600px', backgroundColor: '#1E293B', borderRadius: '8px', border: '1px solid #334155', padding: '24px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px', color: '#FFF', marginTop: 0 }}>Log Performance Execution</h2>
        
        {statusMsg.text && (
          <div style={{ padding: '12px', borderRadius: '6px', marginBottom: '16px', backgroundColor: statusMsg.type === 'success' ? '#065F46' : '#991B1B', color: '#FFF', fontSize: '14px' }}>
            {statusMsg.text}
          </div>
        )}

        <form onSubmit={handleLogTrade} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: '#94A3B8' }}>Select Allocated Trader</label>
            <select value={selectedTrader} onChange={(e) => setSelectedTrader(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', backgroundColor: '#0F172A', border: '1px solid #334155', color: '#FFF' }}>
              <option value="">-- Choose Profile --</option>
              {traders.map(t => <option key={t.id} value={t.id}>{t.full_name}</option>)}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: '#94A3B8' }}>Asset Pair</label>
              <select value={assetPair} onChange={(e) => setAssetPair(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', backgroundColor: '#0F172A', border: '1px solid #334155', color: '#FFF' }}>
                <option value="EURUSD">EURUSD</option>
                <option value="GBPUSD">GBPUSD</option>
                <option value="XAUUSD">XAUUSD (Gold)</option>
                <option value="BTCUSD">BTCUSD</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: '#94A3B8' }}>Direction</label>
              <select value={tradeType} onChange={(e) => setTradeType(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', backgroundColor: '#0F172A', border: '1px solid #334155', color: '#FFF' }}>
                <option value="BUY">BUY (Long)</option>
                <option value="SELL">SELL (Short)</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: '#94A3B8' }}>Volume (Lots)</label>
              <input type="number" step="0.01" value={lotSize} onChange={(e) => setLotSize(e.target.value)} placeholder="0.10" style={{ width: '100%', padding: '10px', borderRadius: '6px', backgroundColor: '#0F172A', border: '1px solid #334155', color: '#FFF' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: '#94A3B8' }}>Net PnL Impact ($)</label>
              <input type="number" step="0.01" value={pnl} onChange={(e) => setPnl(e.target.value)} placeholder="e.g. 450.00 or -210.50" style={{ width: '100%', padding: '10px', borderRadius: '6px', backgroundColor: '#0F172A', border: '1px solid #334155', color: '#FFF' }} />
            </div>
          </div>

          <button type="submit" disabled={submitting} style={{ backgroundColor: '#2563EB', color: '#FFF', padding: '12px', borderRadius: '6px', border: 'none', cursor: submitting ? 'not-allowed' : 'pointer', fontWeight: 'bold', marginTop: '8px' }}>
            {submitting ? 'Synchronizing Execution...' : 'Commit Performance Log'}
          </button>
        </form>
      </div>
    </div>
  );
}
