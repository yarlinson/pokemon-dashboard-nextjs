import { useMemo } from 'react';
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

export function usePokemonFiltering(pokemonList: PokemonListItem[], filters: FilterState) {
  const filteredPokemon = useMemo(() => {
    let filtered = [...pokemonList];

    // Filtrar por tipos (esto requeriría datos adicionales de la API)
    // Por ahora, solo aplicamos filtros avanzados
    
    // Aplicar filtros avanzados si existen
    if (filters.advancedFilters) {
      const { sortBy, sortOrder, minStats, maxStats } = filters.advancedFilters;
      
      // Ordenar por el campo seleccionado
      if (sortBy && sortBy !== 'id') {
        filtered.sort((a, b) => {
          let aValue: any;
          let bValue: any;
          
          switch (sortBy) {
            case 'name':
              aValue = a.name;
              bValue = b.name;
              break;
            default:
              return 0;
          }
          
          if (sortOrder === 'desc') {
            return bValue > aValue ? 1 : -1;
          } else {
            return aValue > bValue ? 1 : -1;
          }
        });
      }
    }

    return filtered;
  }, [pokemonList, filters]);

  return filteredPokemon;
}


