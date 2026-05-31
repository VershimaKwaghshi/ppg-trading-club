// src/components/AdminDashboard.jsx — Premium Global Command Console
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
};

export default function AdminDashboard({ profile, onLogout }) {
  const [pendingDeposits, setPendingDeposits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    fetchPendingDeposits();
  }, []);

  const fetchPendingDeposits = async () => {
    try {
      const { data } = await supabase
        .from('deposits')
        .select(`id, amount, status, created_at, profiles(full_name)`)
        .eq('status', 'pending')
        .order('created_at', { ascending: true });
      if (data) setPendingDeposits(data);
    } catch (err) {
      console.error('Administrative Matrix Fetch Failure:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveDeposit = async (depositId) => {
    setProcessingId(depositId);
    try {
      const { error } = await supabase
        .from('deposits')
        .update({ status: 'confirmed' })
        .eq('id', depositId);

      if (error) throw error;
      setPendingDeposits((prev) => prev.filter(d => d.id !== depositId));
    } catch (err) {
      alert('Ledger Guard Intercept: ' + err.message);
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: C.bg, color: C.text, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', paddingBottom: '60px' }}>
      
      <style>{`
        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }
        .table-wrapper {
          overflow-x: auto;
          margin-top: 24px;
        }
        .premium-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }
        .premium-table th {
          padding: 16px;
          font-size: 11px;
          text-transform: uppercase;
          color: ${C.muted};
          letter-spacing: 0.08em;
          border-bottom: 1px solid ${C.border};
        }
        .premium-table td {
          padding: 18px 16px;
          font-size: 14px;
          border-bottom: 1px solid rgba(196,160,80,0.06);
        }
        @media (max-width: 850px) {
          .admin-header {
            flex-direction: column !important;
            gap: 20px !important;
            text-align: center;
          }
        }
      `}</style>

      {/* Header */}
      <header style={{ padding: '24px', borderBottom: `1px solid ${C.border}`, background: C.bg2, boxShadow: '0 4px 40px rgba(0,0,0,0.5)' }}>
        <div className="admin-header">
          <div>
            <h1 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: '24px', color: C.gold, fontStyle: 'italic', margin: 0, letterSpacing: '0.02em', fontWeight: '900' }}>
              PPG Trading Club
            </h1>
            <p style={{ fontSize: '10px', color: C.goldMuted, textTransform: 'uppercase', letterSpacing: '0.15em', margin: '4px 0 0 0', fontWeight: '700' }}>
              Global Headquarters Command Console
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '10px', color: C.muted, display: 'block', textTransform: 'uppercase', letterSpacing: '0.08em' }}>System Administrator</span>
              <span style={{ fontSize: '14px', color: C.text, fontWeight: '600' }}>{profile?.full_name}</span>
            </div>
            <button onClick={onLogout} style={{ background: 'transparent', border: `1px solid #dc2626`, borderRadius: '4px', color: '#ef4444', padding: '10px 20px', cursor: 'pointer', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Disconnect Node
            </button>
          </div>
        </div>
      </header>

      {/* Main Table Workspace */}
      <main style={{ padding: '40px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ background: `linear-gradient(145deg, ${C.bg2}, ${C.bg3})`, border: `1px solid ${C.border}`, borderRadius: '4px', padding: '32px', boxShadow: '0 12px 50px rgba(0,0,0,0.4)' }}>
          
          <h2 style={{ color: C.gold, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 0, marginBottom: '8px' }}>
            Pending Capital Deposits
          </h2>
          <p style={{ color: C.muted, fontSize: '13px', margin: '0 0 24px 0' }}>Review outstanding funding requests requiring verification and manual clearance.</p>

          {loading ? (
            <div style={{ padding: '40px 0', color: C.muted, textAlign: 'center', fontStyle: 'italic', fontSize: '14px' }}>Gathering ledger records...</div>
          ) : (
            <div className="table-wrapper">
              <table className="premium-table">
                <thead>
                  <tr>
                    <th>Account Holder</th>
                    <th>Funding Target</th>
                    <th>Status Rail</th>
                    <th>Created At</th>
                    <th style={{ textAlign: 'right' }}>Authorization Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingDeposits.length === 0 ? (
                    <tr>
                      <td colSpan="5" style={{ padding: '32px', textAlign: 'center', color: C.muted, fontStyle: 'italic' }}>
                        No outstanding funding triggers require review.
                      </td>
                    </tr>
                  ) : (
                    pendingDeposits.map((dep) => (
                      <tr key={dep.id}>
                        <td style={{ fontWeight: '600', color: C.text }}>{dep.profiles?.full_name || 'Club Member'}</td>
                        <td style={{ color: C.gold, fontWeight: '700', fontFamily: 'monospace', fontSize: '15px' }}>${dep.amount.toLocaleString()}</td>
                        <td>
                          <span style={{ border: `1px solid ${C.goldMuted}`, color: C.gold, padding: '4px 8px', borderRadius: '2px', fontSize: '11px', fontWeight: '700', letterSpacing: '0.05em' }}>
                            {dep.status.toUpperCase()}
                          </span>
                        </td>
                        <td style={{ color: C.muted, fontSize: '13px' }}>
                          {new Date(dep.created_at).toLocaleString()}
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <button 
                            onClick={() => handleApproveDeposit(dep.id)}
                            disabled={processingId === dep.id}
                            style={{ backgroundColor: 'transparent', border: `1px solid ${C.green}`, color: C.green, padding: '8px 16px', borderRadius: '4px', cursor: processingId === dep.id ? 'not-allowed' : 'pointer', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', transition: 'all 0.2s' }}
                          >
                            {processingId === dep.id ? 'Syncing...' : 'Clear Capital'}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
