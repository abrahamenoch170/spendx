import React from 'react';
import { Venue } from '../hooks/useVenues';

export const VenueCard: React.FC<{ venue: Venue }> = ({ venue }) => {
  return (
    <div className="bg-[var(--card-bg)] rounded-xl p-4 flex justify-between items-center border border-[var(--border-color)] hover:bg-[var(--border-color)] transition-colors cursor-pointer">
      <div>
        <h4 className="font-bold text-[var(--text-primary)] text-lg">{venue.name}</h4>
        <p className="text-sm text-[var(--text-secondary)] capitalize">{venue.type}</p>
      </div>
      <div className="flex flex-col items-end">
        <span className={`text-xs font-bold px-2 py-1 rounded-md ${venue.status === 'open' ? 'bg-[var(--lime)]/20 text-[var(--lime)]' : venue.status === 'closing' ? 'bg-[var(--orange)]/20 text-[var(--orange)]' : 'bg-[var(--border-color)] text-[var(--text-secondary)]'}`}>
          {venue.status.toUpperCase()}
        </span>
        <span className="text-xs text-[var(--magenta)] font-mono mt-1">Vibe: {venue.vibe}%</span>
      </div>
    </div>
  );
};
