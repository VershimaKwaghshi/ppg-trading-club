import { useState, useEffect, useRef } from 'react';

const RISK_TIERS = [
  { pct: '0.1%', label: 'Micro', risk: 'Minimal Risk', desc: 'Ultra-conservative portfolio orchestration. Target minimal fluctuations with deep preservation buffers.', daily: '$0.10', color: '#4ade80' },
  { pct: '0.5%', label: 'Cautious', risk: 'Very Low Risk', desc: 'Conservative growth curve. Primary operational mandate is asset protection under live conditions.', daily: '$0.50', color: '#86efac' },
  { pct: '1%', label: 'Conservative', risk: 'Low Risk', desc: 'Standard balanced allocation strategy. Realistic, compounding daily growth bounds designed for scalability.', daily: '$1.00', color: '#fbbf24', badge: 'Recommended' },
  { pct: '5%', label: 'Moderate', risk: 'Medium Risk', desc: 'Symmetric leverage parameters. Adjusted execution sizes for accounts maintaining calculated volatility tolerances.', daily: '$5.00', color: '#f97316' },
  { pct: '10%', label: 'Balanced', risk: 'Med-High Risk', desc: 'Dynamic volume scalping. Market swings occur regularly across active accounting cycles.', daily: '$10.00', color: '#fb923c' },
  { pct: '15%', label: 'Aggressive', risk: 'High Risk', desc: 'Velocity execution modeling. Deep capital swings possible. Retained strictly for veteran participants.', daily: '$15.00', color: '#f43f5e' },
  { pct: '20%', label: 'Maximum', risk: 'Very High Risk', desc: 'Full capacity leverage profiles. Maximum exposure vectors. Capital risk is fully variable.', daily: '$20.00', color: '#dc2626' },
];

const HOW_STEPS = [
  { n: '01', title: 'Secure Member Invitation', desc: 'Access registration protocols strictly utilizing an authorized unique identification sequence from a verified platform node.' },
  { n: '02', title: 'Infrastructure Activation', desc: 'Process the $4.99 system maintenance subscription through verified clearing tracks including Opay, Zenith Bank, Bitcoin, Ethereum, or USDT TRC20.' },
  { n: '03', title: 'Digital Passport Verification', desc: 'Upload mandatory statutory identification credentials to establish your non-transferable secure Digital Passport (DP) layer.' },
  { n: '04', title: 'Ecosystem Node Validation', desc: 'Activate operational routing pathways by integrating at least one verified participant link into the platform structure.' },
  { n: '05', title: 'Independent Broker Provisioning', desc: 'Configure your isolated, private capital accounts directly with our recommended liquidity broker. Absolute non-custodial capital isolation.' },
  { n: '06', title: 'Algorithmic Risk Assignment', desc: 'Designate your explicit risk distribution tier. System executors deploy view-only credentials to link real-time terminal analytics.' },
];

const COUNTRIES = [
  { code: 'NG', name: 'Nigeria' },
  { code: 'GH', name: 'Ghana' },
  { code: 'ZA', name: 'South Africa' },
  { code: 'KE', name: 'Kenya' },
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'ZZ', name: 'Other Options' },
];

function AgeRestrictionBadge() {
  const gradientStyle = {
    background: 'linear-gradient(90deg, #8a6520, #f5e098, #c4a050, #f5e098, #8a6520)',
    backgroundSize: '200% auto',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    animation: 'shimmer 4s linear infinite',
  };

  return (
    <span style={{ 
      display: 'inline-flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      background: '#03050d', 
      border: '1px solid rgba(196,160,80,0.4)',
      height: '16px', 
      padding: '0 5px', 
      borderRadius: '4px', 
      marginLeft: '6px', 
      verticalAlign: 'middle', 
      boxShadow: '0 2px 6px rgba(196,160,80,0.15)' 
    }}>
      <span style={{ ...gradientStyle, fontSize: '9px', fontWeight: 900, letterSpacing: '0.05em' }}>18+</span>
    </span>
  );
}

