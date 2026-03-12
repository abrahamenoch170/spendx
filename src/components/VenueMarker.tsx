import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Venue } from '../hooks/useVenues';

const getEmoji = (type: Venue['type']) => {
  switch (type) {
    case 'food': return '🍔';
    case 'drink': return '🍸';
    case 'event': return '🎟️';
    case 'experience': return '✨';
    case 'health': return '❤️';
    default: return '📍';
  }
};

const getColor = (type: Venue['type']) => {
  switch (type) {
    case 'food': return 'var(--orange)';
    case 'drink': return 'var(--magenta)';
    case 'event': return 'var(--cyan)';
    case 'experience': return 'var(--teal)';
    case 'health': return 'var(--red)';
    default: return 'var(--text-secondary)';
  }
};

export const VenueMarker: React.FC<{ venue: Venue }> = ({ venue }) => {
  const color = getColor(venue.type);
  const emoji = getEmoji(venue.type);
  const isTrending = venue.vibe >= 80 && venue.visitedLastTwoHours;

  const iconHtml = `
    <div class="group relative flex flex-col items-center">
      ${isTrending ? `<div class="absolute inset-0 rounded-full animate-pulse-orange" style="width: 36px; height: 36px; background: ${color}; opacity: 0.5;"></div>` : ''}
      <div style="width: 36px; height: 36px; background: var(--card-bg); border: 2px solid ${color}; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px; box-shadow: 0 0 12px ${color}; backdrop-filter: blur(4px);" class="transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1 relative z-10">
        ${emoji}
      </div>
      ${isTrending ? `
        <div class="absolute -top-3 -right-3 w-6 h-6 bg-[var(--card-bg)] rounded-full border border-[var(--orange)] flex items-center justify-center text-xs shadow-[0_0_10px_var(--orange)] z-20">
          🔥
        </div>
      ` : ''}
      <div class="absolute top-10 whitespace-nowrap bg-[var(--card-bg)]/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold text-[var(--text-primary)] opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none border border-[var(--border-color)] flex flex-col items-center group-hover:-translate-y-2 z-20" style="box-shadow: 0 0 15px ${color}">
        <span>${venue.name}</span>
      </div>
    </div>
  `;

  const icon = L.divIcon({
    html: iconHtml,
    className: 'venue-marker-icon',
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  });

  return (
    <Marker position={[venue.lat, venue.lng]} icon={icon}>
      <Popup className="venue-popup">
        <div className="p-3 min-w-[200px]">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-display font-bold text-xl text-[var(--text-primary)] leading-tight">{venue.name}</h3>
            <span className="text-2xl">{emoji}</span>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">{venue.type}</span>
            <span className="w-1 h-1 rounded-full bg-[var(--text-secondary)]"></span>
            <span className={`text-xs font-bold uppercase tracking-wider ${venue.status === 'open' ? 'text-[var(--lime)]' : venue.status === 'closing' ? 'text-[var(--orange)]' : 'text-[var(--red)]'}`}>
              {venue.status}
            </span>
          </div>
          
          <div className="flex items-center justify-between bg-[var(--bg-color)] rounded-lg p-2 mb-3 border border-[var(--border-color)]">
            <span className="text-xs text-[var(--text-secondary)] font-mono">Vibe Score</span>
            <div className="flex items-center gap-1">
              <span className="text-sm font-bold text-[var(--magenta)]">{venue.vibe}%</span>
              {isTrending && <span className="text-xs">🔥</span>}
            </div>
          </div>
          
          <button className="w-full bg-[var(--lime)] text-black font-bold py-2 rounded-lg hover:bg-white transition-colors text-sm">
            Plan it
          </button>
        </div>
      </Popup>
    </Marker>
  );
};
