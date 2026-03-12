import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

export function UserDot({ position, ghostMode }: { position: [number, number], ghostMode: boolean }) {
  const color = ghostMode ? 'var(--text-secondary)' : 'var(--lime)';
  const pulseClass = ghostMode ? '' : 'animate-pulse-lime';

  const iconHtml = `
    <div class="relative w-16 h-16 flex items-center justify-center">
      <div class="absolute inset-0 rounded-full border-2 opacity-30 ${pulseClass}" style="border-color: ${color}"></div>
      <div class="absolute inset-2 rounded-full border-2 opacity-60 ${pulseClass}" style="border-color: ${color}; animation-delay: 0.5s"></div>
      <div class="absolute inset-4 rounded-full border-2 opacity-90 ${pulseClass}" style="border-color: ${color}; animation-delay: 1s"></div>
      <div class="w-4 h-4 rounded-full z-10" style="background-color: ${color}; box-shadow: 0 0 10px ${color}"></div>
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
          <h3 className="font-display font-bold text-lg text-[var(--text-primary)]">You</h3>
          <p className="text-sm text-[var(--text-secondary)]">{ghostMode ? 'Ghost Mode Active' : 'Sharing Location'}</p>
        </div>
      </Popup>
    </Marker>
  );
}
