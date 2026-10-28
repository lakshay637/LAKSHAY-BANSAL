import React, { useState, useEffect } from 'react';
import {
  Download,
  ArrowRight,
  Menu,
  X,
  Terminal,
  Palette,
  Volume2,
  VolumeX,
  Sparkles,
  FileText,
  Github,
  Linkedin,
  Mail,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const BRAND_ROLES = [
  'LAKSHAY_BANSAL',
  'FULL_STACK_DEV',
  'MERN_DEVELOPER',
  'SOFTWARE_ENGINEER',
  'API_ARCHITECT',
  'PROBLEM_SOLVER',
];

const NAV_ITEMS = [
  { id: 'about', label: 'ABOUT', num: '01' },
  { id: 'skills', label: 'SKILLS', num: '02' },
  { id: 'experience', label: 'EXPERIENCE', num: '03' },
  { id: 'projects', label: 'PROJECTS', num: '04' },
  { id: 'contact', label: 'CONTACT', num: '05' },
];

export default function Navbar() {
  const {
    accent,
    setResumeModalOpen,
    setTerminalOpen,
    setCustomizerOpen,
    soundEnabled,
    setSoundEnabled,
    playSound,
    addToast,
  } = useTheme();

  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  // Dynamic Typewriter State for Brand Logo
  const [brandIndex, setBrandIndex] = useState(0);
  const [brandText, setBrandText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect
  useEffect(() => {
    const fullText = BRAND_ROLES[brandIndex];
    let timer;

    if (!isDeleting && brandText.length < fullText.length) {
      timer = setTimeout(() => {
        setBrandText(fullText.substring(0, brandText.length + 1));
      }, 85);
    } else if (isDeleting && brandText.length > 0) {
      timer = setTimeout(() => {
        setBrandText(fullText.substring(0, brandText.length - 1));
      }, 45);
    } else if (!isDeleting && brandText.length === fullText.length) {
      timer = setTimeout(() => setIsDeleting(true), 2400);
    } else if (isDeleting && brandText.length === 0) {
      setIsDeleting(false);
      setBrandIndex((prev) => (prev + 1) % BRAND_ROLES.length);
    }

    return () => clearTimeout(timer);
  }, [brandText, isDeleting, brandIndex]);

  // Scroll listener for reading progress bar and active section detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);

      // Calculate document scroll reading progress
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(100, Math.max(0, (scrollY / docHeight) * 100)) : 0;
      setScrollProgress(progress);

      // Section detection with navbar offset
      const sections = ['about', 'skills', 'experience', 'projects', 'contact'];
      const scrollPos = scrollY + 220;

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

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Global Keyboard Shortcuts (Ctrl+K for CLI, Escape to close mobile menu)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl+K or Cmd+K: Open Terminal CLI
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
        playSound?.('open');
      }
      // Escape closes mobile menu
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen, setTerminalOpen, playSound]);

  // Smooth scroll helper that accounts for fixed floating navbar height
  const scrollToSection = (e, id) => {
    e.preventDefault();
    playSound?.('click');
    setMobileMenuOpen(false);
    setActiveSection(id);

    const el = document.getElementById(id);
    if (el) {
      const navOffset = 90;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const scrollToTop = (e) => {
    e.preventDefault();
    playSound?.('click');
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const toggleSound = () => {
    const nextVal = !soundEnabled;
    setSoundEnabled(nextVal);
    if (nextVal) playSound?.('success');
    addToast(nextVal ? 'UI Sound Effects enabled 🔊' : 'UI Sound Effects muted 🔇', 'info');
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex flex-col items-center px-4 pointer-events-none">
      {/* Main Floating Capsule Navigation Bar */}
      <nav
        className={`pointer-events-auto relative flex items-center justify-between gap-3 px-5 sm:px-6 py-2.5 bg-[#0a0a0f]/90 border backdrop-blur-2xl rounded-full transition-all duration-300 max-w-6xl w-full overflow-hidden ${
          scrolled
            ? 'shadow-2xl shadow-black/80 border-white/20 bg-[#070709]/95 py-2'
            : 'border-white/10 shadow-lg'
        }`}
      >
        {/* Dynamic Scroll Reading Progress Glow Bar on Navbar's Bottom Edge */}
        <div
          className="absolute bottom-0 left-0 h-[2px] transition-all duration-150 ease-out pointer-events-none"
          style={{
            width: `${scrollProgress}%`,
            background: `linear-gradient(90deg, transparent, var(--accent-color), #ffffff, var(--accent-color))`,
            boxShadow: `0 0 8px var(--accent-color)`,
          }}
        />

        {/* Left: Dynamic Terminal Prompt Brand Logo */}
        <a
          href="#"
          onClick={scrollToTop}
          title="Scroll to top"
          className="font-mono font-extrabold tracking-wider text-xs sm:text-sm text-white flex items-center gap-1.5 group min-w-[160px] sm:min-w-[195px] select-none cursor-pointer"
        >
          <span className="w-5 h-5 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-accent text-[11px] font-bold group-hover:border-accent/50 group-hover:bg-accent/10 transition">
            &gt;_
          </span>
          <span className="text-slate-200 group-hover:text-white transition">
            {brandText}
          </span>
          <span className="text-accent animate-pulse font-bold">▍</span>
        </a>

        {/* Center: Desktop Navigation Capsule */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-mono font-bold tracking-widest text-slate-300">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => scrollToSection(e, item.id)}
                className={`px-3 py-1 rounded-full transition-all duration-200 relative ${
                  isActive
                    ? 'text-accent font-extrabold bg-white/10 border border-accent/30 shadow-[0_0_12px_rgba(var(--accent-rgb),0.25)]'
                    : 'hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        {/* Right: Quick Tools & Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Audio FX Sound Toggle */}
          <button
            onClick={toggleSound}
            title={soundEnabled ? 'Mute audio feedback' : 'Enable audio feedback'}
            className={`hidden sm:flex p-2 rounded-full border transition ${
              soundEnabled
                ? 'bg-accent/10 border-accent/40 text-accent'
                : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            {soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5" />
            ) : (
              <VolumeX className="w-3.5 h-3.5" />
            )}
          </button>

          {/* Theme & FX Customizer Toggle */}
          <button
            onClick={() => {
              setCustomizerOpen(true);
              playSound?.('open');
            }}
            title="Customize Theme & FX"
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-accent/40 transition relative flex items-center justify-center text-slate-300 hover:text-white group"
          >
            <Palette className="w-3.5 h-3.5 text-slate-300 group-hover:text-accent transition" />
            {/* Live Accent Dot */}
            <span
              className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full border border-black shadow"
              style={{ backgroundColor: accent.hex }}
            />
          </button>

          {/* Developer CLI Terminal Quick Button */}
          <button
            onClick={() => {
              setTerminalOpen(true);
              playSound?.('open');
            }}
            title="Interactive CLI Terminal (Ctrl+K)"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-accent/40 text-xs font-mono font-medium text-slate-300 hover:text-accent transition group"
          >
            <Terminal className="w-3.5 h-3.5 text-accent group-hover:scale-110 transition" />
            <span className="hidden lg:inline text-[10px] bg-white/10 px-1.5 py-0.2 rounded border border-white/10 text-slate-400">
              Ctrl+K
            </span>
          </button>

          {/* RESUME Modal Button */}
          <button
            onClick={() => {
              setResumeModalOpen(true);
              playSound?.('open');
            }}
            className="hidden md:flex text-xs font-mono font-bold text-accent tracking-wider items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#12121a] hover:bg-[#1a1a24] border border-accent/30 hover:border-accent/60 transition shadow-md"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>RESUME</span>
          </button>

          {/* HIRE ME CTA Button */}
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, 'contact')}
            className="text-xs font-mono font-black text-black bg-white hover:bg-slate-200 transition px-4 sm:px-5 py-1.5 sm:py-2 rounded-full flex items-center gap-1 shadow-xl hover:shadow-white/20 group select-none"
          >
            <span>HIRE ME</span>
            <ArrowRight className="w-3.5 h-3.5 ml-0.5 text-black stroke-[3] group-hover:translate-x-0.5 transition" />
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
              playSound?.('click');
            }}
            className="md:hidden p-2 text-slate-300 hover:text-white rounded-full bg-white/5 border border-white/10"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto md:hidden mt-2 max-w-sm w-full bg-[#0a0a0f]/95 border border-white/15 backdrop-blur-2xl rounded-3xl p-5 shadow-2xl z-50 flex flex-col gap-4 animate-in fade-in slide-in-from-top-3 font-mono">
          {/* Availability Status Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>AVAILABLE FOR WORK</span>
            </div>
            <span className="text-[10px] text-slate-500 font-mono">v2.8</span>
          </div>

          {/* Nav Items List */}
          <div className="flex flex-col gap-1 font-bold text-sm">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => scrollToSection(e, item.id)}
                  className={`flex items-center justify-between py-2.5 px-3 rounded-xl transition ${
                    isActive
                      ? 'bg-white/10 text-accent border border-accent/30'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="text-[11px] font-mono text-slate-500">{item.num}</span>
                </a>
              );
            })}
          </div>

          {/* Mobile Quick Action Tools Grid */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
            <button
              onClick={() => {
                setTerminalOpen(true);
                setMobileMenuOpen(false);
                playSound?.('open');
              }}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-slate-200 hover:border-accent/40 transition"
            >
              <Terminal className="w-3.5 h-3.5 text-accent" />
              <span>CLI (Ctrl+K)</span>
            </button>

            <button
              onClick={() => {
                setCustomizerOpen(true);
                setMobileMenuOpen(false);
                playSound?.('open');
              }}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-slate-200 hover:border-accent/40 transition"
            >
              <Palette className="w-3.5 h-3.5 text-accent" />
              <span>Theme FX</span>
            </button>

            <button
              onClick={() => {
                setResumeModalOpen(true);
                setMobileMenuOpen(false);
                playSound?.('open');
              }}
              className="col-span-2 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#12121a] border border-accent/40 text-xs font-bold text-accent shadow-md"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>VIEW & DOWNLOAD RESUME</span>
            </button>
          </div>

          {/* Mobile Social & Contact Links */}
          <div className="flex items-center justify-center gap-5 pt-2 border-t border-white/5 text-slate-400 text-xs">
            <a
              href="https://github.com/lakshay637"
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent transition flex items-center gap-1"
            >
              <Github className="w-3.5 h-3.5" /> GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/lakshay-bansal-a8959a2a1"
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent transition flex items-center gap-1"
            >
              <Linkedin className="w-3.5 h-3.5" /> LinkedIn
            </a>
            <a
              href="mailto:lakshayb.dev@gmail.com"
              className="hover:text-accent transition flex items-center gap-1"
            >
              <Mail className="w-3.5 h-3.5" /> Email
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
