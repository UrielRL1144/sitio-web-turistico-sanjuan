import { motion } from 'framer-motion';
import { Sparkles, MapPin } from 'lucide-react';
import React from 'react';

interface CTACardProps {
  index: number;
  activeIndex: number;
  isMobile: boolean;
  totalItems: number;
  googleMapsUrl: string;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
}

export const CTACard: React.FC<CTACardProps> = ({
  index,
  activeIndex,
  isMobile,
  totalItems,
  googleMapsUrl,
  setActiveIndex,
}) => {
  const position = index - activeIndex;

  return (
    <motion.div
      key="cta-card"
      className="absolute w-full h-full origin-center cursor-pointer"
      initial={false}
      animate={{
        x: isMobile ? `${position * 100}%` : `${position * 50}%`,
        scale: 1 - Math.abs(position) * 0.2,
        opacity: activeIndex === index ? 1 : (isMobile ? 0 : 1 - Math.abs(position) * 0.4),
        rotateY: isMobile ? 0 : position * -20,
        zIndex: totalItems - Math.abs(position),
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      onClick={() => setActiveIndex(index)}
      aria-label="Tarjeta de invitación a visitar San Juan Tahitic"
    >
      <div className="w-full h-full bg-orange-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col items-center justify-center text-center p-8 relative">
        {/* Imagen de fondo con un enfoque más oscuro */}
        <img 
          src="/images/cultura/images-cultura/cultura7.jpg" 
          alt="Vista panorámica del pueblo de San Juan Tahitic" 
          className="absolute inset-0 w-full h-full object-cover opacity-10 blur-sm" // Opacidad más baja y desenfoque
        />
        <div className="relative z-10 text-white">
          <Sparkles className="h-12 w-12 mx-auto text-amber-300 mb-4 animate-pulse"/>
          <h3 className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight">¡Vívelo en Persona!</h3>
          <p className="text-lg text-orange-100 max-w-sm mx-auto mb-8 font-light">
            Siente el ritmo y la energía de las **danzas ancestrales** en el corazón de **San Juan Tahitic**. ¡Te esperamos!
          </p>
          <motion.a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-amber-400 text-orange-900 font-bold py-3 px-8 rounded-full shadow-xl transition transform hover:bg-amber-300"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(251, 191, 36, 0.5), 0 4px 6px -2px rgba(251, 191, 36, 0.2)" }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => e.stopPropagation()} 
          >
            <MapPin size={20} className="text-red-700"/>
            Ver en el Mapa
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};