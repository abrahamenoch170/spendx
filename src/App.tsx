import React, { useState } from 'react';
import { MapCanvas } from './components/MapCanvas';
import { HUD } from './components/HUD';
import { BottomSheet } from './components/BottomSheet';
import { useMapState } from './hooks/useMapState';
import { useLayers } from './hooks/useLayers';

export default function App() {
  const { city, center, zoom, switchCity } = useMapState();
  const { layers, toggleLayer } = useLayers();
  const [ghostMode, setGhostMode] = useState(false);

  return (
    <div className="relative w-full h-[100dvh] bg-[#0A0A0A] font-sans text-white overflow-hidden selection:bg-[#CCFF00] selection:text-black">
      <MapCanvas
        center={center}
        zoom={zoom}
        layers={layers}
        ghostMode={ghostMode}
      />
      <HUD
        city={city}
        switchCity={switchCity}
        layers={layers}
        toggleLayer={toggleLayer}
        ghostMode={ghostMode}
        setGhostMode={setGhostMode}
      />
      <BottomSheet center={center} />
    </div>
  );
}
