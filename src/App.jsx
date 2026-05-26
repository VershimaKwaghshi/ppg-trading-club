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
  const t = threshold || 0.15;
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
        transform: inView ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function PpgLogo() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 220" style={{ width: "100%", height: "100%", maxHeight: "50px" }}>
      <defs>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: "#8a6520", stopOpacity: 1 }} />
          <stop offset="30%" style={{ stopColor: "#c4a050", stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: "#f5e098", stopOpacity: 1 }} />
          <stop offset="70%" style={{ stopColor: "#c4a050", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#8a6520", stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="goldGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: "#8a6520", stopOpacity: 1 }} />
          <stop offset="30%" style={{ stopColor: "#c4a050", stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: "#e8d080", stopOpacity: 1 }} />
          <stop offset="70%" style={{ stopColor: "#c4a050", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#8a6520", stopOpacity: 1 }} />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id="subtleglow">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <text x="350" y="82" fontFamily="Georgia, 'Times New Roman', serif" fontSize="52" fontWeight="700" fontStyle="italic" fill="url(#goldGrad)" textAnchor="middle" letterSpacing="6" filter="url(#glow)">Trading Club</text>
      <line x1="38" y1="122" x2="178" y2="122" stroke="url(#goldGrad2)" strokeWidth="0.9" opacity="0.7"/>
      <line x1="522" y1="122" x2="662" y2="122" stroke="url(#goldGrad2)" strokeWidth="0.9" opacity="0.7"/>
      <text x="350" y="128" fontFamily="Arial, Helvetica, sans-serif" fontSize="13" fontWeight="600" fill="url(#goldGrad2)" textAnchor="middle" letterSpacing="10" filter="url(#subtleglow)">PENNY PARTNERS GROUP</text>
      <line x1="38" y1="158" x2="662" y2="158" stroke="#c4a050" strokeWidth="0.6" opacity="0.2"/>
      <text x="350" y="185" fontFamily="Arial, Helvetica, sans-serif" fontSize="11" fontWeight="500" fill="#c4a050" textAnchor="middle" letterSpacing="8" opacity="0.4">EST. NIGERIA</text>
    </svg>
  );
}

function Navbar({ onOpenRegister }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => { setScrolled(window.scrollY > 20); };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav className="nav-container" style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled || menuOpen ? "rgba(5,8,20,0.98)" : "transparent",
      backdropFilter: scrolled || menuOpen ? "blur(20px)" : "none",
      borderBottom: scrolled || menuOpen ? "1px solid rgba(196,160,80,0.15)" : "none",
      transition: "all 0.3s ease",
      padding: "0 1rem",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 70 }}>
        <div style={{ display: "flex", alignItems: "center", width: "240px" }}>
          <PpgLogo />
        </div>
        
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          {NAV_LINKS.map((l) => (
            <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)} style={{ color: "#b0a080", fontSize: 14, fontFamily: "'DM Sans', sans-serif", textDecoration: "none", fontWeight: 500 }}>{l.label}</a>
          ))}
          <button onClick={() => { setMenuOpen(false); onOpenRegister(); }} style={{ background: "linear-gradient(135deg,#c4a050,#f0d080)", color: "#050814", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 13, padding: "10px 20px", borderRadius: 6, border: "none", cursor: "pointer", textAlign: "center", width: "100%" }}>Join Now</button>
        </div>

        <button onClick={() => setMenuOpen(!menuOpen)} className="menu-toggle" style={{ background: "transparent", border: "none", color: "#c4a050", fontSize: 24, cursor: "pointer" }}>
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>
      <style>{"\n        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;700&family=DM+Mono:wght@400;500&display=swap');\n        * { box-sizing: border-box; margin: 0; padding: 0; }\n        body { background: #050814; }\n        a { transition: color 0.2s; }\n        \n        @media (max-width: 768px) {\n          .menu-toggle { display: block !important; }\n          .nav-links {\n            position: absolute; top: 70px; left: 0; right: 0;\n            background: #050814; flex-direction: column; padding: 24px;\n            gap: 20px !important; border-bottom: 1px solid rgba(196,160,80,0.15);\n            display: none;\n          }\n          .nav-links.open { display: flex !important; }\n          .about-split, .fees-split, .referral-box { flex-direction: column !important; gap: 32px !important; }\n          .form-row { flex-direction: column !important; gap: 16px; }\n          .stats-item { flex: 1 1 40% !important; border-right: none !important; }\n        }\n        @media (min-width: 769px) {\n          .menu-toggle { display: none !important; }\n          .nav-links { display: flex !important; gap: 32px; align-items: center; }\n          .nav-links button { width: auto !important; }\n          .about-split, .fees-split { flex-direction: row !important; gap: 80px !important; }\n          .referral-box { flex-direction: row !important; gap: 64px !important; }\n          .form-row { display: flex; gap: 16px; }\n          .stats-item:not(:last-child) { border-right: 1px solid rgba(196,160,80,0.1); }\n        }\n      "}</style>
    </nav>
  );
}

