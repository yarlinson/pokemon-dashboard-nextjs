'use client';

import { usePokemon } from '../../hooks/usePokemon';
import LoadingSpinner from '../ui/LoadingSpinner';
import ErrorMessage from '../ui/ErrorMessage';
import PokemonStats from './PokemonStats';
import PokemonTypes from './PokemonTypes';
import PokemonAbilities from './PokemonAbilities';
import Link from 'next/link';
import Image from 'next/image';
import { pokemonUtils } from '../../lib/api';

interface PokemonDetailProps {
  pokemonId: string;
}

export default function PokemonDetail({ pokemonId }: PokemonDetailProps) {
  const { data: pokemon, isLoading, isError } = usePokemon(pokemonId);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError || !pokemon) {
    return <ErrorMessage message="Error al cargar la información del Pokémon" />;
  }

  const formattedName = pokemonUtils.formatName(pokemon.name);
  const imageUrl = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Navegación */}
        <div className="mb-6">
          <Link 
            href="/" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            ← Volver al Dashboard
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Imagen del Pokémon */}
            <div className="md:w-1/2 p-8 bg-gradient-to-br from-gray-50 to-gray-100">
              <div className="flex flex-col items-center">
                <div className="relative w-64 h-64 mb-6">
                  <Image
                    src={imageUrl}
                    alt={formattedName}
                    width={256}
                    height={256}
                    className="w-full h-full object-contain"
                    priority
                  />
                </div>
                
                <div className="text-center">
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    {formattedName}
                  </h1>
                  <p className="text-lg text-gray-600">
                    #{pokemon.id.toString().padStart(3, '0')}
                  </p>
                </div>
              </div>
            </div>

            {/* Información del Pokémon */}
            <div className="md:w-1/2 p-8">
              <div className="space-y-6">
                {/* Tipos */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">Tipos</h2>
                  <PokemonTypes types={pokemon.types} />
                </div>

                {/* Estadísticas */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">Estadísticas Base</h2>
                  <PokemonStats stats={pokemon.stats} />
                </div>

                {/* Habilidades */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">Habilidades</h2>
                  <PokemonAbilities abilities={pokemon.abilities} />
                </div>

                {/* Información física */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-700 mb-1">Altura</h3>
                    <p className="text-lg text-gray-800">{(pokemon.height / 10).toFixed(1)} m</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-700 mb-1">Peso</h3>
                    <p className="text-lg text-gray-800">{(pokemon.weight / 10).toFixed(1)} kg</p>
                  </div>
                </div>

                {/* Experiencia base */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-700 mb-1">Experiencia Base</h3>
                  <p className="text-lg text-gray-800">{pokemon.base_experience}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

