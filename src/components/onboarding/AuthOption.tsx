import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface AuthOptionProps {
  logo: React.ReactNode;
  title: string;
  illustration: React.ReactNode;
  color: string;
  onClick: () => void;
}

export const AuthOption = ({ logo, title, illustration, color, onClick }: AuthOptionProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="w-full flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl hover:border-white/20 transition-colors group"
    >
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-xl">
          {logo}
        </div>
        <span className="font-bold text-lg">{title}</span>
      </div>
      <div className="w-12 h-12 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity">
        {illustration}
      </div>
    </motion.button>
  );
};
