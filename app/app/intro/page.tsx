"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { 
  UsersThree, 
  Link as LinkIcon, 
  MapTrifold, 
  CaretRight,
  User,
  MapPin,
  Car,
  CurrencyDollar,
  NavigationArrow,
  Sparkle
} from '@phosphor-icons/react';

const Card1Illustration = () => (
  <div className="relative w-64 h-64 flex items-center justify-center">
    <div className="absolute inset-0 bg-[var(--lime)]/10 rounded-full blur-3xl" />
    <motion.div 
      className="absolute w-20 h-20 rounded-full bg-[var(--lime)] flex items-center justify-center z-20 shadow-[0_0_30px_rgba(204,255,0,0.4)]"
      animate={{ y: [0, -10, 0] }}
      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
    >
      <User size={40} weight="fill" className="text-black" />
    </motion.div>
    <motion.div 
      className="absolute w-14 h-14 rounded-full bg-white flex items-center justify-center z-10 shadow-lg"
      animate={{ x: [-50, -60, -50], y: [20, 30, 20] }}
      transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
    >
      <User size={28} weight="fill" className="text-[var(--lime)]" />
    </motion.div>
    <motion.div 
      className="absolute w-16 h-16 rounded-full bg-[var(--card-bg)] border border-[var(--border-color)] flex items-center justify-center z-10 shadow-lg"
      animate={{ x: [50, 60, 50], y: [10, 20, 10] }}
      transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
    >
      <User size={32} weight="fill" className="text-white" />
    </motion.div>
  </div>
);

const Card2Illustration = () => (
  <div className="relative w-64 h-64 flex items-center justify-center">
    <div className="absolute inset-0 bg-[var(--cyan)]/10 rounded-full blur-3xl" />
    <motion.div
      className="w-24 h-24 rounded-3xl bg-[var(--cyan)] flex items-center justify-center z-20 shadow-[0_0_40px_rgba(0,204,255,0.4)]"
      animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
      transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
    >
      <LinkIcon size={48} weight="bold" className="text-black" />
    </motion.div>
    {/* Expanding elements */}
    <motion.div
      className="absolute w-14 h-14 rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] flex items-center justify-center shadow-lg"
      animate={{ x: [0, -80], y: [0, -70], opacity: [0, 1, 1, 0] }}
      transition={{ repeat: Infinity, duration: 4, times: [0, 0.15, 0.85, 1] }}
    >
      <MapPin size={28} weight="fill" className="text-[var(--cyan)]" />
    </motion.div>
    <motion.div
      className="absolute w-14 h-14 rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] flex items-center justify-center shadow-lg"
      animate={{ x: [0, 80], y: [0, -40], opacity: [0, 1, 1, 0] }}
      transition={{ repeat: Infinity, duration: 4, delay: 1.33, times: [0, 0.15, 0.85, 1] }}
    >
      <Car size={28} weight="fill" className="text-[var(--cyan)]" />
    </motion.div>
    <motion.div
      className="absolute w-14 h-14 rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] flex items-center justify-center shadow-lg"
      animate={{ x: [0, 0], y: [0, 90], opacity: [0, 1, 1, 0] }}
      transition={{ repeat: Infinity, duration: 4, delay: 2.66, times: [0, 0.15, 0.85, 1] }}
    >
      <CurrencyDollar size={28} weight="fill" className="text-[var(--cyan)]" />
    </motion.div>
  </div>
);

const Card3Illustration = () => (
  <div className="relative w-64 h-64 flex items-center justify-center">
    <div className="absolute inset-0 bg-[var(--magenta)]/10 rounded-full blur-3xl" />
    <motion.div 
      className="absolute inset-4 border-2 border-dashed border-[var(--magenta)]/30 rounded-full"
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
    />
    <MapTrifold size={100} weight="duotone" className="text-[var(--magenta)] opacity-40" />
    
    <motion.div
      className="absolute w-12 h-12 rounded-full bg-[var(--magenta)] flex items-center justify-center shadow-[0_0_30px_rgba(255,0,153,0.5)] z-20"
      animate={{ 
        x: [-50, 50, 0, -50], 
        y: [-50, 0, 50, -50],
        rotate: [0, 90, 180, 360]
      }}
      transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
    >
      <NavigationArrow size={24} weight="fill" className="text-black" />
    </motion.div>
    
    <motion.div
      className="absolute w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg z-10"
      animate={{ 
        x: [50, -20, 50], 
        y: [-20, 60, -20] 
      }}
      transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
    >
      <Sparkle size={20} weight="fill" className="text-[var(--magenta)]" />
    </motion.div>
  </div>
);

const slides = [
  {
    id: 0,
    headline: "Plan any outing – solo, with friends, or with that special someone.",
    illustration: Card1Illustration,
    color: "var(--lime)"
  },
  {
    id: 1,
    headline: "One link controls everything: where you go, how you get there, what it costs.",
    illustration: Card2Illustration,
    color: "var(--cyan)"
  },
  {
    id: 2,
    headline: "Real‑time coordination, live maps, and AI that knows your vibe.",
    illustration: Card3Illustration,
    color: "var(--magenta)"
  }
];

export default function AppIntro() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const router = useRouter();

  useEffect(() => {
    // Check if already seen intro
    const hasSeenIntro = localStorage.getItem('spendx_has_seen_intro');
    if (hasSeenIntro) {
      router.push('/app/onboarding');
    }
  }, [router]);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setDirection(1);
      setCurrentIndex(prev => prev + 1);
    } else {
      handleFinish();
    }
  };

  const handleSkip = () => {
    handleFinish();
  };

  const handleFinish = () => {
    localStorage.setItem('spendx_has_seen_intro', 'true');
    router.push('/app/onboarding');
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.9
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.9
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <div className="relative flex flex-col h-screen bg-[var(--bg-color)] overflow-hidden">
      <div className="absolute top-0 left-0 right-0 p-6 flex justify-end z-50">
        <button 
          onClick={handleSkip}
          className="text-[var(--text-secondary)] font-medium text-sm hover:text-white transition-colors px-4 py-2"
        >
          Skip
        </button>
      </div>

      <div className="flex-1 relative flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
              scale: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                handleNext();
              } else if (swipe > swipeConfidenceThreshold && currentIndex > 0) {
                setDirection(-1);
                setCurrentIndex(prev => prev - 1);
              }
            }}
            className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
          >
            <div className="mb-16">
              {(() => {
                const Illustration = slides[currentIndex].illustration;
                return <Illustration />;
              })()}
            </div>

            <motion.h2 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="text-3xl md:text-4xl font-bold tracking-tight leading-tight max-w-md"
            >
              {slides[currentIndex].headline}
            </motion.h2>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="p-8 pb-[calc(2rem+env(safe-area-inset-bottom))] z-50 flex flex-col items-center">
        {/* Pagination Dots */}
        <div className="flex gap-2 mb-8">
          {slides.map((_, idx) => (
            <div 
              key={idx}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'w-8 bg-white' : 'w-2 bg-white/20'
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="w-full max-w-md text-black px-6 py-4 rounded-2xl font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          style={{ 
            backgroundColor: currentIndex === slides.length - 1 ? slides[currentIndex].color : 'white',
            boxShadow: currentIndex === slides.length - 1 ? `0 0 20px ${slides[currentIndex].color}40` : 'none'
          }}
        >
          {currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
          {currentIndex !== slides.length - 1 && <CaretRight weight="bold" />}
        </button>
      </div>
    </div>
  );
}
