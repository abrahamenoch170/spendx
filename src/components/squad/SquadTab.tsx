'use client';
'use client';
import React, { useState } from 'react';
import { Plus, Users, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { SquadRoom } from './SquadRoom';

export const SquadTab = () => {
  const [squads, setSquads] = useState([
    { id: '1', name: 'Friday Night Crew', members: 4, lastActivity: '10m ago', unread: true },
    { id: '2', name: 'Work Lunch', members: 6, lastActivity: '2h ago', unread: false },
  ]);
  const [activeRoom, setActiveRoom] = useState<any>(null);

  if (activeRoom) {
    return <SquadRoom squadId={activeRoom.id} squadName={activeRoom.name} onBack={() => setActiveRoom(null)} />;
  }

  const createSquad = async () => {
    const name = prompt("Enter squad name:");
    if (!name) return;

    try {
      const response = await fetch('/api/squad/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 'user123', name })
      });
      const data = await response.json();
      if (data.success) {
        setSquads(prev => [...prev, { id: data.squadId, name, members: 1, lastActivity: 'Just now', unread: false }]);
        if (navigator.share) {
          await navigator.share({ title: 'Join my squad', url: data.inviteLink });
        } else {
          alert(`Squad created! Invite link: ${data.inviteLink}`);
        }
      }
    } catch (error) {
      console.error('Failed to create squad', error);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[var(--bg-color)] pb-20">
      <div className="flex justify-between items-center p-4 border-b border-[var(--border-color)]">
        <h2 className="text-xl font-bold">Squads</h2>
        <button onClick={createSquad} className="p-2 rounded-full bg-[var(--lime)] text-black">
          <Plus className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {squads.map(squad => (
          <motion.div key={squad.id} onClick={() => setActiveRoom(squad)} className="flex items-center justify-between p-4 border-b border-[var(--border-color)] bg-[var(--card-bg)]" whileTap={{ scale: 0.98 }}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[var(--border-color)] flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold">{squad.name}</p>
                <p className="text-sm text-[var(--text-secondary)]">{squad.members} members • {squad.lastActivity}</p>
              </div>
            </div>
            {squad.unread && <div className="w-2 h-2 rounded-full bg-[var(--lime)]" />}
            <ChevronRight className="w-5 h-5 text-[var(--text-secondary)]" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
