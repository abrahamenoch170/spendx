import React from 'react';
import { Target, Filter, Sun, Moon, Map as MapIcon, AlertTriangle } from 'lucide-react';
import { useMapStore } from '../../store/mapStore';

export const MapControls = () => {
  const { mapLayers, toggleMapLayer } = useMapStore();

  return (
    <div className="absolute bottom-6 right-6 flex flex-col gap-2 z-[1000]">
      <button className="bg-[#050505] p-4 rounded-full border border-white/10"><Target className="w-6 h-6" /></button>
      <button className="bg-[#050505] p-4 rounded-full border border-white/10"><Filter className="w-6 h-6" /></button>
      <button 
        onClick={() => toggleMapLayer('emergency')}
        className={`bg-[#050505] p-4 rounded-full border ${mapLayers.emergency ? 'border-[var(--acid-lime)]' : 'border-white/10'}`}
      >
        <AlertTriangle className={`w-6 h-6 ${mapLayers.emergency ? 'text-red-500' : 'text-white'}`} />
        {mapLayers.emergency && <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />}
      </button>
      <button className="bg-[#050505] p-4 rounded-full border border-white/10"><Sun className="w-6 h-6" /></button>
      <select className="bg-[#050505] p-4 rounded-full border border-white/10 text-xs">
        <option>Lagos</option>
        <option>London</option>
        <option>New York</option>
        <option>Austin</option>
      </select>
    </div>
  );
};
