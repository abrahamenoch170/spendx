import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSquad } from '../hooks/useSquad';
import { useVenues } from '../hooks/useVenues';
import { SquadCard } from './SquadCard';
import { VenueCard } from './VenueCard';
import { Sparkles } from 'lucide-react';

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
      className="absolute bottom-0 left-0 w-full bg-[var(--card-bg)]/80 backdrop-blur-xl border-t border-[var(--border-color)] rounded-t-[2rem] z-50 flex flex-col overflow-hidden will-change-transform shadow-[0_-10px_40px_rgba(0,0,0,0.3)]"
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
        <div className="w-12 h-1.5 bg-[var(--text-secondary)]/30 rounded-full"></div>
      </div>

      {/* Content */}
      <div className="px-6 pb-6 flex-1 overflow-y-auto hide-scrollbar">
        {/* Collapsed View Summary */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex-1">
            <h2 className="font-display font-bold text-2xl text-[var(--text-primary)]">Tonight's Vibe</h2>
            <p className="text-sm text-[var(--text-secondary)] font-mono mt-1">{squad.length} squad active • {venues.filter(v => v.status === 'open').length} spots open</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-[var(--magenta)]/20 border border-[var(--magenta)] flex items-center justify-center text-xl shrink-0" style={{ boxShadow: '0 0 15px var(--magenta)' }}>
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
          {/* AI Suggestion */}
          <div className="bg-[var(--cyan)]/10 border border-[var(--cyan)]/30 rounded-2xl p-4 relative overflow-hidden">
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-[var(--cyan)]/20 blur-2xl rounded-full pointer-events-none" />
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-[var(--cyan)]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--cyan)]">AI Suggestion</span>
            </div>
            <p className="text-sm text-[var(--text-primary)] leading-relaxed mb-4 relative z-10">
              {squad.length} of you are near this area. Start with rooftop drinks at {venues[0]?.name || 'a nearby spot'}, then head to {venues[1]?.name || 'a club'} after 11pm.
            </p>
            <button className="w-full bg-[var(--lime)] text-black font-bold py-3 rounded-xl hover:bg-[var(--lime)]/90 transition-colors relative z-10">
              Plan it
            </button>
          </div>

          {/* Squad Section */}
          <div>
            <h3 className="font-display font-bold text-lg text-[var(--text-primary)] mb-3">Squad</h3>
            <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
              {squad.map(member => (
                <SquadCard key={member.id} member={member} />
              ))}
            </div>
          </div>

          {/* Venues Section */}
          <div>
            <h3 className="font-display font-bold text-lg text-[var(--text-primary)] mb-3">Trending Nearby</h3>
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
