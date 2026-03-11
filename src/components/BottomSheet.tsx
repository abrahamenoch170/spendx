import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSquad } from '../hooks/useSquad';
import { useVenues } from '../hooks/useVenues';
import { SquadCard } from './SquadCard';
import { VenueCard } from './VenueCard';

export function BottomSheet({ center }: { center: [number, number] }) {
  const [sheetState, setSheetState] = useState<'collapsed' | 'half' | 'full'>('collapsed');
  const { squad } = useSquad(center);
  const { venues } = useVenues(center);

  const getSheetHeight = () => {
    switch (sheetState) {
      case 'collapsed': return '15vh';
      case 'half': return '50vh';
      case 'full': return '90vh';
      default: return '15vh';
    }
  };

  const handleDragEnd = (event: any, info: any) => {
    const y = info.offset.y;
    const velocity = info.velocity.y;

    if (y < -50 || velocity < -500) {
      if (sheetState === 'collapsed') setSheetState('half');
      else if (sheetState === 'half') setSheetState('full');
    } else if (y > 50 || velocity > 500) {
      if (sheetState === 'full') setSheetState('half');
      else if (sheetState === 'half') setSheetState('collapsed');
    }
  };

  return (
    <motion.div
      className="absolute bottom-0 left-0 w-full glass-panel rounded-t-[2rem] z-50 flex flex-col overflow-hidden"
      initial={{ height: '15vh' }}
      animate={{ height: getSheetHeight() }}
      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
    >
      {/* Drag Handle */}
      <div className="w-full flex justify-center py-4 cursor-grab active:cursor-grabbing">
        <div className="w-12 h-1.5 bg-white/20 rounded-full"></div>
      </div>

      {/* Content */}
      <div className="px-6 pb-6 flex-1 overflow-y-auto hide-scrollbar">
        {/* Collapsed View Summary */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="font-display font-bold text-2xl text-white">Tonight's Vibe</h2>
            <p className="text-sm text-gray-400 font-mono mt-1">{squad.length} squad active • {venues.filter(v => v.status === 'open').length} spots open</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-[#FF0099]/20 border border-[#FF0099] flex items-center justify-center text-xl shadow-[0_0_15px_rgba(255,0,153,0.3)]">
            🔥
          </div>
        </div>

        {/* Expanded Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: sheetState !== 'collapsed' ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col gap-6"
        >
          {/* Squad Section */}
          <div>
            <h3 className="font-display font-bold text-lg text-[#00CCFF] mb-3">Squad</h3>
            <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
              {squad.map(member => (
                <SquadCard key={member.id} member={member} />
              ))}
            </div>
          </div>

          {/* Venues Section */}
          <div>
            <h3 className="font-display font-bold text-lg text-[#CCFF00] mb-3">Nearby Spots</h3>
            <div className="flex flex-col gap-3">
              {venues.map(venue => (
                <VenueCard key={venue.id} venue={venue} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
