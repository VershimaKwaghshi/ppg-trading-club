import { useState, useEffect, useRef } from 'react';
import { supabase } from './supabase';
import { BrowserRouter, Routes, Route, useNavigate, Link } from 'react-router-dom';

// ─── TRANSLATIONS ────────────────────────────────────────────────────────────
const T = {
  en: {
    flag: '🇺🇸', langLabel: 'English',
    nav: {
      register: 'Register', login: 'Login', howItWorks: 'How It Works',
      about: 'About', earningsTiers: 'Earnings Tiers', legals: 'Legals',
      riskDisclaimer: 'Risk Disclaimer', contactUs: 'Contact Us',
    },
    hero: {
      line1: 'Trade with Purpose.',
      line2: 'Grow with Community.',
      sub: 'PPG Trading Club connects everyday people with vetted professional traders. Your money stays in your own broker account at all times. Our managers trade on your behalf using view-only access — they can never withdraw your funds.',
      cta: 'Join the Club — $4.99/Mo',
      secondary: 'How It Works',
    },
    about: {
      eyebrow: 'About Us',
      heading: 'Penny Partners Group',
      p1: 'Penny Partners Group (PPG Solutions) is a registered financial services company that connects individual traders with professional trading managers operating on MT5.',
      p2: 'Our managers are thoroughly vetted and must enter the platform through a referral from an existing insider — just like traders. Your capital always remains in your own broker account, fully under your control.',
      card1Title: 'Your Money Stays With You',
      card1Desc: 'Your funds are held in your own personal broker account. PPG managers are granted view-only MT5 access to execute trades — they have no ability to withdraw or transfer your money.',
      card2Title: 'Full Transparency',
      card2Desc: 'You can monitor your account at any time through your own broker login. Every trade your manager places is visible to you in real time.',
    },
    how: {
      eyebrow: 'Getting Started',
      heading: 'How to Join PPG Trading Club',
    },
    risk: {
      eyebrow: 'Choose Your Target',
      heading: 'Potential Daily Earnings Tiers',
      subtitle: 'Each tier represents a potential daily earnings target — not a guarantee. Higher targets require larger, more aggressive trades. The higher your target, the greater the risk to your entire capital. Hitting your target every single day is not realistic and should not be expected.',
      warning: 'Important: These percentages are daily earnings targets, not guaranteed returns. To pursue higher targets, your manager must take larger positions — which means your full account balance is at risk of significant loss. Past trading results do not guarantee future performance. Only trade with money you can afford to lose.',
    },
    legal: {
      eyebrow: 'Legal & Compliance',
      heading: 'Regulatory Standing & Disclosures',
      card1Title: 'Corporate Registration',
      card1Desc: 'Penny Partners Group is a formally registered business entity, fully compliant with and registered under the Corporate Affairs Commission of Nigeria.',
      card2Title: 'Terms of Service',
      card2Desc: 'By joining PPG Trading Club, you confirm that you understand the risks involved in forex trading, that your funds remain in your own broker account, and that PPG managers operate strictly on a view-only, trade-execution basis with no withdrawal access.',
      card3Title: 'Risk Disclaimer',
      card3Desc: 'Forex trading carries a high level of risk and may not be suitable for all investors. You can lose some or all of your invested capital. Daily earnings targets are not guaranteed — markets are unpredictable. Only participate with money you can afford to lose entirely.',
      card4Title: 'Identity & Compliance',
      card4Desc: 'All members — both traders and managers — must complete identity verification through our Digital Passport (DP) system. This vetting process protects the community and ensures every participant is accountable. We cooperate with regulatory authorities as required.',
    },
    modal: {
      heading: 'Membership Application',
      sub: 'Please provide accurate details so we can verify and set up your account.',
      success: 'Application received successfully. Please check your email to verify your account, then proceed to login.',
      name: 'Full Legal Name', email: 'Email Address', phone: 'Phone / WhatsApp Number',
      phonePlaceholder: '+234...', country: 'Country of Residence',
      referral: 'Referral ID', referralPlaceholder: 'Required to join',
      earningsTarget: 'Daily Earnings Target', broker: 'Broker Preference',
      brokerOptions: ['No Preference', 'Exness (Recommended)', 'HFM', 'FXTM'],
      submit: 'Submit Application', submitting: 'Submitting...',
      disclaimer: 'Risk Warning: Forex trading involves significant risk of loss. Daily earnings targets are not guaranteed. By submitting this application, you confirm that any funds you deposit with your broker are money you can afford to lose, and that no fixed returns have been promised to you.',
    },
    footer: {
      desc: 'A private, referral-gated network connecting traders with vetted professional managers for managed MT5 forex trading.',
      col1: 'Platform', col2: 'Account', col3: 'Legal',
      col1Links: ['About PPG', 'How It Works', 'Earnings Tiers'],
      col2Links: ['Identity Verification', 'Digital Passport', 'Referral System'],
      col3Links: ['Terms of Service', 'Risk Disclaimer', 'Privacy Policy'],
      address: '10 Arab Road, Calabar, Nigeria',
      copy: '© 2026 PPG Solutions Global Trading Co. All rights reserved.',
      riskNote: 'Risk Warning: Forex trading involves substantial risk of loss and is not suitable for all investors. Daily earnings targets shown are not guaranteed. Past trading performance does not indicate future results.',
    },
    tiers: [
      { pct: '0.1%', label: 'Micro', risk: 'Minimal Risk', desc: 'Ultra-conservative approach. Your manager targets very small daily gains to preserve your capital above all else.', daily: '$0.10', color: '#4ade80' },
      { pct: '0.5%', label: 'Cautious', risk: 'Very Low Risk', desc: 'Conservative growth focus. Capital protection remains the top priority under active market conditions.', daily: '$0.50', color: '#86efac' },
      { pct: '1%', label: 'Conservative', risk: 'Low Risk', desc: 'Balanced target with realistic compounding potential. A popular starting point for new traders entering the club.', daily: '$1.00', color: '#fbbf24', badge: 'Popular' },
      { pct: '5%', label: 'Moderate', risk: 'Medium Risk', desc: 'Higher targets require larger trade sizes. Suitable for traders who understand and accept regular account fluctuations.', daily: '$5.00', color: '#f97316' },
      { pct: '10%', label: 'Balanced', risk: 'Med-High Risk', desc: 'Significant daily swings are common at this level. Markets do not move predictably and drawdowns occur frequently.', daily: '$10.00', color: '#fb923c' },
      { pct: '15%', label: 'Aggressive', risk: 'High Risk', desc: 'Large capital swings are expected. This tier is only suitable for experienced traders who can emotionally and financially absorb heavy losses.', daily: '$15.00', color: '#f43f5e' },
      { pct: '20%', label: 'Maximum', risk: 'Very High Risk', desc: 'Maximum exposure on every trade. Your entire capital is at significant risk at this level. Only choose this if you can afford to lose everything.', daily: '$20.00', color: '#dc2626' },
    ],
    steps: [
      { n: '01', title: 'Get a Member Referral', desc: 'PPG Trading Club is invitation-only. You must receive a referral code from an existing verified member before you can register. This keeps our community trusted and accountable.' },
      { n: '02', title: 'Pay the Monthly Subscription', desc: 'Activate your account with the $4.99 monthly platform fee. Accepted payment methods include Opay, Zenith Bank, Bitcoin, Ethereum, or USDT TRC20.' },
      { n: '03', title: 'Verify Your Identity', desc: 'Upload a valid government-issued ID to complete your Digital Passport (DP) verification. This is required for all members and cannot be transferred.' },
      { n: '04', title: 'Refer at Least One Member', desc: 'To activate full account access, you must refer at least one new participant into the club. This ensures every member has a stake in the quality of the community.' },
      { n: '05', title: 'Open Your Broker Account', desc: 'Create your own private trading account directly with one of our recommended brokers. Your funds stay in your name at all times — PPG never holds or touches your money.' },
      { n: '06', title: 'Choose Your Earnings Target', desc: 'Select a daily earnings target tier based on how much risk you are willing to take. Your assigned manager will trade on MT5 using view-only access to your account — they cannot withdraw your funds.' },
    ],
  }
};

