import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useMapStore } from '../../store/mapStore';
import { MapPin, Users, Star, Clock, Navigation } from 'lucide-react';

export const VenueBottomSheet = () => {
  const { selectedVenue, setSelectedVenue } = useMapStore();
  const controls = useAnimation();

  if (!selectedVenue) return null;

  const statusColors: Record<string, string> = {
    open: '#00FF88',
    closing: '#FFCC00',
    closed: '#FF2244',
    unavailable: '#555555',
  };

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      className="absolute bottom-0 left-0 right-0 bg-[#050505] border-t border-white/10 rounded-t-3xl z-[2000] p-6"
    >
      <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-4 cursor-grab" />
      
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-black uppercase tracking-tighter">{selectedVenue.name}</h2>
        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: statusColors[selectedVenue.status] }} />
      </div>

      <div className="flex gap-4 mb-6">
        <div className="bg-white/5 p-3 rounded-xl flex-1 text-center">
          <p className="text-xs text-white/50">Distance</p>
          <p className="font-bold">0.5 km</p>
        </div>
        <div className="bg-white/5 p-3 rounded-xl flex-1 text-center">
          <p className="text-xs text-white/50">ETA</p>
          <p className="font-bold">8 min</p>
        </div>
      </div>

      <div className="flex gap-2">
        <button className="bg-[#D4FF00] text-black font-bold px-6 py-3 rounded-full flex-1">Ping Squad</button>
        <button className="bg-white/10 text-white font-bold px-6 py-3 rounded-full flex-1">Mark</button>
      </div>
    </motion.div>
  );
};
