import TraderDashboard from './components/TraderDashboard';
import ManagerDashboard from './components/ManagerDashboard';
import AdminDashboard from './components/AdminDashboard';
// Dashboard.jsx — PPG Trading Club
// Requires: @supabase/supabase-js, react, react-dom
// Place supabase.js in the same directory and fill in your credentials.

import { useState, useEffect } from 'react';
import { supabase } from './supabase';

// ─── DESIGN TOKENS ───────────────────────────────────────────
const C = {
  bg:       '#050814',
  bg2:      '#070a1a',
  bg3:      '#0a0d1e',
  border:   'rgba(196,160,80,0.12)',
  borderHi: 'rgba(196,160,80,0.3)',
  gold:     '#c4a050',
  goldLt:   '#f0d080',
  text:     '#f0e8d0',
  muted:    '#7878a0',
  dim:      '#484868',
  green:    '#4ade80',
  red:      '#f43f5e',
  orange:   '#f97316',
};

const shimmer = {
  background: 'linear-gradient(90deg,#8a6520,#f5e098,#c4a050,#f5e098,#8a6520)',
  backgroundSize: '200% auto',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  animation: 'shimmer 4s linear infinite',
};

// ─── SHARED UI ────────────────────────────────────────────────
function GoldBtn({ children, onClick, disabled, variant = 'primary', small }) {
  const base = {
    border: 'none', borderRadius: '7px', cursor: disabled ? 'not-allowed' : 'pointer',
    fontFamily: 'sans-serif', fontWeight: 700, transition: 'all 0.18s',
    opacity: disabled ? 0.5 : 1,
    padding: small ? '7px 14px' : '11px 22px',
    fontSize: small ? '12px' : '13.5px',
  };
  const styles = {
    primary: { ...base, background: 'linear-gradient(135deg,#c4a050,#f0d080)', color: '#050814' },
    ghost:   { ...base, background: 'transparent', color: C.gold, border: `1px solid ${C.borderHi}` },
    danger:  { ...base, background: 'rgba(244,63,94,0.12)', color: C.red, border: '1px solid rgba(244,63,94,0.3)' },
    success: { ...base, background: 'rgba(74,222,128,0.12)', color: C.green, border: '1px solid rgba(74,222,128,0.3)' },
  };
  return <button onClick={onClick} disabled={disabled} style={styles[variant]}>{children}</button>;
}

function Card({ children, style = {} }) {
  return (
    <div style={{ background: C.bg3, border: `1px solid ${C.border}`, borderRadius: '12px', padding: '24px', ...style }}>
      {children}
    </div>
  );
}

