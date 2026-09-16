import React, { useState, useEffect } from 'react';
import { Download, Github, Linkedin, Mail, Phone, ChevronDown, ArrowRight, FileText, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ROLES = [
  'Full Stack MERN Dev',
  'Software Engineer',
  'B.Tech CSE Core (CGPA: 8.1)',
  'C, Java, Python & SQL Dev',
];

export default function HeroSection() {
  const { setResumeModalOpen, addToast } = useTheme();
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = ROLES[roleIndex];
    let timer;

    if (!isDeleting && currentText.length < fullText.length) {
      timer = setTimeout(() => {
        setCurrentText(fullText.substring(0, currentText.length + 1));
      }, 70);
    } else if (isDeleting && currentText.length > 0) {
      timer = setTimeout(() => {
        setCurrentText(fullText.substring(0, currentText.length - 1));
      }, 40);
    } else if (!isDeleting && currentText.length === fullText.length) {
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && currentText.length === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, roleIndex]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('lakshayb.dev@gmail.com');
    addToast('Email copied to clipboard: lakshayb.dev@gmail.com', 'success');
  };

  return (
    <section className="min-h-screen flex items-center justify-center pt-24 pb-12 px-6 relative z-10 overflow-hidden bg-[#070709]">
      {/* Ambient background glows */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-10 right-1/4 w-[600px] h-[600px] bg-yellow-500/10 rounded-full blur-[160px]"></div>
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[160px]"></div>
        <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-purple-600/10 rounded-full blur-[150px]"></div>
      </div>

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-12">
        {/* Left Column: Hero Information */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-6 pt-2">
          {/* Availability Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-400 text-xs font-mono font-semibold tracking-wider backdrop-blur-md">
            <span className="w-2.5 h-2.5 rounded-full bg-accent animate-ping"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-accent absolute"></span>
            AVAILABLE FOR OPPORTUNITIES
          </div>

          {/* Main Title & Typewriter */}
          <div className="space-y-1">
            <p className="text-slate-300 text-xl font-medium">Hi, I'm</p>
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tight text-white leading-none">
              Lakshay Bansal
            </h1>
            <h2 className="text-2xl sm:text-4xl font-bold text-slate-200 flex items-center gap-1 pt-2 h-12">
              <span className="text-accent">{currentText}</span>
              <span className="text-accent animate-pulse font-mono">|</span>
            </h2>
          </div>

          {/* Bio text */}
          <p className="text-slate-400 text-base sm:text-lg max-w-xl leading-relaxed font-normal">
            A software engineer specialized in constructing web platforms using the MERN stack, and designing optimized developer systems. I design clean code architectures paired with responsive user design.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#contact"
              className="px-8 py-3.5 rounded-2xl bg-accent hover:bg-yellow-400 text-black font-extrabold text-sm transition-all transform hover:-translate-y-0.5 shadow-xl shadow-yellow-500/20 flex items-center gap-2"
            >
              Hire Me <ArrowRight className="w-4 h-4 ml-0.5" />
            </a>

            <button
              onClick={() => setResumeModalOpen(true)}
              className="px-7 py-3.5 rounded-2xl bg-[#121218] hover:bg-[#181820] border border-white/10 text-slate-200 text-sm font-semibold transition flex items-center gap-2 hover:border-accent/40 shadow-lg"
            >
              <Download className="w-4 h-4 text-accent" /> Download Resume
            </button>
          </div>

          {/* Social Icons Bar */}
          <div className="flex items-center gap-3 pt-6 border-t border-white/5 w-full">
            <a
              href="https://github.com/lakshay637"
              target="_blank"
              rel="noreferrer"
              title="GitHub Profile"
              className="w-11 h-11 rounded-2xl bg-[#121218] border border-white/10 flex items-center justify-center text-slate-300 hover:text-accent hover:border-accent/40 transition shadow-md"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/lakshay-bansal-a8959a2a1"
              target="_blank"
              rel="noreferrer"
              title="LinkedIn Profile"
              className="w-11 h-11 rounded-2xl bg-[#121218] border border-white/10 flex items-center justify-center text-slate-300 hover:text-accent hover:border-accent/40 transition shadow-md"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <button
              onClick={handleCopyEmail}
              title="Copy Email Address (lakshayb.dev@gmail.com)"
              className="w-11 h-11 rounded-2xl bg-[#121218] border border-white/10 flex items-center justify-center text-slate-300 hover:text-accent hover:border-accent/40 transition shadow-md"
            >
              <Mail className="w-5 h-5" />
            </button>
            <a
              href="tel:+918273122223"
              title="Call (+91 8273122223)"
              className="w-11 h-11 rounded-2xl bg-[#121218] border border-white/10 flex items-center justify-center text-slate-300 hover:text-accent hover:border-accent/40 transition shadow-md"
            >
              <Phone className="w-5 h-5" />
            </a>

            <div className="ml-auto text-xs text-slate-400 font-mono flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span> CGPA: 8.1 / 10
            </div>
          </div>
        </div>

        {/* Right Column: High-Definition Portrait with Orbiting Floating Badges */}
        <div className="lg:col-span-5 relative flex justify-center items-center mt-6 lg:mt-0">
          {/* Glow Halo behind photo */}
          <div className="absolute w-[350px] h-[450px] bg-gradient-to-tr from-accent/20 via-blue-500/10 to-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>

          {/* Floating Orbit 1: TS */}
          <div className="absolute top-4 -left-2 sm:-left-6 z-20 px-3.5 py-2 rounded-2xl bg-[#161b26]/90 border border-blue-500/50 backdrop-blur-xl flex items-center gap-2 text-blue-400 font-extrabold text-xs shadow-2xl animate-float-slow hover:scale-110 transition cursor-pointer">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-400"></span> TS
          </div>

          {/* Floating Orbit 2: JS */}
          <div className="absolute top-32 -left-8 sm:-left-10 z-20 px-3.5 py-2 rounded-2xl bg-[#262416]/90 border border-yellow-500/50 backdrop-blur-xl flex items-center gap-2 text-yellow-400 font-extrabold text-xs shadow-2xl animate-float-mid hover:scale-110 transition cursor-pointer">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span> JS
          </div>

          {/* Floating Orbit 3: MongoDB Leaf */}
          <div className="absolute top-6 right-0 sm:-right-4 z-20 p-3 rounded-2xl bg-[#122417]/90 border border-emerald-500/50 backdrop-blur-xl text-emerald-400 shadow-2xl animate-float-slow hover:scale-110 transition cursor-pointer">
            <span className="w-3 h-3 rounded-full bg-emerald-400 block"></span>
          </div>

          {/* Floating Orbit 4: Node.js */}
          <div className="absolute bottom-28 -right-4 sm:-right-8 z-20 px-4 py-2 rounded-2xl bg-[#0d2235]/90 border border-sky-500/50 backdrop-blur-xl text-sky-400 font-bold text-xs shadow-2xl animate-float-mid hover:scale-110 transition cursor-pointer">
            Node.js
          </div>

          {/* Floating Orbit 5: React */}
          <div className="absolute bottom-16 -left-6 sm:-left-10 z-20 px-4 py-2 rounded-2xl bg-[#0f2838]/90 border border-cyan-500/50 backdrop-blur-xl text-cyan-400 font-bold text-xs shadow-2xl animate-float-fast hover:scale-110 transition cursor-pointer">
            React.js
          </div>

          {/* PDF Resume Trigger Badge */}
          <button
            onClick={() => setResumeModalOpen(true)}
            title="Open Resume Document"
            className="absolute bottom-4 right-4 z-20 w-11 h-11 rounded-full bg-white text-rose-600 flex items-center justify-center shadow-2xl hover:scale-110 transition cursor-pointer"
          >
            <FileText className="w-5 h-5" />
          </button>

          {/* High-Definition Photo Container */}
          <div className="relative w-full max-w-sm sm:max-w-md rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-b from-[#161622] to-[#0c0c12] p-2.5 shadow-2xl group hover:border-accent/40 transition duration-500">
            <div className="relative rounded-2xl overflow-hidden aspect-[3/4] bg-[#0c0c10]">
              <img
                src="profile.jpg"
                alt="Lakshay Bansal"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-700"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-transparent to-transparent opacity-80"></div>

              {/* In-Card overlay badge */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#0e0e14]/90 border border-white/10 backdrop-blur-md flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">Lakshay Bansal</h4>
                  <p className="text-xs text-accent font-medium">Full Stack Developer</p>
                </div>
                <div className="w-8 h-8 rounded-lg bg-accent/20 border border-accent/40 flex items-center justify-center text-accent">
                  <Sparkles className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <a
        href="#about"
        className="absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[11px] uppercase tracking-widest text-slate-500 hover:text-accent transition group"
      >
        <span>Scroll Down</span>
        <ChevronDown className="w-4 h-4 text-accent animate-bounce" />
      </a>
    </section>
  );
}
