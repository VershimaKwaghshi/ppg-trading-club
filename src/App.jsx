import { useState, useEffect, useRef } from "react";

// --- Data Constants ---
const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "How It Works", href: "#how" },
  { label: "Risk Tiers", href: "#risk" },
  { label: "Fees", href: "#fees" },
  { label: "Referral", href: "#referral" },
];

const RISK_TIERS = [
  { pct: "0.1%", label: "Micro", risk: "Minimal Risk", desc: "Ultra-conservative. Ideal for absolute beginners. Tiny, consistent gains with near-zero drawdown.", daily: "$0.10", color: "#4ade80" },
  { pct: "0.5%", label: "Cautious", risk: "Very Low Risk", desc: "Gentle growth. Best for those who prioritise capital protection above all else.", daily: "$0.50", color: "#86efac" },
  { pct: "1%", label: "Conservative", risk: "Low Risk", desc: "Our most popular tier. Realistic, sustainable daily targets. Best for long-term growth.", daily: "$1.00", color: "#fbbf24", badge: "Recommended" },
  { pct: "5%", label: "Moderate", risk: "Medium Risk", desc: "Balanced approach. Moderate position sizing for members with measured risk appetite.", daily: "$5.00", color: "#f97316" },
  { pct: "10%", label: "Balanced", risk: "Med-High Risk", desc: "Higher targets require larger positions. Drawdowns are more frequent and deeper.", daily: "$10.00", color: "#fb923c" },
  { pct: "15%", label: "Aggressive", risk: "High Risk", desc: "Significant drawdowns possible. Only for members who fully accept volatility.", daily: "$15.00", color: "#f43f5e" },
  { pct: "20%", label: "Maximum", risk: "Very High Risk", desc: "Maximum aggression. Entire capital may be lost. For experienced traders only.", daily: "$20.00", color: "#dc2626" },
];

// --- Reusable Components ---
function AnimatedSection({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true);
    }, { threshold: 0.15 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(40px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

// --- Main Application Structure ---
export default function App() {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#050814", color: "#f0e8d0", minHeight: "100vh" }}>
      <Navbar />
      <Hero />
      <About />
      <HowItWorks />
      <RiskTiers />
      <Fees />
      <Referral />
      <Register />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, width: "100%", zIndex: 100,
      background: scrolled ? "rgba(5,8,20,0.97)" : "transparent",
      backdropFilter: scrolled ? "blur(18px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(196,160,80,0.15)" : "none",
      transition: "all 0.4s ease", padding: "0 2rem"
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 70 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, background: "linear-gradient(135deg,#c4a050,#f0d080)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, color: "#050814" }}>P</div>
          <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 18 }}>PPG Trading Club</span>
        </div>
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {NAV_LINKS.map(link => (
            <a key={link.label} href={link.href} style={{ color: "#b0a080", fontSize: 14, textDecoration: "none", fontWeight: 500 }}>{link.label}</a>
          ))}
          <a href="#register" style={{ background: "linear-gradient(135deg,#c4a050,#f0d080)", color: "#050814", fontWeight: 700, fontSize: 13, padding: "10px 22px", borderRadius: 6, textDecoration: "none" }}>Join Now</a>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
      {/* Background Orbs and Grid omitted for brevity in display, but you can retain your original CSS layers here */}
      <div style={{ textAlign: "center", maxWidth: 900, padding: "0 2rem", zIndex: 2 }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.8rem, 7vw, 5.5rem)", fontWeight: 900, lineHeight: 1.1, marginBottom: 28 }}>
          Trade with Purpose.<br />
          <span style={{ background: "linear-gradient(135deg,#c4a050,#f0d080)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Grow with Community.</span>
        </h1>
        <p style={{ fontSize: "1.2rem", color: "#8080a0", maxWidth: 640, margin: "0 auto 48px" }}>
          PPG Trading Club is an exclusive, members-only forex trading community. Your capital stays in your own broker account. You watch every trade live.
        </p>
        <a href="#register" style={{ background: "linear-gradient(135deg,#c4a050,#f0d080)", color: "#050814", fontWeight: 700, padding: "16px 36px", borderRadius: 8, textDecoration: "none" }}>Join the Club - $4.99/Mo</a>
      </div>
    </section>
  );
}

function WhatsAppButton() {
  return (
    <a href="https://wa.me/2348130500659" target="_blank" rel="noreferrer" style={{ 
      position: "fixed", bottom: 28, right: 28, width: 54, height: 54, background: "#25D366", 
      borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, zIndex: 200 
    }}>💬</a>
  );
}

function Footer() {
  return (
    <footer style={{ background: "#030610", borderTop: "1px solid rgba(196,160,80,0.1)", padding: "64px 2rem 32px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
        <p style={{ color: "#505070", fontSize: 13 }}>2026 Penny Partners Group (PPG Solutions). CAC Registered. All rights reserved.</p>
      </div>
    </footer>
  );
}
