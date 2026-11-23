import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { sound } from '../utils/audio';
import {
  BrainCircuit,
  TerminalSquare,
  BarChart3,
  Code,
  Smartphone,
  Layers,
  Zap,
  Flame,
  Sparkles,
  Compass
} from 'lucide-react';

export default function Interests() {
  const [activeInterest, setActiveInterest] = useState(null);

  const iconMap = {
    BrainCircuit: BrainCircuit,
    TerminalSquare: TerminalSquare,
    BarChart3: BarChart3,
    Code: Code,
    Smartphone: Smartphone,
    Layers: Layers,
    Zap: Zap,
    Flame: Flame
  };

  const interests = portfolioData.areasOfInterest;

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-[#080A10]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-[#56C8FF]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#56C8FF] mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>TECHNOLOGICAL HORIZON // CURIOSITY DRIVERS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            AREAS OF INTELLECTUAL INTEREST
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mt-2 font-normal">
            Domains where I actively explore papers, prototype systems, and experiment with cutting-edge developer primitives.
          </p>
        </div>

        {/* Dynamic Interactive Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {interests.map((item, idx) => {
            const Icon = iconMap[item.icon] || Sparkles;
            const isHovered = activeInterest === idx;

            return (
              <div
                key={idx}
                onMouseEnter={() => {
                  sound.playHover();
                  setActiveInterest(idx);
                }}
                onMouseLeave={() => setActiveInterest(null)}
                className={`glass-panel p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between group cursor-default relative overflow-hidden ${
                  isHovered
                    ? 'border-[#56C8FF] bg-[#151923] -translate-y-1 shadow-[0_0_20px_rgba(86,200,255,0.2)]'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-white/5 text-[#56C8FF] border border-white/10 group-hover:scale-110 group-hover:bg-[#56C8FF]/10 transition-all">
                      <Icon className="w-5 h-5" />
                    </div>

                    <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/50 border border-white/10">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-[#56C8FF] transition-colors">
                    {item.name}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 font-mono text-[10px] text-white/30 uppercase tracking-wider flex items-center justify-between">
                  <span>Domain Focus</span>
                  <span className="text-[#9370DB]">Active</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
