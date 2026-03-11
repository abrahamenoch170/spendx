import React from 'react';
import { motion } from 'framer-motion';
import { Map, Users, Flame, Navigation } from 'lucide-react';

const springEasing = [0.34, 1.56, 0.64, 1];

export function QuickActions() {
  const actions = [
    { icon: Flame, label: 'Find Vibes', color: '#FF0099' },
    { icon: Users, label: 'See Squad', color: '#CCFF00' },
    { icon: Map, label: 'Explore Venues', color: '#00CCFF' },
    { icon: Navigation, label: 'View Routes', color: '#00AA88' },
  ];

  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2, duration: 0.8, ease: springEasing }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-8 z-50 glass rounded-full px-4 py-3 flex items-center gap-4 shadow-[0_10px_40px_rgba(0,0,0,0.5)] will-change-transform"
    >
      {actions.map((action, i) => (
        <motion.button
          key={i}
          whileHover={{ scale: 1.05, filter: 'brightness(1.2)' }}
          whileTap={{ scale: 0.95 }}
          transition={{ ease: springEasing }}
          className="flex flex-col md:flex-row items-center gap-2 text-white/70 hover:text-white transition-colors group min-w-[44px] min-h-[44px] justify-center will-change-transform"
        >
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 group-hover:bg-white/10 transition-colors"
            style={{ color: action.color, boxShadow: `0 0 10px ${action.color}00`, transition: 'box-shadow 0.3s' }}
            onMouseEnter={(e) => e.currentTarget.style.boxShadow = `0 0 15px ${action.color}80`}
            onMouseLeave={(e) => e.currentTarget.style.boxShadow = `0 0 10px ${action.color}00`}
          >
            <action.icon className="w-5 h-5" />
          </div>
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider hidden md:block">{action.label}</span>
        </motion.button>
      ))}
    </motion.div>
  );
}
