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
  var t = threshold || 0.15;
  var _a = useState(false), inView = _a[0], setInView = _a[1];
  useEffect(function() {
    var observer = new IntersectionObserver(
      function(entries) { if (entries[0].isIntersecting) setInView(true); },
      { threshold: t }
    );
    if (ref.current) observer.observe(ref.current);
    return function() { observer.disconnect(); };
  }, [ref, t]);
  return inView;
}

function AnimatedSection(props) {
  var children = props.children;
  var className = props.className || "";
  var delay = props.delay || 0;
  var ref = useRef(null);
  var inView = useInView(ref);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 0.7s ease " + delay + "s, transform 0.7s ease " + delay + "s",
      }}
    >
      {children}
    </div>
  );
}

function Navbar() {
  var _a = useState(false), scrolled = _a[0], setScrolled = _a[1];
  useEffect(function() {
    var fn = function() { setScrolled(window.scrollY > 40); };
    window.addEventListener("scroll", fn);
    return function() { window.removeEventListener("scroll", fn); };
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
          {NAV_LINKS.map(function(l) {
            return (
              <a key={l.label} href={l.href} style={{ color: "#b0a080", fontSize: 14, fontFamily: "'DM Sans', sans-serif", textDecoration: "none", fontWeight: 500, letterSpacing: "0.03em" }}>{l.label}</a>
            );
          })}
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
          {[["$100", "Minimum Deposit"], ["7", "Risk Tiers"], ["24H", "Withdrawals"], ["15%", "Referral Earn"]].map(function(item, i) {
            return (
              <div key={i} style={{ padding: "0 40px", borderRight: i < 3 ? "1px solid rgba(196,160,80,0.1)" : "none", textAlign: "center" }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 900, color: "#c4a050" }}>{item[0]}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#606080", marginTop: 4, letterSpacing: "0.08em", textTransform: "uppercase" }}>{item[1]}</div>
              </div>
            );
          })}
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
              ].map(function(c, i) {
                return (
                  <div key={i} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(196,160,80,0.1)", borderRadius: 12, padding: "24px 20px" }}>
                    <div style={{ fontSize: 28, marginBottom: 12 }}>{c.icon}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 14, color: "#f0e8d0", marginBottom: 8 }}>{c.title}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#606080", lineHeight: 1.6 }}>{c.desc}</div>
                  </div>
                );
              })}
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
          {HOW_STEPS.map(function(step, i) {
            return (
              <AnimatedSection key={i} delay={i * 0.08}>
                <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(196,160,80,0.1)", borderRadius: 16, padding: "32px 28px", height: "100%" }}>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, color: "rgba(196,160,80,0.4)", fontWeight: 500, marginBottom: 16, letterSpacing: "0.08em" }}>{step.n}</div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.15rem", fontWeight: 700, color: "#f0e8d0", marginBottom: 12 }}>{step.title}</h3>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#606080", lineHeight: 1.75 }}>{step.desc}</p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function RiskTiers() {
  var _a = useState(2), selected = _a[0], setSelected = _a[1];
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
          {RISK_TIERS.map(function(tier, i) {
            return (
              <AnimatedSection key={i} delay={i * 0.06}>
                <div
                  onClick={function() { setSelected(i); }}
                  style={{
                    background: selected === i ? "rgba(196,160,80,0.06)" : "rgba(255,255,255,0.02)",
                    border: "1px solid " + (selected === i ? tier.color : "rgba(196,160,80,0.1)"),
                    borderRadius: 14, padding: "28px 24px", cursor: "pointer", position: "relative", overflow: "hidden",
                    boxShadow: selected === i ? ("0 0 30px " + tier.color + "22") : "none",
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
            );
          })}
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

... (rest of your components like Fees, Referral, Register, Footer remain fully stylized)
