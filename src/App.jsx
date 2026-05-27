import { useState, useEffect, useRef } from "react";
const NAV_LINKS = [
{ label: "About", href: "#about" },
{ label: "How It Works", href: "#how" },
{ label: "Risk Tiers", href: "#risk" },
{ label: "Fees", href: "#fees" },
{ label: "Referral", href: "#referral" },
];
const RISK_TIERS = [
{ pct: "0.1%", label: "Micro", risk: "Minimal Risk", desc: "Ultra-conservative. Ideal for a
{ pct: "0.5%", label: "Cautious", risk: "Very Low Risk", desc: "Gentle growth. Best for tho
{ pct: "1%", label: "Conservative", risk: "Low Risk", desc: "Our most popular tier. Realist
{ pct: "5%", label: "Moderate", risk: "Medium Risk", desc: "Balanced approach. Moderate pos
{ pct: "10%", label: "Balanced", risk: "Med-High Risk", desc: "Higher targets require large
{ pct: "15%", label: "Aggressive", risk: "High Risk", desc: "Significant drawdowns possible
{ pct: "20%", label: "Maximum", risk: "Very High Risk", desc: "Maximum aggression. Entire c
];
const HOW_STEPS = [
{ n: "01", title: "Register & Get Referred", desc: "Complete your registration with a valid
{ n: "02", title: "Pay Monthly Subscription", desc: "$4.99/month keeps your account active.
{ n: "03", title: "KYC Verification", desc: "Upload a government-issued ID. We verify your
{ n: "04", title: "Make Your Referral", desc: "Your account is verified, but trading begins
{ n: "05", title: "Open Your Trading Account", desc: "Receive a link to register your own p
{ n: "06", title: "Choose Risk Tier & Trade", desc: "Select your risk tier. Your assigned m
];
const COUNTRIES = [
{ code: "NG", name: "Nigeria", flag: " " },
{ code: "GH", name: "Ghana", flag: " " },
{ code: "ZA", name: "South Africa", flag: " { code: "KE", name: "Kenya", flag: " " },
{ code: "ET", name: "Ethiopia", flag: " " },
{ code: "EG", name: "Egypt", flag: " " },
{ code: "TZ", name: "Tanzania", flag: " " },
{ code: "UG", name: "Uganda", flag: " " },
{ code: "DZ", name: "Algeria", flag: " " },
{ code: "SD", name: "Sudan", flag: " " },
{ code: "MA", name: "Morocco", flag: " " },
{ code: "AO", name: "Angola", flag: " " },
{ code: "MZ", name: "Mozambique", flag: " " },
{ code: "CM", name: "Cameroon", flag: " " },
" },
{ code: "CI", name: "Ivory Coast", flag: " " },
{ code: "NE", name: "Niger", flag: " " },
{ code: "BF", name: "Burkina Faso", flag: " " },
{ code: "ML", name: "Mali", flag: " " },
{ code: "MW", name: "Malawi", flag: " " },
{ code: "ZM", name: "Zambia", flag: " " },
{ code: "SN", name: "Senegal", flag: " " },
{ code: "SO", name: "Somalia", flag: " " },
{ code: "TD", name: "Chad", flag: " " },
{ code: "ZW", name: "Zimbabwe", flag: " " },
{ code: "RW", name: "Rwanda", flag: " " },
{ code: "BJ", name: "Benin", flag: " " },
{ code: "TN", name: "Tunisia", flag: " " },
{ code: "LY", name: "Libya", flag: " " },
{ code: "US", name: "United States", flag: " " },
{ code: "GB", name: "United Kingdom", flag: " " },
{ code: "CA", name: "Canada", flag: " " },
{ code: "AU", name: "Australia", flag: " " },
{ code: "DE", name: "Germany", flag: " " },
{ code: "FR", name: "France", flag: " " },
{ code: "IT", name: "Italy", flag: " " },
{ code: "ES", name: "Spain", flag: " " },
{ code: "NL", name: "Netherlands", flag: " " },
{ code: "BR", name: "Brazil", flag: " " },
{ code: "IN", name: "India", flag: " " },
{ code: "CN", name: "China", flag: " " },
{ code: "JP", name: "Japan", flag: " " },
{ code: "KR", name: "South Korea", flag: " " },
{ code: "AE", name: "UAE", flag: " " },
{ code: "SA", name: "Saudi Arabia", flag: " " },
{ code: "QA", name: "Qatar", flag: " " },
{ code: "TR", name: "Turkey", flag: " " },
{ code: "PK", name: "Pakistan", flag: " " },
{ code: "BD", name: "Bangladesh", flag: " " },
{ code: "PH", name: "Philippines", flag: " " },
{ code: "ID", name: "Indonesia", flag: " " },
{ code: "MY", name: "Malaysia", flag: " " },
{ code: "SG", name: "Singapore", flag: " " },
{ code: "MX", name: "Mexico", flag: " " },
{ code: "AR", name: "Argentina", flag: " " },
{ code: "CO", name: "Colombia", flag: " " },
{ code: "ZZ", name: "Other", flag: " " },
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
<div ref={ref} className={className} style={{ opacity: inView ? 1 : 0, transform: inView
{children}
</div>
);
}
function PpgLogo() {
return (
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 220" style={{ width: "100%", hei
<defs>
<linearGradient id="goldBase" x1="0%" y1="0%" x2="100%" y2="0%">
<stop offset="0%" stopColor="#8a6520" stopOpacity="1" />
<stop offset="35%" stopColor="#c4a050" stopOpacity="1" />
<stop offset="50%" stopColor="#f5e098" stopOpacity="1" />
<stop offset="65%" stopColor="#c4a050" stopOpacity="1" />
<stop offset="100%" stopColor="#8a6520" stopOpacity="1" />
</linearGradient>
<linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
<stop offset="0%" stopColor="#f5e098" stopOpacity="0">
<animate attributeName="offset" values="-1;2" dur="2.8s" repeatCount="indefinite"
</stop>
<stop offset="10%" stopColor="#ffffff" stopOpacity="0.55">
<animate attributeName="offset" values="-0.8;2.2" dur="2.8s" repeatCount="indefin
</stop>
<stop offset="20%" stopColor="#f5e098" stopOpacity="0">
<animate attributeName="offset" values="-0.6;2.4" dur="2.8s" repeatCount="indefin
</stop>
</linearGradient>
<linearGradient id="goldLine" x1="0%" y1="0%" x2="100%" y2="0%">
<stop offset="0%" stopColor="#8a6520" stopOpacity="1" />
<stop offset="50%" stopColor="#e8d080" stopOpacity="1" />
<stop offset="100%" stopColor="#8a6520" stopOpacity="1" />
</linearGradient>
<filter id="glow">
<feGaussianBlur stdDeviation="3" result="coloredBlur"/>
<feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
</filter>
<filter id="subtleglow">
<feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
<feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
</filter>
<mask id="textMask">
<text x="350" y="84" fontFamily="Georgia, 'Times New Roman', serif" fontSize="58" f
</mask>
<mask id="subMask">
<text x="350" y="130" fontFamily="Arial, Helvetica, sans-serif" fontSize="13" fontW
</mask>
</defs>
<rect x="0" y="0" width="700" height="100" fill="url(#goldBase)" mask="url(#textMask)"
<rect x="0" y="0" width="700" height="100" fill="url(#shimmer)" mask="url(#textMask)" /
<line x1="38" y1="122" x2="178" y2="122" stroke="url(#goldLine)" strokeWidth="1" opacit
<line x1="522" y1="122" x2="662" y2="122" stroke="url(#goldLine)" strokeWidth="1" opaci
<rect x="0" y="110" width="700" height="30" fill="url(#goldBase)" mask="url(#subMask)"
<rect x="0" y="110" width="700" height="30" fill="url(#shimmer)" mask="url(#subMask)" /
<line x1="38" y1="158" x2="662" y2="158" stroke="#c4a050" strokeWidth="0.5" opacity="0.
<text x="350" y="185" fontFamily="Arial, Helvetica, sans-serif" fontSize="11" fontWeigh
</svg>
);
}
function CountrySelect(props) {
var value = props.value;
var onChange = props.onChange;
var _a = useState(""), search = _a[0], setSearch = _a[1];
var _b = useState(false), open = _b[0], setOpen = _b[1];
var ref = useRef(null);
var filtered = COUNTRIES.filter(function(c) {
return c.name.toLowerCase().indexOf(search.toLowerCase()) > -1;
});
var selected = COUNTRIES.find(function(c) { return c.name === value; }) || COUNTRIES[0];
useEffect(function() {
function handleClick(e) {
if (ref.current && !ref.current.contains(e.target)) setOpen(false);
}
document.addEventListener("mousedown", handleClick);
return function() { document.removeEventListener("mousedown", handleClick); };
}, []);
var inputBase = { background: "rgba(5,8,20,0.6)", border: "1px solid rgba(196,160,80,0.15)"
return (
<div ref={ref} style={{ position: "relative" }}>
<div
onClick={function() { setOpen(!open); setSearch(""); }}
style={{ ...inputBase, borderRadius: 6, padding: "10px", cursor: "pointer", display:
<span style={{ fontSize: 18 }}>{selected.flag}</span>
<span style={{ flex: 1 }}>{selected.name}</span>
<span style={{ color: "#c4a050", fontSize: 10 }}>{open ? "▲" : "▼"}</span>
</div>
{open && (
<div style={{ position: "absolute", top: "100%", left: 0, right: 0, zIndex: 500, back
<div style={{ padding: "8px" }}>
<input
autoFocus
value={search}
onChange={function(e) { setSearch(e.target.value); }}
placeholder="Search country..."
style={{ ...inputBase, borderRadius: 6, padding: "8px 10px", width: "100%", out
/>
</div>
<div style={{ maxHeight: 220, overflowY: "auto" }}>
{filtered.map(function(c) {
return (
<div
key={c.code}
onClick={function() { onChange(c.name); setOpen(false); }}
style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px
onMouseEnter={function(e) { e.currentTarget.style.background = "rgba(196,16
onMouseLeave={function(e) { e.currentTarget.style.background = value === c.
<span style={{ fontSize: 18 }}>{c.flag}</span>
<span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#
</div>
);
})}
{filtered.length === 0 && (
<div style={{ padding: "12px", fontFamily: "'DM Sans', sans-serif", fontSize: 1
)}
</div>
</div>
)}
</div>
);
}
function Navbar(props) {
var onOpenRegister = props.onOpenRegister;
var _a = useState(false), scrolled = _a[0], setScrolled = _a[1];
var _b = useState(false), menuOpen = _b[0], setMenuOpen = _b[1];
useEffect(function() {
var fn = function() { setScrolled(window.scrollY > 20); };
window.addEventListener("scroll", fn);
return function() { window.removeEventListener("scroll", fn); };
}, []);
return (
<nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: scro
<div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center",
<div style={{ display: "flex", alignItems: "center", width: "280px", height: "64px" }
<PpgLogo />
</div>
<div className={menuOpen ? "nav-links open" : "nav-links"}>
{NAV_LINKS.map(function(l) {
return <a key={l.label} href={l.href} onClick={function() { setMenuOpen(false); }
})}
<button onClick={function() { setMenuOpen(false); onOpenRegister(); }} style={{ bac
</div>
<button onClick={function() { setMenuOpen(!menuOpen); }} className="menu-toggle" styl
{menuOpen ? "✕" : "☰"}
</button>
</div>
<style>{"\n @import url('https://fonts.googleapis.com/css2?family=Playfair+Displ
</nav>
);
}
function Hero(props) {
var onOpenRegister = props.onOpenRegister;
return (
<section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyConte
<div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(19
<div style={{ position: "absolute", top: "20%", left: "5%", width: 400, height: 400, ba
<div style={{ position: "absolute", bottom: "10%", right: "5%", width: 500, height: 500
<div style={{ textAlign: "center", maxWidth: 900, position: "relative", zIndex: 2 }}>
<div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba
<div style={{ width: 6, height: 6, background: "#4ade80", borderRadius: "50%", anim
<span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#c4a050",
6vw, 4
</div>
<h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.2rem, Trade with Purpose.<br />
<span style={{ background: "linear-gradient(135deg,#c4a050,#f0d080)", WebkitBackgro
</h1>
<p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(0.95rem, 2vw, 1.1re
PPG Trading Club is an exclusive, members-only forex trading community. Your capita
</p>
<div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}
<button onClick={onOpenRegister} style={{ background: "linear-gradient(135deg,#c4a0
Join the Club - $4.99/Mo
</button>
<a href="#how" style={{ border: "1px solid rgba(196,160,80,0.3)", color: "#c4a050",
See How It Works
</a>
</div>
<div className="stats-grid" style={{ display: "flex", justifyContent: "center", margi
{[["$100", "Min Deposit"], ["7", "Risk Tiers"], ["24H", "Withdrawals"], ["15%", "Re
return (
<div key={i} className="stats-item" style={{ padding: "0 24px", textAlign: "cen
<div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.75rem", f
<div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#606
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
<section id="about" style={{ padding: "80px 1rem", background: "#070a1a" }}>
<div style={{ maxWidth: 1200, margin: "0 auto" }}>
<AnimatedSection>
<div className="about-split" style={{ display: "flex", gap: 48 }}>
<div style={{ flex: 1 }}>
<div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#c4a05
<h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem,
Penny Partners Group Built on Trust
</h2>
<p style={{ fontFamily: "'DM Sans', sans-serif", color: "#7878a0", lineHeight:
We are Penny Partners Group (PPG Solutions), a CAC-registered Nigerian financ
</p>
<p style={{ fontFamily: "'DM Sans', sans-serif", color: "#7878a0", lineHeight:
PPG Trading Club is our flagship initiative. Our vetted managers trade on you
</p>
<div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
<div style={{ background: "rgba(196,160,80,0.05)", border: "1px solid rgba(19
<div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#c4
<div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#7
</div>
<div style={{ background: "rgba(196,160,80,0.05)", border: "1px solid rgba(19
<div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#c4
<div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#7
</div>
</div>
</div>
<div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(auto-fit, mi
{[
{ icon: " ", title: "Your Account, Your Money", desc: "You open and own your
{ icon: " ", title: "Watch Every Trade Live", desc: "Every member gets a vie
{ icon: " ", title: "Expert Management", desc: "Our vetted managers use disc
{ icon: " ", title: "Formally Registered", desc: "PPG is registered with Nig
].map(function(c, i) {
return (
<div key={i} style={{ background: "rgba(255,255,255,0.01)", border: "1px so
<div style={{ fontSize: 24, marginBottom: 8 }}>{c.icon}</div>
<div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontS
<div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "
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
<section id="how" style={{ padding: "80px 1rem", background: "#050814" }}>
<div style={{ maxWidth: 1100, margin: "0 auto" }}>
<AnimatedSection>
<div style={{ textAlign: "center", marginBottom: 48 }}>
<div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#c4a050"
<h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4v
<p style={{ fontFamily: "'DM Sans', sans-serif", color: "#7878a0", marginTop: 12,
</div>
</AnimatedSection>
<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1
{HOW_STEPS.map(function(step, i) {
return (
<AnimatedSection key={i} delay={i * 0.04}>
<div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(1
<div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "rgb
<h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", f
<p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#606
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
<section id="risk" style={{ padding: "80px 1rem", background: "#070a1a" }}>
<div style={{ maxWidth: 1100, margin: "0 auto" }}>
<AnimatedSection>
<div style={{ textAlign: "center", marginBottom: 48 }}>
<div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#c4a050"
<h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4v
<p style={{ fontFamily: "'DM Sans', sans-serif", color: "#7878a0", marginTop: 12,
You choose your risk tolerance. Your assigned manager follows it exactly. Highe
</p>
</div>
</AnimatedSection>
<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px,
{RISK_TIERS.map(function(tier, i) {
return (
<AnimatedSection key={i} delay={i * 0.03}>
<div
onClick={function() { setSelected(i); }}
style={{ background: selected === i ? "rgba(196,160,80,0.04)" : "rgba(255,2
{tier.badge && (
<div style={{ position: "absolute", top: 12, right: 12, background: tier.
)}
<div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.85rem",
<div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, color:
<div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: tie
<p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#606
<div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#c4
</div>
</AnimatedSection>
);
})}
</div>
<AnimatedSection>
<div style={{ background: "rgba(255,200,50,0.02)", border: "1px solid rgba(255,200,
<div style={{ fontSize: 18, flexShrink: 0 }}> </div>
<p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#9090b0",
Risk Warning: All percentage figures are potential daily targets. They are not
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
<div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#c4a05
<h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem,
Transparent Fees. No Hidden Costs.
</h2>
<p style={{ fontFamily: "'DM Sans', sans-serif", color: "#7878a0", lineHeight:
We believe in complete transparency. Our fees are simple, clear, and structur
</p>
<div style={{ borderLeft: "2px solid #c4a050", paddingLeft: 16 }}>
<div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, color: "#
<p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#60608
Our profit share is strictly performance-based. We use standard industry ca
</p>
</div>
</div>
<div style={{ flex: 1, background: "rgba(255,255,255,0.01)", border: "1px solid r
<div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 70
<div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 20
<span style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.75rem",
<span style={{ fontFamily: "'DM Sans', sans-serif", color: "#606080", fontSiz
</div>
<div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
{[
"Access to vetted platform managers",
"Real-time view-only MT5 tracking",
"Flexible risk tier switching",
"24/7 direct capital withdrawal control",
"15% direct referral commission tier",
].map(function(f, i) {
return (
<div key={i} style={{ display: "flex", gap: 10, alignItems: "center" }}>
<span style={{ color: "#c4a050", fontSize: 12 }}>✓</span>
<span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color
</div>
);
})}
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
<div className="referral-box" style={{ background: "linear-gradient(135deg, rgba(19
<div style={{ flex: 1.2 }}>
<div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#c4a05
<h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem,
Our 15% Mutual Referral System
</h2>
<p style={{ fontFamily: "'DM Sans', sans-serif", color: "#7878a0", lineHeight:
To maintain high community standards and security, PPG Trading Club operates
</p>
<p style={{ fontFamily: "'DM Sans', sans-serif", color: "#7878a0", lineHeight:
When someone registers using your link, you instantly earn a 15% direct refer
</p>
</div>
<div style={{ flex: 0.8, display: "flex", flexDirection: "column", gap: 12, width
<div style={{ background: "rgba(5,8,20,0.3)", border: "1px solid rgba(196,160,8
<div style={{ fontFamily: "'DM Mono', monospace", fontSize: 18, fontWeight: 7
<div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight:
<div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#606
</div>
<div style={{ background: "rgba(5,8,20,0.3)", border: "1px solid rgba(196,160,8
<div style={{ fontFamily: "'DM Mono', monospace", fontSize: 18, fontWeight: 7
<div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight:
<div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#606
</div>
</div>
</div>
</AnimatedSection>
</div>
</section>
);
}
function RegisterModal(props) {
var isOpen = props.isOpen;
var onClose = props.onClose;
var _a = useState({ fullName: "", email: "", phone: "", country: "Nigeria", referralId: "",
var formData = _a[0], setFormData = _a[1];
var _b = useState(false), loading = _b[0], setLoading = _b[1];
var _c = useState({ type: "", msg: "" }), status = _c[0], setStatus = _c[1];
useEffect(function() {
if (isOpen) {
document.body.style.overflow = "hidden";
var handleEsc = function(e) { if (e.key === "Escape") onClose(); };
window.addEventListener("keydown", handleEsc);
return function() {
document.body.style.overflow = "unset";
window.removeEventListener("keydown", handleEsc);
}
};
}, [isOpen, onClose]);
if (!isOpen) return null;
var handleChange = function(e) {
var n = Object.assign({}, formData);
n[e.target.name] = e.target.value;
setFormData(n);
var handleCountry = function(val) {
setFormData(Object.assign({}, formData, { country: val }));
};
};
var handleSubmit = function(e) {
e.preventDefault();
setLoading(true);
setStatus({ type: "", msg: "" });
setTimeout(function() {
setLoading(false);
setStatus({ type: "success", msg: "Application received! Our team will contact you via
}, 1200);
};
rgba(1
var fieldStyle = { width: "100%", background: "rgba(5,8,20,0.6)", border: "1px solid var labelStyle = { display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: 11, fon
return (
<div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "cen
<div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(3,5,1
<div style={{ position: "relative", zIndex: 210, width: "100%", maxWidth: "580px", back
<button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, backgrou
<div style={{ textAlign: "center", marginBottom: 24 }}>
<h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.75rem", fontWeig
<p style={{ fontFamily: "'DM Sans', sans-serif", color: "#606080", fontSize: 13 }}>
</div>
{status.msg && (
<div style={{ background: status.type === "success" ? "rgba(74,222,128,0.05)" : "rg
{status.msg}
</div>
)}
<form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap:
<div>
<label style={labelStyle}>Full Name *</label>
<input type="text" name="fullName" value={formData.fullName} onChange={handleChan
</div>
<div className="form-row">
<div style={{ flex: 1 }}>
<label style={labelStyle}>Email Address *</label>
<input type="email" name="email" value={formData.email} onChange={handleChange}
</div>
<div style={{ flex: 1 }}>
<label style={labelStyle}>Phone / WhatsApp *</label>
<input type="tel" name="phone" value={formData.phone} onChange={handleChange} p
</div>
</div>
<div className="form-row">
<div style={{ flex: 1 }}>
<label style={labelStyle}>Country</label>
<CountrySelect value={formData.country} onChange={handleCountry} />
</div>
<div style={{ flex: 1 }}>
<label style={labelStyle}>Referral ID *</label>
<input type="text" name="referralId" value={formData.referralId} onChange={hand
</div>
</div>
<div className="form-row">
<div style={{ flex: 1 }}>
<label style={labelStyle}>Preferred Risk Tier</label>
<select name="riskTier" value={formData.riskTier} onChange={handleChange} style
{RISK_TIERS.map(function(t) { return <option key={t.pct} value={t.pct}>{t.pct
</select>
</div>
<div style={{ flex: 1 }}>
<label style={labelStyle}>Broker Preference</label>
<select name="broker" value={formData.broker} onChange={handleChange} style={{
<option value="No Preference">No Preference</option>
<option value="Exness">Exness (Recommended)</option>
<option value="HFM">HFM (HotForex)</option>
<option value="FXTM">FXTM</option>
</select>
</div>
</div>
<button type="submit" disabled={loading} style={{ marginTop: 8, background: "linear
{loading ? "Processing Application..." : "Submit Application"}
</button>
<p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#404060", te
Full member portal with live dashboard, KYC upload, and account management is com
</p>
</form>
</div>
</div>
);
}
function CacBanner() {
return (
<div style={{ background: "linear-gradient(90deg, #03050d 0%, #0a0f20 40%, #03050d 100%)"
<div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(90deg,
<div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", j
<div style={{ display: "flex", alignItems: "center", gap: 10 }}>
<div style={{ width: 36, height: 36, background: "linear-gradient(135deg,#c4a050,#f
<div style={{ textAlign: "left" }}>
<div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: "#c4a050"
<div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#f0e8d0"
</div>
</div>
<div style={{ width: 1, height: 32, background: "rgba(196,160,80,0.2)" }} />
<div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#7878a0", le
PPG Solutions Global Trading Co. · CAC Registration No. on file · Est. Nigeria
</div>
<div style={{ width: 1, height: 32, background: "rgba(196,160,80,0.2)" }} />
<div style={{ display: "flex", alignItems: "center", gap: 6 }}>
<div style={{ width: 6, height: 6, background: "#4ade80", borderRadius: "50%", anim
<span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#4ade80",
</div>
</div>
</div>
);
}
function Footer() {
return (
<footer style={{ background: "#03050d", borderTop: "1px solid rgba(196,160,80,0.05)" }}>
<CacBanner />
<div style={{ padding: "40px 1rem 28px", maxWidth: 1200, margin: "0 auto" }}>
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-sta
<div style={{ maxWidth: 340 }}>
<div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize:
<p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#404060",
Nigeria's trusted forex trading cooperative. Building wealth through community
</p>
<div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
{[" contact.ppgsolutions@gmail.com", " +234 813 050 0659", " 10 Arab Roa
return <div key={i} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 1
})}
</div>
</div>
{[
<div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
{ title: "Club", links: ["About PPG", "How It Works", "Risk Tiers", "Fees"] },
{ title: "Join", links: ["Register", "Referral Program", "KYC Verification"] },
{ title: "Legal", links: ["Risk Disclaimer", "Terms of Service", "Privacy Polic
].map(function(col, i) {
return (
<div key={i}>
<div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: "#c
<div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
{col.links.map(function(l) {
return <a key={l} href="#" style={{ fontFamily: "'DM Sans', sans-serif"
})}
</div>
</div>
);
})}
</div>
</div>
<div style={{ borderTop: "1px solid rgba(196,160,80,0.06)", paddingTop: 20, display:
<div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#303050" }
© {new Date().getFullYear()} PPG Solutions Global Trading Co. All rights reserved
</div>
<div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#303050",
Forex trading involves substantial risk. You may lose all invested capital. PPG T
</div>
</div>
</div>
</footer>
);
}
export default function App() {
var _a = useState(false), isRegisterOpen = _a[0], setIsRegisterOpen = _a[1];
return (
<div style={{ minHeight: "100vh", background: "#050814", color: "#f0e8d0", overflowX: "hi
<Navbar onOpenRegister={function() { setIsRegisterOpen(true); }} />
<Hero onOpenRegister={function() { setIsRegisterOpen(true); }} />
<About />
<HowItWorks />
<RiskTiers />
<Fees />
<Referral />
<Footer />
<RegisterModal isOpen={isRegisterOpen} onClose={function() { setIsRegisterOpen(false);
<a href="https://wa.me/2348130500659" target="_blank" rel="noreferrer" style={{ positio
</div>
);
}
