import { useMemo, useEffect } from 'react';
import { usePokemonList } from './usePokemon';
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

export function useFilteredPokemonList(limit: number = 20, filters: FilterState) {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = usePokemonList(limit);

  const allPokemon = data?.pages.flatMap(page => page.results) || [];

  // Función para contar Pokémon filtrados sin aplicar el filtro completo
  const getFilteredCount = (pokemonList: PokemonListItem[], filters: FilterState) => {
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
      normal: ['rattata', 'raticate', 'spearow', 'fearow', 'pidgey', 'pidgeotto', 'pidgeot', 'rattata', 'raticate', 'spearow', 'fearow', 'pidgey', 'pidgeotto', 'pidgeot', 'rattata', 'raticate', 'spearow', 'fearow', 'pidgey', 'pidgeotto', 'pidgeot']
    };

    return pokemonList.filter(pokemon => {
      return filters.selectedTypes.some(type => {
        const pokemonList = typePokemonMap[type.toLowerCase()] || [];
        return pokemonList.includes(pokemon.name.toLowerCase());
      });
    }).length;
  };

  // Cargar más Pokémon automáticamente si hay filtros activos y pocos resultados
  useEffect(() => {
    if (filters.selectedTypes.length > 0 && hasNextPage && !isFetchingNextPage) {
      const filteredCount = getFilteredCount(allPokemon, filters);
      if (filteredCount < 20) { // Si tenemos menos de 20 Pokémon filtrados
        fetchNextPage();
      }
    }
  }, [filters, allPokemon, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Filtrar Pokémon basado en los filtros seleccionados
  const filteredPokemon = useMemo(() => {
    let filtered = [...allPokemon];

    // Filtrar por tipos usando una lógica más inteligente
    if (filters.selectedTypes.length > 0) {
      filtered = filtered.filter(pokemon => {
        // Mapeo básico de tipos a Pokémon conocidos
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
          normal: ['rattata', 'raticate', 'spearow', 'fearow', 'pidgey', 'pidgeotto', 'pidgeot', 'rattata', 'raticate', 'spearow', 'fearow', 'pidgey', 'pidgeotto', 'pidgeot', 'rattata', 'raticate', 'spearow', 'fearow', 'pidgey', 'pidgeotto', 'pidgeot']
        };

        return filters.selectedTypes.some(type => {
          const pokemonList = typePokemonMap[type.toLowerCase()] || [];
          return pokemonList.includes(pokemon.name.toLowerCase());
        });
      });
    }

    // Aplicar filtros avanzados
    if (filters.advancedFilters) {
      const { sortBy, sortOrder } = filters.advancedFilters;
      
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
  }, [allPokemon, filters]);

  return {
    data: filteredPokemon,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  };
}
