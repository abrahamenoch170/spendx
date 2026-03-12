import React, { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavigationMenu } from '../components/NavigationMenu';
import { QuickActions } from '../components/QuickActions';
import { InteractiveButton, FloatingInput } from '../components/InteractiveElements';
import { SignInModal } from '../components/SignInModal';
import { CustomCursor } from '../components/CustomCursor';
import {
  StarFloat, DeadChat, LinkExpand, SoloFigure, SquadFigures, BigGroup, DateFigures,
  MapPulse, CleanMath, RideArrives, ShareLink, BudgetIcon, StrandedIcon, BoringIcon, FallingApartIcon
} from '../components/Illustrations';
import successAnimationData from '../assets/success.json';

const Lottie = React.lazy(() => import('lottie-react'));

const springEasing = [0.34, 1.56, 0.64, 1];

const ChevronDownIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

interface LandingPageProps {
  mapComponent: React.ReactNode;
  setIsFullMap: (val: boolean) => void;
}

export const LandingPage = ({ mapComponent, setIsFullMap }: LandingPageProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const stripeColors = ['var(--lime)', 'var(--magenta)', 'var(--cyan)', 'var(--teal)'];

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
      <nav className="fixed top-0 left-0 w-full p-6 z-50 flex justify-between items-center mix-blend-difference text-white pointer-events-none">
        <div className="font-display font-black text-2xl tracking-tighter pointer-events-auto cursor-pointer">spendx*</div>
      </nav>
      <NavigationMenu />
      <QuickActions />
      <SignInModal isOpen={isSignInModalOpen} onClose={() => setIsSignInModalOpen(false)} />

      {/* Scrollable Foreground Content */}
      <div className="relative z-10 w-full min-h-screen flex flex-col items-center">
        
        {/* HERO SECTION - Lime Overlay */}
        <section className="relative w-full bg-[var(--lime)]/85 backdrop-blur-xl clip-1 flex flex-col items-center justify-center min-h-screen pt-32 pb-32">
          <div className="absolute inset-0 opacity-[0.03] grain-bg pointer-events-none"></div>
          
          {/* Floating Animated Star */}
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: springEasing }}
            className="absolute top-32 right-[15%] hidden md:block w-48 h-48 text-black saturate-[0.8]"
          >
            <StarFloat className="w-full h-full" />
          </motion.div>

          <div className="relative z-10 w-full max-w-[1400px] mx-auto section-padding flex flex-col items-center text-center">
            <h1 className="text-hero text-black mb-6 max-w-5xl flex flex-wrap justify-center gap-x-2 md:gap-x-4">
              {['Your', 'plans', 'hit', 'different', 'when', 'they', 'actually', 'happen.'].map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.8, ease: springEasing }}
                  className="inline-block will-change-transform"
                >
                  {word}
                </motion.span>
              ))}
            </h1>
            <motion.p 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8, ease: springEasing }}
              className="text-body text-black/90 mb-10 max-w-[60ch] mx-auto px-4 will-change-transform"
            >
              No more group chat graveyards. One link controls your whole day—where you go, how you get there, who's coming, and what it costs.
            </motion.p>
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.8, ease: springEasing }}
              className="will-change-transform"
            >
              <InteractiveButton 
                onClick={() => setIsSignInModalOpen(true)}
                className="text-label bg-black text-[var(--lime)] px-12 py-6 rounded-full shadow-xl text-lg min-w-[44px] min-h-[44px]"
              >
                Get the link
              </InteractiveButton>
            </motion.div>

            {/* Social Proof & Waitlist Urgency */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8, ease: springEasing }}
              className="mt-12 flex flex-col items-center gap-4 will-change-transform"
            >
              <div className="flex flex-col md:flex-row items-center gap-4 bg-black/5 backdrop-blur-sm px-6 py-4 rounded-3xl md:rounded-full border border-black/10">
                <div className="flex -space-x-3">
                  {[
                    { seed: '1', name: 'Alex', country: 'US', instagram: '@alex', snapchat: 'alex.snap' },
                    { seed: '2', name: 'Sam', country: 'UK', instagram: '@sam', snapchat: 'sam.snap' },
                    { seed: '3', name: 'Jordan', country: 'CA', instagram: '@jordan', snapchat: 'jordan.snap' }
                  ].map((user, i) => (
                    <img
                      key={user.seed}
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.seed}&backgroundColor=b6e3f4,c0aede,d1d4f9`}
                      alt={`${user.name} avatar`}
                      className="w-10 h-10 rounded-full border-2 border-[var(--lime)] bg-white"
                      style={{ zIndex: 3 - i }}
                      referrerPolicy="no-referrer"
                    />
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-[var(--lime)] bg-black text-[var(--lime)] flex items-center justify-center text-xs font-bold z-0">
                    +2,047
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <p className="text-sm font-bold text-black leading-tight">Already locking in their next move</p>
                  <div className="flex items-center justify-center md:justify-start gap-2 mt-1">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                    <p className="text-xs text-black/70 font-medium">Only 500 spots per city • 2,047 joined</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bouncing Scroll Indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="absolute bottom-16 animate-bounce"
          >
            <ChevronDownIcon />
          </motion.div>
        </section>

        {/* WHEN PLANS FALL APART - Magenta Overlay */}
        <section id="how-it-works" className="relative w-full bg-[var(--magenta)]/85 backdrop-blur-xl clip-2 flex flex-col items-center pb-32">
          <div className="absolute inset-0 opacity-[0.03] grain-bg pointer-events-none"></div>
          <div className="relative z-10 w-full max-w-[1400px] mx-auto section-padding">
            <motion.div 
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: springEasing }}
              className="text-center mb-16 will-change-transform"
            >
              <span className="text-label text-white/90 bg-black/20 px-4 py-2 rounded-full">The Problem</span>
              <h2 className="text-section-h2 text-white mt-8 mb-4">When Plans Fall Apart</h2>
            </motion.div>

            {/* Sketch Illustration - Dead Chat */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: springEasing }}
              className="w-full max-w-3xl mx-auto bg-white/10 backdrop-blur-md rounded-3xl p-8 mb-16 shadow-lg border border-white/20 flex flex-col items-center will-change-transform"
            >
              <div className="w-64 h-64 text-white saturate-[0.8]">
                <DeadChat className="w-full h-full" />
              </div>
              <p className="text-body text-white text-center mt-6 font-bold max-w-xl">
                The group chat where four people say "I'm down" but nobody picks the spot.
              </p>
            </motion.div>

            {/* Problem Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-0">
              {[
                { title: "Budget blowout", icon: BudgetIcon },
                { title: "Stranded at 2am", icon: StrandedIcon },
                { title: "Same boring spots", icon: BoringIcon },
                { title: "Small plans falling apart", icon: FallingApartIcon }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.15, duration: 0.6, ease: springEasing }}
                  whileHover={{ y: -5, scale: 1.02, boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}
                  className="bg-black/20 backdrop-blur-sm rounded-2xl p-8 flex flex-col md:flex-row items-center md:items-start gap-6 border border-white/10 transition-colors will-change-transform"
                >
                  <div className="w-20 h-20 flex-shrink-0 bg-white/20 rounded-full p-4 text-white saturate-[0.8]">
                    <item.icon className="w-full h-full" />
                  </div>
                  <h4 className="text-2xl font-bold text-white text-center md:text-left mt-4 md:mt-0">{item.title}</h4>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* LIVE MAP VISUALIZATION - White Overlay */}
        <section id="explore-map" className="relative w-full bg-white/95 backdrop-blur-xl clip-3 flex flex-col items-center pb-32">
          <div className="absolute inset-0 opacity-[0.03] grain-bg pointer-events-none"></div>
          <div className="relative z-10 w-full max-w-[1400px] mx-auto section-padding flex flex-col items-center">
            <motion.div 
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: springEasing }}
              className="text-center mb-16 will-change-transform"
            >
              <span className="text-label text-black/80 bg-black/5 px-4 py-2 rounded-full">Live Sync</span>
              <h2 className="text-section-h2 text-black mt-8 mb-4">See where your squad actually is</h2>
              <p className="text-body text-black/80 max-w-2xl mx-auto">Live locations. Vibe hotspots. Who's where, who's moving, where the energy is.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: springEasing }}
              className="w-full max-w-5xl mx-auto drop-shadow-[0_20px_40px_rgba(0,170,136,0.4)] relative px-4 md:px-0 will-change-transform"
            >
              <div 
                className="relative w-full h-[400px] md:h-[600px] rounded-3xl overflow-hidden border border-[var(--border-color)] bg-[var(--bg-color)]"
                style={{ clipPath: 'polygon(0 6%, 33.3% 0%, 66.6% 6%, 100% 0%, 100% 94%, 66.6% 100%, 33.3% 94%, 0 100%)' }}
              >
                {mapComponent}
              </div>
              <div className="mt-12 flex justify-center">
                <InteractiveButton 
                  onClick={() => setIsFullMap(true)} 
                  className="text-label bg-black text-[var(--lime)] px-8 py-4 rounded-full shadow-xl border border-[var(--lime)]/30 min-w-[44px] min-h-[44px]"
                >
                  View Full Map View
                </InteractiveButton>
              </div>
            </motion.div>
          </div>
        </section>

        {/* IMAGINE THIS - Cyan Overlay */}
        <section className="relative w-full bg-[var(--cyan)]/85 backdrop-blur-xl clip-3 flex flex-col items-center pb-32">
          <div className="absolute inset-0 opacity-[0.03] grain-bg pointer-events-none"></div>
          <div className="relative z-10 w-full max-w-[1400px] mx-auto section-padding">
            <motion.div 
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: springEasing }}
              className="text-center mb-16 will-change-transform"
            >
              <span className="text-label text-black/80 bg-white/40 px-4 py-2 rounded-full">The Solution</span>
              <h2 className="text-section-h2 text-black mt-8 mb-4">Instead, it just works.</h2>
            </motion.div>

            {/* Sketch Illustration - Link Expand */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: springEasing }}
              className="w-full max-w-4xl mx-auto bg-white/30 backdrop-blur-md rounded-3xl p-8 md:p-12 mb-16 shadow-lg border border-white/40 flex flex-col md:flex-row items-center gap-8 will-change-transform"
            >
              <div className="w-48 h-48 flex-shrink-0 bg-black/5 rounded-full p-6 text-black saturate-[0.8] mx-auto md:mx-0">
                <LinkExpand className="w-full h-full" />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-3xl md:text-5xl font-black text-black mb-4">One link expands into the full plan.</h3>
                <p className="text-body text-black/80 mx-auto md:mx-0">Map, locations, costs, plan—all of it lives there. Share it anywhere. Click it and you're in.</p>
              </div>
            </motion.div>

            {/* 3 Columns Benefit Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-0">
              {[
                { title: "Link's up notification", desc: "Instant sync across the squad." },
                { title: "Budget tracking", desc: "Visualized costs in real-time." },
                { title: "Never stranded", desc: "Rides home guaranteed." }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.6, ease: springEasing }}
                  whileHover={{ y: -5, scale: 1.02, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                  className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 border border-white/30 flex flex-col items-center text-center will-change-transform"
                >
                  <h4 className="text-2xl font-bold text-black mb-4">{item.title}</h4>
                  <p className="text-body text-black/80">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* WHOEVER YOU'RE WITH - Teal Overlay */}
        <section id="see-squad" className="relative w-full bg-[var(--teal)]/85 backdrop-blur-xl clip-4 flex flex-col items-center pb-32">
          <div className="absolute inset-0 opacity-[0.03] grain-bg pointer-events-none"></div>
          <div className="relative z-10 w-full max-w-[1400px] mx-auto section-padding">
            <motion.h2 
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: springEasing }}
              className="text-section-h2 text-white text-center mt-0 mb-16 will-change-transform"
            >
              Whoever you're with
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4 md:px-0">
              {[
                { title: "Solo", desc: "Single figure with backpack exploring city", icon: SoloFigure },
                { title: "Date", desc: "Two figures at table, romantic lighting", icon: DateFigures },
                { title: "Squad", desc: "Three friends huddled over one phone", icon: SquadFigures },
                { title: "Big Group", desc: "Organizer with megaphone, crowd in formation", icon: BigGroup }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: springEasing }}
                  whileHover={{ y: -10, scale: 1.02, boxShadow: '0 15px 40px rgba(0,0,0,0.2)' }}
                  className="bg-black/20 backdrop-blur-sm rounded-3xl p-8 border border-white/10 flex flex-col items-center text-center group will-change-transform"
                >
                  <div className="w-40 h-40 bg-white/10 rounded-full p-8 mb-8 group-hover:scale-110 transition-transform duration-300 text-white saturate-[0.8]">
                    <item.icon className="w-full h-full" />
                  </div>
                  <h4 className="text-3xl font-black text-white mb-4">{item.title}</h4>
                  <p className="text-body text-white/80">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS - Lime Overlay */}
        <section className="relative w-full bg-[var(--lime)]/85 backdrop-blur-xl clip-1 flex flex-col items-center pb-32">
          <div className="absolute inset-0 opacity-[0.03] grain-bg pointer-events-none"></div>
          <div className="relative z-10 w-full max-w-[1400px] mx-auto section-padding">
            <motion.div 
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: springEasing }}
              className="text-center mb-16 will-change-transform"
            >
              <span className="text-label text-black/80 bg-white/40 px-4 py-2 rounded-full">The Process</span>
              <h2 className="text-section-h2 text-black mt-8 mb-4">How It Works</h2>
            </motion.div>

            {/* Horizontal Scroll Mobile / Vertical Desktop */}
            <div className="flex flex-col gap-8 px-4 md:px-0">
              {[
                { step: "01", title: "Find the hotspots", desc: "Map pulse with location pins radiating energy", icon: MapPulse },
                { step: "02", title: "Clean math", desc: "Bill splitting with checkmark bounce", icon: CleanMath },
                { step: "03", title: "Ride arrives", desc: "Route line animating between points", icon: RideArrives },
                { step: "04", title: "Share the link", desc: "Card shuffle and dealing itinerary cards", icon: ShareLink }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.15, duration: 0.6, ease: springEasing }}
                  className="w-full flex flex-col md:flex-row items-center gap-8 glass rounded-3xl p-8 relative will-change-transform"
                >
                  {/* Connecting Line (Desktop) */}
                  {i !== 3 && (
                    <motion.div 
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ delay: i * 0.15 + 0.3, duration: 0.6, ease: springEasing }}
                      className="hidden md:block absolute left-[5.5rem] top-full w-1 h-8 bg-black/20 z-0 origin-top will-change-transform"
                    />
                  )}
                  
                  <div className="w-16 h-16 rounded-full bg-black text-[var(--lime)] flex items-center justify-center font-black text-2xl z-10 shrink-0">
                    {item.step}
                  </div>
                  <div className="w-32 h-32 shrink-0 bg-white/50 rounded-full p-6 text-black saturate-[0.8]">
                    <item.icon className="w-full h-full" />
                  </div>
                  <div className="text-center md:text-left">
                    <h4 className="text-2xl md:text-4xl font-black text-black mb-2">{item.title}</h4>
                    <p className="text-body text-black/80">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* WAITLIST & FOOTER - Black Overlay */}
        <section id="join-early-access" className="relative w-full bg-black/90 backdrop-blur-xl clip-2 flex flex-col items-center text-white pb-16">
          <div className="absolute inset-0 opacity-[0.03] grain-bg pointer-events-none"></div>
          <div className="relative z-10 w-full max-w-[1400px] mx-auto section-padding flex flex-col items-center text-center">
            
            {/* Waitlist */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: springEasing }}
              className="w-full max-w-4xl mb-32 px-4 md:px-0 relative will-change-transform"
            >
              <h2 className="text-section-h2 text-[var(--lime)] drop-shadow-sm mt-0 mb-4">
                Get In Early
              </h2>
              <p className="text-body text-white/90 mb-12 mx-auto">Join the waitlist. Test it first.</p>
              
              <div className="relative overflow-hidden min-h-[300px]">
                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.form 
                      key="form"
                      initial={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -50 }}
                      transition={{ duration: 0.5, ease: springEasing }}
                      className="w-full space-y-6" 
                      onSubmit={(e) => e.preventDefault()}
                    >
                      <FloatingInput label="Instagram handle (optional)" type="text" />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FloatingInput label="Your city" type="text" />
                        <FloatingInput label="Your country" type="text" />
                      </div>
                      <div className="relative w-full">
                        <InteractiveButton
                          onClick={async () => {
                            await new Promise(r => setTimeout(r, 1500));
                            setIsSubmitted(true);
                          }}
                          className="w-full bg-[var(--lime)] text-black text-label px-10 py-6 rounded-full mt-8 shadow-xl relative overflow-hidden"
                        >
                          Lock me in
                        </InteractiveButton>
                      </div>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: springEasing }}
                      className="w-full flex flex-col items-center justify-center py-12"
                    >
                      <div className="w-32 h-32 mb-6 relative">
                        <Suspense fallback={<div className="w-full h-full bg-[var(--lime)]/20 rounded-full animate-pulse" />}>
                          <Lottie 
                            animationData={successAnimationData} 
                            loop={false} 
                            renderer="svg"
                            className="w-full h-full"
                          />
                        </Suspense>
                      </div>
                      <h3 className="text-3xl font-display font-bold text-white mb-2">You're on the list.</h3>
                      <p className="text-white/60">Keep an eye on your DMs.</p>
                      
                      {/* Confetti */}
                      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-50">
                        {[...Array(40)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-3 h-3 rounded-sm"
                            style={{ backgroundColor: ['var(--magenta)', 'var(--cyan)', 'var(--lime)', 'var(--teal)', 'var(--text-primary)'][i % 5] }}
                            initial={{ x: 0, y: 0, scale: 0, rotate: 0 }}
                            animate={{
                              x: (Math.random() - 0.5) * 600,
                              y: (Math.random() - 0.5) * 600 - 100,
                              scale: [0, 1.5, 0],
                              opacity: [1, 1, 0],
                              rotate: Math.random() * 720
                            }}
                            transition={{ duration: 2.5, ease: "easeOut" }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Footer */}
            <div className="w-full flex flex-col items-center px-4 md:px-0">
              <h2 className="text-hero text-[var(--magenta)] mb-10">No Cap</h2>
              <p className="text-body text-white/80 mb-10 mx-auto">
                The best nights aren't the ones you plan for weeks. They're the ones that actually happen.
              </p>
              <div className="bg-[var(--lime)] p-8 rounded-3xl inline-block transform -rotate-2 shadow-lg mb-20">
                <p className="text-body font-black text-black m-0">
                  Spendx doesn't make you more organized. It makes backing out harder than showing up.
                </p>
              </div>
              
              <div className="flex flex-col items-center gap-10 w-full border-t border-white/10 pt-12">
                <div className="text-[clamp(2rem,5vw,4rem)] font-black tracking-tighter text-white flex flex-col md:flex-row items-center gap-4">
                  spendx* <span className="text-body font-normal opacity-60">— Find your spendx</span>
                </div>
                <div className="flex flex-wrap justify-center gap-8 text-label text-gray-500">
                  <a href="#" className="hover:text-[var(--magenta)] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center">Instagram</a>
                  <a href="#" className="hover:text-[var(--cyan)] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center">TikTok</a>
                  <a href="#" className="hover:text-[var(--teal)] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center">Twitter/X</a>
                </div>
                
                <div className="mt-12 pt-8 border-t border-white/10 w-full max-w-2xl">
                  <p className="text-label text-gray-500 mb-2">
                    A Detova Labs Project
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
};
