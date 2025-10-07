import PokemonCardSkeleton from './PokemonCardSkeleton';

export default function PokemonListSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {Array.from({ length: 20 }).map((_, index) => (
        <PokemonCardSkeleton key={index} />
      ))}
    </div>
  );
}

