import React, { useEffect } from 'react';
import ProjectVisual3D from './3d/ProjectVisual3D';
import { portfolioData } from '../data/portfolioData';
import { sound } from '../utils/audio';
import { X, CheckCircle2, Cpu, Layers, ExternalLink, AlertCircle } from 'lucide-react';
import { Github } from './Icons';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto glass-panel-glow rounded-2xl p-6 sm:p-8 border border-white/20 shadow-2xl bg-[#080A10]/95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs text-[#56C8FF] tracking-wider">
                PROJECT {project.number}
              </span>
              <span className="text-white/30">•</span>
              <span
                className="text-xs px-2.5 py-0.5 rounded-full font-mono font-medium border"
                style={{
                  color: project.statusColor,
                  borderColor: `${project.statusColor}50`,
                  backgroundColor: `${project.statusColor}15`
                }}
              >
                {project.status}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {project.title}
            </h2>
            <p className="text-sm text-[#C0C6D4] mt-1 font-medium">
              {project.tagline || project.category}
            </p>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors border border-white/10"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3D Visualizer Preview Banner */}
        <div className="my-6">
          <ProjectVisual3D
            visualType={project.visualType}
            themeColor={project.themeColor}
            secondaryColor={project.secondaryColor}
          />
        </div>

        {/* Problem & Solution Dual Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
            <h4 className="font-mono text-xs uppercase text-[#FF79C6] tracking-wider mb-2 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5" />
              The Problem
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {project.problem}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
            <h4 className="font-mono text-xs uppercase text-[#50FA7B] tracking-wider mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              The Solution
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {project.solution}
            </p>
          </div>
        </div>

        {/* Architecture Pipeline */}
        {project.architecture && (
          <div className="mb-6 p-4 rounded-xl bg-[#151923]/60 border border-[#56C8FF]/20">
            <h4 className="font-mono text-xs uppercase text-[#56C8FF] tracking-wider mb-2 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" />
              System Architecture Flow
            </h4>
            <p className="font-mono text-xs text-white/80 leading-relaxed bg-black/40 p-2.5 rounded-lg border border-white/5">
              {project.architecture}
            </p>
          </div>
        )}

        {/* Core Features */}
        <div className="mb-6">
          <h4 className="font-mono text-xs uppercase text-white/70 tracking-wider mb-3 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#56C8FF]" />
            Key Engineering Features
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {project.features.map((feat, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2 p-2 rounded-lg bg-white/[0.02] border border-white/5 text-xs text-slate-300"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#56C8FF] mt-1.5 flex-shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies Used */}
        <div className="mb-6">
          <h4 className="font-mono text-xs uppercase text-white/70 tracking-wider mb-2">
            Technology Stack & Tools
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-md bg-white/5 border border-white/10 font-mono text-xs text-slate-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
          <div className="flex items-center gap-2 text-xs font-mono text-white/50">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: project.statusColor }} />
            <span>Development Status: <strong className="text-white">{project.status}</strong></span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={portfolioData.socials.github.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-semibold transition-all border border-white/15"
            >
              <Github className="w-3.5 h-3.5" />
              <span>Gokul's GitHub Profile</span>
              <ExternalLink className="w-3 h-3 text-white/50" />
            </a>

            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="px-4 py-2 rounded-xl bg-[#56C8FF] text-black font-semibold text-xs transition-transform hover:scale-105 active:scale-95"
            >
              Done Reading
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
