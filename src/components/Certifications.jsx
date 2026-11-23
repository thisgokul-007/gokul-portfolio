import React, { useState, useRef, useCallback } from 'react';
import { portfolioData } from '../data/portfolioData';
import { sound } from '../utils/audio';
import { Award, Star, CheckCircle2, Layers } from 'lucide-react';

/* ─── Metallic theme tokens ─────────────────────────────────────────── */
const themes = {
  silver: {
    bgGradient: 'linear-gradient(135deg, #0e1118 0%, #131720 40%, #111519 100%)',
    metalGradient: 'linear-gradient(135deg, #9ea7b8 0%, #c8d0dc 30%, #e8ecf2 55%, #b0bac8 75%, #8a9ab0 100%)',
    borderGradient: 'linear-gradient(135deg, #6e7a8a, #c0cad6, #e4eaf0, #9eaab8, #6e7a8a)',
    glowColor: 'rgba(180,196,215,0.22)',
    glowStrong: 'rgba(200,215,230,0.35)',
    badgeBg: 'linear-gradient(135deg, #8a9ab0, #c8d0dc, #e8ecf2, #b0bac8)',
    badgeBorder: 'rgba(200,215,230,0.6)',
    textAccent: '#c8d4e2',
    textSecondary: '#8ea0b8',
    scoreColor: '#d4dfe8',
    checkColor: '#a8bcd0',
    particleColor: '#c0ccd8',
    shineColor: 'rgba(255,255,255,0.18)',
    label: 'SILVER',
    stars: 2,
  },
  gold: {
    bgGradient: 'linear-gradient(135deg, #0f0d08 0%, #1a1608 40%, #120f04 100%)',
    metalGradient: 'linear-gradient(135deg, #b8860b 0%, #d4a017 25%, #f0c040 50%, #e8b820 70%, #c8961a 100%)',
    borderGradient: 'linear-gradient(135deg, #8b6914, #d4a017, #f5d060, #c8960c, #8b6914)',
    glowColor: 'rgba(210,165,20,0.22)',
    glowStrong: 'rgba(240,195,55,0.38)',
    badgeBg: 'linear-gradient(135deg, #8b6914, #c89010, #f5d060, #c89010)',
    badgeBorder: 'rgba(240,195,55,0.6)',
    textAccent: '#f0d070',
    textSecondary: '#c8a040',
    scoreColor: '#f5d060',
    checkColor: '#c8a040',
    particleColor: '#d4a820',
    shineColor: 'rgba(255,235,120,0.22)',
    label: 'GOLD',
    stars: 3,
  },
};

