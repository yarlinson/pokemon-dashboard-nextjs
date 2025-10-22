import axios from 'axios';
import { Pokemon, PokemonListItem, PokemonListResponse, PokemonSpecies, TypeInfo } from './types';

// Configuración base de axios
const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
  timeout: 10000,
});

// Interceptor para manejar errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    throw error;
  }
);

// Servicios de la API
export const pokemonApi = {
  // Obtener lista de Pokémon con paginación
  getPokemonList: async (offset: number = 0, limit: number = 20): Promise<PokemonListResponse> => {
    try {
      const response = await api.get(`/pokemon?offset=${offset}&limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching pokemon list:', error);
      throw new Error('Failed to fetch pokemon list');
    }
  },

  // Obtener un Pokémon específico por ID o nombre
  getPokemon: async (id: string | number): Promise<Pokemon> => {
    try {
      const response = await api.get(`/pokemon/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching pokemon ${id}:`, error);
      throw new Error(`Failed to fetch pokemon ${id}`);
    }
  },

  // Obtener información de especies de un Pokémon
  getPokemonSpecies: async (id: string | number): Promise<PokemonSpecies> => {
    try {
      const response = await api.get(`/pokemon-species/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching pokemon species ${id}:`, error);
      throw new Error(`Failed to fetch pokemon species ${id}`);
    }
  },

  // Obtener información de tipos
  getTypeInfo: async (typeName: string): Promise<TypeInfo> => {
    try {
      const response = await api.get(`/type/${typeName}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching type info for ${typeName}:`, error);
      throw new Error(`Failed to fetch type info for ${typeName}`);
    }
  },

  // Buscar Pokémon por nombre
  searchPokemon: async (query: string): Promise<PokemonListResponse> => {
    try {
      // La API de Pokémon no tiene búsqueda directa, así que implementamos una búsqueda básica
      // En una implementación real, podrías usar un índice local o una API de búsqueda
      const response = await api.get(`/pokemon?limit=1000`); // Obtener muchos Pokémon
      const filtered = response.data.results.filter((pokemon: { name: string }) =>
        pokemon.name.toLowerCase().includes(query.toLowerCase())
      );
      return {
        ...response.data,
        results: filtered,
        count: filtered.length,
      };
    } catch (error) {
      console.error('Error searching pokemon:', error);
      throw new Error('Failed to search pokemon');
    }
  },

  // Obtener todos los tipos disponibles
  getAllTypes: async () => {
    try {
      const response = await api.get('/type');
      return response.data;
    } catch (error) {
      console.error('Error fetching types:', error);
      throw new Error('Failed to fetch types');
    }
  },
};

// Utilidades para trabajar con los datos
export const pokemonUtils = {
  // Extraer ID de la URL
  extractIdFromUrl: (url: string): number => {
    // Buscar el último número en la URL
    const matches = url.match(/\/(\d+)\/?$/);
    if (matches) {
      return parseInt(matches[1]);
    }
    
    // Fallback: buscar cualquier número en la URL
    const fallbackMatches = url.match(/(\d+)/);
    if (fallbackMatches) {
      return parseInt(fallbackMatches[1]);
    }
    
    console.warn('No se pudo extraer ID de la URL:', url);
    return 0;
  },

  // Formatear nombre de Pokémon (primera letra mayúscula)
  formatName: (name: string): string => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  },

  // Obtener color del tipo de Pokémon
  getTypeColor: (typeName: string): string => {
    const typeColors: { [key: string]: string } = {
      normal: '#A8A878',
      fire: '#F08030',
      water: '#6890F0',
      electric: '#F8D030',
      grass: '#78C850',
      ice: '#98D8D8',
      fighting: '#C03028',
      poison: '#A040A0',
      ground: '#E0C068',
      flying: '#A890F0',
      psychic: '#F85888',
      bug: '#A8B820',
      rock: '#B8A038',
      ghost: '#705898',
      dragon: '#7038F8',
      dark: '#705848',
      steel: '#B8B8D0',
      fairy: '#EE99AC',
    };
    return typeColors[typeName.toLowerCase()] || '#68A090';
  },

  // Calcular estadísticas totales
  calculateTotalStats: (stats: Pokemon['stats']): number => {
    return stats.reduce((total, stat) => total + stat.base_stat, 0);
  },

  // Obtener estadística por nombre
  getStatByName: (stats: Pokemon['stats'], statName: string): number => {
    const stat = stats.find(s => s.stat.name === statName);
    return stat ? stat.base_stat : 0;
  },
};

// Función para obtener todos los tipos de Pokémon
export async function getPokemonTypes(): Promise<{ name: string; url: string }[]> {
  try {
    const response = await api.get('/type');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching Pokémon types:', error);
    return [];
  }
}

// Función para obtener Pokémon por tipo desde la API
export async function getPokemonByType(typeName: string): Promise<PokemonListItem[]> {
  try {
    const response = await api.get(`/type/${typeName.toLowerCase()}`);
    return response.data.pokemon.map((pokemon: { pokemon: { name: string; url: string } }) => ({
      name: pokemon.pokemon.name,
      url: pokemon.pokemon.url,
    }));
  } catch (error) {
    console.error('Error fetching Pokémon by type:', error);
    return [];
  }
}

export default api;
