import { useState, useEffect, useMemo } from 'react';
import { usePokemonList } from './usePokemon';

interface AdvancedFilters {
  generation?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  minStats?: number;
  maxStats?: number;
}

interface FilterState {
  selectedTypes: string[];
  advancedFilters: AdvancedFilters | null;
}

export function useSmartPokemonLoading(limit: number = 20, filters: FilterState) {
  const [targetCount, setTargetCount] = useState(20);
  
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = usePokemonList(limit);

  const allPokemon = useMemo(() => data?.pages.flatMap(page => page.results) || [], [data]);

  // Función para contar Pokémon filtrados
  const getFilteredCount = (pokemonList: { name: string }[], filters: FilterState) => {
    if (filters.selectedTypes.length === 0) return pokemonList.length;
    
    const typePokemonMap: { [key: string]: string[] } = {
      fire: ['charmander', 'charmeleon', 'charizard', 'vulpix', 'ninetales', 'growlithe', 'arcanine', 'ponyta', 'rapidash', 'magmar', 'flareon', 'moltres'],
      water: ['squirtle', 'wartortle', 'blastoise', 'psyduck', 'golduck', 'poliwag', 'poliwhirl', 'poliwrath', 'tentacool', 'tentacruel', 'slowpoke', 'slowbro', 'seel', 'dewgong', 'shellder', 'cloyster', 'krabby', 'kingler', 'horsea', 'seadra', 'goldeen', 'seaking', 'staryu', 'starmie', 'magikarp', 'gyarados', 'lapras', 'vaporeon', 'omanyte', 'omastar', 'kabuto', 'kabutops'],
      grass: ['bulbasaur', 'ivysaur', 'venusaur', 'oddish', 'gloom', 'vileplume', 'bellsprout', 'weepinbell', 'victreebel', 'exeggcute', 'exeggutor', 'tangela', 'leafeon'],
      electric: ['pikachu', 'raichu', 'voltorb', 'electrode', 'electabuzz', 'jolteon', 'zapdos'],
      psychic: ['abra', 'kadabra', 'alakazam', 'slowpoke', 'slowbro', 'drowzee', 'hypno', 'exeggcute', 'exeggutor', 'starmie', 'mr-mime', 'jynx', 'mewtwo', 'mew'],
      ice: ['jynx', 'lapras', 'articuno'],
      dragon: ['dratini', 'dragonair', 'dragonite'],
      dark: ['umbreon'],
      steel: ['magnetite', 'magneton'],
      fairy: ['clefairy', 'clefable', 'jigglypuff', 'wigglytuff'],
      fighting: ['machop', 'machoke', 'machamp', 'hitmonlee', 'hitmonchan', 'hitmontop'],
      poison: ['bulbasaur', 'ivysaur', 'venusaur', 'weedle', 'kakuna', 'beedrill', 'ekans', 'arbok', 'nidoran-f', 'nidorina', 'nidoqueen', 'nidoran-m', 'nidorino', 'nidoking', 'zubat', 'golbat', 'oddish', 'gloom', 'vileplume', 'venonat', 'venomoth', 'bellsprout', 'weepinbell', 'victreebel', 'tentacool', 'tentacruel', 'grimer', 'muk', 'gastly', 'haunter', 'gengar', 'koffing', 'weezing'],
      ground: ['sandshrew', 'sandslash', 'diglett', 'dugtrio', 'geodude', 'graveler', 'golem', 'cubone', 'marowak', 'rhyhorn', 'rhydon'],
      flying: ['pidgey', 'pidgeotto', 'pidgeot', 'spearow', 'fearow', 'zubat', 'golbat', 'farfetchd', 'doduo', 'dodrio', 'scyther', 'aerodactyl', 'articuno', 'zapdos', 'moltres', 'dragonite'],
      bug: ['caterpie', 'metapod', 'butterfree', 'weedle', 'kakuna', 'beedrill', 'paras', 'parasect', 'venonat', 'venomoth', 'scyther', 'pinsir'],
      rock: ['geodude', 'graveler', 'golem', 'onix', 'rhyhorn', 'rhydon', 'omanyte', 'omastar', 'kabuto', 'kabutops', 'aerodactyl'],
      ghost: ['gastly', 'haunter', 'gengar'],
      normal: ['rattata', 'raticate', 'spearow', 'fearow', 'pidgey', 'pidgeotto', 'pidgeot']
    };

    return pokemonList.filter(pokemon => {
      return filters.selectedTypes.some(type => {
        const pokemonList = typePokemonMap[type.toLowerCase()] || [];
        return pokemonList.includes(pokemon.name.toLowerCase());
      });
    }).length;
  };

  // Ajustar el target count cuando cambian los filtros
  useEffect(() => {
    if (filters.selectedTypes.length > 0) {
      setTargetCount(50); // Cargar más Pokémon cuando hay filtros activos
    } else {
      setTargetCount(20); // Volver al número normal
    }
  }, [filters.selectedTypes.length]);

  // Cargar más Pokémon automáticamente si hay filtros activos
  useEffect(() => {
    if (filters.selectedTypes.length > 0 && hasNextPage && !isFetchingNextPage) {
      const filteredCount = getFilteredCount(allPokemon, filters);
      if (filteredCount < targetCount) {
        fetchNextPage();
      }
    }
  }, [filters, allPokemon, hasNextPage, isFetchingNextPage, fetchNextPage, targetCount]);

  return {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  };
}


