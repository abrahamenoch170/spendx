'use client';
import React, { useState } from 'react';
import { SquadList } from './SquadList';
import { SquadRoom } from './SquadRoom';

export const SquadTab = () => {
  const [activeSquadId, setActiveSquadId] = useState<string | null>(null);

  const handleCreateSquad = () => {
    const randomId = Math.random().toString(36).substring(7);
    const link = `spendx.app/r/${randomId}`;
    
    if (navigator.share) {
      navigator.share({ title: 'Join my Squad on Spendx', url: link });
    } else {
      navigator.clipboard.writeText(link);
      alert('Invite link copied to clipboard!');
    }
    
    setActiveSquadId(randomId);
  };

  if (activeSquadId) {
    return <SquadRoom squadId={activeSquadId} onBack={() => setActiveSquadId(null)} />;
  }

  return <SquadList onSelectSquad={setActiveSquadId} onCreateSquad={handleCreateSquad} />;
};

