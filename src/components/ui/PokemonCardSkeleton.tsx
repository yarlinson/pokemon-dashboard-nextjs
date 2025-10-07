export default function PokemonCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 animate-pulse">
      <div className="flex flex-col items-center space-y-3">
        {/* Imagen skeleton */}
        <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
        
        {/* Texto skeleton */}
        <div className="text-center space-y-2">
          <div className="h-4 bg-gray-300 rounded w-20"></div>
          <div className="h-3 bg-gray-300 rounded w-12"></div>
        </div>
      </div>
    </div>
  );
}

