import React from 'react';
import { motion } from 'framer-motion';
import { Map, Users, Flame, Navigation } from 'lucide-react';

const springEasing = [0.34, 1.56, 0.64, 1];

export function QuickActions() {
  const actions = [
    { icon: Flame, label: 'Find Vibes', color: 'var(--magenta)' },
    { icon: Users, label: 'See Squad', color: 'var(--lime)' },
    { icon: Map, label: 'Explore Venues', color: 'var(--cyan)' },
    { icon: Navigation, label: 'View Routes', color: 'var(--teal)' },
  ];

  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2, duration: 0.8, ease: springEasing }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-black/80 backdrop-blur-2xl rounded-[32px] px-6 py-4 flex items-center gap-6 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
    >
      {actions.map((action, i) => (
        <motion.button
          key={i}
          whileHover={{ y: -4, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex flex-col items-center gap-2 group min-w-[64px]"
        >
          <div 
            className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white/5 group-hover:bg-white/10 transition-all border border-white/5 group-hover:border-white/20"
            style={{ color: action.color }}
          >
            <action.icon className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 group-hover:text-white transition-colors">{action.label}</span>
        </motion.button>
      ))}
    </motion.div>
  );
}
