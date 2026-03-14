import React, { useEffect } from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  House, 
  Calendar, 
  UsersThree, 
  MapTrifold, 
  UserCircle 
} from '@phosphor-icons/react';

const TABS = [
  { id: 'home', label: 'Home', path: '/app/home', Icon: House },
  { id: 'plan', label: 'Plan', path: '/app/plan', Icon: Calendar },
  { id: 'group', label: 'Group', path: '/app/group', Icon: UsersThree },
  { id: 'map', label: 'Map', path: '/app/map', Icon: MapTrifold },
  { id: 'profile', label: 'Profile', path: '/app/profile', Icon: UserCircle },
];

export const AppLayout = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  useEffect(() => {
    const hasAccount = localStorage.getItem('spendx_has_account');
    if (!hasAccount) {
      navigate('/get-started?reason=unauth', { replace: true });
    }
  }, [navigate]);

  return (
    <div className="flex flex-col h-[100dvh] bg-spendx-black text-spendx-white overflow-hidden relative">
      <div className="grain-overlay opacity-20" />
      
      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPath}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
            className="h-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 w-full bg-spendx-black/80 backdrop-blur-xl border-t border-white/10 z-50 pb-safe">
        <div className="max-w-md mx-auto px-6 py-3 flex items-center justify-between">
          {TABS.map((tab) => {
            const isActive = currentPath === tab.path;
            
            return (
              <Link
                key={tab.id}
                to={tab.path}
                className="relative flex flex-col items-center justify-center p-2 transition-all active:scale-90"
              >
                <div className="relative z-10">
                  <tab.Icon 
                    size={28} 
                    weight={isActive ? "fill" : "regular"}
                    className={isActive ? "text-spendx-black" : "text-white/60"}
                  />
                </div>
                
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-spendx-lime rounded-2xl z-0"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                
                <span className={`text-[10px] font-black uppercase tracking-tighter mt-1 z-10 ${isActive ? "text-spendx-black" : "text-white/40"}`}>
                  {tab.label}
                </span>
              </Link>
            );
          })}
        </div>
        
        {/* Safe Area Spacer for non-supporting browsers */}
        <div className="h-[env(safe-area-inset-bottom)]" />
      </nav>
    </div>
  );
};
