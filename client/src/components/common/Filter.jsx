import { useState } from 'react';
import { Filter as FilterIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Filter = ({ 
  filters, 
  activeFilters, 
  onFilterChange, 
  onClearFilters 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const activeCount = Object.values(activeFilters).filter(val => val !== '').length;

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-surface border border-white/10 px-4 py-2 rounded-lg text-gray hover:text-white transition-colors"
      >
        <FilterIcon className="w-4 h-4" />
        <span className="text-sm font-medium">Filters</span>
        {activeCount > 0 && (
          <span className="ml-1 bg-primary text-background text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
            {activeCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-30" 
              onClick={() => setIsOpen(false)}
            ></div>
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute right-0 mt-2 w-72 bg-surface border border-white/10 rounded-xl shadow-2xl z-40 overflow-hidden"
            >
              <div className="flex justify-between items-center p-4 border-b border-white/10">
                <h3 className="font-bold text-white">Filter Results</h3>
                <button onClick={() => setIsOpen(false)} className="text-gray hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="p-4 space-y-4">
                {filters.map((filter) => (
                  <div key={filter.id}>
                    <label className="block text-xs font-medium text-gray mb-2 uppercase tracking-wider">
                      {filter.label}
                    </label>
                    <select 
                      value={activeFilters[filter.id] || ''}
                      onChange={(e) => onFilterChange(filter.id, e.target.value)}
                      className="w-full bg-background border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-primary"
                    >
                      <option value="">All</option>
                      {filter.options.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>

              {activeCount > 0 && (
                <div className="p-4 border-t border-white/10 bg-white/5">
                  <button 
                    onClick={() => {
                      onClearFilters();
                      setIsOpen(false);
                    }}
                    className="w-full py-2 text-sm text-red-400 hover:text-red-300 font-medium transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Filter;
