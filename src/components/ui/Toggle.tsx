import React from 'react';
import { motion } from 'framer-motion';

interface ToggleProps {
  isOn: boolean;
  onToggle: () => void;
}

export const Toggle = ({ isOn, onToggle }: ToggleProps) => {
  return (
    <div 
      className={`w-14 h-8 rounded-full p-1 cursor-pointer flex items-center ${isOn ? 'bg-[var(--acid-lime)]' : 'bg-white/10'}`}
      onClick={onToggle}
    >
      <motion.div 
        className="w-6 h-6 bg-white rounded-full shadow-md"
        animate={{ x: isOn ? 24 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
    </div>
  );
};
