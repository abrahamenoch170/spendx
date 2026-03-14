import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Mic, SlidersHorizontal, X } from 'lucide-react';
import { useMapStore } from '../../store/mapStore';
import Lottie from 'lottie-react';

// Placeholder Lottie animations
const micAnimation = "https://assets10.lottiefiles.com/packages/lf20_t24y1e.json";
const searchAnimation = "https://assets10.lottiefiles.com/packages/lf20_t24y1e.json";

export const FloatingSearchBar = ({ onOpenFilters }: { onOpenFilters: () => void }) => {
  const { mapFilters, setMapFilters, venues } = useMapStore();
  const [isListening, setIsListening] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = (term: string) => {
    setMapFilters({ ...mapFilters, searchTerm: term });
    if (term.length > 0) {
      setResults(venues.filter(v => v.name.toLowerCase().includes(term.toLowerCase())));
    } else {
      setResults([]);
    }
  };

  const startVoice = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      handleSearch("pizza");
    }, 2000);
  };

  return (
    <div className="absolute top-4 left-[5%] w-[90%] z-20">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-full flex items-center px-4 py-2 focus-within:border-[var(--acid-lime)] transition-colors"
      >
        <Search className="w-5 h-5 text-white/50" />
        <input 
          type="text"
          placeholder="Search venues..."
          value={mapFilters.searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-white px-3"
        />
        <button onClick={startVoice} className="p-2 hover:bg-white/10 rounded-full">
          {isListening ? <div className="w-5 h-5 bg-[var(--acid-lime)] rounded-full animate-pulse" /> : <Mic className="w-5 h-5 text-white/50" />}
        </button>
        <button onClick={onOpenFilters} className="p-2 hover:bg-white/10 rounded-full">
          <SlidersHorizontal className="w-5 h-5 text-white/50" />
        </button>
      </motion.div>
      
      <AnimatePresence>
        {results.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-2 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden"
          >
            {results.map(v => (
              <div key={v.id} className="p-3 border-b border-white/5 hover:bg-white/5 cursor-pointer">
                <p className="font-bold">{v.name}</p>
                <p className="text-xs text-white/50">{v.type} • {v.rating} ⭐</p>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      {isListening && <p className="text-[var(--acid-lime)] text-center mt-2">Listening...</p>}
    </div>
  );
};
