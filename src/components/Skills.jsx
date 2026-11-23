import React, { useState } from 'react';
import SkillGalaxy from './3d/SkillGalaxy';
import { portfolioData } from '../data/portfolioData';
import { sound } from '../utils/audio';
import { Sparkles, Grid3X3, Orbit, Layers, ChevronRight, Terminal } from 'lucide-react';

export default function Skills() {
  const [viewMode, setViewMode] = useState('3d'); // '3d' | 'grid'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const categories = portfolioData.skills.categories;

  const filteredCategories =
    selectedCategory === 'all'
      ? categories
      : categories.filter((c) => c.id === selectedCategory);

  return (
    <section id="skills" className="relative py-24 sm:py-32 overflow-hidden bg-[#080A10]">
      {/* Background radial gradients */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#9370DB]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#56C8FF]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header & View Mode Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#56C8FF] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>INTERACTIVE SKILL UNIVERSE // MULTI-TIER ECOSYSTEM</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              TECHNICAL ARCHITECTURE & CAPABILITIES
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl mt-2 font-normal">
              Organized into functional domain nodes. Explore in real-time 3D constellation or inspect category matrices.
            </p>
          </div>

          {/* Toggle between 3D Constellation and Structured Grid */}
          <div className="flex items-center gap-2 bg-[#151923] p-1.5 rounded-xl border border-white/10 self-start md:self-auto">
            <button
              onClick={() => {
                sound.playClick();
                setViewMode('3d');
              }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                viewMode === '3d'
                  ? 'bg-[#56C8FF] text-black font-bold shadow-[0_0_15px_rgba(86,200,255,0.4)]'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <Orbit className="w-3.5 h-3.5" />
              <span>3D Constellation</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setViewMode('grid');
              }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-[#56C8FF] text-black font-bold shadow-[0_0_15px_rgba(86,200,255,0.4)]'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <Grid3X3 className="w-3.5 h-3.5" />
              <span>Structured Grid</span>
            </button>
          </div>
        </div>

        {/* View Content */}
        {viewMode === '3d' ? (
          <SkillGalaxy
            selectedCategory={selectedCategory}
            onSelectCategory={(catId) => setSelectedCategory(catId)}
          />
        ) : (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Category Filter Tabs in Grid View */}
            <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-white/10 font-mono text-xs">
              <button
                onClick={() => {
                  sound.playClick();
                  setSelectedCategory('all');
                }}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-white/20 text-white font-bold'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                All Domains
              </button>
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedCategory(c.id);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    selectedCategory === c.id
                      ? 'bg-white/20 text-white font-bold'
                      : 'text-white/50 hover:text-white'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color }} />
                  <span>{c.name}</span>
                </button>
              ))}
            </div>

            {/* Categorized Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCategories.map((cat) => (
                <div
                  key={cat.id}
                  className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all duration-300"
                >
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: cat.color }}
                        />
                        <h3 className="font-mono text-xs font-bold text-white tracking-wider">
                          {cat.name}
                        </h3>
                      </div>
                      <span className="font-mono text-[10px] text-white/40">
                        {cat.skills.length} Techs
                      </span>
                    </div>

                    <div className="space-y-3">
                      {cat.skills.map((skill, sIdx) => (
                        <div
                          key={sIdx}
                          onMouseEnter={() => {
                            sound.playHover();
                            setHoveredSkill(skill);
                          }}
                          className="p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/20 hover:bg-white/[0.05] transition-all group cursor-default"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-sm text-white group-hover:text-[#56C8FF] transition-colors">
                              {skill.name}
                            </span>
                            <span
                              className="font-mono text-[10px] px-2 py-0.5 rounded border"
                              style={{
                                color: cat.color,
                                borderColor: `${cat.color}40`,
                                backgroundColor: `${cat.color}15`
                              }}
                            >
                              {skill.level}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mt-1.5 leading-relaxed font-normal">
                            {skill.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Micro footer note */}
        <div className="mt-8 flex items-center justify-between text-xs font-mono text-white/40 border-t border-white/5 pt-4">
          <span>* Skill proficiencies represent active applied experience in projects & hackathons.</span>
          <span className="text-[#56C8FF]">Continuous Skill Expansion</span>
        </div>
      </div>
    </section>
  );
}
