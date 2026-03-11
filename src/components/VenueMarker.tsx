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

export function VenueMarker({ venue }: { venue: Venue }) {
  const color = getColor(venue.status);
  const emoji = getEmoji(venue.type);

  const iconHtml = `
    <div style="width: 36px; height: 36px; background: rgba(10,10,10,0.85); border: 2px solid ${color}; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px; box-shadow: 0 0 12px ${color}60; backdrop-filter: blur(4px);">
      ${emoji}
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
}
