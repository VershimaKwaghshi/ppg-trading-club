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
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => { setScrolled(window.scrollY > 40); };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(5,8,20,0.97)" : "transparent",
      backdropFilter: scrolled ? "blur(18px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(196,160,80,0.15)" : "none",
      transition: "all 0.4s ease",
      padding: "0 2rem",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 70 }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src="/ppg-logo-text.svg" alt="PPG Trading Club" style={{ height: 60, width: "auto" }} />
        </div>
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {NAV_LINKS.map((l) => (
            <a key={l.label} href={l.href} style={{ color: "#b0a080", fontSize: 14, fontFamily: "'DM Sans', sans-serif", textDecoration: "none", fontWeight: 500, letterSpacing: "0.03em" }}>{l.label}</a>
          ))}
          <a href="#register" style={{ background: "linear-gradient(135deg,#c4a050,#f0d080)", color: "#050814", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 13, padding: "10px 22px", borderRadius: 6, textDecoration: "none", letterSpacing: "0.04em" }}>Join Now</a>
        </div>
      </div>
      <style>{"\n        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;700&family=DM+Mono:wght@400;500&display=swap');\n        * { box-sizing: border-box; margin: 0; padding: 0; }\n        body { background: #050814; }\n        a { transition: color 0.2s; }\n        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }\n      "}</style>
    </nav>
  );
}

