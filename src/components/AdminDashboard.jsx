import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'; // CORRECTED IMPORT PATH

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
      console.error('Error gathering system data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Single-Mutation Deposit Approval
  const handleApproveDeposit = async (depositId) => {
    setProcessingId(depositId);
    try {
      // Anti-Double Balance Mutation: We only change 'status' to 'confirmed'.
      // The backend Postgres ledger functions pick this up automatically to prevent inflation bugs.
      const { error } = await supabase
        .from('deposits')
        .update({ status: 'confirmed' })
        .eq('id', depositId);

      if (error) throw error;

      // Update structural UI state instantly
      setPendingDeposits((prev) => prev.filter(d => d.id !== depositId));
    } catch (err) {
      alert('Ledger protection intercept: ' + err.message);
    } finally {
      setProcessingId(null);
    }
  };

  if (loading) return <div style={{ color: '#E2E8F0', padding: '20px' }}>Loading Administration Controls...</div>;

  return (
    <div style={{ padding: '24px', backgroundColor: '#0B0F17', minHeight: '100vh', color: '#E2E8F0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#FFF', margin: 0 }}>HQ Administrative Gate</h1>
          <p style={{ color: '#94A3B8', fontSize: '14px', margin: '4px 0 0 0' }}>System Administrator: {profile?.full_name}</p>
        </div>
        <button onClick={onLogout} style={{ backgroundColor: '#DC2626', color: '#FFF', padding: '8px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontWeight: '600' }}>
          Logout
        </button>
      </div>

      <div style={{ backgroundColor: '#1E293B', borderRadius: '8px', border: '1px solid #334155', padding: '20px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', color: '#FFF', marginTop: 0 }}>Pending Capital Deposits</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #334155', color: '#94A3B8' }}>
                <th style={{ padding: '12px' }}>Account Holder</th>
                <th style={{ padding: '12px' }}>Funding Target</th>
                <th style={{ padding: '12px' }}>Status Rail</th>
                <th style={{ padding: '12px' }}>Created At</th>
                <th style={{ padding: '12px', textAlign: 'right' }}>Authorization Action</th>
              </tr>
            </thead>
            <tbody>
              {pendingDeposits.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ padding: '12px', textAlign: 'center', color: '#64748B' }}>No outstanding funding triggers require review.</td>
                </tr>
              ) : (
                pendingDeposits.map((dep) => (
                  <tr key={dep.id} style={{ borderBottom: '1px solid #334155' }}>
                    <td style={{ padding: '12px', fontWeight: '500' }}>{dep.profiles?.full_name || 'System Member'}</td>
                    <td style={{ padding: '12px', color: '#10B981', fontWeight: 'bold' }}>${dep.amount.toLocaleString()}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ backgroundColor: '#78350F', color: '#F59E0B', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '600' }}>
                        {dep.status.toUpperCase()}
                      </span>
                    </td>
                    <td style={{ padding: '12px', color: '#64748B', fontSize: '13px' }}>
                      {new Date(dep.created_at).toLocaleString()}
                    </td>
                    <td style={{ padding: '12px', textAlign: 'right' }}>
                      <button 
                        onClick={() => handleApproveDeposit(dep.id)}
                        disabled={processingId === dep.id}
                        style={{ backgroundColor: '#10B981', color: '#FFF', padding: '6px 12px', borderRadius: '4px', border: 'none', cursor: processingId === dep.id ? 'not-allowed' : 'pointer', fontSize: '13px', fontWeight: '600' }}
                      >
                        {processingId === dep.id ? 'Processing...' : 'Confirm Mutation'}
                      </button>
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
