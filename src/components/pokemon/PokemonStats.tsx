import { PokemonStat } from '../../lib/types';

interface PokemonStatsProps {
  stats: PokemonStat[];
}

const statNames: { [key: string]: string } = {
  hp: 'HP',
  attack: 'Ataque',
  defense: 'Defensa',
  'special-attack': 'Ataque Especial',
  'special-defense': 'Defensa Especial',
  speed: 'Velocidad',
};

export default function PokemonStats({ stats }: PokemonStatsProps) {
  return (
    <div className="space-y-3">
      {stats.map((stat, index) => (
        <div key={index} className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700 w-32">
            {statNames[stat.stat.name] || stat.stat.name}
          </span>
          <div className="flex-1 mx-4">
            <div className="bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min((stat.base_stat / 150) * 100, 100)}%` }}
              />
            </div>
          </div>
          <span className="text-sm font-semibold text-gray-800 w-8 text-right">
            {stat.base_stat}
          </span>
        </div>
      ))}
    </div>
  );
}

