import React, { useState } from 'react';
import { useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { Marker, Popup } from 'react-leaflet';

export function PinDrop() {
  const [position, setPosition] = useState<[number, number] | null>(null);

  useMapEvents({
    contextmenu(e) { // Long press or right click
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  if (!position) return null;

  const iconHtml = `
    <div class="animate-pin-drop">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="var(--lime)" stroke="var(--bg-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3" fill="var(--bg-color)"></circle>
      </svg>
    </div>
  `;

  const icon = L.divIcon({
    html: iconHtml,
    className: 'pin-drop-icon',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  return (
    <Marker position={position} icon={icon}>
      <Popup>
        <div className="flex flex-col gap-2 p-2 w-48">
          <button className="bg-[var(--lime)] text-[var(--bg-color)] font-bold py-2 px-4 rounded-lg hover:bg-white transition-colors" onClick={() => setPosition(null)}>
            Mark for squad
          </button>
          <button className="bg-[var(--magenta)] text-white font-bold py-2 px-4 rounded-lg hover:bg-white hover:text-[var(--bg-color)] transition-colors" onClick={() => setPosition(null)}>
            Start discovery
          </button>
          <button className="bg-transparent border border-[var(--border-color)] text-[var(--text-secondary)] font-bold py-2 px-4 rounded-lg hover:bg-[var(--bg-color)] transition-colors" onClick={() => setPosition(null)}>
            Cancel
          </button>
        </div>
      </Popup>
    </Marker>
  );
}
