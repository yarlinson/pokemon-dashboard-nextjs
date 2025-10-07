'use client';

import { motion } from 'framer-motion';

interface FilterIndicatorProps {
  selectedTypes: string[];
  advancedFilters: any;
  onClearAll: () => void;
}

export default function FilterIndicator({ 
  selectedTypes, 
  advancedFilters, 
  onClearAll 
}: FilterIndicatorProps) {
  const hasActiveFilters = selectedTypes.length > 0 || advancedFilters;

  if (!hasActiveFilters) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <span className="text-blue-800 font-medium">Filtros activos</span>
        </div>
        <button
          onClick={onClearAll}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
        >
          Limpiar todo
        </button>
      </div>

      <div className="mt-3 space-y-2">
        {/* Tipos seleccionados */}
        {selectedTypes.length > 0 && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-blue-700 font-medium">Tipos:</span>
            <div className="flex flex-wrap gap-1">
              {selectedTypes.map((type) => (
                <span
                  key={type}
                  className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Filtros avanzados activos */}
        {advancedFilters && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-blue-700 font-medium">Filtros avanzados:</span>
            <div className="flex flex-wrap gap-1">
              {advancedFilters.generation && (
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  Gen {advancedFilters.generation}
                </span>
              )}
              {advancedFilters.sortBy && advancedFilters.sortBy !== 'id' && (
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  Orden: {advancedFilters.sortBy}
                </span>
              )}
              {(advancedFilters.minStats > 0 || advancedFilters.maxStats < 1000) && (
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  Stats: {advancedFilters.minStats}-{advancedFilters.maxStats}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

