import { useMemo } from 'react';
import { usePokemonList } from './usePokemon';

interface PokemonWithTypes {
  name: string;
  url: string;
  types: string[];
}

export function usePokemonWithTypes(limit: number = 20) {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = usePokemonList(limit);

  // Obtener información de tipos para cada Pokémon
  const pokemonWithTypes = useMemo(() => {
    if (!data) return [];

    const allPokemon = data.pages.flatMap(page => page.results);
    
    // Por ahora, retornamos los Pokémon sin tipos
    // En una implementación real, necesitarías hacer peticiones adicionales
    return allPokemon.map(pokemon => ({
      name: pokemon.name,
      url: pokemon.url,
      types: [], // Se llenaría con peticiones a la API
    }));
  }, [data]);

  return {
    data: pokemonWithTypes,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  };
}


