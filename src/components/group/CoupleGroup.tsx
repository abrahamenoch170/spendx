import React from 'react';
import { motion } from 'framer-motion';

export const CoupleGroup = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 space-y-6">
      <div className="bg-white/5 p-6 rounded-3xl border border-white/10 text-center">
        <h2 className="text-xl font-black uppercase tracking-tighter mb-2">Couple Mode</h2>
        <p className="text-white/60">Shared space for you and your partner.</p>
      </div>
      <div className="bg-white/5 p-4 rounded-3xl border border-white/10 h-64 overflow-y-auto">
        <div className="text-sm text-white/60 mb-2">Couple Chat</div>
        <div className="space-y-2">
          <div className="bg-white/10 p-3 rounded-2xl">What are we doing tonight?</div>
          <div className="bg-[#FF007A] text-white p-3 rounded-2xl ml-auto w-fit">Dinner at 8?</div>
        </div>
      </div>
    </motion.div>
  );
};
