import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';
import { Sun, Moon } from 'lucide-react';

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
      className={`w-10 h-10 md:w-12 md:h-12 rounded-full backdrop-blur-md shadow-lg flex items-center justify-center transition-all bg-[var(--card-bg)]/90 ${theme === 'dark' ? 'text-[var(--lime)] border border-[var(--lime)] shadow-[0_0_15px_var(--lime)]' : 'text-[var(--magenta)] border border-[var(--magenta)] shadow-[0_0_15px_var(--magenta)]'}`}
      title="Toggle Theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 0 : 180 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="w-5 h-5 md:w-6 md:h-6 flex items-center justify-center"
      >
        {theme === 'dark' ? <Moon className="w-5 h-5 md:w-6 md:h-6" /> : <Sun className="w-5 h-5 md:w-6 md:h-6" />}
      </motion.div>
    </button>
  );
}
