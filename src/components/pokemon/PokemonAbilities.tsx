import { PokemonAbility } from '../../lib/types';
import { pokemonUtils } from '../../lib/api';

interface PokemonAbilitiesProps {
  abilities: PokemonAbility[];
}

export default function PokemonAbilities({ abilities }: PokemonAbilitiesProps) {
  return (
    <div className="space-y-2">
      {abilities.map((ability, index) => (
        <div
          key={index}
          className={`flex items-center justify-between p-3 rounded-lg ${
            ability.is_hidden ? 'bg-yellow-50 border border-yellow-200' : 'bg-gray-50'
          }`}
        >
          <span className="font-medium text-gray-800">
            {pokemonUtils.formatName(ability.ability.name)}
          </span>
          {ability.is_hidden && (
            <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full">
              Oculta
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

