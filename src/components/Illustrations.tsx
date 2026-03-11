import React from 'react';
import { motion } from 'framer-motion';

const sketchyTransition = { duration: 0.2, repeat: Infinity, repeatType: "mirror" as const };

// 1. Hero: Star element with motion lines (Star float)
export const StarFloat = ({ className }: { className?: string }) => (
  <motion.svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
    animate={{ y: [-8, 8, -8], rotate: [-3, 3, -3] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}>
    {/* Sketchy Star */}
    <path d="M50 10 Q 55 35 62 40 Q 88 42 65 58 Q 75 85 50 68 Q 25 85 35 58 Q 12 42 38 40 Q 45 35 50 10 Z" />
    {/* Motion Lines */}
    <motion.path d="M50 2 L50 6 M98 40 L94 40 M50 98 L50 94 M2 40 L6 40" strokeDasharray="2 4" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1.5 }} />
  </motion.svg>
);

// 2. When Plans Fall Apart: Group chat graveyard (Message decay)
export const DeadChat = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    {/* Wobbly Phone */}
    <path d="M 25 15 Q 50 13 75 15 Q 77 50 75 85 Q 50 87 25 85 Q 23 50 25 15 Z" />
    {/* Decaying Messages */}
    <motion.g animate={{ opacity: [1, 0, 1], y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 3 }}>
      <path d="M 35 30 Q 50 28 60 32 Q 62 40 60 45 Q 50 47 35 45 Q 33 40 35 30 Z" fill="currentColor" fillOpacity="0.2" />
      <path d="M 40 37 L 55 37" />
    </motion.g>
    <motion.g animate={{ opacity: [1, 0, 1], y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}>
      <path d="M 45 55 Q 60 53 70 57 Q 72 65 70 70 Q 60 72 45 70 Q 43 65 45 55 Z" fill="currentColor" fillOpacity="0.2" />
      <path d="M 50 62 L 65 62" />
    </motion.g>
    {/* Dead Face */}
    <path d="M 40 75 L 45 80 M 45 75 L 40 80 M 55 75 L 60 80 M 60 75 L 55 80" strokeWidth="2" />
  </svg>
);

// 3. Imagine This: Hand holding phone, link expanding (Link expand)
export const LinkExpand = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    {/* Hand/Phone Base */}
    <path d="M 30 40 Q 50 38 70 40 Q 72 70 70 95 Q 50 97 30 95 Q 28 70 30 40 Z" />
    <path d="M 20 70 Q 30 60 30 80" />
    {/* Expanding Link */}
    <motion.rect x="40" y="50" width="20" height="10" rx="2" stroke="#00CCFF" 
      animate={{ width: [20, 50, 20], height: [10, 40, 10], x: [40, 25, 40], y: [50, 45, 50] }} 
      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} 
    />
    <motion.path d="M 45 55 L 55 55" stroke="#FF0099" animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 2 }} />
  </svg>
);

// 4. Solo Mode: Single person with backpack
export const SoloFigure = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M 50 20 C 58 20 58 35 50 35 C 42 35 42 20 50 20 Z" />
    <path d="M 50 35 Q 52 55 50 70" />
    <path d="M 50 70 Q 45 80 40 90 M 50 70 Q 55 80 60 90" />
    <path d="M 50 45 Q 40 55 35 65 M 50 45 Q 60 55 65 65" />
    {/* Backpack */}
    <path d="M 42 40 Q 58 38 60 55 Q 42 57 40 55 Z" fill="currentColor" fillOpacity="0.2" />
  </svg>
);

// 5. Squad Mode: Three friends huddled
export const SquadFigures = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    {/* Center */}
    <path d="M 50 25 C 56 25 56 35 50 35 C 44 35 44 25 50 25 Z" />
    <path d="M 50 35 Q 51 50 50 65 M 50 65 Q 45 75 42 85 M 50 65 Q 55 75 58 85" />
    {/* Left */}
    <path d="M 30 35 C 35 35 35 43 30 43 C 25 43 25 35 30 35 Z" />
    <path d="M 30 43 Q 35 55 40 60 M 30 60 Q 25 70 22 80 M 30 60 Q 35 70 38 75" />
    {/* Right */}
    <path d="M 70 35 C 75 35 75 43 70 43 C 65 43 65 35 70 35 Z" />
    <path d="M 70 43 Q 65 55 60 60 M 70 60 Q 75 70 78 80 M 70 60 Q 65 70 62 75" />
    {/* Phone glow */}
    <motion.circle cx="50" cy="50" r="8" fill="#CCFF00" fillOpacity="0.3" stroke="none" animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 2 }} />
  </svg>
);

// 6. Big Group: Organizer with megaphone
export const BigGroup = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    {/* Organizer */}
    <path d="M 25 35 C 32 35 32 45 25 45 C 18 45 18 35 25 35 Z" />
    <path d="M 25 45 Q 27 60 25 75 M 25 75 Q 20 85 15 95 M 25 75 Q 30 85 35 95" />
    {/* Megaphone */}
    <path d="M 32 48 Q 45 40 50 42 L 52 58 Q 45 60 32 52 Z" fill="currentColor" fillOpacity="0.2" />
    {/* Crowd */}
    <path d="M 65 30 C 68 30 68 35 65 35 C 62 35 62 30 65 30 Z" />
    <path d="M 80 40 C 83 40 83 45 80 45 C 77 45 77 40 80 40 Z" />
    <path d="M 60 55 C 63 55 63 60 60 60 C 57 60 57 55 60 55 Z" />
    <path d="M 75 65 C 78 65 78 70 75 70 C 72 70 72 65 75 65 Z" />
    <path d="M 85 80 C 88 80 88 85 85 85 C 82 85 82 80 85 80 Z" />
    {/* Sound waves */}
    <motion.path d="M 58 42 Q 62 50 58 58 M 65 38 Q 72 50 65 62" stroke="#FF0099" animate={{ opacity: [0, 1, 0], x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} />
  </svg>
);

