import React, { useEffect } from 'react';
import { X, Palette, Sparkles, Check, Volume2, VolumeX, Terminal, FileText, RotateCcw } from 'lucide-react';
import { useTheme, ACCENT_PRESETS } from '../context/ThemeContext';

export default function ThemeCustomizer() {
  const {
    customizerOpen,
    setCustomizerOpen,
    accent,
    setAccent,
    particlesEnabled,
    setParticlesEnabled,
    soundEnabled,
    setSoundEnabled,
    playSound,
    setTerminalOpen,
    setResumeModalOpen,
    addToast,
  } = useTheme();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && customizerOpen) {
        setCustomizerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [customizerOpen, setCustomizerOpen]);

  if (!customizerOpen) return null;

  const handleResetDefaults = () => {
    setAccent(ACCENT_PRESETS[0]);
    setParticlesEnabled(true);
    setSoundEnabled(false);
    playSound?.('click');
    addToast('Preferences reset to default theme', 'info');
  };

  return (
    <div
      onClick={() => setCustomizerOpen(false)}
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm h-full bg-[#0d0d14] border-l border-white/10 p-6 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300 overflow-y-auto scrollbar-thin"
      >
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <Palette className="w-5 h-5 text-accent" />
              <span>Theme & FX Customizer</span>
            </div>
            <button
              onClick={() => {
                setCustomizerOpen(false);
                playSound?.('click');
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Accent Color Palette Selector */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                Primary Accent Color
              </label>
              <span className="text-[11px] font-mono text-accent">{accent.name}</span>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {ACCENT_PRESETS.map((preset) => {
                const isSelected = accent.hex === preset.hex;
                return (
                  <button
                    key={preset.name}
                    onClick={() => {
                      setAccent(preset);
                      playSound?.('click');
                      addToast(`Accent updated to ${preset.name}`, 'info');
                    }}
                    className={`p-3 rounded-2xl border text-left flex items-center justify-between transition ${
                      isSelected
                        ? 'border-white/40 bg-white/10 shadow-lg'
                        : 'border-white/5 bg-[#121218] hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-4 h-4 rounded-full border border-white/30 shrink-0"
                        style={{ backgroundColor: preset.hex }}
                      ></span>
                      <span className="text-xs font-semibold text-white truncate">{preset.name}</span>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-white shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Background FX & Audio Preferences */}
          <div className="space-y-3 pt-4 border-t border-white/10">
            <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
              FX & Audio Physics
            </label>

            {/* Particle Animation Canvas Toggle */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#121218] border border-white/5">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-accent" />
                <div>
                  <h4 className="text-xs font-bold text-white">Interactive Particles</h4>
                  <p className="text-[11px] text-slate-400">Constellation cursor canvas</p>
                </div>
              </div>
              <button
                onClick={() => {
                  const nextVal = !particlesEnabled;
                  setParticlesEnabled(nextVal);
                  playSound?.('click');
                  addToast(
                    nextVal ? 'Particle canvas enabled ✨' : 'Particle canvas disabled',
                    'info'
                  );
                }}
                className={`w-12 h-6 rounded-full transition p-1 flex items-center ${
                  particlesEnabled ? 'bg-accent justify-end' : 'bg-white/10 justify-start'
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-black shadow"></span>
              </button>
            </div>

            {/* Sound FX Synthesizer Toggle */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#121218] border border-white/5">
              <div className="flex items-center gap-3">
                {soundEnabled ? (
                  <Volume2 className="w-5 h-5 text-accent" />
                ) : (
                  <VolumeX className="w-5 h-5 text-slate-500" />
                )}
                <div>
                  <h4 className="text-xs font-bold text-white">Audio Feedback FX</h4>
                  <p className="text-[11px] text-slate-400">Futuristic synth clicks</p>
                </div>
              </div>
              <button
                onClick={() => {
                  const nextVal = !soundEnabled;
                  setSoundEnabled(nextVal);
                  if (nextVal) playSound?.('success');
                  addToast(
                    nextVal ? 'Audio feedback enabled 🔊' : 'Audio feedback muted 🔇',
                    'info'
                  );
                }}
                className={`w-12 h-6 rounded-full transition p-1 flex items-center ${
                  soundEnabled ? 'bg-accent justify-end' : 'bg-white/10 justify-start'
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-black shadow"></span>
              </button>
            </div>
          </div>

          {/* Quick Developer Tools */}
          <div className="space-y-3 pt-4 border-t border-white/10">
            <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
              Quick Developer Tools
            </label>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => {
                  setCustomizerOpen(false);
                  setTerminalOpen(true);
                  playSound?.('open');
                }}
                className="p-3 rounded-2xl bg-[#121218] border border-white/10 hover:border-accent/40 text-left transition flex items-center gap-2 group"
              >
                <Terminal className="w-4 h-4 text-accent group-hover:scale-110 transition" />
                <div>
                  <div className="text-xs font-bold text-white">CLI Terminal</div>
                  <div className="text-[10px] text-slate-400 font-mono">Press Ctrl+K</div>
                </div>
              </button>

              <button
                onClick={() => {
                  setCustomizerOpen(false);
                  setResumeModalOpen(true);
                  playSound?.('open');
                }}
                className="p-3 rounded-2xl bg-[#121218] border border-white/10 hover:border-accent/40 text-left transition flex items-center gap-2 group"
              >
                <FileText className="w-4 h-4 text-accent group-hover:scale-110 transition" />
                <div>
                  <div className="text-xs font-bold text-white">Digital CV</div>
                  <div className="text-[10px] text-slate-400 font-mono">View & Print</div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Footer with Reset */}
        <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs text-slate-500 font-mono">
          <button
            onClick={handleResetDefaults}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
          <span>v2.8 Reactive</span>
        </div>
      </div>
    </div>
  );
}
