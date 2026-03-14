import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Layers, Ghost, Filter, Flame } from 'lucide-react';

export const HUD = ({ city, switchCity, layers, toggleLayer, ghostMode, setGhostMode, isFullMap, setIsFullMap, venueFilter, setVenueFilter }: any) => {
  if (!isFullMap) return null;

  return (
    <div className="absolute top-0 left-0 w-full p-6 z-[1000] pointer-events-none flex justify-between items-start">
      <div className="flex flex-col gap-4 pointer-events-auto">
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsFullMap(false)}
          className="w-12 h-12 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors shadow-2xl"
        >
          <ArrowLeft className="w-6 h-6" />
        </motion.button>

        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-[2rem] p-2 flex flex-col gap-2 shadow-2xl">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => toggleLayer('heatmap')}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${layers.includes('heatmap') ? 'bg-[var(--magenta)] text-white' : 'bg-white/5 text-white/50 hover:bg-white/10'}`}
          >
            <Flame className="w-5 h-5" />
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setGhostMode(!ghostMode)}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${ghostMode ? 'bg-[var(--cyan)] text-black' : 'bg-white/5 text-white/50 hover:bg-white/10'}`}
          >
            <Ghost className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      <div className="flex flex-col items-end gap-4 pointer-events-auto">
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-full px-4 py-2 flex items-center gap-2 shadow-2xl cursor-pointer hover:bg-white/10 transition-colors" onClick={switchCity}>
          <MapPin className="w-4 h-4 text-[var(--lime)]" />
          <span className="text-sm font-black tracking-widest uppercase">{city}</span>
        </div>

        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-[2rem] p-2 flex flex-col gap-2 shadow-2xl">
          {['all', 'club', 'bar', 'lounge'].map(filter => (
            <motion.button 
              key={filter}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setVenueFilter(filter)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors text-[10px] font-black uppercase tracking-widest ${venueFilter === filter ? 'bg-[var(--lime)] text-black' : 'bg-white/5 text-white/50 hover:bg-white/10'}`}
            >
              {filter === 'all' ? <Filter className="w-4 h-4" /> : filter.charAt(0)}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};
