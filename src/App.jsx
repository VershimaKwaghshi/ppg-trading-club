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

const COUNTRIES = [
  { code: "NG", name: "Nigeria", flag: "🇳🇬" },
  { code: "GH", name: "Ghana", flag: "🇬🇭" },
  { code: "ZA", name: "South Africa", flag: "🇿🇦" },
  { code: "KE", name: "Kenya", flag: "🇰🇪" },
  { code: "ET", name: "Ethiopia", flag: "🇪🇹" },
  { code: "EG", name: "Egypt", flag: "🇪🇬" },
  { code: "TZ", name: "Tanzania", flag: "🇹🇿" },
  { code: "UG", name: "Uganda", flag: "🇺🇬" },
  { code: "DZ", name: "Algeria", flag: "🇩🇿" },
  { code: "SD", name: "Sudan", flag: "🇸🇩" },
  { code: "MA", name: "Morocco", flag: "🇲🇦" },
  { code: "AO", name: "Angola", flag: "🇦🇴" },
  { code: "MZ", name: "Mozambique", flag: "🇲🇿" },
  { code: "CM", name: "Cameroon", flag: "🇨🇲" },
  { code: "CI", name: "Ivory Coast", flag: "🇨🇮" },
  { code: "NE", name: "Niger", flag: "🇳🇪" },
  { code: "BF", name: "Burkina Faso", flag: "🇧🇫" },
  { code: "ML", name: "Mali", flag: "🇲🇱" },
  { code: "MW", name: "Malawi", flag: "🇲🇼" },
  { code: "ZM", name: "Zambia", flag: "🇿🇲" },
  { code: "SN", name: "Senegal", flag: "🇸🇳" },
  { code: "SO", name: "Somalia", flag: "🇸🇴" },
  { code: "TD", name: "Chad", flag: "🇹🇩" },
  { code: "ZW", name: "Zimbabwe", flag: "🇿🇼" },
  { code: "RW", name: "Rwanda", flag: "🇷🇼" },
  { code: "BJ", name: "Benin", flag: "🇧🇯" },
  { code: "TN", name: "Tunisia", flag: "🇹🇳" },
  { code: "LY", name: "Libya", flag: "🇱🇾" },
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
  { code: "CA", name: "Canada", flag: "🇨🇦" },
  { code: "AU", name: "Australia", flag: "🇦🇺" },
  { code: "DE", name: "Germany", flag: "🇩🇪" },
  { code: "FR", name: "France", flag: "🇫🇷" },
  { code: "IT", name: "Italy", flag: "🇮🇹" },
  { code: "ES", name: "Spain", flag: "🇪🇸" },
  { code: "NL", name: "Netherlands", flag: "🇳🇱" },
  { code: "BR", name: "Brazil", flag: "🇧🇷" },
  { code: "IN", name: "India", flag: "🇮🇳" },
  { code: "CN", name: "China", flag: "🇨🇳" },
  { code: "JP", name: "Japan", flag: "🇯🇵" },
  { code: "KR", name: "South Korea", flag: "🇰🇷" },
  { code: "AE", name: "UAE", flag: "🇦🇪" },
  { code: "SA", name: "Saudi Arabia", flag: "🇸🇦" },
  { code: "QA", name: "Qatar", flag: "🇶🇦" },
  { code: "TR", name: "Turkey", flag: "🇹🇷" },
  { code: "PK", name: "Pakistan", flag: "🇵🇰" },
  { code: "BD", name: "Bangladesh", flag: "🇧🇩" },
  { code: "PH", name: "Philippines", flag: "🇵🇭" },
  { code: "ID", name: "Indonesia", flag: "🇮🇩" },
  { code: "MY", name: "Malaysia", flag: "🇲🇾" },
  { code: "SG", name: "Singapore", flag: "🇸🇬" },
  { code: "MX", name: "Mexico", flag: "🇲🇽" },
  { code: "AR", name: "Argentina", flag: "🇦🇷" },
  { code: "CO", name: "Colombia", flag: "🇨🇴" },
  { code: "ZZ", name: "Other", flag: "🌍" },
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
    return () => { observer.disconnect(); };
  }, [ref, t]);
  return inView;
}

function AnimatedSection(props) {
  const { children, className = "", delay = 0 } = props;
  const ref = useRef(null);
  const inView = useInView(ref);
  return (
    <div ref={ref} className={className} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)", transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s` }}>
      {children}
    </div>
  );
}

