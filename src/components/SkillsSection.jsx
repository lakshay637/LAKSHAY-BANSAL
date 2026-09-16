import React, { useState } from 'react';
import { Code, Server, Database, Palette, GitBranch, ShieldCheck, Terminal, Search, FileSpreadsheet, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const SKILLS_DATA = [
  // Programming Languages
  { name: 'C Language', category: 'Programming Languages', level: 90, icon: Code, color: 'text-blue-400', desc: 'Core data structures, memory management, CRES Certification' },
  { name: 'Java', category: 'Programming Languages', level: 85, icon: Code, color: 'text-orange-400', desc: 'Object Oriented Programming, Collections framework, Logic building' },
  { name: 'Python', category: 'Programming Languages', level: 88, icon: Code, color: 'text-yellow-400', desc: 'Data handling, Scripting, CRES Python Certification' },
  { name: 'JavaScript', category: 'Programming Languages', level: 92, icon: Code, color: 'text-amber-400', desc: 'ES6+ Syntax, Asynchronous JS, Promises, Event Loop' },
  { name: 'SQL', category: 'Programming Languages', level: 86, icon: Database, color: 'text-cyan-400', desc: 'Relational database queries, Joins, Indexing, Schema design' },

  // Web Development
  { name: 'React.js', category: 'Web Development', level: 92, icon: Palette, color: 'text-cyan-400', desc: 'Component architecture, Hooks, Virtual DOM, Responsive UI' },
  { name: 'Node.js & Express.js', category: 'Web Development', level: 90, icon: Server, color: 'text-emerald-400', desc: 'REST API endpoints, Middleware, Server-side logic' },
  { name: 'MongoDB', category: 'Web Development', level: 88, icon: Database, color: 'text-green-500', desc: 'NoSQL collections, Document schema modeling, Mongoose ODM' },
  { name: 'HTML5 & CSS3', category: 'Web Development', level: 95, icon: Palette, color: 'text-rose-400', desc: 'Semantic layouts, Flexbox/Grid, Animations, Responsive styling' },

  // Tools & Technologies
  { name: 'Postman', category: 'Tools & Tech', level: 94, icon: ShieldCheck, color: 'text-orange-500', desc: 'Postman API Fundamentals Student Expert Certified, API testing' },
  { name: 'GitHub', category: 'Tools & Tech', level: 90, icon: GitBranch, color: 'text-slate-300', desc: 'Version control, Pull requests, Code repositories' },
  { name: 'Advanced MS Excel', category: 'Tools & Tech', level: 85, icon: FileSpreadsheet, color: 'text-emerald-500', desc: 'Data analysis, Formulas, Formatting, Report visualization' },
];

export default function SkillsSection() {
  const { addToast } = useTheme();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Programming Languages', 'Web Development', 'Tools & Tech'];

  const filteredSkills = SKILLS_DATA.filter((skill) => {
    const matchesCategory = activeCategory === 'All' || skill.category === activeCategory;
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          skill.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="skills" className="py-24 px-6 max-w-6xl mx-auto border-t border-white/5 relative z-10">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-10">
        <span className="text-accent font-mono text-sm tracking-wider">02.</span>
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">Technical Skills</h2>
        <div className="h-px bg-white/10 flex-grow max-w-xs"></div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                activeCategory === cat
                  ? 'bg-accent text-black font-bold shadow-md shadow-accent/20'
                  : 'bg-[#0e0e14] text-slate-300 hover:text-white border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative max-w-xs w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search language or tool..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0e0e14] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-accent/60 transition"
          />
        </div>
      </div>

      {/* Grid of Skills */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSkills.map((skill, idx) => {
          const Icon = skill.icon;
          return (
            <div
              key={idx}
              onClick={() => addToast(`Focused: ${skill.name} (${skill.level}% proficiency)`, 'info')}
              className="p-5 rounded-2xl glass-card hover:border-accent/40 transition group cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition">
                      <Icon className={`w-6 h-6 ${skill.color}`} />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white group-hover:text-accent transition">
                        {skill.name}
                      </h4>
                      <span className="text-[11px] text-slate-400 font-mono uppercase tracking-wider">
                        {skill.category}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-accent">
                    {skill.level}%
                  </span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {skill.desc}
                </p>
              </div>

              {/* Progress Meter Bar */}
              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden border border-white/5">
                <div
                  className="bg-accent h-full rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredSkills.length === 0 && (
        <div className="text-center py-12 text-slate-400 font-mono text-xs">
          No matching skills found for "{searchQuery}". Try clearing filters!
        </div>
      )}
    </section>
  );
}
