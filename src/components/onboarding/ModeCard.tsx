import React from 'react';
import { motion } from 'framer-motion';

interface ModeCardProps {
  key?: string;
  title: string;
  subtitle: string;
  isSelected: boolean;
  onClick: () => void;
}

export const ModeCard = ({ title, subtitle, isSelected, onClick }: ModeCardProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`p-6 bg-white/5 border-2 rounded-3xl text-left transition-colors ${isSelected ? 'border-spendx-lime' : 'border-transparent'}`}
    >
      <div className="w-16 h-16 bg-white/10 rounded-2xl mb-4" />
      <h3 className="text-xl font-black uppercase tracking-tighter mb-2">{title}</h3>
      <p className="text-white/60 text-sm">{subtitle}</p>
    </motion.button>
  );
};
