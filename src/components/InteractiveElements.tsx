import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

const springEasing = [0.34, 1.56, 0.64, 1];

export function InteractiveButton({ children, className, onClick, color = '#CCFF00' }: any) {
  const ref = useRef<HTMLButtonElement>(null);
  const [state, setState] = useState<'idle' | 'loading' | 'success'>('idle');
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent) => {
    // Disable magnetic effect on touch devices
    if (window.matchMedia('(hover: none)').matches) return;
    
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct * 40); // Max 20px movement
    y.set(yPct * 40);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

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
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{ x: mouseXSpring, y: mouseYSpring }}
      whileHover={{ scale: 1.05, filter: 'brightness(1.1)' }}
      whileTap={{ scale: 0.95 }}
      transition={{ ease: springEasing }}
      className={`relative overflow-hidden ${className}`}
    >
      <AnimatePresence mode="wait">
        {state === 'idle' && (
          <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {children}
          </motion.div>
        )}
        {state === 'loading' && (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex justify-center items-center h-full">
            <div className="w-6 h-6 border-2 border-black/20 border-t-black rounded-full animate-spin" />
          </motion.div>
        )}
        {state === 'success' && (
          <motion.div key="success" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex justify-center items-center h-full">
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
          color: focused ? '#CCFF00' : 'rgba(255,255,255,0.4)'
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
        className="w-full bg-white/5 rounded-2xl p-6 pt-8 pb-4 text-body text-white focus:outline-none focus:bg-white/10 transition-all border border-white/10 focus:border-[#CCFF00] relative z-0"
      />
    </div>
  );
};