function PpgLogo() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 220" style={{ width: "100%", height: "100%", maxHeight: "64px" }}>
      <defs>
        <linearGradient id="goldBase" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8a6520" stopOpacity="1" />
          <stop offset="35%" stopColor="#c4a050" stopOpacity="1" />
          <stop offset="50%" stopColor="#f5e098" stopOpacity="1" />
          <stop offset="65%" stopColor="#c4a050" stopOpacity="1" />
          <stop offset="100%" stopColor="#8a6520" stopOpacity="1" />
        </linearGradient>
        <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f5e098" stopOpacity="0"><animate attributeName="offset" values="-1;2" dur="2.8s" repeatCount="indefinite" /></stop>
          <stop offset="10%" stopColor="#ffffff" stopOpacity="0.55"><animate attributeName="offset" values="-0.8;2.2" dur="2.8s" repeatCount="indefinite" /></stop>
          <stop offset="20%" stopColor="#f5e098" stopOpacity="0"><animate attributeName="offset" values="-0.6;2.4" dur="2.8s" repeatCount="indefinite" /></stop>
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
          <text x="350" y="84" fontFamily="Georgia, 'Times New Roman', serif" fontSize="58" fontWeight="900" fontStyle="italic" textAnchor="middle" letterSpacing="6" fill="white">Trading Club</text>
        </mask>
        <mask id="subMask">
          <text x="350" y="130" fontFamily="Arial, Helvetica, sans-serif" fontSize="13" fontWeight="700" textAnchor="middle" letterSpacing="10" fill="white">PENNY PARTNERS GROUP</text>
        </mask>
      </defs>
      <rect x="0" y="0" width="700" height="100" fill="url(#goldBase)" mask="url(#textMask)" filter="url(#glow)" />
      <rect x="0" y="0" width="700" height="100" fill="url(#shimmer)" mask="url(#textMask)" />
      <line x1="38" y1="122" x2="178" y2="122" stroke="url(#goldLine)" strokeWidth="1" opacity="0.75"/>
      <line x1="522" y1="122" x2="662" y2="122" stroke="url(#goldLine)" strokeWidth="1" opacity="0.75"/>
      <rect x="0" y="110" width="700" height="30" fill="url(#goldBase)" mask="url(#subMask)" filter="url(#subtleglow)" />
      <rect x="0" y="110" width="700" height="30" fill="url(#shimmer)" mask="url(#subMask)" />
      <line x1="38" y1="158" x2="662" y2="158" stroke="#c4a050" strokeWidth="0.5" opacity="0.2"/>
      <text x="350" y="185" fontFamily="Arial, Helvetica, sans-serif" fontSize="11" fontWeight="500" fill="#c4a050" textAnchor="middle" letterSpacing="8" opacity="0.4">EST. NIGERIA</text>
    </svg>
  );
}

function CountrySelect(props) {
  const { value, onChange } = props;
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const filtered = COUNTRIES.filter(c => c.name.toLowerCase().indexOf(search.toLowerCase()) > -1);
  const selected = COUNTRIES.find(c => c.name === value) || COUNTRIES[0];

  useEffect(() => {
    function handleClick(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }
    document.addEventListener("mousedown", handleClick);
    return () => { document.removeEventListener("mousedown", handleClick); };
  }, []);

  const inputBase = { background: "rgba(5,8,20,0.6)", border: "1px solid rgba(196,160,80,0.15)", color: "#f0e8d0", fontFamily: "'DM Sans', sans-serif", fontSize: 14 };

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <div onClick={() => { setOpen(!open); setSearch(""); }} style={{ ...inputBase, borderRadius: 6, padding: "10px", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, userSelect: "none" }}>
        <span style={{ fontSize: 18 }}>{selected.flag}</span>
        <span style={{ flex: 1 }}>{selected.name}</span>
        <span style={{ color: "#c4a050", fontSize: 10 }}>{open ? "▲" : "▼"}</span>
      </div>
      {open && (
        <div style={{ position: "absolute", top: "100%", left: 0, right: 0, zIndex: 500, background: "#08101e", border: "1px solid rgba(196,160,80,0.2)", borderRadius: 8, marginTop: 4, boxShadow: "0 8px 32px rgba(0,0,0,0.5)", overflow: "hidden" }}>
          <div style={{ padding: "8px" }}>
            <input autoFocus value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search country..." style={{ ...inputBase, borderRadius: 6, padding: "8px 10px", width: "100%", outline: "none" }} />
          </div>
          <div style={{ maxHeight: 220, overflowY: "auto" }}>
            {filtered.map(c => (
              <div key={c.code} onClick={() => { onChange(c.name); setOpen(false); }} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", cursor: "pointer", background: value === c.name ? "rgba(196,160,80,0.1)" : "transparent" }}>
                <span style={{ fontSize: 18 }}>{c.flag}</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#f0e8d0" }}>{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ... (Remainder of components similarly corrected with standard quotes)

export default function App() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  return (
    <div style={{ minHeight: "100vh", background: "#050814", color: "#f0e8d0", overflowX: "hidden" }}>
      {/* ... structure ... */}
      <RegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
    </div>
  );
}
