import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';

export default function TraderDashboard({ profile, onLogout, refreshProfile }) {
  const [metrics, setMetrics] = useState({ balance: 0, equity: 0, total_pnl: 0 });
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!profile?.id) return;

    // 1. Initial Data Fetch
    const fetchTraderData = async () => {
      try {
        const { data: account } = await supabase
          .from('accounts')
          .select('balance, equity, total_pnl')
          .eq('user_id', profile.id)
          .single();
        
        if (account) setMetrics(account);

        const { data: logs } = await supabase
          .from('trade_logs')
          .select('*')
          .eq('user_id', profile.id)
          .order('created_at', { ascending: false });
        
        if (logs) setTrades(logs);
      } catch (err) {
        console.error('Error fetching trader data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTraderData();

    // 2. Real-Time Postgres Changes Subscription
    const accountSubscription = supabase
      .channel(`account_realtime_${profile.id}`)
      .on('postgres_changes', { 
        event: 'UPDATE', 
        schema: 'public', 
        table: 'accounts', 
        filter: `user_id=eq.${profile.id}` 
      }, (payload) => {
        setMetrics(payload.new);
      })
      .subscribe();

    const tradesSubscription = supabase
      .channel(`trades_realtime_${profile.id}`)
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'trade_logs', 
        filter: `user_id=eq.${profile.id}` 
      }, (payload) => {
        setTrades((prev) => [payload.new, ...prev]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(accountSubscription);
      supabase.removeChannel(tradesSubscription);
    };
  }, [profile?.id]);

  if (loading) return <div style={{ color: '#E2E8F0', padding: '20px' }}>Loading workspace...</div>;

  return (
    <div style={{ padding: '24px', backgroundColor: '#0B0F17', minHeight: '100vh', color: '#E2E8F0' }}>
      <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#FFF' }}>Trader Workspace</h1>
          <p style={{ color: '#94A3B8', fontSize: '14px' }}>Welcome back, {profile.full_name}</p>
        </div>
        <button onClick={onLogout} style={{ backgroundColor: '#DC2626', color: '#FFF', padding: '8px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer' }}>
          Logout
        </button>
      </div>

      {/* Real-Time Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
        <div style={{ backgroundColor: '#1E293B', padding: '20px', borderRadius: '8px', border: '1px solid #334155' }}>
          <div style={{ color: '#94A3B8', fontSize: '14px' }}>Account Balance</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#10B981', marginTop: '8px' }}>${metrics.balance.toLocaleString()}</div>
        </div>
        <div style={{ backgroundColor: '#1E293B', padding: '20px', borderRadius: '8px', border: '1px solid #334155' }}>
          <div style={{ color: '#94A3B8', fontSize: '14px' }}>Current Equity</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#3B82F6', marginTop: '8px' }}>${metrics.equity.toLocaleString()}</div>
        </div>
        <div style={{ backgroundColor: '#1E293B', padding: '20px', borderRadius: '8px', border: '1px solid #334155' }}>
          <div style={{ color: '#94A3B8', fontSize: '14px' }}>Total Net PnL</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: metrics.total_pnl >= 0 ? '#10B981' : '#EF4444', marginTop: '8px' }}>
            {metrics.total_pnl >= 0 ? '+' : ''}${metrics.total_pnl.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Real-Time Live Trade Logs */}
      <div style={{ backgroundColor: '#1E293B', borderRadius: '8px', border: '1px solid #334155', padding: '20px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', color: '#FFF' }}>Live Performance Logs</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #334155', color: '#94A3B8' }}>
                <th style={{ padding: '12px' }}>Asset</th>
                <th style={{ padding: '12px' }}>Type</th>
                <th style={{ padding: '12px' }}>Lots</th>
                <th style={{ padding: '12px' }}>PnL ($)</th>
                <th style={{ padding: '12px' }}>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {trades.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ padding: '12px', textAlign: 'center', color: '#64748B' }}>No executed trades logged yet.</td>
                </tr>
              ) : (
                trades.map((trade) => (
                  <tr key={trade.id} style={{ borderBottom: '1px solid #334155' }}>
                    <td style={{ padding: '12px', fontWeight: '500' }}>{trade.asset_pair}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ color: trade.trade_type === 'BUY' ? '#10B981' : '#EF4444', fontWeight: 'bold' }}>{trade.trade_type}</span>
                    </td>
                    <td style={{ padding: '12px' }}>{trade.lot_size}</td>
                    <td style={{ padding: '12px', color: trade.pnl >= 0 ? '#10B981' : '#EF4444', fontWeight: '500' }}>
                      {trade.pnl >= 0 ? '+' : ''}{trade.pnl}
                    </td>
                    <td style={{ padding: '12px', color: '#64748B', fontSize: '13px' }}>
                      {new Date(trade.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
