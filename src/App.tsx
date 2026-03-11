import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapCanvas } from './components/MapCanvas';
import { HUD } from './components/HUD';
import { BottomSheet } from './components/BottomSheet';
import { useMapState } from './hooks/useMapState';
import { useLayers } from './hooks/useLayers';
import {
  StarFloat, DeadChat, LinkExpand, SoloFigure, SquadFigures, BigGroup, DateFigures,
  MapPulse, CleanMath, RideArrives, ShareLink, BudgetIcon, StrandedIcon, BoringIcon, FallingApartIcon
} from './components/Illustrations';

const ChevronDownIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const ConfettiButton = () => {
  const [isPopping, setIsPopping] = useState(false);
  return (
    <div className="relative w-full">
      <button
        onClick={() => { setIsPopping(true); setTimeout(() => setIsPopping(false), 2000); }}
        className="w-full bg-[#CCFF00] text-black text-label px-10 py-6 rounded-full hover:bg-[#FF0099] hover:text-white transition-all duration-300 mt-8 shadow-xl relative overflow-hidden"
      >
        Lock me in
        {isPopping && (
          <motion.div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-sm"
                style={{ backgroundColor: ['#FF0099', '#00CCFF', '#CCFF00', '#00AA88', '#FFFFFF'][i % 5] }}
                initial={{ x: 0, y: 0, scale: 0, rotate: 0 }}
                animate={{
                  x: (Math.random() - 0.5) * 300,
                  y: (Math.random() - 0.5) * 300 - 50,
                  scale: [0, 1, 0],
                  opacity: [1, 1, 0],
                  rotate: Math.random() * 360
                }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            ))}
          </motion.div>
        )}
      </button>
    </div>
  );
};

