import React from 'react';
import { SquadMember } from '../hooks/useSquad';

export const SquadCard: React.FC<{ member: SquadMember }> = ({ member }) => {
  return (
    <div className="flex flex-col items-center gap-2 min-w-[72px] cursor-pointer hover:scale-105 transition-transform">
      <div className="w-16 h-16 rounded-full border-2 border-[var(--cyan)] relative p-1 shadow-[0_0_10px_var(--cyan)]">
        <img src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${member.seed}`} alt={member.name} className="w-full h-full rounded-full bg-white object-cover" />
        {member.freshness === 'full' && <div className="absolute bottom-0 right-0 w-4 h-4 bg-[var(--lime)] rounded-full border-2 border-[var(--bg-color)] shadow-[0_0_5px_var(--lime)]"></div>}
      </div>
      <span className="text-xs font-bold font-display tracking-wide text-[var(--text-primary)]">{member.name}</span>
    </div>
  );
};
