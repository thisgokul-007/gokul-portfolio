import React, { useState, useEffect } from 'react';
import { portfolioData } from '../data/portfolioData';
import { sound } from '../utils/audio';
import { Volume2, VolumeX, Menu, X, Sparkles } from 'lucide-react';
import { Github, Linkedin } from './Icons';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'journey', label: 'Journey' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'contact', label: 'Contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Scroll spy
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.offsetTop <= scrollPos) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id) => {
    sound.playClick();
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleToggleSound = () => {
    const newState = sound.toggle();
    setSoundEnabled(newState);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex justify-center px-4 pt-4 sm:pt-6 transition-all duration-300">
      <nav
        className={`w-full max-w-6xl flex items-center justify-between px-5 py-3 rounded-2xl transition-all duration-300 ${
          isScrolled
            ? 'glass-panel-glow bg-[#080A10]/85 border-white/15 shadow-2xl'
            : 'bg-[#151923]/40 backdrop-blur-md border border-white/5'
        }`}
      >
        {/* Brand / Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <div className="relative w-8 h-8 rounded-lg bg-gradient-to-tr from-[#56C8FF] to-[#9370DB] p-[1.5px] transition-transform group-hover:scale-105">
            <div className="w-full h-full bg-[#080A10] rounded-[6.5px] flex items-center justify-center font-mono font-extrabold text-sm text-[#56C8FF]">
              G
            </div>
          </div>
          <div className="flex flex-col items-start text-left">
            <span className="font-mono text-sm font-bold text-white tracking-wider flex items-center gap-1.5">
              S. GOKUL
              <span className="w-1.5 h-1.5 rounded-full bg-[#50FA7B] animate-pulse" />
            </span>
            <span className="text-[10px] font-mono text-[#56C8FF]/80 uppercase tracking-widest hidden sm:inline">
              IT Student // Dev
            </span>
          </div>
        </button>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center gap-1 bg-black/40 px-3 py-1.5 rounded-full border border-white/5">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                onMouseEnter={() => sound.playHover()}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'text-white font-semibold bg-white/10 text-glow-blue'
                    : 'text-[#C0C6D4]/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <span className="absolute inset-0 rounded-full border border-[#56C8FF]/40 shadow-[0_0_12px_rgba(86,200,255,0.25)] pointer-events-none" />
                )}
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Right controls: Sound Toggle & Socials */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Futuristic Audio Toggle */}
          <button
            onClick={handleToggleSound}
            onMouseEnter={() => sound.playHover()}
            title={soundEnabled ? 'Mute Procedural Audio' : 'Enable Sci-Fi Audio FX'}
            className={`p-2 rounded-xl transition-all border cursor-pointer ${
              soundEnabled
                ? 'bg-[#56C8FF]/20 border-[#56C8FF] text-[#56C8FF] shadow-[0_0_15px_rgba(86,200,255,0.4)]'
                : 'bg-white/5 border-white/10 text-white/50 hover:text-white hover:bg-white/10'
            }`}
            aria-label="Toggle sound"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Direct Social Links in Nav */}
          <a
            href={portfolioData.socials.github.url}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => sound.playHover()}
            onClick={() => sound.playClick()}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-white/70 hover:text-white border border-white/10 transition-all hidden sm:flex cursor-pointer"
            aria-label="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>

          <a
            href={portfolioData.socials.linkedin.url}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => sound.playHover()}
            onClick={() => sound.playClick()}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-[#56C8FF]/80 hover:text-[#56C8FF] border border-white/10 transition-all hidden sm:flex cursor-pointer"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => {
              sound.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="md:hidden p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-20 left-4 right-4 z-50 p-6 glass-panel-glow rounded-2xl border border-white/20 bg-[#080A10]/95 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left py-2.5 px-4 rounded-xl font-mono text-sm transition-all ${
                  activeSection === item.id
                    ? 'bg-[#56C8FF]/20 text-[#56C8FF] font-bold border border-[#56C8FF]/30'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}

            <div className="pt-4 mt-2 border-t border-white/10 flex items-center justify-around gap-4">
              <a
                href={portfolioData.socials.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-mono text-white/80"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <a
                href={portfolioData.socials.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-mono text-[#56C8FF]"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
