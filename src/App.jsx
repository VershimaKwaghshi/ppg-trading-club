import { useState, useEffect, useRef } from 'react';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'How It Works', href: '#how' },
  { label: 'Risk Tiers', href: '#risk' },
  { label: 'Fees', href: '#fees' },
  { label: 'Referral', href: '#referral' },
];

const RISK_TIERS = [
  { pct: '0.1%', label: 'Micro', risk: 'Minimal Risk', desc: 'Ultra-conservative. Tiny, consistent gains with near-zero drawdown.', daily: '$0.10', color: '#4ade80' },
  { pct: '0.5%', label: 'Cautious', risk: 'Very Low Risk', desc: 'Gentle growth. Best for those who prioritise capital protection above all else.', daily: '$0.50', color: '#86efac' },
  { pct: '1%', label: 'Conservative', risk: 'Low Risk', desc: 'Our most popular tier. Realistic, sustainable daily targets. Best for long-term growth.', daily: '$1.00', color: '#fbbf24', badge: 'Recommended' },
  { pct: '5%', label: 'Moderate', risk: 'Medium Risk', desc: 'Balanced approach. Moderate position sizing for members with measured risk appetite.', daily: '$5.00', color: '#f97316' },
  { pct: '10%', label: 'Balanced', risk: 'Med-High Risk', desc: 'Higher targets require larger positions. Drawdowns are more frequent and deeper.', daily: '$10.00', color: '#fb923c' },
  { pct: '15%', label: 'Aggressive', risk: 'High Risk', desc: 'Significant drawdowns possible. Only for members who fully accept volatility.', daily: '$15.00', color: '#f43f5e' },
  { pct: '20%', label: 'Maximum', risk: 'Very High Risk', desc: 'Maximum aggression. Entire capital may be lost. For experienced traders only.', daily: '$20.00', color: '#dc2626' },
];

const HOW_STEPS = [
  { n: '01', title: 'Register and Get Referred', desc: 'Complete your registration with a valid referral ID from an existing member. This keeps our community trusted and exclusive.' },
  { n: '02', title: 'Pay Monthly Subscription', desc: '$4.99/month keeps your account active. Pay via Opay, Zenith Bank, Bitcoin, Ethereum, or USDT TRC20.' },
  { n: '03', title: 'KYC Verification', desc: 'Upload a government-issued ID. We verify your identity within 24-48 hours with strict confidentiality.' },
  { n: '04', title: 'Make Your Referral', desc: 'Your account is verified, but trading begins only after you refer at least one member.' },
  { n: '05', title: 'Open Your Trading Account', desc: 'Receive a link to register your own personal broker account. Minimum deposit: $100. Your money never comes to us.' },
  { n: '06', title: 'Choose Risk Tier and Trade', desc: 'Select your risk tier. Your assigned manager begins trading via MT5 or TradingView. You get a view-only password.' },
];

const COUNTRIES = [
  { code: 'NG', name: 'Nigeria', flag: 'NG' },
  { code: 'GH', name: 'Ghana', flag: 'GH' },
  { code: 'ZA', name: 'South Africa', flag: 'ZA' },
  { code: 'KE', name: 'Kenya', flag: 'KE' },
  { code: 'ET', name: 'Ethiopia', flag: 'ET' },
  { code: 'EG', name: 'Egypt', flag: 'EG' },
  { code: 'TZ', name: 'Tanzania', flag: 'TZ' },
  { code: 'UG', name: 'Uganda', flag: 'UG' },
  { code: 'CM', name: 'Cameroon', flag: 'CM' },
  { code: 'CI', name: 'Ivory Coast', flag: 'CI' },
  { code: 'SN', name: 'Senegal', flag: 'SN' },
  { code: 'RW', name: 'Rwanda', flag: 'RW' },
  { code: 'ZW', name: 'Zimbabwe', flag: 'ZW' },
  { code: 'ZM', name: 'Zambia', flag: 'ZM' },
  { code: 'US', name: 'United States', flag: 'US' },
  { code: 'GB', name: 'United Kingdom', flag: 'GB' },
  { code: 'CA', name: 'Canada', flag: 'CA' },
  { code: 'AU', name: 'Australia', flag: 'AU' },
  { code: 'DE', name: 'Germany', flag: 'DE' },
  { code: 'FR', name: 'France', flag: 'FR' },
  { code: 'AE', name: 'UAE', flag: 'AE' },
  { code: 'SA', name: 'Saudi Arabia', flag: 'SA' },
  { code: 'IN', name: 'India', flag: 'IN' },
  { code: 'BR', name: 'Brazil', flag: 'BR' },
  { code: 'MX', name: 'Mexico', flag: 'MX' },
  { code: 'ZZ', name: 'Other', flag: 'ZZ' },
];

