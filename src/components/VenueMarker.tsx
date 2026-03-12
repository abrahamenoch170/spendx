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
    <div class="group relative flex flex-col items-center ${isTrending ? 'animate-bounce' : ''}">
      <div style="width: 36px; height: 36px; background: var(--card-bg); border: 2px solid ${color}; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px; box-shadow: 0 0 12px ${color}; backdrop-filter: blur(4px);" class="transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1">
        ${emoji}
      </div>
      ${isTrending ? `
        <div class="absolute -top-3 -right-3 w-6 h-6 bg-[var(--card-bg)] rounded-full border border-[var(--orange)] flex items-center justify-center text-xs shadow-[0_0_10px_var(--orange)]">
          🔥
        </div>
      ` : ''}
      <div class="absolute top-10 whitespace-nowrap bg-[var(--card-bg)]/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold text-[var(--text-primary)] opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none border border-[var(--border-color)] flex flex-col items-center group-hover:-translate-y-2" style="box-shadow: 0 0 15px ${color}">
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
      <Popup>
        <div className="p-2">
          <h3 className="font-display font-bold text-lg mb-1 text-[var(--text-primary)]">{venue.name}</h3>
          <p className="text-sm text-[var(--text-secondary)] capitalize">{emoji} {venue.type} • {venue.status}</p>
          {isTrending && <p className="text-xs text-[var(--orange)] font-bold mt-1">🔥 Trending right now</p>}
        </div>
      </Popup>
    </Marker>
  );
};
