import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { pokemonApi, getPokemonByType, pokemonUtils } from '../lib/api';
import { PokemonListItem } from '../lib/types';

interface AdvancedFilters {
  generation?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  minStats?: number;
  maxStats?: number;
}

interface UsePokemonPaginationProps {
  pageSize?: number;
  selectedTypes?: string[];
  advancedFilters?: AdvancedFilters | null;
}

// Rangos de generaciones por ID de Pokémon
const GENERATION_RANGES: { [key: string]: { min: number; max: number } } = {
  '1': { min: 1, max: 151 },
  '2': { min: 152, max: 251 },
  '3': { min: 252, max: 386 },
  '4': { min: 387, max: 493 },
  '5': { min: 494, max: 649 },
  '6': { min: 650, max: 721 },
  '7': { min: 722, max: 809 },
  '8': { min: 810, max: 905 },
  '9': { min: 906, max: 1025 },
};

export function usePokemonPagination({ 
  pageSize = 20, 
  selectedTypes = [],
  advancedFilters = null
}: UsePokemonPaginationProps = {}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [allTypePokemon, setAllTypePokemon] = useState<PokemonListItem[]>([]);

  // Obtener Pokémon por tipo si hay filtros activos
  const { data: _typePokemonData, isLoading: _isLoadingTypePokemon } = useQuery({
    queryKey: ['pokemon-by-type', selectedTypes[0]],
    queryFn: () => getPokemonByType(selectedTypes[0]),
    enabled: selectedTypes.length === 1,
    staleTime: 1000 * 60 * 30, // 30 minutos
    gcTime: 1000 * 60 * 60, // 1 hora
  });

  // Cargar Pokémon de todos los tipos seleccionados
  useEffect(() => {
    if (selectedTypes.length > 0) {
      const loadTypePokemon = async () => {
        try {
          const promises = selectedTypes.map(type => getPokemonByType(type));
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
  }, [selectedTypes]);

  // Calcular offset y limit basado en filtros de generación
  const getOffsetAndLimit = () => {
    if (advancedFilters?.generation && GENERATION_RANGES[advancedFilters.generation]) {
      const range = GENERATION_RANGES[advancedFilters.generation];
      const offset = range.min - 1;
      const limit = range.max - range.min + 1;
      return { offset, limit };
    }
    const offset = (currentPage - 1) * pageSize;
    return { offset, limit: pageSize };
  };

  const { offset, limit } = getOffsetAndLimit();

  // Query para obtener Pokémon de la página actual
  const {
    data: pageData,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['pokemon-page', currentPage, pageSize, advancedFilters?.generation],
    queryFn: () => pokemonApi.getPokemonList(offset, limit),
    staleTime: 1000 * 60 * 5, // 5 minutos
    gcTime: 1000 * 60 * 30, // 30 minutos
  });

  // Función para cambiar de página
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Función para ir a la siguiente página
  const nextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  // Función para ir a la página anterior
  const prevPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  // Aplicar ordenamiento
  const applySorting = (pokemonList: PokemonListItem[]) => {
    if (!advancedFilters?.sortBy || advancedFilters.sortBy === 'id') {
      // Ordenar por ID (número)
      const sorted = [...pokemonList].sort((a, b) => {
        const idA = pokemonUtils.extractIdFromUrl(a.url);
        const idB = pokemonUtils.extractIdFromUrl(b.url);
        return advancedFilters?.sortOrder === 'desc' ? idB - idA : idA - idB;
      });
      return sorted;
    } else if (advancedFilters.sortBy === 'name') {
      // Ordenar por nombre
      const sorted = [...pokemonList].sort((a, b) => {
        const comparison = a.name.localeCompare(b.name);
        return advancedFilters?.sortOrder === 'desc' ? -comparison : comparison;
      });
      return sorted;
    }
    return pokemonList;
  };

  // Determinar qué Pokémon mostrar
  const pokemonToShow = useMemo(() => {
    let results: PokemonListItem[] = [];

    if (selectedTypes.length > 0 && allTypePokemon.length > 0) {
      // Con filtros de tipo
      results = allTypePokemon;
    } else if (advancedFilters?.generation) {
      // Con filtro de generación
      results = pageData?.results || [];
    } else {
      // Sin filtros especiales
      results = pageData?.results || [];
    }

    // Aplicar ordenamiento si hay filtros avanzados
    if (advancedFilters?.sortBy) {
      results = applySorting(results);
    }

    // Aplicar paginación
    if (selectedTypes.length > 0 || advancedFilters?.generation) {
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      return results.slice(startIndex, endIndex);
    }

    return results;
  }, [selectedTypes, allTypePokemon, currentPage, pageSize, pageData, advancedFilters, applySorting]);

  // Calcular total de páginas
  const totalPokemon = useMemo(() => {
    if (selectedTypes.length > 0 && allTypePokemon.length > 0) {
      return allTypePokemon.length;
    } else if (advancedFilters?.generation && GENERATION_RANGES[advancedFilters.generation]) {
      const range = GENERATION_RANGES[advancedFilters.generation];
      return range.max - range.min + 1;
    }
    return pageData?.count || 1000;
  }, [selectedTypes, allTypePokemon, advancedFilters?.generation, pageData]);

  const totalPages = Math.ceil(totalPokemon / pageSize);

  // Resetear página cuando cambien los filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTypes, advancedFilters?.generation, advancedFilters?.sortBy, advancedFilters?.sortOrder]);

  return {
    // Datos
    pokemon: pokemonToShow,
    currentPage,
    totalPages,
    totalPokemon,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
    
    // Estados
    isLoading: isLoading || _isLoadingTypePokemon,
    isError,
    error,
    
    // Funciones
    goToPage,
    nextPage,
    prevPage,
    setCurrentPage,
    
    // Para debugging
    allTypePokemon,
  };
}