function Hero() {
  return (
    <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", background: "#050814" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(196,160,80,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(196,160,80,0.05) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      <div style={{ position: "absolute", top: "20%", left: "10%", width: 400, height: 400, background: "radial-gradient(circle, rgba(196,160,80,0.12) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(40px)" }} />
      <div style={{ position: "absolute", bottom: "15%", right: "8%", width: 500, height: 500, background: "radial-gradient(circle, rgba(30,60,140,0.25) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(60px)" }} />
      <div style={{ textAlign: "center", maxWidth: 900, padding: "0 2rem", position: "relative", zIndex: 2 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(196,160,80,0.1)", border: "1px solid rgba(196,160,80,0.3)", borderRadius: 100, padding: "6px 18px", marginBottom: 32 }}>
          <div style={{ width: 7, height: 7, background: "#4ade80", borderRadius: "50%", animation: "pulse 2s infinite" }} />
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#c4a050", letterSpacing: "0.1em", fontWeight: 500, textTransform: "uppercase" }}>Now Accepting Members - 18+ Only</span>
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.8rem, 7vw, 5.5rem)", fontWeight: 900, color: "#f0e8d0", lineHeight: 1.1, marginBottom: 28, letterSpacing: "-0.02em" }}>
          Trade with Purpose.<br />
          <span style={{ background: "linear-gradient(135deg,#c4a050,#f0d080,#c4a050)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Grow with Community.</span>
        </h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(1rem, 2.5vw, 1.2rem)", color: "#8080a0", lineHeight: 1.8, maxWidth: 640, margin: "0 auto 48px", fontWeight: 300 }}>
          PPG Trading Club is an exclusive, members-only forex trading community. Your capital stays in your own broker account. You watch every trade live. You withdraw on your terms.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="#register" style={{ background: "linear-gradient(135deg,#c4a050,#f0d080)", color: "#050814", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 15, padding: "16px 36px", borderRadius: 8, textDecoration: "none", letterSpacing: "0.03em", boxShadow: "0 8px 32px rgba(196,160,80,0.35)" }}>
            Join the Club - $4.99/Mo
          </a>
          <a href="#how" style={{ border: "1px solid rgba(196,160,80,0.35)", color: "#c4a050", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 15, padding: "16px 36px", borderRadius: 8, textDecoration: "none", background: "transparent" }}>
            See How It Works
          </a>
        </div>
        <div style={{ display: "flex", gap: 0, justifyContent: "center", marginTop: 80, flexWrap: "wrap", borderTop: "1px solid rgba(196,160,80,0.1)", paddingTop: 48 }}>
          {[["$100", "Minimum Deposit"], ["7", "Risk Tiers"], ["24H", "Withdrawals"], ["15%", "Referral Earn"]].map((item, i) => (
            <div key={i} style={{ padding: "0 40px", borderRight: i < 3 ? "1px solid rgba(196,160,80,0.1)" : "none", textAlign: "center" }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 900, color: "#c4a050" }}>{item[0]}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#606080", marginTop: 4, letterSpacing: "0.08em", textTransform: "uppercase" }}>{item[1]}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" style={{ padding: "120px 2rem", background: "#070a1a" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <AnimatedSection>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            <div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#c4a050", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>Who We Are</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, color: "#f0e8d0", lineHeight: 1.2, marginBottom: 24 }}>
                Penny Partners Group Built on Trust
              </h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#7878a0", lineHeight: 1.9, fontSize: 16, marginBottom: 20 }}>
                We are Penny Partners Group (PPG Solutions), a CAC-registered Nigerian financial cooperative built with one mission: to help everyday people access professional-grade forex trading and build real, sustainable wealth together.
              </p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#7878a0", lineHeight: 1.9, fontSize: 16, marginBottom: 32 }}>
                PPG Trading Club is our flagship initiative. Our vetted managers trade on your behalf directly through platforms like MT5 or TradingView. Your money never leaves your own account. You stay in full control at all times.
              </p>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <div style={{ background: "rgba(196,160,80,0.08)", border: "1px solid rgba(196,160,80,0.2)", borderRadius: 8, padding: "12px 20px" }}>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#c4a050", marginBottom: 4 }}>CAC Registered</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#7878a0" }}>Nigeria Corporate Affairs Commission</div>
                </div>
                <div style={{ background: "rgba(196,160,80,0.08)", border: "1px solid rgba(196,160,80,0.2)", borderRadius: 8, padding: "12px 20px" }}>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#c4a050", marginBottom: 4 }}>Calabar, Nigeria</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#7878a0" }}>10 Arab Road, HQ</div>
                </div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                { icon: "🔐", title: "Your Account, Your Money", desc: "You open and own your broker account. Our managers only have trading access, never withdrawal access." },
                { icon: "👁️", title: "Watch Every Trade Live", desc: "Every member gets a view-only MT5 password to watch every position open and close, 24/7, in real time." },
                { icon: "📊", title: "Expert Management", desc: "Our vetted managers use disciplined risk strategies aligned with your chosen risk tier." },
                { icon: "🏢", title: "Formally Registered", desc: "PPG is registered with Nigeria's CAC. We operate with legal accountability and full transparency." },
              ].map((c, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(196,160,80,0.1)", borderRadius: 12, padding: "24px 20px" }}>
                  <div style={{ fontSize: 28, marginBottom: 12 }}>{c.icon}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 14, color: "#f0e8d0", marginBottom: 8 }}>{c.title}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#606080", lineHeight: 1.6 }}>{c.desc}</div>
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
    <section id="how" style={{ padding: "120px 2rem", background: "#050814" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <AnimatedSection>
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#c4a050", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>The Process</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, color: "#f0e8d0", lineHeight: 1.2 }}>How It Works</h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#7878a0", marginTop: 16, fontSize: 16, maxWidth: 500, margin: "16px auto 0" }}>From registration to your first live trade, every step is clear and transparent.</p>
          </div>
        </AnimatedSection>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          {HOW_STEPS.map((step, i) => (
            <AnimatedSection key={i} delay={i * 0.08}>
              <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(196,160,80,0.1)", borderRadius: 16, padding: "32px 28px", height: "100%" }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, color: "rgba(196,160,80,0.4)", fontWeight: 500, marginBottom: 16, letterSpacing: "0.08em" }}>{step.n}</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.15rem", fontWeight: 700, color: "#f0e8d0", marginBottom: 12 }}>{step.title}</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#606080", lineHeight: 1.75 }}>{step.desc}</p>
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
    <section id="risk" style={{ padding: "120px 2rem", background: "#070a1a" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <AnimatedSection>
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#c4a050", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>Choose Your Level</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, color: "#f0e8d0", lineHeight: 1.2 }}>Select Your Risk Tier</h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#7878a0", marginTop: 16, fontSize: 16, maxWidth: 600, margin: "16px auto 0" }}>
              You choose your risk tolerance. Your assigned manager follows it exactly. Higher potential means higher risk.
            </p>
          </div>
        </AnimatedSection>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20, marginBottom: 48 }}>
          {RISK_TIERS.map((tier, i) => (
            <AnimatedSection key={i} delay={i * 0.06}>
              <div
                onClick={() => setSelected(i)}
                style={{
                  background: selected === i ? "rgba(196,160,80,0.06)" : "rgba(255,255,255,0.02)",
                  border: `1px solid ${selected === i ? tier.color : "rgba(196,160,80,0.1)"}`,
                  borderRadius: 14, padding: "28px 24px", cursor: "pointer", position: "relative", overflow: "hidden",
                  boxShadow: selected === i ? `0 0 30px ${tier.color}22` : "none",
                }}>
                {tier.badge && (
                  <div style={{ position: "absolute", top: 14, right: 14, background: tier.color, color: "#050814", fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 4, letterSpacing: "0.08em" }}>
                    {tier.badge}
                  </div>
                )}
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", fontWeight: 900, color: tier.color, lineHeight: 1 }}>{tier.pct}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, color: "#f0e8d0", fontSize: 15, margin: "8px 0 4px" }}>{tier.label}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: tier.color, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 14, fontWeight: 600 }}>{tier.risk}</div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#606080", lineHeight: 1.65, marginBottom: 16 }}>{tier.desc}</p>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#c4a050" }}>~{tier.daily}/day on $100</div>
              </div>
            </AnimatedSection>
          ))}
        </div>
        <AnimatedSection>
          <div style={{ background: "rgba(255,200,50,0.04)", border: "1px solid rgba(255,200,50,0.15)", borderRadius: 12, padding: "24px 28px", display: "flex", gap: 16, alignItems: "flex-start" }}>
            <div style={{ fontSize: 22, flexShrink: 0 }}>⚠️</div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#9090b0", lineHeight: 1.75 }}>
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
    <section id="fees" style={{ padding: "120px 2rem", background: "#050814" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <AnimatedSection>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
            <div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#c4a050", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>Simple Pricing</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, color: "#f0e8d0", lineHeight: 1.2, marginBottom: 24 }}>
                Transparent Fees. No Hidden Costs.
              </h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#7878a0", lineHeight: 1.8, fontSize: 15, marginBottom: 20 }}>
                We believe in complete transparency. Our fees are simple, clear, and structured to align our interests completely with yours.
              </p>
              <div style={{ borderLeft: "2px solid #c4a050", paddingLeft: 20, marginBottom: 20 }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, color: "#f0e8d0", fontSize: 15, marginBottom: 4 }}>Performance Based Profit Share</div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#606080", lineHeight: 1.6 }}>
                  Our profit share is strictly performance-based. We use standard industry calculation models to ensure we only earn when you earn.
                </p>
              </div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(196,160,80,0.15)", borderRadius: 20, padding: "40px 32px", position: "relative" }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 700, color: "#c4a050", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Monthly Access</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 28, borderBottom: "1px solid rgba(196,160,80,0.1)", paddingBottom: 24 }}>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "3.5rem", fontWeight: 900, color: "#f0e8d0", lineHeight: 1 }}>$4.99</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", color: "#606080", fontSize: 14 }}>/ month</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  "Access to vetted platform managers",
                  "Real-time view-only MT5 tracking",
                  "Flexible risk tier switching",
                  "24/7 direct capital withdrawal control",
                  "15% direct referral commission tier",
                ].map((f, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <span style={{ color: "#c4a050", fontSize: 14 }}>✓</span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#8080a0" }}>{f}</span>
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
    <section id="referral" style={{ padding: "120px 2rem", background: "#070a1a" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <AnimatedSection>
          <div style={{ background: "linear-gradient(135deg, rgba(196,160,80,0.05) 0%, rgba(30,60,140,0.05) 100%)", border: "1px solid rgba(196,160,80,0.15)", borderRadius: 24, padding: "64px 48px", display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 64, alignItems: "center" }}>
            <div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#c4a050", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>Grow Together</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 900, color: "#f0e8d0", lineHeight: 1.2, marginBottom: 20 }}>
                Our 15% Mutual Referral System
              </h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#7878a0", lineHeight: 1.8, fontSize: 15, marginBottom: 16 }}>
                To maintain high community standards and security, PPG Trading Club operates exclusively on invitation. Every active member receives a unique referral code.
              </p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#7878a0", lineHeight: 1.8, fontSize: 15 }}>
                When someone registers using your link, you instantly earn a **15% direct referral reward** on their monthly subscription fees. This creates an immediate, recurring income line directly tied to our collective community growth.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ background: "rgba(5,8,20,0.4)", border: "1px solid rgba(196,160,80,0.1)", borderRadius: 12, padding: "20px" }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 20, fontWeight: 700, color: "#c4a050", marginBottom: 4 }}>15%</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: "#f0e8d0", marginBottom: 4 }}>Recurring Commission</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#606080" }}>Earn every single month your referred member stays active.</div>
              </div>
              <div style={{ background: "rgba(5,8,20,0.4)", border: "1px solid rgba(196,160,80,0.1)", borderRadius: 12, padding: "20px" }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 20, fontWeight: 700, color: "#60a5fa", marginBottom: 4 }}>Instant</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: "#f0e8d0", marginBottom: 4 }}>Balance Settlements</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#606080" }}>Earnings reflect inside your digital wallet immediately.</div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function Register() {
  const [formData, setFormData] = useState({
    fullName: "", email: "", phone: "", country: "Nigeria", referralId: "", riskTier: "1%", broker: "No Preference"
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", msg: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", msg: "" });

    if (!formData.fullName || !formData.email || !formData.phone || !formData.referralId) {
      setStatus({ type: "error", msg: "Please fill out all required fields carefully." });
      setLoading(false);
      return;
    }

    try {
      // Netlify automatically forwards data to your cloud functions securely
      const response = await fetch("/.netlify/functions/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus({ type: "success", msg: "Registration successful! Our system onboarding coordinators will reach out shortly via WhatsApp." });
        setFormData({ fullName: "", email: "", phone: "", country: "Nigeria", referralId: "", riskTier: "1%", broker: "No Preference" });
      } else {
        throw new Error("Server communication error.");
      }
    } catch (err) {
      setStatus({ type: "error", msg: "An error occurred during submission. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="register" style={{ padding: "120px 2rem", background: "#050814" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <AnimatedSection>
          <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(196,160,80,0.2)", borderRadius: 24, padding: "48px 40px" }}>
            <div style={{ textAlign: "center", marginBottom: 36 }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", fontWeight: 900, color: "#f0e8d0", marginBottom: 12 }}>Application Form</h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#606080", fontSize: 14 }}>Complete your details to request onboarding verification.</p>
            </div>
            {status.msg && (
              <div style={{
                background: status.type === "success" ? "rgba(74,222,128,0.08)" : "rgba(239,68,68,0.08)",
                border: `1px solid ${status.type === "success" ? "#4ade80" : "#ef4444"}`,
                color: status.type === "success" ? "#4ade80" : "#ef4444",
                borderRadius: 8, padding: "14px 18px", marginBottom: 28, fontFamily: "'DM Sans', sans-serif", fontSize: 14, lineHeight: 1.5
              }}>
                {status.msg}
              </div>
            )}
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div>
                <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: "#b0a080", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Full Name *</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required style={{ width: "100%", background: "rgba(5,8,20,0.6)", border: "1px solid rgba(196,160,80,0.15)", borderRadius: 8, padding: "12px 16px", color: "#f0e8d0", fontFamily: "'DM Sans', sans-serif", fontSize: 14 }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: "#b0a080", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Email Address *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: "100%", background: "rgba(5,8,20,0.6)", border: "1px solid rgba(196,160,80,0.15)", borderRadius: 8, padding: "12px 16px", color: "#f0e8d0", fontFamily: "'DM Sans', sans-serif", fontSize: 14 }} />
                </div>
                <div>
                  <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: "#b0a080", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Phone / WhatsApp *</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="e.g. +234..." required style={{ width: "100%", background: "rgba(5,8,20,0.6)", border: "1px solid rgba(196,160,80,0.15)", borderRadius: 8, padding: "12px 16px", color: "#f0e8d0", fontFamily: "'DM Sans', sans-serif", fontSize: 14 }} />
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: "#b0a080", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Country</label>
                  <input type="text" name="country" value={formData.country} onChange={handleChange} style={{ width: "100%", background: "rgba(5,8,20,0.6)", border: "1px solid rgba(196,160,80,0.15)", borderRadius: 8, padding: "12px 16px", color: "#f0e8d0", fontFamily: "'DM Sans', sans-serif", fontSize: 14 }} />
                </div>
                <div>
                  <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: "#b0a080", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Referral ID *</label>
                  <input type="text" name="referralId" value={formData.referralId} onChange={handleChange} placeholder="Required" required style={{ width: "100%", background: "rgba(5,8,20,0.6)", border: "1px solid rgba(196,160,80,0.15)", borderRadius: 8, padding: "12px 16px", color: "#f0e8d0", fontFamily: "'DM Sans', sans-serif", fontSize: 14 }} />
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: "#b0a080", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Preferred Risk Tier</label>
                  <select name="riskTier" value={formData.riskTier} onChange={handleChange} style={{ width: "100%", background: "#050814", border: "1px solid rgba(196,160,80,0.15)", borderRadius: 8, padding: "12px 16px", color: "#f0e8d0", fontFamily: "'DM Sans', sans-serif", fontSize: 14 }}>
                    {RISK_TIERS.map((t) => <option key={t.pct} value={t.pct}>{t.pct} - {t.label}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: "#b0a080", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Broker Preference</label>
                  <select name="broker" value={formData.broker} onChange={handleChange} style={{ width: "100%", background: "#050814", border: "1px solid rgba(196,160,80,0.15)", borderRadius: 8, padding: "12px 16px", color: "#f0e8d0", fontFamily: "'DM Sans', sans-serif", fontSize: 14 }}>
                    <option value="No Preference">No Preference</option>
                    <option value="Exness">Exness</option>
                    <option value="HFM">HFM (HotForex)</option>
                    <option value="FXTM">FXTM</option>
                  </select>
                </div>
              </div>
              <button type="submit" disabled={loading} style={{ marginTop: 12, background: "linear-gradient(135deg,#c4a050,#f0d080)", color: "#050814", border: "none", borderRadius: 8, padding: "16px", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 15, cursor: "pointer", letterSpacing: "0.03em", boxShadow: "0 4px 20px rgba(196,160,80,0.25)" }}>
                {loading ? "Processing Application..." : "Submit Application"}
              </button>
            </form>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: "#03050d", padding: "60px 2rem 40px", borderTop: "1px solid rgba(196,160,80,0.08)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 32 }}>
        <div>
          <img src="/ppg-logo-text.svg" alt="PPG" style={{ height: 45, width: "auto", marginBottom: 12 }} />
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#404060", maxWidth: 360, lineHeight: 1.6 }}>
            © {new Date().getFullYear()} PPG Solutions Global Trading Co. All rights reserved. Registered under the Corporate Affairs Commission, Federal Republic of Nigeria.
          </p>
        </div>
        <div style={{ display: "flex", gap: 40 }}>
          <div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, color: "#b0a080", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>Legal</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <a href="#risk" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#505070", textDecoration: "none" }}>Risk Disclaimer</a>
              <a href="#fees" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#505070", textDecoration: "none" }}>Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div style={{ minHeight: "100vh", background: "#050814", color: "#f0e8d0", overflowX: "hidden" }}>
      <Navbar />
      <Hero />
      <About />
      <HowItWorks />
      <RiskTiers />
      <Fees />
      <Referral />
      <Register />
      <Footer />
    </div>
  );
}
