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

      <div className="relative z-10 flex items-center space-x-4">
        {onToggleSidebar && (
          <motion.button
            onClick={onToggleSidebar}
            className="p-3 rounded-xl text-gray-600 hover:bg-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <motion.svg 
              className="h-6 w-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              animate={isSidebarOpen ? { rotate: 90 } : { rotate: 0 }}
              transition={{ duration: 0.3 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </motion.svg>
          </motion.button>
        )}
        
        <div>
          <motion.h1 
            className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
            variants={titleVariants}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              backgroundSize: '200% 200%',
            }}
          >
            Pokémon Dashboard
          </motion.h1>
          
          <motion.p 
            className="text-gray-600 text-lg font-medium hidden sm:block"
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

