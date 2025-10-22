'use client';

import { useState } from 'react';
import { usePokemonPagination } from '../../hooks/usePokemonPagination';
import EnhancedPokemonCard from '../ui/EnhancedPokemonCard';
import ErrorMessage from '../ui/ErrorMessage';
import PokemonListSkeleton from '../ui/PokemonListSkeleton';
import SearchBar from '../search/SearchBar';
import Sidebar from '../layout/Sidebar';
import FilterIndicator from '../layout/FilterIndicator';
import AnimatedContainer from '../ui/AnimatedContainer';
import EnhancedPagination from '../ui/EnhancedPagination';
import StaggeredGrid from '../ui/StaggeredGrid';

interface PokemonListProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export default function PokemonList({ isSidebarOpen, onToggleSidebar }: PokemonListProps) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [advancedFilters, setAdvancedFilters] = useState<{
    generation?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    minStats?: number;
    maxStats?: number;
  } | null>(null);

  const {
    pokemon: filteredPokemon,
    currentPage,
    totalPages,
    totalPokemon,
    isLoading,
    isError,
    goToPage,
    allTypePokemon,
  } = usePokemonPagination({
    pageSize: 20,
    selectedTypes,
    advancedFilters,
  });

  if (isLoading) {
    return (
      <AnimatedContainer>
        <PokemonListSkeleton />
      </AnimatedContainer>
    );
  }

  if (isError) {
    return <ErrorMessage message="Error al cargar los Pokémon" />;
  }

  if (!filteredPokemon) {
    return <ErrorMessage message="No se encontraron Pokémon" />;
  }

  const handleClearAllFilters = () => {
    setSelectedTypes([]);
    setAdvancedFilters(null);
  };

  return (
    <>
      {/* Sidebar */}
      <Sidebar
        selectedTypes={selectedTypes}
        onTypeChange={setSelectedTypes}
        onFiltersChange={setAdvancedFilters}
        isOpen={isSidebarOpen}
        onToggle={onToggleSidebar}
      />

      <AnimatedContainer>
        <div className="space-y-6">
          {/* Barra de búsqueda */}
          <SearchBar />

          {/* Indicador de filtros activos */}
          <FilterIndicator
            selectedTypes={selectedTypes}
            advancedFilters={advancedFilters}
            onClearAll={handleClearAllFilters}
          />

                  {/* Contador de resultados */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <p className="text-gray-600">
                        Página {currentPage} de {totalPages} - Mostrando {filteredPokemon.length} Pokémon
                        {(selectedTypes.length > 0 || advancedFilters) && (
                          <span className="text-blue-600 ml-1">
                            (filtrados)
                          </span>
                        )}
                      </p>
                      {selectedTypes.length > 0 && allTypePokemon.length > 0 && (
                        <span className="text-sm text-gray-500">
                          (Total {selectedTypes.join(', ')}: {allTypePokemon.length} Pokémon)
                        </span>
                      )}
                      {selectedTypes.length === 0 && (
                        <span className="text-sm text-gray-500">
                          (Total: {totalPokemon} Pokémon)
                        </span>
                      )}
                    </div>
                  </div>

          {/* Lista de Pokémon */}
          <StaggeredGrid>
            {filteredPokemon.map((pokemon, index) => (
              <EnhancedPokemonCard
                key={pokemon.name}
                pokemon={pokemon}
                index={index}
              />
            ))}
          </StaggeredGrid>

          {/* Paginación */}
          <EnhancedPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
            isLoading={isLoading}
          />

          {/* Mensaje si no hay resultados */}
          {filteredPokemon.length === 0 && (selectedTypes.length > 0 || advancedFilters) && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No se encontraron Pokémon
              </h3>
              <p className="text-gray-600 mb-4">
                Intenta ajustar los filtros para ver más resultados
              </p>
              <button
                onClick={handleClearAllFilters}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Limpiar filtros
              </button>
            </div>
          )}

        </div>
      </AnimatedContainer>
    </>
  );
}