// 7. Date Planning: Two figures at table
export const DateFigures = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    {/* Table */}
    <path d="M 15 70 Q 50 68 85 70 M 25 70 Q 23 85 20 95 M 75 70 Q 77 85 80 95" />
    {/* Person 1 */}
    <path d="M 30 35 C 38 35 38 45 30 45 C 22 45 22 35 30 35 Z" />
    <path d="M 30 45 Q 32 55 25 65 M 30 50 Q 40 55 45 68" />
    {/* Person 2 */}
    <path d="M 70 35 C 78 35 78 45 70 45 C 62 45 62 35 70 35 Z" />
    <path d="M 70 45 Q 68 55 75 65 M 70 50 Q 60 55 55 68" />
    {/* Candle/Heart */}
    <motion.path d="M 50 55 Q 55 50 50 65 Q 45 50 50 55 Z" fill="#FF0099" stroke="none" animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} />
  </svg>
);

// 8. Map Pulse (How it works 1)
export const MapPulse = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M 50 25 C 30 25 30 50 50 80 C 70 50 70 25 50 25 Z" fill="currentColor" fillOpacity="0.1" />
    <circle cx="50" cy="45" r="8" fill="currentColor" />
    <motion.circle cx="50" cy="45" r="25" stroke="#CCFF00" animate={{ scale: [0.8, 1.5], opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 2 }} />
  </svg>
);

// 9. Clean Math / Checkmark Bounce (How it works 2)
export const CleanMath = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M 30 20 Q 50 18 70 20 L 65 85 L 50 80 L 35 85 Z" fill="currentColor" fillOpacity="0.05" />
    <path d="M 40 35 Q 50 34 60 35 M 40 50 Q 50 49 60 50 M 40 65 Q 45 64 50 65" />
    <motion.path d="M 60 60 L 65 65 L 75 50" stroke="#00CCFF" strokeWidth="4" animate={{ pathLength: [0, 1, 1], y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 2.5 }} />
  </svg>
);

// 10. Ride Arrives / Route Draw (How it works 3)
export const RideArrives = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    {/* Route Draw */}
    <motion.path d="M 10 80 Q 30 60 50 75 T 90 60" stroke="#FF0099" strokeDasharray="100" animate={{ strokeDashoffset: [100, 0, 0] }} transition={{ repeat: Infinity, duration: 3 }} />
    {/* Car */}
    <motion.g animate={{ x: [-5, 5, -5], y: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 2 }}>
      <path d="M 30 65 Q 40 45 60 45 L 75 60 L 70 75 L 25 75 Z" fill="currentColor" fillOpacity="0.2" />
      <circle cx="35" cy="75" r="6" fill="currentColor" />
      <circle cx="65" cy="75" r="6" fill="currentColor" />
    </motion.g>
  </svg>
);

// 11. Share Link / Card Shuffle (How it works 4)
export const ShareLink = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    {/* Shuffling Cards */}
    <motion.path d="M 20 40 Q 40 35 60 40 L 55 70 Q 35 75 15 70 Z" fill="#00AA88" fillOpacity="0.2" animate={{ rotate: [-5, 5, -5], x: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 3 }} />
    <motion.path d="M 30 30 Q 50 25 70 30 L 65 60 Q 45 65 25 60 Z" fill="#CCFF00" fillOpacity="0.2" animate={{ rotate: [5, -5, 5], x: [2, -2, 2] }} transition={{ repeat: Infinity, duration: 3, delay: 0.5 }} />
    {/* Share Arrow */}
    <motion.path d="M 40 60 L 70 30 M 70 30 L 55 30 M 70 30 L 70 45" stroke="#FF0099" strokeWidth="4" animate={{ x: [0, 5, 0], y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} />
  </svg>
);

// Simple Icons for the Problem Section
export const BudgetIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M 25 30 Q 50 25 75 30 L 70 70 Q 50 75 30 70 Z" />
    <path d="M 50 40 V 60 M 45 45 Q 55 40 55 50 Q 45 60 55 55" stroke="#FF0099" />
  </svg>
);

export const StrandedIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M 20 80 Q 50 75 80 80" />
    <path d="M 50 30 C 58 30 58 45 50 45 C 42 45 42 30 50 30 Z" />
    <path d="M 50 45 Q 52 60 50 80 M 50 60 Q 40 70 35 80 M 50 60 Q 60 70 65 80" />
    <path d="M 70 40 Q 75 35 80 40 M 20 40 Q 25 35 30 40" strokeDasharray="2 4" />
  </svg>
);

export const BoringIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="50" cy="50" r="30" />
    <path d="M 35 45 L 45 45 M 55 45 L 65 45" />
    <path d="M 40 65 Q 50 60 60 65" />
  </svg>
);

export const FallingApartIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M 30 30 L 45 45 M 70 30 L 55 45 M 50 50 L 50 70" />
    <circle cx="30" cy="30" r="5" />
    <circle cx="70" cy="30" r="5" />
    <circle cx="50" cy="70" r="5" />
    <motion.path d="M 40 50 L 60 50" stroke="#FF0099" animate={{ rotate: [-20, 20, -20] }} transition={{ repeat: Infinity, duration: 0.5 }} />
  </svg>
);
