import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, AlertCircle, Info, X } from 'lucide-react';
import { useToastStore, ToastType } from '../../store/toastStore';

const ToastIcon = ({ type }: { type: ToastType }) => {
  const icon = {
    success: <Check className="w-6 h-6 text-[var(--acid-lime)]" />,
    error: <AlertCircle className="w-6 h-6 text-[var(--hot-magenta)]" />,
    info: <Info className="w-6 h-6 text-[var(--electric-cyan)]" />,
  }[type];

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: [0, 1.2, 1] }}
      transition={{ duration: 0.3 }}
    >
      {icon}
    </motion.div>
  );
};

export const ToastContainer = () => {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed top-20 left-4 right-4 z-[9999] flex flex-col gap-4 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(_, info) => {
              if (Math.abs(info.offset.x) > 50) removeToast(toast.id);
            }}
            className={`pointer-events-auto flex items-center gap-4 p-4 rounded-2xl border backdrop-blur-xl shadow-2xl ${
              toast.type === 'success' ? 'border-[var(--acid-lime)]/50 bg-black/80' :
              toast.type === 'error' ? 'border-[var(--hot-magenta)]/50 bg-black/80' :
              'border-[var(--electric-cyan)]/50 bg-black/80'
            }`}
          >
            <ToastIcon type={toast.type} />
            <p className="text-white font-bold flex-1">{toast.message}</p>
            <button onClick={() => removeToast(toast.id)} className="text-white/50 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
