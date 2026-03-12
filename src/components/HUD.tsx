import React from 'react';
import { CITIES } from '../hooks/useMapState';
import { useLayers } from '../hooks/useLayers';
import { Map, Users, Flame, Navigation, Ghost, Maximize2, Minimize2, Search, Settings, User } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export function HUD({
  city,
  switchCity,
  layers,
  toggleLayer,
  ghostMode,
  setGhostMode,
  isFullMap,
  setIsFullMap
}: {
  city: string,
  switchCity: (city: keyof typeof CITIES) => void,
  layers: ReturnType<typeof useLayers>['layers'],
  toggleLayer: ReturnType<typeof useLayers>['toggleLayer'],
  ghostMode: boolean,
  setGhostMode: (val: boolean) => void,
  isFullMap?: boolean,
  setIsFullMap?: (val: boolean) => void
}) {
  return (
    <div className="absolute top-0 left-0 w-full p-4 md:p-6 z-[1000] pointer-events-none flex flex-col gap-4">
      {/* Top Bar - Snapchat Style */}
      <div className="flex justify-between items-center w-full pointer-events-auto gap-3">
        
        {/* Profile / Settings (Left) */}
        <div className="flex gap-2">
          <button className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[var(--card-bg)]/90 backdrop-blur-md border border-[var(--border-color)] shadow-lg flex items-center justify-center text-[var(--text-primary)] hover:text-[var(--lime)] transition-colors">
            <User className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <button className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[var(--card-bg)]/90 backdrop-blur-md border border-[var(--border-color)] shadow-lg flex items-center justify-center text-[var(--text-primary)] hover:text-[var(--cyan)] transition-colors hidden sm:flex">
            <Settings className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>

        {/* Search / City Selector (Center) */}
        <div className="flex-1 max-w-md rounded-full p-2 px-3 md:px-4 flex items-center gap-2 md:gap-3 bg-[var(--card-bg)]/90 backdrop-blur-md border border-[var(--border-color)] shadow-lg">
          <Search className="w-4 h-4 md:w-5 md:h-5 text-[var(--text-secondary)] shrink-0" />
          <select
            value={city}
            onChange={(e) => switchCity(e.target.value as keyof typeof CITIES)}
            className="bg-transparent text-[var(--text-primary)] font-display font-bold text-sm md:text-lg outline-none appearance-none cursor-pointer flex-1 w-full min-w-0"
          >
            {Object.keys(CITIES).map(c => (
              <option key={c} value={c} className="bg-[var(--card-bg)] text-[var(--text-primary)]">{c}</option>
            ))}
            {!Object.keys(CITIES).includes(city) && (
              <option value={city} className="bg-[var(--card-bg)] text-[var(--text-primary)]">{city}</option>
            )}
          </select>
        </div>

        {/* Right Actions */}
        <div className="flex gap-2">
          {setIsFullMap && (
            <button
              onClick={() => setIsFullMap(!isFullMap)}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[var(--card-bg)]/90 backdrop-blur-md border border-[var(--border-color)] shadow-lg flex items-center justify-center transition-all text-[var(--text-primary)] hover:text-[var(--lime)]"
              title={isFullMap ? "Exit Full Map" : "View Full Map"}
            >
              {isFullMap ? <Minimize2 className="w-5 h-5 md:w-6 md:h-6" /> : <Maximize2 className="w-5 h-5 md:w-6 md:h-6" />}
            </button>
          )}
          {/* Ghost Mode Toggle */}
          <button
            onClick={() => setGhostMode(!ghostMode)}
            className={`w-10 h-10 md:w-12 md:h-12 rounded-full backdrop-blur-md shadow-lg flex items-center justify-center transition-all ${ghostMode ? 'bg-[var(--card-bg)]/90 text-[var(--text-secondary)] border border-[var(--border-color)]' : 'bg-[var(--card-bg)]/90 text-[var(--lime)] border border-[var(--lime)] shadow-[0_0_15px_var(--lime)]'}`}
            title="Ghost Mode"
          >
            <Ghost className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>
      </div>

      {/* Layer Controls - Right Side */}
      <div className="absolute top-20 md:top-24 right-4 md:right-6 flex flex-col gap-3 pointer-events-auto">
        <button
          onClick={() => toggleLayer('heatmap')}
          className={`w-10 h-10 md:w-12 md:h-12 rounded-full backdrop-blur-md shadow-lg flex items-center justify-center transition-all ${layers.heatmap ? 'bg-[var(--card-bg)]/90 text-[var(--magenta)] border border-[var(--magenta)] shadow-[0_0_15px_var(--magenta)]' : 'bg-[var(--card-bg)]/90 text-[var(--text-secondary)] border border-[var(--border-color)]'}`}
          title="Toggle Heatmap"
        >
          <Flame className="w-5 h-5 md:w-6 md:h-6" />
        </button>
        <button
          onClick={() => toggleLayer('venues')}
          className={`w-10 h-10 md:w-12 md:h-12 rounded-full backdrop-blur-md shadow-lg flex items-center justify-center transition-all ${layers.venues ? 'bg-[var(--card-bg)]/90 text-[var(--cyan)] border border-[var(--cyan)] shadow-[0_0_15px_var(--cyan)]' : 'bg-[var(--card-bg)]/90 text-[var(--text-secondary)] border border-[var(--border-color)]'}`}
          title="Toggle Venues"
        >
          <Map className="w-5 h-5 md:w-6 md:h-6" />
        </button>
        <button
          onClick={() => toggleLayer('squad')}
          className={`w-10 h-10 md:w-12 md:h-12 rounded-full backdrop-blur-md shadow-lg flex items-center justify-center transition-all ${layers.squad ? 'bg-[var(--card-bg)]/90 text-[var(--lime)] border border-[var(--lime)] shadow-[0_0_15px_var(--lime)]' : 'bg-[var(--card-bg)]/90 text-[var(--text-secondary)] border border-[var(--border-color)]'}`}
          title="Toggle Squad"
        >
          <Users className="w-5 h-5 md:w-6 md:h-6" />
        </button>
        <button
          onClick={() => toggleLayer('user')}
          className={`w-10 h-10 md:w-12 md:h-12 rounded-full backdrop-blur-md shadow-lg flex items-center justify-center transition-all ${layers.user ? 'bg-[var(--card-bg)]/90 text-[var(--text-primary)] border border-[var(--text-primary)] shadow-[0_0_15px_var(--text-primary)]' : 'bg-[var(--card-bg)]/90 text-[var(--text-secondary)] border border-[var(--border-color)]'}`}
          title="Toggle My Location"
        >
          <Navigation className="w-5 h-5 md:w-6 md:h-6" />
        </button>
        <ThemeToggle />
      </div>
    </div>
  );
}
