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
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <button 
              onClick={() => setActiveTab('home')}
              className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors backdrop-blur-md"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-3xl font-bold">Plan your spendx</h1>
          </div>
          <div className="flex-1 space-y-4">
            <div className="bg-[var(--card-bg)] p-4 rounded-2xl border border-[var(--border-color)]">
              <h3 className="font-bold mb-2">Current Route</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[var(--lime)] rounded-full flex items-center justify-center text-black font-bold">1</div>
                  <span>The Alchemist</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[var(--magenta)] rounded-full flex items-center justify-center text-white font-bold">2</div>
                  <span>Fabric London</span>
                </div>
              </div>
            </div>
            
            <div className="bg-[var(--card-bg)] p-4 rounded-2xl border border-[var(--border-color)]">
              <h3 className="font-bold mb-2">Squad (3)</h3>
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-[var(--bg-color)] bg-[var(--border-color)]" />
                ))}
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => {
              const id = Math.random().toString(36).substring(7);
              navigate(`/app/spendx/${id}`);
            }}
            className="w-full py-5 bg-[var(--lime)] text-black rounded-2xl font-black text-xl shadow-[0_0_30px_rgba(204,255,0,0.3)] mb-24"
          >
            LOCK IN SPENDX*
          </button>
        </div>
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
