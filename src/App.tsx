import React, { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapCanvas } from './components/MapCanvas';
import { HUD } from './components/HUD';
import { BottomSheet } from './components/BottomSheet';
import { useMapState } from './hooks/useMapState';
import { useLayers } from './hooks/useLayers';
import { NavigationMenu } from './components/NavigationMenu';
import { QuickActions } from './components/QuickActions';
import { InteractiveButton, FloatingInput } from './components/InteractiveElements';
import { SignInModal } from './components/SignInModal';
import { CustomCursor } from './components/CustomCursor';
import {
  StarFloat, DeadChat, LinkExpand, SoloFigure, SquadFigures, BigGroup, DateFigures,
  MapPulse, CleanMath, RideArrives, ShareLink, BudgetIcon, StrandedIcon, BoringIcon, FallingApartIcon
} from './components/Illustrations';
import successAnimationData from './assets/success.json';

const Lottie = React.lazy(() => import('lottie-react'));

const springEasing = [0.34, 1.56, 0.64, 1];

const ChevronDownIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export default function App() {
  const { city, center, zoom, switchCity } = useMapState();
  const { layers, toggleLayer } = useLayers();
  const [ghostMode, setGhostMode] = useState(false);
  const [isFullMap, setIsFullMap] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [venueFilter, setVenueFilter] = useState<string>('all');

  const stripeColors = ['var(--lime)', 'var(--magenta)', 'var(--cyan)', 'var(--teal)'];

  useEffect(() => {
    if (isFullMap) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isFullMap]);

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
        isFullMap={isFullMap}
        setIsFullMap={setIsFullMap}
        venueFilter={venueFilter}
        setVenueFilter={setVenueFilter}
      />
      <BottomSheet center={center} venueFilter={venueFilter} />
    </>
  );

  if (isFullMap) {
    return (
      <div className="relative w-full h-[100dvh] bg-[var(--bg-color)] font-sans text-[var(--text-primary)] overflow-hidden selection:bg-[var(--lime)] selection:text-black">
        <CustomCursor />
        <div className="grain-overlay" />
        {mapComponent}
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen bg-black font-sans text-black selection:bg-black selection:text-[var(--lime)] overflow-x-hidden">
      <CustomCursor />
      <div className="grain-overlay" />
      
      {/* Fixed Background Stripes */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 w-full h-screen flex flex-row overflow-hidden z-0"
      >
        {stripeColors.map((color, index) => (
          <div
            key={index}
            className="h-full flex-1 transition-all duration-700 ease-in-out hover:brightness-110 relative"
            style={{ backgroundColor: color }}
          />
        ))}
      </motion.div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full p-8 z-[100] flex justify-between items-center mix-blend-difference text-white">
        <div className="font-display font-black text-3xl tracking-tighter cursor-pointer">spendx*</div>
        <div className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest">
          <a href="#how-it-works" className="hover:text-[var(--lime)] transition-colors">How it works</a>
          <a href="#explore-map" className="hover:text-[var(--lime)] transition-colors">Explore</a>
          <a href="#see-squad" className="hover:text-[var(--lime)] transition-colors">Squad</a>
        </div>
        <button 
          onClick={() => setIsSignInModalOpen(true)}
          className="bg-white text-black px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest hover:bg-[var(--lime)] transition-all active:scale-95"
        >
          Sign In
        </button>
      </nav>
      <NavigationMenu />
      <QuickActions />
      <SignInModal isOpen={isSignInModalOpen} onClose={() => setIsSignInModalOpen(false)} />

      {/* Scrollable Foreground Content */}
      <div className="relative z-10 w-full min-h-screen flex flex-col items-center">
        
        {/* HERO SECTION - Lime Overlay */}
        <section className="relative w-full bg-[var(--lime)] flex flex-col items-center justify-center min-h-screen pt-32 pb-32 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.05] grain-bg pointer-events-none"></div>
          
          {/* Large Background Text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-black text-black/5 select-none pointer-events-none tracking-tighter">
            SPENDX
          </div>

          <div className="relative z-10 w-full max-w-[1400px] mx-auto section-padding flex flex-col items-center text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: springEasing }}
              className="mb-8"
            >
              <span className="bg-black text-[var(--lime)] px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.3em]">Version 2.5 Live</span>
            </motion.div>

            <h1 className="text-hero text-black mb-8 max-w-6xl leading-[0.85]">
              {['YOUR', 'PLANS', 'HIT', 'DIFFERENT', 'WHEN', 'THEY', 'ACTUALLY', 'HAPPEN.'].map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 100, opacity: 0, rotate: 5 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  transition={{ delay: 0.2 + i * 0.05, duration: 0.8, ease: springEasing }}
                  className="inline-block mr-[0.2em] last:mr-0"
                >
                  {word}
                </motion.span>
              ))}
            </h1>
            
            <motion.p 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8, ease: springEasing }}
              className="text-2xl md:text-3xl font-medium text-black/70 mb-12 max-w-[35ch] mx-auto leading-tight tracking-tight"
            >
              No more group chat graveyards. One link controls your whole day—where you go, how you get there, and what it costs.
            </motion.p>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.8, ease: springEasing }}
              className="flex flex-col md:flex-row gap-4"
            >
              <InteractiveButton 
                onClick={() => setIsSignInModalOpen(true)}
                className="bg-black text-[var(--lime)] px-16 py-8 rounded-full shadow-2xl text-xl font-black uppercase tracking-widest hover:scale-105 transition-transform"
              >
                Get the link
              </InteractiveButton>
            </motion.div>
          </div>

          {/* Bouncing Scroll Indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="absolute bottom-12 animate-bounce cursor-pointer"
            onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <ChevronDownIcon />
          </motion.div>
        </section>

        {/* WHEN PLANS FALL APART - Magenta Overlay */}
        <section id="how-it-works" className="relative w-full bg-[var(--magenta)] flex flex-col items-center py-40 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.05] grain-bg pointer-events-none"></div>
          
          <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: springEasing }}
              >
                <span className="text-xs font-black uppercase tracking-[0.3em] text-black/40 mb-6 block">The Problem</span>
                <h2 className="text-7xl md:text-9xl font-black text-white leading-[0.85] tracking-tighter mb-8">WHEN PLANS FALL APART</h2>
                <p className="text-2xl text-white/80 max-w-md leading-snug font-medium">
                  The group chat where four people say "I'm down" but nobody picks the spot.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: springEasing }}
                className="relative"
              >
                <div className="bg-black p-12 rounded-[48px] shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="w-full aspect-square text-[var(--magenta)]">
                    <DeadChat className="w-full h-full" />
                  </div>
                </div>
                {/* Floating Badges */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-10 -right-10 bg-white text-black p-6 rounded-3xl font-black text-xl shadow-xl border-4 border-black"
                >
                  "I'M DOWN"
                </motion.div>
                <motion.div 
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute -bottom-10 -left-10 bg-[var(--lime)] text-black p-6 rounded-3xl font-black text-xl shadow-xl border-4 border-black"
                >
                  "WHERE?"
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* LIVE MAP VISUALIZATION - Dark Section */}
        <section id="explore-map" className="relative w-full bg-black py-40">
          <div className="absolute inset-0 opacity-[0.03] grain-bg pointer-events-none"></div>
          <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 flex flex-col items-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-24"
            >
              <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-6">SEE WHERE THE <span className="text-[var(--lime)]">VIBE</span> IS</h2>
              <p className="text-xl text-white/50 max-w-2xl mx-auto font-medium">Live locations. Hotspots. Who's where, who's moving, where the energy is.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="w-full max-w-6xl aspect-[16/10] bg-[#141414] rounded-[48px] border border-white/10 overflow-hidden shadow-[0_0_100px_rgba(223,255,0,0.1)] relative"
            >
              {mapComponent}
              
              {/* Overlay UI */}
              <div className="absolute top-8 left-8 bg-black/80 backdrop-blur-md p-6 rounded-3xl border border-white/10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-3 h-3 rounded-full bg-[var(--lime)] animate-pulse" />
                  <span className="text-xs font-black uppercase tracking-widest text-white">Live Squad Activity</span>
                </div>
                <div className="flex -space-x-2">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-white/10" />
                  ))}
                </div>
              </div>
            </motion.div>
            
            <div className="mt-16">
              <InteractiveButton 
                onClick={() => setIsFullMap(true)} 
                className="bg-white text-black px-12 py-6 rounded-full font-black uppercase tracking-widest hover:bg-[var(--lime)] transition-all"
              >
                Enter Full Map
              </InteractiveButton>
            </div>
          </div>
        </section>

        {/* IMAGINE THIS - Cyan Overlay */}
        <section className="relative w-full bg-[var(--cyan)] py-40 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.05] grain-bg pointer-events-none"></div>
          <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6">
            <div className="flex flex-col items-center text-center mb-24">
              <span className="text-xs font-black uppercase tracking-[0.3em] text-black/40 mb-6 block">The Solution</span>
              <h2 className="text-7xl md:text-9xl font-black text-black leading-[0.85] tracking-tighter">INSTEAD, IT JUST WORKS.</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {[
                { title: "ONE LINK", desc: "Share it anywhere. Click it and you're in. Map, locations, costs—all of it lives there.", icon: LinkExpand },
                { title: "LIVE SYNC", desc: "Instant notifications when the squad moves. Never ask 'where you at?' again.", icon: MapPulse },
                { title: "CLEAN MATH", desc: "Bill splitting that doesn't suck. Visualized costs in real-time.", icon: CleanMath }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.8, ease: springEasing }}
                  className="bg-black/5 backdrop-blur-md rounded-[40px] p-12 border border-black/5 hover:bg-black/10 transition-colors group"
                >
                  <div className="w-20 h-20 bg-black text-[var(--cyan)] rounded-2xl p-5 mb-8 group-hover:scale-110 transition-transform">
                    <item.icon className="w-full h-full" />
                  </div>
                  <h4 className="text-3xl font-black text-black mb-4 tracking-tighter">{item.title}</h4>
                  <p className="text-lg text-black/60 font-medium leading-snug">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* WHOEVER YOU'RE WITH - Teal Overlay */}
        <section id="see-squad" className="relative w-full bg-[var(--teal)] py-40 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.05] grain-bg pointer-events-none"></div>
          <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6">
            <h2 className="text-7xl md:text-9xl font-black text-white text-center tracking-tighter mb-24">WHOEVER YOU'RE WITH</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "SOLO", icon: SoloFigure },
                { title: "DATE", icon: DateFigures },
                { title: "SQUAD", icon: SquadFigures },
                { title: "BIG GROUP", icon: BigGroup }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.8, ease: springEasing }}
                  className="bg-black/20 backdrop-blur-md rounded-[40px] p-10 border border-white/10 flex flex-col items-center text-center group hover:bg-black/30 transition-all"
                >
                  <div className="w-full aspect-square bg-white/5 rounded-3xl p-8 mb-8 group-hover:scale-105 transition-transform text-white">
                    <item.icon className="w-full h-full" />
                  </div>
                  <h4 className="text-4xl font-black text-white tracking-tighter">{item.title}</h4>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* WAITLIST & FOOTER - Black Overlay */}
        <section id="join-early-access" className="relative w-full bg-black py-40 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.05] grain-bg pointer-events-none"></div>
          
          <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 flex flex-col items-center">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="w-full max-w-4xl bg-[#141414] rounded-[64px] p-12 md:p-24 border border-white/10 relative overflow-hidden text-center"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[var(--lime)] via-[var(--magenta)] to-[var(--cyan)]" />
              
              <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-8">GET IN EARLY</h2>
              <p className="text-xl text-white/50 mb-16 font-medium">Join the waitlist. Test it first. Lock in your spot.</p>
              
              <div className="relative">
                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.form 
                      key="form"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-4 max-w-md mx-auto" 
                      onSubmit={(e) => {
                        e.preventDefault();
                        setIsSubmitted(true);
                      }}
                    >
                      <input 
                        type="text" 
                        placeholder="INSTAGRAM HANDLE" 
                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-white font-black placeholder:text-white/20 focus:outline-none focus:border-[var(--lime)] transition-colors uppercase tracking-widest"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input 
                          type="text" 
                          placeholder="CITY" 
                          className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-white font-black placeholder:text-white/20 focus:outline-none focus:border-[var(--lime)] transition-colors uppercase tracking-widest"
                        />
                        <input 
                          type="text" 
                          placeholder="COUNTRY" 
                          className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-white font-black placeholder:text-white/20 focus:outline-none focus:border-[var(--lime)] transition-colors uppercase tracking-widest"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-[var(--lime)] text-black font-black text-xl py-8 rounded-2xl mt-4 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_40px_rgba(204,255,0,0.2)]"
                      >
                        LOCK ME IN
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-12"
                    >
                      <div className="w-32 h-32 bg-[var(--lime)] rounded-full mx-auto mb-8 flex items-center justify-center">
                        <svg className="w-16 h-16 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-4xl font-black text-white mb-4">YOU'RE ON THE LIST.</h3>
                      <p className="text-white/50 font-medium">Keep an eye on your DMs.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Footer */}
            <footer className="w-full mt-40 pt-20 border-t border-white/10 flex flex-col items-center">
              <div className="text-[15vw] font-black text-white/5 select-none tracking-tighter mb-[-5vw]">SPENDX*</div>
              <div className="flex flex-col md:flex-row justify-between w-full gap-20 mb-20">
                <div className="max-w-sm">
                  <div className="text-4xl font-black text-white tracking-tighter mb-6">spendx*</div>
                  <p className="text-white/40 font-medium leading-relaxed">
                    The best nights aren't the ones you plan for weeks. They're the ones that actually happen.
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-20">
                  <div>
                    <h5 className="text-[var(--lime)] font-black text-xs uppercase tracking-[0.3em] mb-8">Social</h5>
                    <ul className="space-y-4 text-white/60 font-bold text-sm">
                      <li><a href="#" className="hover:text-white transition-colors">INSTAGRAM</a></li>
                      <li><a href="#" className="hover:text-white transition-colors">TIKTOK</a></li>
                      <li><a href="#" className="hover:text-white transition-colors">TWITTER/X</a></li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-[var(--magenta)] font-black text-xs uppercase tracking-[0.3em] mb-8">Legal</h5>
                    <ul className="space-y-4 text-white/60 font-bold text-sm">
                      <li><a href="#" className="hover:text-white transition-colors">PRIVACY</a></li>
                      <li><a href="#" className="hover:text-white transition-colors">TERMS</a></li>
                      <li><a href="#" className="hover:text-white transition-colors">COOKIES</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col md:flex-row justify-between items-center gap-8 py-12 border-t border-white/5 text-[10px] font-black uppercase tracking-[0.4em] text-white/20">
                <div>© 2026 DETOVA LABS PROJECT</div>
                <div className="flex gap-8">
                  <span>BUILT FOR THE SQUAD</span>
                  <span>NO CAP</span>
                </div>
              </div>
            </footer>
          </div>
        </section>

      </div>
    </div>
  );
}