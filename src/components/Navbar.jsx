import React, { useState, useEffect } from 'react';
import { Download, ArrowRight, Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const BRAND_ROLES = [
  'LAKSHAY_BANSAL',
  'WEB_DEVELOPER',
  'FULL_STACK_DEV',
  'MERN_DEVELOPER',
  'SOFTWARE_ENGINEER',
];

export default function Navbar() {
  const { setResumeModalOpen } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  // Dynamic Typewriter State for Brand Logo (cycles over time)
  const [brandIndex, setBrandIndex] = useState(0);
  const [brandText, setBrandText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = BRAND_ROLES[brandIndex];
    let timer;

    if (!isDeleting && brandText.length < fullText.length) {
      timer = setTimeout(() => {
        setBrandText(fullText.substring(0, brandText.length + 1));
      }, 90);
    } else if (isDeleting && brandText.length > 0) {
      timer = setTimeout(() => {
        setBrandText(fullText.substring(0, brandText.length - 1));
      }, 50);
    } else if (!isDeleting && brandText.length === fullText.length) {
      timer = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && brandText.length === 0) {
      setIsDeleting(false);
      setBrandIndex((prev) => (prev + 1) % BRAND_ROLES.length);
    }

    return () => clearTimeout(timer);
  }, [brandText, isDeleting, brandIndex]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['about', 'skills', 'experience', 'projects', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4">
      <nav className={`flex items-center justify-between gap-4 px-6 py-3 bg-[#0a0a0f]/95 border border-white/10 backdrop-blur-2xl rounded-full transition-all duration-300 max-w-6xl w-full ${scrolled ? 'shadow-2xl border-white/20 bg-[#070709]/98' : 'border-white/10'
        }`}>
        {/* Left Brand: Dynamic Typewriter Logo (cycles WEB_DEVELOPER, FULL_STACK_DEV, etc.) */}
        <a href="#" className="font-mono font-extrabold tracking-wider text-xs sm:text-sm text-white flex items-center gap-0.5 group min-w-[170px]">
          <span>{brandText}</span>
          <span className="text-accent animate-pulse font-bold">_▍</span>
        </a>

        {/* Center Nav Capsule Pill */}
        <div className="hidden md:flex items-center gap-6 px-6 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-mono font-bold tracking-widest text-slate-300">
          {[
            { id: 'about', label: 'ABOUT' },
            { id: 'skills', label: 'SKILLS' },
            { id: 'experience', label: 'EXPERIENCE' },
            { id: 'projects', label: 'PROJECTS' },
            { id: 'contact', label: 'CONTACT' },
          ].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`transition duration-200 relative py-0.5 ${activeSection === item.id ? 'text-accent font-extrabold' : 'hover:text-white'
                }`}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-3">
          {/* RESUME 📥 */}
          <button
            onClick={() => setResumeModalOpen(true)}
            className="hidden sm:flex text-xs font-mono font-bold text-accent tracking-wider items-center gap-1.5 px-4 py-2 rounded-full bg-[#12121a] hover:bg-[#1a1a24] border border-yellow-500/30 transition shadow-md"
          >
            RESUME <Download className="w-3.5 h-3.5 text-accent fill-accent" />
          </button>

          {/* HIRE ME → */}
          <a
            href="#contact"
            className="text-xs font-mono font-black text-black bg-white hover:bg-slate-200 transition px-5 py-2 rounded-full flex items-center gap-1 shadow-xl"
          >
            HIRE ME <ArrowRight className="w-3.5 h-3.5 ml-0.5 text-black stroke-[3]" />
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-20 left-4 right-4 bg-[#0a0a0f]/95 border border-white/10 backdrop-blur-2xl rounded-2xl p-6 shadow-2xl z-50 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 font-mono">
          <div className="flex flex-col gap-3 font-bold text-sm">
            {[
              { id: 'about', label: 'ABOUT' },
              { id: 'skills', label: 'SKILLS' },
              { id: 'experience', label: 'EXPERIENCE' },
              { id: 'projects', label: 'PROJECTS' },
              { id: 'contact', label: 'CONTACT' },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-white/5 text-slate-300 hover:text-accent"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => {
                setResumeModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-1.5 text-xs font-mono font-bold text-accent bg-[#12121a] border border-yellow-500/30 px-4 py-2.5 rounded-full"
            >
              RESUME <Download className="w-3.5 h-3.5 text-accent fill-accent" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
