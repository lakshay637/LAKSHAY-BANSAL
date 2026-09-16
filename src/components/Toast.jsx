import React from 'react';
import { Info, CheckCircle2, AlertTriangle, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Toast() {
  const { toasts, removeToast } = useTheme();

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let Icon = Info;
        let colorClass = 'text-accent border-accent/30 bg-[#0e0e14]/95';

        if (toast.type === 'success') {
          Icon = CheckCircle2;
          colorClass = 'text-emerald-400 border-emerald-500/30 bg-[#0e0e14]/95';
        } else if (toast.type === 'warning') {
          Icon = AlertTriangle;
          colorClass = 'text-amber-400 border-amber-500/30 bg-[#0e0e14]/95';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between p-4 rounded-2xl border backdrop-blur-xl shadow-2xl animate-in slide-in-from-bottom-5 duration-300 ${colorClass}`}
          >
            <div className="flex items-center gap-3 pr-2">
              <Icon className="w-5 h-5 shrink-0" />
              <p className="text-xs font-medium text-slate-200">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
