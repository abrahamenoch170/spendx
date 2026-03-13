import React from 'react';
import { useHomeStore } from '../../store/homeStore';
import { SquadGroup } from './SquadGroup';
import { CoupleGroup } from './CoupleGroup';
import { PartyGroup } from './PartyGroup';
import { EnterpriseGroup } from './EnterpriseGroup';
import { useNavigate } from 'react-router-dom';

export const GroupTab = () => {
  const { activeMode } = useHomeStore();
  const navigate = useNavigate();

  if (activeMode === 'solo') {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <h2 className="text-2xl font-black uppercase tracking-tighter mb-4">Solo Mode</h2>
        <p className="text-white/60 mb-6">Group features are disabled in Solo mode.</p>
        <button 
          onClick={() => navigate('/app/plan')}
          className="bg-[#D4FF00] text-black font-bold px-6 py-3 rounded-full"
        >
          Go to Plan Tab
        </button>
      </div>
    );
  }

  switch (activeMode) {
    case 'group': return <SquadGroup />;
    case 'couple': return <CoupleGroup />;
    case 'host': return <PartyGroup />;
    case 'enterprise': return <EnterpriseGroup />;
    default: return <div className="p-6">Unknown mode: {activeMode}</div>;
  }
};
