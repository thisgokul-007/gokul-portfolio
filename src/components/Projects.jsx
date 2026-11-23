import React, { useState } from 'react';
import ProjectVisual3D from './3d/ProjectVisual3D';
import ProjectModal from './ProjectModal';
import { portfolioData } from '../data/portfolioData';
import { sound } from '../utils/audio';
import { Layers, Sparkles, ExternalLink, ChevronRight, Eye, Code2 } from 'lucide-react';
import { Github } from './Icons';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState('all');

  const projects = portfolioData.projects;

  const filters = [
    { id: 'all', label: 'All Projects (6)' },
    { id: 'ai', label: 'AI & Machine Learning' },
    { id: 'web', label: 'Web & Platforms' },
    { id: 'iot', label: 'IoT & Systems' }
  ];

  const filteredProjects = projects.filter((p) => {
    if (filter === 'all') return true;
    if (filter === 'ai') return p.category.toLowerCase().includes('ai') || p.technologies.some(t => t.toLowerCase().includes('ai') || t.toLowerCase().includes('gemini'));
    if (filter === 'web') return p.technologies.some(t => t.toLowerCase().includes('react') || t.toLowerCase().includes('vite'));
    if (filter === 'iot') return p.technologies.some(t => t.toLowerCase().includes('esp32') || t.toLowerCase().includes('sensor'));
    return true;
  });

  return (
    <section id="projects" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background radial ambient lights */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-[#56C8FF]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#56C8FF] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>PROJECT SHOWCASE // PRODUCTION & PROTOTYPES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              FEATURED ENGINEERING SYSTEMS
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl mt-2 font-normal">
              From AI-powered child wellness and shopping decision matrix engines to industrial IoT and GovTech automation.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 bg-[#151923] p-1.5 rounded-xl border border-white/10 self-start md:self-auto">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => {
                  sound.playClick();
                  setFilter(f.id);
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  filter === f.id
                    ? 'bg-[#56C8FF] text-black font-bold shadow-[0_0_15px_rgba(86,200,255,0.4)]'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-panel rounded-2xl p-6 sm:p-7 border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all duration-300 group hover:shadow-[0_0_30px_rgba(86,200,255,0.1)] relative"
            >
              {/* Card Header */}
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#56C8FF] tracking-widest">
                      {project.number} // PROJECT
                    </span>
                    <span className="text-white/20">•</span>
                    <span className="font-mono text-[11px] text-white/50 uppercase">
                      {project.category}
                    </span>
                  </div>

                  <span
                    className="font-mono text-[10px] px-2.5 py-0.5 rounded-full border font-medium"
                    style={{
                      color: project.statusColor,
                      borderColor: `${project.statusColor}40`,
                      backgroundColor: `${project.statusColor}10`
                    }}
                  >
                    {project.status}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-white group-hover:text-[#56C8FF] transition-colors mb-1.5">
                  {project.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#C0C6D4] italic font-normal mb-4">
                  "{project.tagline}"
                </p>

                {/* 3D Visualizer Simulation */}
                <div className="mb-4">
                  <ProjectVisual3D
                    visualType={project.visualType}
                    themeColor={project.themeColor}
                    secondaryColor={project.secondaryColor}
                  />
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal mb-4">
                  {project.description}
                </p>

                {/* Highlights / Features (sample of 3) */}
                <div className="space-y-1.5 mb-5">
                  {project.features.slice(0, 3).map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#56C8FF] mt-1.5 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                  {project.features.length > 3 && (
                    <div className="text-[11px] font-mono text-[#56C8FF] pl-3.5">
                      + {project.features.length - 3} more engineering capabilities
                    </div>
                  )}
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.technologies.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-0.5 rounded bg-white/[0.04] border border-white/5 font-mono text-[11px] text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Card Actions */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                <button
                  onClick={() => {
                    sound.playClick();
                    setSelectedProject(project);
                  }}
                  onMouseEnter={() => sound.playHover()}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/15 text-white font-mono text-xs font-semibold border border-white/15 transition-all hover:border-[#56C8FF]/50 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-[#56C8FF]" />
                  <span>Inspect Architecture & Specs</span>
                </button>

                <a
                  href={portfolioData.socials.github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => sound.playHover()}
                  onClick={() => sound.playClick()}
                  className="flex items-center gap-1.5 text-xs font-mono text-white/50 hover:text-white transition-colors cursor-pointer"
                  title="View Developer Code on GitHub"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">GitHub</span>
                  <ExternalLink className="w-3 h-3 text-white/30" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Project Inspector Modal */}
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </div>
    </section>
  );
}
