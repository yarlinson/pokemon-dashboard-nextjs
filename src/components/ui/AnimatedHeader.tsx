'use client';

import { motion } from 'framer-motion';

interface AnimatedHeaderProps {
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

export default function AnimatedHeader({ onToggleSidebar, isSidebarOpen }: AnimatedHeaderProps) {
  const titleVariants = {
    hidden: { opacity: 0, y: -50, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      }
    }
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.3,
        ease: 'easeOut'
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      rotate: [0, -5, 5, 0],
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    }
  };

  return (
    <motion.header
      className="flex items-center justify-between py-6 mb-8 relative"
      initial="hidden"
      animate="visible"
    >
      {/* Efecto de fondo animado */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl opacity-50"
        animate={{
          background: [
            'linear-gradient(45deg, #f0f9ff, #e0e7ff)',
            'linear-gradient(45deg, #e0e7ff, #f3e8ff)',
            'linear-gradient(45deg, #f3e8ff, #f0f9ff)',
          ],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Botón de filtro fijo */}
      {onToggleSidebar && (
        <motion.button
          onClick={onToggleSidebar}
          className="fixed top-4 left-4 z-50 p-3 rounded-xl bg-white shadow-lg hover:shadow-xl text-blue-600 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 group"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          title="Filtros"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.svg 
            className="h-6 w-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            animate={isSidebarOpen ? { rotate: 180 } : { rotate: 0 }}
            transition={{ duration: 0.3 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </motion.svg>
          
          {/* Tooltip */}
          <span className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
            Filtros
          </span>
        </motion.button>
      )}

      <div className="relative z-10 flex items-center justify-center w-full pl-16">
        <div className="text-center">
          <motion.h1 
            className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
            initial="hidden"
            animate="visible"
            variants={titleVariants}
          >
            Pokémon Dashboard
          </motion.h1>
          
          <motion.p 
            className="text-gray-600 text-lg font-medium"
            initial="hidden"
            animate="visible"
            variants={subtitleVariants}
          >
            Explora el mundo de los Pokémon con información detallada
          </motion.p>
        </div>
      </div>

      {/* Efecto de partículas */}
      <motion.div
        className="absolute right-0 top-0 w-32 h-32 opacity-20"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <div className="w-full h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-xl" />
      </motion.div>
    </motion.header>
  );
}

