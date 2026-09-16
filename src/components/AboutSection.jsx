import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function AboutSection() {
  const { setResumeModalOpen } = useTheme();

  return (
    <section id="about" className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5 relative z-10 bg-[#070709]">
      {/* Sub-header tag */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-accent font-mono text-xs font-bold uppercase tracking-widest">
          ── 01 — PROFILE
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Giant Headline, Status & Intro Card */}
        <div className="lg:col-span-6 space-y-6">
          {/* Giant Display Headline */}
          <div>
            <h2 className="text-5xl sm:text-7xl font-black tracking-tighter text-white uppercase leading-[0.9] font-sans">
              FULL STACK<br />
              <span className="text-white">DEVELOPER</span>
              <span className="text-accent">.</span>
            </h2>
          </div>

          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-400 text-xs font-mono font-semibold tracking-wider">
            <span className="w-2.5 h-2.5 rounded-full bg-accent animate-ping"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-accent absolute"></span>
            AVAILABLE FOR WORK
          </div>

          {/* Glass Card Container */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              <strong className="text-accent font-bold">I'm</strong> a Full Stack Developer who builds modern web applications that are fast, scalable, and user-centric. I work across the entire development stack—from designing databases and APIs to crafting responsive user interfaces—backed by strong analytical skills in C, Java, Python, SQL, and the MERN stack.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#contact"
                className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-yellow-500/40 text-accent font-mono font-bold text-xs transition flex items-center gap-1.5 group"
              >
                GET IN TOUCH <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
              </a>

              <button
                onClick={() => setResumeModalOpen(true)}
                className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 font-mono text-xs font-semibold transition"
              >
                VIEW RESUME 📄
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Embedded Profile Info Window */}
        <div className="lg:col-span-6">
          <div className="rounded-3xl bg-[#0c0c12] border border-yellow-500/30 shadow-2xl p-6 sm:p-8 font-mono text-xs sm:text-sm space-y-4 relative group hover:border-yellow-500/60 transition duration-300">
            {/* Window Header Bar */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
              </div>
              <span className="text-slate-400 font-semibold text-xs">lakshay@portfolio ~ %</span>
              <div></div>
            </div>

            {/* Terminal KV Pairs */}
            <div className="space-y-3 text-slate-300">
              <div className="flex items-start gap-2">
                <span className="text-accent font-bold">&gt; name</span>
                <span className="text-slate-500">:</span>
                <span className="text-emerald-400 font-semibold">"Lakshay Bansal"</span>
              </div>

              <div className="flex items-start gap-2">
                <span className="text-accent font-bold">&gt; role</span>
                <span className="text-slate-500">:</span>
                <span className="text-emerald-400 font-semibold">"Full Stack MERN Developer"</span>
              </div>

              <div className="flex items-start gap-2">
                <span className="text-accent font-bold">&gt; education</span>
                <span className="text-slate-500">:</span>
                <span className="text-emerald-400 font-semibold">"B.Tech CSE Core (CGPA: 8.1/10)"</span>
              </div>

              <div className="flex items-start gap-2">
                <span className="text-accent font-bold">&gt; university</span>
                <span className="text-slate-500">:</span>
                <span className="text-emerald-400 font-semibold">"Noida International University"</span>
              </div>

              <div className="flex items-start gap-2">
                <span className="text-accent font-bold">&gt; location</span>
                <span className="text-slate-500">:</span>
                <span className="text-emerald-400 font-semibold">"Greater Noida, India"</span>
              </div>

              <div className="flex items-start gap-2">
                <span className="text-accent font-bold">&gt; status</span>
                <span className="text-slate-500">:</span>
                <span className="text-emerald-400 font-semibold">"Available for opportunities"</span>
              </div>

              <div className="flex items-start gap-2">
                <span className="text-accent font-bold">&gt; email</span>
                <span className="text-slate-500">:</span>
                <span className="text-emerald-400 font-semibold">"lakshayb.dev@gmail.com"</span>
              </div>

              <div className="flex items-start gap-2">
                <span className="text-accent font-bold">&gt; phone</span>
                <span className="text-slate-500">:</span>
                <span className="text-emerald-400 font-semibold">"+91 8273122223"</span>
              </div>

              <div className="flex items-start gap-2">
                <span className="text-accent font-bold">&gt; dark_mode</span>
                <span className="text-slate-500">:</span>
                <span className="text-emerald-400 font-semibold">"true"</span>
              </div>

              {/* Pulsing Cursor Block */}
              <div className="pt-2 flex items-center gap-2">
                <span className="text-accent font-bold">&gt;</span>
                <span className="w-2.5 h-4 bg-accent animate-pulse inline-block"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
