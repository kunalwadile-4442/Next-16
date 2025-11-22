'use client';
import { createRoot } from 'react-dom/client';
import {
  CheckCircle2,
  AlertCircle,
  Info,
  AlertTriangle,
  Check,
} from 'lucide-react';
import clsx from 'clsx';

let container: HTMLDivElement | null = null;

const createContainer = () => {
  if (!container) {
    container = document.createElement('div');
    container.className =
      'fixed top-4 left-0 right-0 z-[9999] flex flex-col items-center justify-center gap-3 pointer-events-none px-3';
    document.body.appendChild(container);
  }
  return container;
};

const showToast = (
  message: string,
  type: 'success' | 'error' | 'info' | 'warning',
) => {
  const toast = document.createElement('div');
  const root = createRoot(toast);

  const close = () => {
    toast.classList.add('animate-slideUpFade');
    setTimeout(() => toast.remove(), 400);
  };

  const icons = {
    success: (
      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white">
        <Check size={16} />
      </div>
    ),
    error: <AlertCircle size={20} className="shrink-0" />,
    info: <Info size={20} className="shrink-0" />,
    warning: <AlertTriangle size={20} className="shrink-0" />,
  };

  root.render(
    <div
      className={clsx(
        'animate-slideDownFade pointer-events-auto mx-auto flex w-full max-w-[calc(100%-1.5rem)] items-center gap-3 rounded-xl px-4 py-3 text-sm shadow-lg transition-all duration-300 sm:w-auto sm:max-w-[420px] sm:text-base',
        {
          'border border-emerald-200 bg-emerald-50 text-emerald-700':
            type === 'success',
          'border border-red-200 bg-red-50 text-red-800': type === 'error',
          'border border-blue-200 bg-blue-50 text-blue-800': type === 'info',
          'border border-yellow-200 bg-yellow-50 text-yellow-800':
            type === 'warning',
        },
      )}
    >
      {icons[type]}
      <span className="font-opensans-semibold flex-1 text-[12px] lg:text-[15px]">
        {message}
      </span>
    </div>,
  );

  const toastContainer = createContainer();
  toastContainer.appendChild(toast);

  setTimeout(close, 3000);
};

export const customToast = {
  success: (msg: string) => showToast(msg, 'success'),
  error: (msg: string) => showToast(msg, 'error'),
  info: (msg: string) => showToast(msg, 'info'),
  warning: (msg: string) => showToast(msg, 'warning'),
};
