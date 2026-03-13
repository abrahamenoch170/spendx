import React from 'react';
import { Target, Filter, Sun, Moon, Map as MapIcon } from 'lucide-react';

export const MapControls = () => {
  return (
    <div className="absolute bottom-6 right-6 flex flex-col gap-2 z-[1000]">
      <button className="bg-[#050505] p-4 rounded-full border border-white/10"><Target className="w-6 h-6" /></button>
      <button className="bg-[#050505] p-4 rounded-full border border-white/10"><Filter className="w-6 h-6" /></button>
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
