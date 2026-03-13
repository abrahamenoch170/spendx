import React from 'react';
import { motion } from 'framer-motion';

export const VenueCard = ({ name, vibeScore, image }: { name: string; vibeScore: number; image: string }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="min-w-[160px] bg-white/5 p-4 rounded-3xl border border-white/10"
    >
      <img src={image} alt={name} className="w-full h-32 rounded-2xl mb-4 bg-white/10" />
      <h3 className="font-bold text-sm mb-1">{name}</h3>
      <span className="bg-[#004D4D] text-[#00E5FF] px-2 py-1 rounded-full text-xs font-bold">{vibeScore} vibe</span>
    </motion.div>
  );
};
