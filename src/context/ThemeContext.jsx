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
  const [accent, setAccent] = useState(ACCENT_PRESETS[0]);
  const [particlesEnabled, setParticlesEnabled] = useState(true);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [customizerOpen, setCustomizerOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [activeProjectModal, setActiveProjectModal] = useState(null);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    document.documentElement.style.setProperty('--accent-color', accent.hex);
    document.documentElement.style.setProperty('--accent-rgb', accent.rgb);
  }, [accent]);

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
