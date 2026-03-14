import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxImageProps {
  src: string;
  alt: string;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export const ParallaxImage = ({ src, alt, containerRef }: ParallaxImageProps) => {
  const imageRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({
    container: containerRef,
    target: imageRef,
  });

  // Map scroll progress to vertical offset
  const y = useTransform(scrollXProgress, [0, 1], [0, 20]);

  return (
    <div ref={imageRef} className="relative h-48 overflow-hidden">
      <motion.div
        style={{ y, transform: 'translateZ(0)' }}
        className="w-full h-full"
      >
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      </motion.div>
    </div>
  );
};
