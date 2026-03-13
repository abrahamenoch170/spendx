import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';
import placeholderLottie from '../assets/lottie/placeholder.json';

const CARDS = [
  {
    id: 1,
    title: "Plan any outing",
    text: "Solo trips, friend hangouts, or a date night.",
    color: "var(--acid-lime)",
    animation: placeholderLottie,
  },
  {
    id: 2,
    title: "One link controls everything",
    text: "Where you go. How you get there. What it costs.",
    color: "var(--hot-magenta)",
    animation: placeholderLottie,
  },
  {
    id: 3,
    title: "Your squad moves in real time",
    text: "Live maps, shared plans, and AI that understands your vibe.",
    color: "var(--electric-cyan)",
    animation: placeholderLottie,
  },
];

export const IntroPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const handleComplete = () => {
    localStorage.setItem('spendx_intro_seen', 'true');
    navigate('/app/onboarding');
  };

  const handleNext = () => {
    if (currentIndex < CARDS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      handleComplete();
    }
  };

  return (
    <div className="fixed inset-0 bg-spendx-black text-spendx-white overflow-hidden">
      <button 
        onClick={handleComplete}
        className="absolute top-6 right-6 z-50 text-white/50 font-black uppercase tracking-widest text-xs"
      >
        Skip
      </button>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="h-full flex flex-col items-center justify-between p-8"
        >
          <div className="flex-1 flex items-center justify-center w-full">
            <div className="w-full max-w-sm aspect-square">
              <Lottie animationData={CARDS[currentIndex].animation} loop={true} />
            </div>
          </div>

          <div className="w-full space-y-6 text-center">
            <h2 className="text-4xl font-black tracking-tighter uppercase">
              {CARDS[currentIndex].title}
            </h2>
            <p className="text-white/70 font-bold text-lg">
              {CARDS[currentIndex].text}
            </p>
            <button
              onClick={handleNext}
              className="w-full py-4 rounded-2xl font-black text-xl uppercase"
              style={{ backgroundColor: CARDS[currentIndex].color, color: 'black' }}
            >
              {currentIndex === CARDS.length - 1 ? 'Get Started' : 'Next'}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
