import { useQuery } from '@tanstack/react-query';
import { getPokemonTypes, getPokemonByType } from '../lib/api';

// Hook para obtener todos los tipos de Pokémon
export function usePokemonTypes() {
  return useQuery({
    queryKey: ['pokemon-types'],
    queryFn: getPokemonTypes,
    staleTime: 1000 * 60 * 60, // 1 hora
    cacheTime: 1000 * 60 * 60 * 24, // 24 horas
  });
}

// Hook para obtener Pokémon por tipo específico
export function usePokemonByType(typeName: string, enabled: boolean = true) {
  return useQuery({
    queryKey: ['pokemon-by-type', typeName],
    queryFn: () => getPokemonByType(typeName),
    enabled: enabled && !!typeName,
    staleTime: 1000 * 60 * 30, // 30 minutos
    cacheTime: 1000 * 60 * 60 * 2, // 2 horas
  });
}

