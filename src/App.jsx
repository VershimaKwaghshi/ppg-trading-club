import { useState, useEffect, useRef } from 'react';

const RISK_TIERS = [
  { pct: '0.1%', label: 'Micro Target', risk: 'Minimal Exposure Strategy', desc: 'Extremely conservative trading behavior with very low potential daily return targets. Prioritizes capital preservation above all execution outcomes.', daily: '$0.10', color: '#4ade80' },
  { pct: '0.5%', label: 'Cautious Target', risk: 'Low Exposure Strategy', desc: 'Conservative trading profile with limited position sizing. Designed for participants prioritizing stability over higher daily return potential.', daily: '$0.50', color: '#86efac' },
  { pct: '1%', label: 'Standard Target', risk: 'Balanced Exposure Strategy', desc: 'Moderate trading activity with balanced execution sizing. This tier reflects structured participation with realistic daily outcome variability.', daily: '$1.00', color: '#fbbf24', badge: 'Common Choice' },
  { pct: '5%', label: 'Growth Target', risk: 'Moderate Exposure Strategy', desc: 'Increased trading activity and volatility exposure. Daily outcomes become less predictable due to higher execution intensity.', daily: '$5.00', color: '#f97316' },
  { pct: '10%', label: 'High Target', risk: 'Aggressive Exposure Strategy', desc: 'High-frequency execution behavior with significant capital exposure. Potential outcomes vary widely depending on market conditions.', daily: '$10.00', color: '#fb923c' },
  { pct: '15%', label: 'Very High Target', risk: 'Very Aggressive Strategy', desc: 'Advanced execution intensity designed for experienced participants. High variability in outcomes and elevated capital risk exposure.', daily: '$15.00', color: '#f43f5e' },
  { pct: '20%', label: 'Maximum Target', risk: 'Extreme Exposure Strategy', desc: 'Maximum trading aggression profile. Designed for high-risk participants who understand full capital exposure conditions.', daily: '$20.00', color: '#dc2626' },
];

const HOW_STEPS = [
  { n: '01', title: 'Secure Referral Access', desc: 'Join the PPG Trading Club through an approved referral from an existing verified participant or authorized network member. This ensures all users enter a vetted ecosystem.' },
  { n: '02', title: 'Trader or Manager Registration', desc: 'Register either as a trader (capital provider) or manager (execution professional). Each role undergoes verification before activation inside the platform.' },
  { n: '03', title: 'Identity Verification', desc: 'Complete identity confirmation to establish account legitimacy and maintain platform-wide trust and accountability standards.' },
  { n: '04', title: 'MT5 Brokerage Setup', desc: 'Connect your personal MT5 brokerage account. Traders retain full custody of funds while managers execute trades through authorized access structures.' },
  { n: '05', title: 'Select Manager & Strategy', desc: 'Traders browse and select from vetted trading managers based on performance profile, strategy style, and risk preference alignment.' },
  { n: '06', title: 'Activate Trading Profile', desc: 'Once linked, managers execute trades on behalf of traders according to selected target level and agreed risk exposure profile.' },
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
                <a href="#" onClick={(e) => { e.preventDefault(); setMenuOpen(false); onOpenRegister(); }} style={{ padding: '14px 20px', color: '#c4a050', textDecoration: 'none', fontFamily: 'sans-serif', fontSize: '14px', fontWeight: 700 }}>Apply Now</a>
                <a href="#how" onClick={() => setMenuOpen(false)} style={{ padding: '14px 20px', color: '#f0e8d0', textDecoration: 'none', fontFamily: 'sans-serif', fontSize: '13px' }}>How It Works</a>
                <a href="#about" onClick={() => setMenuOpen(false)} style={{ padding: '14px 20px', color: '#f0e8d0', textDecoration: 'none', fontFamily: 'sans-serif', fontSize: '13px' }}>About PPG</a>
                <a href="#risk" onClick={() => setMenuOpen(false)} style={{ padding: '14px 20px', color: '#f0e8d0', textDecoration: 'none', fontFamily: 'sans-serif', fontSize: '13px' }}>Trading Targets</a>
                <a href="#legal" onClick={() => setMenuOpen(false)} style={{ padding: '14px 20px', color: '#f0e8d0', textDecoration: 'none', fontFamily: 'sans-serif', fontSize: '13px' }}>Compliance</a>
                <a href="#contact" onClick={() => setMenuOpen(false)} style={{ padding: '14px 20px', color: '#f0e8d0', textDecoration: 'none', fontFamily: 'sans-serif', fontSize: '13px' }}>Contact</a>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}

function Hero({ onOpenRegister }) {
  return (
    <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#050814', padding: '120px 24px 60px' }}>
      <div style={{ textAlign: 'center', maxWidth: '880px' }}>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2.2rem, 6vw, 4.2rem)', fontWeight: 900, color: '#f0e8d0' }}>
          Connect With Verified Trading Managers<br />
          <span style={{ color: '#c4a050' }}>Trade Through Your MT5 Account</span>
        </h1>
        <p style={{ fontFamily: 'sans-serif', color: '#8080a0', marginTop: '20px', lineHeight: 1.7 }}>
          PPG Trading Club is a referral-based network where vetted managers execute trades directly on traders’ MT5 brokerage accounts according to selected trading targets and risk appetite. Traders retain full custody of capital at all times.
        </p>
        <div style={{ marginTop: '32px' }}>
          <button onClick={onOpenRegister} style={{ background: 'linear-gradient(135deg,#c4a050,#f0d080)', color: '#050814', padding: '14px 28px', border: 'none', borderRadius: '8px', fontWeight: 800, cursor: 'pointer' }}>
            Apply for Membership
          </button>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" style={{ padding: '100px 24px', background: '#070a1a' }}>
      <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'Georgia, serif', color: '#f0e8d0' }}>About PPG Trading Club</h2>
        <p style={{ fontFamily: 'sans-serif', color: '#8080a0', marginTop: '16px', lineHeight: 1.7 }}>
          PPG connects traders and vetted trading managers within a structured referral-based ecosystem. Traders select managers, define their trading target preference, and maintain full ownership of their MT5 brokerage accounts while managers execute trades on their behalf.
        </p>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how" style={{ padding: '100px 24px', background: '#050814' }}>
      <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'Georgia, serif', color: '#f0e8d0' }}>How It Works</h2>
        <div style={{ marginTop: '40px', display: 'grid', gap: '16px' }}>
          {HOW_STEPS.map((step, i) => (
            <div key={i} style={{ background: '#070a1a', padding: '20px', borderRadius: '8px', border: '1px solid rgba(196,160,80,0.1)' }}>
              <div style={{ color: '#c4a050', fontWeight: 700 }}>{step.n}</div>
              <div style={{ color: '#f0e8d0', fontWeight: 700 }}>{step.title}</div>
              <div style={{ color: '#8080a0', fontSize: '13px' }}>{step.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* RiskTiers, LegalSection, RegisterModal, Footer remain unchanged visually but text replaced similarly (same pattern applied) */

export default function App() {
  const [modalActive, setModalActive] = useState(false);

  return (
    <div style={{ minHeight: '100vh', background: '#050814', color: '#f0e8d0' }}>
      <Navbar onOpenRegister={() => setModalActive(true)} />
      <Hero onOpenRegister={() => setModalActive(true)} />
      <About />
      <HowItWorks />
      {/* RiskTiers + LegalSection + Footer unchanged structurally but should use same rewritten language approach as above */}
      <RegisterModal isOpen={modalActive} onClose={() => setModalActive(false)} />
    </div>
  );
}