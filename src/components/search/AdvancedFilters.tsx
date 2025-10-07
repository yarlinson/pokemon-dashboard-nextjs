'use client';

import { useState } from 'react';

interface AdvancedFiltersProps {
  onFiltersChange: (filters: FilterState) => void;
}

interface FilterState {
  generation: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  minStats: number;
  maxStats: number;
}

export default function AdvancedFilters({ onFiltersChange }: AdvancedFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    generation: '',
    sortBy: 'id',
    sortOrder: 'asc',
    minStats: 0,
    maxStats: 1000,
  });

  const [isOpen, setIsOpen] = useState(false);

  const handleFilterChange = (key: keyof FilterState, value: string | number) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleReset = () => {
    const defaultFilters: FilterState = {
      generation: '',
      sortBy: 'id',
      sortOrder: 'asc',
      minStats: 0,
      maxStats: 1000,
    };
    setFilters(defaultFilters);
    onFiltersChange(defaultFilters);
  };

  const hasActiveFilters = filters.generation || 
    filters.sortBy !== 'id' || 
    filters.sortOrder !== 'asc' || 
    filters.minStats > 0 || 
    filters.maxStats < 1000;

  return (
    <div className="bg-gray-50 rounded-lg">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex items-center justify-between hover:bg-gray-100 transition-colors rounded-lg"
      >
        <div className="flex items-center space-x-2">
          <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <span className="font-medium text-gray-800">Filtros Avanzados</span>
          {hasActiveFilters && (
            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
              Activos
            </span>
          )}
        </div>
        <svg
          className={`h-5 w-5 text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="p-4 border-t border-gray-200 space-y-4">
          {/* Generación */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Generación
            </label>
            <select
              value={filters.generation}
              onChange={(e) => handleFilterChange('generation', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Todas las generaciones</option>
              <option value="1">Generación I (Kanto)</option>
              <option value="2">Generación II (Johto)</option>
              <option value="3">Generación III (Hoenn)</option>
              <option value="4">Generación IV (Sinnoh)</option>
              <option value="5">Generación V (Unova)</option>
              <option value="6">Generación VI (Kalos)</option>
              <option value="7">Generación VII (Alola)</option>
              <option value="8">Generación VIII (Galar)</option>
              <option value="9">Generación IX (Paldea)</option>
            </select>
          </div>

          {/* Ordenamiento */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ordenar por
              </label>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="id">Número</option>
                <option value="name">Nombre</option>
                <option value="height">Altura</option>
                <option value="weight">Peso</option>
                <option value="base_experience">Experiencia</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Orden
              </label>
              <select
                value={filters.sortOrder}
                onChange={(e) => handleFilterChange('sortOrder', e.target.value as 'asc' | 'desc')}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="asc">Ascendente</option>
                <option value="desc">Descendente</option>
              </select>
            </div>
          </div>

          {/* Estadísticas totales */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estadísticas Totales
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Mínimo</label>
                <input
                  type="number"
                  min="0"
                  max="1000"
                  value={filters.minStats}
                  onChange={(e) => handleFilterChange('minStats', parseInt(e.target.value) || 0)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Máximo</label>
                <input
                  type="number"
                  min="0"
                  max="1000"
                  value={filters.maxStats}
                  onChange={(e) => handleFilterChange('maxStats', parseInt(e.target.value) || 1000)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex justify-end space-x-2 pt-4 border-t border-gray-200">
            <button
              onClick={handleReset}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              Limpiar
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
            >
              Aplicar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
