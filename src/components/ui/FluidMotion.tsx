'use client';

import React, { ReactNode } from 'react';
import { motion, AnimatePresence, HTMLMotionProps, Variants } from 'framer-motion';

// Fluid cubic-bezier easing curve
export const fluidTransition = {
  duration: 0.6,
  ease: [0.16, 1, 0.3, 1] as const,
};

export const springTransition = {
  type: 'spring',
  stiffness: 300,
  damping: 24,
};

// Route and Section Page Entrance Animation
export interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as const }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Scroll Reveal Wrapper
export interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

export const RevealOnScroll: React.FC<RevealOnScrollProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}) => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: 20, x: 0 };
      case 'down':
        return { y: -20, x: 0 };
      case 'left':
        return { x: 20, y: 0 };
      case 'right':
        return { x: -20, y: 0 };
      case 'none':
      default:
        return { x: 0, y: 0 };
    }
  };

  const initial = { opacity: 0, ...getInitialPosition() };

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '0px 0px 50px 0px' }}
      transition={{ duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] as const }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Staggered Container for Lists and Grids
export interface StaggerListProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export const StaggerList: React.FC<StaggerListProps> = ({
  children,
  className = '',
  staggerDelay = 0.03,
}) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.02,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px 50px 0px' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Staggered Item
export interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export const StaggerItem: React.FC<StaggerItemProps> = ({ children, className = '' }) => {
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
};

// Spring Card Hover Wrapper
export interface FluidCardProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  className?: string;
}

export const FluidCard: React.FC<FluidCardProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <motion.div
      whileHover={{
        y: -4,
        scale: 1.01,
        transition: { type: 'spring', stiffness: 400, damping: 25 },
      }}
      whileTap={{
        scale: 0.985,
        transition: { type: 'spring', stiffness: 500, damping: 30 },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Animated Pill Indicator for active states
export interface AnimatedIndicatorProps {
  layoutId: string;
  className?: string;
}

export const AnimatedIndicator: React.FC<AnimatedIndicatorProps> = ({
  layoutId,
  className = 'absolute inset-0 bg-turmeric-500 rounded-chip -z-10',
}) => {
  return (
    <motion.span
      layoutId={layoutId}
      className={className}
      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
    />
  );
};
