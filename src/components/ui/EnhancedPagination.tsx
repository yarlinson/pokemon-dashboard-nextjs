'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface EnhancedPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export default function EnhancedPagination({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  isLoading = false 
}: EnhancedPaginationProps) {
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  if (totalPages <= 1) return null;

  const buttonVariants = {
    hover: {
      scale: 1.1,
      y: -2,
      boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)',
      transition: {
        duration: 0.2,
        ease: 'easeOut'
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    }
  };

  const pageVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      y: -20,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <motion.div 
      className="flex items-center justify-center space-x-3 py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Botón Anterior */}
      <motion.button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || isLoading}
        className="px-4 py-3 rounded-xl border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-medium"
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        whileDisabled={{ scale: 1, y: 0 }}
      >
        <motion.div 
          className="flex items-center space-x-2"
          animate={currentPage === 1 ? { opacity: 0.5 } : { opacity: 1 }}
        >
          <motion.svg 
            className="h-5 w-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            animate={isLoading ? { rotate: [0, 360] } : {}}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </motion.svg>
          <span>Anterior</span>
        </motion.div>
      </motion.button>

      {/* Números de página */}
      <div className="flex items-center space-x-2">
        <AnimatePresence mode="wait">
          {visiblePages.map((page, index) => (
            <motion.button
              key={`${page}-${index}`}
              onClick={() => typeof page === 'number' ? onPageChange(page) : undefined}
              disabled={page === '...' || isLoading}
              className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                page === currentPage
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : page === '...'
                  ? 'text-gray-400 cursor-default'
                  : 'text-gray-700 hover:bg-gray-100 border border-gray-300 hover:border-blue-300'
              }`}
              variants={buttonVariants}
              whileHover={page !== '...' ? 'hover' : {}}
              whileTap={page !== '...' ? 'tap' : {}}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ delay: index * 0.05 }}
            >
              {page}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {/* Botón Siguiente */}
      <motion.button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || isLoading}
        className="px-4 py-3 rounded-xl border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-medium"
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        whileDisabled={{ scale: 1, y: 0 }}
      >
        <motion.div 
          className="flex items-center space-x-2"
          animate={currentPage === totalPages ? { opacity: 0.5 } : { opacity: 1 }}
        >
          <span>Siguiente</span>
          <motion.svg 
            className="h-5 w-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            animate={isLoading ? { rotate: [0, -360] } : {}}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </motion.svg>
        </motion.div>
      </motion.button>

      {/* Información de página con animación */}
      <motion.div 
        className="ml-6 text-sm text-gray-600 font-medium"
        animate={{
          color: ['#6b7280', '#3b82f6', '#6b7280'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        Página {currentPage} de {totalPages}
      </motion.div>
    </motion.div>
  );
}