function useInView(ref) {
  const [inView, setInView] = useState(false);
  useEffect(function() {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(function(entries) {
      if (entries[0].isIntersecting) setInView(true);
    }, { threshold: 0.1 });
    obs.observe(el);
    return function() { obs.disconnect(); };
  }, [ref]);
  return inView;
}

function Fade(props) {
  const ref = useRef(null);
  const visible = useInView(ref);
  const delay = props.delay || 0;
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(24px)',
      transition: 'opacity 0.6s ease ' + delay + 's, transform 0.6s ease ' + delay + 's'
    }}>
      {props.children}
    </div>
  );
}

function Logo() {
  return (
    <div style={{ lineHeight: 1 }}>
      <div style={{
        fontFamily: 'Georgia, serif',
        fontSize: 22,
        fontWeight: 900,
        fontStyle: 'italic',
        background: 'linear-gradient(90deg, #8a6520, #f5e098, #c4a050, #f5e098, #8a6520)',
        backgroundSize: '200% auto',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        animation: 'shimmer 3s linear infinite',
        letterSpacing: 2,
      }}>Trading Club</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
        <div style={{ flex: 1, height: 1, background: 'rgba(196,160,80,0.4)' }} />
        <div style={{ fontFamily: 'Arial, sans-serif', fontSize: 8, color: '#c4a050', letterSpacing: 4, fontWeight: 700 }}>PENNY PARTNERS GROUP</div>
        <div style={{ flex: 1, height: 1, background: 'rgba(196,160,80,0.4)' }} />
      </div>
    </div>
  );
}

