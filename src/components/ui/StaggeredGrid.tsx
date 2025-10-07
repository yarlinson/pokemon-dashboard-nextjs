'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface StaggeredGridProps {
  children: ReactNode;
  className?: string;
}

export default function StaggeredGrid({ children, className = '' }: StaggeredGridProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  return (
    <motion.div
      className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.div>
  );
}

