import React from 'react';
import { motion } from 'framer-motion';
import { useHomeStore } from '../../store/homeStore';

const MODES = [
  { id: 'solo', title: 'Solo' },
  { id: 'couple', title: 'Couple' },
  { id: 'group', title: 'Group' },
  { id: 'host', title: 'Host' },
  { id: 'enterprise', title: 'Enterprise' },
];

export const ModeSelector = () => {
  const { activeMode, setActiveMode } = useHomeStore();

  return (
    <div className="flex gap-4 overflow-x-auto px-6 pb-4">
      {MODES.map((mode) => (
        <motion.button
          key={mode.id}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveMode(mode.id)}
          className={`px-6 py-3 rounded-2xl font-black uppercase text-sm border-2 whitespace-nowrap ${
            activeMode === mode.id ? 'border-[#D4FF00] bg-[#D4FF00]/10' : 'border-transparent bg-white/5'
          }`}
        >
          {mode.title}
        </motion.button>
      ))}
    </div>
  );
};