export default function App() {
  const { city, center, zoom, switchCity } = useMapState();
  const { layers, toggleLayer } = useLayers();
  const [ghostMode, setGhostMode] = useState(false);
  const [isFullMap, setIsFullMap] = useState(false);

  const stripeColors = ['#CCFF00', '#FF0099', '#00CCFF', '#00AA88'];

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
      />
      <BottomSheet center={center} />
    </>
  );

  if (isFullMap) {
    return (
      <div className="relative w-full h-[100dvh] bg-[#0A0A0A] font-sans text-white overflow-hidden selection:bg-[#CCFF00] selection:text-black">
        {mapComponent}
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen bg-black font-sans text-black selection:bg-black selection:text-[#CCFF00] overflow-x-hidden">
      
      {/* Fixed Background Stripes */}
      <div className="fixed inset-0 w-full h-screen flex flex-row overflow-hidden z-0">
        {stripeColors.map((color, index) => (
          <div
            key={index}
            className="h-full flex-1 transition-all duration-700 ease-in-out hover:brightness-110 relative"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>

      {/* Minimal Fixed Navigation */}
      <nav className="fixed top-0 left-0 w-full p-6 z-50 flex justify-between items-center mix-blend-difference text-white pointer-events-none">
        <div className="font-display font-black text-2xl tracking-tighter pointer-events-auto cursor-pointer">spendx*</div>
        <button className="text-label px-6 py-2 rounded-full border border-white hover:bg-white hover:text-black transition-colors pointer-events-auto">
          Get Early Access
        </button>
      </nav>

      {/* Scrollable Foreground Content */}
      <div className="relative z-10 w-full min-h-screen flex flex-col items-center">
        
        {/* HERO SECTION - Lime Overlay */}
        <section className="relative w-full bg-[#CCFF00]/85 backdrop-blur-xl clip-1 flex flex-col items-center justify-center min-h-screen pt-32 pb-32">
          <div className="absolute inset-0 opacity-[0.03] grain-bg pointer-events-none"></div>
          
          {/* Floating Animated Star */}
          <div className="absolute top-32 right-[15%] hidden md:block w-48 h-48 text-black saturate-[0.8]">
            <StarFloat className="w-full h-full" />
          </div>

          <div className="relative z-10 w-full max-w-[1400px] mx-auto section-padding flex flex-col items-center text-center">
            <h1 className="text-hero text-black mb-6 max-w-5xl">
              Your plans hit different <br className="hidden md:block"/> when they actually happen.
            </h1>
            <p className="text-body text-black/90 mb-10 max-w-[60ch] mx-auto">
              No more group chat graveyards. One link controls your whole day—where you go, how you get there, who's coming, and what it costs.
            </p>
            <button className="text-label bg-black text-[#CCFF00] px-12 py-6 rounded-full hover:bg-[#FF0099] hover:text-white transition-all duration-300 shadow-xl text-lg">
              Get the link
            </button>
          </div>

          {/* Bouncing Scroll Indicator */}
          <div className="absolute bottom-16 animate-bounce">
            <ChevronDownIcon />
          </div>
        </section>

        {/* WHEN PLANS FALL APART - Magenta Overlay */}
        <section className="relative w-full bg-[#FF0099]/85 backdrop-blur-xl clip-2 flex flex-col items-center pb-32">
          <div className="absolute inset-0 opacity-[0.03] grain-bg pointer-events-none"></div>
          <div className="relative z-10 w-full max-w-[1400px] mx-auto section-padding">
            <div className="text-center mb-16">
              <span className="text-label text-white/90 bg-black/20 px-4 py-2 rounded-full">The Problem</span>
              <h2 className="text-section-h2 text-white mt-8 mb-4">When Plans Fall Apart</h2>
            </div>

            {/* Sketch Illustration - Dead Chat */}
            <div className="w-full max-w-3xl mx-auto bg-white/10 backdrop-blur-md rounded-3xl p-8 mb-16 shadow-lg border border-white/20 flex flex-col items-center">
              <div className="w-64 h-64 text-white saturate-[0.8]">
                <DeadChat className="w-full h-full" />
              </div>
              <p className="text-body text-white text-center mt-6 font-bold max-w-xl">
                The group chat where four people say "I'm down" but nobody picks the spot.
              </p>
            </div>

            {/* Problem Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { title: "Budget blowout", icon: BudgetIcon },
                { title: "Stranded at 2am", icon: StrandedIcon },
                { title: "Same boring spots", icon: BoringIcon },
                { title: "Small plans falling apart", icon: FallingApartIcon }
              ].map((item, i) => (
                <div key={i} className="bg-black/20 backdrop-blur-sm rounded-2xl p-8 flex items-center gap-6 border border-white/10 hover:bg-black/30 transition-colors">
                  <div className="w-20 h-20 flex-shrink-0 bg-white/20 rounded-full p-4 text-white saturate-[0.8]">
                    <item.icon className="w-full h-full" />
                  </div>
                  <h4 className="text-2xl font-bold text-white">{item.title}</h4>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LIVE MAP VISUALIZATION - White Overlay */}
        <section className="relative w-full bg-white/95 backdrop-blur-xl clip-3 flex flex-col items-center pb-32">
          <div className="absolute inset-0 opacity-[0.03] grain-bg pointer-events-none"></div>
          <div className="relative z-10 w-full max-w-[1400px] mx-auto section-padding flex flex-col items-center">
            <div className="text-center mb-16">
              <span className="text-label text-black/80 bg-black/5 px-4 py-2 rounded-full">Live Sync</span>
              <h2 className="text-section-h2 text-black mt-8 mb-4">See the night unfold.</h2>
            </div>

            <div className="w-full max-w-5xl mx-auto drop-shadow-[0_20px_40px_rgba(0,170,136,0.4)] relative">
              <div 
                className="relative w-full h-[600px] rounded-3xl overflow-hidden border border-white/20 bg-[#0A0A0A]"
                style={{ clipPath: 'polygon(0 6%, 33.3% 0%, 66.6% 6%, 100% 0%, 100% 94%, 66.6% 100%, 33.3% 94%, 0 100%)' }}
              >
                {mapComponent}
              </div>
              <div className="mt-12 flex justify-center">
                <button 
                  onClick={() => setIsFullMap(true)} 
                  className="text-label bg-black text-[#CCFF00] px-8 py-4 rounded-full hover:bg-[#FF0099] hover:text-white transition-all duration-300 shadow-xl border border-[#CCFF00]/30"
                >
                  View Full Map View
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* IMAGINE THIS - Cyan Overlay */}
        <section className="relative w-full bg-[#00CCFF]/85 backdrop-blur-xl clip-3 flex flex-col items-center pb-32">
          <div className="absolute inset-0 opacity-[0.03] grain-bg pointer-events-none"></div>
          <div className="relative z-10 w-full max-w-[1400px] mx-auto section-padding">
            <div className="text-center mb-16">
              <span className="text-label text-black/80 bg-white/40 px-4 py-2 rounded-full">The Solution</span>
              <h2 className="text-section-h2 text-black mt-8 mb-4">Instead, it just works.</h2>
            </div>

            {/* Sketch Illustration - Link Expand */}
            <div className="w-full max-w-4xl mx-auto bg-white/30 backdrop-blur-md rounded-3xl p-8 md:p-12 mb-16 shadow-lg border border-white/40 flex flex-col md:flex-row items-center gap-8">
              <div className="w-48 h-48 flex-shrink-0 bg-black/5 rounded-full p-6 text-black saturate-[0.8]">
                <LinkExpand className="w-full h-full" />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-3xl md:text-5xl font-black text-black mb-4">One link expands into the full plan.</h3>
                <p className="text-body text-black/80 mx-auto md:mx-0">Map, locations, costs, plan—all of it lives there. Share it anywhere. Click it and you're in.</p>
              </div>
            </div>

            {/* 3 Columns Benefit Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Link's up notification", desc: "Instant sync across the squad." },
                { title: "Budget tracking", desc: "Visualized costs in real-time." },
                { title: "Never stranded", desc: "Rides home guaranteed." }
              ].map((item, i) => (
                <div key={i} className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 border border-white/30 flex flex-col items-center text-center">
                  <h4 className="text-2xl font-bold text-black mb-4">{item.title}</h4>
                  <p className="text-body text-black/80">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHOEVER YOU'RE WITH - Teal Overlay */}
        <section className="relative w-full bg-[#00AA88]/85 backdrop-blur-xl clip-4 flex flex-col items-center pb-32">
          <div className="absolute inset-0 opacity-[0.03] grain-bg pointer-events-none"></div>
          <div className="relative z-10 w-full max-w-[1400px] mx-auto section-padding">
            <h2 className="text-section-h2 text-white text-center mt-0 mb-16">Whoever you're with</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "Solo", desc: "Single figure with backpack exploring city", icon: SoloFigure },
                { title: "Date", desc: "Two figures at table, romantic lighting", icon: DateFigures },
                { title: "Squad", desc: "Three friends huddled over one phone", icon: SquadFigures },
                { title: "Big Group", desc: "Organizer with megaphone, crowd in formation", icon: BigGroup }
              ].map((item, i) => (
                <div key={i} className="bg-black/20 backdrop-blur-sm rounded-3xl p-8 border border-white/10 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-300">
                  <div className="w-40 h-40 bg-white/10 rounded-full p-8 mb-8 group-hover:scale-110 transition-transform duration-300 text-white saturate-[0.8]">
                    <item.icon className="w-full h-full" />
                  </div>
                  <h4 className="text-3xl font-black text-white mb-4">{item.title}</h4>
                  <p className="text-body text-white/80">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS - Lime Overlay */}
        <section className="relative w-full bg-[#CCFF00]/85 backdrop-blur-xl clip-1 flex flex-col items-center pb-32">
          <div className="absolute inset-0 opacity-[0.03] grain-bg pointer-events-none"></div>
          <div className="relative z-10 w-full max-w-[1400px] mx-auto section-padding">
            <div className="text-center mb-16">
              <span className="text-label text-black/80 bg-white/40 px-4 py-2 rounded-full">The Process</span>
              <h2 className="text-section-h2 text-black mt-8 mb-4">How It Works</h2>
            </div>

            {/* Horizontal Scroll Mobile / Vertical Desktop */}
            <div className="flex flex-row md:flex-col gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-8 md:pb-0 hide-scrollbar">
              {[
                { step: "01", title: "Find the hotspots", desc: "Map pulse with location pins radiating energy", icon: MapPulse },
                { step: "02", title: "Clean math", desc: "Bill splitting with checkmark bounce", icon: CleanMath },
                { step: "03", title: "Ride arrives", desc: "Route line animating between points", icon: RideArrives },
                { step: "04", title: "Share the link", desc: "Card shuffle and dealing itinerary cards", icon: ShareLink }
              ].map((item, i) => (
                <div key={i} className="snap-center shrink-0 w-[85vw] md:w-full flex flex-col md:flex-row items-center gap-8 bg-white/40 backdrop-blur-md rounded-3xl p-8 border border-white/50 relative">
                  {/* Connecting Line (Desktop) */}
                  {i !== 3 && <div className="hidden md:block absolute left-[5.5rem] top-full w-1 h-8 bg-black/20 z-0"></div>}
                  
                  <div className="w-16 h-16 rounded-full bg-black text-[#CCFF00] flex items-center justify-center font-black text-2xl z-10 shrink-0">
                    {item.step}
                  </div>
                  <div className="w-32 h-32 shrink-0 bg-white/50 rounded-full p-6 text-black saturate-[0.8]">
                    <item.icon className="w-full h-full" />
                  </div>
                  <div className="text-center md:text-left">
                    <h4 className="text-2xl md:text-4xl font-black text-black mb-2">{item.title}</h4>
                    <p className="text-body text-black/80">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WAITLIST & FOOTER - Black Overlay */}
        <section className="relative w-full bg-black/90 backdrop-blur-xl clip-2 flex flex-col items-center text-white pb-16">
          <div className="absolute inset-0 opacity-[0.03] grain-bg pointer-events-none"></div>
          <div className="relative z-10 w-full max-w-[1400px] mx-auto section-padding flex flex-col items-center text-center">
            
            {/* Waitlist */}
            <div className="w-full max-w-4xl mb-32">
              <h2 className="text-section-h2 text-[#CCFF00] drop-shadow-sm mt-0 mb-4">
                Get In Early
              </h2>
              <p className="text-body text-white/90 mb-12 mx-auto">Join the waitlist. Test it first.</p>
              
              <form className="w-full space-y-6" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="text" 
                  placeholder="Instagram handle (optional)" 
                  className="w-full bg-white/10 rounded-2xl p-6 text-body focus:outline-none focus:bg-white/20 placeholder:text-white/40 font-medium transition-colors border border-white/10" 
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input 
                    type="text" 
                    placeholder="Your city" 
                    className="w-full bg-white/10 rounded-2xl p-6 text-body focus:outline-none focus:bg-white/20 placeholder:text-white/40 font-medium transition-colors border border-white/10" 
                  />
                  <input 
                    type="text" 
                    placeholder="Your country" 
                    className="w-full bg-white/10 rounded-2xl p-6 text-body focus:outline-none focus:bg-white/20 placeholder:text-white/40 font-medium transition-colors border border-white/10" 
                  />
                </div>
                <ConfettiButton />
              </form>
            </div>

            {/* Footer */}
            <div className="w-full flex flex-col items-center">
              <h2 className="text-hero text-[#FF0099] mb-10">No Cap</h2>
              <p className="text-body text-white/80 mb-10 mx-auto">
                The best nights aren't the ones you plan for weeks. They're the ones that actually happen.
              </p>
              <div className="bg-[#CCFF00] p-8 rounded-3xl inline-block transform -rotate-2 shadow-lg mb-20">
                <p className="text-body font-black text-black m-0">
                  Spendx doesn't make you more organized. It makes backing out harder than showing up.
                </p>
              </div>
              
              <div className="flex flex-col items-center gap-10 w-full border-t border-white/10 pt-12">
                <div className="text-[clamp(2rem,5vw,4rem)] font-black tracking-tighter text-white flex flex-col md:flex-row items-center gap-4">
                  spendx* <span className="text-body font-normal opacity-60">— Find your spendx</span>
                </div>
                <div className="flex flex-wrap justify-center gap-8 text-label text-gray-500">
                  <a href="#" className="hover:text-[#FF0099] transition-colors">Instagram</a>
                  <a href="#" className="hover:text-[#00CCFF] transition-colors">TikTok</a>
                  <a href="#" className="hover:text-[#00AA88] transition-colors">Twitter/X</a>
                </div>
                
                <div className="mt-12 pt-8 border-t border-white/10 w-full max-w-2xl">
                  <p className="text-label text-gray-500 mb-2">
                    Designed & Built by
                  </p>
                  <p className="text-[clamp(1.5rem,3vw,2.5rem)] font-black text-white tracking-tight">
                    Detova Labs
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}