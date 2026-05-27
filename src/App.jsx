import { useState, useEffect, useMemo } from "react";

// --- Data ---
const COUNTRIES = [
  { name: "Nigeria", flag: "🇳🇬", code: "NG" },
  { name: "Ghana", flag: "🇬🇭", code: "GH" },
  { name: "South Africa", flag: "🇿🇦", code: "ZA" },
  { name: "Kenya", flag: "🇰🇪", code: "KE" },
  { name: "United Kingdom", flag: "🇬🇧", code: "GB" },
  { name: "United States", flag: "🇺🇸", code: "US" },
];

// --- Components ---

function PpgLogo() {
  return (
    <div style={{ position: "relative", overflow: "hidden", display: "inline-block", padding: "10px", cursor: "pointer" }}>
      <div style={{ position: "relative", fontSize: "28px", fontWeight: 900, fontFamily: "Georgia, serif", color: "#c4a050", letterSpacing: "2px", textTransform: "uppercase" }}>
        PPG <span style={{ color: "#f0d080", fontSize: "18px", marginLeft: "5px" }}>TRADING CLUB</span>
      </div>
      <div style={{ 
        position: "absolute", top: 0, left: "-100%", width: "50%", height: "100%", 
        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)", 
        animation: "shine 3s infinite" 
      }} />
      <style>{`@keyframes shine { 100% { left: 100%; } }`}</style>
    </div>
  );
}

function RegistrationBanner() {
  return (
    <div style={{ 
      background: "linear-gradient(90deg, #070a1a, #1a1a2a, #070a1a)", 
      padding: "20px", textAlign: "center", borderTop: "1px solid #c4a050", borderBottom: "1px solid #c4a050",
      margin: "40px 0"
    }}>
      <p style={{ color: "#c4a050", fontFamily: "'DM Sans', sans-serif", fontSize: "14px", margin: 0 }}>
        ⚖️ PPG SOLUTIONS is a CAC-registered business entity (BN 8676147). Operating under the laws of the Federal Republic of Nigeria.
      </p>
    </div>
  );
}

function CountrySelect({ value, onChange }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filtered = useMemo(() => 
    COUNTRIES.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase())), 
  [searchTerm]);

  return (
    <div style={{ position: "relative" }}>
      <input 
        placeholder="Search country..." 
        value={isOpen ? searchTerm : value}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setIsOpen(true)}
        style={{ width: "100%", padding: "10px", background: "rgba(5,8,20,0.6)", border: "1px solid #333", color: "#fff", borderRadius: 6 }}
      />
      {isOpen && (
        <div style={{ position: "absolute", top: "110%", left: 0, right: 0, background: "#070a1a", border: "1px solid #c4a050", zIndex: 10, maxHeight: "200px", overflowY: "auto" }}>
          {filtered.map(c => (
            <div key={c.code} onClick={() => { onChange(c.name); setIsOpen(false); setSearchTerm(""); }} style={{ padding: "10px", cursor: "pointer", color: "#fff" }}>
              {c.flag} {c.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function RegisterModal({ isOpen, onClose }) {
  const [country, setCountry] = useState("Nigeria");
  if (!isOpen) return null;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", background: "rgba(0,0,0,0.8)" }}>
      <div style={{ background: "#050814", border: "1px solid #c4a050", borderRadius: 12, padding: "24px", width: "100%", maxWidth: "400px" }}>
        <button onClick={onClose} style={{ float: "right", background: "none", border: "none", color: "#c4a050", cursor: "pointer" }}>✕</button>
        <h3 style={{ color: "#f0d080" }}>Join PPG</h3>
        <label style={{ display: "block", fontSize: 11, color: "#b0a080", marginTop: 10 }}>Select Country</label>
        <CountrySelect value={country} onChange={setCountry} />
        <button style={{ width: "100%", marginTop: 20, padding: "12px", background: "#c4a050", border: "none", borderRadius: 6 }}>Register</button>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer style={{ background: "#03050d", padding: "40px", textAlign: "center" }}>
      <p style={{ fontSize: 12, color: "#606080" }}>HQ: 10 Arab Road, Calabar, Nigeria</p>
      <p style={{ fontSize: 12, color: "#606080" }}>© {new Date().getFullYear()} Penny Partners Group.</p>
    </footer>
  );
}

export default function App() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <div style={{ background: "#050814", color: "#fff", minHeight: "100vh" }}>
      <nav style={{ padding: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <PpgLogo />
        <button onClick={() => setIsRegisterOpen(true)} style={{ background: "#c4a050", padding: "10px 20px", border: "none", borderRadius: 5 }}>Join Now</button>
      </nav>

      <main style={{ padding: "50px 20px", textAlign: "center" }}>
        <h1>Welcome to PPG</h1>
        <RegistrationBanner />
      </main>

      <Footer />
      <RegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
    </div>
  );
}
