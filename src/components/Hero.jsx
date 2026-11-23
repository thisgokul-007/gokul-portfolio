import React from 'react';
import HeroScene from './3d/HeroScene';
import { portfolioData } from '../data/portfolioData';
import { sound } from '../utils/audio';
import { ArrowRight, Compass, Sparkles, Terminal, ChevronDown } from 'lucide-react';
import { Github, Linkedin } from './Icons';

export default function Hero() {
  const scrollTo = (id) => {
    sound.playClick();
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -70;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen pt-28 pb-16 flex flex-col justify-between overflow-hidden">
      {/* Background ambient lighting glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#56C8FF]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-[480px] h-[480px] bg-[#9370DB]/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Main Grid Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Editorial Typography & CTAs */}
        <div className="lg:col-span-7 flex flex-col items-start z-10">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md mb-6">
            <span className="w-2 h-2 rounded-full bg-[#50FA7B] animate-pulse" />
            <span className="font-mono text-xs text-[#C0C6D4] tracking-wide">
              {portfolioData.personal.statusBadge}
            </span>
          </div>

          {/* Name & Academic Intro */}
          <div className="flex items-center gap-3 mb-2">
            <span className="font-mono text-xs text-[#56C8FF] uppercase tracking-widest flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5" />
              IDENTIFIER // 007
            </span>
            <span className="text-white/20">|</span>
            <span className="font-mono text-xs text-[#9370DB] tracking-wide">
              CGPA {portfolioData.personal.cgpa}
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-none mb-3">
            {portfolioData.personal.name}
          </h2>

          {/* Subtitle */}
          <p className="font-mono text-sm sm:text-base text-[#56C8FF] font-medium tracking-wide mb-6">
            {portfolioData.personal.subtitle}
          </p>

          {/* Large Editorial Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-[#C0C6D4] to-[#56C8FF] tracking-tight leading-[1.1] mb-6">
            {portfolioData.personal.headline}
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed mb-8">
            {portfolioData.personal.supportingText}
          </p>

          {/* Primary & Secondary Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
            <button
              onClick={() => scrollTo('projects')}
              onMouseEnter={() => sound.playHover()}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#56C8FF] to-[#3BA4DE] text-[#080A10] font-bold text-sm tracking-wide shadow-[0_0_30px_rgba(86,200,255,0.35)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
            >
              <span>View My Projects</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => scrollTo('journey')}
              onMouseEnter={() => sound.playHover()}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-mono text-sm tracking-wide border border-white/15 backdrop-blur-md transition-all duration-300 hover:border-[#9370DB]/50 cursor-pointer"
            >
              <Compass className="w-4 h-4 text-[#9370DB]" />
              <span>Explore My Journey</span>
            </button>
          </div>

          {/* Verified Social Connectors */}
          <div className="flex flex-wrap items-center gap-4 mt-8 pt-6 border-t border-white/10 w-full">
            <span className="font-mono text-xs text-white/40 uppercase tracking-widest">
              Direct Links:
            </span>

            <a
              href={portfolioData.socials.github.url}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => sound.playHover()}
              onClick={() => sound.playClick()}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/10 border border-white/10 text-xs font-mono text-white/80 hover:text-white transition-all cursor-pointer"
            >
              <Github className="w-3.5 h-3.5 text-white" />
              <span>github/{portfolioData.socials.github.username}</span>
            </a>

            <a
              href={portfolioData.socials.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => sound.playHover()}
              onClick={() => sound.playClick()}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/10 border border-white/10 text-xs font-mono text-[#56C8FF] hover:text-[#56C8FF] transition-all cursor-pointer"
            >
              <Linkedin className="w-3.5 h-3.5 text-[#56C8FF]" />
              <span>LinkedIn/s-gokul</span>
            </a>
          </div>
        </div>

        {/* Right Column: 3D Interactive Digital Avatar Core */}
        <div className="lg:col-span-5 relative w-full flex items-center justify-center">
          <HeroScene />
        </div>
      </div>

      {/* Elegant Scroll Indicator */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-8">
        <button
          onClick={() => scrollTo('about')}
          onMouseEnter={() => sound.playHover()}
          className="group flex flex-col items-center gap-2 text-white/40 hover:text-[#56C8FF] transition-colors cursor-pointer"
          aria-label="Scroll to About Me"
        >
          <span className="font-mono text-[11px] tracking-widest uppercase">
            Scroll To Explore
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce text-[#56C8FF]" />
        </button>
      </div>
    </section>
  );
}
