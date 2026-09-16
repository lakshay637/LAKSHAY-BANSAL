import React, { useState } from 'react';
import { Briefcase, Calendar, ChevronRight, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const EXPERIENCE_DATA = [
  {
    role: 'Full Stack Web Developer',
    company: 'Freelance & Client Solutions',
    period: '2023 — Present',
    location: 'Remote',
    description: 'Architecting and deploying customized web applications, API integrations, and developer infrastructure for clients globally.',
    highlights: [
      'Designed and deployed responsive MERN stack web applications with 99.9% uptime across Vercel and AWS EC2.',
      'Optimized MongoDB indexing strategies and Express routing middleware, resulting in a 30% speed improvement on core API endpoints.',
      'Integrated Stripe, OAuth 2.0, and Socket.io for real-time payments, authentication, and messaging features.'
    ],
    skills: ['React', 'Node.js', 'Express', 'MongoDB', 'AWS', 'Tailwind']
  },
  {
    role: 'Frontend Developer Intern',
    company: 'Tech Solutions Inc.',
    period: '2022 — 2023',
    location: 'Hybrid',
    description: 'Collaborated with senior software engineers to build responsive user interfaces and integrate backend REST endpoints.',
    highlights: [
      'Built reusable UI component libraries with React and Tailwind CSS, reducing boilerplate code by 25%.',
      'Integrated REST API endpoints with robust error boundary handling and loading state fallbacks.',
      'Audited web accessibility compliance (WCAG 2.1 AA) across primary consumer-facing web flows.'
    ],
    skills: ['JavaScript ES6+', 'React.js', 'CSS Modules', 'Git', 'REST APIs']
  }
];

export default function ExperienceSection() {
  const { addToast } = useTheme();
  const [selectedIdx, setSelectedIdx] = useState(0);

  return (
    <section id="experience" className="py-24 px-6 max-w-6xl mx-auto border-t border-white/5 relative z-10">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-10">
        <span className="text-accent font-mono text-sm tracking-wider">03.</span>
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">Work Experience</h2>
        <div className="h-px bg-white/10 flex-grow max-w-xs"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Timeline Navigation Sidebar */}
        <div className="lg:col-span-4 space-y-3">
          {EXPERIENCE_DATA.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSelectedIdx(idx);
                addToast(`Selected experience: ${item.role} at ${item.company}`, 'info');
              }}
              className={`w-full text-left p-5 rounded-2xl transition duration-200 border flex flex-col justify-between ${
                selectedIdx === idx
                  ? 'glass-panel border-accent/50 bg-accent/10 shadow-lg shadow-accent/10'
                  : 'bg-[#0e0e14] border-white/5 hover:border-white/15 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full ${
                  selectedIdx === idx ? 'bg-accent text-black font-bold' : 'bg-white/5 text-slate-400'
                }`}>
                  {item.period}
                </span>
                <ChevronRight className={`w-4 h-4 ${selectedIdx === idx ? 'text-accent' : 'text-slate-600'}`} />
              </div>
              <h3 className="text-base font-bold text-white mb-0.5">{item.role}</h3>
              <p className="text-xs text-slate-400 font-medium">{item.company}</p>
            </button>
          ))}
        </div>

        {/* Selected Role Detail Panel */}
        <div className="lg:col-span-8 glass-card p-8 rounded-3xl border border-white/10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-5">
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">
                {EXPERIENCE_DATA[selectedIdx].role} <span className="text-accent">@ {EXPERIENCE_DATA[selectedIdx].company}</span>
              </h3>
              <p className="text-xs text-slate-400 font-mono flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-accent" /> {EXPERIENCE_DATA[selectedIdx].period} | Location: {EXPERIENCE_DATA[selectedIdx].location}
              </p>
            </div>
          </div>

          <p className="text-slate-300 text-sm leading-relaxed">
            {EXPERIENCE_DATA[selectedIdx].description}
          </p>

          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-accent uppercase tracking-wider">
              Key Contributions & Impact
            </h4>
            <div className="space-y-2.5">
              {EXPERIENCE_DATA[selectedIdx].highlights.map((h, hIdx) => (
                <div key={hIdx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  <div className="p-1 rounded-full bg-accent/10 text-accent shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-white/5">
            <span className="text-xs font-mono text-slate-400 block mb-2">Technologies Used:</span>
            <div className="flex flex-wrap gap-2">
              {EXPERIENCE_DATA[selectedIdx].skills.map((s, sIdx) => (
                <span key={sIdx} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-mono text-slate-200">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