const WORLD_COUNTRIES = [
  "Nigeria", "United States", "United Kingdom", "Canada", "Australia", "South Africa"
];

// ─── ANIMATION HOOK ───────────────────────────────────────────────────────────
function useScrollReveal(options = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.12, ...options });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, direction = 'up', style = {} }) {
  const [ref, visible] = useScrollReveal();
  const transforms = { up: 'translateY(32px)', down: 'translateY(-32px)', left: 'translateX(-32px)', right: 'translateX(32px)' };
  return (
    <div ref={ref} style={{
      transform: visible ? 'none' : (transforms[direction] || transforms.up),
      opacity: visible ? 1 : 0,
      transition: `transform 0.65s cubic-bezier(.22,1,.36,1) ${delay}ms, opacity 0.65s ease ${delay}ms`,
      ...style,
    }}>
      {children}
    </div>
  );
}

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────
function AgeRestrictionBadge() {
  const g = {
    background: 'linear-gradient(90deg,#8a6520,#f5e098,#c4a050,#f5e098,#8a6520)',
    backgroundSize: '200% auto', WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent', backgroundClip: 'text',
    animation: 'shimmer 4s linear infinite',
  };
  return (
    <span style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', background:'#03050d', border:'1px solid rgba(196,160,80,0.4)', height:'16px', padding:'0 5px', borderRadius:'4px', marginLeft:'6px', verticalAlign:'middle', boxShadow:'0 2px 6px rgba(196,160,80,0.15)' }}>
      <span style={{ ...g, fontSize:'9px', fontWeight:900, letterSpacing:'0.05em' }}>18+</span>
    </span>
  );
}

