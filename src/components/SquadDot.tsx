import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { SquadMember } from '../hooks/useSquad';

export function SquadDot({ member }: { member: SquadMember }) {
  const getRingStyle = (freshness: SquadMember['freshness']) => {
    switch (freshness) {
      case 'full': return 'border-solid';
      case 'partial': return 'border-dashed border-[4px]';
      case 'dashed': return 'border-dotted border-[2px] opacity-50';
      default: return 'border-solid';
    }
  };

  const iconHtml = `
    <div class="relative w-12 h-12">
      <div class="absolute inset-0 rounded-full border-[3px] border-[#00CCFF] ${getRingStyle(member.freshness)} animate-pulse-cyan"></div>
      <img src="https://api.dicebear.com/9.x/avataaars/svg?seed=${member.seed}" alt="${member.name}" class="w-full h-full rounded-full bg-white object-cover border-2 border-[#111]" />
      <div class="absolute -top-2 -right-2 w-6 h-6 bg-[#111] rounded-full border border-[#00CCFF] flex items-center justify-center transform rotate-[${member.direction}deg]">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#00CCFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="19" x2="12" y2="5"></line>
          <polyline points="5 12 12 5 19 12"></polyline>
        </svg>
      </div>
    </div>
  `;

  const icon = L.divIcon({
    html: iconHtml,
    className: 'squad-dot-icon',
    iconSize: [48, 48],
    iconAnchor: [24, 24],
  });

  return (
    <Marker position={[member.lat, member.lng]} icon={icon}>
      <Popup>
        <div className="p-2 text-center">
          <img src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${member.seed}`} alt={member.name} className="w-16 h-16 mx-auto rounded-full bg-white mb-2" />
          <h3 className="font-display font-bold text-lg">{member.name}</h3>
          <p className="text-xs text-gray-400 font-mono mt-1">Updated {member.freshness === 'full' ? '<2m' : member.freshness === 'partial' ? '5m' : '10m+'} ago</p>
        </div>
      </Popup>
    </Marker>
  );
}