function CountrySelect(props) {
  const value = props.value;
  const onChange = props.onChange;
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const filtered = COUNTRIES.filter(function(c) {
    return c.name.toLowerCase().indexOf(search.toLowerCase()) > -1;
  });
  const selected = COUNTRIES.find(function(c) { return c.name === value; }) || COUNTRIES[0];

  useEffect(function() {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return function() { document.removeEventListener('mousedown', handleClick); };
  }, []);

  const base = { background: 'rgba(5,8,20,0.6)', border: '1px solid rgba(196,160,80,0.15)', color: '#f0e8d0', fontFamily: 'sans-serif', fontSize: 14, borderRadius: 6, padding: '10px', width: '100%', outline: 'none' };

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <div onClick={function() { setOpen(!open); setSearch(''); }}
           style={{ ...base, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span>{selected.name}</span>
        <span style={{ color: '#c4a050', fontSize: 10 }}>{open ? 'v' : '>'}</span>
      </div>
      {open && (
        <div style={{ position: 'absolute', top: '105%', left: 0, right: 0, zIndex: 999, background: '#08101e', border: '1px solid rgba(196,160,80,0.2)', borderRadius: 8, boxShadow: '0 8px 24px rgba(0,0,0,0.5)', overflow: 'hidden' }}>
          <div style={{ padding: 8 }}>
            <input autoFocus value={search} onChange={function(e) { setSearch(e.target.value); }}
                   placeholder="Search..." style={{ ...base, padding: '8px 10px' }} />
          </div>
          <div style={{ maxHeight: 200, overflowY: 'auto' }}>
            {filtered.map(function(c) {
              return (
                <div key={c.code} onClick={function() { onChange(c.name); setOpen(false); }}
                     style={{ padding: '9px 14px', cursor: 'pointer', fontFamily: 'sans-serif', fontSize: 13, color: value === c.name ? '#c4a050' : '#f0e8d0', background: value === c.name ? 'rgba(196,160,80,0.08)' : 'transparent', borderBottom: '1px solid rgba(196,160,80,0.04)' }}>
                  {c.name}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function Navbar(props) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(function() {
    const fn = function() { setScrolled(window.scrollY > 20); };
    window.addEventListener('scroll', fn);
    return function() { window.removeEventListener('scroll', fn); };
  }, []);

  const navBg = (scrolled || menuOpen) ? 'rgba(5,8,20,0.97)' : 'transparent';

  return (
    <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: navBg, backdropFilter: (scrolled || menuOpen) ? 'blur(20px)' : 'none', borderBottom: (scrolled || menuOpen) ? '1px solid rgba(196,160,80,0.15)' : 'none', transition: 'all 0.3s', padding: '0 1.5rem' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>
        <Logo />
        <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
          {NAV_LINKS.map(function(l) {
            return (
              <a key={l.label} href={l.href} style={{ color: '#b0a080', fontSize: 13, fontFamily: 'sans-serif', textDecoration: 'none', fontWeight: 500 }}>{l.label}</a>
            );
          })}
          <button onClick={props.onOpenRegister} style={{ background: 'linear-gradient(135deg,#c4a050,#f0d080)', color: '#050814', fontFamily: 'sans-serif', fontWeight: 700, fontSize: 13, padding: '9px 18px', borderRadius: 6, border: 'none', cursor: 'pointer' }}>Join Now</button>
        </div>
      </div>
      <style>{'\n@import url(\'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;700&display=swap\');\n* { box-sizing: border-box; margin: 0; padding: 0; }\nbody { background: #050814; }\n@keyframes shimmer { 0% { background-position: 200% center; } 100% { background-position: -200% center; } }\n@keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }\n'}</style>
    </nav>
  );
}

function Hero(props) {
  return (
    <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', background: '#050814', padding: '100px 1.5rem 60px' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(196,160,80,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(196,160,80,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div style={{ position: 'absolute', top: '20%', left: '5%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(196,160,80,0.08) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(60px)' }} />
      <div style={{ textAlign: 'center', maxWidth: 860, position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(196,160,80,0.08)', border: '1px solid rgba(196,160,80,0.25)', borderRadius: 100, padding: '6px 16px', marginBottom: 24 }}>
          <div style={{ width: 6, height: 6, background: '#4ade80', borderRadius: '50%', animation: 'pulse 2s infinite' }} />
          <span style={{ fontFamily: 'sans-serif', fontSize: 11, color: '#c4a050', fontWeight: 600, letterSpacing: '0.06em' }}>NOW ACCEPTING MEMBERS - 18+ ONLY</span>
        </div>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2.2rem, 6vw, 4.5rem)', fontWeight: 900, color: '#f0e8d0', lineHeight: 1.15, marginBottom: 24 }}>
          Trade with Purpose.<br />
          <span style={{ background: 'linear-gradient(135deg,#c4a050,#f0d080)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Grow with Community.</span>
        </h1>
        <p style={{ fontFamily: 'sans-serif', fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', color: '#8080a0', lineHeight: 1.7, maxWidth: 580, margin: '0 auto 40px', fontWeight: 300 }}>
          PPG Trading Club is an exclusive, members-only forex trading community. Your capital stays in your own broker account. You watch every trade live. You withdraw on your terms.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={props.onOpenRegister} style={{ background: 'linear-gradient(135deg,#c4a050,#f0d080)', color: '#050814', fontFamily: 'sans-serif', fontWeight: 700, fontSize: 14, padding: '14px 28px', borderRadius: 8, border: 'none', cursor: 'pointer', boxShadow: '0 4px 20px rgba(196,160,80,0.3)' }}>
            Join the Club - $4.99/Mo
          </button>
          <a href="#how" style={{ border: '1px solid rgba(196,160,80,0.3)', color: '#c4a050', fontFamily: 'sans-serif', fontWeight: 600, fontSize: 14, padding: '14px 28px', borderRadius: 8, textDecoration: 'none' }}>
            See How It Works
          </a>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 56, flexWrap: 'wrap', borderTop: '1px solid rgba(196,160,80,0.1)', paddingTop: 32, gap: '16px 0' }}>
          {[["$100","Min Deposit"],["7","Risk Tiers"],["24H","Withdrawals"],["15%","Referral Earn"]].map(function(item, i) {
            return (
              <div key={i} style={{ padding: '0 28px', borderRight: i < 3 ? '1px solid rgba(196,160,80,0.1)' : 'none', textAlign: 'center' }}>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: '1.8rem', fontWeight: 900, color: '#c4a050' }}>{item[0]}</div>
                <div style={{ fontFamily: 'sans-serif', fontSize: 10, color: '#606080', marginTop: 2, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{item[1]}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" style={{ padding: '80px 1.5rem', background: '#070a1a' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <Fade>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 48, alignItems: 'start' }}>
            <div>
              <div style={{ fontFamily: 'sans-serif', fontSize: 10, color: '#c4a050', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 12 }}>Who We Are</div>
              <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 900, color: '#f0e8d0', lineHeight: 1.25, marginBottom: 18 }}>Penny Partners Group - Built on Trust</h2>
              <p style={{ fontFamily: 'sans-serif', color: '#7878a0', lineHeight: 1.75, fontSize: 14, marginBottom: 14 }}>We are Penny Partners Group (PPG Solutions), a CAC-registered Nigerian financial cooperative built with one mission: to help everyday people access professional-grade forex trading and build real, sustainable wealth together.</p>
              <p style={{ fontFamily: 'sans-serif', color: '#7878a0', lineHeight: 1.75, fontSize: 14, marginBottom: 24 }}>Our vetted managers trade on your behalf directly through platforms like MT5 or TradingView. Your money never leaves your own account. You stay in full control at all times.</p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {['CAC Registered - Nigeria Corporate Affairs Commission', 'HQ - 10 Arab Road, Calabar, Nigeria'].map(function(t, i) {
                  return (
                    <div key={i} style={{ background: 'rgba(196,160,80,0.05)', border: '1px solid rgba(196,160,80,0.15)', borderRadius: 8, padding: '8px 14px' }}>
                      <div style={{ fontFamily: 'sans-serif', fontSize: 11, color: '#c4a050' }}>{t}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {[
                { icon: 'LOCK', title: 'Your Account, Your Money', desc: 'You own your broker account. Our managers only have trading access, never withdrawal access.' },
                { icon: 'EYE', title: 'Watch Every Trade Live', desc: 'Every member gets a view-only MT5 password to watch every position, 24/7, in real time.' },
                { icon: 'CHART', title: 'Expert Management', desc: 'Our vetted managers use disciplined risk strategies aligned with your chosen risk tier.' },
                { icon: 'BLDG', title: 'Formally Registered', desc: 'PPG is registered with Nigeria CAC. We operate with legal accountability and full transparency.' },
              ].map(function(c, i) {
                return (
                  <div key={i} style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(196,160,80,0.08)', borderRadius: 10, padding: '18px 14px' }}>
                    <div style={{ fontFamily: 'sans-serif', fontSize: 10, color: '#c4a050', fontWeight: 700, marginBottom: 8, letterSpacing: '0.08em' }}>{c.icon}</div>
                    <div style={{ fontFamily: 'sans-serif', fontWeight: 700, fontSize: 13, color: '#f0e8d0', marginBottom: 6 }}>{c.title}</div>
                    <div style={{ fontFamily: 'sans-serif', fontSize: 12, color: '#606080', lineHeight: 1.55 }}>{c.desc}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </Fade>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how" style={{ padding: '80px 1.5rem', background: '#050814' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <Fade>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontFamily: 'sans-serif', fontSize: 10, color: '#c4a050', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 10 }}>The Process</div>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 900, color: '#f0e8d0' }}>How It Works</h2>
            <p style={{ fontFamily: 'sans-serif', color: '#7878a0', marginTop: 10, fontSize: 14, maxWidth: 480, margin: '10px auto 0' }}>From registration to your first live trade, every step is clear and transparent.</p>
          </div>
        </Fade>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: 14 }}>
          {HOW_STEPS.map(function(step, i) {
            return (
              <Fade key={i} delay={i * 0.05}>
                <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(196,160,80,0.08)', borderRadius: 10, padding: '22px', height: '100%' }}>
                  <div style={{ fontFamily: 'monospace', fontSize: 11, color: 'rgba(196,160,80,0.4)', marginBottom: 10 }}>{step.n}</div>
                  <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '1rem', fontWeight: 700, color: '#f0e8d0', marginBottom: 8 }}>{step.title}</h3>
                  <p style={{ fontFamily: 'sans-serif', fontSize: 13, color: '#606080', lineHeight: 1.6 }}>{step.desc}</p>
                </div>
              </Fade>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function RiskTiers() {
  const [sel, setSel] = useState(2);
  return (
    <section id="risk" style={{ padding: '80px 1.5rem', background: '#070a1a' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <Fade>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontFamily: 'sans-serif', fontSize: 10, color: '#c4a050', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 10 }}>Choose Your Level</div>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 900, color: '#f0e8d0' }}>Select Your Risk Tier</h2>
            <p style={{ fontFamily: 'sans-serif', color: '#7878a0', marginTop: 10, fontSize: 14, maxWidth: 560, margin: '10px auto 0' }}>You choose your risk tolerance. Your assigned manager follows it exactly.</p>
          </div>
        </Fade>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: 14, marginBottom: 28 }}>
          {RISK_TIERS.map(function(tier, i) {
            return (
              <Fade key={i} delay={i * 0.03}>
                <div onClick={function() { setSel(i); }}
                     style={{ background: sel === i ? 'rgba(196,160,80,0.05)' : 'rgba(255,255,255,0.01)', border: '1px solid ' + (sel === i ? tier.color : 'rgba(196,160,80,0.08)'), borderRadius: 10, padding: '18px', cursor: 'pointer', position: 'relative' }}>
                  {tier.badge && <div style={{ position: 'absolute', top: 10, right: 10, background: tier.color, color: '#050814', fontFamily: 'sans-serif', fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 4 }}>{tier.badge}</div>}
                  <div style={{ fontFamily: 'Georgia, serif', fontSize: '1.8rem', fontWeight: 900, color: tier.color }}>{tier.pct}</div>
                  <div style={{ fontFamily: 'sans-serif', fontWeight: 700, color: '#f0e8d0', fontSize: 13, margin: '5px 0 2px' }}>{tier.label}</div>
                  <div style={{ fontFamily: 'sans-serif', fontSize: 10, color: tier.color, textTransform: 'uppercase', marginBottom: 8, fontWeight: 600, letterSpacing: '0.05em' }}>{tier.risk}</div>
                  <p style={{ fontFamily: 'sans-serif', fontSize: 12, color: '#606080', lineHeight: 1.5, marginBottom: 10 }}>{tier.desc}</p>
                  <div style={{ fontFamily: 'monospace', fontSize: 11, color: '#c4a050' }}>~{tier.daily}/day on $100</div>
                </div>
              </Fade>
            );
          })}
        </div>
        <div style={{ background: 'rgba(255,200,50,0.02)', border: '1px solid rgba(255,200,50,0.1)', borderRadius: 8, padding: '14px 18px', display: 'flex', gap: 10 }}>
          <span style={{ fontSize: 16 }}>⚠️</span>
          <p style={{ fontFamily: 'sans-serif', fontSize: 12, color: '#9090b0', lineHeight: 1.6 }}>Risk Warning: All percentage figures are potential daily targets, not guaranteed returns. Forex trading involves substantial risk. You may lose all invested capital.</p>
        </div>
      </div>
    </section>
  );
}

function Fees() {
  return (
    <section id="fees" style={{ padding: '80px 1.5rem', background: '#050814' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <Fade>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 40, alignItems: 'start' }}>
            <div>
              <div style={{ fontFamily: 'sans-serif', fontSize: 10, color: '#c4a050', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 12 }}>Simple Pricing</div>
              <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 900, color: '#f0e8d0', lineHeight: 1.25, marginBottom: 16 }}>Transparent Fees. No Hidden Costs.</h2>
              <p style={{ fontFamily: 'sans-serif', color: '#7878a0', lineHeight: 1.7, fontSize: 14, marginBottom: 16 }}> We believe in complete transparency. Our fees are simple, clear, and structured to align our interests with yours.</p>
              <div style={{ borderLeft: '2px solid #c4a050', paddingLeft: 14 }}>
                <div style={{ fontFamily: 'sans-serif', fontWeight: 700, color: '#f0e8d0', fontSize: 13, marginBottom: 4 }}>Performance Based Profit Share</div>
                <div style={{ fontFamily: 'sans-serif', fontSize: 13, color: '#606080', lineHeight: 1.5 }}>Recommended broker: 70/30 split, 7% trader fee, 3% manager fee. Own broker: 50/50 split, 15% each.</div>
              </div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(196,160,80,0.1)', borderRadius: 14, padding: '26px 22px' }}>
              <div style={{ fontFamily: 'sans-serif', fontSize: 10, fontWeight: 700, color: '#c4a050', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>Monthly Access</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 18, borderBottom: '1px solid rgba(196,160,80,0.08)', paddingBottom: 14 }}>
                <span style={{ fontFamily: 'Georgia, serif', fontSize: '2.6rem', fontWeight: 900, color: '#f0e8d0' }}>$4.99</span>
                <span style={{ fontFamily: 'sans-serif', color: '#606080', fontSize: 13 }}>/ month</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {['Access to vetted platform managers','Real-time view-only MT5 tracking','Flexible risk tier switching','24/7 direct capital withdrawal control','15% direct referral commission'].map(function(f, i) {
                  return (
                    <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <span style={{ color: '#c4a050', fontSize: 14, fontWeight: 700 }}>✓</span>
                      <span style={{ fontFamily: 'sans-serif', fontSize: 13, color: '#8080a0' }}>{f}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Fade>
      </div>
    </section>
  );
}

function Referral() {
  return (
    <section id="referral" style={{ padding: '80px 1.5rem', background: '#070a1a' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <Fade>
          <div style={{ background: 'rgba(196,160,80,0.02)', border: '1px solid rgba(196,160,80,0.1)', borderRadius: 14, padding: '32px 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32 }}>
            <div>
              <div style={{ fontFamily: 'sans-serif', fontSize: 10, color: '#c4a050', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 12 }}>Grow Together</div>
              <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 900, color: '#f0e8d0', lineHeight: 1.25, marginBottom: 14 }}>Our 15% Mutual Referral System</h2>
              <p style={{ fontFamily: 'sans-serif', color: '#7878a0', lineHeight: 1.7, fontSize: 14, marginBottom: 12 }}>PPG Trading Club operates exclusively on invitation. Every active member receives a unique referral code.</p>
              <p style={{ fontFamily: 'sans-serif', color: '#7878a0', lineHeight: 1.7, fontSize: 14 }}>When someone registers using your link, you instantly earn a 15% direct referral reward on their monthly subscription fees - a recurring income tied to community growth.</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ background: 'rgba(5,8,20,0.4)', border: '1px solid rgba(196,160,80,0.08)', borderRadius: 10, padding: '16px' }}>
                <div style={{ fontFamily: 'monospace', fontSize: 20, fontWeight: 700, color: '#c4a050', marginBottom: 4 }}>15%</div>
                <div style={{ fontFamily: 'sans-serif', fontSize: 13, fontWeight: 600, color: '#f0e8d0', marginBottom: 4 }}>Recurring Commission</div>
                <div style={{ fontFamily: 'sans-serif', fontSize: 12, color: '#606080' }}>Earn every month your referred member stays active.</div>
              </div>
              <div style={{ background: 'rgba(5,8,20,0.4)', border: '1px solid rgba(196,160,80,0.08)', borderRadius: 10, padding: '16px' }}>
                <div style={{ fontFamily: 'monospace', fontSize: 20, fontWeight: 700, color: '#60a5fa', marginBottom: 4 }}>Instant</div>
                <div style={{ fontFamily: 'sans-serif', fontSize: 13, fontWeight: 600, color: '#f0e8d0', marginBottom: 4 }}>Balance Settlements</div>
                <div style={{ fontFamily: 'sans-serif', fontSize: 12, color: '#606080' }}>Earnings reflect inside your digital wallet immediately.</div>
              </div>
            </div>
          </div>
        </Fade>
      </div>
    </section>
  );
}

function RegisterModal(props) {
  const isOpen = props.isOpen;
  const onClose = props.onClose;
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', country: 'Nigeria', referralId: '', riskTier: '1%', broker: 'No Preference' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', msg: '' });

  useEffect(function() {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return function() { document.body.style.overflow = ''; };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = function(e) {
    const n = Object.assign({}, form);
    n[e.target.name] = e.target.value;
    setForm(n);
  };

  const handleSubmit = function(e) {
    e.preventDefault();
    setLoading(true);
    setTimeout(function() {
      setLoading(false);
      setStatus({ type: 'success', msg: 'Application received! Our team will contact you via WhatsApp within 24-48 hours. Full member portal coming soon.' });
    }, 1200);
  };

  const field = { width: '100%', background: 'rgba(5,8,20,0.7)', border: '1px solid rgba(196,160,80,0.15)', borderRadius: 6, padding: '10px 12px', color: '#f0e8d0', fontFamily: 'sans-serif', fontSize: 14, outline: 'none' };
  const label = { display: 'block', fontFamily: 'sans-serif', fontSize: 10, fontWeight: 700, color: '#b0a080', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.08em' };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(3,5,13,0.9)', backdropFilter: 'blur(10px)' }} />
      <div style={{ position: 'relative', zIndex: 210, width: '100%', maxWidth: 560, background: '#050814', border: '1px solid rgba(196,160,80,0.2)', borderRadius: 14, padding: '28px 22px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.7)' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 14, right: 14, background: 'transparent', border: 'none', color: '#b0a080', fontSize: 18, cursor: 'pointer' }}>X</button>
        <div style={{ textAlign: 'center', marginBottom: 22 }}>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.6rem', fontWeight: 900, color: '#f0e8d0', marginBottom: 4 }}>Application Form</h2>
          <p style={{ fontFamily: 'sans-serif', color: '#606080', fontSize: 12 }}>Complete your details to request onboarding verification.</p>
        </div>
        {status.msg && (
          <div style={{ background: status.type === 'success' ? 'rgba(74,222,128,0.06)' : 'rgba(239,68,68,0.06)', border: '1px solid ' + (status.type === 'success' ? '#4ade80' : '#ef4444'), color: status.type === 'success' ? '#4ade80' : '#ef4444', borderRadius: 8, padding: '12px 14px', marginBottom: 16, fontFamily: 'sans-serif', fontSize: 13, lineHeight: 1.5 }}>
            {status.msg}
          </div>
        )}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={label}>Full Name *</label>
            <input type="text" name="fullName" value={form.fullName} onChange={handleChange} required style={field} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={label}>Email *</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} required style={field} />
            </div>
            <div>
              <label style={label}>Phone / WhatsApp *</label>
              <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+234..." required style={field} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={label}>Country</label>
              <CountrySelect value={form.country} onChange={function(v) { setForm(Object.assign({}, form, { country: v })); }} />
            </div>
            <div>
              <label style={label}>Referral ID *</label>
              <input type="text" name="referralId" value={form.referralId} onChange={handleChange} placeholder="Required" required style={field} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={label}>Risk Tier</label>
              <select name="riskTier" value={form.riskTier} onChange={handleChange} style={{ ...field, cursor: 'pointer' }}>
                {RISK_TIERS.map(function(t) { return <option key={t.pct} value={t.pct}>{t.pct} - {t.label}</option>; })}
              </select>
            </div>
            <div>
              <label style={label}>Broker Preference</label>
              <select name="broker" value={form.broker} onChange={handleChange} style={{ ...field, cursor: 'pointer' }}>
                <option value="No Preference">No Preference</option>
                <option value="Exness">Exness (Recommended)</option>
                <option value="HFM">HFM - HotForex</option>
                <option value="FXTM">FXTM</option>
              </select>
            </div>
          </div>
          <button type="submit" disabled={loading} style={{ marginTop: 6, background: 'linear-gradient(135deg,#c4a050,#f0d080)', color: '#050814', border: 'none', borderRadius: 6, padding: '13px', fontFamily: 'sans-serif', fontWeight: 700, fontSize: 14, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Processing...' : 'Submit Application'}
          </button>
          <p style={{ fontFamily: 'sans-serif', fontSize: 11, color: '#404060', textAlign: 'center', lineHeight: 1.5 }}>
            Full member portal with dashboard, KYC upload, and account management is coming soon. Our team will reach you on WhatsApp after submission.
          </p>
        </form>
      </div>
    </div>
  );
}

function CacBanner() {
  return (
    <div style={{ background: 'linear-gradient(90deg,#03050d,#0a0f20,#03050d)', borderTop: '1px solid rgba(196,160,80,0.2)', borderBottom: '1px solid rgba(196,160,80,0.2)', padding: '16px 1.5rem' }}>
      <div style={{ maxWidth: 960, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 34, height: 34, background: 'linear-gradient(135deg,#c4a050,#f0d080)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', fontSize: 16, flexShrink: 0 }}>*</div>
          <div>
            <div style={{ fontFamily: 'sans-serif', fontSize: 9, color: '#c4a050', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700 }}>Officially Registered</div>
            <div style={{ fontFamily: 'sans-serif', fontSize: 12, color: '#f0e8d0', fontWeight: 600 }}>Corporate Affairs Commission - Federal Republic of Nigeria</div>
          </div>
        </div>
        <div style={{ width: 1, height: 28, background: 'rgba(196,160,80,0.2)' }} />
        <div style={{ fontFamily: 'sans-serif', fontSize: 11, color: '#7878a0' }}>PPG Solutions Global Trading Co. - Est. Nigeria</div>
        <div style={{ width: 1, height: 28, background: 'rgba(196,160,80,0.2)' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 6, height: 6, background: '#4ade80', borderRadius: '50%', animation: 'pulse 2s infinite' }} />
          <span style={{ fontFamily: 'sans-serif', fontSize: 11, color: '#4ade80', fontWeight: 600 }}>Verified and Active</span>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer style={{ background: '#03050d', borderTop: '1px solid rgba(196,160,80,0.05)' }}>
      <CacBanner />
      <div style={{ padding: '40px 1.5rem 28px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 32, marginBottom: 28 }}>
          <div>
            <div style={{ fontFamily: 'Georgia, serif', fontWeight: 900, fontSize: 18, color: '#f0d080', marginBottom: 8 }}>PPG Trading Club</div>
            <p style={{ fontFamily: 'sans-serif', fontSize: 12, color: '#404060', lineHeight: 1.7, marginBottom: 12 }}>Nigeria trusted forex trading cooperative. Building wealth through community and professional management.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {['contact.ppgsolutions@gmail.com', '+234 813 050 0659', '10 Arab Road, Calabar, Nigeria'].map(function(c, i) {
                return <div key={i} style={{ fontFamily: 'sans-serif', fontSize: 11, color: '#505070' }}>{c}</div>;
              })}
            </div>
          </div>
          {[
            { title: 'Club', links: ['About PPG','How It Works','Risk Tiers','Fees'] },
            { title: 'Join', links: ['Register','Referral Program','KYC Verification'] },
            { title: 'Legal', links: ['Risk Disclaimer','Terms of Service','Privacy Policy'] },
          ].map(function(col, i) {
            return (
              <div key={i}>
                <div style={{ fontFamily: 'sans-serif', fontSize: 9, color: '#c4a050', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 12 }}>{col.title}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {col.links.map(function(l) {
                    return <a key={l} href="#" style={{ fontFamily: 'sans-serif', fontSize: 12, color: '#505070', textDecoration: 'none' }}>{l}</a>;
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ borderTop: '1px solid rgba(196,160,80,0.06)', paddingTop: 18, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
          <div style={{ fontFamily: 'sans-serif', fontSize: 11, color: '#303050' }}>2026 PPG Solutions Global Trading Co. All rights reserved.</div>
          <div style={{ fontFamily: 'sans-serif', fontSize: 11, color: '#303050', maxWidth: 440, textAlign: 'right' }}>Forex trading involves substantial risk. You may lose all invested capital. No returns are guaranteed.</div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [reg, setReg] = useState(false);
  return (
    <div style={{ minHeight: '100vh', background: '#050814', color: '#f0e8d0', overflowX: 'hidden' }}>
      <Navbar onOpenRegister={function() { setReg(true); }} />
      <Hero onOpenRegister={function() { setReg(true); }} />
      <About />
      <HowItWorks />
      <RiskTiers />
      <Fees />
      <Referral />
      <Footer />
      <RegisterModal isOpen={reg} onClose={function() { setReg(false); }} />
      <a href="https://wa.me/2348130500659" target="_blank" rel="noreferrer" style={{ position: 'fixed', bottom: 24, right: 24, width: 50, height: 50, background: '#25D366', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, boxShadow: '0 4px 16px rgba(37,211,102,0.4)', textDecoration: 'none', zIndex: 150 }}>W</a>
    </div>
  );
}
