import React from 'react';
import { CITIES } from '../hooks/useMapState';
import { useLayers } from '../hooks/useLayers';
import { Map, Users, Flame, Navigation, Ghost, Maximize2, Minimize2 } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import Lottie from 'lottie-react';
import placeholderAnimation from '../assets/lottie/placeholder.json';

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
      {/* Top Bar */}
      <div className="flex justify-between items-start w-full pointer-events-auto">
        {/* City Selector */}
        <div className="glass rounded-2xl p-2 flex items-center gap-2 bg-black/50 dark:bg-transparent backdrop-blur-md">
          <Map className="w-5 h-5 text-[var(--lime)]" />
          <select
            value={city}
            onChange={(e) => switchCity(e.target.value as keyof typeof CITIES)}
            className="bg-transparent text-[var(--text-primary)] font-display font-bold text-lg outline-none appearance-none cursor-pointer pr-4"
          >
            {Object.keys(CITIES).map(c => (
              <option key={c} value={c} className="bg-[var(--card-bg)] text-[var(--text-primary)]">{c}</option>
            ))}
            {!Object.keys(CITIES).includes(city) && (
              <option value={city} className="bg-[var(--card-bg)] text-[var(--text-primary)]">{city}</option>
            )}
          </select>
        </div>

        <div className="flex gap-2">
          {setIsFullMap && (
            <button
              onClick={() => setIsFullMap(!isFullMap)}
              className="glass-panel rounded-full p-3 transition-all text-[var(--text-primary)] hover:text-[var(--lime)] bg-black/50 dark:bg-transparent"
              title={isFullMap ? "Exit Full Map" : "View Full Map"}
            >
              {isFullMap ? <Minimize2 className="w-6 h-6" /> : <Maximize2 className="w-6 h-6" />}
            </button>
          )}
          {/* Ghost Mode Toggle */}
          <button
            onClick={() => setGhostMode(!ghostMode)}
            className={`glass-panel rounded-full p-3 transition-all bg-black/50 dark:bg-transparent flex items-center justify-center ${ghostMode ? 'text-[var(--text-secondary)] border-[var(--border-color)]' : 'text-[var(--lime)] glass-panel-active-lime'}`}
          >
            <div className="w-6 h-6 relative">
              <Ghost className="w-6 h-6 absolute inset-0 opacity-0" /> {/* Keep for screen readers/fallback */}
              <Lottie animationData={placeholderAnimation} loop={!ghostMode} autoplay={!ghostMode} className="w-full h-full" style={{ filter: ghostMode ? 'grayscale(100%) opacity(50%)' : 'none' }} />
            </div>
          </button>
        </div>
      </div>

      {/* Layer Controls - Right Side */}
      <div className="absolute top-24 right-4 md:right-6 flex flex-col gap-3 pointer-events-auto">
        <button
          onClick={() => toggleLayer('heatmap')}
          className={`glass-panel rounded-full p-3 transition-all bg-black/50 dark:bg-transparent flex items-center justify-center ${layers.heatmap ? 'text-[var(--magenta)] glass-panel-active-magenta' : 'text-[var(--text-secondary)]'}`}
        >
          <div className="w-5 h-5 relative">
            <Flame className="w-5 h-5 absolute inset-0 opacity-0" />
            <Lottie animationData={placeholderAnimation} loop={layers.heatmap} autoplay={layers.heatmap} className="w-full h-full" style={{ filter: !layers.heatmap ? 'grayscale(100%) opacity(50%)' : 'none' }} />
          </div>
        </button>
        <button
          onClick={() => toggleLayer('venues')}
          className={`glass-panel rounded-full p-3 transition-all bg-black/50 dark:bg-transparent flex items-center justify-center ${layers.venues ? 'text-[var(--cyan)] border-[var(--cyan)]' : 'text-[var(--text-secondary)]'}`}
        >
          <div className="w-5 h-5 relative">
            <Map className="w-5 h-5 absolute inset-0 opacity-0" />
            <Lottie animationData={placeholderAnimation} loop={layers.venues} autoplay={layers.venues} className="w-full h-full" style={{ filter: !layers.venues ? 'grayscale(100%) opacity(50%)' : 'none' }} />
          </div>
        </button>
        <button
          onClick={() => toggleLayer('squad')}
          className={`glass-panel rounded-full p-3 transition-all bg-black/50 dark:bg-transparent flex items-center justify-center ${layers.squad ? 'text-[var(--lime)] glass-panel-active-lime' : 'text-[var(--text-secondary)]'}`}
        >
          <div className="w-5 h-5 relative">
            <Users className="w-5 h-5 absolute inset-0 opacity-0" />
            <Lottie animationData={placeholderAnimation} loop={layers.squad} autoplay={layers.squad} className="w-full h-full" style={{ filter: !layers.squad ? 'grayscale(100%) opacity(50%)' : 'none' }} />
          </div>
        </button>
        <button
          onClick={() => toggleLayer('user')}
          className={`glass-panel rounded-full p-3 transition-all bg-black/50 dark:bg-transparent flex items-center justify-center ${layers.user ? 'text-[var(--text-primary)] border-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}`}
        >
          <div className="w-5 h-5 relative">
            <Navigation className="w-5 h-5 absolute inset-0 opacity-0" />
            <Lottie animationData={placeholderAnimation} loop={layers.user} autoplay={layers.user} className="w-full h-full" style={{ filter: !layers.user ? 'grayscale(100%) opacity(50%)' : 'none' }} />
          </div>
        </button>
        <ThemeToggle />
      </div>
    </div>
  );
}
