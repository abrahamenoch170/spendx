import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { SquadMember } from '../hooks/useSquad';

export const FriendMarker: React.FC<{ member: SquadMember, onPing: (name: string) => void }> = ({ member, onPing }) => {
  const iconHtml = `
    <div class="relative w-16 h-16 group transition-transform duration-300 hover:scale-125 hover:z-50 animate-pop-in">
      <div class="absolute inset-0 rounded-full border-[3px] border-[var(--lime)] animate-pulse"></div>
      <img src="https://api.dicebear.com/9.x/avataaars/svg?seed=${member.seed}" alt="${member.name}" class="w-full h-full rounded-full bg-white object-cover border-2 border-[var(--bg-color)]" />
    </div>
  `;

  const icon = L.divIcon({
    html: iconHtml,
    className: 'friend-marker-icon',
    iconSize: [64, 64],
    iconAnchor: [32, 32],
  });

  return (
    <Marker position={[member.lat, member.lng]} icon={icon}>
      <Popup>
        <div className="p-2 text-center">
          <h3 className="font-bold text-lg text-[var(--text-primary)]">{member.name}</h3>
          <button 
            onClick={() => onPing(member.name)}
            className="mt-2 w-full bg-[var(--lime)] text-black font-bold py-1 px-3 rounded-full text-xs"
          >
            Ping
          </button>
        </div>
      </Popup>
    </Marker>
  );
};
