import React from 'react';
import { Venue } from '../hooks/useVenues';

export function VenueCard({ venue }: { venue: Venue }) {
  return (
    <div className="bg-white/5 rounded-xl p-4 flex justify-between items-center border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
      <div>
        <h4 className="font-bold text-white text-lg">{venue.name}</h4>
        <p className="text-sm text-gray-400 capitalize">{venue.type}</p>
      </div>
      <div className="flex flex-col items-end">
        <span className={`text-xs font-bold px-2 py-1 rounded-md ${venue.status === 'open' ? 'bg-[#00FF88]/20 text-[#00FF88]' : venue.status === 'closing' ? 'bg-[#FFCC00]/20 text-[#FFCC00]' : 'bg-gray-800 text-gray-400'}`}>
          {venue.status.toUpperCase()}
        </span>
        <span className="text-xs text-[#FF0099] font-mono mt-1">Vibe: {venue.vibe}%</span>
      </div>
    </div>
  );
}
