import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MapPin, X } from 'lucide-react';
import { useMapStore } from '../../store/mapStore';

export const EmergencyInfoCard = () => {
  const { selectedEmergency, setSelectedEmergency } = useMapStore();

  if (!selectedEmergency) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="absolute bottom-20 left-4 right-4 bg-black/80 backdrop-blur-xl border border-white/10 p-6 rounded-3xl z-[1000]"
      >
        <button onClick={() => setSelectedEmergency(null)} className="absolute top-4 right-4"><X className="w-5 h-5" /></button>
        <h2 className="text-xl font-bold mb-2">{selectedEmergency.name}</h2>
        <p className="text-sm text-white/50 mb-4">{selectedEmergency.type.toUpperCase()}</p>
        <div className="flex items-center gap-2 text-sm mb-2"><MapPin className="w-4 h-4 text-[var(--acid-lime)]" /> {selectedEmergency.address}</div>
        <div className="flex items-center gap-2 text-sm mb-6"><Phone className="w-4 h-4 text-[var(--acid-lime)]" /> {selectedEmergency.phone}</div>
        <button className="w-full py-3 bg-[var(--acid-lime)] text-black font-bold rounded-xl">Directions</button>
      </motion.div>
    </AnimatePresence>
  );
};
