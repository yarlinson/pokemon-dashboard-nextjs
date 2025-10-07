'use client';

import { motion } from 'framer-motion';

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Gradiente animado de fondo */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
        animate={{
          background: [
            'linear-gradient(45deg, #f0f9ff, #e0e7ff, #f3e8ff)',
            'linear-gradient(45deg, #e0e7ff, #f3e8ff, #f0f9ff)',
            'linear-gradient(45deg, #f3e8ff, #f0f9ff, #e0e7ff)',
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Partículas flotantes */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-blue-200 rounded-full opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Formas geométricas flotantes */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`shape-${i}`}
          className="absolute opacity-10"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10 + Math.random() * 5,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {i % 3 === 0 ? (
            <div className="w-16 h-16 bg-blue-300 rounded-full" />
          ) : i % 3 === 1 ? (
            <div className="w-12 h-12 bg-purple-300 transform rotate-45" />
          ) : (
            <div className="w-8 h-8 bg-indigo-300 rounded-lg" />
          )}
        </motion.div>
      ))}
    </div>
  );
}

