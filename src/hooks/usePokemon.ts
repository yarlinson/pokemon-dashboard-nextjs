import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { pokemonApi } from '../lib/api';
import { Pokemon, PokemonListResponse } from '../lib/types';

// Hook para obtener lista de Pokémon con paginación
export const usePokemonList = (limit: number = 20) => {
  return useInfiniteQuery<PokemonListResponse>({
    queryKey: ['pokemon-list', limit],
    queryFn: ({ pageParam = 0 }) => pokemonApi.getPokemonList(pageParam, limit),
    getNextPageParam: (lastPage) => {
      if (lastPage.next) {
        const url = new URL(lastPage.next);
        const offset = url.searchParams.get('offset');
        return offset ? parseInt(offset) : undefined;
      }
      return undefined;
    },
    initialPageParam: 0,
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
  });
};

// Hook para obtener un Pokémon específico
export const usePokemon = (id: string | number) => {
  return useQuery<Pokemon>({
    queryKey: ['pokemon', id],
    queryFn: () => pokemonApi.getPokemon(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutos
    gcTime: 30 * 60 * 1000, // 30 minutos
  });
};

// Hook para buscar Pokémon
export const usePokemonSearch = (query: string, enabled: boolean = true) => {
  return useQuery<PokemonListResponse>({
    queryKey: ['pokemon-search', query],
    queryFn: () => pokemonApi.searchPokemon(query),
    enabled: enabled && query.length > 0,
    staleTime: 2 * 60 * 1000, // 2 minutos
    gcTime: 5 * 60 * 1000, // 5 minutos
  });
};

// Hook para obtener información de tipos
export const useTypes = () => {
  return useQuery({
    queryKey: ['types'],
    queryFn: pokemonApi.getAllTypes,
    staleTime: 30 * 60 * 1000, // 30 minutos
    gcTime: 60 * 60 * 1000, // 1 hora
  });
};

// Hook para obtener información de un tipo específico
export const useTypeInfo = (typeName: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['type-info', typeName],
    queryFn: () => pokemonApi.getTypeInfo(typeName),
    enabled: enabled && !!typeName,
    staleTime: 15 * 60 * 1000, // 15 minutos
    gcTime: 30 * 60 * 1000, // 30 minutos
  });
};

