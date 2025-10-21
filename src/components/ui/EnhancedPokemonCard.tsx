'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PokemonListItem } from '../../lib/types';
import { pokemonUtils } from '../../lib/api';

interface EnhancedPokemonCardProps {
  pokemon: PokemonListItem;
  index: number;
}

export default function EnhancedPokemonCard({ pokemon, index }: EnhancedPokemonCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Generar posiciones de partículas aleatorias una sola vez
  const particlePositions = useMemo(() => {
    return Array.from({ length: 6 }, () => ({
      x: (Math.random() - 0.5) * 100,
      y: (Math.random() - 0.5) * 100,
    }));
  }, []);
  
  const pokemonId = pokemonUtils.extractIdFromUrl(pokemon.url);
  const formattedName = pokemonUtils.formatName(pokemon.name);
  
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
  const fallbackImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50, 
      scale: 0.8,
      rotateY: -15,
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }
    },
    hover: {
      y: -10,
      scale: 1.05,
      rotateY: 5,
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.2,
      rotate: [0, -5, 5, 0],
      transition: {
        duration: 0.6,
        ease: 'easeInOut'
      }
    }
  };

  const glowVariants = {
    hover: {
      boxShadow: [
        '0 0 0 0 rgba(59, 130, 246, 0)',
        '0 0 20px 10px rgba(59, 130, 246, 0.3)',
        '0 0 0 0 rgba(59, 130, 246, 0)',
      ],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  };

  const cardContent = (
    <motion.div
      className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 cursor-pointer group overflow-hidden"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        border: '1px solid rgba(59, 130, 246, 0.1)',
      }}
    >
      {/* Efecto de brillo animado */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        variants={glowVariants}
        whileHover="hover"
      />

      {/* Patrón de fondo animado */}
      <motion.div
        className="absolute inset-0 opacity-5"
        animate={{
          background: [
            'radial-gradient(circle at 20% 80%, #3b82f6 0%, transparent 50%)',
            'radial-gradient(circle at 80% 20%, #8b5cf6 0%, transparent 50%)',
            'radial-gradient(circle at 40% 40%, #06b6d4 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="relative z-10 flex flex-col items-center space-y-4">
        {/* Imagen del Pokémon con efectos */}
        <motion.div 
          className="relative w-28 h-28 flex items-center justify-center"
          variants={imageVariants}
          whileHover="hover"
        >
          {/* Efecto de pulso */}
          <motion.div
            className="absolute inset-0 bg-blue-200 rounded-full opacity-0"
            animate={isHovered ? {
              scale: [1, 1.5, 1],
              opacity: [0, 0.3, 0],
            } : {}}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'easeOut'
            }}
          />
          
          {!imageError ? (
            <Image
              src={imageUrl}
              alt={formattedName}
              width={112}
              height={112}
              className="w-full h-full object-contain drop-shadow-lg"
              onError={() => setImageError(true)}
              priority={pokemonId <= 20}
            />
          ) : (
            <Image
              src={fallbackImageUrl}
              alt={formattedName}
              width={112}
              height={112}
              className="w-full h-full object-contain drop-shadow-lg"
            />
          )}
        </motion.div>

        {/* Información del Pokémon */}
        <motion.div 
          className="text-center"
          animate={isHovered ? {
            y: -5,
          } : {}}
          transition={{ duration: 0.3 }}
        >
          <motion.h3 
            className="font-bold text-xl text-gray-800 group-hover:text-blue-600 transition-colors duration-300"
            animate={isHovered ? {
              scale: 1.1,
            } : {}}
          >
            {formattedName}
          </motion.h3>
          
          <motion.p 
            className="text-sm text-gray-500 font-medium"
            animate={isHovered ? {
              color: '#3b82f6',
            } : {}}
          >
            #{pokemonId.toString().padStart(3, '0')}
          </motion.p>
        </motion.div>

        {/* Efecto de partículas en hover */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {particlePositions.map((pos, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-blue-400 rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                }}
                animate={{
                  x: [0, pos.x],
                  y: [0, pos.y],
                  opacity: [1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 1,
                  delay: i * 0.1,
                  ease: 'easeOut'
                }}
              />
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {pokemonId && pokemonId > 0 ? (
        <Link href={`/pokemon/${pokemonId}`}>
          {cardContent}
        </Link>
      ) : (
        <div className="opacity-50 cursor-not-allowed">
          {cardContent}
        </div>
      )}
    </motion.div>
  );
}


