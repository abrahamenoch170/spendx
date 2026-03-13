import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, DollarSign, MapPin, Ghost } from 'lucide-react';

export const SquadGroup = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 space-y-6">
      <div className="bg-white/5 p-4 rounded-3xl border border-white/10 h-64 overflow-y-auto">
        <div className="text-sm text-white/60 mb-2">Squad Chat</div>
        <div className="space-y-2">
          <div className="bg-white/10 p-3 rounded-2xl">Hey guys, ready for tonight?</div>
          <div className="bg-[#D4FF00] text-black p-3 rounded-2xl ml-auto w-fit">Yes! @Spendx, where should we eat?</div>
          <div className="bg-white/10 p-3 rounded-2xl">@Spendx suggesting: The Burger Joint</div>
        </div>
      </div>

      <div className="bg-white/5 p-4 rounded-3xl border border-white/10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold flex items-center gap-2"><DollarSign className="text-[#D4FF00]" /> Split Bill</h3>
          <button className="text-xs bg-[#00E5FF] text-black px-3 py-1 rounded-full font-bold">Share Link</button>
        </div>
        <div className="text-sm">Dinner - $45 (Paid by Alex)</div>
        <div className="mt-2 text-xs text-white/60">Checklist: Alex (Paid), Sam (Pending)</div>
      </div>

      <div className="bg-white/5 p-4 rounded-3xl border border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2"><MapPin className="text-[#FF007A]" /> Live Location</div>
        <button className="flex items-center gap-1 text-xs"><Ghost className="w-4 h-4" /> Ghost Mode</button>
      </div>
    </motion.div>
  );
};
