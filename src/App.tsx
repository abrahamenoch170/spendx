import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MapCanvas } from './components/MapCanvas';
import { HUD } from './components/HUD';
import { BottomSheet } from './components/BottomSheet';
import { useMapState } from './hooks/useMapState';
import { useLayers } from './hooks/useLayers';
import { CustomCursor } from './components/CustomCursor';
import { LandingPage } from './pages/LandingPage';
import OnboardingPage from './app/(main)/onboarding/page';
import ModesPage from './app/(main)/onboarding/modes/page';

const DashboardPage = () => {
  const { city, center, zoom, switchCity } = useMapState();
  const { layers, toggleLayer } = useLayers();
  const [ghostMode, setGhostMode] = useState(false);
  const [venueFilter, setVenueFilter] = useState<string>('all');

  return (
    <div className="relative w-full h-[100dvh] bg-[var(--bg-color)] font-sans text-[var(--text-primary)] overflow-hidden selection:bg-[var(--lime)] selection:text-black">
      <CustomCursor />
      <div className="grain-overlay" />
      <MapCanvas
        center={center}
        zoom={zoom}
        layers={layers}
        ghostMode={ghostMode}
        venueFilter={venueFilter}
      />
      <HUD
        city={city}
        switchCity={switchCity}
        layers={layers}
        toggleLayer={toggleLayer}
        ghostMode={ghostMode}
        setGhostMode={setGhostMode}
        isFullMap={true}
        setIsFullMap={() => {}}
        venueFilter={venueFilter}
        setVenueFilter={setVenueFilter}
      />
      <BottomSheet center={center} venueFilter={venueFilter} />
    </div>
  );
};

export default function App() {
  const { city, center, zoom, switchCity } = useMapState();
  const { layers, toggleLayer } = useLayers();
  const [ghostMode, setGhostMode] = useState(false);
  const [venueFilter, setVenueFilter] = useState<string>('all');

  const mapComponent = (
    <>
      <MapCanvas
        center={center}
        zoom={zoom}
        layers={layers}
        ghostMode={ghostMode}
        venueFilter={venueFilter}
      />
      <HUD
        city={city}
        switchCity={switchCity}
        layers={layers}
        toggleLayer={toggleLayer}
        ghostMode={ghostMode}
        setGhostMode={setGhostMode}
        isFullMap={false}
        setIsFullMap={() => {}}
        venueFilter={venueFilter}
        setVenueFilter={setVenueFilter}
      />
      <BottomSheet center={center} venueFilter={venueFilter} />
    </>
  );

  return (
    <Routes>
      <Route path="/" element={<LandingPage mapComponent={mapComponent} setIsFullMap={() => {}} />} />
      <Route path="/onboarding" element={<OnboardingPage />} />
      <Route path="/onboarding/modes" element={<ModesPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
