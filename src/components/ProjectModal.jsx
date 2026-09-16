import React, { useEffect } from 'react';
import { X, ExternalLink, Github, CheckCircle2, Zap, Layers } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ProjectModal() {
  const { activeProjectModal, setActiveProjectModal, addToast } = useTheme();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveProjectModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setActiveProjectModal]);

  if (!activeProjectModal) return null;

  const project = activeProjectModal;
  const Icon = project.icon || Layers;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      {/* Modal Card Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0e0e14] border border-white/15 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 scrollbar-thin"
      >
        {/* Close Button */}
        <button
          onClick={() => setActiveProjectModal(null)}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-start gap-4 pr-8">
          <div className="p-3 rounded-2xl bg-accent/10 border border-accent/20 text-accent">
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20">
                {project.category}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              {project.title}
            </h2>
          </div>
        </div>

        {/* Image Preview Banner */}
        <div className="relative rounded-2xl overflow-hidden aspect-video border border-white/10 bg-[#121218]">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Technical Highlights / Metrics */}
        {project.metrics && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {project.metrics.map((metric, mIdx) => (
              <div
                key={mIdx}
                className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2 text-xs font-mono text-accent"
              >
                <Zap className="w-4 h-4 text-accent shrink-0" />
                <span>{metric}</span>
              </div>
            ))}
          </div>
        )}

        {/* Detailed Narrative */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
            Project Architecture & Specifications
          </h4>
          <p className="text-slate-300 text-sm leading-relaxed">
            {project.fullDesc}
          </p>
        </div>

        {/* Key Features Checklist */}
        {project.features && (
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Key Capabilities
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.features.map((feat, fIdx) => (
                <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tech Stack Chips */}
        <div className="space-y-2">
          <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider">
            Technologies Utilized
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((t, idx) => (
              <span key={idx} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-mono text-slate-200">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
          <button
            onClick={() => {
              addToast(`Launching demo preview for ${project.title}`, 'success');
            }}
            className="px-6 py-3 rounded-xl bg-accent hover:opacity-90 text-black font-extrabold text-xs transition flex items-center gap-2 shadow-md shadow-accent/20"
          >
            <ExternalLink className="w-4 h-4" /> Open Live Application
          </button>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs transition flex items-center gap-2"
          >
            <Github className="w-4 h-4" /> Inspect Source Code
          </a>
        </div>
      </div>
    </div>
  );
}
