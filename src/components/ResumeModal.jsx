import React, { useEffect } from 'react';
import { X, Download, Printer, Phone, Mail, Linkedin, Github, Award, GraduationCap, Code2, Briefcase, FileText } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ResumeModal() {
  const { resumeModalOpen, setResumeModalOpen, addToast, playSound } = useTheme();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setResumeModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setResumeModalOpen]);

  if (!resumeModalOpen) return null;

  const handlePrint = () => {
    playSound?.('click');
    window.print();
  };

  const handleDownload = () => {
    addToast("Generating official PDF print preview...", 'success');
    playSound?.('success');
    setTimeout(() => {
      window.print();
    }, 350);
  };

  return (
    <div
      onClick={() => setResumeModalOpen(false)}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      {/* Modal Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#0d0d14] border border-white/15 rounded-3xl shadow-2xl p-6 sm:p-10 space-y-6 scrollbar-thin text-slate-200"
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2 text-white font-bold text-lg">
            <FileText className="w-5 h-5 text-accent" />
            <span>Lakshay Bansal — Official Resume</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              title="Print Resume"
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition flex items-center gap-1.5 text-xs font-semibold"
            >
              <Printer className="w-4 h-4 text-accent" />
              <span className="hidden sm:inline">Print</span>
            </button>

            <button
              onClick={handleDownload}
              title="Download or Save as PDF"
              className="px-4 py-2 rounded-xl bg-accent text-black font-bold text-xs hover:opacity-90 transition flex items-center gap-1.5 shadow-md shadow-accent/20"
            >
              <Download className="w-4 h-4" /> Download PDF
            </button>

            <button
              onClick={() => {
                setResumeModalOpen(false);
                playSound?.('click');
              }}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Document View */}
        <div className="bg-[#12121c] p-6 sm:p-10 rounded-2xl border border-white/10 space-y-8 font-sans text-slate-300 shadow-inner">
          {/* Header */}
          <div className="text-center space-y-2 border-b border-white/10 pb-6">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
              Lakshay Bansal
            </h1>
            <p className="text-accent font-semibold text-base sm:text-lg tracking-wide">
              Full Stack Developer
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400 pt-1">
              <a href="tel:+918273122223" className="flex items-center gap-1 text-slate-300 hover:text-accent">
                <Phone className="w-3.5 h-3.5 text-accent" /> +91 8273122223
              </a>
              <span>•</span>
              <a href="mailto:lakshayb.dev@gmail.com" className="flex items-center gap-1 hover:text-accent text-slate-300">
                <Mail className="w-3.5 h-3.5 text-accent" /> lakshayb.dev@gmail.com
              </a>
              <span>•</span>
              <a href="https://www.linkedin.com/in/lakshay-bansal-a8959a2a1" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-accent">
                <Linkedin className="w-3.5 h-3.5 text-accent" /> LinkedIn
              </a>
              <span>•</span>
              <a href="https://github.com/lakshay637" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-accent">
                <Github className="w-3.5 h-3.5 text-accent" /> GitHub
              </a>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono font-extrabold text-accent uppercase tracking-widest border-b border-white/10 pb-1 flex items-center gap-2">
              <Briefcase className="w-4 h-4" /> Professional Summary
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-300">
              Proficient Full Stack Developer pursuing B.Tech in Computer Science and Engineering (CORE) at Noida International University with a strong academic standing (CGPA: 8.1/10). Skilled in developing responsive web platforms with the MERN stack, designing RESTful APIs, and implementing robust backend architectures backed by strong foundation in C, Java, Python, and SQL.
            </p>
          </div>

          {/* Education */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono font-extrabold text-accent uppercase tracking-widest border-b border-white/10 pb-1 flex items-center gap-2">
              <GraduationCap className="w-4 h-4" /> Education
            </h2>
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm">
                <span className="font-bold text-white">Noida International University</span>
                <span className="text-slate-400 font-mono">Greater Noida, India (2023 – 2027)</span>
              </div>
              <div className="text-xs text-accent font-semibold flex items-center justify-between">
                <span>B.Tech in Computer Science and Engineering (CORE)</span>
                <span className="font-mono bg-accent/10 border border-accent/20 px-2.5 py-0.5 rounded-full text-white">CGPA: 8.1 / 10</span>
              </div>
            </div>
          </div>

          {/* Projects */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono font-extrabold text-accent uppercase tracking-widest border-b border-white/10 pb-1 flex items-center gap-2">
              <Code2 className="w-4 h-4" /> Technical Projects
            </h2>

            {/* Project 1 */}
            <div className="space-y-1.5 text-xs sm:text-sm">
              <div className="flex items-center justify-between font-bold text-white">
                <span>Expense Tracker Web Application</span>
                <span className="text-accent font-mono text-xs">MERN Stack</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-slate-300 text-xs pl-1">
                <li>Developed a responsive expense tracking application featuring secure authentication mechanisms and robust backend APIs.</li>
                <li>Improved overall application stability and performance by implementing reusable UI layouts and comprehensive error handling techniques.</li>
              </ul>
            </div>

            {/* Project 2 */}
            <div className="space-y-1.5 text-xs sm:text-sm">
              <div className="flex items-center justify-between font-bold text-white">
                <span>Calculator Web Application</span>
                <span className="text-accent font-mono text-xs">JavaScript, HTML5, CSS3</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-slate-300 text-xs pl-1">
                <li>Built an interactive and highly responsive calculator application featuring an intuitive user interface and smooth input animations.</li>
                <li>Implemented robust arithmetic validation logic to gracefully handle complex operational sequences and edge cases, ensuring real-time rendering of mathematical calculations.</li>
              </ul>
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono font-extrabold text-accent uppercase tracking-widest border-b border-white/10 pb-1 flex items-center gap-2">
              <Code2 className="w-4 h-4" /> Technical Skills
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                <span className="font-mono text-accent font-bold block mb-1">Programming Languages</span>
                <span className="text-slate-300">C, Java, Python, JavaScript, SQL</span>
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                <span className="font-mono text-accent font-bold block mb-1">Web Development</span>
                <span className="text-slate-300">HTML, CSS, React.js, Node.js, Express.js, MongoDB</span>
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                <span className="font-mono text-accent font-bold block mb-1">Tools & Technologies</span>
                <span className="text-slate-300">Postman, Advanced MS Excel, GitHub</span>
              </div>
            </div>
          </div>

          {/* Certifications & Achievements */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono font-extrabold text-accent uppercase tracking-widest border-b border-white/10 pb-1 flex items-center gap-2">
              <Award className="w-4 h-4" /> Certifications & Achievements
            </h2>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-200">
                <span className="w-2 h-2 rounded-full bg-accent"></span>
                <strong className="text-white">Postman API Fundamentals Student Expert</strong> — Postman
              </div>
              <div className="flex items-center gap-2 text-slate-200">
                <span className="w-2 h-2 rounded-full bg-accent"></span>
                <strong className="text-white">Programming in C</strong> — Computer Research & Educational Society of India
              </div>
              <div className="flex items-center gap-2 text-slate-200">
                <span className="w-2 h-2 rounded-full bg-accent"></span>
                <strong className="text-white">Python Programming</strong> — Computer Research & Educational Society of India
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
