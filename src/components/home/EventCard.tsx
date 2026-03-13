import React from 'react';
import { motion } from 'framer-motion';

export const EventCard = ({ name, date, image }: { name: string; date: string; image: string }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="min-w-[160px] bg-white/5 p-4 rounded-3xl border border-white/10"
    >
      <img src={image} alt={name} className="w-full h-32 rounded-2xl mb-4 bg-white/10" />
      <h3 className="font-bold text-sm mb-1">{name}</h3>
      <p className="text-xs text-white/60">{date}</p>
    </motion.div>
  );
};
