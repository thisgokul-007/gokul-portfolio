import React, { useEffect, useState, useRef } from 'react';
import { portfolioData } from '../data/portfolioData';
import { sound } from '../utils/audio';
import { GraduationCap, Award, Cpu, Code, Lightbulb, Sparkles, Terminal, BookOpen, Layers } from 'lucide-react';

export default function About() {
  const sectionRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState({
    cgpa: 0,
    hackathons: 0,
    projects: 0,
    nptel: 0
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          // Animate counters
          const duration = 1800;
          const startTime = performance.now();

          const updateCounters = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const ease = 1 - Math.pow(1 - progress, 3);

            setCounts({
              cgpa: Number((8.38 * ease).toFixed(2)),
              hackathons: Math.floor(5 * ease),
              projects: Math.floor(6 * ease),
              nptel: Math.floor(2 * ease)
            });

            if (progress < 1) {
              requestAnimationFrame(updateCounters);
            } else {
              setCounts({
                cgpa: 8.38,
                hackathons: 5,
                projects: 6,
                nptel: 2
              });
            }
          };

          requestAnimationFrame(updateCounters);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section id="about" ref={sectionRef} className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#56C8FF]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#56C8FF] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ABOUT S. GOKUL // SYSTEM PHILOSOPHY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            ENGINEERING THROUGH EXPERIENTIAL BUILDING
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mt-3 font-normal">
            A developer mindset forged by hackathons, hands-on project building, continuous experimentation, and academic discipline.
          </p>
        </div>

        {/* Story & Interactive Visual Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          {/* Main Story Narrative */}
          <div className="lg:col-span-7 glass-panel rounded-2xl p-6 sm:p-8 border border-white/10 flex flex-col justify-between">
            <div className="space-y-5 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              <p className="first-letter:text-4xl first-letter:font-bold first-letter:text-[#56C8FF] first-letter:mr-2 first-letter:float-left">
                {portfolioData.personal.aboutStory}
              </p>
            </div>

            {/* Core Values / Methodology Pills */}
            <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                <Code className="w-4 h-4 text-[#56C8FF] mb-1.5" />
                <h4 className="font-mono text-xs font-bold text-white uppercase">Learn By Building</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Code prototypes over passive theory.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                <Cpu className="w-4 h-4 text-[#9370DB] mb-1.5" />
                <h4 className="font-mono text-xs font-bold text-white uppercase">AI Integration</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Infusing intelligence into software.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                <Lightbulb className="w-4 h-4 text-[#50FA7B] mb-1.5" />
                <h4 className="font-mono text-xs font-bold text-white uppercase">Hackathon Agility</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Rapid turnaround under tight deadlines.</p>
              </div>
            </div>
          </div>

          {/* Abstract 3D Architecture Visual Panel (No portrait) */}
          <div className="lg:col-span-5 glass-panel-glow rounded-2xl p-6 sm:p-8 border border-white/15 flex flex-col justify-between bg-gradient-to-br from-[#151923]/90 to-[#080A10]/95">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#FF5555]" />
                <span className="w-3 h-3 rounded-full bg-[#F1FA8C]" />
                <span className="w-3 h-3 rounded-full bg-[#50FA7B]" />
              </div>
              <span className="font-mono text-xs text-[#56C8FF]">STUDENT_DEV_SPEC.json</span>
            </div>

            {/* Terminal Code Snapshot */}
            <div className="my-6 font-mono text-xs text-slate-300 space-y-2 bg-black/60 p-4 rounded-xl border border-white/5 overflow-x-auto">
              <div className="text-white/40">// Verified Academic & Dev Matrix</div>
              <div><span className="text-[#FF79C6]">const</span> <span className="text-[#56C8FF]">developer</span> = &#123;</div>
              <div className="pl-4">name: <span className="text-[#F1FA8C]">"S. GOKUL"</span>,</div>
              <div className="pl-4">degree: <span className="text-[#F1FA8C]">"B.Tech Information Technology"</span>,</div>
              <div className="pl-4">college: <span className="text-[#F1FA8C]">"Dr. N.G.P. Institute of Tech"</span>,</div>
              <div className="pl-4">currentSem: <span className="text-[#BD93F9]">"Sem 3 (Year 2)"</span>,</div>
              <div className="pl-4">cgpa: <span className="text-[#50FA7B]">8.38</span>,</div>
              <div className="pl-4">graduation: <span className="text-[#56C8FF]">2029</span>,</div>
              <div className="pl-4">orientation: <span className="text-[#FFB86C]">"Software & AI Problem Solver"</span></div>
              <div>&#125;;</div>
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-white/50 pt-2 border-t border-white/5">
              <span>Status: Second Year Active</span>
              <span className="text-[#56C8FF]">Dr. N.G.P. IT Coimbatore</span>
            </div>
          </div>
        </div>

        {/* Animated Numerical Counters Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {/* CGPA Counter */}
          <div
            onMouseEnter={() => sound.playHover()}
            className="glass-panel p-5 sm:p-6 rounded-2xl border border-white/10 hover:border-[#56C8FF]/50 transition-all duration-300 group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs text-white/50 uppercase tracking-wider">
                Current Standing
              </span>
              <GraduationCap className="w-4 h-4 text-[#56C8FF] group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white group-hover:text-[#56C8FF] transition-colors">
              {counts.cgpa}
              <span className="text-lg sm:text-xl font-normal text-white/40 ml-1">/10</span>
            </div>
            <p className="text-xs text-[#C0C6D4] mt-2 font-medium">
              B.Tech IT CGPA (Sem 3)
            </p>
          </div>

          {/* Hackathons Counter */}
          <div
            onMouseEnter={() => sound.playHover()}
            className="glass-panel p-5 sm:p-6 rounded-2xl border border-white/10 hover:border-[#9370DB]/50 transition-all duration-300 group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs text-white/50 uppercase tracking-wider">
                Participations
              </span>
              <Award className="w-4 h-4 text-[#9370DB] group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white group-hover:text-[#9370DB] transition-colors">
              {counts.hackathons}
            </div>
            <p className="text-xs text-[#C0C6D4] mt-2 font-medium">
              Hackathons Participated
            </p>
          </div>

          {/* Workshops Counter */}
          <div
            onMouseEnter={() => sound.playHover()}
            className="glass-panel p-5 sm:p-6 rounded-2xl border border-white/10 hover:border-[#50FA7B]/50 transition-all duration-300 group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs text-white/50 uppercase tracking-wider">
                Featured Projects
              </span>
              <Cpu className="w-4 h-4 text-[#50FA7B] group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white group-hover:text-[#50FA7B] transition-colors">
              {counts.projects}
            </div>
            <p className="text-xs text-[#C0C6D4] mt-2 font-medium">
              Software Projects Built
            </p>
          </div>

          {/* NPTEL Courses Counter */}
          <div
            onMouseEnter={() => sound.playHover()}
            className="glass-panel p-5 sm:p-6 rounded-2xl border border-white/10 hover:border-[#FFB86C]/50 transition-all duration-300 group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs text-white/50 uppercase tracking-wider">
                Certifications
              </span>
              <Lightbulb className="w-4 h-4 text-[#FFB86C] group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white group-hover:text-[#FFB86C] transition-colors">
              {counts.nptel}
            </div>
            <p className="text-xs text-[#C0C6D4] mt-2 font-medium">
              NPTEL Courses Completed
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
