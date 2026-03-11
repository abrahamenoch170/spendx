import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Venue } from '../hooks/useVenues';

const getShape = (type: Venue['type']) => {
  switch (type) {
    case 'food': return '<circle cx="16" cy="16" r="12" />';
    case 'culture': return '<rect x="4" y="4" width="24" height="24" />';
    case 'nature': return '<polygon points="16,4 28,24 4,24" />';
    case 'nightlife': return '<polygon points="16,4 28,16 16,28 4,16" />';
    case 'hidden': return '<polygon points="16,2 20,12 30,12 22,18 25,28 16,22 7,28 10,18 2,12 12,12" />';
    default: return '<circle cx="16" cy="16" r="12" />';
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
  const shape = getShape(venue.type);

  const iconHtml = `
    <div style="width: 32px; height: 32px; filter: drop-shadow(0 0 8px ${color});">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="#111" stroke="${color}" stroke-width="2">
        ${shape}
      </svg>
    </div>
  `;

  const icon = L.divIcon({
    html: iconHtml,
    className: 'venue-marker-icon',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });

  return (
    <Marker position={[venue.lat, venue.lng]} icon={icon}>
      <Popup>
        <div className="p-2">
          <h3 className="font-display font-bold text-lg mb-1">{venue.name}</h3>
          <p className="text-sm text-gray-300 capitalize">{venue.type} • {venue.status}</p>
        </div>
      </Popup>
    </Marker>
  );
}
