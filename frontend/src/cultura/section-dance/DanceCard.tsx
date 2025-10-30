import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import React from 'react';
import type { Dance } from '../CultureDance'; // Importamos la interfaz Dance
 // Importamos la interfaz Dance

// Definimos las props para el componente
interface DanceCardProps {
  dance: Dance;
  index: number;
  activeIndex: number;
  expandedIndex: number | null;
  setExpandedIndex: React.Dispatch<React.SetStateAction<number | null>>;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  iconMap: Record<string, React.ElementType>;
  isMobile: boolean;
  totalItems: number;
}

// Sub-componente para manejar el elemento multimedia
const MediaElement: React.FC<{ src: string, poster: string }> = ({ src, poster }) => (
  <motion.div className="absolute inset-0">
    {/* Usamos el video si soporta autoPlay, sino el poster. Se asume que el video funciona bien. */}
    <video 
      src={src} 
      poster={poster} 
      autoPlay 
      muted 
      loop 
      playsInline // Añadido para mejor compatibilidad en móviles
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-black/40 transition duration-300 group-hover:bg-black/50"></div>
  </motion.div>
);

export const DanceCard: React.FC<DanceCardProps> = ({
  dance,
  index,
  activeIndex,
  expandedIndex,
  setExpandedIndex,
  setActiveIndex,
  iconMap,
  isMobile,
}) => {
  const isActive = index === activeIndex;
  const isExpanded = index === expandedIndex;
  const position = index - activeIndex;
  
  // Cálculo de animación
  const x = isMobile ? position * 100 : position * 50;
  const rotateY = isMobile ? 0 : position * -20;
  const scale = 1 - Math.abs(position) * 0.2;
  const opacity = isActive || isExpanded ? 1 : (isMobile ? 0 : 1 - Math.abs(position) * 0.4);

  const handleClick = () => {
    if (isExpanded) {
      setExpandedIndex(null);
    } else if (isActive) {
      setExpandedIndex(index);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <motion.div
      key={dance.id}
      layout
      className={`absolute w-full h-full origin-center cursor-pointer group ${isExpanded ? 'z-30' : 'z-10'}`}
      initial={false}
      animate={{ 
        x: `${x}%`, 
        scale: isExpanded ? 1.05 : scale, 
        opacity: opacity, 
        rotateY: isExpanded ? 0 : rotateY, 
        zIndex: isExpanded ? 10 : (index === activeIndex ? 5 : (index === activeIndex + 1 || index === activeIndex - 1 ? 4 : 1)) 
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      onClick={handleClick}
      aria-label={`Ver detalles de la danza ${dance.name}`}
    >
      <div className="w-full h-full bg-black rounded-3xl overflow-hidden shadow-2xl transition-shadow duration-300 hover:shadow-orange-400/50">
        
        <MediaElement src={dance.video} poster={dance.image} />
        
        {/* Contenido en la vista normal/base */}
        <div className="relative h-full flex flex-col justify-end p-6 sm:p-8 text-white">
          <motion.h3 layout="position" className="text-3xl sm:text-4xl font-bold transition duration-300 group-hover:text-amber-300">{dance.name}</motion.h3>
          <AnimatePresence>
            {!isExpanded && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }} exit={{ opacity: 0 }} className="text-base sm:text-lg mt-2 font-light">
                {dance.description}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Contenido expandido */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div 
              className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 pt-4 bg-gradient-to-t from-black via-black/90 to-transparent max-h-[55%] overflow-y-auto custom-scrollbar" 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.5 } }} 
              exit={{ opacity: 0 }}
            >
              <p className="text-gray-300 mb-6 text-sm sm:text-base italic border-l-4 border-amber-500 pl-4">"{dance.details.story}"</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {dance.details.elements.map((el) => { 
                  const Icon = iconMap[el.icon]; 
                  return ( 
                    <div key={el.title} className="bg-white/10 p-3 rounded-lg backdrop-blur-sm"> 
                      <h4 className="font-bold text-sm sm:text-base flex items-center gap-2 text-amber-300 mb-1"><Icon size={18}/> {el.title}</h4> 
                      <p className="text-gray-300 text-xs sm:text-sm">{el.text}</p> 
                    </div> 
                  ); 
                })}
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); setExpandedIndex(null); }} 
                className="absolute top-4 right-4 p-2 bg-white/30 rounded-full hover:bg-white/50 transition"
                aria-label="Cerrar detalles"
              >
                <X className="h-5 w-5 text-white"/>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};