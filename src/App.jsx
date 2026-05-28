import { useState, useEffect, useRef } from 'react';

const RISK_TIERS = [
  { pct: '0.1%', label: 'Micro Target', risk: 'Minimal Exposure Strategy', desc: 'Extremely low-intensity trading profile focused on capital preservation with very limited execution exposure.', daily: '$0.10', color: '#4ade80' },
  { pct: '0.5%', label: 'Cautious Target', risk: 'Low Exposure Strategy', desc: 'Conservative execution behavior with controlled position sizing and reduced volatility exposure.', daily: '$0.50', color: '#86efac' },
  { pct: '1%', label: 'Standard Target', risk: 'Balanced Strategy', desc: 'Moderate execution profile with balanced trading activity and structured daily target expectation range.', daily: '$1.00', color: '#fbbf24', badge: 'Popular' },
  { pct: '5%', label: 'Growth Target', risk: 'Moderate Exposure', desc: 'Increased execution frequency and volatility exposure. Outcomes vary depending on market conditions.', daily: '$5.00', color: '#f97316' },
  { pct: '10%', label: 'High Target', risk: 'Aggressive Strategy', desc: 'High-intensity execution profile with significant exposure variability and fast-moving market participation.', daily: '$10.00', color: '#fb923c' },
  { pct: '15%', label: 'Very High Target', risk: 'Very Aggressive', desc: 'Advanced trading intensity suitable for experienced participants with high capital risk tolerance.', daily: '$15.00', color: '#f43f5e' },
  { pct: '20%', label: 'Maximum Target', risk: 'Extreme Exposure', desc: 'Maximum execution aggression profile with full capital exposure to market volatility conditions.', daily: '$20.00', color: '#dc2626' },
];

const HOW_STEPS = [
  { n: '01', title: 'Referral Access Required', desc: 'Entry into PPG Trading Club is only available via an approved referral from an existing verified member or insider network participant.' },
  { n: '02', title: 'Trader or Manager Registration', desc: 'Create an account as either a trader (capital provider) or manager (execution specialist). Each role undergoes verification before activation.' },
  { n: '03', title: 'Identity Verification', desc: 'Complete identity verification to ensure platform integrity and maintain a trusted trading environment for all participants.' },
  { n: '04', title: 'MT5 Account Connection', desc: 'Traders connect their personal MT5 brokerage account. Funds remain fully under trader ownership at all times.' },
  { n: '05', title: 'Choose Trading Manager', desc: 'Traders select from vetted managers based on strategy style, performance profile, and preferred trading behavior.' },
  { n: '06', title: 'Trading Activation', desc: 'Selected managers execute trades directly on trader MT5 accounts according to chosen trading target and risk preference.' },
];

function Logo() {
  return (
    <div style={{ fontFamily: 'Georgia', fontWeight: 900, color: '#c4a050' }}>
      PPG Trading Club
    </div>
  );
}

function Navbar({ onOpenRegister }) {
  return (
    <nav style={{ padding: 20, display: 'flex', justifyContent: 'space-between', background: '#050814', borderBottom: '1px solid #222' }}>
      <Logo />
      <button onClick={onOpenRegister} style={{ background: '#c4a050', padding: '10px 16px', border: 0 }}>
        Apply
      </button>
    </nav>
  );
}

function Hero({ onOpenRegister }) {
  return (
    <section style={{ padding: '100px 20px', textAlign: 'center' }}>
      <h1>Connect With Verified Trading Managers</h1>
      <p>
        PPG Trading Club is a referral-based MT5 trading network where vetted managers execute trades directly on trader accounts.
        Traders retain full capital custody while selecting managers and target levels.
      </p>
      <button onClick={onOpenRegister} style={{ marginTop: 20, background: '#c4a050', padding: 12 }}>
        Apply for Membership
      </button>
    </section>
  );
}

function About() {
  return (
    <section style={{ padding: 60 }}>
      <h2>About PPG</h2>
      <p>
        PPG Trading Club connects traders and vetted trading managers in a referral-based ecosystem.
        Managers execute trades on trader MT5 accounts while traders maintain full control of their capital.
      </p>
    </section>
  );
}

function HowItWorks() {
  return (
    <section style={{ padding: 60 }}>
      <h2>How It Works</h2>
      {HOW_STEPS.map((s, i) => (
        <div key={i} style={{ marginBottom: 12 }}>
          <strong>{s.n} {s.title}</strong>
          <p>{s.desc}</p>
        </div>
      ))}
    </section>
  );
}

function RiskTiers() {
  return (
    <section style={{ padding: 60 }}>
      <h2>Trading Targets</h2>
      {RISK_TIERS.map((t, i) => (
        <div key={i} style={{ marginBottom: 16 }}>
          <strong>{t.pct} - {t.label}</strong>
          <p>{t.desc}</p>
        </div>
      ))}
    </section>
  );
}

function LegalSection() {
  return (
    <section style={{ padding: 60 }}>
      <h2>Legal & Risk Disclosure</h2>
      <p>
        PPG Trading Club is a non-custodial network. Traders retain full ownership of their MT5 brokerage accounts.
        Trading involves significant risk and there are no guaranteed outcomes. Managers execute trades based on selected trading targets.
      </p>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ padding: 40 }}>
      <p>PPG Trading Club © 2026</p>
    </footer>
  );
}

function RegisterModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#000000cc', padding: 40 }}>
      <div style={{ background: '#fff', padding: 20 }}>
        <h2>Apply</h2>
        <p>Referral required to join PPG Trading Club.</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Navbar onOpenRegister={() => setOpen(true)} />
      <Hero onOpenRegister={() => setOpen(true)} />
      <About />
      <HowItWorks />
      <RiskTiers />
      <LegalSection />
      <Footer />
      <RegisterModal isOpen={open} onClose={() => setOpen(false)} />
    </div>
  );
}