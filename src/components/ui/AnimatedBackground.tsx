'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';

export default function AnimatedBackground() {
  const [isMounted, setIsMounted] = useState(false);

  // Generar partículas solo en el cliente para evitar errores de hidratación
  const particles = useMemo(() => {
    if (!isMounted) return [];
    
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      xOffset: Math.random() * 20 - 10,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
    }));
  }, [isMounted]);

  // Generar formas solo en el cliente
  const shapes = useMemo(() => {
    if (!isMounted) return [];
    
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 10 + Math.random() * 5,
      type: i % 3,
    }));
  }, [isMounted]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 bg-blue-200 rounded-full opacity-30"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, particle.xOffset, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
          }}
        />
      ))}

      {/* Formas geométricas flotantes */}
      {shapes.map((shape) => (
        <motion.div
          key={`shape-${shape.id}`}
          className="absolute opacity-10"
          style={{
            left: `${shape.left}%`,
            top: `${shape.top}%`,
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {shape.type === 0 ? (
            <div className="w-16 h-16 bg-blue-300 rounded-full" />
          ) : shape.type === 1 ? (
            <div className="w-12 h-12 bg-purple-300 transform rotate-45" />
          ) : (
            <div className="w-8 h-8 bg-indigo-300 rounded-lg" />
          )}
        </motion.div>
      ))}
    </div>
  );
}

