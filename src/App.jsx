import { useState, useEffect, useRef, useMemo } from "react";

// --- Constants & Data ---
const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "How It Works", href: "#how" },
  { label: "Risk Tiers", href: "#risk" },
  { label: "Fees", href: "#fees" },
  { label: "Referral", href: "#referral" },
];

const COUNTRIES = [
  { name: "Nigeria", flag: "🇳🇬", code: "NG" },
  { name: "Ghana", flag: "🇬🇭", code: "GH" },
  { name: "South Africa", flag: "🇿🇦", code: "ZA" },
  { name: "Kenya", flag: "🇰🇪", code: "KE" },
  { name: "United Kingdom", flag: "🇬🇧", code: "GB" },
  { name: "United States", flag: "🇺🇸", code: "US" },
];

const RISK_TIERS = [
  { pct: "0.1%", label: "Micro", risk: "Minimal Risk", desc: "Ultra-conservative. Ideal for absolute beginners.", daily: "$0.10", color: "#4ade80" },
  { pct: "1%", label: "Conservative", risk: "Low Risk", desc: "Our most popular tier. Realistic, sustainable daily targets.", daily: "$1.00", color: "#fbbf24", badge: "Recommended" },
  { pct: "20%", label: "Maximum", risk: "Very High Risk", desc: "Maximum aggression. Entire capital may be lost.", daily: "$20.00", color: "#dc2626" },
];

const HOW_STEPS = [
  { n: "01", title: "Register", desc: "Use a valid referral ID." },
  { n: "02", title: "Subscription", desc: "$4.99/month activation fee." },
  { n: "03", title: "KYC", desc: "Upload government-issued ID." },
  { n: "04", title: "Referral", desc: "Refer one member to activate trading." },
  { n: "05", title: "Broker Account", desc: "Link your personal account." },
  { n: "06", title: "Trade", desc: "Choose risk tier and watch live." },
];

// --- Sub-Components ---

function PpgLogo() {
  return (
    <div style={{ position: "relative", overflow: "hidden", display: "inline-block", padding: "10px" }}>
      <svg viewBox="0 0 700 220" style={{ width: "100%", maxHeight: "80px", filter: "drop-shadow(0 0 10px rgba(196,160,80,0.3))" }}>
        <text x="350" y="100" fontFamily="Georgia, serif" fontSize="80" fontWeight="900" fill="#c4a050" textAnchor="middle" letterSpacing="2">Trading Club</text>
        <text x="350" y="160" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="700" fill="#f0d080" textAnchor="middle" letterSpacing="15">PENNY PARTNERS GROUP</text>
      </svg>
      <div style={{ position: "absolute", top: 0, left: "-100%", width: "50%", height: "100%", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)", animation: "shine 3s infinite" }}></div>
      <style>{`@keyframes shine { 100% { left: 100%; } }`}</style>
    </div>
  );
}

function RegistrationBanner() {
  return (
    <div style={{ background: "linear-gradient(90deg, #070a1a, #1a1a2a, #070a1a)", padding: "20px", textAlign: "center", borderTop: "1px solid #c4a050", borderBottom: "1px solid #c4a050" }}>
      <p style={{ color: "#c4a050", fontFamily: "'DM Sans', sans-serif", fontSize: 13, margin: 0 }}>
        ⚖️ PPG SOLUTIONS is a CAC-registered business entity (BN 8676147). Operating under the laws of the Federal Republic of Nigeria.
      </p>
    </div>
  );
}

function RegisterModal({ isOpen, onClose }) {
  const [searchTerm, setSearchTerm] = useState("");
  const filtered = useMemo(() => COUNTRIES.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase())), [searchTerm]);

  if (!isOpen) return null;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", background: "rgba(0,0,0,0.9)" }}>
      <div style={{ background: "#050814", border: "1px solid #c4a050", borderRadius: 12, padding: "24px", width: "100%", maxWidth: "400px" }}>
        <button onClick={onClose} style={{ float: "right", background: "none", border: "none", color: "#c4a050", cursor: "pointer" }}>✕</button>
        <h3 style={{ color: "#f0d080", marginBottom: "15px" }}>Register</h3>
        <input placeholder="Search Country..." onChange={(e) => setSearchTerm(e.target.value)} style={{ width: "100%", padding: "10px", background: "#070a1a", border: "1px solid #333", color: "#fff", marginBottom: 10 }} />
        <select style={{ width: "100%", padding: "10px", background: "#070a1a", color: "#fff" }}>
          {filtered.map(c => <option key={c.code} value={c.name}>{c.flag} {c.name}</option>)}
        </select>
      </div>
    </div>
  );
}

// --- Main Application ---

export default function App() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <div style={{ background: "#050814", color: "#f0e8d0", fontFamily: "sans-serif" }}>
      {/* Navigation */}
      <nav style={{ padding: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #1a1a2a" }}>
        <PpgLogo />
        <button onClick={() => setIsRegisterOpen(true)} style={{ background: "#c4a050", padding: "10px 20px", border: "none", borderRadius: 6, fontWeight: 700 }}>Join Now</button>
      </nav>

      {/* Hero */}
      <section style={{ padding: "100px 20px", textAlign: "center" }}>
        <h1 style={{ fontSize: "3rem" }}>Trade with Purpose</h1>
        <p style={{ color: "#8080a0" }}>Exclusive forex trading community.</p>
      </section>

      {/* Content Placeholders (Sections) */}
      <section id="about" style={{ padding: "50px 20px" }}><h2>About Us</h2></section>
      <section id="how" style={{ padding: "50px 20px" }}><h2>How It Works</h2></section>
      <section id="risk" style={{ padding: "50px 20px" }}><h2>Risk Tiers</h2></section>
      <section id="fees" style={{ padding: "50px 20px" }}><h2>Fees</h2></section>
      <section id="referral" style={{ padding: "50px 20px" }}><h2>Referral</h2></section>

      {/* Regulatory Banner */}
      <RegistrationBanner />

      {/* Footer */}
      <footer style={{ background: "#03050d", padding: "40px", textAlign: "center" }}>
        <p style={{ fontSize: 12, color: "#606080" }}>HQ: 10 Arab Road, Calabar, Nigeria</p>
        <p style={{ fontSize: 12, color: "#606080" }}>© {new Date().getFullYear()} Penny Partners Group. All rights reserved.</p>
      </footer>

      <RegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
    </div>
  );
}
