import { useState, useEffect, useRef } from "react";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "How It Works", href: "#how" },
  { label: "Risk Tiers", href: "#risk" },
  { label: "Fees", href: "#fees" },
  { label: "Referral", href: "#referral" },
];

const RISK_TIERS = [
  { pct: "0.1%", label: "Micro", risk: "Minimal Risk", desc: "Ultra-conservative. Ideal for absolute beginners.", daily: "$0.10", color: "#4ade80" },
  { pct: "0.5%", label: "Cautious", risk: "Very Low Risk", desc: "Gentle growth. Best for capital protection.", daily: "$0.50", color: "#86efac" },
  { pct: "1%", label: "Conservative", risk: "Low Risk", desc: "Our most popular tier. Sustainable growth.", daily: "$1.00", color: "#fbbf24", badge: "Recommended" },
  { pct: "5%", label: "Moderate", risk: "Medium Risk", desc: "Balanced approach for measured appetite.", daily: "$5.00", color: "#f97316" },
  { pct: "10%", label: "Balanced", risk: "Med-High Risk", desc: "Higher targets, deeper drawdowns.", daily: "$10.00", color: "#fb923c" },
  { pct: "15%", label: "Aggressive", risk: "High Risk", desc: "Significant drawdowns possible.", daily: "$15.00", color: "#f43f5e" },
  { pct: "20%", label: "Maximum", risk: "Very High Risk", desc: "For experienced traders only.", daily: "$20.00", color: "#dc2626" },
];

const HOW_STEPS = [
  { n: "01", title: "Register", desc: "Complete registration with a valid referral ID." },
  { n: "02", title: "Subscription", desc: "Pay the $4.99/month activation fee." },
  { n: "03", title: "KYC", desc: "Upload ID for 24-48 hour verification." },
  { n: "04", title: "Referral", desc: "Refer one member to activate trading." },
  { n: "05", title: "Broker Account", desc: "Link your personal $100+ broker account." },
  { n: "06", title: "Trade", desc: "Select risk tier and monitor live." },
];

export default function App() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <div style={{ minHeight: "100vh", background: "#050814", color: "#f0e8d0", fontFamily: "sans-serif" }}>
      <nav style={{ padding: "20px", borderBottom: "1px solid #333", textAlign: "center" }}>
        <h1 style={{ margin: 0 }}>PPG Trading Club</h1>
        <button onClick={() => setIsRegisterOpen(true)} style={{ marginTop: 10, padding: "10px 20px" }}>Join Now</button>
      </nav>
      
      <main style={{ padding: "40px 20px", maxWidth: "800px", margin: "0 auto" }}>
        <h2>Welcome to PPG</h2>
        <p>Trade with purpose. Grow with community.</p>
        
        <section id="how">
          <h3>How It Works</h3>
          {HOW_STEPS.map((s) => (
            <div key={s.n} style={{ marginBottom: 20 }}>
              <strong>{s.n}. {s.title}</strong>
              <p>{s.desc}</p>
            </div>
          ))}
        </section>
      </main>

      {isRegisterOpen && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.9)", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ background: "#111", padding: "40px", borderRadius: "10px" }}>
            <h2>Registration</h2>
            <button onClick={() => setIsRegisterOpen(false)}>Close</button>
            {/* Form simplified for reliability */}
          </div>
        </div>
      )}
    </div>
  );
}
