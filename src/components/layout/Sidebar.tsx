'use client';

import { motion, AnimatePresence } from 'framer-motion';
import TypeFilter from '../search/TypeFilter';
import AdvancedFilters from '../search/AdvancedFilters';

interface AdvancedFilters {
  generation?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  minStats?: number;
  maxStats?: number;
}

interface SidebarProps {
  selectedTypes: string[];
  onTypeChange: (types: string[]) => void;
  onFiltersChange: (filters: AdvancedFilters | null) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({ 
  selectedTypes, 
  onTypeChange, 
  onFiltersChange, 
  isOpen, 
  onToggle 
}: SidebarProps) {
  return (
    <>
      {/* Overlay para cerrar sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onToggle}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 h-full w-80 bg-white shadow-xl z-50 overflow-y-auto"
          >
            <div className="p-6">
              {/* Header del sidebar */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Filtros</h2>
                <button
                  onClick={onToggle}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Contenido del sidebar */}
              <div className="space-y-6">
                {/* Filtro por tipo */}
                <div>
                  <TypeFilter 
                    selectedTypes={selectedTypes}
                    onTypeChange={onTypeChange}
                  />
                </div>

                {/* Filtros avanzados */}
                <div>
                  <AdvancedFilters 
                    onFiltersChange={onFiltersChange}
                  />
                </div>

                {/* Botón para limpiar todos los filtros */}
                <div className="pt-4 border-t border-gray-200">
                  <button
                    onClick={() => {
                      onTypeChange([]);
                      onFiltersChange(null);
                    }}
                    className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Limpiar todos los filtros
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


