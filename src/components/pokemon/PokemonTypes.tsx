import { PokemonType } from '../../lib/types';
import { pokemonUtils } from '../../lib/api';

interface PokemonTypesProps {
  types: PokemonType[];
}

export default function PokemonTypes({ types }: PokemonTypesProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {types.map((type, index) => (
        <span
          key={index}
          className="px-3 py-1 rounded-full text-white text-sm font-medium"
          style={{ backgroundColor: pokemonUtils.getTypeColor(type.type.name) }}
        >
          {pokemonUtils.formatName(type.type.name)}
        </span>
      ))}
    </div>
  );
}

