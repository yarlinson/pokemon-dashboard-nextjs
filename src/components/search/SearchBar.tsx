'use client';

import { useState, useEffect } from 'react';
import { usePokemonSearch } from '../../hooks/usePokemon';
import PokemonCard from '../pokemon/PokemonCard';
import LoadingSpinner from '../ui/LoadingSpinner';
import ErrorMessage from '../ui/ErrorMessage';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Debounce para evitar muchas peticiones
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const { data: searchResults, isLoading, isError } = usePokemonSearch(
    debouncedQuery,
    debouncedQuery.length > 0
  );

  useEffect(() => {
    setIsSearching(debouncedQuery.length > 0);
  }, [debouncedQuery]);

  const handleClear = () => {
    setQuery('');
    setDebouncedQuery('');
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      {/* Barra de búsqueda */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Buscar Pokémon por nombre..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Resultados de búsqueda */}
      {isSearching && (
        <div className="mt-4 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto">
          {isLoading && (
            <div className="p-4">
              <LoadingSpinner />
            </div>
          )}

          {isError && (
            <div className="p-4">
              <ErrorMessage message="Error al buscar Pokémon" />
            </div>
          )}

          {searchResults && (
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Resultados de búsqueda
                </h3>
                <span className="text-sm text-gray-500">
                  {searchResults.results.length} Pokémon encontrados
                </span>
              </div>

              {searchResults.results.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {searchResults.results.slice(0, 8).map((pokemon) => (
                    <PokemonCard key={pokemon.name} pokemon={pokemon} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-gray-400 text-4xl mb-2">🔍</div>
                  <p className="text-gray-600">No se encontraron Pokémon</p>
                </div>
              )}

              {searchResults.results.length > 8 && (
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-500">
                    Mostrando 8 de {searchResults.results.length} resultados
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

