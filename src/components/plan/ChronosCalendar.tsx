import React from 'react';
import { motion } from 'framer-motion';
import { useChronosStore } from '../../store/chronosStore';
import { Calendar, Clock, MapPin } from 'lucide-react';

export const ChronosCalendar = () => {
  const { events } = useChronosStore();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold flex items-center gap-2">
        <Calendar className="w-5 h-5 text-[var(--acid-lime)]" />
        Chronos Timeline
      </h2>
      
      {events.length === 0 ? (
        <div className="text-center py-10 text-white/30 border border-dashed border-white/10 rounded-2xl">
          No events scheduled yet.
        </div>
      ) : (
        events.map((event) => (
          <motion.div 
            key={event.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 border border-white/10 p-4 rounded-2xl space-y-2"
          >
            <h3 className="font-bold">{event.title}</h3>
            <div className="flex items-center gap-4 text-xs text-white/50">
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {event.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {event.location}
              </div>
            </div>
          </motion.div>
        ))
      )}
    </div>
  );
};
