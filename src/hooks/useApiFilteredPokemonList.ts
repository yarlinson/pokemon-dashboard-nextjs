import { useMemo, useEffect, useState } from 'react';
import { usePokemonList } from './usePokemon';
import { usePokemonByType } from './usePokemonTypes';
import { PokemonListItem } from '../lib/types';

interface FilterState {
  selectedTypes: string[];
  advancedFilters: {
    generation?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    minStats?: number;
    maxStats?: number;
  } | null;
}

export function useApiFilteredPokemonList(limit: number = 20, filters: FilterState) {
  const {
    data: allPokemonData,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = usePokemonList(limit);

  const allPokemon = allPokemonData?.pages.flatMap(page => page.results) || [];

  // Obtener Pokémon por tipo desde la API
  const { data: typePokemonData, isLoading: isLoadingTypePokemon } = usePokemonByType(
    filters.selectedTypes[0] || '',
    filters.selectedTypes.length === 1
  );

  // Estado para almacenar todos los Pokémon de los tipos seleccionados
  const [allTypePokemon, setAllTypePokemon] = useState<PokemonListItem[]>([]);

  // Cargar Pokémon de todos los tipos seleccionados
  useEffect(() => {
    if (filters.selectedTypes.length > 0) {
      const loadTypePokemon = async () => {
        try {
          const { getPokemonByType } = await import('../lib/api');
          const promises = filters.selectedTypes.map(type => getPokemonByType(type));
          const results = await Promise.all(promises);
          const combinedPokemon = results.flat();
          setAllTypePokemon(combinedPokemon);
        } catch (error) {
          console.error('Error loading type Pokémon:', error);
          setAllTypePokemon([]);
        }
      };
      loadTypePokemon();
    } else {
      setAllTypePokemon([]);
    }
  }, [filters.selectedTypes]);

  // Función para contar Pokémon filtrados
  const getFilteredCount = (pokemonList: PokemonListItem[], types: string[]) => {
    if (types.length === 0) return pokemonList.length;
    
    // Si tenemos datos de la API, usar esos
    if (allTypePokemon.length > 0) {
      return pokemonList.filter(pokemon => 
        allTypePokemon.some(typePokemon => typePokemon.name === pokemon.name)
      ).length;
    }
    
    // Fallback: contar todos los Pokémon si no hay filtros
    return pokemonList.length;
  };

  // Cargar más Pokémon automáticamente
  useEffect(() => {
    if (hasNextPage && !isFetchingNextPage) {
      if (filters.selectedTypes.length > 0) {
        // Con filtros: cargar más si tenemos menos de 50 resultados filtrados
        const filteredCount = getFilteredCount(allPokemon, filters.selectedTypes);
        if (filteredCount < 50) {
          fetchNextPage();
        }
      } else {
        // Sin filtros: cargar más si tenemos menos de 100 Pokémon totales
        if (allPokemon.length < 100) {
          fetchNextPage();
        }
      }
    }
  }, [filters, allPokemon, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Filtrar Pokémon basado en los filtros seleccionados
  const filteredPokemon = useMemo(() => {
    let filtered = [...allPokemon];

    // Filtrar por tipos usando la API
    if (filters.selectedTypes.length > 0 && allTypePokemon.length > 0) {
      filtered = filtered.filter(pokemon => 
        allTypePokemon.some(typePokemon => typePokemon.name === pokemon.name)
      );
    }

    // Aplicar filtros avanzados
    if (filters.advancedFilters) {
      const { sortBy, sortOrder } = filters.advancedFilters;
      // Aquí se pueden agregar más filtros avanzados
    }

    return filtered;
  }, [allPokemon, filters, allTypePokemon]);

  return {
    filteredPokemon,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isLoading || isLoadingTypePokemon,
    isError,
    allTypePokemon, // Para debugging
  };
}

