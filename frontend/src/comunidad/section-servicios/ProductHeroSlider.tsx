import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

// 1. Los datos para nuestras diapositivas
const heroSlides = [
  {
    id: 1,
    title: "Sabor a Montaña",
    subtitle: "Corazón de Familia",
    image: "/images/comunidad/cooperativa/cafe.jpg", // Necesitarás una imagen de fondo impactante
  },
  
  {
    id: 2,
    title: "El Brindis de Nuestra Tierra",
    subtitle: "Licores Artesanales Chiwanjmej",
    image: "/images/comunidad/cooperativa/licores.jpg",
  },
  {
    id: 3,
    title: "Hecho con Manos,",
    subtitle: "No con Máquinas",
    image: "/images/comunidad/cooperativa/artesanias.webp",
  }
];

// 2. Variantes de animación para la diapositiva
const slideVariants = {
  enter: { opacity: 0, x: 300 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -300 },
};

interface ProductHeroSliderProps {
  onScrollClick: () => void;
}

export function ProductHeroSlider({ onScrollClick }: ProductHeroSliderProps) {
  const [slideIndex, setSlideIndex] = useState(0);

  // 3. Lógica para el auto-play
  useEffect(() => {
    // Solo auto-play en las primeras 2 diapositivas
    if (slideIndex < heroSlides.length - 1) {
      const timer = setTimeout(() => {
        setSlideIndex((prev) => prev + 1);
      }, 5000); // 5 segundos por diapositiva

      return () => clearTimeout(timer);
    }
  }, [slideIndex]);

  const currentSlide = heroSlides[slideIndex];
  const isLastSlide = slideIndex === heroSlides.length - 1;

  return (
    <div className="relative h-screen w-full overflow-hidden text-white">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentSlide.id}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          className="absolute inset-0"
        >
          {/* Imagen de fondo */}
          <img
            src={currentSlide.image}
            alt={currentSlide.title}
            className="h-full w-full object-cover"
          />
          {/* Overlay oscuro para legibilidad */}
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>
      </AnimatePresence>

      {/* Contenido de texto */}
      <div className="relative z-10 flex h-full flex-col justify-center items-center text-center p-4">
        <motion.h2
          key={`title-${currentSlide.id}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-4xl sm:text-6xl font-bold drop-shadow-lg"
        >
          {currentSlide.title}
        </motion.h2>
        <motion.p
          key={`subtitle-${currentSlide.id}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-4 text-xl sm:text-2xl text-gray-200 drop-shadow-md"
        >
          {currentSlide.subtitle}
        </motion.p>

        {/* 4. Botón "Ver Más" (solo en la última diapositiva) */}
        <AnimatePresence>
          {isLastSlide && (
            <motion.button
              onClick={onScrollClick}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="mt-10 group relative rounded-full bg-amber-700 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-amber-800"
            >
              <span className="relative z-10 flex items-center justify-center">
                Ver la Colección
                <ArrowDown className="ml-2 h-5 w-5 transition-transform duration-300 ease-in-out group-hover:translate-y-1" />
              </span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Indicadores de diapositiva */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 space-x-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setSlideIndex(index)}
            className={`h-3 w-3 rounded-full transition-colors ${
              index === slideIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Ir a diapositiva ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}