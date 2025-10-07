'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PokemonListItem } from '../../lib/types';
import { pokemonUtils } from '../../lib/api';
import AnimatedCard from '../ui/AnimatedCard';

interface PokemonCardProps {
  pokemon: PokemonListItem;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const [imageError, setImageError] = useState(false);
  
  // Extraer ID de la URL
  const pokemonId = pokemonUtils.extractIdFromUrl(pokemon.url);
  const formattedName = pokemonUtils.formatName(pokemon.name);
  
  // Debug: verificar que el ID se extrae correctamente
  console.log('PokemonCard - pokemon:', pokemon.name, 'ID:', pokemonId, 'URL:', pokemon.url);
  
  // Si no se puede extraer el ID, no mostrar el enlace
  if (!pokemonId || pokemonId === 0) {
    console.error('No se pudo extraer ID válido para:', pokemon.name, pokemon.url);
  }
  
  // URL de la imagen del Pokémon
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
  const fallbackImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

  const cardContent = (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-4 cursor-pointer group">
      <div className="flex flex-col items-center space-y-3">
        {/* Imagen del Pokémon */}
        <div className="relative w-24 h-24 flex items-center justify-center">
          {!imageError ? (
            <Image
              src={imageUrl}
              alt={formattedName}
              width={96}
              height={96}
              className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
              onError={() => setImageError(true)}
              priority={pokemonId <= 20} // Priorizar las primeras 20 imágenes
            />
          ) : (
            <Image
              src={fallbackImageUrl}
              alt={formattedName}
              width={96}
              height={96}
              className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
            />
          )}
        </div>

        {/* Información del Pokémon */}
        <div className="text-center">
          <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
            {formattedName}
          </h3>
          <p className="text-sm text-gray-500">
            #{pokemonId.toString().padStart(3, '0')}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <AnimatedCard>
      {pokemonId && pokemonId > 0 ? (
        <Link href={`/pokemon/${pokemonId}`}>
          {cardContent}
        </Link>
      ) : (
        <div className="opacity-50 cursor-not-allowed">
          {cardContent}
        </div>
      )}
    </AnimatedCard>
  );
}
