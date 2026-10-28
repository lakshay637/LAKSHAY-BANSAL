import React, { useState, useEffect, useRef } from 'react';
import { X, Terminal, CornerDownLeft, Trash2, Sparkles, Volume2 } from 'lucide-react';
import { useTheme, ACCENT_PRESETS } from '../context/ThemeContext';

export default function TerminalDrawer() {
  const {
    terminalOpen,
    setTerminalOpen,
    setResumeModalOpen,
    accent,
    setAccent,
    addToast,
    playSound,
    soundEnabled,
    setSoundEnabled,
  } = useTheme();

  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([
    { type: 'sys', text: '⚡ Lakshay Bansal Interactive Developer CLI [v2.8.0]' },
    { type: 'sys', text: 'Type `help` to list commands or `resume` to view the official CV.' },
  ]);

  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (terminalOpen) {
      playSound?.('open');
      setTimeout(() => inputRef.current?.focus(), 120);
    }
  }, [terminalOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && terminalOpen) {
        setTerminalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [terminalOpen, setTerminalOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!terminalOpen) return null;

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    playSound?.('click');
    const newHistory = [...history, { type: 'user', text: `$ ${inputVal}` }];

    switch (cmd) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: `Available CLI Commands:
  • help        : Display command reference
  • bio / about : View Lakshay's software engineering profile
  • resume      : Open official digital resume modal
  • skills      : List technical stack (React, Node, Express, Mongo, C, Java, Python, SQL)
  • projects    : View Expense Tracker & Calculator details
  • contact     : View email, phone, GitHub & LinkedIn links
  • theme       : Cycle to the next theme accent color
  • sound       : Toggle UI audio feedback on / off
  • clear       : Clear terminal window
  • hire / sudo : Express hiring protocol & direct contact channels`
        });
        break;

      case 'bio':
      case 'about':
        newHistory.push({
          type: 'output',
          text: `Lakshay Bansal - Full Stack Developer
B.Tech in Computer Science (CORE) at Noida International University (2023–2027, CGPA: 8.1/10)
Specialized in MERN stack web applications, REST APIs, and responsive high-performance interfaces.
GitHub   : https://github.com/lakshay637
LinkedIn : https://www.linkedin.com/in/lakshay-bansal-a8959a2a1`
        });
        break;

      case 'resume':
        setResumeModalOpen(true);
        newHistory.push({
          type: 'output',
          text: `Opening official digital resume modal...`
        });
        playSound?.('success');
        break;

      case 'skills':
        newHistory.push({
          type: 'output',
          text: `[Languages] : C (CRES Certified), Java, Python, JavaScript (ES6+), SQL
[Web Dev]   : React.js, Node.js, Express.js, MongoDB, HTML5, CSS3, Tailwind CSS
[Tools]     : Postman (API Student Expert), Git & GitHub, Advanced MS Excel`
        });
        break;

      case 'projects':
        newHistory.push({
          type: 'output',
          text: `1. Expense Tracker Web App (MERN Stack: React, Node, Express, MongoDB, JWT)
2. Calculator Web Application (Interactive DOM arithmetic engine with keypress binding)`
        });
        break;

      case 'contact':
        newHistory.push({
          type: 'output',
          text: `Phone    : +91 8273122223
Email    : lakshayb.dev@gmail.com
LinkedIn : https://www.linkedin.com/in/lakshay-bansal-a8959a2a1
GitHub   : https://github.com/lakshay637`
        });
        break;

      case 'sound':
        const nextSound = !soundEnabled;
        setSoundEnabled(nextSound);
        addToast(nextSound ? 'UI Sound FX Enabled 🔊' : 'UI Sound FX Muted 🔇', 'info');
        newHistory.push({
          type: 'output',
          text: `Audio effects state: ${nextSound ? 'ENABLED (Synthesizer ON)' : 'MUTED'}`
        });
        break;

      case 'theme':
        const nextIndex = (ACCENT_PRESETS.findIndex((a) => a.hex === accent.hex) + 1) % ACCENT_PRESETS.length;
        const nextAccent = ACCENT_PRESETS[nextIndex];
        setAccent(nextAccent);
        addToast(`Theme accent changed to ${nextAccent.name}`, 'info');
        newHistory.push({
          type: 'output',
          text: `Theme accent updated to: ${nextAccent.name} (${nextAccent.hex})`
        });
        playSound?.('success');
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'sudo hire':
      case 'hire':
      case 'sudo':
        newHistory.push({
          type: 'output',
          text: `🎉 Access Granted! Priority Hiring Protocol Initialized:
Phone    : +91 8273122223
Email    : lakshayb.dev@gmail.com
Status   : Ready for immediate onboarding (Full-time / Internship / Freelance)`
        });
        addToast('Priority Hiring protocol initialized!', 'success');
        playSound?.('success');
        break;

      default:
        newHistory.push({
          type: 'error',
          text: `Command not recognized: '${cmd}'. Type \`help\` for all available commands.`
        });
    }

    setHistory(newHistory);
    setInputVal('');
  };

  return (
    <div
      onClick={() => setTerminalOpen(false)}
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl h-full bg-[#0a0a0f] border-l border-white/10 p-6 flex flex-col justify-between shadow-2xl font-mono text-xs sm:text-sm animate-in slide-in-from-right duration-300"
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
            </div>
            <span className="text-slate-400 font-semibold ml-2 text-xs flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-accent" />
              <span>lakshay@portfolio:~</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setHistory([]);
                playSound?.('click');
              }}
              title="Clear Terminal Output"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setTerminalOpen(false);
                playSound?.('click');
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* History Window */}
        <div className="flex-1 overflow-y-auto my-4 space-y-3 pr-2 scrollbar-thin text-slate-300">
          {history.map((item, idx) => (
            <div key={idx} className="leading-relaxed whitespace-pre-wrap">
              {item.type === 'user' && (
                <span className="text-accent font-bold">{item.text}</span>
              )}
              {item.type === 'sys' && (
                <span className="text-slate-500 italic">{item.text}</span>
              )}
              {item.type === 'output' && (
                <span className="text-emerald-400 block pl-2 border-l border-emerald-500/30">
                  {item.text}
                </span>
              )}
              {item.type === 'error' && (
                <span className="text-rose-400 font-semibold">{item.text}</span>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Command Input Form */}
        <form onSubmit={handleCommandSubmit} className="pt-3 border-t border-white/10 flex items-center gap-2">
          <span className="text-accent font-bold text-sm">$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type command ('help', 'resume', 'skills', 'hire')..."
            className="flex-1 bg-transparent text-white focus:outline-none placeholder-slate-600 font-mono text-xs sm:text-sm"
          />
          <button
            type="submit"
            className="p-2 rounded-lg bg-accent/10 border border-accent/20 text-accent hover:bg-accent/20 transition"
          >
            <CornerDownLeft className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
