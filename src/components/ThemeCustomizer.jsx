import React from 'react';
import { X, Palette, Sparkles, Check } from 'lucide-react';
import { useTheme, ACCENT_PRESETS } from '../context/ThemeContext';

export default function ThemeCustomizer() {
  const { customizerOpen, setCustomizerOpen, accent, setAccent, particlesEnabled, setParticlesEnabled, addToast } = useTheme();

  if (!customizerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm h-full bg-[#0d0d14] border-l border-white/10 p-6 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300"
      >
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <Palette className="w-5 h-5 text-accent" />
              <span>Theme & FX Customizer</span>
            </div>
            <button
              onClick={() => setCustomizerOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Accent Color Palette Selector */}
          <div className="space-y-3">
            <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
              Primary Accent Color
            </label>
            <div className="grid grid-cols-2 gap-3">
              {ACCENT_PRESETS.map((preset) => {
                const isSelected = accent.hex === preset.hex;
                return (
                  <button
                    key={preset.name}
                    onClick={() => {
                      setAccent(preset);
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
                        className="w-4 h-4 rounded-full border border-white/30"
                        style={{ backgroundColor: preset.hex }}
                      ></span>
                      <span className="text-xs font-semibold text-white">{preset.name}</span>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-white" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Particle Animation Canvas Toggle */}
          <div className="space-y-3 pt-4 border-t border-white/10">
            <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
              Background FX & Physics
            </label>
            <div className="flex items-center justify-between p-4 rounded-2xl bg-[#121218] border border-white/5">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-accent" />
                <div>
                  <h4 className="text-xs font-bold text-white">Interactive Particles</h4>
                  <p className="text-[11px] text-slate-400">Constellation cursor effect</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setParticlesEnabled(!particlesEnabled);
                  addToast(
                    !particlesEnabled ? 'Particle canvas enabled' : 'Particle canvas disabled',
                    'info'
                  );
                }}
                className={`w-12 h-6 rounded-full transition p-1 flex items-center ${
                  particlesEnabled ? 'bg-accent justify-end' : 'bg-white/10 justify-start'
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-black"></span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-white/10 text-center text-xs text-slate-500 font-mono">
          Customizer applies reactive CSS Variables in real time.
        </div>
      </div>
    </div>
  );
}
