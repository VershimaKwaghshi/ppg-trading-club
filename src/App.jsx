import { useState, useEffect, useRef } from ‘react’;
import React from ‘react’;

class ErrorBoundary extends React.Component {
constructor(props) {
super(props);
this.state = { hasError: false, error: null };
}
static getDerivedStateFromError(error) {
return { hasError: true, error };
}
render() {
if (this.state.hasError) {
return (
<div style={{ minHeight: ‘100vh’, background: ‘#050814’, display: ‘flex’, alignItems: ‘center’, justifyContent: ‘center’, padding: ‘2rem’ }}>
<div style={{ textAlign: ‘center’, maxWidth: 500 }}>
<div style={{ fontFamily: ‘serif’, fontSize: ‘3rem’, color: ‘#c4a050’, marginBottom: ‘1rem’ }}>PPG</div>
<div style={{ fontFamily: ‘sans-serif’, fontSize: ‘1rem’, color: ‘#7878a0’, marginBottom: ‘2rem’ }}>Trading Club</div>
<div style={{ fontFamily: ‘sans-serif’, fontSize: ‘0.8rem’, color: ‘#404060’ }}>
{String(this.state.error)}
</div>
</div>
</div>
);
}
return this.props.children;
}
}

const NAV_LINKS = [
{ label: ‘About’, href: ‘#about’ },
{ label: ‘How It Works’, href: ‘#how’ },
{ label: ‘Risk Tiers’, href: ‘#risk’ },
{ label: ‘Fees’, href: ‘#fees’ },
{ label: ‘Referral’, href: ‘#referral’ },
];

const RISK_TIERS = [
{ pct: ‘0.1%’, label: ‘Micro’, risk: ‘Minimal Risk’, desc: ‘Ultra-conservative. Ideal for absolute beginners. Tiny, consistent gains with near-zero drawdown.’, daily: ‘$0.10’, color: ‘#4ade80’ },
{ pct: ‘0.5%’, label: ‘Cautious’, risk: ‘Very Low Risk’, desc: ‘Gentle growth. Best for those who prioritise capital protection above all else.’, daily: ‘$0.50’, color: ‘#86efac’ },
{ pct: ‘1%’, label: ‘Conservative’, risk: ‘Low Risk’, desc: ‘Our most popular tier. Realistic, sustainable daily targets. Best for long-term growth.’, daily: ‘$1.00’, color: ‘#fbbf24’, badge: ‘Recommended’ },
{ pct: ‘5%’, label: ‘Moderate’, risk: ‘Medium Risk’, desc: ‘Balanced approach. Moderate position sizing for members with measured risk appetite.’, daily: ‘$5.00’, color: ‘#f97316’ },
{ pct: ‘10%’, label: ‘Balanced’, risk: ‘Med-High Risk’, desc: ‘Higher targets require larger positions. Drawdowns are more frequent and deeper.’, daily: ‘$10.00’, color: ‘#fb923c’ },
{ pct: ‘15%’, label: ‘Aggressive’, risk: ‘High Risk’, desc: ‘Significant drawdowns possible. Only for members who fully accept volatility.’, daily: ‘$15.00’, color: ‘#f43f5e’ },
{ pct: ‘20%’, label: ‘Maximum’, risk: ‘Very High Risk’, desc: ‘Maximum aggression. Entire capital may be lost. For experienced traders only.’, daily: ‘$20.00’, color: ‘#dc2626’ },
];

const HOW_STEPS = [
{ n: ‘01’, title: ‘Register & Get Referred’, desc: ‘Complete your registration with a valid referral ID from an existing member. This keeps our community trusted and exclusive.’ },
{ n: ‘02’, title: ‘Pay Monthly Subscription’, desc: ‘$4.99/month keeps your account active. Pay via Opay, Zenith Bank, Bitcoin, Ethereum, or USDT TRC20. Upload your receipt for instant verification.’ },
{ n: ‘03’, title: ‘KYC Verification’, desc: ‘Upload a government-issued ID. We verify your identity within 24-48 hours. Your documents are handled with strict confidentiality.’ },
{ n: ‘04’, title: ‘Make Your Referral’, desc: ‘Your account is verified, but trading begins only after you refer at least one member. This is how our community stays healthy and grows together.’ },
{ n: ‘05’, title: ‘Open Your Trading Account’, desc: ‘Receive a link to register your own personal broker account. Minimum deposit: $100. Your money never comes to us - ever.’ },
{ n: ‘06’, title: ‘Choose Risk Tier & Trade’, desc: ‘Select your risk tier. Your assigned manager begins trading via MT5 or TradingView. You receive a view-only password to watch every trade live.’ },
];

const COUNTRIES = [
{ code: ‘NG’, name: ‘Nigeria’, flag: ‘🇳🇬’ },
{ code: ‘GH’, name: ‘Ghana’, flag: ‘🇬🇭’ },
{ code: ‘ZA’, name: ‘South Africa’, flag: ‘🇿🇦’ },
{ code: ‘KE’, name: ‘Kenya’, flag: ‘🇰🇪’ },
{ code: ‘ET’, name: ‘Ethiopia’, flag: ‘🇪🇹’ },
{ code: ‘EG’, name: ‘Egypt’, flag: ‘🇪🇬’ },
{ code: ‘TZ’, name: ‘Tanzania’, flag: ‘🇹🇿’ },
{ code: ‘UG’, name: ‘Uganda’, flag: ‘🇺🇬’ },
{ code: ‘DZ’, name: ‘Algeria’, flag: ‘🇩🇿’ },
{ code: ‘SD’, name: ‘Sudan’, flag: ‘🇸🇩’ },
{ code: ‘MA’, name: ‘Morocco’, flag: ‘🇲🇦’ },
{ code: ‘AO’, name: ‘Angola’, flag: ‘🇦🇴’ },
{ code: ‘MZ’, name: ‘Mozambique’, flag: ‘🇲🇿’ },
{ code: ‘CM’, name: ‘Cameroon’, flag: ‘🇨🇲’ },
{ code: ‘CI’, name: ‘Ivory Coast’, flag: ‘🇨🇮’ },
{ code: ‘NE’, name: ‘Niger’, flag: ‘🇳🇪’ },
{ code: ‘BF’, name: ‘Burkina Faso’, flag: ‘🇧🇫’ },
{ code: ‘ML’, name: ‘Mali’, flag: ‘🇲🇱’ },
{ code: ‘MW’, name: ‘Malawi’, flag: ‘🇲🇼’ },
{ code: ‘ZM’, name: ‘Zambia’, flag: ‘🇿🇲’ },
{ code: ‘SN’, name: ‘Senegal’, flag: ‘🇸🇳’ },
{ code: ‘SO’, name: ‘Somalia’, flag: ‘🇸🇴’ },
{ code: ‘TD’, name: ‘Chad’, flag: ‘🇹🇩’ },
{ code: ‘ZW’, name: ‘Zimbabwe’, flag: ‘🇿🇼’ },
{ code: ‘RW’, name: ‘Rwanda’, flag: ‘🇷🇼’ },
{ code: ‘BJ’, name: ‘Benin’, flag: ‘🇧🇯’ },
{ code: ‘TN’, name: ‘Tunisia’, flag: ‘🇹🇳’ },
{ code: ‘LY’, name: ‘Libya’, flag: ‘🇱🇾’ },
{ code: ‘US’, name: ‘United States’, flag: ‘🇺🇸’ },
{ code: ‘GB’, name: ‘United Kingdom’, flag: ‘🇬🇧’ },
{ code: ‘CA’, name: ‘Canada’, flag: ‘🇨🇦’ },
{ code: ‘AU’, name: ‘Australia’, flag: ‘🇦🇺’ },
{ code: ‘DE’, name: ‘Germany’, flag: ‘🇩🇪’ },
{ code: ‘FR’, name: ‘France’, flag: ‘🇫🇷’ },
{ code: ‘IT’, name: ‘Italy’, flag: ‘🇮🇹’ },
{ code: ‘ES’, name: ‘Spain’, flag: ‘🇪🇸’ },
{ code: ‘NL’, name: ‘Netherlands’, flag: ‘🇳🇱’ },
{ code: ‘BR’, name: ‘Brazil’, flag: ‘🇧🇷’ },
{ code: ‘IN’, name: ‘India’, flag: ‘🇮🇳’ },
{ code: ‘CN’, name: ‘China’, flag: ‘🇨🇳’ },
{ code: ‘JP’, name: ‘Japan’, flag: ‘🇯🇵’ },
{ code: ‘KR’, name: ‘South Korea’, flag: ‘🇰🇷’ },
{ code: ‘AE’, name: ‘UAE’, flag: ‘🇦🇪’ },
{ code: ‘SA’, name: ‘Saudi Arabia’, flag: ‘🇸🇦’ },
{ code: ‘QA’, name: ‘Qatar’, flag: ‘🇶🇦’ },
{ code: ‘TR’, name: ‘Turkey’, flag: ‘🇹🇷’ },
{ code: ‘PK’, name: ‘Pakistan’, flag: ‘🇵🇰’ },
{ code: ‘BD’, name: ‘Bangladesh’, flag: ‘🇧🇩’ },
{ code: ‘PH’, name: ‘Philippines’, flag: ‘🇵🇭’ },
{ code: ‘ID’, name: ‘Indonesia’, flag: ‘🇮🇩’ },
{ code: ‘MY’, name: ‘Malaysia’, flag: ‘🇲🇾’ },
{ code: ‘SG’, name: ‘Singapore’, flag: ‘🇸🇬’ },
{ code: ‘MX’, name: ‘Mexico’, flag: ‘🇲🇽’ },
{ code: ‘AR’, name: ‘Argentina’, flag: ‘🇦🇷’ },
{ code: ‘CO’, name: ‘Colombia’, flag: ‘🇨🇴’ },
{ code: ‘ZZ’, name: ‘Other’, flag: ‘🌍’ },
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
var className = props.className || ‘’;
var delay = props.delay || 0;
var ref = useRef(null);
var inView = useInView(ref);
return (
<div ref={ref} className={className} style={{ opacity: inView ? 1 : 0, transform: inView ? ‘translateY(0)’ : ‘translateY(30px)’, transition: ’opacity 0.6s ease ’ + delay + ’s, transform 0.6s ease ’ + delay + ‘s’ }}>
{children}
</div>
);
}

function PpgLogo() {
return (
<svg xmlns=‘http://www.w3.org/2000/svg’ viewBox=‘0 0 700 220’ style={{ width: ‘100%’, height: ‘100%’, maxHeight: ‘64px’ }}>
<defs>
<linearGradient id='goldBase' x1='0%' y1='0%' x2='100%' y2='0%'>
<stop offset='0%' stopColor='#8a6520' stopOpacity='1' />
<stop offset='35%' stopColor='#c4a050' stopOpacity='1' />
<stop offset='50%' stopColor='#f5e098' stopOpacity='1' />
<stop offset='65%' stopColor='#c4a050' stopOpacity='1' />
<stop offset='100%' stopColor='#8a6520' stopOpacity='1' />
</linearGradient>
<linearGradient id='shimmer' x1='0%' y1='0%' x2='100%' y2='0%'>
<stop offset='0%' stopColor='#f5e098' stopOpacity='0'>
<animate attributeName='offset' values='-1;2' dur='2.8s' repeatCount='indefinite' />
</stop>
<stop offset='10%' stopColor='#ffffff' stopOpacity='0.55'>
<animate attributeName='offset' values='-0.8;2.2' dur='2.8s' repeatCount='indefinite' />
</stop>
<stop offset='20%' stopColor='#f5e098' stopOpacity='0'>
<animate attributeName='offset' values='-0.6;2.4' dur='2.8s' repeatCount='indefinite' />
</stop>
</linearGradient>
<linearGradient id='goldLine' x1='0%' y1='0%' x2='100%' y2='0%'>
<stop offset='0%' stopColor='#8a6520' stopOpacity='1' />
<stop offset='50%' stopColor='#e8d080' stopOpacity='1' />
<stop offset='100%' stopColor='#8a6520' stopOpacity='1' />
</linearGradient>
<filter id='glow'>
<feGaussianBlur stdDeviation='3' result='coloredBlur'/>
<feMerge><feMergeNode in='coloredBlur'/><feMergeNode in='SourceGraphic'/></feMerge>
</filter>
<filter id='subtleglow'>
<feGaussianBlur stdDeviation='1.5' result='coloredBlur'/>
<feMerge><feMergeNode in='coloredBlur'/><feMergeNode in='SourceGraphic'/></feMerge>
</filter>
<mask id='textMask'>
<text x=‘350’ y=‘84’ fontFamily=‘Georgia, ‘Times New Roman’, serif’ fontSize=‘58’ fontWeight=‘900’ fontStyle=‘italic’ textAnchor=‘middle’ letterSpacing=‘6’ fill=‘white’>Trading Club</text>
</mask>
<mask id='subMask'>
<text x='350' y='130' fontFamily='Arial, Helvetica, sans-serif' fontSize='13' fontWeight='700' textAnchor='middle' letterSpacing='10' fill='white'>PENNY PARTNERS GROUP</text>
</mask>
</defs>
<rect x='0' y='0' width='700' height='100' fill='url(#goldBase)' mask='url(#textMask)' filter='url(#glow)' />
<rect x='0' y='0' width='700' height='100' fill='url(#shimmer)' mask='url(#textMask)' />
<line x1='38' y1='122' x2='178' y2='122' stroke='url(#goldLine)' strokeWidth='1' opacity='0.75'/>
<line x1='522' y1='122' x2='662' y2='122' stroke='url(#goldLine)' strokeWidth='1' opacity='0.75'/>
<rect x='0' y='110' width='700' height='30' fill='url(#goldBase)' mask='url(#subMask)' filter='url(#subtleglow)' />
<rect x='0' y='110' width='700' height='30' fill='url(#shimmer)' mask='url(#subMask)' />
<line x1='38' y1='158' x2='662' y2='158' stroke='#c4a050' strokeWidth='0.5' opacity='0.2'/>
<text x='350' y='185' fontFamily='Arial, Helvetica, sans-serif' fontSize='11' fontWeight='500' fill='#c4a050' textAnchor='middle' letterSpacing='8' opacity='0.4'>EST. NIGERIA</text>
</svg>
);
}

function CountrySelect(props) {
var value = props.value;
var onChange = props.onChange;
var _a = useState(’’), search = _a[0], setSearch = _a[1];
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
document.addEventListener(‘mousedown’, handleClick);
return function() { document.removeEventListener(‘mousedown’, handleClick); };
}, []);

var inputBase = { background: ‘rgba(5,8,20,0.6)’, border: ‘1px solid rgba(196,160,80,0.15)’, color: ‘#f0e8d0’, fontFamily: ‘‘DM Sans’, sans-serif’, fontSize: 14 };

return (
<div ref={ref} style={{ position: ‘relative’ }}>
<div
onClick={function() { setOpen(!open); setSearch(’’); }}
style={{ …inputBase, borderRadius: 6, padding: ‘10px’, cursor: ‘pointer’, display: ‘flex’, alignItems: ‘center’, gap: 8, userSelect: ‘none’ }}>
<span style={{ fontSize: 18 }}>{selected.flag}</span>
<span style={{ flex: 1 }}>{selected.name}</span>
<span style={{ color: ‘#c4a050’, fontSize: 10 }}>{open ? ‘▲’ : ‘▼’}</span>
</div>
{open && (
<div style={{ position: ‘absolute’, top: ‘100%’, left: 0, right: 0, zIndex: 500, background: ‘#08101e’, border: ‘1px solid rgba(196,160,80,0.2)’, borderRadius: 8, marginTop: 4, boxShadow: ‘0 8px 32px rgba(0,0,0,0.5)’, overflow: ‘hidden’ }}>
<div style={{ padding: ‘8px’ }}>
<input
autoFocus
value={search}
onChange={function(e) { setSearch(e.target.value); }}
placeholder=‘Search country…’
style={{ …inputBase, borderRadius: 6, padding: ‘8px 10px’, width: ‘100%’, outline: ‘none’ }}
/>
</div>
<div style={{ maxHeight: 220, overflowY: ‘auto’ }}>
{filtered.map(function(c) {
return (
<div
key={c.code}
onClick={function() { onChange(c.name); setOpen(false); }}
style={{ display: ‘flex’, alignItems: ‘center’, gap: 10, padding: ‘9px 12px’, cursor: ‘pointer’, background: value === c.name ? ‘rgba(196,160,80,0.1)’ : ‘transparent’, borderBottom: ‘1px solid rgba(196,160,80,0.04)’ }}
onMouseEnter={function(e) { e.currentTarget.style.background = ‘rgba(196,160,80,0.07)’; }}
onMouseLeave={function(e) { e.currentTarget.style.background = value === c.name ? ‘rgba(196,160,80,0.1)’ : ‘transparent’; }}>
<span style={{ fontSize: 18 }}>{c.flag}</span>
<span style={{ fontFamily: ‘‘DM Sans’, sans-serif’, fontSize: 13, color: ‘#f0e8d0’ }}>{c.name}</span>
</div>
);
})}
{filtered.length === 0 && (
<div style={{ padding: ‘12px’, fontFamily: ‘‘DM Sans’, sans-serif’, fontSize: 13, color: ‘#606080’, textAlign: ‘center’ }}>No results</div>
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
window.addEventListener(‘scroll’, fn);
return function() { window.removeEventListener(‘scroll’, fn); };
}, []);

return (
<nav style={{ position: ‘fixed’, top: 0, left: 0, right: 0, zIndex: 100, background: scrolled || menuOpen ? ‘rgba(5,8,20,0.98)’ : ‘transparent’, backdropFilter: scrolled || menuOpen ? ‘blur(20px)’ : ‘none’, borderBottom: scrolled || menuOpen ? ‘1px solid rgba(196,160,80,0.15)’ : ‘none’, transition: ‘all 0.3s ease’, padding: ‘0 1rem’ }}>
<div style={{ maxWidth: 1200, margin: ‘0 auto’, display: ‘flex’, alignItems: ‘center’, justifyContent: ‘space-between’, height: 72 }}>
<div style={{ display: ‘flex’, alignItems: ‘center’, width: ‘280px’, height: ‘64px’ }}>
<PpgLogo />
</div>
<div className={menuOpen ? ‘nav-links open’ : ‘nav-links’}>
{NAV_LINKS.map(function(l) {
return <a key={l.label} href={l.href} onClick={function() { setMenuOpen(false); }} style={{ color: ‘#b0a080’, fontSize: 14, fontFamily: ‘‘DM Sans’, sans-serif’, textDecoration: ‘none’, fontWeight: 500 }}>{l.label}</a>;
})}
<button onClick={function() { setMenuOpen(false); onOpenRegister(); }} style={{ background: ‘linear-gradient(135deg,#c4a050,#f0d080)’, color: ‘#050814’, fontFamily: ‘‘DM Sans’, sans-serif’, fontWeight: 700, fontSize: 13, padding: ‘10px 20px’, borderRadius: 6, border: ‘none’, cursor: ‘pointer’ }}>Join Now</button>
</div>
<button onClick={function() { setMenuOpen(!menuOpen); }} className=‘menu-toggle’ style={{ background: ‘transparent’, border: ‘none’, color: ‘#c4a050’, fontSize: 24, cursor: ‘pointer’ }}>
{menuOpen ? ‘✕’ : ‘☰’}
</button>
</div>
<style>{’\n        @import url(‘https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;700&family=DM+Mono:wght@400;500&display=swap’);\n        * { box-sizing: border-box; margin: 0; padding: 0; }\n        body { background: #050814; }\n        a { transition: color 0.2s; }\n        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }\n        @media (max-width: 768px) {\n          .menu-toggle { display: block !important; }\n          .nav-links { position: absolute; top: 72px; left: 0; right: 0; background: #050814; flex-direction: column; padding: 24px; gap: 20px !important; border-bottom: 1px solid rgba(196,160,80,0.15); display: none; }\n          .nav-links.open { display: flex !important; }\n          .about-split, .fees-split, .referral-box { flex-direction: column !important; gap: 32px !important; }\n          .form-row { flex-direction: column !important; gap: 12px; }\n          .stats-item { flex: 1 1 40% !important; border-right: none !important; }\n        }\n        @media (min-width: 769px) {\n          .menu-toggle { display: none !important; }\n          .nav-links { display: flex !important; gap: 32px; align-items: center; }\n          .nav-links button { width: auto !important; }\n          .about-split, .fees-split { flex-direction: row !important; gap: 80px !important; }\n          .referral-box { flex-direction: row !important; gap: 64px !important; }\n          .form-row { display: flex; gap: 16px; }\n          .stats-item:not(:last-child) { border-right: 1px solid rgba(196,160,80,0.1); }\n        }\n      ’}</style>
</nav>
);
}

function Hero(props) {
var onOpenRegister = props.onOpenRegister;
return (
<section style={{ minHeight: ‘100vh’, display: ‘flex’, alignItems: ‘center’, justifyContent: ‘center’, position: ‘relative’, overflow: ‘hidden’, background: ‘#050814’, padding: ‘100px 1rem 60px’ }}>
<div style={{ position: ‘absolute’, inset: 0, backgroundImage: ‘linear-gradient(rgba(196,160,80,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(196,160,80,0.03) 1px, transparent 1px)’, backgroundSize: ‘40px 40px’ }} />
<div style={{ position: ‘absolute’, top: ‘20%’, left: ‘5%’, width: 400, height: 400, background: ‘radial-gradient(circle, rgba(196,160,80,0.08) 0%, transparent 70%)’, borderRadius: ‘50%’, filter: ‘blur(60px)’ }} />
<div style={{ position: ‘absolute’, bottom: ‘10%’, right: ‘5%’, width: 500, height: 500, background: ‘radial-gradient(circle, rgba(30,60,140,0.2) 0%, transparent 70%)’, borderRadius: ‘50%’, filter: ‘blur(80px)’ }} />
<div style={{ textAlign: ‘center’, maxWidth: 900, position: ‘relative’, zIndex: 2 }}>
<div style={{ display: ‘inline-flex’, alignItems: ‘center’, gap: 8, background: ‘rgba(196,160,80,0.08)’, border: ‘1px solid rgba(196,160,80,0.25)’, borderRadius: 100, padding: ‘6px 16px’, marginBottom: 24 }}>
<div style={{ width: 6, height: 6, background: ‘#4ade80’, borderRadius: ‘50%’, animation: ‘pulse 2s infinite’ }} />
<span style={{ fontFamily: ‘‘DM Sans’, sans-serif’, fontSize: 11, color: ‘#c4a050’, letterSpacing: ‘0.05em’, fontWeight: 500 }}>Now Accepting Members - 18+ Only</span>
</div>
<h1 style={{ fontFamily: ‘‘Playfair Display’, serif’, fontSize: ‘clamp(2.2rem, 6vw, 4.5rem)’, fontWeight: 900, color: ‘#f0e8d0’, lineHeight: 1.15, marginBottom: 24, letterSpacing: ‘-0.01em’ }}>
Trade with Purpose.<br />
<span style={{ background: ‘linear-gradient(135deg,#c4a050,#f0d080)’, WebkitBackgroundClip: ‘text’, WebkitTextFillColor: ‘transparent’, backgroundClip: ‘text’ }}>Grow with Community.</span>
</h1>
<p style={{ fontFamily: ‘‘DM Sans’, sans-serif’, fontSize: ‘clamp(0.95rem, 2vw, 1.1rem)’, color: ‘#8080a0’, lineHeight: 1.7, maxWidth: 600, margin: ‘0 auto 40px’, fontWeight: 300 }}>
PPG Trading Club is an exclusive, members-only forex trading community. Your capital stays in your own broker account. You watch every trade live. You withdraw on your terms.
</p>
<div style={{ display: ‘flex’, gap: 12, justifyContent: ‘center’, flexWrap: ‘wrap’ }}>
<button onClick={onOpenRegister} style={{ background: ‘linear-gradient(135deg,#c4a050,#f0d080)’, color: ‘#050814’, fontFamily: ‘‘DM Sans’, sans-serif’, fontWeight: 700, fontSize: 14, padding: ‘14px 28px’, borderRadius: 8, border: ‘none’, cursor: ‘pointer’, boxShadow: ‘0 4px 14px rgba(196,160,80,0.2)’ }}>
Join the Club - $4.99/Mo
</button>
<a href=’#how’ style={{ border: ‘1px solid rgba(196,160,80,0.3)’, color: ‘#c4a050’, fontFamily: ‘‘DM Sans’, sans-serif’, fontWeight: 600, fontSize: 14, padding: ‘14px 28px’, borderRadius: 8, textDecoration: ‘none’ }}>
See How It Works
</a>
</div>
<div className=‘stats-grid’ style={{ display: ‘flex’, justifyContent: ‘center’, marginTop: 60, flexWrap: ‘wrap’, borderTop: ‘1px solid rgba(196,160,80,0.1)’, paddingTop: 32, gap: ‘24px 0’ }}>
{[[’$100’, ‘Min Deposit’], [‘7’, ‘Risk Tiers’], [‘24H’, ‘Withdrawals’], [‘15%’, ‘Referral Earn’]].map(function(item, i) {
return (
<div key={i} className=‘stats-item’ style={{ padding: ‘0 24px’, textAlign: ‘center’ }}>
<div style={{ fontFamily: ‘‘Playfair Display’, serif’, fontSize: ‘1.75rem’, fontWeight: 900, color: ‘#c4a050’ }}>{item[0]}</div>
<div style={{ fontFamily: ‘‘DM Sans’, sans-serif’, fontSize: 11, color: ‘#606080’, marginTop: 2, letterSpacing: ‘0.05em’, textTransform: ‘uppercase’ }}>{item[1]}</div>
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
<section id=‘about’ style={{ padding: ‘80px 1rem’, background: ‘#070a1a’ }}>
<div style={{ maxWidth: 1200, margin: ‘0 auto’ }}>
<AnimatedSection>
<div className=‘about-split’ style={{ display: ‘flex’, gap: 48 }}>
<div style={{ flex: 1 }}>
<div style={{ fontFamily: ‘‘DM Sans’, sans-serif’, fontSize: 11, color: ‘#c4a050’, letterSpacing: ‘0.15em’, textTransform: ‘uppercase’, fontWeight: 600, marginBottom: 12 }}>Who We Are</div>
<h2 style={{ fontFamily: ‘‘Playfair Display’, serif’, fontSize: ‘clamp(1.8rem, 4vw, 2.5rem)’, fontWeight: 900, color: ‘#f0e8d0’, lineHeight: 1.25, marginBottom: 20 }}>
Penny Partners Group Built on Trust
</h2>
<p style={{ fontFamily: ‘‘DM Sans’, sans-serif’, color: ‘#7878a0’, lineHeight: 1.7, fontSize: 14, marginBottom: 16 }}>
We are Penny Partners Group (PPG Solutions), a CAC-registered Nigerian financial cooperative built with one mission: to help everyday people access professional-grade forex trading and build real, sustainable wealth together.
</p>
<p style={{ fontFamily: ‘‘DM Sans’, sans-serif’, color: ‘#7878a0’, lineHeight: 1.7, fontSize: 14, marginBottom: 24 }}>
PPG Trading Club is our flagship initiative. Our vetted managers trade on your behalf directly through platforms like MT5 or TradingView. Your money never leaves your own account. You stay in full control at all times.
</p>
<div style={{ display: ‘flex’, gap: 12, flexWrap: ‘wrap’ }}>
<div style={{ background: ‘rgba(196,160,80,0.05)’, border: ‘1px solid rgba(196,160,80,0.15)’, borderRadius: 8, padding: ‘10px 16px’, flex: ‘1 1 200px’ }}>
<div style={{ fontFamily: ‘‘DM Mono’, monospace’, fontSize: 11, color: ‘#c4a050’, marginBottom: 2 }}>CAC Registered</div>
<div style={{ fontFamily: ‘‘DM Sans’, sans-serif’, fontSize: 12, color: ‘#7878a0’ }}>Nigeria Corporate Affairs Commission</div>
</div>
<div style={{ background: ‘rgba(196,160,80,0.05)’, border: ‘1px solid rgba(196,160,80,0.15)’, borderRadius: 8, padding: ‘10px 16px’, flex: ‘1 1 200px’ }}>
<div style={{ fontFamily: ‘‘DM Mono’, monospace’, fontSize: 11, color: ‘#c4a050’, marginBottom: 2 }}>Calabar, Nigeria</div>
<div style={{ fontFamily: ‘‘DM Sans’, sans-serif’, fontSize: 12, color: ‘#7878a0’ }}>10 Arab Road, HQ</div>
</div>
</div>
</div>
<div style={{ flex: 1, display: ‘grid’, gridTemplateColumns: ‘repeat(auto-fit, minmax(220px, 1fr))’, gap: 16 }}>
{[
{ icon: ‘🔐’, title: ‘Your Account, Your Money’, desc: ‘You open and own your broker account. Our managers only have trading access, never withdrawal access.’ },
{ icon: ‘👁️’, title: ‘Watch Every Trade Live’, desc: ‘Every member gets a view-only MT5 password to watch every position open and close, 24/7, in real time.’ },
{ icon: ‘📊’, title: ‘Expert Management’, desc: ‘Our vetted managers use disciplined risk strategies aligned with your chosen risk tier.’ },
{ icon: ‘🏢’, title: ‘Formally Registered’, desc: ‘PPG is registered with Nigeria’s CAC. We operate with legal accountability and full transparency.’ },
].map(function(c, i) {
return (
<div key={i} style={{ background: ‘rgba(255,255,255,0.01)’, border: ‘1px solid rgba(196,160,80,0.08)’, borderRadius: 12, padding: ‘20px’ }}>
<div style={{ fontSize: 24, marginBottom: 8 }}>{c.icon}</div>
<div style={{ fontFamily: ‘‘DM Sans’, sans-serif’, fontWeight: 700, fontSize: 14, color: ‘#f0e8d0’, marginBottom: 6 }}>{c.title}</div>
<div style={{ fontFamily: ‘‘DM Sans’, sans-serif’, fontSize: 13, color: ‘#606080’, lineHeight: 1.5 }}>{c.desc}</div>
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
<section id=‘how’ style={{ padding: ‘80px 1rem’, background: ‘#050814’ }}>
<div style={{ maxWidth: 1100, margin: ‘0 auto’ }}>
<AnimatedSection>
<div style={{ textAlign: ‘center’, marginBottom: 48 }}>
<div style={{ fontFamily: ‘‘DM Sans’, sans-serif’, fontSize: 11, color: ‘#c4a050’, letterSpacing: ‘0.15em’, textTransform: ‘uppercase’, fontWeight: 600, marginBottom: 12 }}>The Process</div>
<h2 style={{ fontFamily: ‘‘Playfair Display’, serif’, fontSize: ‘clamp(1.8rem, 4vw, 2.5rem)’, fontWeight: 900, color: ‘#f0e8d0’, lineHeight: 1.25 }}>How It Works</h2>
<p style={{ fontFamily: ‘‘DM Sans’, sans-serif’, color: ‘#7878a0’, marginTop: 12, fontSize: 14, maxWidth: 500, margin: ‘12px auto 0’ }}>From registration to your first live trade, every step is clear and transparent.</p>
</div>
</AnimatedSection>
<div style={{ display: ‘grid’, gridTemplateColumns: ‘repeat(auto-fit, minmax(280px, 1fr))’, gap: 16 }}>
{HOW_STEPS.map(function(step, i) {
return (
<AnimatedSection key={i} delay={i * 0.04}>
<div style={{ background: ‘rgba(255,255,255,0.01)’, border: ‘1px solid rgba(196,160,80,0.08)’, borderRadius: 12, padding: ‘24px’, height: ‘100%’ }}>
<div style={{ fontFamily: ‘‘DM Mono’, monospace’, fontSize: 12, color: ‘rgba(196,160,80,0.4)’, fontWeight: 500, marginBottom: 12 }}>{step.n}</div>
<h3 style={{ fontFamily: ‘‘Playfair Display’, serif’, fontSize: ‘1.1rem’, fontWeight: 700, color: ‘#f0e8d0’, marginBottom: 8 }}>{step.title}</h3>
<p style={{ fontFamily: ‘‘DM Sans’, sans-serif’, fontSize: 13, color: ‘#606080’, lineHeight: 1.6 }}>{step.desc}</p>
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
<section id=‘risk’ style={{ padding: ‘80px 1rem’, background: ‘#070a1a’ }}>
<div style={{ maxWidth: 1100, margin: ‘0 auto’ }}>
<AnimatedSection>
<div style={{ textAlign: ‘center’, marginBottom: 48 }}>
<div style={{ fontFamily: ‘‘DM Sans’, sans-serif’, fontSize: 11, color: ‘#c4a050’, letterSpacing: ‘0.15em’, textTransform: ‘uppercase’, fontWeight: 600, marginBottom: 12 }}>Choose Your Level</div>
<h2 style={{ fontFamily: ‘‘Playfair Display’, serif’, fontSize: ‘clamp(1.8rem, 4vw, 2.5rem)’, fontWeight: 900, color: ‘#f0e8d0’, lineHeight: 1.25 }}>Select Your Risk Tier</h2>
<p style={{ fontFamily: ‘‘DM Sans’, sans-serif’, color: ‘#7878a0’, marginTop: 12, fontSize: 14, maxWidth: 600, margin: ‘12px auto 0’ }}>
You choose your risk tolerance. Your assigned manager follows it exactly. Higher potential means higher risk.
</p>
</div>
</AnimatedSection>
<div style={{ display: ‘grid’, gridTemplateColumns: ‘repeat(auto-fill, minmax(240px, 1fr))’, gap: 16, marginBottom: 32 }}>
{RISK_TIERS.map(function(tier, i) {
return (
<AnimatedSection key={i} delay={i * 0.03}>
<div
onClick={function() { setSelected(i); }}
style={{ background: selected === i ? ‘rgba(196,160,80,0.04)’ : ‘rgba(255,255,255,0.01)’, border: ’1px solid ’ + (selected === i ? tier.color : ‘rgba(196,160,80,0.08)’), borderRadius: 12, padding: ‘20px’, cursor: ‘pointer’, position: ‘relative’, boxShadow: selected === i ? (’0 0 20px ’ + tier.color + ‘11’) : ‘none’ }}>
{tier.badge && (
<div style={{ position: ‘absolute’, top: 12, right: 12, background: tier.color, color: ‘#050814’, fontFamily: ‘‘DM Sans’, sans-serif’, fontSize: 9, fontWeight: 700, padding: ‘2px 6px’, borderRadius: 4 }}>{tier.badge}</div>
)}
<div style={{ fontFamily: ‘‘Playfair Display’, serif’, fontSize: ‘1.85rem’, fontWeight: 900, color: tier.color, lineHeight: 1 }}>{tier.pct}</div>
<div style={{ fontFamily: ‘‘DM Sans’, sans-serif’, fontWeight: 700, color: ‘#f0e8d0’, fontSize: 14, margin: ‘6px 0 2px’ }}>{tier.label}</div>
<div style={{ fontFamily: ‘‘DM Sans’, sans-serif’, fontSize: 10, color: tier.color, letterSpacing: ‘0.05em’, textTransform: ‘uppercase’, marginBottom: 10, fontWeight: 600 }}>{tier.risk}</div>
<p style={{ fontFamily: ‘‘DM Sans’, sans-serif’, fontSize: 13, color: ‘#606080’, lineHeight: 1.5, marginBottom: 12 }}>{tier.desc}</p>
<div style={{ fontFamily: ‘‘DM Mono’, monospace’, fontSize: 11, color: ‘#c4a050’ }}>~{tier.daily}/day on $100</div>
</div>
</AnimatedSection>
);
})}
</div>
<AnimatedSection>
<div style={{ background: ‘rgba(255,200,50,0.02)’, border: ‘1px solid rgba(255,200,50,0.1)’, borderRadius: 10, padding: ‘16px 20px’, display: ‘flex’, gap: 12, alignItems: ‘flex-start’ }}>
<div style={{ fontSize: 18, flexShrink: 0 }}>⚠️</div>
<p style={{ fontFamily: ‘‘DM Sans’, sans-serif’, fontSize: 12, color: ‘#9090b0’, lineHeight: 1.6 }}>
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
<section id=‘fees’ style={{ padding: ‘80px 1rem’, background: ‘#050814’ }}>
<div style={{ maxWidth: 1000, margin: ‘0 auto’ }}>
<AnimatedSection>
<div className=‘fees-split’ style={{ display: ‘flex’, gap: 40 }}>
<div style={{ flex: 1 }}>
<div style={{ fontFamily: ‘‘DM Sans’, sans-serif’, fontSize: 11, color: ‘#c4a050’, letterSpacing: ‘0.15em’, textTransform: ‘uppercase’, fontWeight: 600, marginBottom: 12 }}>Simple Pricing</div>
<h2 style={{ fontFamily: ‘‘Playfair Display’, serif’, fontSize: ‘clamp(1.8rem, 4vw, 2.5rem)’, fontWeight: 900, color: ‘#f0e8d0’, lineHeight: 1.25, marginBottom: 16 }}>
Transparent Fees. No Hidden Costs.
</h2>
<p style={{ fontFamily: ‘‘DM Sans’, sans-serif’, color: ‘#7878a0’, lineHeight: 1.6, fontSize: 14, marginBottom: 16 }}>
We believe in complete transparency. Our fees are simple, clear, and structured to align our interests completely with yours.
</p>
<div style={{ borderLeft: ‘2px solid #c4a050’, paddingLeft: 16 }}>
<div style={{ fontFamily: ‘‘DM Sans’, sans-serif’, fontWeight: 700, color: ‘#f0e8d0’, fontSize: 14, marginBottom: 2 }}>Performance Based Profit Share</div>
<p style={{ fontFamily: ‘‘DM Sans’, sans-serif’, fontSize: 13, color: ‘#606080’, lineHeight: 1.5 }}>
Our profit share is strictly performance-based. We use standard industry calculation models to ensure we only earn when you earn.
</p>
</div>
</div>
<div style={{ flex: 1, background: ‘rgba(255,255,255,0.01)’, border: ‘1px solid rgba(196,160,80,0.1)’, borderRadius: 16, padding: ‘28px 24px’ }}>
<div style={{ fontFamily: ‘‘DM Sans’, sans-serif’, fontSize: 11, fontWeight: 700, color: ‘#c4a050’, letterSpacing: ‘0.05em’, textTransform: ‘uppercase’, marginBottom: 4 }}>Monthly Access</div>
<div style={{ display: ‘flex’, alignItems: ‘baseline’, gap: 4, marginBottom: 20, borderBottom: ‘1px solid rgba(196,160,80,0.08)’, paddingBottom: 16 }}>
<span style={{ fontFamily: ‘‘Playfair Display’, serif’, fontSize: ‘2.75rem’, fontWeight: 900, color: ‘#f0e8d0’, lineHeight: 1 }}>$4.99</span>
<span style={{ fontFamily: ‘‘DM Sans’, sans-serif’, color: ‘#606080’, fontSize: 13 }}>/ month</span>
</div>
<div style={{ display: ‘flex’, flexDirection: ‘column’, gap: 12 }}>
{[
‘Access to vetted platform managers’,
‘Real-time view-only MT5 tracking’,
‘Flexible risk tier switching’,
‘24/7 direct capital withdrawal control’,
‘15% direct referral commission tier’,
].map(function(f, i) {
return (
<div key={i} style={{ display: ‘flex’, gap: 10, alignItems: ‘center’ }}>
<span style={{ color: ‘#c4a050’, fontSize: 12 }}>✓</span>
<span style={{ fontFamily: ‘‘DM Sans’, sans-serif’, fontSize: 13, color: ‘#8080a0’ }}>{f}</span>
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
<section id=‘referral’ style={{ padding: ‘80px 1rem’, background: ‘#070a1a’ }}>
<div style={{ maxWidth: 1100, margin: ‘0 auto’ }}>
<AnimatedSection>
<div className=‘referral-box’ style={{ background: ‘linear-gradient(135deg, rgba(196,160,80,0.03) 0%, rgba(30,60,140,0.03) 100%)’, border: ‘1px solid rgba(196,160,80,0.1)’, borderRadius: 16, padding: ‘32px 24px’, display: ‘flex’, gap: 32 }}>
<div style={{ flex: 1.2 }}>
<div style={{ fontFamily: ‘‘DM Sans’, sans-serif’, fontSize: 11, color: ‘#c4a050’, letterSpacing: ‘0.15em’, textTransform: ‘uppercase’, fontWeight: 600, marginBottom: 12 }}>Grow Together</div>
<h2 style={{ fontFamily: ‘‘Playfair Display’, serif’, fontSize: ‘clamp(1.8rem, 3.5vw, 2.3rem)’, fontWeight: 900, color: ‘#f0e8d0’, lineHeight: 1.25, marginBottom: 16 }}>
Our 15% Mutual Referral System
</h2>
<p style={{ fontFamily: ‘‘DM Sans’, sans-serif’, color: ‘#7878a0’, lineHeight: 1.6, fontSize: 14, marginBottom: 12 }}>
To maintain high community standards and security, PPG Trading Club operates exclusively on invitation. Every active member receives a unique referral code.
</p>
<p style={{ fontFamily: ‘‘DM Sans’, sans-serif’, color: ‘#7878a0’, lineHeight: 1.6, fontSize: 14 }}>
When someone registers using your link, you instantly earn a 15% direct referral reward on their monthly subscription fees. This creates an immediate, recurring income line directly tied to our collective community growth.
</p>
</div>
<div style={{ flex: 0.8, display: ‘flex’, flexDirection: ‘column’, gap: 12, width: ‘100%’ }}>
<div style={{ background: ‘rgba(5,8,20,0.3)’, border: ‘1px solid rgba(196,160,80,0.08)’, borderRadius: 10, padding: ‘16px’ }}>
<div style={{ fontFamily: ‘‘DM Mono’, monospace’, fontSize: 18, fontWeight: 700, color: ‘#c4a050’, marginBottom: 2 }}>15%</div>
<div style={{ fontFamily: ‘‘DM Sans’, sans-serif’, fontSize: 13, fontWeight: 600, color: ‘#f0e8d0’, marginBottom: 2 }}>Recurring Commission</div>
<div style={{ fontFamily: ‘‘DM Sans’, sans-serif’, fontSize: 12, color: ‘#606080’ }}>Earn every single month your referred member stays active.</div>
</div>
<div style={{ background: ‘rgba(5,8,20,0.3)’, border: ‘1px solid rgba(196,160,80,0.08)’, borderRadius: 10, padding: ‘16px’ }}>
<div style={{ fontFamily: ‘‘DM Mono’, monospace’, fontSize: 18, fontWeight: 700, color: ‘#60a5fa’, marginBottom: 2 }}>Instant</div>
<div style={{ fontFamily: ‘‘DM Sans’, sans-serif’, fontSize: 13, fontWeight: 600, color: ‘#f0e8d0’, marginBottom: 2 }}>Balance Settlements</div>
<div style={{ fontFamily: ‘‘DM Sans’, sans-serif’, fontSize: 12, color: ‘#606080’ }}>Earnings reflect inside your digital wallet immediately.</div>
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
var _a = useState({ fullName: ‘’, email: ‘’, phone: ‘’, country: ‘Nigeria’, referralId: ‘’, riskTier: ‘1%’, broker: ‘No Preference’ });
var formData = _a[0], setFormData = _a[1];
var _b = useState(false), loading = _b[0], setLoading = _b[1];
var _c = useState({ type: ‘’, msg: ‘’ }), status = _c[0], setStatus = _c[1];

useEffect(function() {
if (isOpen) {
document.body.style.overflow = ‘hidden’;
var handleEsc = function(e) { if (e.key === ‘Escape’) onClose(); };
window.addEventListener(‘keydown’, handleEsc);
return function() {
document.body.style.overflow = ‘unset’;
window.removeEventListener(‘keydown’, handleEsc);
};
}
}, [isOpen, onClose]);

if (!isOpen) return null;

var handleChange = function(e) {
var n = Object.assign({}, formData);
n[e.target.name] = e.target.value;
setFormData(n);
};

var handleCountry = function(val) {
setFormData(Object.assign({}, formData, { country: val }));
};

var handleSubmit = function(e) {
e.preventDefault();
setLoading(true);
setStatus({ type: ‘’, msg: ‘’ });
setTimeout(function() {
setLoading(false);
setStatus({ type: ‘success’, msg: ‘Application received! Our team will contact you via WhatsApp within 24-48 hours to complete your KYC and onboarding. Full member portal coming soon.’ });
}, 1200);
};

var fieldStyle = { width: ‘100%’, background: ‘rgba(5,8,20,0.6)’, border: ‘1px solid rgba(196,160,80,0.15)’, borderRadius: 6, padding: ‘10px’, color: ‘#f0e8d0’, fontFamily: ‘‘DM Sans’, sans-serif’, fontSize: 14, outline: ‘none’ };
var labelStyle = { display: ‘block’, fontFamily: ‘‘DM Sans’, sans-serif’, fontSize: 11, fontWeight: 600, color: ‘#b0a080’, marginBottom: 4, textTransform: ‘uppercase’ };

return (
<div style={{ position: ‘fixed’, inset: 0, zIndex: 200, display: ‘flex’, alignItems: ‘center’, justifyContent: ‘center’, padding: ‘20px 16px’ }}>
<div onClick={onClose} style={{ position: ‘absolute’, inset: 0, background: ‘rgba(3,5,13,0.88)’, backdropFilter: ‘blur(12px)’ }} />
<div style={{ position: ‘relative’, zIndex: 210, width: ‘100%’, maxWidth: ‘580px’, background: ‘#050814’, border: ‘1px solid rgba(196,160,80,0.25)’, borderRadius: 16, padding: ‘32px 24px’, maxHeight: ‘90vh’, overflowY: ‘auto’, boxShadow: ‘0 20px 40px rgba(0,0,0,0.6)’ }}>
<button onClick={onClose} style={{ position: ‘absolute’, top: 16, right: 16, background: ‘transparent’, border: ‘none’, color: ‘#b0a080’, fontSize: 20, cursor: ‘pointer’ }}>✕</button>
<div style={{ textAlign: ‘center’, marginBottom: 24 }}>
<h2 style={{ fontFamily: ‘‘Playfair Display’, serif’, fontSize: ‘1.75rem’, fontWeight: 900, color: ‘#f0e8d0’, marginBottom: 6 }}>Application Form</h2>
<p style={{ fontFamily: ‘‘DM Sans’, sans-serif’, color: ‘#606080’, fontSize: 13 }}>Complete your details to request onboarding verification.</p>
</div>

```
    {status.msg && (
      <div style={{ background: status.type === 'success' ? 'rgba(74,222,128,0.05)' : 'rgba(239,68,68,0.05)', border: '1px solid ' + (status.type === 'success' ? '#4ade80' : '#ef4444'), color: status.type === 'success' ? '#4ade80' : '#ef4444', borderRadius: 8, padding: '12px', marginBottom: 16, fontFamily: ''DM Sans', sans-serif', fontSize: 13, lineHeight: 1.5 }}>
        {status.msg}
      </div>
    )}

    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div>
        <label style={labelStyle}>Full Name *</label>
        <input type='text' name='fullName' value={formData.fullName} onChange={handleChange} required style={fieldStyle} />
      </div>
      <div className='form-row'>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Email Address *</label>
          <input type='email' name='email' value={formData.email} onChange={handleChange} required style={fieldStyle} />
        </div>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Phone / WhatsApp *</label>
          <input type='tel' name='phone' value={formData.phone} onChange={handleChange} placeholder='+234...' required style={fieldStyle} />
        </div>
      </div>
      <div className='form-row'>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Country</label>
          <CountrySelect value={formData.country} onChange={handleCountry} />
        </div>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Referral ID *</label>
          <input type='text' name='referralId' value={formData.referralId} onChange={handleChange} placeholder='Required' required style={fieldStyle} />
        </div>
      </div>
      <div className='form-row'>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Preferred Risk Tier</label>
          <select name='riskTier' value={formData.riskTier} onChange={handleChange} style={{ ...fieldStyle, cursor: 'pointer' }}>
            {RISK_TIERS.map(function(t) { return <option key={t.pct} value={t.pct}>{t.pct} - {t.label}</option>; })}
          </select>
        </div>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Broker Preference</label>
          <select name='broker' value={formData.broker} onChange={handleChange} style={{ ...fieldStyle, cursor: 'pointer' }}>
            <option value='No Preference'>No Preference</option>
            <option value='Exness'>Exness (Recommended)</option>
            <option value='HFM'>HFM (HotForex)</option>
            <option value='FXTM'>FXTM</option>
          </select>
        </div>
      </div>
      <button type='submit' disabled={loading} style={{ marginTop: 8, background: 'linear-gradient(135deg,#c4a050,#f0d080)', color: '#050814', border: 'none', borderRadius: 6, padding: '12px', fontFamily: ''DM Sans', sans-serif', fontWeight: 700, fontSize: 14, cursor: 'pointer', opacity: loading ? 0.7 : 1 }}>
        {loading ? 'Processing Application...' : 'Submit Application'}
      </button>
      <p style={{ fontFamily: ''DM Sans', sans-serif', fontSize: 11, color: '#404060', textAlign: 'center', lineHeight: 1.5 }}>
        Full member portal with live dashboard, KYC upload, and account management is coming soon. After submission our team will reach you on WhatsApp.
      </p>
    </form>
  </div>
</div>
```

);
}

function CacBanner() {
return (
<div style={{ background: ‘linear-gradient(90deg, #03050d 0%, #0a0f20 40%, #03050d 100%)’, borderTop: ‘1px solid rgba(196,160,80,0.2)’, borderBottom: ‘1px solid rgba(196,160,80,0.2)’, padding: ‘18px 1rem’, textAlign: ‘center’, position: ‘relative’, overflow: ‘hidden’ }}>
<div style={{ position: ‘absolute’, inset: 0, backgroundImage: ‘linear-gradient(90deg, transparent 0%, rgba(196,160,80,0.03) 50%, transparent 100%)’ }} />
<div style={{ maxWidth: 900, margin: ‘0 auto’, display: ‘flex’, alignItems: ‘center’, justifyContent: ‘center’, gap: 20, flexWrap: ‘wrap’, position: ‘relative’, zIndex: 1 }}>
<div style={{ display: ‘flex’, alignItems: ‘center’, gap: 10 }}>
<div style={{ width: 36, height: 36, background: ‘linear-gradient(135deg,#c4a050,#f0d080)’, borderRadius: ‘50%’, display: ‘flex’, alignItems: ‘center’, justifyContent: ‘center’, fontSize: 18, flexShrink: 0 }}>🏛️</div>
<div style={{ textAlign: ‘left’ }}>
<div style={{ fontFamily: ‘‘DM Sans’, sans-serif’, fontSize: 10, color: ‘#c4a050’, letterSpacing: ‘0.12em’, textTransform: ‘uppercase’, fontWeight: 700 }}>Officially Registered</div>
<div style={{ fontFamily: ‘‘DM Sans’, sans-serif’, fontSize: 13, color: ‘#f0e8d0’, fontWeight: 600 }}>Corporate Affairs Commission · Federal Republic of Nigeria</div>
</div>
</div>
<div style={{ width: 1, height: 32, background: ‘rgba(196,160,80,0.2)’ }} />
<div style={{ fontFamily: ‘‘DM Sans’, sans-serif’, fontSize: 12, color: ‘#7878a0’, letterSpacing: ‘0.03em’ }}>
PPG Solutions Global Trading Co. · CAC Registration No. on file · Est. Nigeria
</div>
<div style={{ width: 1, height: 32, background: ‘rgba(196,160,80,0.2)’ }} />
<div style={{ display: ‘flex’, alignItems: ‘center’, gap: 6 }}>
<div style={{ width: 6, height: 6, background: ‘#4ade80’, borderRadius: ‘50%’, animation: ‘pulse 2s infinite’ }} />
<span style={{ fontFamily: ‘‘DM Sans’, sans-serif’, fontSize: 12, color: ‘#4ade80’, fontWeight: 600 }}>Verified & Active</span>
</div>
</div>
</div>
);
}

function Footer() {
return (
<footer style={{ background: ‘#03050d’, borderTop: ‘1px solid rgba(196,160,80,0.05)’ }}>
<CacBanner />
<div style={{ padding: ‘40px 1rem 28px’, maxWidth: 1200, margin: ‘0 auto’ }}>
<div style={{ display: ‘flex’, justifyContent: ‘space-between’, alignItems: ‘flex-start’, flexWrap: ‘wrap’, gap: 32, marginBottom: 32 }}>
<div style={{ maxWidth: 340 }}>
<div style={{ fontFamily: ‘‘Playfair Display’, serif’, fontWeight: 900, fontSize: 20, color: ‘#f0d080’, marginBottom: 8, letterSpacing: ‘0.04em’ }}>PPG Trading Club</div>
<p style={{ fontFamily: ‘‘DM Sans’, sans-serif’, fontSize: 12, color: ‘#404060’, lineHeight: 1.7, marginBottom: 12 }}>
Nigeria’s trusted forex trading cooperative. Building wealth through community and professional management.
</p>
<div style={{ display: ‘flex’, flexDirection: ‘column’, gap: 4 }}>
{[‘📧 contact.ppgsolutions@gmail.com’, ‘📞 +234 813 050 0659’, ‘📍 10 Arab Road, Calabar, Nigeria’].map(function(c, i) {
return <div key={i} style={{ fontFamily: ‘‘DM Sans’, sans-serif’, fontSize: 12, color: ‘#505070’ }}>{c}</div>;
})}
</div>
</div>
<div style={{ display: ‘flex’, gap: 48, flexWrap: ‘wrap’ }}>
{[
{ title: ‘Club’, links: [‘About PPG’, ‘How It Works’, ‘Risk Tiers’, ‘Fees’] },
{ title: ‘Join’, links: [‘Register’, ‘Referral Program’, ‘KYC Verification’] },
{ title: ‘Legal’, links: [‘Risk Disclaimer’, ‘Terms of Service’, ‘Privacy Policy’] },
].map(function(col, i) {
return (
<div key={i}>
<div style={{ fontFamily: ‘‘DM Sans’, sans-serif’, fontSize: 10, color: ‘#c4a050’, letterSpacing: ‘0.12em’, textTransform: ‘uppercase’, fontWeight: 700, marginBottom: 14 }}>{col.title}</div>
<div style={{ display: ‘flex’, flexDirection: ‘column’, gap: 10 }}>
{col.links.map(function(l) {
return <a key={l} href=’#’ style={{ fontFamily: ‘‘DM Sans’, sans-serif’, fontSize: 12, color: ‘#505070’, textDecoration: ‘none’ }}>{l}</a>;
})}
</div>
</div>
);
})}
</div>
</div>
<div style={{ borderTop: ‘1px solid rgba(196,160,80,0.06)’, paddingTop: 20, display: ‘flex’, justifyContent: ‘space-between’, alignItems: ‘center’, flexWrap: ‘wrap’, gap: 12 }}>
<div style={{ fontFamily: ‘‘DM Sans’, sans-serif’, fontSize: 11, color: ‘#303050’ }}>
© {new Date().getFullYear()} PPG Solutions Global Trading Co. All rights reserved.
</div>
<div style={{ fontFamily: ‘‘DM Sans’, sans-serif’, fontSize: 11, color: ‘#303050’, maxWidth: 480, textAlign: ‘right’ }}>
Forex trading involves substantial risk. You may lose all invested capital. PPG Trading Club does not guarantee returns.
</div>
</div>
</div>
</footer>
);
}

function AppInner() {
var _a = useState(false), isRegisterOpen = _a[0], setIsRegisterOpen = _a[1];
return (
<div style={{ minHeight: ‘100vh’, background: ‘#050814’, color: ‘#f0e8d0’, overflowX: ‘hidden’ }}>
<Navbar onOpenRegister={function() { setIsRegisterOpen(true); }} />
<Hero onOpenRegister={function() { setIsRegisterOpen(true); }} />
<About />
<HowItWorks />
<RiskTiers />
<Fees />
<Referral />
<Footer />
<RegisterModal isOpen={isRegisterOpen} onClose={function() { setIsRegisterOpen(false); }} />
<a href=‘https://wa.me/2348130500659’ target=’_blank’ rel=‘noreferrer’ style={{ position: ‘fixed’, bottom: 24, right: 24, width: 52, height: 52, background: ‘#25D366’, borderRadius: ‘50%’, display: ‘flex’, alignItems: ‘center’, justifyContent: ‘center’, fontSize: 24, boxShadow: ‘0 4px 16px rgba(37,211,102,0.4)’, textDecoration: ‘none’, zIndex: 150 }}>💬</a>
</div>
);
}

export default function App() {
return (
<ErrorBoundary>
<AppInner />
</ErrorBoundary>
);
}
