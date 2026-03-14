import React from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { useMapStore } from '../../store/mapStore';

export const RedCarpetToggle = () => {
  const { actionStates, setActionState } = useMapStore();
  const enabled = actionStates['red-carpet'] || false;

  const toggle = () => {
    const newState = !enabled;
    setActionState('red-carpet', newState);
    if (newState) {
      toast.success("Red Carpet enabled! Golden overlay active.");
      // Mock shareable card generation
      console.log(`[Attendee] walked the red carpet at [Event]`);
      toast.success("Red Carpet card generated!");
    } else {
      toast.success("Red Carpet disabled.");
    }
  };

  return (
    <button 
      onClick={toggle} 
      className={`p-4 rounded-2xl border w-full text-left transition-colors ${enabled ? 'bg-yellow-500/20 border-yellow-500' : 'bg-white/5 border-white/10'}`}
    >
      <div className="font-bold">Red Carpet Mode</div>
      <div className="text-xs opacity-60">{enabled ? 'ON' : 'OFF'}</div>
    </button>
  );
};
