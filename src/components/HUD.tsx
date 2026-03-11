import React from 'react';
import { CITIES } from '../hooks/useMapState';
import { useLayers } from '../hooks/useLayers';
import { Map, Users, Flame, Navigation, Ghost } from 'lucide-react';

export function HUD({
  city,
  switchCity,
  layers,
  toggleLayer,
  ghostMode,
  setGhostMode
}: {
  city: keyof typeof CITIES,
  switchCity: (city: keyof typeof CITIES) => void,
  layers: ReturnType<typeof useLayers>['layers'],
  toggleLayer: ReturnType<typeof useLayers>['toggleLayer'],
  ghostMode: boolean,
  setGhostMode: (val: boolean) => void
}) {
  return (
    <div className="absolute top-0 left-0 w-full p-4 md:p-6 z-40 pointer-events-none flex flex-col gap-4">
      {/* Top Bar */}
      <div className="flex justify-between items-start w-full pointer-events-auto">
        {/* City Selector */}
        <div className="glass-panel rounded-2xl p-2 flex items-center gap-2">
          <Map className="w-5 h-5 text-[#CCFF00]" />
          <select
            value={city}
            onChange={(e) => switchCity(e.target.value as keyof typeof CITIES)}
            className="bg-transparent text-white font-display font-bold text-lg outline-none appearance-none cursor-pointer pr-4"
          >
            {Object.keys(CITIES).map(c => (
              <option key={c} value={c} className="bg-[#111] text-white">{c}</option>
            ))}
          </select>
        </div>

        {/* Ghost Mode Toggle */}
        <button
          onClick={() => setGhostMode(!ghostMode)}
          className={`glass-panel rounded-full p-3 transition-all ${ghostMode ? 'text-gray-400 border-gray-600' : 'text-[#CCFF00] glass-panel-active-lime'}`}
        >
          <Ghost className="w-6 h-6" />
        </button>
      </div>

      {/* Layer Controls - Right Side */}
      <div className="absolute top-24 right-4 md:right-6 flex flex-col gap-3 pointer-events-auto">
        <button
          onClick={() => toggleLayer('heatmap')}
          className={`glass-panel rounded-full p-3 transition-all ${layers.heatmap ? 'text-[#FF0099] glass-panel-active-magenta' : 'text-gray-400'}`}
        >
          <Flame className="w-5 h-5" />
        </button>
        <button
          onClick={() => toggleLayer('venues')}
          className={`glass-panel rounded-full p-3 transition-all ${layers.venues ? 'text-[#00CCFF] border-[#00CCFF]' : 'text-gray-400'}`}
        >
          <Map className="w-5 h-5" />
        </button>
        <button
          onClick={() => toggleLayer('squad')}
          className={`glass-panel rounded-full p-3 transition-all ${layers.squad ? 'text-[#CCFF00] glass-panel-active-lime' : 'text-gray-400'}`}
        >
          <Users className="w-5 h-5" />
        </button>
        <button
          onClick={() => toggleLayer('user')}
          className={`glass-panel rounded-full p-3 transition-all ${layers.user ? 'text-white border-white' : 'text-gray-400'}`}
        >
          <Navigation className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
