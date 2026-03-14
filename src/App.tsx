import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { MapCanvas } from './components/MapCanvas';
import { HUD } from './components/HUD';
import { BottomSheet } from './components/map/BottomSheet';
import { useMapState } from './hooks/useMapState';
import { useLayers } from './hooks/useLayers';
import { IntroPage } from './pages/IntroPage';
import { IntroRedirector } from './components/layout/IntroRedirector';
import ProfilePage from './app/onboarding/profile/page';
import ModeSelectPage from './app/onboarding/mode-select/page';
import { LandingPage } from './pages/LandingPage';
import { GetStartedPage } from './pages/GetStartedPage';
import { AuthPage } from './pages/AuthPage';
import { AppLayout } from './components/layout/AppLayout';
import { ArrowLeft } from 'lucide-react';
import { 
  HomeTabPlaceholder, 
  PlanTabPlaceholder, 
  GroupTabPlaceholder, 
  MapTabPlaceholder, 
  ProfileTabPlaceholder 
} from './components/placeholders/TabPlaceholders';
import OnboardingPage from './app/(main)/onboarding/page';
import ModesPage from './app/(main)/onboarding/modes/page';
import { useTab } from './context/TabContext';
import { DashboardTab } from './components/dashboard/DashboardTab';
import { SpendxPage } from './pages/SpendxPage';
import { SquadTab } from './components/SquadTab';
import { ProfileTab } from './components/profile/ProfileTab';
import { SettingsPage } from './pages/SettingsPage';
import { EnterpriseTab } from './components/EnterpriseTab';
import { PublicEventPage } from './pages/PublicEventPage';
import { ChatTab } from './components/ChatTab';
import { PlanTab } from './components/plan/PlanTab';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { city, center, zoom, switchCity } = useMapState();
  const { layers, toggleLayer } = useLayers();
  const [ghostMode, setGhostMode] = useState(false);
  const [venueFilter, setVenueFilter] = useState<string>('all');
  const { activeTab, setActiveTab } = useTab();

  useEffect(() => {
    const hasAccount = localStorage.getItem('spendx_has_account');
    if (!hasAccount) {
      navigate('/app/auth', { replace: true });
    }
  }, [navigate]);

  return (
    <div className="relative w-full h-[100dvh] bg-[var(--bg-color)] font-sans text-[var(--text-primary)] overflow-hidden selection:bg-[var(--lime)] selection:text-black">
      <div className="grain-overlay" />
      
      {activeTab === 'map' ? (
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
            isFullMap={true}
            setIsFullMap={() => setActiveTab('home')}
            venueFilter={venueFilter}
            setVenueFilter={setVenueFilter}
          />
          <BottomSheet center={center} venueFilter={venueFilter} />
        </>
      ) : activeTab === 'home' ? (
        <DashboardTab />
      ) : activeTab === 'squad' ? (
        <SquadTab />
      ) : activeTab === 'chat' ? (
        <ChatTab />
      ) : activeTab === 'profile' ? (
        <ProfileTab />
      ) : activeTab === 'enterprise' ? (
        <EnterpriseTab />
      ) : activeTab === 'plan' ? (
        <PlanTab />
      ) : (
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6 capitalize">{activeTab}</h1>
          <button 
            onClick={() => setActiveTab('home')}
            className="p-3 bg-[var(--card-bg)] rounded-xl"
          >
            Back Home
          </button>
        </div>
      )}

      {/* Bottom Nav removed per user request */}
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
    </>
  );

  return (
    <Routes>
      <Route path="/" element={<LandingPage mapComponent={mapComponent} setIsFullMap={() => {}} />} />
      <Route path="/get-started" element={<GetStartedPage />} />
      <Route path="/intro-check" element={<IntroRedirector />} />
      <Route path="/app/intro" element={<IntroPage />} />
      <Route path="/app/onboarding/profile" element={<ProfilePage />} />
      <Route path="/app/onboarding/mode-select" element={<ModeSelectPage />} />
      
      {/* App Shell Routes */}
      <Route path="/app" element={<AppLayout />}>
        <Route path="home" element={<HomeTabPlaceholder />} />
        <Route path="plan" element={<PlanTabPlaceholder />} />
        <Route path="group" element={<GroupTabPlaceholder />} />
        <Route path="map" element={<MapTabPlaceholder />} />
        <Route path="profile" element={<ProfileTabPlaceholder />} />
      </Route>

      <Route path="/app/auth" element={<AuthPage />} />
      <Route path="/app/intro" element={<OnboardingPage />} />
      <Route path="/app/modes" element={<ModesPage />} />
      <Route path="/app/dashboard" element={<DashboardPage />} />
      <Route path="/app/settings" element={<SettingsPage />} />
      <Route path="/app/spendx/:id" element={<SpendxPage />} />
      <Route path="/e/:id" element={<PublicEventPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
