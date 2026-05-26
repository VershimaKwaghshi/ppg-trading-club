import { useState, useEffect, useRef } from "react";

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

const HOW_STEPS = [
  { n: "01", title: "Register & Get Referred", desc: "Complete your registration with a valid referral ID from an existing member. This keeps our community trusted and exclusive." },
  { n: "02", title: "Pay Monthly Subscription", desc: "$4.99/month keeps your account active. Pay via Opay, Zenith Bank, Bitcoin, Ethereum, or USDT TRC20. Upload your receipt for instant verification." },
  { n: "03", title: "KYC Verification", desc: "Upload a government-issued ID. We verify your identity within 24-48 hours. Your documents are handled with strict confidentiality." },
  { n: "04", title: "Make Your Referral", desc: "Your account is verified, but trading begins only after you refer at least one member. This is how our community stays healthy and grows together." },
  { n: "05", title: "Open Your Trading Account", desc: "Receive a link to register your own personal broker account. Minimum deposit: $100. Your money never comes to us - ever." },
  { n: "06", title: "Choose Risk Tier & Trade", desc: "Select your risk tier. Your assigned manager begins trading via MT5 or TradingView. You receive a view-only password to watch every trade live." },
];

function useInView(ref, threshold) {
  const t = threshold || 0.12;
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) setInView(true); },
      { threshold: t }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, t]);
  return inView;
}

function AnimatedSection({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(20px)" : "translateY(0)",
        transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function ResponsiveBrandLogo() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "2px", userSelect: "none" }}>
      <div style={{ 
        fontFamily: "Georgia, 'Times New Roman', serif", 
        fontSize: "24px", 
        fontWeight: "700", 
        fontStyle: "italic",
        background: "linear-gradient(90deg, #8a6520 0%, #c4a050 30%, #f5e098 50%, #c4a050 70%, #8a6520 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        letterSpacing: "1px",
        filter: "drop-shadow(0px 2px 4px rgba(138, 101, 32, 0.3))"
      }}>
        Trading Club
      </div>
      <div style={{ display: "flex", alignItems: "center", width: "100%", gap: "6px" }}>
        <div style={{ height: "1px", flexGrow: 1, background: "linear-gradient(90deg, transparent, #c4a050)" }} />
        <div style={{ 
          fontFamily: "'DM Sans', sans-serif", 
          fontSize: "7.5px", 
          fontWeight: "700", 
          color: "#e8d080", 
          letterSpacing: "2.5px",
          whiteSpace: "nowrap",
          opacity: 0.95
        }}>
          PENNY PARTNERS GROUP
        </div>
        <div style={{ height: "1px", flexGrow: 1, background: "linear-gradient(90deg, #c4a050, transparent)" }} />
      </div>
    </div>
  );
}

function Navbar({ onOpenRegister }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => { setScrolled(window.scrollY > 10); };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav className="nav-container" style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled || menuOpen ? "#050814" : "rgba(5,8,20,0.4)",
      backdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(196,160,80,0.12)",
      transition: "all 0.3s ease",
      padding: "0 1.25rem",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 75 }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <ResponsiveBrandLogo />
        </div>
        
        <div className={`nav-links ${menuOpen ? "open" : ""}`} style={{ display: "flex", gap: "32px", alignItems: "center" }}>
          {NAV_LINKS.map((l) => (
            <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)} style={{ color: "#b0a080", fontSize: 14, fontFamily: "'DM Sans', sans-serif", textDecoration: "none", fontWeight: 500 }}>{l.label}</a>
          ))}
          <button onClick={() => { setMenuOpen(false); onOpenRegister(); }} style={{ background: "linear-gradient(135deg,#c4a050,#f0d080)", color: "#050814", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 13, padding: "11px 22px", borderRadius: 6, border: "none", cursor: "pointer", textAlign: "center" }}>Join Now</button>
        </div>
      </div>
    </nav>
  );
}

function Hero({ onOpenRegister }) {
  return (
    <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", background: "#050814", padding: "120px 1.25rem 60px" }}>
      <div style={{ textAlign: "center", maxWidth: 900, position: "relative", zIndex: 2 }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.1rem, 5.5vw, 4.2rem)", fontWeight: 900, color: "#f0e8d0", lineHeight: 1.2, marginBottom: 24 }}>
          Trade with Purpose.<br />
          <span style={{ background: "linear-gradient(135deg,#c4a050,#f0d080)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Grow with Community.</span>
        </h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem", color: "#8a8aa8", lineHeight: 1.7, maxWidth: 580, margin: "0 auto 44px" }}>
          PPG Trading Club is an exclusive, members-only forex trading community. Your capital stays in your own broker account. You watch every trade live.
        </p>
        <button onClick={onOpenRegister} style={{ background: "linear-gradient(135deg,#c4a050,#f0d080)", color: "#050814", fontWeight: 700, padding: "15px 30px", borderRadius: 8, border: "none", cursor: "pointer" }}>
          Join the Club - $4.99/Mo
        </button>
      </div>
    </section>
  );
}

export default function App() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  return (
    <div style={{ background: "#050814", color: "#f0e8d0", minHeight: "100vh" }}>
      <Navbar onOpenRegister={() => setIsRegisterOpen(true)} />
      <Hero onOpenRegister={() => setIsRegisterOpen(true)} />
    </div>
  );
}
