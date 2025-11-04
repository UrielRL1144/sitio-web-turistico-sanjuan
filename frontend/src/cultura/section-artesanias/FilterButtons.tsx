// FilterButtons.tsx
import { motion } from 'framer-motion';
import type{ FilterType } from './types';
import { Scissors, Palette, Brush } from 'lucide-react';

interface FilterButtonsProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const filterOptions = [
  { key: 'todos' as const, label: 'Todas las Artesanías', icon: null },
  { key: 'textiles' as const, label: 'Textiles Tradicionales', icon: Scissors },
  { key: 'ceramica' as const, label: 'Cerámica Artesanal', icon: Palette },
  { key: 'madera' as const, label: 'Tallado en Madera', icon: Brush },
];

export const FilterButtons: React.FC<FilterButtonsProps> = ({ 
  currentFilter, 
  onFilterChange 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="flex flex-wrap justify-center gap-4 mb-12"
    >
      {filterOptions.map(({ key, label, icon: IconComponent }) => (
        <button
          key={key}
          onClick={() => onFilterChange(key)}
          className={`px-6 py-3 rounded-full font-semibold font-serif transition-all duration-300 flex items-center gap-2 ${
            currentFilter === key 
              ? 'bg-amber-600 text-white shadow-lg' 
              : 'bg-white text-gray-700 shadow-md hover:shadow-lg'
          }`}
        >
          {IconComponent && <IconComponent className="w-4 h-4" />}
          {label}
        </button>
      ))}
    </motion.div>
  );
};