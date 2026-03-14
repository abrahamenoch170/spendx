import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Sparkles, Camera } from 'lucide-react';

const filters = [
  { id: 'neon', name: 'Neon Glow', color: 'var(--cyan)' },
  { id: 'retro', name: 'Retro Vibes', color: 'var(--magenta)' },
  { id: 'lime', name: 'Acid Lime', color: 'var(--lime)' },
];

export const FilterStudio = ({ onClose }: { onClose: () => void }) => {
  const [activeFilter, setActiveFilter] = useState(filters[0].id);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center p-6"
    >
      <button onClick={onClose} className="absolute top-6 right-6 p-3 bg-white/10 rounded-full">
        <X className="w-6 h-6" />
      </button>
      
      <div className="w-full max-w-sm aspect-square bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center mb-8">
        <Camera className="w-20 h-20 text-white/20" />
      </div>

      <div className="flex gap-4">
        {filters.map(filter => (
          <button 
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-6 py-3 rounded-full font-black uppercase tracking-widest text-xs border transition-all ${activeFilter === filter.id ? 'bg-white text-black border-white' : 'bg-white/5 text-white/50 border-white/10'}`}
          >
            {filter.name}
          </button>
        ))}
      </div>
    </motion.div>
  );
};
