import React, { useState } from 'react';
import { ShoppingBag, Calculator, ExternalLink, Github, Eye, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const PROJECTS_DATA = [
  {
    id: 'expense-tracker',
    title: 'Expense Tracker Web App',
    category: 'MERN Stack',
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
    shortDesc: 'Developed a responsive expense tracking application featuring secure authentication mechanisms and robust backend APIs.',
    fullDesc: 'A full-featured Expense Tracker built on the MERN stack. Includes user authentication, secure JWT endpoints, MongoDB database modeling for transaction logs, reusable UI component layouts, and comprehensive error handling techniques to ensure overall application stability and performance.',
    metrics: ['Secure Authentication', 'Robust Backend APIs', 'Reusable UI Components'],
    icon: ShoppingBag,
    color: 'text-amber-400',
    demoUrl: '#',
    githubUrl: '#',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
    features: [
      'Developed a responsive expense tracking application featuring secure authentication mechanisms and robust backend APIs.',
      'Improved overall application stability and performance by implementing reusable UI layouts and comprehensive error handling techniques.',
      'RESTful API architecture with MongoDB Mongoose schema modeling.',
      'Instant dashboard analytics and transaction categorization.'
    ]
  },
  {
    id: 'calculator-app',
    title: 'Calculator Web Application',
    category: 'Frontend',
    tags: ['JavaScript', 'HTML5', 'CSS3'],
    shortDesc: 'Built an interactive and highly responsive calculator featuring an intuitive user interface and smooth input animations.',
    fullDesc: 'An interactive web calculator engineered with JavaScript, HTML5, and CSS3. Features custom mathematical validation logic to gracefully handle complex operational sequences and edge cases, ensuring real-time rendering of mathematical calculations.',
    metrics: ['Real-time Calculations', 'Arithmetic Edge Validation', 'Smooth Animations'],
    icon: Calculator,
    color: 'text-cyan-400',
    demoUrl: '#',
    githubUrl: '#',
    image: 'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?auto=format&fit=crop&w=800&q=80',
    features: [
      'Built an interactive and highly responsive calculator application featuring an intuitive user interface and smooth input animations.',
      'Implemented robust arithmetic validation logic to gracefully handle complex operational sequences and edge cases, ensuring real-time rendering of mathematical calculations.',
      'Responsive design styled with pure CSS layout controls.',
      'Keyboard accessibility and keypress event listeners.'
    ]
  }
];

export default function ProjectsSection() {
  const { setActiveProjectModal } = useTheme();
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'MERN Stack', 'Frontend'];

  const filteredProjects = PROJECTS_DATA.filter(
    (p) => activeFilter === 'All' || p.category === activeFilter
  );

  return (
    <section id="projects" className="py-24 px-6 max-w-6xl mx-auto border-t border-white/5 relative z-10">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-10">
        <span className="text-accent font-mono text-sm tracking-wider">04.</span>
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">Featured Projects</h2>
        <div className="h-px bg-white/10 flex-grow max-w-xs"></div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 mb-8">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
              activeFilter === f
                ? 'bg-accent text-black font-bold shadow-md shadow-accent/20'
                : 'bg-[#0e0e14] text-slate-300 hover:text-white border border-white/5'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project) => {
          const Icon = project.icon;
          return (
            <div
              key={project.id}
              className="rounded-3xl glass-card overflow-hidden hover:border-accent/40 transition duration-300 group flex flex-col justify-between"
            >
              {/* Image Preview Header */}
              <div className="relative h-56 overflow-hidden bg-[#121218] border-b border-white/5">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700 opacity-85 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d14] via-transparent to-transparent"></div>

                {/* Floating Quick View overlay button */}
                <button
                  onClick={() => setActiveProjectModal(project)}
                  className="absolute bottom-4 right-4 px-4 py-2 rounded-xl bg-[#0e0e14]/90 border border-white/20 backdrop-blur-md text-xs font-bold text-white hover:text-accent flex items-center gap-1.5 shadow-lg group-hover:border-accent/50 transition"
                >
                  <Eye className="w-3.5 h-3.5 text-accent" /> Quick View
                </button>

                <div className="absolute top-4 left-4 p-2 rounded-xl bg-[#0e0e14]/80 border border-white/10 backdrop-blur-md">
                  <Icon className={`w-5 h-5 ${project.color}`} />
                </div>
              </div>

              {/* Project Card Content */}
              <div className="p-7 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-md bg-accent/10 border border-accent/20 text-accent"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent transition">
                    {project.title}
                  </h3>

                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {project.shortDesc}
                  </p>
                </div>

                {/* Footer Action Links */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5 text-xs font-semibold">
                  <button
                    onClick={() => setActiveProjectModal(project)}
                    className="text-accent hover:underline flex items-center gap-1"
                  >
                    View Details <Sparkles className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-3">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate-400 hover:text-white flex items-center gap-1 transition"
                    >
                      <Github className="w-4 h-4" /> Code
                    </a>
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate-400 hover:text-accent flex items-center gap-1 transition"
                    >
                      <ExternalLink className="w-4 h-4" /> Live Demo
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
