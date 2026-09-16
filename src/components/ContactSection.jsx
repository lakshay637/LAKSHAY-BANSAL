import React, { useState } from 'react';
import { ArrowUpRight, Copy, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ContactSection() {
  const { addToast } = useTheme();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('lakshayb.dev@gmail.com');
    setCopied(true);
    addToast('Copied email to clipboard: lakshayb.dev@gmail.com', 'success');
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section id="contact" className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5 relative z-10 bg-[#070709]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Subtag, Giant Headline, Subtitle & Action Pills */}
        <div className="lg:col-span-7 space-y-8">
          {/* Subtag */}
          <div className="flex items-center gap-2">
            <span className="text-accent font-mono text-xs font-bold uppercase tracking-widest">
              ── 05 — LET'S WORK TOGETHER
            </span>
          </div>

          {/* Giant Display Headline: START A PROJECT (Matching Screenshot 1) */}
          <div>
            <h2 className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tight text-white uppercase leading-[0.95]">
              START A<br />
              <span className="text-outline font-sans italic tracking-wide">
                PROJECT
              </span>
            </h2>
          </div>

          {/* Subtitle */}
          <p className="text-slate-400 text-base sm:text-lg max-w-lg leading-relaxed font-normal">
            Open to freelance contracts, full-time roles, and collaboration on ambitious, boundary-pushing digital products.
          </p>

          {/* Email Action Pill & Copy Pill (Matching Screenshot 1) */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {/* Direct Email Pill */}
            <a
              href="mailto:lakshayb.dev@gmail.com"
              className="px-6 py-3.5 rounded-full bg-[#12121a] hover:bg-[#1a1a24] border border-white/10 text-white font-mono text-xs sm:text-sm font-semibold transition flex items-center gap-2 shadow-lg group hover:border-accent/50"
            >
              <span>lakshayb.dev@gmail.com</span>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
            </a>

            {/* Copy Email Button */}
            <button
              onClick={handleCopy}
              className="px-5 py-3.5 rounded-full bg-[#12121a] hover:bg-[#1a1a24] border border-white/10 text-slate-300 font-mono text-xs font-semibold transition flex items-center gap-2 hover:border-white/30 shadow-lg"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Right Column: High-Impact Portrait (Matching Screenshot 1) */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-md rounded-[32px] overflow-hidden border border-white/10 bg-gradient-to-b from-[#14141d] to-[#0a0a0f] shadow-2xl group hover:border-accent/40 transition duration-500">
            <img
              src="profile.jpg"
              alt="Lakshay Bansal"
              className="w-full h-[480px] sm:h-[540px] object-cover object-top group-hover:scale-105 transition duration-700"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-transparent to-transparent opacity-60"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
