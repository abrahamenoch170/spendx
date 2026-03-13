import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

const springEasing = [0.34, 1.56, 0.64, 1];

export function InteractiveButton({ children, className, onClick, color = 'var(--lime)' }: any) {
  const ref = useRef<HTMLButtonElement>(null);
  const [state, setState] = useState<'idle' | 'loading' | 'success'>('idle');
  
  const handleClick = async (e: React.MouseEvent) => {
    if (state !== 'idle') return;
    
    // Create ripple
    const rect = ref.current?.getBoundingClientRect();
    if (rect && ref.current) {
      const ripple = document.createElement('div');
      ripple.className = 'absolute bg-white/30 rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2 animate-ripple';
      ripple.style.width = '100px';
      ripple.style.height = '100px';
      ripple.style.left = `${e.clientX - rect.left}px`;
      ripple.style.top = `${e.clientY - rect.top}px`;
      ref.current.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    }

    setState('loading');
    if (onClick) {
      await onClick(e);
    } else {
      await new Promise(r => setTimeout(r, 1000));
    }
    
    setState('success');
    setTimeout(() => setState('idle'), 2000);
  };

  return (
    <motion.button
      ref={ref}
      onClick={handleClick}
      whileHover={{ scale: 1.05, filter: 'brightness(1.1)' }}
      whileTap={{ scale: 0.95 }}
      transition={{ ease: springEasing }}
      className={`relative overflow-hidden will-change-transform ${className}`}
    >
      <AnimatePresence mode="wait">
        {state === 'idle' && (
          <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="will-change-transform">
            {children}
          </motion.div>
        )}
        {state === 'loading' && (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex justify-center items-center h-full will-change-transform">
            <div className="w-6 h-6 border-2 border-black/20 border-t-black rounded-full animate-spin" />
          </motion.div>
        )}
        {state === 'success' && (
          <motion.div key="success" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex justify-center items-center h-full will-change-transform">
            <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export const FloatingInput = ({ label, ...props }: any) => {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');

  return (
    <div className="relative w-full">
      <motion.label
        animate={{
          y: focused || value ? -12 : 16,
          scale: focused || value ? 0.85 : 1,
          color: focused ? 'var(--lime)' : 'var(--text-secondary)'
        }}
        transition={{ ease: springEasing, duration: 0.3 }}
        className="absolute left-6 pointer-events-none origin-left font-medium z-10"
      >
        {label}
      </motion.label>
      <input
        {...props}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full bg-[var(--card-bg)] rounded-2xl p-6 pt-8 pb-4 text-body text-[var(--text-primary)] focus:outline-none focus:bg-[var(--border-color)] transition-all border border-[var(--border-color)] focus:border-[var(--lime)] relative z-0"
      />
    </div>
  );
};
