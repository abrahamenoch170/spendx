"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Fire, 
  UsersThree, 
  MapTrifold, 
  PaperPlaneTilt, 
  CurrencyCircleDollar, 
  Clock, 
  MapPin, 
  Warning,
  List,
  X
} from "@phosphor-icons/react";

const STRIPES = ["var(--lime)", "var(--magenta)", "var(--cyan)", "var(--teal)"];

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeColor, setActiveColor] = useState(0);

  useEffect(() => {
    if (isOpen) {
      const interval = setInterval(() => {
        setActiveColor((prev) => (prev + 1) % STRIPES.length);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  return (
    <nav className="fixed top-0 left-0 w-full p-6 z-[100] flex justify-between items-center mix-blend-difference text-white pointer-events-none">
      <div className="font-display font-black text-2xl tracking-tighter pointer-events-auto cursor-pointer">
        spendx*
      </div>
      
      <div className="pointer-events-auto flex items-center gap-4">
        <Link 
          href="/onboarding"
          className="hidden md:block text-sm font-black bg-white text-black px-6 py-2 rounded-full hover:bg-[var(--lime)] transition-all active:scale-95"
        >
          SIGN IN
        </Link>
        
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 flex flex-col items-center justify-center gap-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 transition-all hover:scale-105"
          style={{ boxShadow: isOpen ? `0 0 20px ${STRIPES[activeColor]}` : 'none' }}
        >
          <motion.div 
            animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className="w-6 h-0.5 bg-white rounded-full"
          />
          <motion.div 
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-6 h-0.5 bg-white rounded-full"
          />
          <motion.div 
            animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className="w-6 h-0.5 bg-white rounded-full"
          />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-black z-[-1] flex flex-col items-center justify-center gap-8 pointer-events-auto"
          >
            {["Explore Map", "See Squad", "Discover Venues", "How It Works", "Join Early Access"].map((item, i) => (
              <Link 
                key={i}
                href="#" 
                className="text-4xl md:text-6xl font-black tracking-tighter hover:text-[var(--lime)] transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.toUpperCase()}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const ProblemCard = ({ icon: Icon, title, color }: any) => (
  <motion.div 
    whileHover={{ y: -10, scale: 1.02 }}
    className="bg-black/20 backdrop-blur-sm rounded-2xl p-8 flex flex-col md:flex-row items-center md:items-start gap-6 border border-white/10 transition-colors"
  >
    <div className="w-20 h-20 flex-shrink-0 bg-white/20 rounded-full p-4 text-white">
      <Icon className="w-full h-full" weight="duotone" />
    </div>
    <h4 className="text-2xl font-bold text-white text-center md:text-left">
      {title}
    </h4>
  </motion.div>
);

export default function LandingPage() {
  return (
    <div className="relative w-full min-h-screen bg-black font-sans text-white overflow-x-hidden">
      {/* Background Stripes */}
      <div className="fixed inset-0 w-full h-screen flex flex-row overflow-hidden z-0">
        {STRIPES.map((color, i) => (
          <div 
            key={i}
            className="h-full flex-1 transition-all duration-700 ease-in-out hover:brightness-110"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>

      <div className="grain-overlay" />
      <Nav />

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="relative w-full bg-[var(--lime)]/85 backdrop-blur-xl clip-1 flex flex-col items-center justify-center min-h-screen pt-32 pb-32 text-black">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center px-6"
          >
            <span className="text-label bg-black/5 px-4 py-2 rounded-full mb-8 inline-block">
              WELCOME TO SPENDX*
            </span>
            <h1 className="text-hero mb-8">
              PLAN ANY<br />OUTING*
            </h1>
            <p className="text-body max-w-2xl mx-auto mb-12 opacity-80">
              Group expense tracking meets itinerary planning. 
              The only app that keeps your squad in sync, on budget, and on the move.
            </p>
            <Link 
              href="/onboarding"
              className="bg-black text-[var(--lime)] px-10 py-5 rounded-full text-xl font-black hover:scale-105 transition-transform inline-block"
            >
              GET THE LINK
            </Link>
          </motion.div>
        </section>

        {/* Problem Section */}
        <section className="relative w-full bg-[var(--magenta)]/85 backdrop-blur-xl clip-2 flex flex-col items-center pt-32 pb-32">
          <div className="max-w-6xl mx-auto px-6 w-full">
            <div className="text-center mb-20">
              <span className="text-label bg-white/10 px-4 py-2 rounded-full mb-6 inline-block">
                NO CAP
              </span>
              <h2 className="text-section-h2 text-white">
                WHEN PLANS<br />FALL APART
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProblemCard icon={CurrencyCircleDollar} title="Budget blowout" />
              <ProblemCard icon={Clock} title="Stranded at 2am" />
              <ProblemCard icon={MapPin} title="Same boring spots" />
              <ProblemCard icon={Warning} title="Small plans falling apart" />
            </div>
          </div>
        </section>

        {/* Live Sync Section */}
        <section className="relative w-full bg-white/95 backdrop-blur-xl clip-3 flex flex-col items-center pt-32 pb-32 text-black">
          <div className="max-w-6xl mx-auto px-6 w-full text-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <span className="text-label bg-black/5 px-4 py-2 rounded-full">
                LIVE SYNC
              </span>
              <h2 className="text-section-h2 mt-8 mb-4">
                SEE WHERE YOUR SQUAD<br />ACTUALLY IS
              </h2>
              <p className="text-body max-w-2xl mx-auto opacity-70">
                Live locations. Vibe hotspots. Who's where, who's moving, where the energy is.
              </p>
            </motion.div>

            {/* Mock Map UI */}
            <div 
              className="relative w-full h-[400px] md:h-[600px] rounded-3xl overflow-hidden border border-black/10 bg-black/5"
              style={{
                clipPath: "polygon(0 6%, 33.3% 0%, 66.6% 6%, 100% 0%, 100% 94%, 66.6% 100%, 33.3% 94%, 0 100%)"
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full bg-[url('https://picsum.photos/seed/map/1200/800')] bg-cover bg-center opacity-40 grayscale" />
                <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />
                
                {/* Floating Avatars / Markers */}
                <div className="absolute top-1/4 left-1/3 w-12 h-12 bg-[var(--lime)] rounded-full border-4 border-white shadow-xl flex items-center justify-center font-bold">A</div>
                <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-[var(--magenta)] rounded-full border-4 border-white shadow-xl flex items-center justify-center font-bold">B</div>
                <div className="absolute bottom-1/4 left-1/2 w-12 h-12 bg-[var(--cyan)] rounded-full border-4 border-white shadow-xl flex items-center justify-center font-bold">C</div>
              </div>
            </div>

            <Link 
              href="/onboarding"
              className="mt-12 inline-block bg-black text-[var(--lime)] px-8 py-4 rounded-full text-sm font-black border border-[var(--lime)]/30 hover:scale-105 transition-transform"
            >
              VIEW FULL MAP VIEW
            </Link>
          </div>
        </section>

        {/* Footer / CTA */}
        <section className="relative w-full bg-[var(--teal)]/85 backdrop-blur-xl clip-4 flex flex-col items-center pt-32 pb-48 text-white">
          <div className="text-center px-6">
            <h2 className="text-hero mb-12">
              GET THE<br />LINK*
            </h2>
            <Link 
              href="/onboarding"
              className="bg-white text-black px-12 py-6 rounded-full text-2xl font-black hover:bg-[var(--lime)] transition-colors inline-block"
            >
              JOIN THE SQUAD
            </Link>
          </div>

          <div className="mt-32 w-full max-w-6xl px-6 flex flex-col md:flex-row justify-between items-center gap-12 opacity-60">
            <div className="text-4xl font-black tracking-tighter">spendx*</div>
            <div className="flex gap-8 text-sm font-bold uppercase tracking-widest">
              <Link href="#">Twitter</Link>
              <Link href="#">Instagram</Link>
              <Link href="#">TikTok</Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
