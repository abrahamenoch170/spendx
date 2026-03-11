import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

export function UserDot({ position, ghostMode }: { position: [number, number], ghostMode: boolean }) {
  const color = ghostMode ? '#555555' : '#CCFF00';
  const pulseClass = ghostMode ? '' : 'animate-pulse-lime';

  const iconHtml = `
    <div class="relative w-16 h-16 flex items-center justify-center">
      <div class="absolute inset-0 rounded-full border-2 border-[${color}] opacity-30 ${pulseClass}"></div>
      <div class="absolute inset-2 rounded-full border-2 border-[${color}] opacity-60 ${pulseClass}" style="animation-delay: 0.5s"></div>
      <div class="absolute inset-4 rounded-full border-2 border-[${color}] opacity-90 ${pulseClass}" style="animation-delay: 1s"></div>
      <div class="w-4 h-4 bg-[${color}] rounded-full z-10 shadow-[0_0_10px_${color}]"></div>
    </div>
  `;

  const icon = L.divIcon({
    html: iconHtml,
    className: 'user-dot-icon',
    iconSize: [64, 64],
    iconAnchor: [32, 32],
  });

  return (
    <Marker position={position} icon={icon}>
      <Popup>
        <div className="p-2 text-center">
          <h3 className="font-display font-bold text-lg">You</h3>
          <p className="text-sm text-gray-400">{ghostMode ? 'Ghost Mode Active' : 'Sharing Location'}</p>
        </div>
      </Popup>
    </Marker>
  );
}
