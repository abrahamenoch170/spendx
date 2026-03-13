import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMapStore } from '../../store/mapStore';
import { Marker, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { Cross } from 'lucide-react';

export const SquadRouteHUD = () => {
  const { squadLocations, routes, emergencyLayerActive, setEmergencyLayerActive, setSelectedCity } = useMapStore();

  return (
    <>
      {/* Squad Dots Layer */}
      {squadLocations.map(s => (
        <Marker key={s.id} position={[s.lat, s.lng]} />
      ))}

      {/* Route Layer */}
      {routes.map((route, i) => (
        <Polyline key={i} positions={route} color="magenta" dashArray="10, 10" />
      ))}

      {/* Emergency Layer */}
      <AnimatePresence>
        {emergencyLayerActive && (
          <Marker position={[6.5260, 3.3810]} icon={L.divIcon({ html: '<div class="text-red-500"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M2 12h20"/></svg></div>' })} />
        )}
      </AnimatePresence>

      {/* HUD Controls */}
      <div className="absolute top-6 left-6 flex flex-col gap-2 z-[1000]">
        <button onClick={() => setEmergencyLayerActive(!emergencyLayerActive)} className="bg-[#050505] p-4 rounded-full border border-white/10">
          <Cross className="w-6 h-6 text-red-500" />
        </button>
        <select onChange={(e) => setSelectedCity(e.target.value)} className="bg-[#050505] p-4 rounded-full border border-white/10 text-xs">
          <option>Lagos</option>
          <option>London</option>
          <option>New York</option>
        </select>
      </div>
    </>
  );
};
