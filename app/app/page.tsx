"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  House, 
  Calendar, 
  UsersThree, 
  MapTrifold, 
  UserCircle,
  Sparkle,
  Plus,
  ArrowRight
} from '@phosphor-icons/react';

const Logo = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center gap-1 font-black tracking-tighter text-2xl ${className}`}>
    <span>spendx</span>
    <span className="text-[var(--lime)]">*</span>
  </div>
);

const TabHeader = ({ title, icon: Icon, color }: { title: string, icon: any, color: string }) => (
  <div className="px-6 pt-12 pb-6">
    <div className="flex items-center justify-between mb-8">
      <Logo />
      <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
        <Plus size={20} weight="bold" />
      </button>
    </div>
    <div className="flex items-center gap-4">
      <div className={`w-16 h-16 rounded-2xl ${color} flex items-center justify-center shadow-lg`}>
        <Icon size={32} weight="fill" className="text-black" />
      </div>
      <div>
        <h1 className="text-4xl font-black tracking-tighter uppercase">{title}</h1>
        <div className="flex items-center gap-2 text-white/40 text-xs font-bold tracking-widest uppercase">
          <Sparkle size={12} weight="fill" className="text-[var(--lime)]" />
          <span>Live Sync Active</span>
        </div>
      </div>
    </div>
  </div>
);

const HomeTab = () => (
  <div className="flex flex-col min-h-screen">
    <TabHeader title="Dashboard" icon={House} color="bg-[var(--lime)]" />
    <div className="px-6 space-y-6">
      <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--lime)]/10 blur-[60px]" />
        <h3 className="text-label text-white/40 mb-2">Total Balance</h3>
        <div className="text-5xl font-black tracking-tighter mb-4">$1,240.00</div>
        <div className="flex items-center gap-2 text-[var(--lime)] text-sm font-bold">
          <Sparkle size={16} weight="fill" />
          <span>3 active plans this week</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-6 rounded-[2rem] bg-white/5 border border-white/10">
          <div className="text-label text-white/40 mb-1">Owed to you</div>
          <div className="text-2xl font-black text-[var(--cyan)]">$420.00</div>
        </div>
        <div className="p-6 rounded-[2rem] bg-white/5 border border-white/10">
          <div className="text-label text-white/40 mb-1">You owe</div>
          <div className="text-2xl font-black text-[var(--magenta)]">$150.00</div>
        </div>
      </div>
    </div>
  </div>
);

const PlanTab = () => (
  <div className="flex flex-col min-h-screen">
    <TabHeader title="Itinerary" icon={Calendar} color="bg-[var(--magenta)]" />
    <div className="px-6 flex flex-col items-center justify-center flex-1 py-20 text-center">
      <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
        <Calendar size={40} weight="thin" className="text-white/20" />
      </div>
      <h2 className="text-2xl font-black mb-2 uppercase">No active plans</h2>
      <p className="text-white/40 text-sm max-w-[25ch]">Create a plan and invite the squad to get started.</p>
    </div>
  </div>
);

const GroupTab = () => (
  <div className="flex flex-col min-h-screen">
    <TabHeader title="Squads" icon={UsersThree} color="bg-[var(--cyan)]" />
    <div className="px-6 space-y-4">
      {['Weekend in Lagos', 'Dinner Crew', 'Tech Bros'].map((squad, i) => (
        <div key={i} className="p-6 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-between group hover:bg-white/10 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-zinc-800 overflow-hidden">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${squad}`} alt="Squad" />
            </div>
            <div>
              <div className="font-bold">{squad}</div>
              <div className="text-xs text-white/40 uppercase tracking-widest">{i + 3} members</div>
            </div>
          </div>
          <ArrowRight size={20} className="text-white/20 group-hover:text-white transition-colors" />
        </div>
      ))}
    </div>
  </div>
);

