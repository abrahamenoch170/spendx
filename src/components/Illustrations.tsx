import React from 'react';

const SketchSVG = ({ children, className, viewBox = "0 0 100 100" }: any) => (
  <svg 
    viewBox={viewBox} 
    className={className} 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    style={{ filter: 'drop-shadow(2px 2px 0px rgba(0,0,0,0.1))' }}
  >
    {children}
  </svg>
);

export const StarFloat = ({ className }: any) => (
  <SketchSVG className={className}>
    <path d="M50 10 L62 38 L92 38 L68 56 L78 85 L50 68 L22 85 L32 56 L8 38 L38 38 Z" />
    <path d="M45 25 L55 25" strokeWidth="1" opacity="0.5" />
    <circle cx="35" cy="45" r="2" fill="currentColor" />
    <circle cx="65" cy="45" r="2" fill="currentColor" />
  </SketchSVG>
);

export const DeadChat = ({ className }: any) => (
  <SketchSVG className={className}>
    <path d="M20 20 H80 V60 H50 L30 80 V60 H20 Z" />
    <path d="M40 35 L60 50 M60 35 L40 50" strokeWidth="3" />
    <path d="M30 30 L70 30" strokeWidth="1" opacity="0.3" />
  </SketchSVG>
);

export const LinkExpand = ({ className }: any) => (
  <SketchSVG className={className}>
    <path d="M30 40 A15 15 0 0 1 50 40 L70 40 A15 15 0 0 1 70 60 L50 60 A15 15 0 0 1 30 60 Z" />
    <path d="M40 50 H60" strokeWidth="4" />
    <path d="M20 50 L10 50 M80 50 L90 50" strokeWidth="2" />
    <path d="M15 40 L5 30 M85 40 L95 30" strokeWidth="1" />
  </SketchSVG>
);

export const SoloFigure = ({ className }: any) => (
  <SketchSVG className={className}>
    <circle cx="50" cy="30" r="10" />
    <path d="M50 40 V70 M50 70 L40 90 M50 70 L60 90 M50 50 L35 65 M50 50 L65 65" />
    <rect x="40" y="45" width="20" height="20" rx="2" opacity="0.5" />
  </SketchSVG>
);

export const SquadFigures = ({ className }: any) => (
  <SketchSVG className={className}>
    <circle cx="30" cy="35" r="8" />
    <path d="M30 43 V65 M30 65 L25 80 M30 65 L35 80" />
    <circle cx="50" cy="30" r="8" />
    <path d="M50 38 V60 M50 60 L45 75 M50 60 L55 75" />
    <circle cx="70" cy="35" r="8" />
    <path d="M70 43 V65 M70 65 L65 80 M70 65 L75 80" />
  </SketchSVG>
);

export const BigGroup = ({ className }: any) => (
  <SketchSVG className={className}>
    <circle cx="20" cy="40" r="6" />
    <circle cx="40" cy="35" r="6" />
    <circle cx="60" cy="35" r="6" />
    <circle cx="80" cy="40" r="6" />
    <circle cx="30" cy="55" r="6" />
    <circle cx="50" cy="50" r="6" />
    <circle cx="70" cy="55" r="6" />
    <path d="M20 46 V60 M40 41 V55 M60 41 V55 M80 46 V60" opacity="0.6" />
  </SketchSVG>
);

export const DateFigures = ({ className }: any) => (
  <SketchSVG className={className}>
    <circle cx="35" cy="40" r="8" />
    <circle cx="65" cy="40" r="8" />
    <path d="M35 48 V70 M65 48 V70" />
    <path d="M45 80 H55 V85 H45 Z" opacity="0.4" />
    <path d="M50 30 L52 35 L48 35 Z" fill="currentColor" />
  </SketchSVG>
);

export const MapPulse = ({ className }: any) => (
  <SketchSVG className={className}>
    <path d="M50 20 A20 20 0 0 1 70 40 C70 60 50 80 50 80 C50 80 30 60 30 40 A20 20 0 0 1 50 20 Z" />
    <circle cx="50" cy="40" r="5" fill="currentColor" />
    <circle cx="50" cy="40" r="15" opacity="0.3" />
    <circle cx="50" cy="40" r="25" opacity="0.1" />
  </SketchSVG>
);

export const CleanMath = ({ className }: any) => (
  <SketchSVG className={className}>
    <path d="M20 30 H40 M30 20 V40" />
    <path d="M60 30 H80" />
    <path d="M20 70 H40 M20 75 H40" />
    <path d="M65 65 L75 75 M75 65 L65 75" />
  </SketchSVG>
);

export const RideArrives = ({ className }: any) => (
  <SketchSVG className={className}>
    <path d="M20 60 H80 L75 45 H25 Z" />
    <circle cx="35" cy="65" r="5" />
    <circle cx="65" cy="65" r="5" />
    <path d="M10 50 Q30 30 50 50 T90 50" strokeDasharray="4 4" opacity="0.5" />
  </SketchSVG>
);

export const ShareLink = ({ className }: any) => (
  <SketchSVG className={className}>
    <rect x="30" y="40" width="40" height="40" rx="4" />
    <path d="M50 40 V20 M40 30 L50 20 L60 30" />
    <circle cx="50" cy="60" r="8" opacity="0.2" />
  </SketchSVG>
);

export const BudgetIcon = ({ className }: any) => (
  <SketchSVG className={className}>
    <circle cx="50" cy="50" r="35" />
    <path d="M50 25 V75 M40 35 Q50 25 60 35 T40 65 Q50 75 60 65" strokeWidth="3" />
  </SketchSVG>
);

export const StrandedIcon = ({ className }: any) => (
  <SketchSVG className={className}>
    <path d="M20 80 H80" />
    <path d="M30 80 V30 H40" />
    <circle cx="40" cy="30" r="5" fill="currentColor" />
    <path d="M40 35 L30 80" opacity="0.2" />
    <circle cx="60" cy="70" r="6" />
    <path d="M60 76 V80" />
  </SketchSVG>
);

export const BoringIcon = ({ className }: any) => (
  <SketchSVG className={className}>
    <circle cx="50" cy="50" r="35" />
    <path d="M35 45 H45 M55 45 H65" />
    <path d="M40 65 Q50 60 60 65" />
  </SketchSVG>
);

export const FallingApartIcon = ({ className }: any) => (
  <SketchSVG className={className}>
    <path d="M20 20 L45 25 L40 50 L15 45 Z" />
    <path d="M55 20 L80 25 L85 50 L60 45 Z" />
    <path d="M25 60 L50 65 L45 90 L20 85 Z" />
    <path d="M65 60 L90 65 L85 90 L60 85 Z" />
  </SketchSVG>
);
