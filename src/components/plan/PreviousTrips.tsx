import React from 'react';
import { motion } from 'framer-motion';
import { usePlanStore } from '../../store/planStore';

export const PreviousTrips = () => {
  const { tripHistory } = usePlanStore();

  return (
    <div className="p-6 grid grid-cols-2 gap-4">
      {tripHistory.map(trip => (
        <motion.div 
          key={trip.id}
          whileHover={{ scale: 1.05 }}
          className="bg-white/5 p-4 rounded-3xl border border-white/10"
        >
          <img src={trip.thumbnail} className="w-full h-24 rounded-2xl mb-2 bg-white/10" alt={trip.location} />
          <h3 className="font-bold text-sm">{trip.location}</h3>
          <p className="text-xs text-white/60">{trip.date}</p>
        </motion.div>
      ))}
    </div>
  );
};
