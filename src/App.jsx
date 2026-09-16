import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import ParticleCanvas from './components/ParticleCanvas';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import ProjectModal from './components/ProjectModal';
import ResumeModal from './components/ResumeModal';
import ContactSection from './components/ContactSection';
import ThemeCustomizer from './components/ThemeCustomizer';
import Toast from './components/Toast';

function AppContent() {
  return (
    <div className="relative min-h-screen bg-[#070709] text-white selection:bg-accent selection:text-black overflow-x-hidden bg-grid-pattern">
      <ParticleCanvas />
      <Navbar />

      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      {/* Footer (Matching Screenshot 2) */}
      <footer className="py-12 bg-[#070709] border-t border-white/10 relative z-10 font-mono text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-6 space-y-8">
          {/* Upper Footer Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-white/5">
            {/* Status Indicator */}
            <div className="flex items-center gap-2.5 font-bold tracking-widest text-white uppercase">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>AVAILABLE — FREELANCE & FULL-TIME</span>
            </div>

            {/* Direct Links */}
            <div className="flex items-center gap-8 font-bold tracking-widest text-slate-300 uppercase">
              <a
                href="https://github.com/lakshay637"
                target="_blank"
                rel="noreferrer"
                className="hover:text-accent transition"
              >
                GITHUB
              </a>
              <a
                href="https://www.linkedin.com/in/lakshay-bansal-a8959a2a1"
                target="_blank"
                rel="noreferrer"
                className="hover:text-accent transition"
              >
                LINKEDIN
              </a>
              <a
                href="tel:+918273122223"
                className="hover:text-accent transition text-slate-200"
              >
                +91 8273122223
              </a>
            </div>
          </div>

          {/* Lower Footer Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <div>
              © {new Date().getFullYear()} Lakshay Bansal. All rights reserved.
            </div>
            <div>
              Built with React - Tailwind CSS
            </div>
          </div>
        </div>
      </footer>

      {/* Global Drawers & Modals */}
      <ProjectModal />
      <ResumeModal />
      <ThemeCustomizer />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
