import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';
import { Sun, Moon } from 'lucide-react';
import Lottie from 'lottie-react';
import placeholderAnimation from '../assets/lottie/placeholder.json';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={toggleTheme}
      className={`glass-panel rounded-full p-3 transition-all flex items-center justify-center ${theme === 'dark' ? 'text-[var(--text-primary)] border-[var(--text-primary)]' : 'text-[var(--text-primary)] border-[var(--text-primary)] bg-[var(--card-bg)]'}`}
      title="Toggle Theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 0 : 180 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="w-5 h-5 relative"
      >
        {theme === 'dark' ? <Moon className="w-5 h-5 absolute inset-0 opacity-0" /> : <Sun className="w-5 h-5 absolute inset-0 opacity-0" />}
        <Lottie animationData={placeholderAnimation} loop={false} className="w-full h-full" />
      </motion.div>
    </button>
  );
}
