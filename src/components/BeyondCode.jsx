import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { sound } from '../utils/audio';
import {
  Brain,
  Sparkles,
  MessageSquare,
  Users2,
  Shuffle,
  GraduationCap,
  Presentation,
  Clock,
  Compass,
  Check
} from 'lucide-react';

export default function BeyondCode() {
  const [activeStrength, setActiveStrength] = useState(null);

  const iconMap = {
    Brain: Brain,
    Sparkles: Sparkles,
    MessageSquare: MessageSquare,
    Users2: Users2,
    Shuffle: Shuffle,
    GraduationCap: GraduationCap,
    Presentation: Presentation,
    Clock: Clock,
    Compass: Compass
  };

  const strengths = portfolioData.beyondTheCode;

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-[#0A0D16]">
      {/* Background radial gradient */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-[#9370DB]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#56C8FF] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>HOLISTIC CAPABILITY // MINDSET & LEADERSHIP</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            BEYOND THE CODE
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mt-2 font-normal">
            The collaborative, analytical, and communicative strengths that translate technical code into cohesive, real-world solutions.
          </p>
        </div>

        {/* Interactive Strengths Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {strengths.map((item, idx) => {
            const Icon = iconMap[item.icon] || Brain;
            const isActive = activeStrength === idx;

            return (
              <div
                key={idx}
                onClick={() => {
                  sound.playClick();
                  setActiveStrength(isActive ? null : idx);
                }}
                onMouseEnter={() => sound.playHover()}
                className={`glass-panel p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between group ${
                  isActive
                    ? 'border-[#56C8FF] bg-[#151923] shadow-[0_0_25px_rgba(86,200,255,0.2)]'
                    : 'border-white/10 hover:border-white/25 hover:bg-white/[0.04]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="p-3 rounded-xl border transition-transform group-hover:scale-110"
                      style={{
                        backgroundColor: `${item.color}15`,
                        borderColor: `${item.color}35`,
                        color: item.color
                      }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest">
                      0{idx + 1} // MINDSET
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#56C8FF] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between font-mono text-[11px] text-white/40">
                  <span>Professional Attribute</span>
                  <span className="text-[#56C8FF] opacity-0 group-hover:opacity-100 transition-opacity">
                    Applied in 25+ Sprints
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
