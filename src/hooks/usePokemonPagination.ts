import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { pokemonApi, getPokemonByType } from '../lib/api';
import { PokemonListItem } from '../lib/types';

interface UsePokemonPaginationProps {
  pageSize?: number;
  selectedTypes?: string[];
}

export function usePokemonPagination({ 
  pageSize = 20, 
  selectedTypes = [] 
}: UsePokemonPaginationProps = {}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [allTypePokemon, setAllTypePokemon] = useState<PokemonListItem[]>([]);

  // Obtener Pokémon por tipo si hay filtros activos
  const { data: typePokemonData, isLoading: isLoadingTypePokemon } = useQuery({
    queryKey: ['pokemon-by-type', selectedTypes[0]],
    queryFn: () => getPokemonByType(selectedTypes[0]),
    enabled: selectedTypes.length === 1,
    staleTime: 1000 * 60 * 30, // 30 minutos
    cacheTime: 1000 * 60 * 60, // 1 hora
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

  // Calcular offset basado en la página actual
  const offset = (currentPage - 1) * pageSize;

  // Query para obtener Pokémon de la página actual
  const {
    data: pageData,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['pokemon-page', currentPage, pageSize],
    queryFn: () => pokemonApi.getPokemonList(offset, pageSize),
    staleTime: 1000 * 60 * 5, // 5 minutos
    cacheTime: 1000 * 60 * 30, // 30 minutos
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

  // Determinar qué Pokémon mostrar
  const pokemonToShow = useMemo(() => {
    if (selectedTypes.length > 0 && allTypePokemon.length > 0) {
      // Con filtros: mostrar Pokémon del tipo seleccionado
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      return allTypePokemon.slice(startIndex, endIndex);
    } else {
      // Sin filtros: mostrar Pokémon de la página actual
      return pageData?.results || [];
    }
  }, [selectedTypes, allTypePokemon, currentPage, pageSize, pageData]);

  // Calcular total de páginas
  const totalPokemon = selectedTypes.length > 0 && allTypePokemon.length > 0
    ? allTypePokemon.length
    : pageData?.count || 1000;
  const totalPages = Math.ceil(totalPokemon / pageSize);

  // Resetear página cuando cambien los filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTypes]);

  return {
    // Datos
    pokemon: pokemonToShow,
    currentPage,
    totalPages,
    totalPokemon,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
    
    // Estados
    isLoading: isLoading || isLoadingTypePokemon,
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
