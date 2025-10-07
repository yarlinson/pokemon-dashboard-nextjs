'use client';

import { useState } from 'react';
import { useTypes } from '../../hooks/usePokemon';
import { pokemonUtils } from '../../lib/api';
import LoadingSpinner from '../ui/LoadingSpinner';

interface TypeFilterProps {
  selectedTypes: string[];
  onTypeChange: (types: string[]) => void;
}

export default function TypeFilter({ selectedTypes, onTypeChange }: TypeFilterProps) {
  const { data: typesData, isLoading, isError } = useTypes();

  const handleTypeToggle = (typeName: string) => {
    if (selectedTypes.includes(typeName)) {
      onTypeChange(selectedTypes.filter(type => type !== typeName));
    } else {
      onTypeChange([...selectedTypes, typeName]);
    }
  };

  const handleClearFilters = () => {
    onTypeChange([]);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-4">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError || !typesData) {
    return (
      <div className="text-center py-4">
        <p className="text-red-500">Error al cargar los tipos</p>
      </div>
    );
  }

  // Filtrar tipos que no son relevantes para Pokémon
  const relevantTypes = typesData.results.filter(type => 
    !['unknown', 'shadow'].includes(type.name)
  );

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Filtrar por Tipo</h3>
        {selectedTypes.length > 0 && (
          <button
            onClick={handleClearFilters}
            className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
          >
            Limpiar
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {relevantTypes.map((type) => {
          const isSelected = selectedTypes.includes(type.name);
          return (
            <button
              key={type.name}
              onClick={() => handleTypeToggle(type.name)}
              className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                isSelected
                  ? 'text-white shadow-md transform scale-105'
                  : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
              }`}
              style={{
                backgroundColor: isSelected ? pokemonUtils.getTypeColor(type.name) : undefined,
              }}
            >
              {pokemonUtils.formatName(type.name)}
            </button>
          );
        })}
      </div>

      {selectedTypes.length > 0 && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Filtros activos:</strong> {selectedTypes.map(type => 
              pokemonUtils.formatName(type)
            ).join(', ')}
          </p>
        </div>
      )}
    </div>
  );
}
