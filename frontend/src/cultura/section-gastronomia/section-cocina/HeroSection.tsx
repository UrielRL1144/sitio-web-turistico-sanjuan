import { motion } from 'framer-motion';
import { Sparkles, ChefHat, Award, BookOpen, Compass } from 'lucide-react';

interface HeroSectionProps {
  cocina: any;
  onNavigate: (section: string) => void;
}

export function HeroSection({ cocina, onNavigate }: HeroSectionProps) {
  return (
    <section id="cocinas" className="relative bg-gradient-to-r from-amber-900 via-amber-800 to-orange-900 text-white py-12 sm:py-16 lg:py-20 xl:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-8"
        >
          <Sparkles className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 mx-auto mb-3 sm:mb-4 text-amber-300" />
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold mb-4 sm:mb-6 leading-tight">
            {cocina.nombre}
          </h1>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4 sm:mb-6">
            <div className="flex items-center text-amber-200">
              <ChefHat className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              <span className="text-sm sm:text-base lg:text-lg font-semibold">{cocina.tipo}</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-amber-400 rounded-full"></div>
            <div className="flex items-center text-amber-200">
              <Award className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              <span className="text-sm sm:text-base lg:text-lg font-semibold">{cocina.generaciones} Generaciones</span>
            </div>
          </div>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed font-light px-2"
        >
          {cocina.descripcionLarga}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-2"
        >
          <button
            onClick={() => onNavigate('informacion-restaurante')}
            className="group bg-white text-amber-900 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base lg:text-lg hover:bg-amber-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center space-x-2 w-full sm:w-auto justify-center"
          >
            <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />
            <span>Descubre Nuestra Historia</span>
          </button>
          <button
            onClick={() => onNavigate('ubicacion')}
            className="group border-2 border-white text-white px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base lg:text-lg hover:bg-white hover:text-amber-900 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 w-full sm:w-auto justify-center"
          >
            <Compass className="h-4 w-4 sm:h-5 sm:w-5" />
            <span>¿Cómo Llegar?</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}