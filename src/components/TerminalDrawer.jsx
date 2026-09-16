import React, { useState, useEffect, useRef } from 'react';
import { X, Terminal, CornerDownLeft, Trash2 } from 'lucide-react';
import { useTheme, ACCENT_PRESETS } from '../context/ThemeContext';

export default function TerminalDrawer() {
  const { terminalOpen, setTerminalOpen, setResumeModalOpen, accent, setAccent, addToast } = useTheme();
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([
    { type: 'sys', text: 'Lakshay Bansal Interactive Developer CLI v2.6.0' },
    { type: 'sys', text: 'Type `help` to list all available commands or `resume` to open digital resume.' },
  ]);

  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (terminalOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [terminalOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!terminalOpen) return null;

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [...history, { type: 'user', text: `$ ${inputVal}` }];

    switch (cmd) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: `Available Commands:
  • help       : Display available CLI commands
  • bio / about: View Lakshay's software engineering summary
  • resume     : Open official digital resume modal
  • skills     : View technical skills (C, Java, Python, MERN, Postman)
  • projects   : View Expense Tracker & Calculator projects
  • contact    : View email, phone & social links
  • theme      : Cycle primary accent color
  • clear      : Clear terminal screen
  • sudo hire  : Express hiring protocol`
        });
        break;

      case 'bio':
      case 'about':
        newHistory.push({
          type: 'output',
          text: `Lakshay Bansal - Full Stack Developer
B.Tech in Computer Science (CORE) at Noida International University (2023–2027, CGPA: 8.1/10)
GitHub: https://github.com/lakshay637
LinkedIn: https://www.linkedin.com/in/lakshay-bansal-a8959a2a1`
        });
        break;

      case 'resume':
        setResumeModalOpen(true);
        newHistory.push({
          type: 'output',
          text: `Opening official digital resume modal...`
        });
        break;

      case 'skills':
        newHistory.push({
          type: 'output',
          text: `[Languages] : C, Java, Python, JavaScript, SQL
[Web Dev]   : HTML, CSS, React.js, Node.js, Express.js, MongoDB
[Tools]     : Postman (API Student Expert), Advanced MS Excel, GitHub`
        });
        break;

      case 'projects':
        newHistory.push({
          type: 'output',
          text: `1. Expense Tracker Web App (MERN Stack, React.js, Node.js, Express.js, MongoDB)
2. Calculator Web Application (JavaScript, HTML5, CSS3)`
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

      case 'theme':
        const nextIndex = (ACCENT_PRESETS.findIndex((a) => a.hex === accent.hex) + 1) % ACCENT_PRESETS.length;
        const nextAccent = ACCENT_PRESETS[nextIndex];
        setAccent(nextAccent);
        addToast(`Theme accent changed to ${nextAccent.name}`, 'info');
        newHistory.push({
          type: 'output',
          text: `Accent color updated to: ${nextAccent.name} (${nextAccent.hex})`
        });
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'sudo hire':
      case 'hire':
        newHistory.push({
          type: 'output',
          text: `🎉 Access Granted! Contact Lakshay Bansal directly:
Phone    : +91 8273122223
Email    : lakshayb.dev@gmail.com
LinkedIn : https://www.linkedin.com/in/lakshay-bansal-a8959a2a1`
        });
        addToast('Sudo Hire protocol initialized!', 'success');
        break;

      default:
        newHistory.push({
          type: 'error',
          text: `Command not recognized: '${cmd}'. Type \`help\` for command reference.`
        });
    }

    setHistory(newHistory);
    setInputVal('');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in">
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
            <span className="text-slate-400 font-semibold ml-2 text-xs flex items-center gap-1">
              <Terminal className="w-4 h-4 text-accent" /> lakshay@portfolio:~
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setHistory([])}
              title="Clear Terminal Output"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setTerminalOpen(false)}
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
          <span className="text-accent font-bold">$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type command ('help', 'resume', 'skills', 'hire')..."
            className="flex-1 bg-transparent text-white focus:outline-none placeholder-slate-600 font-mono text-xs sm:text-sm"
          />
          <button type="submit" className="p-2 rounded-lg bg-accent/10 border border-accent/20 text-accent hover:bg-accent/20 transition">
            <CornerDownLeft className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
