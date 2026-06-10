import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export default function AdminDashboard({ profile, onLogout }) {
  const [pendingSubscriptions, setPendingSubscriptions] = useState([]);
  const [processingId, setProcessingId] = useState(null);
  const [globalLoading, setGlobalLoading] = useState(true);

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  async function fetchPendingRequests() {
    setGlobalLoading(true);
    try {
      const { data, error } = await supabase
        .from('platform_subscriptions')
        .select(`
          id,
          user_id,
          payment_reference,
          payment_method,
          amount,
          created_at,
          profiles (
            full_name,
            email,
            activation_stage
          )
        `)
        .eq('status', 'PENDING_VERIFICATION');

      if (error) throw error;
      setPendingSubscriptions(data || []);
    } catch (err) {
      alert('Fault observed retrieving ledger records: ' + err.message);
    } finally {
      setGlobalLoading(false);
    }
  }

  async function resolveSubscription(subscriptionId, targetUserId, newStatus) {
    setProcessingId(subscriptionId);
    try {
      const { error: subscriptionError } = await supabase
        .from('platform_subscriptions')
        .update({ status: newStatus })
        .eq('id', subscriptionId);

      if (subscriptionError) throw subscriptionError;

      const { error: auditError } = await supabase
        .from('admin_audit_logs')
        .insert([{
          admin_id: profile.id,
          target_user_id: targetUserId,
          action_performed: newStatus === 'APPROVED' ? 'APPROVE_SUBSCRIPTION' : 'REJECT_SUBSCRIPTION',
          reference_id: subscriptionId,
          notes: `Manual transaction evaluation performed by ${profile.email}`
        }]);

      if (auditError) throw auditError;

      alert(`Transaction resolved successfully as: ${newStatus}`);
      await fetchPendingRequests();
    } catch (err) {
      alert('Execution failure during resolution sequence: ' + err.message);
    } finally {
      setProcessingId(null);
    }
  }

  if (globalLoading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#02040a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c4a050' }}>
        <div>Scanning Audit Inbound Pipelines...</div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#02040a', color: '#f4eee0', padding: '40px 24px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(196,160,80,0.15)', paddingBottom: '20px', marginBottom: '40px' }}>
          <div>
            <h1 style={{ fontFamily: 'Georgia, serif', color: '#c4a050', fontSize: '24px', margin: 0 }}>Terminal Root Operations</h1>
            <p style={{ color: '#7884a6', fontSize: '13px', margin: '4px 0 0 0' }}>Operator Identity: {profile.email}</p>
          </div>
          <button onClick={onLogout} style={{ backgroundColor: 'transparent', border: '1px solid rgba(196,160,80,0.3)', color: '#c4a050', padding: '8px 16px', cursor: 'pointer' }}>
            Terminate Session
          </button>
        </div>

        <h2 style={{ fontSize: '16px', textTransform: 'uppercase', color: '#c4a050', letterSpacing: '1px', marginBottom: '20px' }}>Pending Platform Activation Fees</h2>
        
        {pendingSubscriptions.length === 0 ? (
          <div style={{ padding: '40px', background: '#050814', border: '1px dashed rgba(196,160,80,0.15)', textAlign: 'center', color: '#7884a6' }}>
            No transaction records are currently requiring validation review.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {pendingSubscriptions.map((sub) => (
              <div key={sub.id} style={{ background: '#050814', border: '1px solid rgba(196,160,80,0.15)', borderRadius: '4px', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                <div>
                  <span style={{ fontSize: '11px', background: 'rgba(196,160,80,0.1)', color: '#c4a050', padding: '4px 8px', borderRadius: '2px', textTransform: 'uppercase', fontWeight: 'bold' }}>
                    {sub.payment_method}
                  </span>
                  <h3 style={{ fontSize: '16px', margin: '12px 0 4px 0', color: '#f4eee0' }}>{sub.profiles?.full_name || 'Unknown Candidate'}</h3>
                  <p style={{ margin: 0, fontSize: '13px', color: '#7884a6' }}>Email Node: {sub.profiles?.email}</p>
                  <p style={{ margin: '8px 0 0 0', fontSize: '13px', color: '#7884a6' }}>
                    Reference Hash: <strong style={{ color: '#fff', fontFamily: 'monospace' }}>{sub.payment_reference}</strong>
                  </p>
                </div>

                <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#c4a050' }}>
                    ${sub.amount} <span style={{ fontSize: '12px', color: '#7884a6', fontWeight: 'normal' }}>USD Equiv.</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button 
                      disabled={processingId !== null}
                      onClick={() => resolveSubscription(sub.id, sub.user_id, 'REJECTED')}
                      style={{ padding: '8px 16px', backgroundColor: '#3b1212', border: '1px solid #ef4444', color: '#ef4444', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                      Reject Entry
                    </button>
                    <button 
                      disabled={processingId !== null}
                      onClick={() => resolveSubscription(sub.id, sub.user_id, 'APPROVED')}
                      style={{ padding: '8px 16px', background: 'linear-gradient(135deg,#c4a050,#f0d080)', border: 'none', color: '#050814', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                      {processingId === sub.id ? 'Processing...' : 'Verify & Activate'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
