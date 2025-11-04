import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, Plus } from 'lucide-react'; // Importamos iconos para el overlay
import React from 'react';
import type{ Dance } from '../CultureDance'; 

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

// Sub-componente para manejar el elemento multimedia (sin cambios)
const MediaElement: React.FC<{ src: string, poster: string }> = ({ src, poster }) => (
  <motion.div className="absolute inset-0">
    <video 
      src={src} 
      poster={poster} 
      autoPlay 
      muted 
      loop 
      playsInline 
      className="w-full h-full object-cover"
    />
    {/* Fondo oscuro más ligero para no opacar el overlay */}
    <div className="absolute inset-0 bg-black/30 transition duration-300 group-hover:bg-black/40"></div>
  </motion.div>
);

// --- NUEVO SUBCOMPONENTE: InteractiveOverlay ---
interface InteractiveOverlayProps {
    isExpanded: boolean;
    isMobile: boolean;
}

const InteractiveOverlay: React.FC<InteractiveOverlayProps> = ({ isExpanded, isMobile }) => {
    // Si la tarjeta ya está expandida, no mostramos el overlay
    if (isExpanded) return null;

    // Variante de Framer Motion para el botón
    const buttonVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1 },
    };

    // Estilos base para el botón (cumpliendo con 44x44px en móvil)
    const baseClasses = "flex items-center justify-center font-semibold font-serif rounded-full shadow-lg transition-all duration-300 whitespace-nowrap bg-amber-500 text-gray-900 border-2 border-white/50";
    
    if (isMobile) {
        // Móvil: Fijo y discreto (esquina inferior derecha)
        return (
            <motion.div 
                className={`absolute bottom-20 right-6 z-20 h-9 w-11 ${baseClasses}`} // 44px (2.75rem)
                initial="hidden"
                animate="visible"
                variants={buttonVariants}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                role="button"
                aria-label="Toca para saber más sobre esta danza"
            >
                <Plus size={20} className="h-5 w-5" />
            </motion.div>
        );
    }

    // Desktop: Flotante y visible solo al hacer hover (usando 'group-hover')
    return (
        <AnimatePresence>
            <motion.div 
                className={`absolute top-12 left-10 -translate-x-1/2 -translate-y-1/2 z-20 py-3 px-6 text-lg ${baseClasses} opacity-0 group-hover:opacity-100 group-hover:scale-105`}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={buttonVariants}
                transition={{ duration: 0.2 }}
                role="button"
                aria-hidden="true" // Es un indicador visual, el click lo maneja el div padre
            >
                <ArrowUpRight size={20} className="mr-2 h-5 w-5 animate-bounce" />
                Saber más
            </motion.div>
        </AnimatePresence>
    );
};

// --- Componente DanceCard ---

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
  
  // Cálculo de animación (se mantiene igual)
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
      role="button" // Se añade role="button" para accesibilidad
      tabIndex={isActive ? 0 : -1} // Permite navegar con el teclado
      aria-expanded={isExpanded}
      aria-label={`Detalles de la danza ${dance.name}. Pulsa para ${isExpanded ? 'cerrar' : 'expandir'}`}
    >
      <div className="w-full h-full bg-black rounded-3xl overflow-hidden shadow-2xl transition-shadow duration-300 hover:shadow-orange-400/50 relative">
        
        <MediaElement src={dance.video} poster={dance.image} />
        
        {/* Llama al nuevo componente Overlay */}
        <InteractiveOverlay isExpanded={isExpanded} isMobile={isMobile} /> 
        
        {/* Contenido en la vista normal/base */}
        <div className="relative h-full flex flex-col justify-end p-6 sm:p-8 text-white">
          <motion.h3 layout="position" className="text-3xl sm:text-4xl font-bold font-serif transition duration-300 group-hover:text-amber-300">{dance.name}</motion.h3>
          <AnimatePresence>
            {!isExpanded && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }} exit={{ opacity: 0 }} className="text-base sm:text-lg mt-2 font-light font-serif">
                {dance.description}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Contenido expandido (se mantiene igual, solo se actualiza el X para ser más accesible) */}
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
                      <h4 className="font-bold font-serif text-sm sm:text-base flex items-center gap-2 text-amber-300 mb-1"><Icon size={18}/> {el.title}</h4> 
                      <p className="text-gray-300 text-xs sm:text-sm">{el.text}</p> 
                    </div> 
                  ); 
                })}
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); setExpandedIndex(null); }} 
                className="absolute top-4 right-4 p-2 bg-white/30 rounded-full hover:bg-white/50 transition z-40" // Z-index alto para el botón de cerrar
                aria-label="Cerrar detalles de la danza"
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