function Logo() {
  const g = {
    background: 'linear-gradient(90deg,#8a6520,#f5e098,#c4a050,#f5e098,#8a6520)',
    backgroundSize: '200% auto', WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent', backgroundClip: 'text',
    animation: 'shimmer 4s linear infinite',
  };
  return (
    <div style={{ lineHeight:1, display:'inline-block' }}>
      <div style={{ fontFamily:'Georgia,serif', fontSize:'24px', fontWeight:900, fontStyle:'italic', letterSpacing:'1px', ...g }}>Trading Club</div>
      <div style={{ display:'flex', alignItems:'center', gap:'4px', marginTop:'3px' }}>
        <div style={{ flex:1, height:'1px', background:'rgba(196,160,80,0.3)' }} />
        <div style={{ fontFamily:'sans-serif', fontSize:'7.5px', letterSpacing:'3.5px', fontWeight:800, ...g }}>PENNY PARTNERS GROUP</div>
        <div style={{ flex:1, height:'1px', background:'rgba(196,160,80,0.3)' }} />
      </div>
    </div>
  );
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar({ onOpenRegister, lang, setLang, t }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:100, background:(scrolled||menuOpen)?'rgba(5,8,20,0.98)':'transparent', backdropFilter:'blur(16px)', borderBottom:'1px solid rgba(196,160,80,0.12)', transition:'all 0.3s' }}>
      <div style={{ maxWidth:'1280px', margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between', height:'76px', padding:'0 24px' }}>
        <Link to="/" style={{ textDecoration:'none' }}><Logo /></Link>
        <div style={{ display:'flex', alignItems:'center', gap:'20px' }}>
          <div ref={dropdownRef} style={{ position:'relative' }}>
            <button onClick={() => setMenuOpen(!menuOpen)} style={{ background:'linear-gradient(135deg,#c4a050,#f0d080)', color:'#050814', border:'none', padding:'10px 18px', borderRadius:'6px', fontFamily:'sans-serif', fontSize:'14px', fontWeight:800, cursor:'pointer', display:'flex', alignItems:'center', gap:'8px' }}>
              Menu {menuOpen ? '✕' : '☰'}
            </button>
            {menuOpen && (
              <div style={{ position:'absolute', top:'130%', right:0, width:'220px', background:'#0a0d1e', border:'1px solid rgba(196,160,80,0.3)', borderRadius:'8px', boxShadow:'0 12px 40px rgba(0,0,0,0.8)', overflow:'hidden', display:'flex', flexDirection:'column', animation:'fadeDown 0.2s ease' }}>
                <a href="#register" onClick={(e) => { e.preventDefault(); setMenuOpen(false); onOpenRegister(); }} style={{ padding:'14px 20px', color: '#c4a050', textDecoration:'none', fontFamily:'sans-serif', fontSize: '14px', fontWeight: 700, borderBottom: '1px solid rgba(196,160,80,0.1)' }}>{t.nav.register}</a>
                <Link to="/login" onClick={() => setMenuOpen(false)} style={{ padding:'14px 20px', color: '#f0e8d0', textDecoration:'none', fontFamily:'sans-serif', fontSize: '13px', borderBottom: '1px solid rgba(196,160,80,0.1)' }}>{t.nav.login}</Link>
                <a href="#how" onClick={() => setMenuOpen(false)} style={{ padding:'14px 20px', color: '#f0e8d0', textDecoration:'none', fontFamily:'sans-serif', fontSize: '13px', borderBottom: '1px solid rgba(196,160,80,0.1)' }}>{t.nav.howItWorks}</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

// ─── HERO & CONTENT COMPONENTS (Simplified for length) ────────────────────────
function Hero({ onOpenRegister, t }) {
  return (
    <section style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', position:'relative', overflow:'hidden', background:'#050814', padding:'120px 24px 60px' }}>
      <div style={{ textAlign:'center', maxWidth:'880px', position:'relative', zIndex:2 }}>
        <h1 style={{ fontFamily:'Georgia,serif', fontSize:'clamp(2.2rem,6vw,4.2rem)', fontWeight:900, color:'#f0e8d0', lineHeight:1.15, marginBottom:'24px' }}>
          {t.hero.line1}<br />
          <span style={{ color:'#c4a050' }}>{t.hero.line2}</span>
        </h1>
        <p style={{ fontFamily:'sans-serif', fontSize:'clamp(0.95rem,2vw,1.1rem)', color:'#8080a0', lineHeight:1.7, maxWidth:'600px', margin:'0 auto 40px' }}>{t.hero.sub}</p>
        <button onClick={onOpenRegister} style={{ background:'linear-gradient(135deg,#c4a050,#f0d080)', color:'#050814', fontFamily:'sans-serif', fontWeight:700, padding:'15px 32px', borderRadius:'8px', border:'none', cursor:'pointer' }}>
          {t.hero.cta}
        </button>
      </div>
    </section>
  );
}

// ─── REGISTER MODAL ───────────────────────────────────────────────────────────
function RegisterModal({ isOpen, onClose, t }) {
  const [form, setForm] = useState({ fullName:'', email:'', password:'', phone:'', country: WORLD_COUNTRIES[0], referralId:'', riskTier:'1%', broker:'0' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  if (!isOpen) return null;
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setErrorMessage('');
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: form.email, password: form.password,
      });
      if (authError) throw authError;

      if (authData?.user) {
        const { error: profileError } = await supabase.from('profiles').insert([
            { id: authData.user.id, full_name: form.fullName, email: form.email, referral_code: form.referralId, status: 'pending', role: 'trader', kyc_status: 'pending' }
          ]);
        if (profileError) throw profileError;
      }
      setSuccess(true);
    } catch (err) {
      setErrorMessage(err.message || 'An error occurred during submission.');
    } finally {
      setLoading(false);
    }
  };

  const inp = { width:'100%', background:'#050814', border:'1px solid rgba(196,160,80,0.25)', borderRadius:'8px', padding:'12px 14px', color:'#f0e8d0', marginBottom:'16px' };

  return (
    <div style={{ position:'fixed', inset:0, zIndex:200, display:'flex', alignItems:'center', justifyContent:'center', padding:'20px', background:'rgba(3,5,13,0.96)' }}>
      <div style={{ position:'relative', zIndex:210, width:'100%', maxWidth:'480px', background:'#0a0d1e', border:'1px solid rgba(196,160,80,0.3)', borderRadius:'16px', padding:'40px 32px', maxHeight:'90vh', overflowY:'auto' }}>
        <button onClick={onClose} style={{ position:'absolute', top:20, right:20, background:'transparent', border:'none', color:'#b0a080', fontSize:'20px' }}>✕</button>
        <h2 style={{ color:'#f0e8d0', marginBottom:'20px' }}>{t.modal.heading}</h2>
        
        {success ? (
          <div>
            <div style={{ color:'#4ade80', marginBottom:'20px' }}>{t.modal.success}</div>
            <button onClick={() => { onClose(); navigate('/login'); }} style={{ background:'#c4a050', color:'#000', padding:'10px 20px', borderRadius:'6px', border:'none' }}>Go to Login</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {errorMessage && <div style={{ color:'#f43f5e', marginBottom:'10px' }}>{errorMessage}</div>}
            <input type="text" name="fullName" onChange={handleChange} placeholder={t.modal.name} required style={inp} />
            <input type="email" name="email" onChange={handleChange} placeholder={t.modal.email} required style={inp} />
            <input type="password" name="password" onChange={handleChange} placeholder="Account Password" required style={inp} />
            <input type="tel" name="phone" onChange={handleChange} placeholder={t.modal.phone} required style={inp} />
            <input type="text" name="referralId" onChange={handleChange} placeholder={t.modal.referral} required style={inp} />
            <button type="submit" disabled={loading} style={{ width:'100%', background:'#c4a050', color:'#050814', padding:'16px', borderRadius:'8px', border:'none' }}>
              {loading ? t.modal.submitting : t.modal.submit}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// ─── LOGIN PAGE ───────────────────────────────────────────────────────────────
function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      navigate('/dashboard');
    }
  };

  const inp = { width:'100%', background:'#050814', border:'1px solid rgba(196,160,80,0.25)', borderRadius:'8px', padding:'12px 14px', color:'#f0e8d0', marginBottom:'16px' };

  return (
    <div style={{ minHeight:'100vh', background:'#050814', display:'flex', alignItems:'center', justifyContent:'center', padding:'20px' }}>
      <div style={{ width:'100%', maxWidth:'400px', background:'#0a0d1e', padding:'40px', borderRadius:'16px', border:'1px solid rgba(196,160,80,0.3)' }}>
        <h2 style={{ color:'#f0e8d0', textAlign:'center', marginBottom:'20px' }}>Member Login</h2>
        <form onSubmit={handleLogin}>
          {error && <div style={{ color:'#f43f5e', marginBottom:'15px' }}>{error}</div>}
          <input type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} required style={inp} />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required style={inp} />
          <button type="submit" disabled={loading} style={{ width:'100%', background:'#c4a050', color:'#000', padding:'14px', borderRadius:'8px', border:'none', fontWeight:'bold' }}>
            {loading ? 'Logging in...' : 'Access Account'}
          </button>
        </form>
        <div style={{ textAlign:'center', marginTop:'20px' }}>
          <Link to="/" style={{ color:'#c4a050', textDecoration:'none' }}>Return to Home</Link>
        </div>
      </div>
    </div>
  );
}

// ─── DASHBOARD PAGE ───────────────────────────────────────────────────────────
function DashboardPage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login');
      } else {
        setUser(session.user);
      }
    };
    checkUser();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (!user) return <div style={{ color:'#f0e8d0', background:'#050814', minHeight:'100vh', padding:'50px' }}>Loading...</div>;

  return (
    <div style={{ minHeight:'100vh', background:'#050814', color:'#f0e8d0', padding:'40px' }}>
      <div style={{ maxWidth:'1000px', margin:'0 auto' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'1px solid rgba(196,160,80,0.3)', paddingBottom:'20px', marginBottom:'40px' }}>
          <h2>PPG Dashboard</h2>
          <button onClick={handleLogout} style={{ background:'transparent', border:'1px solid #c4a050', color:'#c4a050', padding:'8px 16px', borderRadius:'6px' }}>Logout</button>
        </div>
        <div style={{ background:'#0a0d1e', padding:'30px', borderRadius:'12px', border:'1px solid rgba(196,160,80,0.1)' }}>
          <h3>Welcome back!</h3>
          <p style={{ color:'#8080a0', marginTop:'10px' }}>Account Email: {user.email}</p>
          <p style={{ color:'#8080a0', marginTop:'10px' }}>Identity Verification (DP): Pending</p>
        </div>
      </div>
    </div>
  );
}

// ─── LANDING PAGE ─────────────────────────────────────────────────────────────
function LandingPage() {
  const [modalActive, setModalActive] = useState(false);
  const [lang, setLang] = useState('en');
  const t = T[lang];

  return (
    <div>
      <Navbar onOpenRegister={() => setModalActive(true)} lang={lang} setLang={setLang} t={t} />
      <Hero onOpenRegister={() => setModalActive(true)} t={t} />
      <RegisterModal isOpen={modalActive} onClose={() => setModalActive(false)} t={t} />
    </div>
  );
}

// ─── ROOT APP WITH ROUTING ────────────────────────────────────────────────────
export default function App() {
  useEffect(() => {
    // This listens for the email confirmation link redirect to handle the session automatically
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && window.location.pathname !== '/dashboard') {
        window.location.href = '/dashboard';
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}
