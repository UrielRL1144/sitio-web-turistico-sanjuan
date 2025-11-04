import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles, X, MapPin, Feather, Music, Sunrise, Shirt, Leaf, Footprints, Heart, Wind, BookOpen } from 'lucide-react';
import dancesData from '../archivos_data/danzas.json';
import { useWindowSize } from '../../src/hooks/useWindowSize';
// Importamos los nuevos subcomponentes
import { DanceCard } from './section-dance/DanceCard'; 
import { CTACard } from './section-dance/CTACard';

// --- Mapeo de Iconos e Interfaces (Se mantiene el tipado) ---
type IconKey = 'Shirt' | 'Feather' | 'Music' | 'Sunrise' | 'Leaf' | 'Footprints' | 'Heart' | 'Wind' | 'BookOpen';
const iconMap = {
  Shirt, Feather, Music, Sunrise, Leaf, Footprints, Heart, Wind, BookOpen
};

interface DanceElement {
  icon: IconKey; // Usamos el tipo IconKey
  title: string;
  text: string;
}

export interface Dance { // Exportamos la interfaz para usarla en DanceCard
  id: number;
  name: string;
  description: string;
  image: string;
  video: string;
  details: {
    story: string;
    elements: DanceElement[];
  };
}

interface DancesData {
  dances: Dance[];
}

// --- Componente Principal ---
export function CultureDance() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const dances = (dancesData as DancesData).dances;
  const { width } = useWindowSize();
  const isMobile = width ? width < 768 : false;

  // CTA: La longitud total ahora incluye la tarjeta de invitación
  const totalItems = dances.length + 1;
  const ctaCardIndex = dances.length;
  // Usar una URL más descriptiva y una constante en vez de un string literal
  const googleMapsUrl = "https://maps.app.goo.gl/TuUbicacionFicticia"; 

  // Función de navegación mejorada
  const navigate = (direction: 'prev' | 'next') => {
    setActiveIndex((prev) => 
      direction === 'next' 
        ? (prev + 1) % totalItems 
        : (prev - 1 + totalItems) % totalItems
    );
  };

  useEffect(() => {
    // Si hay una tarjeta expandida, desactivamos la navegación con flechas
    if (expandedIndex !== null) return; 

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setExpandedIndex(null);
      if (event.key === 'ArrowRight') navigate('next');
      if (event.key === 'ArrowLeft') navigate('prev');
      
      // Expandir con Enter/Espacio solo si no es la tarjeta CTA
      if ((event.key === 'Enter' || event.key === ' ') && activeIndex !== ctaCardIndex) {
        setExpandedIndex(activeIndex);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, expandedIndex, totalItems, ctaCardIndex]);

  return (
    <section id="danzas" className="py-16 sm:py-24 relative overflow-hidden min-h-screen flex flex-col justify-center bg-[url('images/cultura/Fondo-danzas.svg')] bg-no-repeat bg-center bg-cover"
>
   {/* capa translúcida para oscurecer o aclarar */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* --- Encabezado --- */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-100 to-amber-100 px-4 py-2 rounded-full mb-6">
                <Sparkles className="h-5 w-5 text-orange-600" />
                <span className="text-orange-800 font-medium font-serif">Tradiciones en Movimiento</span>
            </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif text-gray-900 mb-8">
            Danzas <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-red-600 bg-clip-text text-transparent">ancestrales</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Sumérgete en cada danza dando clic en ellos y sé parte de{' '}
            <span className="bg-gradient-to-r from-red-700 via-fuchsia-600 via-40% to-emerald-700 bg-clip-text text-transparent font-black tracking-tight text-2xl">
              San Juan Tahitic
            </span>
          </p>
        </motion.div>
        
        <div className="relative h-[550px] md:h-[600px] flex items-center justify-center">
          
          {/* --- Botones de Navegación --- */}
          <AnimatePresence>
            {expandedIndex === null && (
              <>
                <motion.button 
                  key="nav-left"
                  onClick={() => navigate('prev')} 
                  className="absolute left-2 md:left-0 z-20 p-2 bg-white/80 rounded-full shadow-xl hover:bg-white transition" 
                  aria-label="Danza anterior"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                > 
                  <ChevronLeft className="h-6 w-6 text-gray-700"/> 
                </motion.button>
                <motion.button 
                  key="nav-right"
                  onClick={() => navigate('next')} 
                  className="absolute right-2 md:right-0 z-20 p-2 bg-white/80 rounded-full shadow-xl hover:bg-white transition"
                  aria-label="Danza siguiente"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                >
                  <ChevronRight className="h-6 w-6 text-gray-700"/>
                </motion.button>
              </>
            )}
          </AnimatePresence>
          
          {/* --- Contenedor del Carrusel --- */}
          <div className="relative w-full h-full max-w-sm md:max-w-4xl">
            
            {dances.map((dance, index) => {
              const isActive = index === activeIndex;
              const isExpanded = index === expandedIndex;
              const position = index - activeIndex;
              
              // Lógica de posicionamiento y animación delegada a la tarjeta, 
              // pero se pasan las props necesarias.
              return (
                <DanceCard
                  key={dance.id}
                  dance={dance}
                  index={index}
                  activeIndex={activeIndex}
                  expandedIndex={expandedIndex}
                  setExpandedIndex={setExpandedIndex}
                  setActiveIndex={setActiveIndex}
                  iconMap={iconMap}
                  isMobile={isMobile}
                  totalItems={totalItems}
                />
              );
            })}

            {/* --- CTA: La nueva tarjeta de invitación (Componente separado) --- */}
            <CTACard
              index={ctaCardIndex}
              activeIndex={activeIndex}
              isMobile={isMobile}
              totalItems={totalItems}
              googleMapsUrl={googleMapsUrl}
              setActiveIndex={setActiveIndex}
            />

          </div>
        </div>
      </div>
    </section>
  );
}