import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastData {
  message: string;
  type?: 'success' | 'warning' | 'info';
}

interface ToastProps {
  toast: ToastData;
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({ toast, onClose, duration = 3500 }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const type = toast.type || 'success';

  const icons = {
    success: <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />,
    warning: <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />,
    info: <Info className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0" />,
  };

  const styles = {
    success: 'border-emerald-200 dark:border-emerald-800 bg-emerald-50/95 dark:bg-emerald-950/90 text-emerald-900 dark:text-emerald-200',
    warning: 'border-amber-200 dark:border-amber-800 bg-amber-50/95 dark:bg-amber-950/90 text-amber-900 dark:text-amber-200',
    info: 'border-brand-200 dark:border-brand-800 bg-brand-50/95 dark:bg-brand-950/90 text-brand-900 dark:text-brand-200',
  };

  return (
    <div className="fixed bottom-20 lg:bottom-6 right-4 lg:right-6 z-50 max-w-sm transition-all animate-fadeIn">
      <div className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border shadow-xl backdrop-blur-md ${styles[type]}`}>
        {icons[type]}
        <span className="text-xs font-semibold leading-snug">{toast.message}</span>
        <button onClick={onClose} className="p-0.5 hover:opacity-70 transition ml-2 text-slate-500">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
