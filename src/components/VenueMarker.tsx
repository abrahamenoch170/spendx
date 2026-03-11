import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Venue } from '../hooks/useVenues';

const getEmoji = (type: Venue['type']) => {
  switch (type) {
    case 'food': return '🍔';
    case 'culture': return '🏛️';
    case 'nature': return '🌳';
    case 'nightlife': return '🪩';
    case 'hidden': return '💎';
    default: return '📍';
  }
};

const getColor = (status: Venue['status']) => {
  switch (status) {
    case 'open': return '#00FF88';
    case 'closing': return '#FFCC00';
    case 'closed': return '#FF2244';
    case 'unavailable': return '#555555';
    default: return '#555555';
  }
};

export const VenueMarker: React.FC<{ venue: Venue }> = ({ venue }) => {
  const color = getColor(venue.status);
  const emoji = getEmoji(venue.type);

  const iconHtml = `
    <div class="group relative flex flex-col items-center">
      <div style="width: 36px; height: 36px; background: rgba(10,10,10,0.85); border: 2px solid ${color}; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px; box-shadow: 0 0 12px ${color}60; backdrop-filter: blur(4px);" class="transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1 group-hover:shadow-[0_0_20px_${color}]">
        ${emoji}
      </div>
      <div class="absolute top-10 whitespace-nowrap bg-black/80 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold text-white opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none border border-white/20 flex flex-col items-center group-hover:-translate-y-2 shadow-[0_0_15px_${color}40]">
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
          <h3 className="font-display font-bold text-lg mb-1">{venue.name}</h3>
          <p className="text-sm text-gray-300 capitalize">{emoji} {venue.type} • {venue.status}</p>
        </div>
      </Popup>
    </Marker>
  );
};
