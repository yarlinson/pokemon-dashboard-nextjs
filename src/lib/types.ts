// Tipos para la API de Pokémon
export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  sprites: {
    front_default: string;
    front_shiny: string;
    other: {
      'official-artwork': {
        front_default: string;
        front_shiny: string;
      };
    };
  };
  types: PokemonType[];
  stats: PokemonStat[];
  abilities: PokemonAbility[];
  species: {
    name: string;
    url: string;
  };
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonSpecies {
  id: number;
  name: string;
  order: number;
  gender_rate: number;
  capture_rate: number;
  base_happiness: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  hatch_counter: number;
  has_gender_differences: boolean;
  forms_switchable: boolean;
  growth_rate: {
    name: string;
    url: string;
  };
  pokedex_numbers: Array<{
    entry_number: number;
    pokedex: {
      name: string;
      url: string;
    };
  }>;
  egg_groups: Array<{
    name: string;
    url: string;
  }>;
  color: {
    name: string;
    url: string;
  };
  shape: {
    name: string;
    url: string;
  };
  evolves_from_species: {
    name: string;
    url: string;
  } | null;
  evolution_chain: {
    url: string;
  };
  habitat: {
    name: string;
    url: string;
  } | null;
  generation: {
    name: string;
    url: string;
  };
  names: Array<{
    name: string;
    language: {
      name: string;
      url: string;
    };
  }>;
  flavor_text_entries: Array<{
    flavor_text: string;
    language: {
      name: string;
      url: string;
    };
    version: {
      name: string;
      url: string;
    };
  }>;
}

export interface TypeInfo {
  id: number;
  name: string;
  damage_relations: {
    double_damage_from: Array<{ name: string; url: string }>;
    double_damage_to: Array<{ name: string; url: string }>;
    half_damage_from: Array<{ name: string; url: string }>;
    half_damage_to: Array<{ name: string; url: string }>;
    no_damage_from: Array<{ name: string; url: string }>;
    no_damage_to: Array<{ name: string; url: string }>;
  };
  game_indices: Array<{
    game_index: number;
    generation: {
      name: string;
      url: string;
    };
  }>;
  generation: {
    name: string;
    url: string;
  };
  move_damage_class: {
    name: string;
    url: string;
  } | null;
  names: Array<{
    name: string;
    language: {
      name: string;
      url: string;
    };
  }>;
  pokemon: Array<{
    slot: number;
    pokemon: {
      name: string;
      url: string;
    };
  }>;
  moves: Array<{
    name: string;
    url: string;
  }>;
}

