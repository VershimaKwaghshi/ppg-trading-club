import { useState, useEffect, useRef } from 'react';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'How It Works', href: '#how' },
  { label: 'Risk Tiers', href: '#risk' },
  { label: 'Fees', href: '#fees' },
  { label: 'Legal', href: '#legal' }
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
  { n: '03', title: 'Digital Passport (DP) Identity', desc: 'Upload a government-issued ID to establish your Digital Passport (DP). We verify your identity within 24-48 hours with strict confidentiality.' },
  { n: '04', title: 'Make Your Referral', desc: 'Your account is verified, but trading begins only after you refer at least one member.' },
  { n: '05', title: 'Open Your Trading Account', desc: 'Receive a link to register your own personal broker account. Minimum deposit: $100. Your money never comes to us.' },
  { n: '06', title: 'Choose Risk Tier and Trade', desc: 'Select your risk tier. Your assigned manager begins trading via MT5 or TradingView. You get a view-only password.' },
];

const COUNTRIES = [
  { code: 'NG', name: 'Nigeria' },
  { code: 'GH', name: 'Ghana' },
  { code: 'ZA', name: 'South Africa' },
  { code: 'KE', name: 'Kenya' },
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'ZZ', name: 'Other' },
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
  const gradientStyle = {
    background: 'linear-gradient(90deg, #8a6520, #f5e098, #c4a050, #f5e098, #8a6520)',
    backgroundSize: '200% auto',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    animation: 'shimmer 3s linear infinite',
  };

  return (
    <div style={{ lineHeight: 1 }}>
      <div style={{
        fontFamily: 'Georgia, serif',
        fontSize: 22,
        fontWeight: 900,
        fontStyle: 'italic',
        letterSpacing: 2,
        ...gradientStyle
      }}>Trading Club</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
        <div style={{ flex: 1, height: 1, background: 'rgba(196,160,80,0.4)' }} />
        <div style={{ 
          fontFamily: 'Arial, sans-serif', 
          fontSize: 8, 
          letterSpacing: 4, 
          fontWeight: 700,
          ...gradientStyle
        }}>PENNY PARTNERS GROUP</div>
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
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, borderLeft: '1px solid rgba(196,160,80,0.2)', paddingLeft: 16 }}>
            <span style={{ fontSize: 18, lineHeight: 1 }}>🇺🇸</span>
            <select style={{ background: 'transparent', color: '#b0a080', border: 'none', outline: 'none', cursor: 'pointer', fontFamily: 'sans-serif', fontSize: 13, fontWeight: 600 }}>
              <option value="en">EN</option>
            </select>
            <div style={{ background: '#dc2626', color: '#ffffff', fontSize: 10, fontWeight: 800, width: 22, height: 22, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(220,38,38,0.4)' }}>
              18+
            </div>
          </div>

          <button onClick={props.onOpenRegister} style={{ background: 'linear-gradient(135deg,#c4a050,#f0d080)', color: '#050814', fontFamily: 'sans-serif', fontWeight: 700, fontSize: 13, padding: '9px 18px', borderRadius: 6, border: 'none', cursor: 'pointer' }}>Join Now</button>
        </div>
      </div>
      <style>{'\n@import url(\'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;700&display=swap\');\n* { box-sizing: border-box; margin: 0; padding: 0; }\nbody { background: #050814; scroll-behavior: smooth; }\n@keyframes shimmer { 0% { background-position: 200% center; } 100% { background-position: -200% center; } }\n@keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }\n'}</style>
    </nav>
  );
}

