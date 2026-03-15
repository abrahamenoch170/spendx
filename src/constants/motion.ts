import { Transition } from 'framer-motion';

export const spring: Transition = { type: "spring", stiffness: 300, damping: 30 };

export const pageTransition = {
  initial: { x: 20, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: -20, opacity: 0 },
  transition: { duration: 0.25, ease: [0.34, 1.56, 0.64, 1] } as Transition
};

export const cardEntrance = {
  initial: { scale: 0.95, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: spring
};

export const toastTransition = {
  initial: { y: -100, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: -100, opacity: 0 },
  transition: { ...spring, bounce: 0.4 } as Transition
};

export const buttonPress = {
  whileTap: { scale: 0.95 },
  transition: spring
};