const MapTab = () => (
  <div className="flex flex-col min-h-screen">
    <TabHeader title="Explorer" icon={MapTrifold} color="bg-[var(--teal)]" />
    <div className="px-6 flex-1 relative">
      <div className="absolute inset-x-6 inset-y-0 rounded-[2rem] bg-zinc-900 border border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/-122.4194,37.7749,12,0/600x600?access_token=pk.eyJ1IjoiYWlzdHVkaW8iLCJhIjoiY2x0eGZ4Z3Z4MDJqMjJpcXp4Z3Z4MDJqMiJ9')] bg-cover bg-center opacity-40 grayscale" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="p-4 bg-black/80 backdrop-blur-md border border-white/10 rounded-2xl text-center">
            <div className="text-xs font-bold uppercase tracking-widest text-[var(--lime)] mb-1">Map Preview</div>
            <div className="text-sm text-white/60">Interactive maps coming soon</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ProfileTab = () => (
  <div className="flex flex-col min-h-screen">
    <TabHeader title="Account" icon={UserCircle} color="bg-white" />
    <div className="px-6 space-y-8">
      <div className="flex items-center gap-6 p-6 rounded-[2rem] bg-white/5 border border-white/10">
        <div className="w-20 h-20 rounded-[2rem] bg-[var(--lime)] overflow-hidden">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Spendx" alt="User" />
        </div>
        <div>
          <div className="text-2xl font-black tracking-tighter">Abraham Enoch</div>
          <div className="text-white/40 text-sm">abrahamenoch170@gmail.com</div>
        </div>
      </div>
      
      <div className="space-y-2">
        {['Settings', 'Notifications', 'Security', 'Help & Support'].map((item, i) => (
          <button key={i} className="w-full p-6 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between hover:bg-white/10 transition-colors">
            <span className="font-bold">{item}</span>
            <ArrowRight size={18} className="text-white/20" />
          </button>
        ))}
      </div>
    </div>
  </div>
);

const tabs = [
  { id: 'home', label: 'Home', icon: House },
  { id: 'plan', label: 'Plan', icon: Calendar },
  { id: 'group', label: 'Group', icon: UsersThree },
  { id: 'map', label: 'Map', icon: MapTrifold },
  { id: 'profile', label: 'Profile', icon: UserCircle },
];

export default function AppLayout() {
  const [activeTab, setActiveTab] = useState('home');
  const [direction, setDirection] = useState(0);

  const handleTabChange = (newTabId: string) => {
    if (newTabId === activeTab) return;
    const currentIndex = tabs.findIndex(t => t.id === activeTab);
    const newIndex = tabs.findIndex(t => t.id === newTabId);
    setDirection(newIndex > currentIndex ? 1 : -1);
    setActiveTab(newTabId);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '20%' : '-20%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '20%' : '-20%',
      opacity: 0,
    }),
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white overflow-hidden selection:bg-[var(--lime)] selection:text-black">
      <div className="grain-overlay" />
      
      {/* Main Content Area */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={activeTab}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 400, damping: 40 }}
            className="absolute inset-0 overflow-y-auto pb-32"
          >
            {activeTab === 'home' && <HomeTab />}
            {activeTab === 'plan' && <PlanTab />}
            {activeTab === 'group' && <GroupTab />}
            {activeTab === 'map' && <MapTab />}
            {activeTab === 'profile' && <ProfileTab />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/80 border-t border-white/5 backdrop-blur-2xl pb-[env(safe-area-inset-bottom)] z-50">
        <div className="flex justify-around items-center h-24 px-4">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className="relative flex flex-col items-center justify-center w-16 h-full outline-none [-webkit-tap-highlight-color:transparent]"
              >
                <div className="relative flex items-center justify-center w-12 h-12 mb-1">
                  {isActive && (
                    <motion.div
                      layoutId="activeTabPill"
                      className="absolute inset-0 bg-[var(--lime)] rounded-2xl"
                      transition={{ type: 'spring', stiffness: 400, damping: 40 }}
                    />
                  )}
                  <Icon
                    size={24}
                    weight={isActive ? 'fill' : 'regular'}
                    className={`relative z-10 transition-colors duration-300 ${
                      isActive ? 'text-black' : 'text-white/40'
                    }`}
                  />
                </div>
                <span
                  className={`text-[10px] font-black uppercase tracking-widest transition-colors duration-300 ${
                    isActive ? 'text-[var(--lime)]' : 'text-white/20'
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
