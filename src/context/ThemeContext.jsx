import React, { createContext, useContext, useState, useEffect } from 'react';

export const ACCENT_PRESETS = [
  { name: 'Amber Yellow', hex: '#fbbf24', rgb: '251, 191, 36' },
  { name: 'Cyber Cyan', hex: '#06b6d4', rgb: '6, 182, 212' },
  { name: 'Emerald Green', hex: '#10b981', rgb: '16, 185, 129' },
  { name: 'Electric Violet', hex: '#a855f7', rgb: '168, 85, 247' },
  { name: 'Neon Rose', hex: '#f43f5e', rgb: '244, 63, 94' },
  { name: 'Sky Blue', hex: '#38bdf8', rgb: '56, 189, 248' },
];

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Load saved preferences if available
  const [accent, setAccentState] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio_accent');
      if (saved) {
        const found = ACCENT_PRESETS.find((a) => a.name === saved);
        if (found) return found;
      }
    } catch {
      // ignore
    }
    return ACCENT_PRESETS[0];
  });

  const [particlesEnabled, setParticlesEnabledState] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio_particles');
      if (saved !== null) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return true;
  });

  const [soundEnabled, setSoundEnabledState] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio_sound');
      if (saved !== null) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return false;
  });

  const [terminalOpen, setTerminalOpen] = useState(false);
  const [customizerOpen, setCustomizerOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [activeProjectModal, setActiveProjectModal] = useState(null);
  const [toasts, setToasts] = useState([]);

  const setAccent = (newAccent) => {
    setAccentState(newAccent);
    try {
      localStorage.setItem('portfolio_accent', newAccent.name);
    } catch {
      // ignore
    }
  };

  const setParticlesEnabled = (val) => {
    setParticlesEnabledState(val);
    try {
      localStorage.setItem('portfolio_particles', JSON.stringify(val));
    } catch {
      // ignore
    }
  };

  const setSoundEnabled = (val) => {
    setSoundEnabledState(val);
    try {
      localStorage.setItem('portfolio_sound', JSON.stringify(val));
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    document.documentElement.style.setProperty('--accent-color', accent.hex);
    document.documentElement.style.setProperty('--accent-rgb', accent.rgb);
  }, [accent]);

  // Audio synthesizer for micro-interactions
  const playSound = (type = 'click') => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(750, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(350, ctx.currentTime + 0.04);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
        osc.start();
        osc.stop(ctx.currentTime + 0.04);
      } else if (type === 'open') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.07);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.07);
        osc.start();
        osc.stop(ctx.currentTime + 0.07);
      } else if (type === 'success') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, ctx.currentTime);
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.05);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
        osc.start();
        osc.stop(ctx.currentTime + 0.12);
      }
    } catch {
      // ignore audio errors
    }
  };

  const addToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ThemeContext.Provider
      value={{
        accent,
        setAccent,
        particlesEnabled,
        setParticlesEnabled,
        soundEnabled,
        setSoundEnabled,
        playSound,
        terminalOpen,
        setTerminalOpen,
        customizerOpen,
        setCustomizerOpen,
        resumeModalOpen,
        setResumeModalOpen,
        activeProjectModal,
        setActiveProjectModal,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