function Logo() {
  const gradientStyle = {
    background: 'linear-gradient(90deg, #8a6520, #f5e098, #c4a050, #f5e098, #8a6520)',
    backgroundSize: '200% auto',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    animation: 'shimmer 4s linear infinite',
  };

  return (
    <div style={{ lineHeight: 1, display: 'inline-block' }}>
      <div style={{
        fontFamily: 'Georgia, serif',
        fontSize: '24px',
        fontWeight: 900,
        fontStyle: 'italic',
        letterSpacing: '1px',
        ...gradientStyle
      }}>Trading Club</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '3px' }}>
        <div style={{ flex: 1, height: '1px', background: 'rgba(196,160,80,0.3)' }} />
        <div style={{ 
          fontFamily: 'sans-serif', 
          fontSize: '7.5px', 
          letterSpacing: '3.5px', 
          fontWeight: 800,
          ...gradientStyle
        }}>PENNY PARTNERS GROUP</div>
        <div style={{ flex: 1, height: '1px', background: 'rgba(196,160,80,0.3)' }} />
      </div>
    </div>
  );
}

function Navbar({ onOpenRegister }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: (scrolled || menuOpen) ? 'rgba(5,8,20,0.98)' : 'transparent', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(196,160,80,0.12)', transition: 'all 0.3s' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '76px', padding: '0 24px' }}>
        
        <a href="#" style={{ textDecoration: 'none' }}>
          <Logo />
        </a>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderRight: '1px solid rgba(196,160,80,0.2)', paddingRight: '20px' }}>
            <span style={{ fontSize: '18px' }}>🇺🇸</span>
            <select style={{ background: 'transparent', color: '#b0a080', border: 'none', outline: 'none', cursor: 'pointer', fontFamily: 'sans-serif', fontSize: '13px', fontWeight: 600, appearance: 'none' }}>
              <option value="en">English</option>
              <option value="fr">French</option>
              <option value="es">Spanish</option>
            </select>
            <AgeRestrictionBadge />
          </div>

          <div ref={dropdownRef} style={{ position: 'relative' }}>
            <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'linear-gradient(135deg,#c4a050,#f0d080)', color: '#050814', border: 'none', padding: '10px 18px', borderRadius: '6px', fontFamily: 'sans-serif', fontSize: '14px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
              Menu {menuOpen ? '✕' : '☰'}
            </button>
            
            {menuOpen && (
              <div style={{ position: 'absolute', top: '130%', right: 0, width: '220px', background: '#0a0d1e', border: '1px solid rgba(196,160,80,0.3)', borderRadius: '8px', boxShadow: '0 12px 40px rgba(0,0,0,0.8)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <a href="#" onClick={(e) => { e.preventDefault(); setMenuOpen(false); onOpenRegister(); }} style={{ padding: '14px 20px', color: '#c4a050', textDecoration: 'none', fontFamily: 'sans-serif', fontSize: '14px', fontWeight: 700, borderBottom: '1px solid rgba(196,160,80,0.1)' }}>Register</a>
                <a href="#" onClick={(e) => { e.preventDefault(); setMenuOpen(false); onOpenRegister(); }} style={{ padding: '14px 20px', color: '#f0e8d0', textDecoration: 'none', fontFamily: 'sans-serif', fontSize: '13px', borderBottom: '1px solid rgba(196,160,80,0.1)' }}>Login</a>
                <a href="#how" onClick={() => setMenuOpen(false)} style={{ padding: '14px 20px', color: '#f0e8d0', textDecoration: 'none', fontFamily: 'sans-serif', fontSize: '13px', borderBottom: '1px solid rgba(196,160,80,0.1)' }}>How It Works</a>
                <a href="#about" onClick={() => setMenuOpen(false)} style={{ padding: '14px 20px', color: '#f0e8d0', textDecoration: 'none', fontFamily: 'sans-serif', fontSize: '13px', borderBottom: '1px solid rgba(196,160,80,0.1)' }}>About</a>
                <a href="#risk" onClick={() => setMenuOpen(false)} style={{ padding: '14px 20px', color: '#f0e8d0', textDecoration: 'none', fontFamily: 'sans-serif', fontSize: '13px', borderBottom: '1px solid rgba(196,160,80,0.1)' }}>Risk Tiers</a>
                <a href="#legal" onClick={() => setMenuOpen(false)} style={{ padding: '14px 20px', color: '#f0e8d0', textDecoration: 'none', fontFamily: 'sans-serif', fontSize: '13px', borderBottom: '1px solid rgba(196,160,80,0.1)' }}>Legals</a>
                <a href="#disclaimer" onClick={() => setMenuOpen(false)} style={{ padding: '14px 20px', color: '#f0e8d0', textDecoration: 'none', fontFamily: 'sans-serif', fontSize: '13px', borderBottom: '1px solid rgba(196,160,80,0.1)' }}>Risk Disclaimer</a>
                <a href="#contact" onClick={() => setMenuOpen(false)} style={{ padding: '14px 20px', color: '#f0e8d0', textDecoration: 'none', fontFamily: 'sans-serif', fontSize: '13px' }}>Contact Us</a>
              </div>
            )}
          </div>

        </div>
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #050814; scroll-behavior: smooth; }
        @keyframes shimmer { 0% { background-position: 200% center; } 100% { background-position: -200% center; } }
      `}</style>
    </nav>
  );
}

function Hero({ onOpenRegister }) {
  return (
    <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', background: '#050814', padding: '120px 24px 60px' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(196,160,80,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(196,160,80,0.02) 1px, transparent 1px)', backgroundSize: '44px 44px' }} />
      <div style={{ textAlign: 'center', maxWidth: '880px', position: 'relative', zIndex: 2 }}>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2.2rem, 6vw, 4.2rem)', fontWeight: 900, color: '#f0e8d0', lineHeight: 1.15, marginBottom: '24px' }}>
          Trade with Purpose.<br />
          <span style={{ background: 'linear-gradient(90deg, #8a6520, #f5e098, #c4a050, #f5e098, #8a6520)', backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: 'shimmer 4s linear infinite' }}>Grow with Community.</span>
        </h1>
        <p style={{ fontFamily: 'sans-serif', fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', color: '#8080a0', lineHeight: 1.7, maxWidth: '600px', margin: '0 auto 40px', fontWeight: 300 }}>
          PPG Trading Club delivers professional system orchestration. Retain absolute custody of capital inside your personal isolation broker profiles. Monitor terminal parameters in real time.
        </p>
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={onOpenRegister} style={{ background: 'linear-gradient(135deg,#c4a050,#f0d080)', color: '#050814', fontFamily: 'sans-serif', fontWeight: 700, fontSize: '14px', padding: '15px 32px', borderRadius: '8px', border: 'none', cursor: 'pointer', boxShadow: '0 4px 20px rgba(196,160,80,0.25)' }}>
            Join the Club - $4.99/Mo
          </button>
          <a href="#how" style={{ border: '1px solid rgba(196,160,80,0.25)', color: '#c4a050', fontFamily: 'sans-serif', fontWeight: 600, fontSize: '14px', padding: '15px 32px', borderRadius: '8px', textDecoration: 'none', transition: 'background 0.2s' }}>
            Operational Walkthrough
          </a>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" style={{ padding: '100px 24px', background: '#070a1a', borderTop: '1px solid rgba(196,160,80,0.05)' }}>
      <div style={{ maxWidth: '1140px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '56px', alignItems: 'start' }}>
        <div>
          <div style={{ fontFamily: 'sans-serif', fontSize: '10px', color: '#c4a050', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '12px' }}>Corporate Profile</div>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, color: '#f0e8d0', lineHeight: 1.25, marginBottom: '20px' }}>Penny Partners Group</h2>
          <p style={{ fontFamily: 'sans-serif', color: '#7878a0', lineHeight: 1.75, fontSize: '14.5px', marginBottom: '16px' }}>Penny Partners Group (PPG Solutions) represents a verified, registered financial entity providing advanced infrastructure synchronization for independent trading accounts.</p>
          <p style={{ fontFamily: 'sans-serif', color: '#7878a0', lineHeight: 1.75, fontSize: '14.5px' }}>Our qualified technical personnel orchestrate trading algorithms and terminal execution parameters directly on top-tier broker applications. Member security relies entirely on capital separation vectors.</p>
        </div>
        <div style={{ display: 'grid', gap: '16px' }}>
          {[
            { title: 'Capital Isolation Architecture', desc: 'Isolate capital directly inside your personal brokerage profiles. Executing nodes hold view-only properties with zero withdrawal rights.' },
            { title: 'Terminal Transparency', desc: 'Gain direct tracking privileges via read-only access terminals to monitor strategy deployment and risk boundaries at all times.' }
          ].map((item, i) => (
            <div key={i} style={{ background: '#050814', border: '1px solid rgba(196,160,80,0.1)', borderRadius: '12px', padding: '24px' }}>
              <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '1.1rem', color: '#f0e8d0', marginBottom: '8px' }}>{item.title}</h3>
              <p style={{ fontFamily: 'sans-serif', fontSize: '13.5px', color: '#686888', lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how" style={{ padding: '100px 24px', background: '#050814' }}>
      <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{ fontFamily: 'sans-serif', fontSize: '10px', color: '#c4a050', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '10px' }}>Framework Deployment</div>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, color: '#f0e8d0' }}>Ecosystem Onboarding Roadmap</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {HOW_STEPS.map((step, i) => (
            <div key={i} style={{ background: '#070a1a', border: '1px solid rgba(196,160,80,0.08)', borderRadius: '12px', padding: '28px', transition: 'transform 0.2s' }}>
              <div style={{ fontFamily: 'sans-serif', fontSize: '12px', fontWeight: 700, color: '#c4a050', marginBottom: '16px', opacity: 0.5 }}>{step.n}</div>
              <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '1.1rem', fontWeight: 700, color: '#f0e8d0', marginBottom: '10px' }}>{step.title}</h3>
              <p style={{ fontFamily: 'sans-serif', fontSize: '13.5px', color: '#686888', lineHeight: 1.6 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RiskTiers() {
  return (
    <section id="risk" style={{ padding: '100px 24px', background: '#070a1a' }}>
      <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{ fontFamily: 'sans-serif', fontSize: '10px', color: '#c4a050', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '10px' }}>Parameter Controls</div>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, color: '#f0e8d0' }}>Algorithmic Exposure Allocations</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
          {RISK_TIERS.map((tier, i) => (
            <div key={i} style={{ background: '#050814', border: '1px solid rgba(196,160,80,0.08)', borderRadius: '12px', padding: '24px', position: 'relative' }}>
              {tier.badge && <div style={{ position: 'absolute', top: 12, right: 12, background: tier.color, color: '#050814', fontFamily: 'sans-serif', fontSize: '9px', fontWeight: 800, padding: '2px 8px', borderRadius: '4px' }}>{tier.badge}</div>}
              <div style={{ fontFamily: 'Georgia, serif', fontSize: '2rem', fontWeight: 900, color: tier.color }}>{tier.pct}</div>
              <div style={{ fontFamily: 'sans-serif', fontWeight: 700, color: '#f0e8d0', fontSize: '14px', margin: '6px 0 2px' }}>{tier.label}</div>
              <div style={{ fontFamily: 'sans-serif', fontSize: '10px', color: tier.color, textTransform: 'uppercase', marginBottom: '12px', fontWeight: 700, letterSpacing: '0.05em' }}>{tier.risk}</div>
              <p style={{ fontFamily: 'sans-serif', fontSize: '12.5px', color: '#686888', lineHeight: 1.5 }}>{tier.desc}</p>
            </div>
          ))}
        </div>
        
        <div style={{ background: 'rgba(255,200,50,0.02)', border: '1px solid rgba(255,200,50,0.1)', borderRadius: '8px', padding: '16px 20px', display: 'flex', gap: '12px', marginTop: '32px', alignItems: 'center' }}>
          <span style={{ fontSize: '18px' }}>⚠️</span>
          <p style={{ fontFamily: 'sans-serif', fontSize: '12.5px', color: '#9090b0', lineHeight: 1.6, flex: 1 }}>
            Risk Disclosure: Percentage parameters define maximum daily execution boundaries, not assured yields. Trading foreign exchange contains substantial operational risks. <AgeRestrictionBadge />
          </p>
        </div>
      </div>
    </section>
  );
}

function LegalSection() {
  return (
    <section id="legal" style={{ padding: '100px 24px', background: '#050814', borderTop: '1px solid rgba(196,160,80,0.1)' }}>
      <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{ fontFamily: 'sans-serif', fontSize: '10px', color: '#c4a050', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '10px' }}>Compliance Vectors</div>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, color: '#f0e8d0' }}>Statutory Architecture & Disclosures</h2>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
          
          <div style={{ background: '#070a1a', border: '1px solid rgba(196,160,80,0.12)', borderRadius: '12px', padding: '32px', textAlign: 'center' }}>
            <div style={{ width: '84px', height: '84px', margin: '0 auto 20px', background: '#ffffff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #c4a050', overflow: 'hidden', padding: '6px' }}>
              <img src="/cac-logo.png" alt="Corporate Affairs Commission Seal" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <h3 style={{ fontFamily: 'sans-serif', fontSize: '15px', fontWeight: 700, color: '#f0e8d0', marginBottom: '10px' }}>Corporate Registration</h3>
            <p style={{ fontFamily: 'sans-serif', fontSize: '13.5px', color: '#686888', lineHeight: 1.6 }}>Penny Partners Group operates as a formally incorporated enterprise, holding active and verified registration entries strictly adhering to the mandates of the Corporate Affairs Commission.</p>
          </div>

          <div style={{ background: '#070a1a', border: '1px solid rgba(196,160,80,0.12)', borderRadius: '12px', padding: '32px', textAlign: 'center' }}>
            <div style={{ width: '84px', height: '84px', margin: '0 auto 20px', background: 'rgba(196,160,80,0.05)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(196,160,80,0.2)' }}>
              <span style={{ fontSize: '28px' }}>⚖️</span>
            </div>
            <h3 style={{ fontFamily: 'sans-serif', fontSize: '15px', fontWeight: 700, color: '#f0e8d0', marginBottom: '10px' }}>Terms of Service</h3>
            <p style={{ fontFamily: 'sans-serif', fontSize: '13.5px', color: '#686888', lineHeight: 1.6 }}>Access to the PPG Trading Club infrastructure is strictly governed by our operational mandate. Participants maintain absolute custody of their capital. Users agree to our non-custodial framework, acknowledging that PPG functions solely as an execution routing layer.</p>
          </div>

          <div id="disclaimer" style={{ background: '#070a1a', border: '1px solid rgba(196,160,80,0.12)', borderRadius: '12px', padding: '32px', textAlign: 'center' }}>
            <div style={{ width: '84px', height: '84px', margin: '0 auto 20px', background: 'rgba(196,160,80,0.05)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(196,160,80,0.2)' }}>
              <span style={{ fontSize: '28px' }}>⚠️</span>
            </div>
            <h3 style={{ fontFamily: 'sans-serif', fontSize: '15px', fontWeight: 700, color: '#f0e8d0', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              Risk Disclaimer <AgeRestrictionBadge />
            </h3>
            <p style={{ fontFamily: 'sans-serif', fontSize: '13.5px', color: '#686888', lineHeight: 1.6 }}>Foreign exchange markets are subject to severe systemic volatility. The algorithmic execution parameters provided do not guarantee profit or protect against loss. Participants must strictly utilize surplus risk capital. We hold no liability for market-driven depreciation.</p>
          </div>

          <div style={{ background: '#070a1a', border: '1px solid rgba(196,160,80,0.12)', borderRadius: '12px', padding: '32px', textAlign: 'center' }}>
            <div style={{ width: '84px', height: '84px', margin: '0 auto 20px', background: 'rgba(196,160,80,0.05)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(196,160,80,0.2)' }}>
              <span style={{ fontSize: '28px' }}>🛡️</span>
            </div>
            <h3 style={{ fontFamily: 'sans-serif', fontSize: '15px', fontWeight: 700, color: '#f0e8d0', marginBottom: '10px' }}>Law Enforcement</h3>
            <p style={{ fontFamily: 'sans-serif', fontSize: '13.5px', color: '#686888', lineHeight: 1.6 }}>We enforce strict compliance utilizing our Digital Passport (DP) identity architecture. Every participant undergoes comprehensive vetting to prevent unauthorized exploitation. We actively coordinate with regulatory bodies to ensure the ecosystem remains entirely secure.</p>
          </div>

        </div>
      </div>
    </section>
  );
}

function RegisterModal({ isOpen, onClose }) {
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', country: 'Nigeria', referralId: '', riskTier: '1%', broker: 'No Preference' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1400);
  };

  const singleInputStyle = {
    width: '100%',
    background: '#050814',
    border: '1px solid rgba(196,160,80,0.25)',
    borderRadius: '8px',
    padding: '12px 14px',
    color: '#f0e8d0',
    fontFamily: 'sans-serif',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box'
  };

  const labelBlockStyle = {
    display: 'block',
    fontFamily: 'sans-serif',
    fontSize: '10.5px',
    fontWeight: 700,
    color: '#c4a050',
    marginBottom: '6px',
    textTransform: 'uppercase',
    letterSpacing: '0.08em'
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(3,5,13,0.96)', backdropFilter: 'blur(16px)' }} />
      <div style={{ position: 'relative', zIndex: 210, width: '100%', maxWidth: '480px', background: '#0a0d1e', border: '1px solid rgba(196,160,80,0.3)', borderRadius: '16px', padding: '40px 32px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 24px 64px rgba(0,0,0,0.7)' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 20, right: 20, background: 'transparent', border: 'none', color: '#b0a080', fontSize: '20px', cursor: 'pointer' }}>✕</button>
        
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.9rem', fontWeight: 900, color: '#f0e8d0', marginBottom: '6px' }}>Membership Application</h2>
          <p style={{ fontFamily: 'sans-serif', color: '#8080a0', fontSize: '13px' }}>Please provide accurate details so we can verify and set up your account.</p>
        </div>

        {success ? (
          <div style={{ background: 'rgba(74,222,128,0.05)', border: '1px solid #4ade80', color: '#4ade80', borderRadius: '10px', padding: '20px', textAlign: 'center', fontFamily: 'sans-serif', fontSize: '14px', lineHeight: 1.6 }}>
            Application received successfully. Our team will review your details and contact you directly on WhatsApp within 24 hours to complete your setup.
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            
            <div>
              <label style={labelBlockStyle}>Full Legal Name *</label>
              <input type="text" name="fullName" value={form.fullName} onChange={handleChange} required style={singleInputStyle} />
            </div>

            <div>
              <label style={labelBlockStyle}>Email Address *</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} required style={singleInputStyle} />
            </div>

            <div>
              <label style={labelBlockStyle}>Phone / WhatsApp Number *</label>
              <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+234..." required style={singleInputStyle} />
            </div>

            <div>
              <label style={labelBlockStyle}>Country of Residence</label>
              <select name="country" value={form.country} onChange={handleChange} style={singleInputStyle}>
                {COUNTRIES.map(c => <option key={c.code} value={c.name}>{c.name}</option>)}
              </select>
            </div>

            <div>
              <label style={labelBlockStyle}>Referral ID *</label>
              <input type="text" name="referralId" value={form.referralId} onChange={handleChange} placeholder="Required to join" required style={singleInputStyle} />
            </div>

            <div>
              <label style={labelBlockStyle}>Preferred Risk Tier</label>
              <select name="riskTier" value={form.riskTier} onChange={handleChange} style={singleInputStyle}>
                {RISK_TIERS.map(t => <option key={t.pct} value={t.pct}>{t.pct} Allocation - {t.label}</option>)}
              </select>
            </div>

            <div>
              <label style={labelBlockStyle}>Broker Preference</label>
              <select name="broker" value={form.broker} onChange={handleChange} style={singleInputStyle}>
                <option value="No Preference">Standard Shared Liquidity Track</option>
                <option value="Exness">Exness Infrastructure (Recommended)</option>
                <option value="HFM">HFM Architecture Routing</option>
                <option value="FXTM">FXTM Secure Stream</option>
              </select>
            </div>

            <div style={{ marginTop: '6px' }}>
              <button type="submit" disabled={loading} style={{ width: '100%', background: 'linear-gradient(135deg,#c4a050,#f0d080)', color: '#050814', border: 'none', borderRadius: '8px', padding: '16px', fontFamily: 'sans-serif', fontWeight: 800, fontSize: '14.5px', cursor: loading ? 'not-allowed' : 'pointer', boxShadow: '0 4px 16px rgba(196,160,80,0.25)' }}>
                {loading ? 'Processing Application...' : 'Submit Application'}
              </button>
            </div>

            <div style={{ borderTop: '1px solid rgba(196,160,80,0.1)', paddingTop: '16px', color: '#606080', fontFamily: 'sans-serif', fontSize: '11px', lineHeight: '1.5', textAlign: 'justify' }}>
              <strong>Risk Disclaimer:</strong> Forex execution tracks involve massive continuous exposure variables. Market drawdowns occur naturally due to sudden financial events. By initializing this request, you confirm that capital allocations are derived completely from independent risk assets and that no fixed yields are active inside this ecosystem. <AgeRestrictionBadge />
            </div>

          </form>
        )}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer id="contact" style={{ background: '#03050d', borderTop: '1px solid rgba(196,160,80,0.08)' }}>
      <div style={{ padding: '60px 24px 30px', maxWidth: '1140px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '40px', marginBottom: '40px' }}>
          <div>
            <div style={{ fontFamily: 'Georgia, serif', fontWeight: 900, fontSize: '18px', color: '#f0d080', marginBottom: '10px' }}>PPG Trading Club</div>
            <p style={{ fontFamily: 'sans-serif', fontSize: '12.5px', color: '#484868', lineHeight: 1.6, marginBottom: '16px' }}>Formally architected execution protocols balancing strict risk profiles with decentralized account management.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontFamily: 'sans-serif', fontSize: '12px', color: '#585878' }}>
              <div>contact.ppgsolutions@gmail.com</div>
              <div>+234 813 050 0659</div>
            </div>
          </div>
          {[
            { title: 'Platform Navigation', links: ['About PPG', 'How It Works', 'Risk Tiers'] },
            { title: 'Verification Tracks', links: ['Identity Layer', 'Digital Passport', 'Node Validation'] },
            { title: 'Compliance Records', links: ['Terms of Service', 'Risk Disclaimer', 'Privacy Architecture'] }
          ].map((col, i) => (
            <div key={i}>
              <div style={{ fontFamily: 'sans-serif', fontSize: '9px', color: '#c4a050', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '16px' }}>{col.title}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {col.links.map(l => (
                  <a key={l} href="#" style={{ fontFamily: 'sans-serif', fontSize: '12.5px', color: '#585878', textDecoration: 'none', transition: 'color 0.2s' }}>{l}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div style={{ borderTop: '1px solid rgba(196,160,80,0.06)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ fontFamily: 'sans-serif', fontSize: '12px', color: '#585878', marginBottom: '6px', fontWeight: 500 }}>📍 10 Arab Road, Calabar, Nigeria</div>
            <div style={{ fontFamily: 'sans-serif', fontSize: '11.5px', color: '#383858' }}>&copy; 2026 PPG Solutions Global Trading Co. All tracking tracks active.</div>
          </div>
          <div style={{ fontFamily: 'sans-serif', fontSize: '11.5px', color: '#383858', maxWidth: '460px', textAlign: 'justify' }}>
            Systematic warning: Margin operations contain structural dangers. Past operational graphs show no fixed guidance for future results. Capital execution points stay separated. <AgeRestrictionBadge />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [modalActive, setModalActive] = useState(false);

  return (
    <div style={{ minHeight: '100vh', background: '#050814', color: '#f0e8d0', overflowX: 'hidden' }}>
      <Navbar onOpenRegister={() => setModalActive(true)} />
      <Hero onOpenRegister={() => setModalActive(true)} />
      <About />
      <HowItWorks />
      <RiskTiers />
      <LegalSection />
      <Footer />
      <RegisterModal isOpen={modalActive} onClose={() => setModalActive(false)} />
      
      <a href="https://wa.me/2348130500659" target="_blank" rel="noreferrer" style={{ position: 'fixed', bottom: '24px', right: '24px', width: '56px', height: '56px', background: '#25D366', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 24px rgba(37,211,102,0.35)', textDecoration: 'none', zIndex: 150, transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.06)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.993L2 22l5.13-1.344a9.94 9.94 0 0 0 4.881 1.281h.004c5.505 0 9.989-4.478 9.99-9.985.001-2.667-1.034-5.176-2.917-7.061A9.927 9.927 0 0 0 12.012 2Zm7.067 14.126c-.29.407-1.427 1.393-1.954 1.492-.486.092-.962.152-3.32-.782-3.013-1.194-4.92-4.248-5.07-4.45-.152-.201-1.226-1.63-1.226-3.111 0-1.48.775-2.208 1.05-2.51.226-.248.601-.365.96-.365.116 0 .221.006.313.01.272.013.407.032.584.453.22.527.75 1.83.816 1.964.065.134.108.29.02.467-.09.177-.134.29-.265.444-.132.153-.277.34-.395.457-.133.13-.273.272-.116.541.157.27.7 1.147 1.498 1.854.1.09.2.174.3.253 1.03.818 1.884 1.077 2.19 1.224.282.135.446.113.612-.08.22-.257.946-1.101 1.2-1.479.2-.298.416-.248.702-.142.29.105 1.836.865 2.146 1.018.31.153.517.226.592.355.075.13.075.753-.215 1.16Z" />
        </svg>
      </a>
    </div>
  );
}