function Hero(props) {
  return (
    <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', background: '#050814', padding: '100px 1.5rem 60px' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(196,160,80,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(196,160,80,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div style={{ position: 'absolute', top: '20%', left: '5%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(196,160,80,0.08) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(60px)' }} />
      <div style={{ textAlign: 'center', maxWidth: 860, position: 'relative', zIndex: 2 }}>
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
              <p style={{ fontFamily: 'sans-serif', color: '#7878a0', lineHeight: 1.75, fontSize: 14, marginBottom: 14 }}>We are Penny Partners Group (PPG Solutions), a CAC-registered Nigerian financial organization built with one mission: to help everyday people access professional-grade forex trading and build real, sustainable wealth together.</p>
              <p style={{ fontFamily: 'sans-serif', color: '#7878a0', lineHeight: 1.75, fontSize: 14, marginBottom: 24 }}>Our vetted managers trade on your behalf directly through platforms like MT5 or TradingView. Your money never leaves your own account. You stay in full control at all times.</p>
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
              <p style={{ fontFamily: 'sans-serif', color: '#7878a0', lineHeight: 1.7, fontSize: 14, marginBottom: 16 }}>We believe in complete transparency. Our fees are simple, clear, and structured to align our interests with yours.</p>
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

function LegalSection() {
  return (
    <section id="legal" style={{ padding: '80px 1.5rem', background: '#03050d', borderTop: '1px solid rgba(196,160,80,0.1)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <Fade>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontFamily: 'sans-serif', fontSize: 10, color: '#c4a050', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 10 }}>Compliance & Security</div>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 900, color: '#f0e8d0' }}>Regulatory Framework</h2>
          </div>
        </Fade>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
          <Fade delay={0.1}>
            <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(196,160,80,0.08)', borderRadius: 10, padding: '24px', textAlign: 'center', height: '100%' }}>
              <div style={{ width: 64, height: 64, margin: '0 auto 16px', background: '#0a4022', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #c4a050' }}>
                <span style={{ color: '#fff', fontSize: 12, fontWeight: 900 }}>CAC</span>
              </div>
              <h3 style={{ fontFamily: 'sans-serif', fontSize: 14, fontWeight: 700, color: '#f0e8d0', marginBottom: 8 }}>Corporate Affairs Commission</h3>
              <p style={{ fontFamily: 'sans-serif', fontSize: 12, color: '#606080', lineHeight: 1.6 }}>Officially registered and recognized under the laws of the Federal Republic of Nigeria.</p>
            </div>
          </Fade>

          <Fade delay={0.2}>
            <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(196,160,80,0.08)', borderRadius: 10, padding: '24px', textAlign: 'center', height: '100%' }}>
              <div style={{ width: 64, height: 64, margin: '0 auto 16px', background: 'rgba(196,160,80,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 24 }}>⚖️</span>
              </div>
              <h3 style={{ fontFamily: 'sans-serif', fontSize: 14, fontWeight: 700, color: '#f0e8d0', marginBottom: 8 }}>Terms of Service</h3>
              <p style={{ fontFamily: 'sans-serif', fontSize: 12, color: '#606080', lineHeight: 1.6 }}>Clear operational parameters defining account ownership, code of conduct, and system rules.</p>
            </div>
          </Fade>

          <Fade delay={0.3}>
            <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(196,160,80,0.08)', borderRadius: 10, padding: '24px', textAlign: 'center', height: '100%' }}>
              <div style={{ width: 64, height: 64, margin: '0 auto 16px', background: 'rgba(196,160,80,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 24 }}>⚠️</span>
              </div>
              <h3 style={{ fontFamily: 'sans-serif', fontSize: 14, fontWeight: 700, color: '#f0e8d0', marginBottom: 8 }}>Risk Disclaimer</h3>
              <p style={{ fontFamily: 'sans-serif', fontSize: 12, color: '#606080', lineHeight: 1.6 }}>Forex trading involves substantial market volatility. Dedicated risk disclosure for non-custodial capital.</p>
            </div>
          </Fade>

          <Fade delay={0.4}>
            <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(196,160,80,0.08)', borderRadius: 10, padding: '24px', textAlign: 'center', height: '100%' }}>
              <div style={{ width: 64, height: 64, margin: '0 auto 16px', background: 'rgba(196,160,80,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 24 }}>🛡️</span>
              </div>
              <h3 style={{ fontFamily: 'sans-serif', fontSize: 14, fontWeight: 700, color: '#f0e8d0', marginBottom: 8 }}>Law Enforcement</h3>
              <p style={{ fontFamily: 'sans-serif', fontSize: 12, color: '#606080', lineHeight: 1.6 }}>Strict adherence to compliance frameworks, identity vetting, and regulatory coordination policies.</p>
            </div>
          </Fade>
        </div>
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

  const fieldStyle = { 
    width: '100%', 
    background: '#050814', 
    border: '1px solid rgba(196,160,80,0.25)', 
    borderRadius: 8, 
    padding: '12px 14px', 
    color: '#f0e8d0', 
    fontFamily: 'sans-serif', 
    fontSize: 14, 
    outline: 'none',
    transition: 'border-color 0.2s ease'
  };
  
  const labelStyle = { 
    display: 'block', 
    fontFamily: 'sans-serif', 
    fontSize: 10, 
    fontWeight: 800, 
    color: '#c4a050', 
    marginBottom: 6, 
    textTransform: 'uppercase', 
    letterSpacing: '0.1em' 
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(3,5,13,0.95)', backdropFilter: 'blur(12px)' }} />
      <div style={{ position: 'relative', zIndex: 210, width: '100%', maxWidth: 600, background: '#0a0d1e', border: '1px solid rgba(196,160,80,0.3)', borderRadius: 16, padding: '36px 32px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 24px 80px rgba(0,0,0,0.8)' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 18, right: 20, background: 'transparent', border: 'none', color: '#b0a080', fontSize: 20, cursor: 'pointer', fontWeight: 300 }}>✕</button>
        
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.8rem', fontWeight: 900, color: '#f0e8d0', marginBottom: 6 }}>Application Form</h2>
          <p style={{ fontFamily: 'sans-serif', color: '#8080a0', fontSize: 13 }}>Complete your details to request onboarding verification.</p>
        </div>

        {status.msg && (
          <div style={{ background: status.type === 'success' ? 'rgba(74,222,128,0.06)' : 'rgba(239,68,68,0.06)', border: '1px solid ' + (status.type === 'success' ? '#4ade80' : '#ef4444'), color: status.type === 'success' ? '#4ade80' : '#ef4444', borderRadius: 8, padding: '12px 14px', marginBottom: 20, fontFamily: 'sans-serif', fontSize: 13, lineHeight: 1.5, textAlign: 'center' }}>
            {status.msg}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 20 }}>
          <div>
            <label style={labelStyle}>Full Name *</label>
            <input type="text" name="fullName" value={form.fullName} onChange={handleChange} required style={fieldStyle} />
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div>
              <label style={labelStyle}>Email *</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} required style={fieldStyle} />
            </div>
            <div>
              <label style={labelStyle}>Phone / WhatsApp *</label>
              <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+234..." required style={fieldStyle} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div>
              <label style={labelStyle}>Country</label>
              <CountrySelect value={form.country} onChange={function(v) { setForm(Object.assign({}, form, { country: v })); }} />
            </div>
            <div>
              <label style={labelStyle}>Referral ID *</label>
              <input type="text" name="referralId" value={form.referralId} onChange={handleChange} placeholder="Required" required style={fieldStyle} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div>
              <label style={labelStyle}>Risk Tier</label>
              <select name="riskTier" value={form.riskTier} onChange={handleChange} style={{ ...fieldStyle, cursor: 'pointer', appearance: 'none' }}>
                {RISK_TIERS.map(function(t) { return <option key={t.pct} value={t.pct}>{t.pct} - {t.label}</option>; })}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Broker Preference</label>
              <select name="broker" value={form.broker} onChange={handleChange} style={{ ...fieldStyle, cursor: 'pointer', appearance: 'none' }}>
                <option value="No Preference">No Preference</option>
                <option value="Exness">Exness (Recommended)</option>
                <option value="HFM">HFM - HotForex</option>
                <option value="FXTM">FXTM</option>
              </select>
            </div>
          </div>

          <button type="submit" disabled={loading} style={{ marginTop: 10, background: 'linear-gradient(135deg,#c4a050,#f0d080)', color: '#050814', border: 'none', borderRadius: 8, padding: '16px', fontFamily: 'sans-serif', fontWeight: 800, fontSize: 15, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.8 : 1, transition: 'transform 0.2s ease', boxShadow: '0 4px 14px rgba(196,160,80,0.3)' }}>
            {loading ? 'Processing...' : 'Submit Application'}
          </button>
          
          <p style={{ fontFamily: 'sans-serif', fontSize: 12, color: '#505070', textAlign: 'center', lineHeight: 1.6, marginTop: 4 }}>
            Full member portal with dashboard, identity upload, and account management is coming soon. Our team will reach you on WhatsApp after submission.
          </p>
        </form>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer style={{ background: '#03050d', borderTop: '1px solid rgba(196,160,80,0.05)' }}>
      <div style={{ padding: '40px 1.5rem 28px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 32, marginBottom: 40 }}>
          <div>
            <div style={{ fontFamily: 'Georgia, serif', fontWeight: 900, fontSize: 18, color: '#f0d080', marginBottom: 8 }}>PPG Trading Club</div>
            <p style={{ fontFamily: 'sans-serif', fontSize: 12, color: '#404060', lineHeight: 1.7, marginBottom: 12 }}>Nigeria trusted forex trading community. Building wealth through disciplined management.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {['contact.ppgsolutions@gmail.com', '+234 813 050 0659'].map(function(c, i) {
                return <div key={i} style={{ fontFamily: 'sans-serif', fontSize: 11, color: '#505070' }}>{c}</div>;
              })}
            </div>
          </div>
          {[
            { title: 'Club', links: ['About PPG','How It Works','Risk Tiers','Fees'] },
            { title: 'Join', links: ['Register','Referral Program','Identity Verification'] },
            { title: 'Legal', links: ['Risk Disclaimer','Terms of Service','Privacy Policy', 'Compliance'] },
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
        
        <div style={{ borderTop: '1px solid rgba(196,160,80,0.06)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ fontFamily: 'sans-serif', fontSize: 11, color: '#505070', marginBottom: 6 }}>📍 10 Arab Road, Calabar, Nigeria</div>
            <div style={{ fontFamily: 'sans-serif', fontSize: 11, color: '#303050' }}>2026 PPG Solutions Global Trading Co. All rights reserved.</div>
          </div>
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
      <LegalSection />
      <Footer />
      <RegisterModal isOpen={reg} onClose={function() { setReg(false); }} />
      
      {/* Authentic WhatsApp SVG Button */}
      <a href="https://wa.me/2348130500659" target="_blank" rel="noreferrer" style={{ position: 'fixed', bottom: 24, right: 24, width: 56, height: 56, background: '#25D366', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 20px rgba(37,211,102,0.4)', textDecoration: 'none', zIndex: 150, transition: 'transform 0.2s' }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.031 0C5.394 0 0 5.394 0 12.031C0 14.654 0.842 17.098 2.25 19.123L0.5 23.5L5.048 21.782C6.985 23.011 9.387 23.75 12.031 23.75C18.668 23.75 24.062 18.356 24.062 11.719C24.062 5.082 18.668 0 12.031 0ZM18.455 16.74C18.188 17.491 16.89 18.156 16.143 18.293C15.548 18.403 14.73 18.51 11.83 17.307C8.118 15.77 5.736 12.003 5.56 11.77C5.385 11.536 4.135 9.873 4.135 8.156C4.135 6.44 5.011 5.6 5.361 5.234C5.654 4.93 6.136 4.793 6.602 4.793C6.75 4.793 6.883 4.801 7.001 4.806C7.294 4.818 7.44 4.836 7.633 5.303C7.868 5.886 8.441 7.286 8.512 7.433C8.582 7.58 8.675 7.773 8.57 7.986C8.464 8.2 8.359 8.303 8.183 8.512C8.007 8.72 7.843 8.85 7.668 9.073C7.481 9.31 7.281 9.531 7.504 9.914C7.727 10.297 8.497 11.554 9.638 12.569C11.11 13.882 12.302 14.28 12.723 14.455C13.04 14.584 13.415 14.55 13.638 14.305C13.919 13.991 14.27 13.443 14.634 12.918C14.891 12.545 15.231 12.498 15.583 12.638C15.934 12.779 17.805 13.701 18.18 13.888C18.555 14.076 18.801 14.17 18.895 14.333C18.988 14.497 18.988 15.267 18.721 16.018H18.455Z" />
        </svg>
      </a>
    </div>
  );
}
