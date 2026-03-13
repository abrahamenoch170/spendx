import React from 'react';
import { motion } from 'framer-motion';
import { Plus, ChevronRight } from 'lucide-react';

interface Squad {
  id: string;
  name: string;
  lastActivity: string;
  unread: boolean;
  members: string[];
}

const MOCK_SQUADS: Squad[] = [
  { id: 's1', name: 'Weekend Warriors', lastActivity: '2 mins ago', unread: true, members: ['Sam', 'Jordan', 'Alex', 'Taylor'] },
  { id: 's2', name: 'Brunch Club', lastActivity: '1 hour ago', unread: false, members: ['Casey', 'Riley', 'Morgan'] },
  { id: 's3', name: 'Work Drinks', lastActivity: 'Yesterday', unread: false, members: ['Jamie', 'Drew', 'Avery', 'Quinn', 'Blake'] },
];

export const SquadList = ({ onSelectSquad, onCreateSquad }: { onSelectSquad: (id: string) => void, onCreateSquad: () => void }) => {
  return (
    <div className="flex flex-col h-full bg-[var(--bg-color)]">
      {/* Top Bar */}
      <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/20 backdrop-blur-md">
        <h1 className="text-2xl font-bold">Squads</h1>
        <button 
          onClick={onCreateSquad}
          className="w-10 h-10 bg-[var(--lime)] text-black rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-[0_0_15px_rgba(204,255,0,0.3)]"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-32">
        {MOCK_SQUADS.map((squad) => (
          <motion.button
            key={squad.id}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectSquad(squad.id)}
            className="w-full bg-[var(--card-bg)] p-4 rounded-3xl border border-white/5 flex items-center gap-4 hover:bg-white/5 transition-colors text-left relative overflow-hidden group"
          >
            {/* Avatar Cluster */}
            <div className="flex -space-x-3 relative z-10">
              {squad.members.slice(0, 4).map((member, i) => (
                <img 
                  key={i}
                  src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${member}`}
                  alt={member}
                  className="w-12 h-12 rounded-full border-2 border-[var(--card-bg)] bg-white/10"
                  style={{ zIndex: 4 - i }}
                />
              ))}
              {squad.members.length > 4 && (
                <div className="w-12 h-12 rounded-full border-2 border-[var(--card-bg)] bg-black/50 backdrop-blur-md flex items-center justify-center text-[10px] font-bold z-0">
                  +{squad.members.length - 4}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 relative z-10">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-lg">{squad.name}</h3>
                {squad.unread && <div className="w-2 h-2 rounded-full bg-[var(--lime)] shadow-[0_0_8px_rgba(204,255,0,0.8)]" />}
              </div>
              <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">{squad.lastActivity}</p>
            </div>

            <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-[var(--lime)] transition-colors relative z-10" />

            {/* Swipe Actions (Visual Only for Prototype) */}
            <div className="absolute inset-y-0 right-0 w-32 bg-red-500/20 translate-x-full group-hover:translate-x-0 transition-transform flex items-center justify-center text-red-500 font-bold text-xs uppercase tracking-widest z-0">
              Leave
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};
