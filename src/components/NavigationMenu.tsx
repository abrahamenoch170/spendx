import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const COLORS = ['#CCFF00', '#FF0099', '#00CCFF', '#00AA88'];
const MENU_ITEMS = ['Explore Map', 'See Squad', 'Discover Venues', 'How It Works', 'Join Early Access'];
const springEasing = [0.34, 1.56, 0.64, 1];

export function NavigationMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [colorIndex, setColorIndex] = useState(0);

  const toggleMenu = () => {
    if (!isOpen) {
      setColorIndex((prev) => (prev + 1) % COLORS.length);
    }
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const activeColor = COLORS[colorIndex];

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="fixed top-6 right-6 z-[100] w-12 h-12 flex flex-col items-center justify-center gap-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 transition-all hover:scale-105"
        style={{ boxShadow: `0 0 15px ${activeColor}40` }}
      >
        <motion.div
          animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.35, ease: springEasing }}
          className="w-6 h-0.5 bg-white rounded-full will-change-transform"
        />
        <motion.div
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.35, ease: springEasing }}
          className="w-6 h-0.5 bg-white rounded-full will-change-transform"
        />
        <motion.div
          animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.35, ease: springEasing }}
          className="w-6 h-0.5 bg-white rounded-full will-change-transform"
        />
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ clipPath: 'circle(0% at calc(100% - 3rem) 3rem)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 3rem) 3rem)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 3rem) 3rem)' }}
            transition={{ duration: 0.45, ease: springEasing }}
            className="fixed inset-0 z-[90] flex items-center justify-center"
            style={{ backgroundColor: `${activeColor}EB`, backdropFilter: 'blur(12px)', willChange: 'clip-path' }}
            onClick={() => setIsOpen(false)}
          >
            <div 
              className="flex flex-col items-center gap-8"
              onClick={(e) => e.stopPropagation()}
            >
              {MENU_ITEMS.map((item, i) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.4, ease: springEasing }}
                  className="text-4xl md:text-6xl font-display font-black text-black transition-colors cursor-pointer"
                  whileHover={{ scale: 1.05, filter: 'brightness(1.2)' }}
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
