import { useState, useEffect } from "react";

// --- Data Constants ---
const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "How It Works", href: "#how" },
  { label: "Risk Tiers", href: "#risk" },
  { label: "Fees", href: "#fees" },
  { label: "Referral", href: "#referral" },
];

const RISK_TIERS = [
  { pct: "0.1%", label: "Micro", risk: "Minimal", desc: "Ultra-conservative for absolute beginners." },
  { pct: "1%", label: "Conservative", risk: "Low", desc: "Our most popular tier for long-term growth." },
  { pct: "5%", label: "Moderate", risk: "Medium", desc: "Balanced approach for measured risk appetite." },
  { pct: "20%", label: "Maximum", risk: "Very High", desc: "For experienced traders only." },
];

// --- Main Application ---
export default function App() {
  return (
    <div style={{ backgroundColor: "#050814", color: "#f0e8d0", fontFamily: "system-ui" }}>
      <Navbar />
      <Hero />
      <About />
      <HowItWorks />
      <RiskTiers />
      <Fees />
      <Referral />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

function Navbar() {
  return (
    <nav style={{ position: "sticky", top: 0, padding: "20px 40px", display: "flex", justifyContent: "space-between", background: "rgba(5,8,20,0.95)", backdropFilter: "blur(10px)", zIndex: 100 }}>
      <h1 style={{ fontSize: "1.2rem", margin: 0 }}>PPG Trading Club</h1>
      <div style={{ display: "flex", gap: "20px" }}>
        {NAV_LINKS.map(link => <a key={link.label} href={link.href} style={{ color: "#c4a050", textDecoration: "none" }}>{link.label}</a>)}
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section style={{ height: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "0 20px" }}>
      <h1 style={{ fontSize: "3.5rem", marginBottom: "20px" }}>Trade with Purpose.<br/>Grow with Community.</h1>
      <p style={{ maxWidth: "600px", fontSize: "1.2rem", color: "#a0a0c0" }}>An exclusive, members-only forex community. Your capital stays in your own broker account. You watch every trade live.</p>
    </section>
  );
}

function About() {
  return <section id="about" style={{ padding: "80px 20px", maxWidth: "800px", margin: "auto" }}><h2>About</h2><p>PPG Trading Club provides professional signals and market insights, allowing members to mirror trades directly in their own personal brokerage accounts.</p></section>;
}

function HowItWorks() {
  return (
    <section id="how" style={{ padding: "80px 20px", maxWidth: "800px", margin: "auto" }}>
      <h2>How It Works</h2>
      <ol style={{ paddingLeft: "20px" }}>
        <li><strong>Register:</strong> Complete registration with a valid referral ID.</li>
        <li><strong>Subscription:</strong> Pay the $4.99/month activation fee.</li>
        <li><strong>KYC:</strong> Upload ID for 24-48 hour verification.</li>
        <li><strong>Referral:</strong> Refer one member to activate trading.</li>
        <li><strong>Broker Account:</strong> Link your personal $100+ broker account.</li>
        <li><strong>Trade:</strong> Select your risk tier and monitor trades live.</li>
      </ol>
    </section>
  );
}

function RiskTiers() {
  return (
    <section id="risk" style={{ padding: "80px 20px", maxWidth: "1000px", margin: "auto" }}>
      <h2>Risk Tiers</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
        {RISK_TIERS.map(tier => (
          <div key={tier.label} style={{ padding: "20px", border: "1px solid #333", borderRadius: "8px" }}>
            <h3>{tier.pct} - {tier.label}</h3>
            <p style={{ color: "#c4a050" }}>{tier.risk} Risk</p>
            <p style={{ fontSize: "0.9rem" }}>{tier.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Fees() {
  return <section id="fees" style={{ padding: "80px 20px", maxWidth: "800px", margin: "auto" }}><h2>Fees</h2><p>A flat $4.99/month subscription fee is required for full access to the trading ecosystem.</p></section>;
}

function Referral() {
  return <section id="referral" style={{ padding: "80px 20px", maxWidth: "800px", margin: "auto" }}><h2>Referral</h2><p>Our community grows through trust. Every member is required to refer at least one active user to maintain access to trade signals.</p></section>;
}

function Footer() {
  return <footer style={{ padding: "40px", textAlign: "center", borderTop: "1px solid #333", marginTop: "40px" }}><p>© 2026 Penny Partners Group. All rights reserved.</p></footer>;
}

function WhatsAppButton() {
  return <a href="https://wa.me/2348130500659" style={{ position: "fixed", bottom: "30px", right: "30px", background: "#25D366", padding: "15px 25px", borderRadius: "30px", color: "white", textDecoration: "none", fontWeight: "bold" }}>Chat with Support</a>;
}
