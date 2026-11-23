import React, { useState, useEffect, useRef } from 'react';
import { portfolioData } from '../data/portfolioData';
import { sound } from '../utils/audio';
import { Code2, Cpu, Lightbulb, Award, Activity } from 'lucide-react';

const iconMap = { Code2, Cpu, Lightbulb, Award };

function AnimatedCounter({ target, duration = 1500, started }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    if (target <= 1) { setCount(target); return; }
    let start = 0;
    const step = Math.ceil(target / (duration / 50));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 50);
    return () => clearInterval(timer);
  }, [target, duration, started]);
  return <>{count}</>;
}

export default function Activities() {
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [countersStarted, setCountersStarted] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setCountersStarted(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const activities = portfolioData.activities.items;

  return (
    <section id="journey" ref={sectionRef} className="relative py-24 sm:py-32 overflow-hidden bg-[#0A0D16]">
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#9370DB]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#56C8FF]/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#56C8FF] mb-4">
            <Activity className="w-3.5 h-3.5" />
            <span>PARTICIPATION & ENGAGEMENT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            {portfolioData.activities.headline}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto mt-3 font-normal">
            {portfolioData.activities.subtitle}
          </p>
        </div>

        {/* 4 Activity Cards in a 2×2 grid on md, 4-col on xl */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {activities.map((item) => {
            const IconComponent = iconMap[item.icon] || Activity;
            const isSelected = selectedActivity?.id === item.id;

            return (
              <div
                key={item.id}
                onClick={() => { sound.playClick(); setSelectedActivity(isSelected ? null : item); }}
                onMouseEnter={() => sound.playHover()}
                className="group relative rounded-2xl p-6 cursor-pointer transition-all duration-400 flex flex-col"
                style={{
                  background: isSelected
                    ? `linear-gradient(135deg, ${item.color}18, rgba(10,13,22,0.95))`
                    : 'linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))',
                  border: isSelected
                    ? `1px solid ${item.color}60`
                    : '1px solid rgba(255,255,255,0.08)',
                  boxShadow: isSelected ? `0 0 32px ${item.color}25, 0 8px 32px rgba(0,0,0,0.4)` : '0 4px 20px rgba(0,0,0,0.3)',
                }}
              >
                {/* Hover glow overlay */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${item.color}10, transparent 70%)` }}
                />

                {/* Icon + category */}
                <div className="flex items-start justify-between mb-6">
                  <div
                    className="p-3 rounded-xl transition-transform group-hover:scale-110 duration-300"
                    style={{ backgroundColor: `${item.color}18`, border: `1px solid ${item.color}30` }}
                  >
                    <IconComponent className="w-5 h-5" style={{ color: item.color }} />
                  </div>
                  <span
                    className="text-[10px] font-mono tracking-widest uppercase px-2 py-1 rounded-md"
                    style={{ color: `${item.color}B0`, background: `${item.color}10` }}
                  >
                    {item.category}
                  </span>
                </div>

                {/* Animated Count */}
                <div className="mb-2">
                  <span
                    className="text-5xl sm:text-6xl font-black font-mono leading-none"
                    style={{ color: isSelected ? item.color : '#FFFFFF' }}
                  >
                    <AnimatedCounter target={item.count} started={countersStarted} />
                  </span>
                </div>

                {/* Label */}
                <h3 className="text-base font-bold text-white mb-3 group-hover:text-white transition-colors">
                  {item.label}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-400 leading-relaxed font-normal flex-1">
                  {item.desc}
                </p>

                {/* Bottom accent line */}
                <div className="mt-5 pt-4 border-t border-white/5">
                  <div
                    className="h-0.5 rounded-full transition-all duration-500"
                    style={{
                      background: `linear-gradient(90deg, ${item.color}, transparent)`,
                      width: isSelected ? '100%' : '30%',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <div className="mt-12 p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-slate-500 font-mono text-center">
          All participation figures represent authentic personal involvement in hackathons, workshops, webinars, and national certification programs.
        </div>
      </div>
    </section>
  );
}