function Hero({ onOpenRegister }) {
  return (
    <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", background: "#050814", padding: "100px 1rem 60px" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(196,160,80,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(196,160,80,0.03) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      <div style={{ textAlign: "center", maxWidth: 900, position: "relative", zIndex: 2 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(196,160,80,0.08)", border: "1px solid rgba(196,160,80,0.25)", borderRadius: 100, padding: "6px 16px", marginBottom: 24 }}>
          <div style={{ width: 6, height: 6, background: "#4ade80", borderRadius: "50%" }} />
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#c4a050", letterSpacing: "0.05em", fontWeight: 500 }}>Now Accepting Members - 18+ Only</span>
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.2rem, 6vw, 4.5rem)", fontWeight: 900, color: "#f0e8d0", lineHeight: 1.15, marginBottom: 24, letterSpacing: "-0.01em" }}>
          Trade with Purpose.<br />
          <span style={{ background: "linear-gradient(135deg,#c4a050,#f0d080)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Grow with Community.</span>
        </h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(0.95rem, 2vw, 1.1rem)", color: "#8080a0", lineHeight: 1.7, maxWidth: 600, margin: "0 auto 40px", fontWeight: 300 }}>
          PPG Trading Club is an exclusive, members-only forex trading community. Your capital stays in your own broker account. You watch every trade live. You withdraw on your terms.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={onOpenRegister} style={{ background: "linear-gradient(135deg,#c4a050,#f0d080)", color: "#050814", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 14, padding: "14px 28px", borderRadius: 8, border: "none", cursor: "pointer", boxShadow: "0 4px 14px rgba(196,160,80,0.2)" }}>
            Join the Club - $4.99/Mo
          </button>
          <a href="#how" style={{ border: "1px solid rgba(196,160,80,0.3)", color: "#c4a050", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, padding: "14px 28px", borderRadius: 8, textDecoration: "none" }}>
            See How It Works
          </a>
        </div>
        <div className="stats-grid" style={{ display: "flex", justifyContent: "center", marginTop: 60, flexWrap: "wrap", borderTop: "1px solid rgba(196,160,80,0.1)", paddingTop: 32, gap: "24px 0" }}>
          {[["$100", "Min Deposit"], ["7", "Risk Tiers"], ["24H", "Withdrawals"], ["15%", "Referral Earn"]].map((item, i) => (
            <div key={i} className="stats-item" style={{ padding: "0 24px", textAlign: "center" }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.75rem", fontWeight: 900, color: "#c4a050" }}>{item[0]}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#606080", marginTop: 2, letterSpacing: "0.05em", textTransform: "uppercase" }}>{item[1]}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" style={{ padding: "80px 1rem", background: "#070a1a" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <AnimatedSection>
          <div className="about-split" style={{ display: "flex", gap: 48 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#c4a050", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, marginBottom: 12 }}>Who We Are</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 900, color: "#f0e8d0", lineHeight: 1.25, marginBottom: 20 }}>
                Penny Partners Group Built on Trust
              </h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#7878a0", lineHeight: 1.7, fontSize: 14, marginBottom: 16 }}>
                We are Penny Partners Group (PPG Solutions), a CAC-registered Nigerian financial cooperative built with one mission: to help everyday people access professional-grade forex trading and build real, sustainable wealth together.
              </p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#7878a0", lineHeight: 1.7, fontSize: 14, marginBottom: 24 }}>
                PPG Trading Club is our flagship initiative. Our vetted managers trade on your behalf directly through platforms like MT5 or TradingView. Your money never leaves your own account. You stay in full control at all times.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <div style={{ background: "rgba(196,160,80,0.05)", border: "1px solid rgba(196,160,80,0.15)", borderRadius: 8, padding: "10px 16px", flex: "1 1 200px" }}>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#c4a050", marginBottom: 2 }}>CAC Registered</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#7878a0" }}>Nigeria Corporate Affairs Commission</div>
                </div>
                <div style={{ background: "rgba(196,160,80,0.05)", border: "1px solid rgba(196,160,80,0.15)", borderRadius: 8, padding: "10px 16px", flex: "1 1 200px" }}>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#c4a050", marginBottom: 2 }}>Calabar, Nigeria</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#7878a0" }}>10 Arab Road, HQ</div>
                </div>
              </div>
            </div>
            <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
              {[
                { icon: "🔐", title: "Your Account, Your Money", desc: "You open and own your broker account. Our managers only have trading access, never withdrawal access." },
                { icon: "👁️", title: "Watch Every Trade Live", desc: "Every member gets a view-only MT5 password to watch every position open and close, 24/7, in real time." },
                { icon: "📊", title: "Expert Management", desc: "Our vetted managers use disciplined risk strategies aligned with your chosen risk tier." },
                { icon: "🏢", title: "Formally Registered", desc: "PPG is registered with Nigeria's CAC. We operate with legal accountability and full transparency." },
              ].map((c, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(196,160,80,0.08)", borderRadius: 12, padding: "20px" }}>
                  <div style={{ fontSize: 24, marginBottom: 8 }}>{c.icon}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 14, color: "#f0e8d0", marginBottom: 6 }}>{c.title}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#606080", lineHeight: 1.5 }}>{c.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how" style={{ padding: "80px 1rem", background: "#050814" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <AnimatedSection>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#c4a050", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, marginBottom: 12 }}>The Process</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 900, color: "#f0e8d0", lineHeight: 1.25 }}>How It Works</h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#7878a0", marginTop: 12, fontSize: 14, maxWidth: 500, margin: "12px auto 0" }}>From registration to your first live trade, every step is clear and transparent.</p>
          </div>
        </AnimatedSection>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
          {HOW_STEPS.map((step, i) => (
            <AnimatedSection key={i} delay={i * 0.04}>
              <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(196,160,80,0.08)", borderRadius: 12, padding: "24px", height: "100%" }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "rgba(196,160,80,0.4)", fontWeight: 500, marginBottom: 12 }}>{step.n}</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 700, color: "#f0e8d0", marginBottom: 8 }}>{step.title}</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#606080", lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function RiskTiers() {
  const [selected, setSelected] = useState(2);
  return (
    <section id="risk" style={{ padding: "80px 1rem", background: "#070a1a" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <AnimatedSection>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#c4a050", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, marginBottom: 12 }}>Choose Your Level</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 900, color: "#f0e8d0", lineHeight: 1.25 }}>Select Your Risk Tier</h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#7878a0", marginTop: 12, fontSize: 14, maxWidth: 600, margin: "12px auto 0" }}>
              You choose your risk tolerance. Your assigned manager follows it exactly. Higher potential means higher risk.
            </p>
          </div>
        </AnimatedSection>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16, marginBottom: 32 }}>
          {RISK_TIERS.map((tier, i) => (
            <AnimatedSection key={i} delay={i * 0.03}>
              <div
                onClick={() => setSelected(i)}
                style={{
                  background: selected === i ? "rgba(196,160,80,0.04)" : "rgba(255,255,255,0.01)",
                  border: `1px solid ${selected === i ? tier.color : "rgba(196,160,80,0.08)"}`,
                  borderRadius: 12, padding: "20px", cursor: "pointer", position: "relative",
                  boxShadow: selected === i ? `0 0 20px ${tier.color}11` : "none",
                }}>
                {tier.badge && (
                  <div style={{ position: "absolute", top: 12, right: 12, background: tier.color, color: "#050814", fontFamily: "'DM Sans', sans-serif", fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 4 }}>
                    {tier.badge}
                  </div>
                )}
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.85rem", fontWeight: 900, color: tier.color, lineHeight: 1 }}>{tier.pct}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, color: "#f0e8d0", fontSize: 14, margin: "6px 0 2px" }}>{tier.label}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: tier.color, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 10, fontWeight: 600 }}>{tier.risk}</div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#606080", lineHeight: 1.5, marginBottom: 12 }}>{tier.desc}</p>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#c4a050" }}>~{tier.daily}/day on $100</div>
              </div>
            </AnimatedSection>
          ))}
        </div>
        <AnimatedSection>
          <div style={{ background: "rgba(255,200,50,0.02)", border: "1px solid rgba(255,200,50,0.1)", borderRadius: 10, padding: "16px 20px", display: "flex", gap: 12, alignItems: "flex-start" }}>
            <div style={{ fontSize: 18, flexShrink: 0 }}>⚠️</div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#9090b0", lineHeight: 1.6 }}>
              Risk Warning: All percentage figures are potential daily targets. They are not guaranteed returns. Forex trading involves substantial risk of loss. You may lose some or all of your invested capital. Never invest money you cannot afford to lose.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function Fees() {
  return (
    <section id="fees" style={{ padding: "80px 1rem", background: "#050814" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <AnimatedSection>
          <div className="fees-split" style={{ display: "flex", gap: 40 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#c4a050", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, marginBottom: 12 }}>Simple Pricing</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 900, color: "#f0e8d0", lineHeight: 1.25, marginBottom: 16 }}>
                Transparent Fees. No Hidden Costs.
              </h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#7878a0", lineHeight: 1.6, fontSize: 14, marginBottom: 16 }}>
                We believe in complete transparency. Our fees are simple, clear, and structured to align our interests completely with yours.
              </p>
              <div style={{ borderLeft: "2px solid #c4a050", paddingLeft: 16 }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, color: "#f0e8d0", fontSize: 14, marginBottom: 2 }}>Performance Based Profit Share</div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#606080", lineHeight: 1.5 }}>
                  Our profit share is strictly performance-based. We use standard industry calculation models to ensure we only earn when you earn.
                </p>
              </div>
            </div>
            <div style={{ flex: 1, background: "rgba(255,255,255,0.01)", border: "1px solid rgba(196,160,80,0.1)", borderRadius: 16, padding: "28px 24px" }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, color: "#c4a050", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 4 }}>Monthly Access</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 20, borderBottom: "1px solid rgba(196,160,80,0.08)", paddingBottom: 16 }}>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.75rem", fontWeight: 900, color: "#f0e8d0", lineHeight: 1 }}>$4.99</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", color: "#606080", fontSize: 13 }}>/ month</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  "Access to vetted platform managers",
                  "Real-time view-only MT5 tracking",
                  "Flexible risk tier switching",
                  "24/7 direct capital withdrawal control",
                  "15% direct referral commission tier",
                ].map((f, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <span style={{ color: "#c4a050", fontSize: 12 }}>✓</span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#8080a0" }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function Referral() {
  return (
    <section id="referral" style={{ padding: "80px 1rem", background: "#070a1a" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <AnimatedSection>
          <div className="referral-box" style={{ background: "linear-gradient(135deg, rgba(196,160,80,0.03) 0%, rgba(30,60,140,0.03) 100%)", border: "1px solid rgba(196,160,80,0.1)", borderRadius: 16, padding: "32px 24px", display: "flex", gap: 32 }}>
            <div style={{ flex: 1.2 }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#c4a050", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, marginBottom: 12 }}>Grow Together</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.3rem)", fontWeight: 900, color: "#f0e8d0", lineHeight: 1.25, marginBottom: 16 }}>
                Our 15% Mutual Referral System
              </h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#7878a0", lineHeight: 1.6, fontSize: 14, marginBottom: 12 }}>
                To maintain high community standards and security, PPG Trading Club operates exclusively on invitation. Every active member receives a unique referral code.
              </p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#7878a0", lineHeight: 1.6, fontSize: 14 }}>
                When someone registers using your link, you instantly earn a 15% direct referral reward on their monthly subscription fees. This creates an immediate, recurring income line directly tied to our collective community growth.
              </p>
            </div>
            <div style={{ flex: 0.8, display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
              <div style={{ background: "rgba(5,8,20,0.3)", border: "1px solid rgba(196,160,80,0.08)", borderRadius: 10, padding: "16px" }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 18, fontWeight: 700, color: "#c4a050", marginBottom: 2 }}>15%</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: "#f0e8d0", marginBottom: 2 }}>Recurring Commission</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#606080" }}>Earn every single month your referred member stays active.</div>
              </div>
              <div style={{ background: "rgba(5,8,20,0.3)", border: "1px solid rgba(196,160,80,0.08)", borderRadius: 10, padding: "16px" }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 18, fontWeight: 700, color: "#60a5fa", marginBottom: 2 }}>Instant</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: "#f0e8d0", marginBottom: 2 }}>Balance Settlements</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#606080" }}>Earnings reflect inside your digital wallet immediately.</div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function RegisterModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    fullName: "", email: "", phone: "", country: "Nigeria", referralId: "", riskTier: "1%", broker: "No Preference"
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", msg: "" });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleEsc = (e) => { if (e.key === "Escape") onClose(); };
      window.addEventListener("keydown", handleEsc);
      return () => {
        document.body.style.overflow = "unset";
        window.removeEventListener("keydown", handleEsc);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", msg: "" });

    try {
      const response = await fetch("/.netlify/functions/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus({ type: "success", msg: "Registration successful! Our onboarding coordinators will contact you via WhatsApp shortly." });
        setFormData({ fullName: "", email: "", phone: "", country: "Nigeria", referralId: "", riskTier: "1%", broker: "No Preference" });
      } else {
        throw new Error("Submission error");
      }
    } catch (err) {
      setStatus({ type: "error", msg: "An error occurred during submission. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px 16px" }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(3, 5, 13, 0.85)", backdropFilter: "blur(12px)" }} />
      <div style={{ position: "relative", zIndex: 210, width: "100%", maxWidth: "560px", background: "#050814", border: "1px solid rgba(196,160,80,0.25)", borderRadius: 16, padding: "32px 24px", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 20px 40px rgba(0,0,0,0.5)" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "transparent", border: "none", color: "#b0a080", fontSize: 20, cursor: "pointer", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.75rem", fontWeight: 900, color: "#f0e8d0", marginBottom: 6 }}>Application Form</h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#606080", fontSize: 13 }}>Complete your details to request onboarding verification.</p>
        </div>
        {status.msg && (
          <div style={{ background: status.type === "success" ? "rgba(74,222,128,0.05)" : "rgba(239,68,68,0.05)", border: `1px solid ${status.type === "success" ? "#4ade80" : "#ef4444"}`, color: status.type === "success" ? "#4ade80" : "#ef4444", borderRadius: 8, padding: "12px", marginBottom: 16, fontFamily: "'DM Sans', sans-serif", fontSize: 13, lineHeight: 1.4 }}>
            {status.msg}
          </div>
        )}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600, color: "#b0a080", marginBottom: 4, textTransform: "uppercase" }}>Full Name *</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required style={{ width: "100%", background: "rgba(5,8,20,0.6)", border: "1px solid rgba(196,160,80,0.15)", borderRadius: 6, padding: "10px", color: "#f0e8d0", fontFamily: "'DM Sans', sans-serif", fontSize: 14 }} />
          </div>
          <div className="form-row">
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600, color: "#b0a080", marginBottom: 4, textTransform: "uppercase" }}>Email Address *</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: "100%", background: "rgba(5,8,20,0.6)", border: "1px solid rgba(196,160,80,0.15)", borderRadius: 6, padding: "10px", color: "#f0e8d0", fontFamily: "'DM Sans', sans-serif", fontSize: 14 }} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600, color: "#b0a080", marginBottom: 4, textTransform: "uppercase" }}>Phone / WhatsApp *</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="e.g. +234..." required style={{ width: "100%", background: "rgba(5,8,20,0.6)", border: "1px solid rgba(196,160,80,0.15)", borderRadius: 6, padding: "10px", color: "#f0e8d0", fontFamily: "'DM Sans', sans-serif", fontSize: 14 }} />
            </div>
          </div>
          <div className="form-row">
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600, color: "#b0a080", marginBottom: 4, textTransform: "uppercase" }}>Country</label>
              <input type="text" name="country" value={formData.country} onChange={handleChange} style={{ width: "100%", background: "rgba(5,8,20,0.6)", border: "1px solid rgba(196,160,80,0.15)", borderRadius: 6, padding: "10px", color: "#f0e8d0", fontFamily: "'DM Sans', sans-serif", fontSize: 14 }} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600, color: "#b0a080", marginBottom: 4, textTransform: "uppercase" }}>Referral ID *</label>
              <input type="text" name="referralId" value={formData.referralId} onChange={handleChange} placeholder="Required" required style={{ width: "100%", background: "rgba(5,8,20,0.6)", border: "1px solid rgba(196,160,80,0.15)", borderRadius: 6, padding: "10px", color: "#f0e8d0", fontFamily: "'DM Sans', sans-serif", fontSize: 14 }} />
            </div>
          </div>
          <div className="form-row">
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600, color: "#b0a080", marginBottom: 4, textTransform: "uppercase" }}>Preferred Risk Tier</label>
              <select name="riskTier" value={formData.riskTier} onChange={handleChange} style={{ width: "100%", background: "#050814", border: "1px solid rgba(196,160,80,0.15)", borderRadius: 6, padding: "10px", color: "#f0e8d0", fontFamily: "'DM Sans', sans-serif", fontSize: 14 }}>
                {RISK_TIERS.map((t) => <option key={t.pct} value={t.pct}>{t.pct} - {t.label}</option>)}
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600, color: "#b0a080", marginBottom: 4, textTransform: "uppercase" }}>Broker Preference</label>
              <select name="broker" value={formData.broker} onChange={handleChange} style={{ width: "100%", background: "#050814", border: "1px solid rgba(196,160,80,0.15)", borderRadius: 6, padding: "10px", color: "#f0e8d0", fontFamily: "'DM Sans', sans-serif", fontSize: 14 }}>
                <option value="No Preference">No Preference</option>
                <option value="Exness">Exness</option>
                <option value="HFM">HFM (HotForex)</option>
                <option value="FXTM">FXTM</option>
              </select>
            </div>
          </div>
          <button type="submit" disabled={loading} style={{ marginTop: 8, background: "linear-gradient(135deg,#c4a050,#f0d080)", color: "#050814", border: "none", borderRadius: 6, padding: "12px", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
            {loading ? "Processing Application..." : "Submit Application"}
          </button>
        </form>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer style={{ background: "#03050d", padding: "40px 1rem 30px", borderTop: "1px solid rgba(196,160,80,0.05)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 18, color: "#f0d080", marginBottom: 6 }}>PPG</div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#404060", maxWidth: 400, lineHeight: 1.5 }}>
            © {new Date().getFullYear()} PPG Solutions Global Trading Co. All rights reserved. Registered under the Corporate Affairs Commission, Federal Republic of Nigeria.
          </p>
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          <a href="#risk" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#505070", textDecoration: "none" }}>Risk Disclaimer</a>
          <a href="#fees" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#505070", textDecoration: "none" }}>Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <div style={{ minHeight: "100vh", background: "#050814", color: "#f0e8d0", overflowX: "hidden" }}>
      <Navbar onOpenRegister={() => setIsRegisterOpen(true)} />
      <Hero onOpenRegister={() => setIsRegisterOpen(true)} />
      <About />
      <HowItWorks />
      <RiskTiers />
      <Fees />
      <Referral />
      <Footer />
      <RegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
    </div>
  );
}
