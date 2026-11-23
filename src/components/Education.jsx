import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { sound } from '../utils/audio';
import { GraduationCap, MapPin, Calendar, Award, BookOpen, CheckCircle, Sparkles } from 'lucide-react';

export default function Education() {
  const edu = portfolioData.education;

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-[#0A0D16]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-[#56C8FF]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#56C8FF] mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>ACADEMIC FOUNDATION // TIMELINE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            EDUCATIONAL JOURNEY
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mt-2 font-normal">
            Formal engineering grounding underpinning software development and AI systems.
          </p>
        </div>

        {/* Education Timeline Card */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Glowing Connector Line */}
          <div className="absolute left-6 sm:left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-[#56C8FF] via-[#9370DB] to-transparent" />

          {/* Dr. N.G.P. IT Card */}
          <div className="relative pl-14 sm:pl-20">
            {/* Timeline Node Badge */}
            <div className="absolute left-3.5 sm:left-5 top-8 w-6 h-6 rounded-full bg-[#080A10] border-2 border-[#56C8FF] flex items-center justify-center -translate-x-1/2 shadow-[0_0_15px_#56C8FF]">
              <div className="w-2 h-2 rounded-full bg-[#50FA7B] animate-ping" />
            </div>

            <div
              onMouseEnter={() => sound.playHover()}
              className="glass-panel-glow rounded-2xl p-6 sm:p-8 border border-white/15 bg-gradient-to-br from-[#151923]/90 to-[#080A10]/95"
            >
              {/* Header Badges */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2 font-mono text-xs text-[#56C8FF]">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{edu.period}</span>
                  <span className="text-white/20">•</span>
                  <span className="text-[#50FA7B]">In Progress</span>
                </div>

                <div className="flex items-center gap-2 font-mono text-xs px-3 py-1 rounded-full bg-[#56C8FF]/10 text-[#56C8FF] border border-[#56C8FF]/30 font-bold">
                  <span>Current CGPA: {edu.cgpa} / 10</span>
                </div>
              </div>

              {/* Institution & Degree */}
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                {edu.degree}
              </h3>

              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-[#C0C6D4] mb-5 font-medium">
                <span className="flex items-center gap-1.5 text-white">
                  <MapPin className="w-3.5 h-3.5 text-[#FF79C6]" />
                  {edu.institution}
                </span>
                <span className="text-white/20">•</span>
                <span className="text-[#9370DB] font-mono">
                  {edu.status}
                </span>
                <span className="text-white/20">•</span>
                <span className="text-white/60 font-mono">
                  Graduation Year: {edu.graduation}
                </span>
              </div>

              {/* Highlights */}
              <div className="space-y-2.5 pt-4 border-t border-white/10">
                {edu.highlights.map((h, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <CheckCircle className="w-4 h-4 text-[#50FA7B] mt-0.5 flex-shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
