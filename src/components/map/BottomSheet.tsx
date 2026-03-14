import React from 'react';
import { motion } from 'framer-motion';

export const BottomSheet = ({ center, venueFilter }: any) => {
  return (
    <motion.div 
      initial={{ y: '100%' }}
      animate={{ y: '50%' }}
      className="absolute bottom-0 left-0 right-0 bg-[#050505] border-t border-white/10 p-6 rounded-t-3xl z-[1000]"
    >
      <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-4" />
      <h2 className="text-xl font-black uppercase tracking-tighter">Squad Activity</h2>
      <p className="text-white/60">Nearby venues and current vibe.</p>
    </motion.div>
  );
};
