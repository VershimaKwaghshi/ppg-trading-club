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
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, background: "linear-gradient(135deg,#c4a050,#f0d080)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 16, color: "#050814" }}>P</div>
          <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 18, color: "#f0e8d0", letterSpacing: "0.02em" }}>PPG Trading Club</span>
        </div>
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {NAV_LINKS.map((l) => (
            <a key={l.label} href={l.href} style={{ color: "#b0a080", fontSize: 14, fontFamily: "'DM Sans', sans-serif", textDecoration: "none", fontWeight: 500, letterSpacing: "0.03em" }}>{l.label}</a>
          ))}
          <a href="#register" style={{ background: "linear-gradient(135deg,#c4a050,#f0d080)", color: "#050814", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 13, padding: "10px 22px", borderRadius: 6, textDecoration: "none", letterSpacing: "0.04em" }}>Join Now</a>
        </div>
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;700&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #050814; }
        a { transition: color 0.2s; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
      `}</style>
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
  const [tab, setTab] = useState(0);
  return (
    <section id="fees" style={{ padding: "120px 2rem", background: "#050814" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <AnimatedSection>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#c4a050", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>Transparent Pricing</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, color: "#f0e8d0", lineHeight: 1.2 }}>Simple, Honest Fees</h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#7878a0", marginTop: 16, fontSize: 16, maxWidth: 520, margin: "16px auto 0" }}>No hidden charges. What you see is what you pay. Every fee is disclosed upfront.</p>
          </div>
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <div style={{ background: "linear-gradient(135deg, rgba(196,160,80,0.08), rgba(196,160,80,0.03))", border: "1px solid rgba(196,160,80,0.25)", borderRadius: 16, padding: "36px 40px", marginBottom: 32, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
            <div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#c4a050", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, marginBottom: 8 }}>Monthly Membership</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 700, color: "#f0e8d0", marginBottom: 8 }}>Platform Subscription</h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#7878a0", maxWidth: 420 }}>Charged to every verified member regardless of broker choice. Keeps your account active and gives you access to the platform, manager assignment, and support.</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "3rem", fontWeight: 900, color: "#c4a050", lineHeight: 1 }}>$4.99</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#606080", marginTop: 4 }}>per month</div>
            </div>
          </div>
        </AnimatedSection>
        <AnimatedSection delay={0.15}>
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", gap: 0, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(196,160,80,0.15)", borderRadius: 10, padding: 4, width: "fit-content", marginBottom: 28 }}>
              {["Using Our Recommended Broker", "Using Your Own Broker"].map((t, i) => (
                <button key={i} onClick={() => setTab(i)} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, padding: "10px 22px", borderRadius: 7, border: "none", cursor: "pointer", background: tab === i ? "linear-gradient(135deg,#c4a050,#f0d080)" : "transparent", color: tab === i ? "#050814" : "#7878a0" }}>{t}</button>
              ))}
            </div>
            {tab === 0 ? (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
                {[
                  { label: "Profit Split", trader: "70%", manager: "30%", icon: "📊" },
                  { label: "Trader Withdrawal Fee", value: "7%", icon: "💳", note: "Charged to you on withdrawal" },
                  { label: "Manager Withdrawal Fee", value: "3%", icon: "🧑‍💼", note: "Charged to manager on their share" },
                  { label: "Why Choose This", value: "Better split. Lower fees.", icon: "✅", note: "You keep more of your profit." },
                ].map((item, i) => (
                  <div key={i} style={{ background: "rgba(196,160,80,0.05)", border: "1px solid rgba(196,160,80,0.2)", borderRadius: 12, padding: "24px 20px" }}>
                    <div style={{ fontSize: 24, marginBottom: 12 }}>{item.icon}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#7878a0", marginBottom: 8 }}>{item.label}</div>
                    {item.trader ? (
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 900, color: "#4ade80" }}>{item.trader}</div>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", color: "#606080", fontSize: 13 }}>you / {item.manager} manager</div>
                      </div>
                    ) : (
                      <div>
                        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 900, color: "#c4a050" }}>{item.value}</div>
                        {item.note && <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#606080", marginTop: 4 }}>{item.note}</div>}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
                {[
                  { label: "Profit Split", trader: "50%", manager: "50%", icon: "📊" },
                  { label: "Trader Withdrawal Fee", value: "15%", icon: "💳", note: "Charged to you on withdrawal" },
                  { label: "Manager Withdrawal Fee", value: "15%", icon: "🧑‍💼", note: "Charged to manager on their share" },
                  { label: "Tip", value: "Switch to our recommended broker", icon: "ℹ️", note: "Better split and lower fees." },
                ].map((item, i) => (
                  <div key={i} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(196,160,80,0.1)", borderRadius: 12, padding: "24px 20px" }}>
                    <div style={{ fontSize: 24, marginBottom: 12 }}>{item.icon}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#7878a0", marginBottom: 8 }}>{item.label}</div>
                    {item.trader ? (
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 900, color: "#f0d080" }}>{item.trader}</div>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", color: "#606080", fontSize: 13 }}>you / {item.manager} manager</div>
                      </div>
                    ) : (
                      <div>
                        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", fontWeight: 900, color: "#f0d080" }}>{item.value}</div>
                        {item.note && <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#606080", marginTop: 4 }}>{item.note}</div>}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
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
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <AnimatedSection>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#c4a050", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>Earn More</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, color: "#f0e8d0", lineHeight: 1.2, marginBottom: 24 }}>
              Refer and Earn Every Time They Do
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#7878a0", lineHeight: 1.9, fontSize: 16, marginBottom: 20 }}>
              Every member receives a unique referral ID. When someone you refer makes a withdrawal, you automatically earn 15% of their gross withdrawal. This is funded by the withdrawal fee structure, not taken extra from them.
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#7878a0", lineHeight: 1.9, fontSize: 16, marginBottom: 32 }}>
              The more active members you refer, the more passive income you build alongside your own trading profits. This is how we grow together.
            </p>
            <div style={{ background: "rgba(196,160,80,0.06)", border: "1px solid rgba(196,160,80,0.2)", borderRadius: 12, padding: "20px 24px", marginBottom: 32 }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#7878a0", marginBottom: 8 }}>Important Note</div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#9090b0", lineHeight: 1.7 }}>
                Your account is verified once KYC is approved, but trading only begins after you refer at least one member. Referral keeps our community trusted and growing.
              </p>
            </div>
            <a href="#register" style={{ display: "inline-block", background: "linear-gradient(135deg,#c4a050,#f0d080)", color: "#050814", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 14, padding: "14px 32px", borderRadius: 8, textDecoration: "none", letterSpacing: "0.03em" }}>
              Get Your Referral ID
            </a>
          </AnimatedSection>
          <AnimatedSection delay={0.15}>
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(196,160,80,0.15)", borderRadius: 20, padding: "40px 36px" }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#7878a0", marginBottom: 24, paddingBottom: 20, borderBottom: "1px solid rgba(196,160,80,0.1)" }}>Example: Your referral withdraws $100</div>
              {[
                { label: "Gross Withdrawal", value: "$100.00", color: "#f0e8d0" },
                { label: "Your Referral Earn (15%)", value: "+ $15.00", color: "#4ade80" },
                { label: "Withdrawal Fee (7% recommended broker)", value: "- $7.00", color: "#f97316" },
                { label: "Your referral receives", value: "$78.00", color: "#c4a050", bold: true },
              ].map((row, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#7878a0" }}>{row.label}</span>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: row.bold ? 16 : 14, color: row.color, fontWeight: row.bold ? 700 : 400 }}>{row.value}</span>
                </div>
              ))}
              <div style={{ marginTop: 24, padding: "16px", background: "rgba(196,160,80,0.06)", borderRadius: 8, textAlign: "center" }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 900, color: "#c4a050" }}>15%</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#606080", marginTop: 4 }}>referral commission, no upper limit</div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

function Register() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", country: "", referral: "", risk: "", broker: "", consent: false });
  const [submitted, setSubmitted] = useState(false);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const inputStyle = { width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(196,160,80,0.2)", borderRadius: 8, padding: "14px 16px", color: "#f0e8d0", fontFamily: "'DM Sans', sans-serif", fontSize: 14, outline: "none" };
  const labelStyle = { fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#7878a0", marginBottom: 6, display: "block", letterSpacing: "0.05em", textTransform: "uppercase" };

  if (submitted) {
    return (
      <section id="register" style={{ padding: "120px 2rem", background: "#050814", textAlign: "center" }}>
        <div style={{ maxWidth: 500, margin: "0 auto" }}>
          <div style={{ fontSize: 56, marginBottom: 24 }}>✅</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 900, color: "#f0e8d0", marginBottom: 16 }}>Application Received</h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#7878a0", lineHeight: 1.8 }}>Thank you! Your application is under review. You will be contacted via WhatsApp within 24-48 hours to complete consent and KYC verification.</p>
          <a href="https://wa.me/2348130500659" target="_blank" rel="noreferrer" style={{ display: "inline-block", marginTop: 32, background: "linear-gradient(135deg,#c4a050,#f0d080)", color: "#050814", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 14, padding: "14px 32px", borderRadius: 8, textDecoration: "none" }}>Continue on WhatsApp</a>
        </div>
      </section>
    );
  }

  return (
    <section id="register" style={{ padding: "120px 2rem", background: "#050814" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <AnimatedSection>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#c4a050", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>Ready to Join?</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, color: "#f0e8d0", lineHeight: 1.2 }}>Start Your Application</h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#7878a0", marginTop: 16, fontSize: 15 }}>Membership is by referral only. A referral ID from an existing member is required.</p>
          </div>
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(196,160,80,0.15)", borderRadius: 20, padding: "48px 44px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
              <div>
                <label style={labelStyle}>Full Name</label>
                <input style={inputStyle} placeholder="Your full name" value={form.name} onChange={(e) => set("name", e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Email Address</label>
                <input style={inputStyle} type="email" placeholder="you@email.com" value={form.email} onChange={(e) => set("email", e.target.value)} />
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
              <div>
                <label style={labelStyle}>Phone / WhatsApp</label>
                <input style={inputStyle} placeholder="+234 ..." value={form.phone} onChange={(e) => set("phone", e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Country</label>
                <input style={inputStyle} placeholder="Nigeria" value={form.country} onChange={(e) => set("country", e.target.value)} />
              </div>
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>Referral ID (Required)</label>
              <input style={inputStyle} placeholder="Enter your referrer's ID" value={form.referral} onChange={(e) => set("referral", e.target.value)} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
              <div>
                <label style={labelStyle}>Risk Tier</label>
                <select style={{ ...inputStyle, cursor: "pointer" }} value={form.risk} onChange={(e) => set("risk", e.target.value)}>
                  <option value="">Select risk tier</option>
                  {RISK_TIERS.map((t) => <option key={t.pct} value={t.pct}>{t.pct} - {t.label}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Broker Preference</label>
                <select style={{ ...inputStyle, cursor: "pointer" }} value={form.broker} onChange={(e) => set("broker", e.target.value)}>
                  <option value="">Select preference</option>
                  <option value="recommended">Use PPG Recommended Broker</option>
                  <option value="own">I have my own broker</option>
                </select>
              </div>
            </div>
            <div style={{ background: "rgba(196,160,80,0.04)", border: "1px solid rgba(196,160,80,0.15)", borderRadius: 10, padding: "18px 20px", marginBottom: 28, display: "flex", gap: 14, alignItems: "flex-start" }}>
              <input type="checkbox" id="consent" checked={form.consent} onChange={(e) => set("consent", e.target.checked)} style={{ marginTop: 2, accentColor: "#c4a050", width: 16, height: 16, flexShrink: 0, cursor: "pointer" }} />
              <label htmlFor="consent" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#7878a0", lineHeight: 1.65, cursor: "pointer" }}>
                I confirm I am 18+ years old and I understand that forex trading involves substantial risk, including the possible loss of all my invested capital. I accept the PPG Trading Club terms and fee structure.
              </label>
            </div>
            <button
              onClick={() => { if (form.name && form.email && form.referral && form.consent) setSubmitted(true); }}
              style={{ width: "100%", background: "linear-gradient(135deg,#c4a050,#f0d080)", color: "#050814", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 15, padding: "16px", borderRadius: 10, border: "none", cursor: "pointer", letterSpacing: "0.04em", opacity: (form.name && form.email && form.referral && form.consent) ? 1 : 0.5 }}>
              Submit Application
            </button>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#505070", textAlign: "center", marginTop: 16 }}>After submission, you will be guided to WhatsApp to complete consent and payment of the $4.99 monthly subscription.</p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: "#030610", borderTop: "1px solid rgba(196,160,80,0.1)", padding: "64px 2rem 32px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 64 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div style={{ width: 36, height: 36, background: "linear-gradient(135deg,#c4a050,#f0d080)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 16, color: "#050814" }}>P</div>
              <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 16, color: "#f0e8d0" }}>PPG Trading Club</span>
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#505070", lineHeight: 1.8, maxWidth: 280, marginBottom: 20 }}>Nigeria's trusted forex trading cooperative. CAC Registered. Building wealth through community and professional management.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {["contact.ppgsolutions@gmail.com", "+234 813 050 0659", "10 Arab Road, Calabar, Nigeria"].map((c, i) => (
                <div key={i} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#505070" }}>{c}</div>
              ))}
            </div>
          </div>
          {[
            { title: "Club", links: ["About PPG", "How It Works", "Risk Tiers", "Fees", "Referral Program"] },
            { title: "Join", links: ["Register", "Pay Subscription", "Risk Consent", "KYC Verification"] },
            { title: "Support", links: ["WhatsApp Support", "Email Us"] },
          ].map((col, i) => (
            <div key={i}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#c4a050", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, marginBottom: 20 }}>{col.title}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {col.links.map((l) => (
                  <a key={l} href="#" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#505070", textDecoration: "none" }}>{l}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid rgba(196,160,80,0.08)", paddingTop: 28, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#404060" }}>2026 Penny Partners Group (PPG Solutions). CAC Registered. All rights reserved.</div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#404060", maxWidth: 500 }}>Forex trading involves substantial risk. You may lose all your invested capital. PPG Trading Club does not guarantee any returns.</div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#050814", minHeight: "100vh" }}>
      <Navbar />
      <Hero />
      <About />
      <HowItWorks />
      <RiskTiers />
      <Fees />
      <Referral />
      <Register />
      <Footer />
      <a href="https://wa.me/2348130500659" target="_blank" rel="noreferrer" style={{ position: "fixed", bottom: 28, right: 28, width: 54, height: 54, background: "#25D366", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, boxShadow: "0 4px 20px rgba(37,211,102,0.4)", textDecoration: "none", zIndex: 200 }}>💬</a>
    </div>
  );
}
