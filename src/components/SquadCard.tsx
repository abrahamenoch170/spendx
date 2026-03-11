import React from 'react';
import { SquadMember } from '../hooks/useSquad';

export const SquadCard: React.FC<{ member: SquadMember }> = ({ member }) => {
  return (
    <div className="flex flex-col items-center gap-2 min-w-[72px] cursor-pointer hover:scale-105 transition-transform">
      <div className="w-16 h-16 rounded-full border-2 border-[#00CCFF] relative p-1 shadow-[0_0_10px_rgba(0,204,255,0.3)]">
        <img src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${member.seed}`} alt={member.name} className="w-full h-full rounded-full bg-white object-cover" />
        {member.freshness === 'full' && <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#CCFF00] rounded-full border-2 border-[#111] shadow-[0_0_5px_rgba(204,255,0,0.5)]"></div>}
      </div>
      <span className="text-xs font-bold font-display tracking-wide">{member.name}</span>
    </div>
  );
};
