// Dashboard.jsx — PPG Trading Club
// Requires: @supabase/supabase-js, react, react-dom
// Place supabase.js in the same directory and fill in your credentials.

import { useState, useEffect, useCallback } from 'react';
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

function StatCard({ label, value, sub, color = C.gold, icon }) {
  return (
    <Card style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span style={{ fontFamily: 'sans-serif', fontSize: '11px', color: C.muted, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>{label}</span>
        {icon && <span style={{ fontSize: '20px' }}>{icon}</span>}
      </div>
      <div style={{ fontFamily: 'Georgia,serif', fontSize: '2rem', fontWeight: 900, color }}>{value}</div>
      {sub && <div style={{ fontFamily: 'sans-serif', fontSize: '11.5px', color: C.dim }}>{sub}</div>}
    </Card>
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

function Table({ cols, rows, emptyMsg = 'No records found.' }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'sans-serif', fontSize: '13px' }}>
        <thead>
          <tr style={{ borderBottom: `1px solid ${C.border}` }}>
            {cols.map(c => (
              <th key={c} style={{ padding: '10px 12px', color: C.muted, fontWeight: 700, textAlign: 'left', fontSize: '10.5px', textTransform: 'uppercase', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr><td colSpan={cols.length} style={{ padding: '28px', textAlign: 'center', color: C.dim, fontSize: '13px' }}>{emptyMsg}</td></tr>
          ) : rows.map((row, i) => (
            <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, transition: 'background 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(196,160,80,0.03)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              {row.map((cell, j) => (
                <td key={j} style={{ padding: '12px', color: C.text, verticalAlign: 'middle' }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Modal({ title, onClose, children }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(3,5,13,0.92)', backdropFilter: 'blur(12px)' }} />
      <div style={{ position: 'relative', zIndex: 310, width: '100%', maxWidth: '520px', background: C.bg3, border: `1px solid ${C.borderHi}`, borderRadius: '14px', padding: '32px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 24px 64px rgba(0,0,0,0.8)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h3 style={{ fontFamily: 'Georgia,serif', fontSize: '1.3rem', color: C.text, fontWeight: 900 }}>{title}</h3>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: C.muted, fontSize: '20px', cursor: 'pointer' }}>✕</button>
        </div>
        {children}
      </div>
    </div>
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

function SidebarItem({ icon, label, active, onClick }) {
  return (
    <button onClick={onClick} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '11px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', textAlign: 'left', background: active ? 'rgba(196,160,80,0.1)' : 'transparent', color: active ? C.gold : C.muted, fontFamily: 'sans-serif', fontSize: '13.5px', fontWeight: active ? 700 : 400, transition: 'all 0.18s', borderLeft: active ? `3px solid ${C.gold}` : '3px solid transparent' }}
      onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(196,160,80,0.04)'; }}
      onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}>
      <span style={{ fontSize: '17px', minWidth: '20px' }}>{icon}</span>{label}
    </button>
  );
}

function Loader() {
  return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px', color: C.muted, fontFamily: 'sans-serif', fontSize: '14px' }}>Loading...</div>;
}

function fmt(n) { return typeof n === 'number' ? `$${n.toFixed(2)}` : '$0.00'; }
function fmtDate(d) { return d ? new Date(d).toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' }) : '—'; }

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
        // Verify referral exists
        if (authForm.referralCode) {
          const { data: referrer } = await supabase.from('profiles').select('id').eq('referral_code', authForm.referralCode.toUpperCase()).single();
          if (!referrer) { setAuthError('Invalid referral code. Please check and try again.'); setAuthLoading(false); return; }
        }
        const { data: signUpData, error } = await supabase.auth.signUp({ email: authForm.email, password: authForm.password });
        if (error) throw error;
        // Insert profile
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
        <p style={{ color: C.muted, fontFamily: 'sans-serif', fontSize: '14px', lineHeight: 1.6 }}>Your account is pending admin approval. Our team will contact you on WhatsApp within 24 hours once your account is activated.</p>
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
        <p style={{ color: C.muted, fontFamily: 'sans-serif', fontSize: '14px', lineHeight: 1.6 }}>Please contact support at contact.ppgsolutions@gmail.com or WhatsApp +234 813 050 0659 for assistance.</p>
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
                <Input label="Phone / WhatsApp" value={authForm.phone} onChange={e => set('phone', e.target.value)} />
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
            By accessing this portal you confirm you are 18+ and accept all risk disclosures.
          </p>
        </Card>
        <p style={{ textAlign: 'center', marginTop: '16px' }}>
          <a href="/" style={{ color: C.muted, fontFamily: 'sans-serif', fontSize: '12px', textDecoration: 'none' }}>← Back to main site</a>
        </p>
      </div>
    </div>
  );
}

// ─── DASHBOARD SHELL ──────────────────────────────────────────
function DashboardShell({ profile, onLogout, nav, activeSection, setActiveSection, children }) {
  const roleColor = { trader: '#60a5fa', manager: C.gold, admin: C.red };
  return (
    <div style={{ minHeight: '100vh', background: C.bg, display: 'flex' }}>
      {/* Sidebar */}
      <aside style={{ width: '240px', minHeight: '100vh', background: C.bg2, borderRight: `1px solid ${C.border}`, display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 50 }}>
        <div style={{ padding: '20px 16px 16px', borderBottom: `1px solid ${C.border}` }}>
          <div style={{ fontFamily: 'Georgia,serif', fontSize: '16px', fontWeight: 900, fontStyle: 'italic', ...shimmer }}>Trading Club</div>
          <div style={{ fontFamily: 'sans-serif', fontSize: '9px', color: C.dim, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '2px' }}>Penny Partners Group</div>
        </div>
        <div style={{ padding: '16px 10px', flex: 1, overflowY: 'auto' }}>
          {nav.map(item => (
            <SidebarItem key={item.id} icon={item.icon} label={item.label} active={activeSection === item.id} onClick={() => setActiveSection(item.id)} />
          ))}
        </div>
        <div style={{ padding: '16px', borderTop: `1px solid ${C.border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(196,160,80,0.1)', border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', fontSize: '14px', fontWeight: 700, color: C.gold }}>
              {profile.full_name?.[0]?.toUpperCase() || '?'}
            </div>
            <div>
              <div style={{ fontFamily: 'sans-serif', fontSize: '12.5px', color: C.text, fontWeight: 600, maxWidth: '140px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{profile.full_name}</div>
              <Badge status={profile.role} />
            </div>
          </div>
          <GoldBtn variant="ghost" small onClick={onLogout}>Sign Out</GoldBtn>
        </div>
      </aside>
      {/* Main */}
      <main style={{ marginLeft: '240px', flex: 1, padding: '32px', minHeight: '100vh' }}>
        {children}
      </main>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// TRADER DASHBOARD
// ══════════════════════════════════════════════════════════════
function TraderDashboard({ profile, onLogout, refreshProfile }) {
  const [section, setSection] = useState('overview');
  const [account, setAccount] = useState(null);
  const [trades, setTrades] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [deposits, setDeposits] = useState([]);
  const [referrals, setReferrals] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);

  const nav = [
    { id: 'overview',      icon: '📊', label: 'Overview' },
    { id: 'trades',        icon: '📈', label: 'Trade History' },
    { id: 'withdraw',      icon: '💸', label: 'Withdrawals' },
    { id: 'deposit',       icon: '💰', label: 'Deposit' },
    { id: 'referrals',     icon: '🔗', label: 'Referrals' },
    { id: 'notifications', icon: '🔔', label: 'Notifications' },
    { id: 'profile',       icon: '👤', label: 'Profile & Settings' },
  ];

  const load = useCallback(async () => {
    setLoading(true);
    const [acct, trd, wdr, dep, ref, ann, asgn] = await Promise.all([
      supabase.from('trader_accounts').select('*').eq('trader_id', profile.id).single(),
      supabase.from('trade_logs').select('*').eq('trader_id', profile.id).order('trade_date', { ascending: false }),
      supabase.from('withdrawal_requests').select('*').eq('trader_id', profile.id).order('created_at', { ascending: false }),
      supabase.from('deposits').select('*').eq('trader_id', profile.id).order('created_at', { ascending: false }),
      supabase.from('referrals').select('*, referred:referred_id(full_name,email,status,created_at)').eq('referrer_id', profile.id),
      supabase.from('announcements').select('*').in('target_role', ['all','trader']).order('created_at', { ascending: false }),
      supabase.from('manager_assignments').select('*, manager:manager_id(full_name,email,phone)').eq('trader_id', profile.id).eq('active', true).single(),
    ]);
    setAccount(acct.data);
    setTrades(trd.data || []);
    setWithdrawals(wdr.data || []);
    setDeposits(dep.data || []);
    setReferrals(ref.data || []);
    setAnnouncements(ann.data || []);
    setAssignment(asgn.data);
    setLoading(false);
  }, [profile.id]);

  useEffect(() => { load(); }, [load]);

  const sections = {
    overview:      <TraderOverview account={account} trades={trades} assignment={assignment} profile={profile} loading={loading} />,
    trades:        <TraderTrades trades={trades} loading={loading} />,
    withdraw:      <TraderWithdrawals withdrawals={withdrawals} account={account} onSubmit={load} profile={profile} />,
    deposit:       <TraderDeposit deposits={deposits} profile={profile} onSubmit={load} />,
    referrals:     <TraderReferrals referrals={referrals} profile={profile} />,
    notifications: <Notifications announcements={announcements} profile={profile} />,
    profile:       <ProfileSettings profile={profile} onSaved={refreshProfile} />,
  };

  return (
    <DashboardShell profile={profile} onLogout={onLogout} nav={nav} activeSection={section} setActiveSection={setSection}>
      {sections[section]}
    </DashboardShell>
  );
}

function TraderOverview({ account, trades, assignment, profile, loading }) {
  if (loading) return <Loader />;
  const lastTrade = trades[0];
  const totalChange = account ? account.total_profit - account.total_loss : 0;
  const pct = account?.initial_deposit > 0 ? ((totalChange / account.initial_deposit) * 100).toFixed(2) : '0.00';
  return (
    <div>
      <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.8rem', color: C.text, marginBottom: '6px' }}>Welcome back, {profile.full_name?.split(' ')[0]}</h2>
      <p style={{ color: C.muted, fontFamily: 'sans-serif', fontSize: '13.5px', marginBottom: '28px' }}>Here's your account overview.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '16px', marginBottom: '28px' }}>
        <StatCard label="Current Balance" value={fmt(account?.current_balance)} sub="In your broker account" icon="💰" />
        <StatCard label="Total Profit" value={fmt(account?.total_profit)} color={C.green} icon="📈" />
        <StatCard label="Total Loss" value={fmt(account?.total_loss)} color={C.red} icon="📉" />
        <StatCard label="Net Return" value={`${pct}%`} color={totalChange >= 0 ? C.green : C.red} sub={`From initial deposit`} icon="📊" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '20px' }}>
        <Card>
          <h3 style={{ fontFamily: 'Georgia,serif', color: C.text, fontSize: '1rem', marginBottom: '16px' }}>Your Manager</h3>
          {assignment?.manager ? (
            <div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(196,160,80,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.gold, fontFamily: 'sans-serif', fontWeight: 900, fontSize: '18px' }}>
                  {assignment.manager.full_name?.[0]?.toUpperCase()}
                </div>
                <div>
                  <div style={{ color: C.text, fontFamily: 'sans-serif', fontWeight: 700, fontSize: '14px' }}>{assignment.manager.full_name}</div>
                  <div style={{ color: C.muted, fontFamily: 'sans-serif', fontSize: '12px' }}>{assignment.manager.email}</div>
                </div>
              </div>
              <div style={{ fontFamily: 'sans-serif', fontSize: '12px', color: C.dim }}>Risk Tier: <span style={{ color: C.gold, fontWeight: 700 }}>{profile.risk_tier}</span></div>
            </div>
          ) : (
            <p style={{ color: C.dim, fontFamily: 'sans-serif', fontSize: '13px' }}>No manager assigned yet. An admin will assign your manager shortly.</p>
          )}
        </Card>
        <Card>
          <h3 style={{ fontFamily: 'Georgia,serif', color: C.text, fontSize: '1rem', marginBottom: '16px' }}>Last 5 Trades</h3>
          {trades.slice(0, 5).length > 0 ? trades.slice(0, 5).map((t, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: i < 4 ? `1px solid ${C.border}` : 'none' }}>
              <span style={{ fontFamily: 'sans-serif', fontSize: '12.5px', color: C.muted }}>{fmtDate(t.trade_date)}</span>
              <span style={{ fontFamily: 'sans-serif', fontSize: '13px', fontWeight: 700, color: t.amount >= 0 ? C.green : C.red }}>{t.amount >= 0 ? '+' : ''}{fmt(t.amount)}</span>
            </div>
          )) : <p style={{ color: C.dim, fontFamily: 'sans-serif', fontSize: '13px' }}>No trades logged yet.</p>}
        </Card>
      </div>
    </div>
  );
}

function TraderTrades({ trades, loading }) {
  if (loading) return <Loader />;
  return (
    <div>
      <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.6rem', color: C.text, marginBottom: '24px' }}>Trade History</h2>
      <Card>
        <Table
          cols={['Date', 'P&L', 'Balance After', 'Note']}
          rows={trades.map(t => [
            fmtDate(t.trade_date),
            <span style={{ color: t.amount >= 0 ? C.green : C.red, fontWeight: 700 }}>{t.amount >= 0 ? '+' : ''}{fmt(t.amount)}</span>,
            fmt(t.balance_after),
            <span style={{ color: C.muted, fontSize: '12px' }}>{t.note || '—'}</span>,
          ])}
          emptyMsg="No trades have been logged yet."
        />
      </Card>
    </div>
  );
}

function TraderWithdrawals({ withdrawals, account, onSubmit, profile }) {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ amount: '', method: 'bank_transfer', bank_name: '', account_number: '', account_name: '', wallet_address: '' });
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState('');

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  async function submit(e) {
    e.preventDefault(); setErr('');
    if (parseFloat(form.amount) > (account?.current_balance || 0)) { setErr('Amount exceeds your current balance.'); return; }
    if (parseFloat(form.amount) <= 0) { setErr('Enter a valid withdrawal amount.'); return; }
    setSubmitting(true);
    const details = form.method === 'bank_transfer'
      ? { bank_name: form.bank_name, account_number: form.account_number, account_name: form.account_name }
      : { wallet_address: form.wallet_address };
    const { error } = await supabase.from('withdrawal_requests').insert({ trader_id: profile.id, amount: parseFloat(form.amount), method: form.method, account_details: details });
    if (error) setErr(error.message);
    else { setModal(false); onSubmit(); }
    setSubmitting(false);
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.6rem', color: C.text }}>Withdrawals</h2>
        <GoldBtn onClick={() => setModal(true)}>+ New Request</GoldBtn>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <StatCard label="Available Balance" value={fmt(account?.current_balance)} sub="In your broker account" icon="💰" />
      </div>
      <Card>
        <Table
          cols={['Date', 'Amount', 'Method', 'Status', 'Paid At']}
          rows={withdrawals.map(w => [
            fmtDate(w.created_at),
            <span style={{ fontWeight: 700, color: C.gold }}>{fmt(w.amount)}</span>,
            w.method.replace('_', ' ').toUpperCase(),
            <Badge status={w.status} />,
            w.paid_at ? fmtDate(w.paid_at) : '—',
          ])}
          emptyMsg="No withdrawal requests yet."
        />
      </Card>
      {modal && (
        <Modal title="Withdrawal Request" onClose={() => setModal(false)}>
          <form onSubmit={submit}>
            <Input label="Amount (USD)" type="number" value={form.amount} onChange={e => set('amount', e.target.value)} required placeholder="0.00" />
            <Select label="Payment Method" value={form.method} onChange={e => set('method', e.target.value)} options={[
              { value: 'bank_transfer', label: 'Bank Transfer' },
              { value: 'bitcoin', label: 'Bitcoin' },
              { value: 'ethereum', label: 'Ethereum' },
              { value: 'usdt_trc20', label: 'USDT TRC20' },
              { value: 'opay', label: 'Opay' },
            ]} />
            {form.method === 'bank_transfer' ? (
              <>
                <Input label="Bank Name" value={form.bank_name} onChange={e => set('bank_name', e.target.value)} required />
                <Input label="Account Number" value={form.account_number} onChange={e => set('account_number', e.target.value)} required />
                <Input label="Account Name" value={form.account_name} onChange={e => set('account_name', e.target.value)} required />
              </>
            ) : (
              <Input label="Wallet Address" value={form.wallet_address} onChange={e => set('wallet_address', e.target.value)} required />
            )}
            {err && <div style={{ color: C.red, fontFamily: 'sans-serif', fontSize: '12.5px', marginBottom: '14px' }}>{err}</div>}
            <GoldBtn disabled={submitting}>{submitting ? 'Submitting...' : 'Submit Request'}</GoldBtn>
          </form>
        </Modal>
      )}
    </div>
  );
}

function TraderDeposit({ deposits, profile, onSubmit }) {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ amount: '', method: 'bank_transfer', reference: '' });
  const [submitting, setSubmitting] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  async function submit(e) {
    e.preventDefault(); setSubmitting(true);
    await supabase.from('deposits').insert({ trader_id: profile.id, amount: parseFloat(form.amount), method: form.method, reference: form.reference });
    setModal(false); onSubmit(); setSubmitting(false);
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.6rem', color: C.text }}>Deposit</h2>
        <GoldBtn onClick={() => setModal(true)}>+ Log Deposit</GoldBtn>
      </div>
      <Card style={{ marginBottom: '20px' }}>
        <h3 style={{ fontFamily: 'Georgia,serif', color: C.text, marginBottom: '16px', fontSize: '1rem' }}>How to Deposit</h3>
        <p style={{ color: C.muted, fontFamily: 'sans-serif', fontSize: '13.5px', lineHeight: 1.7, marginBottom: '12px' }}>
          Deposits go directly into your broker account — not to PPG. Follow these steps:
        </p>
        {['Log into your broker account (Exness, HFM, or FXTM).','Navigate to the Deposit section.','Transfer your desired amount.','Log your deposit here so your manager is notified.'].map((s, i) => (
          <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <span style={{ color: C.gold, fontFamily: 'sans-serif', fontWeight: 900, fontSize: '12px', minWidth: '20px' }}>0{i+1}</span>
            <span style={{ color: C.muted, fontFamily: 'sans-serif', fontSize: '13px' }}>{s}</span>
          </div>
        ))}
      </Card>
      <Card>
        <h3 style={{ fontFamily: 'Georgia,serif', color: C.text, marginBottom: '16px', fontSize: '1rem' }}>Deposit History</h3>
        <Table
          cols={['Date', 'Amount', 'Method', 'Reference', 'Status']}
          rows={deposits.map(d => [fmtDate(d.created_at), fmt(d.amount), d.method.replace('_',' '), d.reference || '—', <Badge status={d.status} />])}
          emptyMsg="No deposits recorded yet."
        />
      </Card>
      {modal && (
        <Modal title="Log a Deposit" onClose={() => setModal(false)}>
          <form onSubmit={submit}>
            <Input label="Amount Deposited (USD)" type="number" value={form.amount} onChange={e => set('amount', e.target.value)} required placeholder="0.00" />
            <Select label="Method Used" value={form.method} onChange={e => set('method', e.target.value)} options={[
              { value: 'bank_transfer', label: 'Bank Transfer' }, { value: 'bitcoin', label: 'Bitcoin' },
              { value: 'ethereum', label: 'Ethereum' }, { value: 'usdt_trc20', label: 'USDT TRC20' }, { value: 'opay', label: 'Opay' },
            ]} />
            <Input label="Transaction Reference (optional)" value={form.reference} onChange={e => set('reference', e.target.value)} placeholder="e.g. TXN123456" />
            <p style={{ color: C.dim, fontFamily: 'sans-serif', fontSize: '11.5px', marginBottom: '16px', lineHeight: 1.5 }}>
              This notifies your manager. An admin will confirm once verified. Your balance will be updated after confirmation.
            </p>
            <GoldBtn disabled={submitting}>{submitting ? 'Saving...' : 'Log Deposit'}</GoldBtn>
          </form>
        </Modal>
      )}
    </div>
  );
}

function TraderReferrals({ referrals, profile }) {
  const link = `${window.location.origin}/?ref=${profile.referral_code}`;
  const [copied, setCopied] = useState(false);
  function copy() { navigator.clipboard.writeText(link); setCopied(true); setTimeout(() => setCopied(false), 2000); }
  return (
    <div>
      <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.6rem', color: C.text, marginBottom: '24px' }}>Referrals</h2>
      <Card style={{ marginBottom: '20px' }}>
        <h3 style={{ fontFamily: 'Georgia,serif', color: C.text, marginBottom: '12px', fontSize: '1rem' }}>Your Referral Code</h3>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <code style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: '7px', padding: '10px 16px', color: C.gold, fontFamily: 'monospace', fontSize: '18px', fontWeight: 900, letterSpacing: '0.15em' }}>{profile.referral_code}</code>
          <GoldBtn variant="ghost" onClick={copy}>{copied ? '✓ Copied!' : 'Copy Link'}</GoldBtn>
        </div>
        <p style={{ color: C.dim, fontFamily: 'sans-serif', fontSize: '12px', marginTop: '10px' }}>Share this code with people you want to invite. They must enter it during registration.</p>
      </Card>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: '14px', marginBottom: '20px' }}>
        <StatCard label="Total Referred" value={referrals.length} icon="👥" />
        <StatCard label="Active Members" value={referrals.filter(r => r.referred?.status === 'active').length} color={C.green} icon="✅" />
        <StatCard label="Pending" value={referrals.filter(r => r.referred?.status === 'pending').length} color="#fbbf24" icon="⏳" />
      </div>
      <Card>
        <Table
          cols={['Name', 'Email', 'Joined', 'Status']}
          rows={referrals.map(r => [r.referred?.full_name || '—', r.referred?.email || '—', fmtDate(r.referred?.created_at), <Badge status={r.referred?.status || 'pending'} />])}
          emptyMsg="You haven't referred anyone yet."
        />
      </Card>
    </div>
  );
}

function Notifications({ announcements, profile }) {
  const [reads, setReads] = useState(new Set());
  useEffect(() => {
    supabase.from('notification_reads').select('announcement_id').eq('user_id', profile.id)
      .then(({ data }) => setReads(new Set((data || []).map(r => r.announcement_id))));
  }, [profile.id]);

  async function markRead(id) {
    if (reads.has(id)) return;
    await supabase.from('notification_reads').insert({ user_id: profile.id, announcement_id: id });
    setReads(r => new Set([...r, id]));
  }

  return (
    <div>
      <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.6rem', color: C.text, marginBottom: '24px' }}>Notifications</h2>
      {announcements.length === 0
        ? <Card><p style={{ color: C.muted, fontFamily: 'sans-serif', fontSize: '13px', textAlign: 'center', padding: '20px' }}>No announcements yet.</p></Card>
        : announcements.map(a => (
          <Card key={a.id} style={{ marginBottom: '14px', borderColor: reads.has(a.id) ? C.border : C.borderHi, cursor: 'pointer' }} onClick={() => markRead(a.id)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
              <h3 style={{ fontFamily: 'Georgia,serif', color: C.text, fontSize: '1rem' }}>{!reads.has(a.id) && <span style={{ color: C.gold, marginRight: '8px' }}>●</span>}{a.title}</h3>
              <span style={{ fontFamily: 'sans-serif', fontSize: '11px', color: C.dim, whiteSpace: 'nowrap', marginLeft: '10px' }}>{fmtDate(a.created_at)}</span>
            </div>
            <p style={{ color: C.muted, fontFamily: 'sans-serif', fontSize: '13.5px', lineHeight: 1.6 }}>{a.body}</p>
          </Card>
        ))
      }
    </div>
  );
}

function ProfileSettings({ profile, onSaved }) {
  const [form, setForm] = useState({ full_name: profile.full_name, phone: profile.phone || '', country: profile.country || '', risk_tier: profile.risk_tier || '1%', broker: profile.broker || '' });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  async function save(e) {
    e.preventDefault(); setSaving(true);
    await supabase.from('profiles').update({ full_name: form.full_name, phone: form.phone, country: form.country, risk_tier: form.risk_tier, broker: form.broker }).eq('id', profile.id);
    setSaved(true); setSaving(false); onSaved(); setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div>
      <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.6rem', color: C.text, marginBottom: '24px' }}>Profile & Settings</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '20px' }}>
        <Card>
          <h3 style={{ fontFamily: 'Georgia,serif', color: C.text, marginBottom: '20px', fontSize: '1rem' }}>Personal Details</h3>
          <form onSubmit={save}>
            <Input label="Full Name" value={form.full_name} onChange={e => set('full_name', e.target.value)} required />
            <Input label="Phone / WhatsApp" value={form.phone} onChange={e => set('phone', e.target.value)} />
            <Input label="Country" value={form.country} onChange={e => set('country', e.target.value)} />
            <Select label="Risk Tier" value={form.risk_tier} onChange={e => set('risk_tier', e.target.value)} options={['0.1%','0.5%','1%','5%','10%','15%','20%'].map(v => ({ value: v, label: v }))} />
            <Select label="Broker" value={form.broker} onChange={e => set('broker', e.target.value)} options={[
              { value: '', label: 'No preference' }, { value: 'Exness', label: 'Exness' }, { value: 'HFM', label: 'HFM' }, { value: 'FXTM', label: 'FXTM' },
            ]} />
            {saved && <div style={{ color: C.green, fontFamily: 'sans-serif', fontSize: '12.5px', marginBottom: '12px' }}>✓ Profile saved successfully.</div>}
            <GoldBtn disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</GoldBtn>
          </form>
        </Card>
        <Card>
          <h3 style={{ fontFamily: 'Georgia,serif', color: C.text, marginBottom: '16px', fontSize: '1rem' }}>Account Info</h3>
          {[['Email', profile.email], ['Role', profile.role], ['Member Since', fmtDate(profile.created_at)], ['KYC Status', profile.kyc_status], ['Subscription', profile.subscription_active ? 'Active' : 'Inactive']].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: `1px solid ${C.border}`, fontFamily: 'sans-serif', fontSize: '13px' }}>
              <span style={{ color: C.muted }}>{k}</span>
              <span style={{ color: C.text, fontWeight: 600 }}>{v}</span>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// MANAGER DASHBOARD
// ══════════════════════════════════════════════════════════════
function ManagerDashboard({ profile, onLogout, refreshProfile }) {
  const [section, setSection] = useState('overview');
  const [traders, setTraders] = useState([]);
  const [tradeLogs, setTradeLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const nav = [
    { id: 'overview',    icon: '📊', label: 'Overview' },
    { id: 'traders',     icon: '👥', label: 'My Traders' },
    { id: 'log',         icon: '✏️', label: 'Log Trade' },
    { id: 'history',     icon: '📈', label: 'Trade History' },
    { id: 'performance', icon: '🏆', label: 'My Performance' },
    { id: 'profile',     icon: '👤', label: 'Profile' },
  ];

  const load = useCallback(async () => {
    setLoading(true);
    const { data: assignments } = await supabase
      .from('manager_assignments')
      .select('*, trader:trader_id(*, account:trader_accounts(*))')
      .eq('manager_id', profile.id)
      .eq('active', true);
    const { data: logs } = await supabase
      .from('trade_logs')
      .select('*, trader:trader_id(full_name)')
      .eq('manager_id', profile.id)
      .order('created_at', { ascending: false });
    setTraders(assignments || []);
    setTradeLogs(logs || []);
    setLoading(false);
  }, [profile.id]);

  useEffect(() => { load(); }, [load]);

  const sections = {
    overview:    <ManagerOverview traders={traders} tradeLogs={tradeLogs} profile={profile} loading={loading} />,
    traders:     <ManagerTraders traders={traders} loading={loading} />,
    log:         <ManagerLogTrade traders={traders} profile={profile} onLogged={load} />,
    history:     <ManagerHistory tradeLogs={tradeLogs} loading={loading} />,
    performance: <ManagerPerformance tradeLogs={tradeLogs} traders={traders} profile={profile} loading={loading} />,
    profile:     <ProfileSettings profile={profile} onSaved={refreshProfile} />,
  };

  return (
    <DashboardShell profile={profile} onLogout={onLogout} nav={nav} activeSection={section} setActiveSection={setSection}>
      {sections[section]}
    </DashboardShell>
  );
}

function ManagerOverview({ traders, tradeLogs, profile, loading }) {
  if (loading) return <Loader />;
  const totalManaged = traders.reduce((s, t) => s + (t.trader?.account?.current_balance || 0), 0);
  const totalProfit = tradeLogs.filter(l => l.amount > 0).reduce((s, l) => s + l.amount, 0);
  const totalLoss = tradeLogs.filter(l => l.amount < 0).reduce((s, l) => s + Math.abs(l.amount), 0);
  const winRate = tradeLogs.length > 0 ? ((tradeLogs.filter(l => l.amount > 0).length / tradeLogs.length) * 100).toFixed(1) : '0.0';
  return (
    <div>
      <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.8rem', color: C.text, marginBottom: '6px' }}>Manager Portal</h2>
      <p style={{ color: C.muted, fontFamily: 'sans-serif', fontSize: '13.5px', marginBottom: '28px' }}>Welcome back, {profile.full_name?.split(' ')[0]}.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '16px', marginBottom: '28px' }}>
        <StatCard label="Traders Managed" value={traders.length} icon="👥" />
        <StatCard label="Capital Under Management" value={fmt(totalManaged)} icon="💼" />
        <StatCard label="Total Profits Logged" value={fmt(totalProfit)} color={C.green} icon="📈" />
        <StatCard label="Win Rate" value={`${winRate}%`} color={parseFloat(winRate) >= 50 ? C.green : C.red} icon="🏆" />
      </div>
      <Card>
        <h3 style={{ fontFamily: 'Georgia,serif', color: C.text, marginBottom: '16px', fontSize: '1rem' }}>Recent Trade Logs</h3>
        <Table
          cols={['Date', 'Trader', 'P&L', 'Note']}
          rows={tradeLogs.slice(0, 8).map(l => [
            fmtDate(l.trade_date),
            l.trader?.full_name || '—',
            <span style={{ color: l.amount >= 0 ? C.green : C.red, fontWeight: 700 }}>{l.amount >= 0 ? '+' : ''}{fmt(l.amount)}</span>,
            <span style={{ color: C.muted, fontSize: '12px' }}>{l.note || '—'}</span>,
          ])}
          emptyMsg="No trades logged yet."
        />
      </Card>
    </div>
  );
}

function ManagerTraders({ traders, loading }) {
  if (loading) return <Loader />;
  return (
    <div>
      <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.6rem', color: C.text, marginBottom: '24px' }}>My Traders ({traders.length})</h2>
      <div style={{ display: 'grid', gap: '14px' }}>
        {traders.length === 0 ? (
          <Card><p style={{ color: C.muted, fontFamily: 'sans-serif', fontSize: '13px', textAlign: 'center', padding: '20px' }}>No traders assigned yet.</p></Card>
        ) : traders.map((a, i) => {
          const t = a.trader;
          const acc = t?.account;
          return (
            <Card key={i} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr repeat(3,auto)', gap: '20px', alignItems: 'center' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(96,165,250,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#60a5fa', fontWeight: 900, fontFamily: 'sans-serif', fontSize: '18px' }}>{t?.full_name?.[0]}</div>
              <div>
                <div style={{ color: C.text, fontFamily: 'sans-serif', fontWeight: 700, fontSize: '14px' }}>{t?.full_name}</div>
                <div style={{ color: C.muted, fontFamily: 'sans-serif', fontSize: '12px' }}>{t?.email} · Risk: {t?.risk_tier}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ color: C.dim, fontFamily: 'sans-serif', fontSize: '10px', marginBottom: '2px' }}>Balance</div>
                <div style={{ color: C.gold, fontFamily: 'sans-serif', fontWeight: 700 }}>{fmt(acc?.current_balance)}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ color: C.dim, fontFamily: 'sans-serif', fontSize: '10px', marginBottom: '2px' }}>Net P&L</div>
                <div style={{ color: (acc?.total_profit - acc?.total_loss) >= 0 ? C.green : C.red, fontFamily: 'sans-serif', fontWeight: 700 }}>{fmt((acc?.total_profit || 0) - (acc?.total_loss || 0))}</div>
              </div>
              <Badge status={t?.status || 'pending'} />
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function ManagerLogTrade({ traders, profile, onLogged }) {
  const [form, setForm] = useState({ trader_id: '', amount: '', note: '', trade_date: new Date().toISOString().slice(0, 10) });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [err, setErr] = useState('');
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  async function submit(e) {
    e.preventDefault(); setErr(''); setSuccess('');
    if (!form.trader_id) { setErr('Select a trader.'); return; }
    setSubmitting(true);
    const { error } = await supabase.from('trade_logs').insert({
      trader_id: form.trader_id, manager_id: profile.id,
      amount: parseFloat(form.amount), note: form.note, trade_date: form.trade_date,
    });
    if (error) setErr(error.message);
    else { setSuccess('Trade logged successfully. Trader balance has been updated.'); setForm(f => ({ ...f, trader_id: '', amount: '', note: '' })); onLogged(); }
    setSubmitting(false);
  }

  return (
    <div>
      <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.6rem', color: C.text, marginBottom: '24px' }}>Log a Trade</h2>
      <Card style={{ maxWidth: '480px' }}>
        <p style={{ color: C.muted, fontFamily: 'sans-serif', fontSize: '13px', marginBottom: '20px', lineHeight: 1.6 }}>Enter the profit or loss amount for a specific trader. Use a positive number for profit, negative for loss (e.g. -50.00). The trader's balance will update automatically.</p>
        <form onSubmit={submit}>
          <Select label="Select Trader" value={form.trader_id} onChange={e => set('trader_id', e.target.value)} options={[{ value: '', label: '— Select a trader —' }, ...traders.map(a => ({ value: a.trader_id, label: a.trader?.full_name || a.trader_id }))]} />
          <Input label="Trade Date" type="date" value={form.trade_date} onChange={e => set('trade_date', e.target.value)} required />
          <Input label="Amount (USD) — use negative for loss" type="number" value={form.amount} onChange={e => set('amount', e.target.value)} placeholder="e.g. 25.00 or -15.00" required />
          <Input label="Note (optional)" value={form.note} onChange={e => set('note', e.target.value)} placeholder="e.g. EURUSD scalp session" />
          {err && <div style={{ color: C.red, fontFamily: 'sans-serif', fontSize: '12.5px', marginBottom: '14px' }}>{err}</div>}
          {success && <div style={{ color: C.green, fontFamily: 'sans-serif', fontSize: '12.5px', marginBottom: '14px' }}>✓ {success}</div>}
          <GoldBtn disabled={submitting}>{submitting ? 'Logging...' : 'Log Trade'}</GoldBtn>
        </form>
      </Card>
    </div>
  );
}

function ManagerHistory({ tradeLogs, loading }) {
  if (loading) return <Loader />;
  return (
    <div>
      <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.6rem', color: C.text, marginBottom: '24px' }}>Full Trade History</h2>
      <Card>
        <Table
          cols={['Date', 'Trader', 'P&L', 'Balance After', 'Note']}
          rows={tradeLogs.map(l => [
            fmtDate(l.trade_date),
            l.trader?.full_name || '—',
            <span style={{ color: l.amount >= 0 ? C.green : C.red, fontWeight: 700 }}>{l.amount >= 0 ? '+' : ''}{fmt(l.amount)}</span>,
            fmt(l.balance_after),
            <span style={{ color: C.muted, fontSize: '12px' }}>{l.note || '—'}</span>,
          ])}
          emptyMsg="No trades logged yet."
        />
      </Card>
    </div>
  );
}

function ManagerPerformance({ tradeLogs, traders, profile, loading }) {
  if (loading) return <Loader />;
  const wins = tradeLogs.filter(l => l.amount > 0);
  const losses = tradeLogs.filter(l => l.amount < 0);
  const winRate = tradeLogs.length > 0 ? ((wins.length / tradeLogs.length) * 100).toFixed(1) : '0.0';
  const avgWin = wins.length > 0 ? wins.reduce((s, l) => s + l.amount, 0) / wins.length : 0;
  const avgLoss = losses.length > 0 ? losses.reduce((s, l) => s + Math.abs(l.amount), 0) / losses.length : 0;
  return (
    <div>
      <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.6rem', color: C.text, marginBottom: '24px' }}>My Performance</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '16px', marginBottom: '24px' }}>
        <StatCard label="Total Trades Logged" value={tradeLogs.length} icon="📋" />
        <StatCard label="Win Rate" value={`${winRate}%`} color={parseFloat(winRate) >= 50 ? C.green : C.red} icon="🏆" />
        <StatCard label="Avg Winning Trade" value={fmt(avgWin)} color={C.green} icon="📈" />
        <StatCard label="Avg Losing Trade" value={fmt(avgLoss)} color={C.red} icon="📉" />
        <StatCard label="Total Traders" value={traders.length} icon="👥" />
        <StatCard label="Total Capital Managed" value={fmt(traders.reduce((s, t) => s + (t.trader?.account?.current_balance || 0), 0))} icon="💼" />
      </div>
      <Card>
        <h3 style={{ fontFamily: 'Georgia,serif', color: C.text, marginBottom: '16px', fontSize: '1rem' }}>Performance Per Trader</h3>
        <Table
          cols={['Trader', 'Trades', 'Total P&L', 'Current Balance']}
          rows={traders.map(a => {
            const logs = tradeLogs.filter(l => l.trader_id === a.trader_id);
            const pnl = logs.reduce((s, l) => s + l.amount, 0);
            return [
              a.trader?.full_name || '—',
              logs.length,
              <span style={{ color: pnl >= 0 ? C.green : C.red, fontWeight: 700 }}>{pnl >= 0 ? '+' : ''}{fmt(pnl)}</span>,
              fmt(a.trader?.account?.current_balance),
            ];
          })}
          emptyMsg="No data yet."
        />
      </Card>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// ADMIN DASHBOARD
// ══════════════════════════════════════════════════════════════
function AdminDashboard({ profile, onLogout, refreshProfile }) {
  const [section, setSection] = useState('overview');
  const [users, setUsers] = useState([]);
  const [applications, setApplications] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [deposits, setDeposits] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  const nav = [
    { id: 'overview',     icon: '📊', label: 'Overview' },
    { id: 'users',        icon: '👥', label: 'All Members' },
    { id: 'applications', icon: '📋', label: 'Applications' },
    { id: 'assignments',  icon: '🔗', label: 'Assign Managers' },
    { id: 'withdrawals',  icon: '💸', label: 'Withdrawals' },
    { id: 'deposits',     icon: '💰', label: 'Deposits' },
    { id: 'balances',     icon: '⚖️', label: 'Adjust Balances' },
    { id: 'kyc',          icon: '🪪', label: 'KYC Review' },
    { id: 'announce',     icon: '📣', label: 'Announcements' },
    { id: 'analytics',    icon: '📈', label: 'Analytics' },
  ];

  const load = useCallback(async () => {
    setLoading(true);
    const [u, app, w, dep, ann, asgn] = await Promise.all([
      supabase.from('profiles').select('*, account:trader_accounts(*)').order('created_at', { ascending: false }),
      supabase.from('applications').select('*').order('created_at', { ascending: false }),
      supabase.from('withdrawal_requests').select('*, trader:trader_id(full_name,email)').order('created_at', { ascending: false }),
      supabase.from('deposits').select('*, trader:trader_id(full_name,email)').order('created_at', { ascending: false }),
      supabase.from('announcements').select('*').order('created_at', { ascending: false }),
      supabase.from('manager_assignments').select('*, trader:trader_id(full_name), manager:manager_id(full_name)').order('assigned_at', { ascending: false }),
    ]);
    setUsers(u.data || []);
    setApplications(app.data || []);
    setWithdrawals(w.data || []);
    setDeposits(dep.data || []);
    setAnnouncements(ann.data || []);
    setAssignments(asgn.data || []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const sections = {
    overview:     <AdminOverview users={users} applications={applications} withdrawals={withdrawals} deposits={deposits} loading={loading} />,
    users:        <AdminUsers users={users} loading={loading} onRefresh={load} />,
    applications: <AdminApplications applications={applications} loading={loading} onRefresh={load} adminId={profile.id} />,
    assignments:  <AdminAssignments users={users} assignments={assignments} loading={loading} onRefresh={load} adminId={profile.id} />,
    withdrawals:  <AdminWithdrawals withdrawals={withdrawals} loading={loading} onRefresh={load} adminId={profile.id} />,
    deposits:     <AdminDeposits deposits={deposits} loading={loading} onRefresh={load} adminId={profile.id} />,
    balances:     <AdminBalances users={users.filter(u => u.role === 'trader')} loading={loading} onRefresh={load} adminId={profile.id} />,
    kyc:          <AdminKYC users={users} loading={loading} onRefresh={load} adminId={profile.id} />,
    announce:     <AdminAnnouncements announcements={announcements} loading={loading} onRefresh={load} adminId={profile.id} />,
    analytics:    <AdminAnalytics users={users} withdrawals={withdrawals} deposits={deposits} applications={applications} loading={loading} />,
  };

  return (
    <DashboardShell profile={profile} onLogout={onLogout} nav={nav} activeSection={section} setActiveSection={setSection}>
      {sections[section]}
    </DashboardShell>
  );
}

function AdminOverview({ users, applications, withdrawals, deposits, loading }) {
  if (loading) return <Loader />;
  const traders = users.filter(u => u.role === 'trader');
  const managers = users.filter(u => u.role === 'manager');
  const pendingW = withdrawals.filter(w => w.status === 'pending').length;
  const pendingA = applications.filter(a => a.status === 'pending').length;
  const totalCapital = traders.reduce((s, t) => s + (t.account?.current_balance || 0), 0);
  return (
    <div>
      <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.8rem', color: C.text, marginBottom: '28px' }}>Admin Overview</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(175px,1fr))', gap: '16px', marginBottom: '28px' }}>
        <StatCard label="Total Traders" value={traders.length} icon="👤" />
        <StatCard label="Total Managers" value={managers.length} icon="👔" />
        <StatCard label="Platform Capital" value={fmt(totalCapital)} icon="💰" />
        <StatCard label="Pending Withdrawals" value={pendingW} color={pendingW > 0 ? C.orange : C.green} icon="💸" />
        <StatCard label="Pending Applications" value={pendingA} color={pendingA > 0 ? C.orange : C.green} icon="📋" />
        <StatCard label="Active Members" value={users.filter(u => u.status === 'active').length} color={C.green} icon="✅" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '20px' }}>
        <Card>
          <h3 style={{ fontFamily: 'Georgia,serif', color: C.text, marginBottom: '16px', fontSize: '1rem' }}>Latest Applications</h3>
          <Table cols={['Name', 'Role', 'Status']}
            rows={applications.slice(0, 6).map(a => [a.full_name, a.role, <Badge status={a.status} />])}
            emptyMsg="No applications." />
        </Card>
        <Card>
          <h3 style={{ fontFamily: 'Georgia,serif', color: C.text, marginBottom: '16px', fontSize: '1rem' }}>Pending Withdrawals</h3>
          <Table cols={['Trader', 'Amount', 'Status']}
            rows={withdrawals.filter(w => w.status === 'pending').slice(0, 6).map(w => [w.trader?.full_name || '—', fmt(w.amount), <Badge status={w.status} />])}
            emptyMsg="No pending withdrawals." />
        </Card>
      </div>
    </div>
  );
}

function AdminUsers({ users, loading, onRefresh }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  if (loading) return <Loader />;
  const filtered = users.filter(u =>
    (filter === 'all' || u.role === filter) &&
    (u.full_name?.toLowerCase().includes(search.toLowerCase()) || u.email?.toLowerCase().includes(search.toLowerCase()))
  );

  async function updateStatus(id, status) {
    await supabase.from('profiles').update({ status }).eq('id', id);
    onRefresh();
  }

  return (
    <div>
      <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.6rem', color: C.text, marginBottom: '24px' }}>All Members ({filtered.length})</h2>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or email..."
          style={{ flex: 1, minWidth: '200px', background: C.bg3, border: `1px solid ${C.border}`, borderRadius: '7px', padding: '10px 14px', color: C.text, fontFamily: 'sans-serif', fontSize: '13px', outline: 'none' }} />
        {['all','trader','manager','admin'].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ padding: '8px 14px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontFamily: 'sans-serif', fontSize: '12px', fontWeight: 700, background: filter === f ? 'rgba(196,160,80,0.15)' : C.bg3, color: filter === f ? C.gold : C.muted, border: `1px solid ${filter === f ? C.borderHi : C.border}` }}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
      <Card>
        <Table
          cols={['Name', 'Email', 'Role', 'Status', 'Balance', 'Joined', 'Actions']}
          rows={filtered.map(u => [
            u.full_name,
            <span style={{ color: C.muted, fontSize: '12px' }}>{u.email}</span>,
            <Badge status={u.role} />,
            <Badge status={u.status} />,
            u.role === 'trader' ? fmt(u.account?.current_balance) : '—',
            fmtDate(u.created_at),
            <div style={{ display: 'flex', gap: '6px' }}>
              {u.status !== 'active'    && <GoldBtn small variant="success" onClick={() => updateStatus(u.id, 'active')}>Activate</GoldBtn>}
              {u.status !== 'suspended' && <GoldBtn small variant="danger"  onClick={() => updateStatus(u.id, 'suspended')}>Suspend</GoldBtn>}
            </div>,
          ])}
          emptyMsg="No members found."
        />
      </Card>
    </div>
  );
}

function AdminApplications({ applications, loading, onRefresh, adminId }) {
  if (loading) return <Loader />;
  async function review(id, status, rejection_reason) {
    await supabase.from('applications').update({ status, reviewed_by: adminId, reviewed_at: new Date().toISOString(), rejection_reason: rejection_reason || null }).eq('id', id);
    onRefresh();
  }
  return (
    <div>
      <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.6rem', color: C.text, marginBottom: '24px' }}>Membership Applications ({applications.length})</h2>
      <Card>
        <Table
          cols={['Name', 'Email', 'Phone', 'Role', 'Risk Tier', 'Referral', 'Applied', 'Status', 'Actions']}
          rows={applications.map(a => [
            a.full_name,
            <span style={{ color: C.muted, fontSize: '12px' }}>{a.email}</span>,
            a.phone || '—',
            a.role,
            a.risk_tier,
            a.referral_id || '—',
            fmtDate(a.created_at),
            <Badge status={a.status} />,
            a.status === 'pending' ? (
              <div style={{ display: 'flex', gap: '6px' }}>
                <GoldBtn small variant="success" onClick={() => review(a.id, 'approved')}>Approve</GoldBtn>
                <GoldBtn small variant="danger" onClick={() => review(a.id, 'rejected', 'Not approved.')}>Reject</GoldBtn>
              </div>
            ) : '—',
          ])}
          emptyMsg="No applications."
        />
      </Card>
    </div>
  );
}

function AdminAssignments({ users, assignments, loading, onRefresh, adminId }) {
  const traders = users.filter(u => u.role === 'trader' && u.status === 'active');
  const managers = users.filter(u => u.role === 'manager' && u.status === 'active');
  const [form, setForm] = useState({ trader_id: '', manager_id: '' });
  const [saving, setSaving] = useState(false);
  if (loading) return <Loader />;

  async function assign(e) {
    e.preventDefault(); setSaving(true);
    await supabase.from('manager_assignments').upsert({ trader_id: form.trader_id, manager_id: form.manager_id, assigned_by: adminId, active: true }, { onConflict: 'trader_id' });
    setForm({ trader_id: '', manager_id: '' }); onRefresh(); setSaving(false);
  }

  return (
    <div>
      <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.6rem', color: C.text, marginBottom: '24px' }}>Assign Managers to Traders</h2>
      <Card style={{ maxWidth: '480px', marginBottom: '24px' }}>
        <form onSubmit={assign}>
          <Select label="Select Trader" value={form.trader_id} onChange={e => setForm(f => ({ ...f, trader_id: e.target.value }))} options={[{ value: '', label: '— Select trader —' }, ...traders.map(u => ({ value: u.id, label: u.full_name }))]} />
          <Select label="Assign Manager" value={form.manager_id} onChange={e => setForm(f => ({ ...f, manager_id: e.target.value }))} options={[{ value: '', label: '— Select manager —' }, ...managers.map(u => ({ value: u.id, label: u.full_name }))]} />
          <GoldBtn disabled={saving || !form.trader_id || !form.manager_id}>{saving ? 'Saving...' : 'Assign Manager'}</GoldBtn>
        </form>
      </Card>
      <Card>
        <h3 style={{ fontFamily: 'Georgia,serif', color: C.text, marginBottom: '16px', fontSize: '1rem' }}>Current Assignments</h3>
        <Table
          cols={['Trader', 'Manager', 'Assigned']}
          rows={assignments.filter(a => a.active).map(a => [a.trader?.full_name || '—', a.manager?.full_name || '—', fmtDate(a.assigned_at)])}
          emptyMsg="No assignments yet."
        />
      </Card>
    </div>
  );
}

function AdminWithdrawals({ withdrawals, loading, onRefresh, adminId }) {
  if (loading) return <Loader />;
  async function updateW(id, status) {
    const update = { status, reviewed_by: adminId, reviewed_at: new Date().toISOString() };
    if (status === 'paid') update.paid_at = new Date().toISOString();
    await supabase.from('withdrawal_requests').update(update).eq('id', id);
    onRefresh();
  }
  return (
    <div>
      <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.6rem', color: C.text, marginBottom: '24px' }}>Withdrawal Requests</h2>
      <Card>
        <Table
          cols={['Trader', 'Amount', 'Method', 'Details', 'Requested', 'Status', 'Actions']}
          rows={withdrawals.map(w => [
            w.trader?.full_name || '—',
            <span style={{ fontWeight: 700, color: C.gold }}>{fmt(w.amount)}</span>,
            w.method.replace('_',' ').toUpperCase(),
            <span style={{ color: C.muted, fontSize: '11px' }}>{JSON.stringify(w.account_details)}</span>,
            fmtDate(w.created_at),
            <Badge status={w.status} />,
            w.status === 'pending' ? (
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                <GoldBtn small onClick={() => updateW(w.id, 'reviewing')}>Review</GoldBtn>
                <GoldBtn small variant="success" onClick={() => updateW(w.id, 'paid')}>Mark Paid</GoldBtn>
                <GoldBtn small variant="danger" onClick={() => updateW(w.id, 'rejected')}>Reject</GoldBtn>
              </div>
            ) : w.status === 'reviewing' ? (
              <div style={{ display: 'flex', gap: '6px' }}>
                <GoldBtn small variant="success" onClick={() => updateW(w.id, 'paid')}>Mark Paid</GoldBtn>
                <GoldBtn small variant="danger" onClick={() => updateW(w.id, 'rejected')}>Reject</GoldBtn>
              </div>
            ) : '—',
          ])}
          emptyMsg="No withdrawal requests."
        />
      </Card>
    </div>
  );
}

function AdminDeposits({ deposits, loading, onRefresh, adminId }) {
  if (loading) return <Loader />;
  async function confirmDeposit(dep) {
    await supabase.from('deposits').update({ status: 'confirmed', confirmed_by: adminId, confirmed_at: new Date().toISOString() }).eq('id', dep.id);
    await supabase.from('trader_accounts').upsert({ trader_id: dep.trader_id, initial_deposit: dep.amount, current_balance: dep.amount }, { onConflict: 'trader_id', ignoreDuplicates: false });
    // Add to balance (if account exists, increment)
    const { data: acct } = await supabase.from('trader_accounts').select('current_balance, initial_deposit').eq('trader_id', dep.trader_id).single();
    if (acct) {
      await supabase.from('trader_accounts').update({ current_balance: (acct.current_balance || 0) + dep.amount, initial_deposit: (acct.initial_deposit || 0) + dep.amount }).eq('trader_id', dep.trader_id);
    }
    onRefresh();
  }
  return (
    <div>
      <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.6rem', color: C.text, marginBottom: '24px' }}>Deposit Records</h2>
      <Card>
        <Table
          cols={['Trader', 'Amount', 'Method', 'Reference', 'Date', 'Status', 'Actions']}
          rows={deposits.map(d => [
            d.trader?.full_name || '—',
            fmt(d.amount),
            d.method.replace('_',' '),
            d.reference || '—',
            fmtDate(d.created_at),
            <Badge status={d.status} />,
            d.status === 'pending' ? (
              <div style={{ display: 'flex', gap: '6px' }}>
                <GoldBtn small variant="success" onClick={() => confirmDeposit(d)}>Confirm</GoldBtn>
                <GoldBtn small variant="danger" onClick={async () => { await supabase.from('deposits').update({ status: 'rejected' }).eq('id', d.id); onRefresh(); }}>Reject</GoldBtn>
              </div>
            ) : '—',
          ])}
          emptyMsg="No deposits."
        />
      </Card>
    </div>
  );
}

function AdminBalances({ users, loading, onRefresh, adminId }) {
  const [selected, setSelected] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('set'); // set | add | subtract
  const [saving, setSaving] = useState(false);
  const [note, setNote] = useState('');

  async function adjust(e) {
    e.preventDefault(); setSaving(true);
    const trader = users.find(u => u.id === selected);
    if (!trader) { setSaving(false); return; }
    const current = trader.account?.current_balance || 0;
    let newBal = type === 'set' ? parseFloat(amount) : type === 'add' ? current + parseFloat(amount) : current - parseFloat(amount);
    await supabase.from('trader_accounts').update({ current_balance: newBal }).eq('trader_id', selected);
    // Log as admin trade entry
    if (type !== 'set') {
      await supabase.from('trade_logs').insert({ trader_id: selected, manager_id: adminId, amount: type === 'add' ? parseFloat(amount) : -parseFloat(amount), note: `Admin adjustment: ${note || 'manual'}`, balance_after: newBal });
    }
    setAmount(''); setNote(''); onRefresh(); setSaving(false);
  }

  if (loading) return <Loader />;
  return (
    <div>
      <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.6rem', color: C.text, marginBottom: '24px' }}>Adjust Trader Balances</h2>
      <Card style={{ maxWidth: '480px', marginBottom: '24px' }}>
        <form onSubmit={adjust}>
          <Select label="Select Trader" value={selected} onChange={e => setSelected(e.target.value)} options={[{ value: '', label: '— Select —' }, ...users.map(u => ({ value: u.id, label: `${u.full_name} (${fmt(u.account?.current_balance)})` }))]} />
          <Select label="Adjustment Type" value={type} onChange={e => setType(e.target.value)} options={[{ value: 'set', label: 'Set to exact amount' }, { value: 'add', label: 'Add to balance' }, { value: 'subtract', label: 'Subtract from balance' }]} />
          <Input label="Amount (USD)" type="number" value={amount} onChange={e => setAmount(e.target.value)} required placeholder="0.00" />
          <Input label="Reason / Note" value={note} onChange={e => setNote(e.target.value)} placeholder="e.g. manual correction" />
          <GoldBtn disabled={saving || !selected || !amount}>{saving ? 'Updating...' : 'Apply Adjustment'}</GoldBtn>
        </form>
      </Card>
      <Card>
        <h3 style={{ fontFamily: 'Georgia,serif', color: C.text, marginBottom: '16px', fontSize: '1rem' }}>All Trader Balances</h3>
        <Table
          cols={['Trader', 'Current Balance', 'Total Profit', 'Total Loss', 'Initial Deposit']}
          rows={users.map(u => [
            u.full_name,
            <span style={{ fontWeight: 700, color: C.gold }}>{fmt(u.account?.current_balance)}</span>,
            <span style={{ color: C.green }}>{fmt(u.account?.total_profit)}</span>,
            <span style={{ color: C.red }}>{fmt(u.account?.total_loss)}</span>,
            fmt(u.account?.initial_deposit),
          ])}
          emptyMsg="No traders."
        />
      </Card>
    </div>
  );
}

function AdminKYC({ users, loading, onRefresh }) {
  if (loading) return <Loader />;
  const pending = users.filter(u => u.kyc_status !== 'approved');
  async function updateKYC(id, kyc_status) {
    await supabase.from('profiles').update({ kyc_status }).eq('id', id);
    onRefresh();
  }
  return (
    <div>
      <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.6rem', color: C.text, marginBottom: '24px' }}>KYC / Identity Review</h2>
      <Card>
        <Table
          cols={['Name', 'Email', 'Role', 'KYC Status', 'Doc URL', 'Actions']}
          rows={users.map(u => [
            u.full_name,
            <span style={{ color: C.muted, fontSize: '12px' }}>{u.email}</span>,
            <Badge status={u.role} />,
            <Badge status={u.kyc_status || 'pending'} />,
            u.kyc_doc_url ? <a href={u.kyc_doc_url} target="_blank" rel="noreferrer" style={{ color: C.gold, fontSize: '12px', textDecoration: 'none' }}>View Doc</a> : '—',
            u.kyc_status !== 'approved' ? (
              <div style={{ display: 'flex', gap: '6px' }}>
                <GoldBtn small variant="success" onClick={() => updateKYC(u.id, 'approved')}>Approve</GoldBtn>
                <GoldBtn small variant="danger" onClick={() => updateKYC(u.id, 'rejected')}>Reject</GoldBtn>
              </div>
            ) : <span style={{ color: C.green, fontSize: '12px' }}>✓ Verified</span>,
          ])}
          emptyMsg="No users."
        />
      </Card>
    </div>
  );
}

function AdminAnnouncements({ announcements, loading, onRefresh, adminId }) {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ title: '', body: '', target_role: 'all', pinned: false });
  const [saving, setSaving] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  async function send(e) {
    e.preventDefault(); setSaving(true);
    await supabase.from('announcements').insert({ ...form, created_by: adminId });
    setModal(false); setForm({ title: '', body: '', target_role: 'all', pinned: false }); onRefresh(); setSaving(false);
  }

  async function del(id) {
    await supabase.from('announcements').delete().eq('id', id);
    onRefresh();
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.6rem', color: C.text }}>Announcements</h2>
        <GoldBtn onClick={() => setModal(true)}>+ New Announcement</GoldBtn>
      </div>
      {loading ? <Loader /> : (
        <div style={{ display: 'grid', gap: '14px' }}>
          {announcements.length === 0 && <Card><p style={{ color: C.muted, fontFamily: 'sans-serif', fontSize: '13px', textAlign: 'center', padding: '20px' }}>No announcements yet.</p></Card>}
          {announcements.map(a => (
            <Card key={a.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <div>
                  <h3 style={{ fontFamily: 'Georgia,serif', color: C.text, marginBottom: '4px', fontSize: '1rem' }}>{a.title}</h3>
                  <span style={{ fontFamily: 'sans-serif', fontSize: '10px', color: C.dim }}>To: {a.target_role} · {fmtDate(a.created_at)}</span>
                </div>
                <GoldBtn small variant="danger" onClick={() => del(a.id)}>Delete</GoldBtn>
              </div>
              <p style={{ color: C.muted, fontFamily: 'sans-serif', fontSize: '13px', lineHeight: 1.6 }}>{a.body}</p>
            </Card>
          ))}
        </div>
      )}
      {modal && (
        <Modal title="New Announcement" onClose={() => setModal(false)}>
          <form onSubmit={send}>
            <Input label="Title" value={form.title} onChange={e => set('title', e.target.value)} required />
            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontFamily: 'sans-serif', fontSize: '10.5px', fontWeight: 700, color: C.gold, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Message *</label>
              <textarea value={form.body} onChange={e => set('body', e.target.value)} required rows={4}
                style={{ width: '100%', background: C.bg, border: `1px solid ${C.borderHi}`, borderRadius: '8px', padding: '11px 14px', color: C.text, fontFamily: 'sans-serif', fontSize: '14px', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
            </div>
            <Select label="Send To" value={form.target_role} onChange={e => set('target_role', e.target.value)} options={[{ value: 'all', label: 'All Members' }, { value: 'trader', label: 'Traders Only' }, { value: 'manager', label: 'Managers Only' }]} />
            <GoldBtn disabled={saving}>{saving ? 'Sending...' : 'Send Announcement'}</GoldBtn>
          </form>
        </Modal>
      )}
    </div>
  );
}

function AdminAnalytics({ users, withdrawals, deposits, applications, loading }) {
  if (loading) return <Loader />;
  const traders = users.filter(u => u.role === 'trader');
  const managers = users.filter(u => u.role === 'manager');
  const totalCapital = traders.reduce((s, t) => s + (t.account?.current_balance || 0), 0);
  const confirmedDeposits = deposits.filter(d => d.status === 'confirmed').reduce((s, d) => s + d.amount, 0);
  const paidWithdrawals = withdrawals.filter(w => w.status === 'paid').reduce((s, w) => s + w.amount, 0);
  const pendingWithdrawals = withdrawals.filter(w => w.status === 'pending').reduce((s, w) => s + w.amount, 0);
  const approvedApps = applications.filter(a => a.status === 'approved').length;
  const conversionRate = applications.length > 0 ? ((approvedApps / applications.length) * 100).toFixed(1) : '0';

  return (
    <div>
      <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.6rem', color: C.text, marginBottom: '28px' }}>Platform Analytics</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(175px,1fr))', gap: '16px', marginBottom: '28px' }}>
        <StatCard label="Total Members" value={users.length} icon="👥" />
        <StatCard label="Traders" value={traders.length} icon="👤" />
        <StatCard label="Managers" value={managers.length} icon="👔" />
        <StatCard label="Active Members" value={users.filter(u => u.status === 'active').length} color={C.green} icon="✅" />
        <StatCard label="Total Capital (Platform)" value={fmt(totalCapital)} icon="💰" />
        <StatCard label="Total Deposited" value={fmt(confirmedDeposits)} color={C.green} icon="📥" />
        <StatCard label="Total Withdrawn (Paid)" value={fmt(paidWithdrawals)} color={C.red} icon="📤" />
        <StatCard label="Pending Withdrawals" value={fmt(pendingWithdrawals)} color={C.orange} icon="⏳" />
        <StatCard label="Total Applications" value={applications.length} icon="📋" />
        <StatCard label="Approval Rate" value={`${conversionRate}%`} color={parseFloat(conversionRate) >= 50 ? C.green : C.orange} icon="✅" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '20px' }}>
        <Card>
          <h3 style={{ fontFamily: 'Georgia,serif', color: C.text, marginBottom: '16px', fontSize: '1rem' }}>Membership Breakdown</h3>
          {[['Active', users.filter(u=>u.status==='active').length, C.green], ['Pending', users.filter(u=>u.status==='pending').length, '#fbbf24'], ['Suspended', users.filter(u=>u.status==='suspended').length, C.red]].map(([l,v,c]) => (
            <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: `1px solid ${C.border}`, fontFamily: 'sans-serif', fontSize: '13px' }}>
              <span style={{ color: C.muted }}>{l}</span>
              <span style={{ color: c, fontWeight: 700 }}>{v}</span>
            </div>
          ))}
        </Card>
        <Card>
          <h3 style={{ fontFamily: 'Georgia,serif', color: C.text, marginBottom: '16px', fontSize: '1rem' }}>Capital by Trader (Top 8)</h3>
          <Table cols={['Trader', 'Balance']}
            rows={traders.sort((a,b) => (b.account?.current_balance||0)-(a.account?.current_balance||0)).slice(0,8).map(t => [
              t.full_name,
              <span style={{ color: C.gold, fontWeight: 700 }}>{fmt(t.account?.current_balance)}</span>,
            ])}
            emptyMsg="No traders."
          />
        </Card>
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