import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export default function OnboardingActivationFlow({ profile, onLogout }) {
  const [fileReference, setFileReference] = useState('');
  const [paymentType, setPaymentType] = useState('OPAY');
  const [referralCount, setReferralCount] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function checkReferrals() {
      const { count } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('referred_by', profile.id);
      setReferralCount(count || 0);
    }
    checkReferrals();
  }, [profile.id]);

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { error } = await supabase.from('platform_subscriptions').insert([{
        user_id: profile.id,
        payment_reference: fileReference,
        payment_method: paymentType,
        amount: 4.99
      }]);
      if (error) throw error;
      alert('Subscription log submitted successfully for validation review.');
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#02040a', color: '#f4eee0', padding: '40px 24px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', background: '#050814', border: '1px solid rgba(196,160,80,0.15)', padding: '42px', borderRadius: '8px' }}>
        <h2 style={{ fontFamily: 'Georgia, serif', color: '#c4a050', fontStyle: 'italic', marginBottom: '8px' }}>Workspace Activation Required</h2>
        <p style={{ color: '#7884a6', fontSize: '14px', marginBottom: '24px' }}>Complete your operational setup to clear your environment for connection routing.</p>
        
        <div style={{ borderBottom: '1px solid rgba(196,160,80,0.1)', paddingBottom: '24px', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '14px', color: '#f4eee0', textTransform: 'uppercase', marginBottom: '12px' }}>Step 1: Subscription Fee Verification</h3>
          <p style={{ fontSize: '13px', color: '#7884a6', marginBottom: '16px' }}>Current Account Allocation Stage Status: <span style={{ color: '#c4a050' }}>{profile.activation_stage}</span></p>
          
          <form onSubmit={handlePaymentSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <select value={paymentType} onChange={e => setPaymentType(e.target.value)} style={{ padding: '12px', background: '#02040a', color: '#fff', border: '1px solid rgba(196,160,80,0.15)' }}>
              <option value="OPAY">Opay Transfer Node</option>
              <option value="ZENITH">Zenith Corporate Portal</option>
              <option value="CRYPTO">USDT TRC20 Digital Token</option>
            </select>
            <input type="text" placeholder="Transaction Reference Hash" value={fileReference} onChange={e => setFileReference(e.target.value)} required style={{ padding: '12px', background: '#02040a', color: '#fff', border: '1px solid rgba(196,160,80,0.15)' }} />
            <button type="submit" disabled={submitting} style={{ padding: '12px', background: 'linear-gradient(135deg,#c4a050,#f0d080)', color: '#050814', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
              {submitting ? 'Transmitting Reference Data...' : 'Submit Activation Payment'}
            </button>
          </form>
        </div>

        <div>
          <h3 style={{ fontSize: '14px', color: '#f4eee0', textTransform: 'uppercase', marginBottom: '12px' }}>Step 2: Network Structural Integrity Loop</h3>
          <p style={{ fontSize: '13px', color: '#7884a6', lineHeight: '1.5' }}>
            To ensure alignment within our network structure, you must refer at least one active account node.
          </p>
          <div style={{ marginTop: '16px', padding: '16px', background: '#02040a', border: '1px solid rgba(196,160,80,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: '#7884a6' }}>Your Tracked Referrals:</span>
            <span style={{ fontSize: '18px', fontWeight: 'bold', color: referralCount > 0 ? '#10b981' : '#f59e0b' }}>{referralCount} / 1</span>
          </div>
        </div>

        <button onClick={onLogout} style={{ marginTop: '32px', background: 'transparent', border: '1px solid #ef4444', color: '#ef4444', padding: '10px 20px', width: '100%', cursor: 'pointer' }}>
          Disconnect Security Node
        </button>
      </div>
    </div>
  );
}