function Badge({ status }) {
  const map = {
    pending:    { bg: 'rgba(251,191,36,0.1)',  color: '#fbbf24', label: 'Pending' },
    active:     { bg: 'rgba(74,222,128,0.1)',  color: C.green,   label: 'Active' },
    approved:   { bg: 'rgba(74,222,128,0.1)',  color: C.green,   label: 'Approved' },
    confirmed:  { bg: 'rgba(74,222,128,0.1)',  color: C.green,   label: 'Confirmed' },
    paid:       { bg: 'rgba(74,222,128,0.1)',  color: C.green,   label: 'Paid' },
    rejected:   { bg: 'rgba(244,63,94,0.1)',   color: C.red,     label: 'Rejected' },
    suspended:  { bg: 'rgba(244,63,94,0.1)',   color: C.red,     label: 'Suspended' },
    reviewing:  { bg: 'rgba(147,51,234,0.1)',  color: '#a78bfa', label: 'Reviewing' },
    submitted:  { bg: 'rgba(147,51,234,0.1)',  color: '#a78bfa', label: 'Submitted' },
    manager:    { bg: 'rgba(196,160,80,0.1)',  color: C.gold,    label: 'Manager' },
    trader:     { bg: 'rgba(96,165,250,0.1)',  color: '#60a5fa', label: 'Trader' },
    admin:      { bg: 'rgba(244,63,94,0.1)',   color: C.red,     label: 'Admin' },
  };
  const s = map[status] || { bg: 'rgba(120,120,160,0.1)', color: C.muted, label: status };
  return (
    <span style={{ background: s.bg, color: s.color, fontFamily: 'sans-serif', fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
      {s.label}
    </span>
  );
}

function Input({ label, type = 'text', value, onChange, placeholder, name, required }) {
  return (
    <div style={{ marginBottom: '18px' }}>
      <label style={{ display: 'block', fontFamily: 'sans-serif', fontSize: '10.5px', fontWeight: 700, color: C.gold, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}{required && ' *'}</label>
      <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} required={required}
        style={{ width: '100%', background: C.bg, border: `1px solid ${C.borderHi}`, borderRadius: '8px', padding: '11px 14px', color: C.text, fontFamily: 'sans-serif', fontSize: '14px', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
        onFocus={e => e.target.style.borderColor = C.gold} onBlur={e => e.target.style.borderColor = C.borderHi} />
    </div>
  );
}

function Select({ label, value, onChange, name, options }) {
  return (
    <div style={{ marginBottom: '18px' }}>
      <label style={{ display: 'block', fontFamily: 'sans-serif', fontSize: '10.5px', fontWeight: 700, color: C.gold, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</label>
      <select name={name} value={value} onChange={onChange}
        style={{ width: '100%', background: C.bg, border: `1px solid ${C.borderHi}`, borderRadius: '8px', padding: '11px 14px', color: C.text, fontFamily: 'sans-serif', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

// ─── AUTH WRAPPER ─────────────────────────────────────────────
export default function Dashboard() {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authMode, setAuthMode] = useState('login'); // login | register
  const [authForm, setAuthForm] = useState({ email: '', password: '', fullName: '', phone: '', referralCode: '', role: 'trader' });
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchProfile(session.user.id);
      else setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setSession(session);
      if (session) fetchProfile(session.user.id);
      else { setProfile(null); setLoading(false); }
    });
    return () => subscription.unsubscribe();
  }, []);

  async function fetchProfile(uid) {
    const { data } = await supabase.from('profiles').select('*').eq('id', uid).single();
    setProfile(data);
    setLoading(false);
  }

  async function handleAuth(e) {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);
    try {
      if (authMode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({ email: authForm.email, password: authForm.password });
        if (error) throw error;
      } else {
        if (authForm.referralCode) {
          const { data: referrer } = await supabase.from('profiles').select('id').eq('referral_code', authForm.referralCode.toUpperCase()).single();
          if (!referrer) { setAuthError('Invalid referral code. Please check and try again.'); setAuthLoading(false); return; }
        }
        const { data: signUpData, error } = await supabase.auth.signUp({ email: authForm.email, password: authForm.password });
        if (error) throw error;
        const { data: referrer } = authForm.referralCode
          ? await supabase.from('profiles').select('id').eq('referral_code', authForm.referralCode.toUpperCase()).single()
          : { data: null };
        await supabase.from('profiles').insert({
          id: signUpData.user.id,
          full_name: authForm.fullName,
          email: authForm.email,
          phone: authForm.phone,
          role: authForm.role,
          referred_by: referrer?.id || null,
          status: 'pending',
        });
        if (referrer) {
          await supabase.from('referrals').insert({ referrer_id: referrer.id, referred_id: signUpData.user.id, status: 'pending' });
        }
      }
    } catch (err) {
      setAuthError(err.message);
    }
    setAuthLoading(false);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  if (loading) return (
    <div style={{ minHeight: '100vh', background: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ color: C.gold, fontFamily: 'sans-serif', fontSize: '16px' }}>Loading PPG...</div>
      <GlobalStyles />
    </div>
  );

  if (!session || !profile) return <AuthScreen authMode={authMode} setAuthMode={setAuthMode} authForm={authForm} setAuthForm={setAuthForm} authError={authError} authLoading={authLoading} handleAuth={handleAuth} />;

  if (profile.status === 'pending') return (
    <div style={{ minHeight: '100vh', background: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <GlobalStyles />
      <Card style={{ maxWidth: '480px', textAlign: 'center' }}>
        <div style={{ fontSize: '40px', marginBottom: '16px' }}>⏳</div>
        <h2 style={{ fontFamily: 'Georgia,serif', color: C.text, marginBottom: '10px' }}>Application Under Review</h2>
        <p style={{ color: C.muted, fontFamily: 'sans-serif', fontSize: '14px', lineHeight: 1.6 }}>Your account is pending operational review. Once processed, updates will structuralize across your profile rails.</p>
        <div style={{ marginTop: '20px' }}>
          <GoldBtn variant="ghost" onClick={handleLogout}>Sign Out</GoldBtn>
        </div>
      </Card>
    </div>
  );

  if (profile.status === 'rejected' || profile.status === 'suspended') return (
    <div style={{ minHeight: '100vh', background: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <GlobalStyles />
      <Card style={{ maxWidth: '480px', textAlign: 'center' }}>
        <div style={{ fontSize: '40px', marginBottom: '16px' }}>🚫</div>
        <h2 style={{ fontFamily: 'Georgia,serif', color: C.red, marginBottom: '10px' }}>Account {profile.status === 'suspended' ? 'Suspended' : 'Rejected'}</h2>
        <p style={{ color: C.muted, fontFamily: 'sans-serif', fontSize: '14px', lineHeight: 1.6 }}>Please contact system parameters or designated entry terminals for configuration adjustments.</p>
        <div style={{ marginTop: '20px' }}><GoldBtn variant="ghost" onClick={handleLogout}>Sign Out</GoldBtn></div>
      </Card>
    </div>
  );

  return (
    <>
      <GlobalStyles />
      {profile.role === 'trader'  && <TraderDashboard  profile={profile} onLogout={handleLogout} refreshProfile={() => fetchProfile(profile.id)} />}
      {profile.role === 'manager' && <ManagerDashboard profile={profile} onLogout={handleLogout} refreshProfile={() => fetchProfile(profile.id)} />}
      {profile.role === 'admin'   && <AdminDashboard   profile={profile} onLogout={handleLogout} refreshProfile={() => fetchProfile(profile.id)} />}
    </>
  );
}

// ─── AUTH SCREEN ──────────────────────────────────────────────
function AuthScreen({ authMode, setAuthMode, authForm, setAuthForm, authError, authLoading, handleAuth }) {
  const set = (k, v) => setAuthForm(f => ({ ...f, [k]: v }));
  return (
    <div style={{ minHeight: '100vh', background: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <GlobalStyles />
      <div style={{ width: '100%', maxWidth: '440px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontFamily: 'Georgia,serif', fontSize: '28px', fontWeight: 900, fontStyle: 'italic', ...shimmer, marginBottom: '4px' }}>PPG Trading Club</div>
          <div style={{ fontFamily: 'sans-serif', fontSize: '11px', color: C.muted, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Member Portal</div>
        </div>
        <Card>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '28px' }}>
            {['login','register'].map(m => (
              <button key={m} onClick={() => setAuthMode(m)} style={{ flex: 1, padding: '10px', borderRadius: '7px', border: 'none', cursor: 'pointer', fontFamily: 'sans-serif', fontWeight: 700, fontSize: '13px', background: authMode === m ? 'linear-gradient(135deg,#c4a050,#f0d080)' : C.bg2, color: authMode === m ? '#050814' : C.muted, transition: 'all 0.2s' }}>
                {m === 'login' ? 'Sign In' : 'Register'}
              </button>
            ))}
          </div>
          <form onSubmit={handleAuth}>
            {authMode === 'register' && (
              <>
                <Input label="Full Legal Name" value={authForm.fullName} onChange={e => set('fullName', e.target.value)} required />
                <Input label="Phone Contact" value={authForm.phone} onChange={e => set('phone', e.target.value)} />
                <Select label="Joining As" value={authForm.role} onChange={e => set('role', e.target.value)} options={[{ value:'trader', label:'Trader' }, { value:'manager', label:'Manager' }]} />
                <Input label="Referral Code" value={authForm.referralCode} onChange={e => set('referralCode', e.target.value)} placeholder="Required to join" required />
              </>
            )}
            <Input label="Email Address" type="email" value={authForm.email} onChange={e => set('email', e.target.value)} required />
            <Input label="Password" type="password" value={authForm.password} onChange={e => set('password', e.target.value)} required />
            {authError && <div style={{ background: 'rgba(244,63,94,0.08)', border: '1px solid rgba(244,63,94,0.3)', color: C.red, borderRadius: '7px', padding: '10px 14px', fontFamily: 'sans-serif', fontSize: '12.5px', marginBottom: '16px' }}>{authError}</div>}
            <GoldBtn disabled={authLoading}>{authLoading ? 'Please wait...' : authMode === 'login' ? 'Sign In' : 'Create Account'}</GoldBtn>
          </form>
          <p style={{ fontFamily: 'sans-serif', fontSize: '11px', color: C.dim, marginTop: '16px', textAlign: 'center', lineHeight: 1.5 }}>
            By accessing this portal you confirm execution criteria and accept all risk disclosures.
          </p>
        </Card>
        <p style={{ textAlign: 'center', marginTop: '16px' }}>
          <a href="/" style={{ color: C.muted, fontFamily: 'sans-serif', fontSize: '12px', textDecoration: 'none' }}>← Back to main site</a>
        </p>
      </div>
    </div>
  );
}

// ─── GLOBAL STYLES ────────────────────────────────────────────
function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;700&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { background: #050814; color: #f0e8d0; font-family: sans-serif; }
      ::-webkit-scrollbar { width: 5px; height: 5px; }
      ::-webkit-scrollbar-track { background: #070a1a; }
      ::-webkit-scrollbar-thumb { background: rgba(196,160,80,0.3); border-radius: 4px; }
      @keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
      input[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; }
      select option { background: #0a0d1e; color: #f0e8d0; }
    `}</style>
  );
}
