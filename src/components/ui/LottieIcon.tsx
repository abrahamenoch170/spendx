import React from 'react';
import Lottie from 'lottie-react';

interface LottieIconProps {
  animationData: any;
  isActive: boolean;
  className?: string;
}

export const LottieIcon = ({ animationData, isActive, className }: LottieIconProps) => {
  return (
    <div className={`w-8 h-8 ${className}`}>
      <Lottie
        animationData={animationData}
        loop={isActive}
        autoplay={isActive}
        initialSegment={isActive ? undefined : [0, 0]}
      />
    </div>
  );
};