/* ─── Shine sweep overlay ───────────────────────────────────────────── */
function ShineOverlay({ active, shinePos, theme }) {
  const t = themes[theme];
  if (!active) return null;
  return (
    <div
      className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
      style={{ zIndex: 2 }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 60% 40% at ${shinePos.x}% ${shinePos.y}%, ${t.shineColor}, transparent 65%)`,
          transition: 'background 0.08s ease',
        }}
      />
    </div>
  );
}

/* ─── Single Certificate Card ───────────────────────────────────────── */
function CertCard({ cert }) {
  const t = themes[cert.theme];
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [shinePos, setShinePos] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;
    const relY = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (relY - 0.5) * -14, y: (relX - 0.5) * 14 });
    setShinePos({ x: relX * 100, y: relY * 100 });
  }, []);

  const handleMouseEnter = () => { sound.playHover(); setHovered(true); };
  const handleMouseLeave = () => {
    setHovered(false);
    setTilt({ x: 0, y: 0 });
    setShinePos({ x: 50, y: 50 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => sound.playClick()}
      className="relative w-full cursor-pointer select-none"
      style={{
        perspective: '800px',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Outer glow halo */}
      <div
        className="absolute -inset-px rounded-2xl transition-opacity duration-500 pointer-events-none"
        style={{
          background: t.borderGradient,
          borderRadius: '1.1rem',
          opacity: hovered ? 1 : 0.5,
          padding: '1px',
          boxShadow: hovered
            ? `0 0 50px ${t.glowStrong}, 0 0 100px ${t.glowColor}, inset 0 0 20px ${t.glowColor}`
            : `0 0 25px ${t.glowColor}`,
          zIndex: 0,
        }}
      />

      {/* Card body */}
      <div
        className="relative rounded-2xl overflow-hidden transition-all duration-200"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${hovered ? 'scale(1.025)' : 'scale(1)'}`,
          transformStyle: 'preserve-3d',
          background: t.bgGradient,
          border: `1px solid transparent`,
          boxShadow: hovered
            ? `0 24px 60px rgba(0,0,0,0.6), 0 0 40px ${t.glowColor}`
            : `0 8px 30px rgba(0,0,0,0.5)`,
          zIndex: 1,
        }}
      >
        {/* Metallic top bar */}
        <div
          className="relative h-1.5 w-full"
          style={{ background: t.metalGradient }}
        />

        {/* Ambient inner glow at top */}
        <div
          className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 50% -10%, ${t.glowColor}, transparent 70%)`,
            zIndex: 0,
          }}
        />

        {/* Shine sweep */}
        <ShineOverlay active={hovered} shinePos={shinePos} theme={cert.theme} />

        {/* Content */}
        <div className="relative p-7 sm:p-8 z-10">

          {/* Top row: platform badge + stars */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-2">
              <div
                className="px-3 py-1 rounded-lg text-[10px] font-black tracking-widest uppercase"
                style={{
                  background: t.metalGradient,
                  color: cert.theme === 'gold' ? '#1a1200' : '#1a2030',
                  boxShadow: `0 2px 10px ${t.glowColor}`,
                }}
              >
                NPTEL
              </div>
              <span className="text-[10px] font-mono tracking-wider" style={{ color: t.textSecondary }}>
                National Certification
              </span>
            </div>

            {/* Stars */}
            <div className="flex items-center gap-0.5">
              {Array.from({ length: t.stars }).map((_, i) => (
                <Star
                  key={i}
                  className="w-3.5 h-3.5 fill-current"
                  style={{ color: t.textAccent }}
                />
              ))}
            </div>
          </div>

          {/* Course title */}
          <h3 className="text-xl sm:text-2xl font-black text-white leading-tight mb-1 tracking-tight">
            {cert.title}
          </h3>
          <p className="text-xs font-mono mb-6" style={{ color: t.textSecondary }}>
            {cert.category}
          </p>

          {/* Achievement badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl mb-6"
            style={{
              background: t.badgeBg,
              border: `1px solid ${t.badgeBorder}`,
              boxShadow: `0 0 20px ${t.glowColor}, inset 0 1px 0 rgba(255,255,255,0.3)`,
            }}
          >
            <Award
              className="w-4 h-4"
              style={{ color: cert.theme === 'gold' ? '#1a1200' : '#1a2030' }}
            />
            <span
              className="text-xs font-black tracking-widest uppercase"
              style={{ color: cert.theme === 'gold' ? '#1a1200' : '#1a2030' }}
            >
              {cert.honorsShort}
            </span>
          </div>

          {/* Score + Duration row */}
          <div className="flex flex-wrap items-center gap-4 mb-7">
            {cert.score && (
              <div
                className="text-center px-4 py-2 rounded-xl"
                style={{
                  background: `${t.glowColor}`,
                  border: `1px solid ${t.badgeBorder}50`,
                }}
              >
                <div className="text-2xl font-black font-mono" style={{ color: t.scoreColor }}>
                  {cert.score}
                </div>
                <div className="text-[10px] font-mono tracking-wider" style={{ color: t.textSecondary }}>
                  CONSOLIDATED SCORE
                </div>
              </div>
            )}
            <div className="text-xs font-mono" style={{ color: t.textSecondary }}>
              <div className="text-white/60 mb-0.5">Duration</div>
              <div style={{ color: t.textAccent }}>{cert.duration}</div>
            </div>
          </div>

          {/* Highlights */}
          <ul className="space-y-2.5">
            {cert.highlights.map((highlight, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <CheckCircle2
                  className="w-3.5 h-3.5 mt-0.5 flex-shrink-0"
                  style={{ color: t.checkColor }}
                />
                <span className="text-xs text-slate-400 leading-relaxed">{highlight}</span>
              </li>
            ))}
          </ul>

          {/* Metallic divider */}
          <div
            className="mt-7 h-px w-full"
            style={{ background: `linear-gradient(90deg, transparent, ${t.textAccent}50, transparent)` }}
          />

          {/* Footer */}
          <div className="mt-4 flex items-center justify-between">
            <span className="text-[10px] font-mono tracking-wider" style={{ color: t.textSecondary }}>
              {cert.fullIssuer}
            </span>
            <div
              className="flex items-center gap-1.5 text-[10px] font-black tracking-widest uppercase px-2.5 py-1 rounded-lg"
              style={{
                color: t.textAccent,
                background: `${t.glowColor}`,
                border: `1px solid ${t.textAccent}25`,
              }}
            >
              <Layers className="w-3 h-3" />
              {t.label}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Certifications Section ────────────────────────────────────────── */
export default function Certifications() {
  const certs = portfolioData.certifications;

  return (
    <section id="certifications" className="relative py-24 sm:py-32 overflow-hidden bg-[#080A10]">
      {/* Background */}
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-[#8a9ab0]/8 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-[#c8960c]/8 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#56C8FF] mb-4">
            <Award className="w-3.5 h-3.5" />
            <span>NPTEL NATIONAL CERTIFICATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            CERTIFIED EXCELLENCE
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto mt-3 font-normal">
            Nationally recognized NPTEL certifications — a testament to academic commitment and disciplined learning.
          </p>
        </div>

        {/* Certificate Cards — equal-width side-by-side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {certs.map((cert) => (
            <CertCard key={cert.id} cert={cert} />
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-12 text-center text-xs text-slate-600 font-mono">
          Issued by IIT / IISc faculty partners through the National Programme on Technology Enhanced Learning (NPTEL), Government of India.
        </div>
      </div>
    </section>
  );
}
