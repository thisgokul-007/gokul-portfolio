import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { sound } from '../utils/audio';
import { ArrowUp, Heart, Terminal, Sparkles } from 'lucide-react';
import { Github, Linkedin } from './Icons';

export default function Footer() {
  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#05070A] border-t border-white/10 pt-16 pb-12 overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-[#56C8FF]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-white/10">
          {/* Identity & Mission */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#56C8FF] to-[#9370DB] p-[1px]">
                <div className="w-full h-full bg-[#080A10] rounded-[7px] flex items-center justify-center font-mono font-bold text-xs text-[#56C8FF]">
                  G
                </div>
              </div>
              <span className="font-mono text-base font-bold text-white tracking-wider">
                S. GOKUL
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed font-normal">
              B.Tech Information Technology Student at Dr. N.G.P. Institute of Technology, Coimbatore.
              Exploring intelligent architectures, modern web systems, and hackathon solutions.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-[#50FA7B]">
              <span className="w-2 h-2 rounded-full bg-[#50FA7B] animate-pulse" />
              <span>Available for Summer Internships & Hackathons</span>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-mono text-xs uppercase text-white/50 tracking-widest">
              Navigation
            </h4>
            <ul className="space-y-2 font-mono text-xs text-slate-400">
              {['home', 'about', 'skills', 'projects', 'journey', 'certifications', 'contact'].map((id) => (
                <li key={id}>
                  <button
                    onClick={() => {
                      sound.playClick();
                      const el = document.getElementById(id);
                      if (el) {
                        const yOffset = -70;
                        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                        window.scrollTo({ top: y, behavior: 'smooth' });
                      }
                    }}
                    className="hover:text-[#56C8FF] transition-colors capitalize cursor-pointer"
                  >
                    {id}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect & Verified Links */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-mono text-xs uppercase text-white/50 tracking-widest">
              Verified Profiles
            </h4>

            <div className="flex flex-col gap-2.5">
              <a
                href={portfolioData.socials.github.url}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => sound.playHover()}
                onClick={() => sound.playClick()}
                className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/20 text-xs font-mono text-slate-300 hover:text-white transition-all cursor-pointer"
              >
                <Github className="w-4 h-4 text-white" />
                <span>github.com/{portfolioData.socials.github.username}</span>
              </a>

              <a
                href={portfolioData.socials.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => sound.playHover()}
                onClick={() => sound.playClick()}
                className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.03] border border-[#56C8FF]/20 hover:border-[#56C8FF]/40 text-xs font-mono text-[#56C8FF] hover:text-[#56C8FF] transition-all cursor-pointer"
              >
                <Linkedin className="w-4 h-4 text-[#56C8FF]" />
                <span>linkedin.com/in/s-gokul-961855381</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/40">
          <div className="flex items-center gap-2">
            <span>© {currentYear} S. GOKUL</span>
            <span>•</span>
            <span>Crafted with React, Three.js & Tailwind CSS</span>
          </div>

          <button
            onClick={scrollToTop}
            onMouseEnter={() => sound.playHover()}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-[#56C8FF] border border-white/10 transition-all cursor-pointer"
            aria-label="Back to top"
          >
            <span>Back to Orbit</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
