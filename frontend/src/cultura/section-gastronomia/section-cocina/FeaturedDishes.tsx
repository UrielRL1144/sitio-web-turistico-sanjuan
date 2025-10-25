import { motion } from 'framer-motion';
import { Star, ExternalLink } from 'lucide-react';

interface FeaturedDishesProps {
  cocina: any;
  onExpandRestaurant: (restaurante: any) => void;
}

export function FeaturedDishes({ cocina, onExpandRestaurant }: FeaturedDishesProps) {
  return (
    <section id="platillos-emblematicos" className="bg-white py-12 sm:py-16 lg:py-20 xl:py-24">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="flex items-center justify-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
            <Star className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-amber-600" />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900">Platillos Emblemáticos</h2>
            <Star className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-amber-600" />
          </div>
          <p className="text-gray-600 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto font-medium px-2">
            Descubre los sabores que nos definen y han conquistado a nuestros visitantes
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {cocina.especialidades
            .filter((esp: any) => esp.esEmblema)
            .slice(0, 3)
            .map((especialidad: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-white to-amber-50 rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-xl sm:hover:shadow-2xl transition-all duration-300 border border-amber-100 group cursor-pointer"
              onClick={() => onExpandRestaurant({...cocina, especialidadDestacada: especialidad})}
            >
              <div className="relative h-40 sm:h-48 lg:h-52 overflow-hidden">
                <img
                  src={especialidad.imagen}
                  alt={especialidad.nombre}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white px-2 sm:px-3 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold flex items-center space-x-1 sm:space-x-2 shadow-lg">
                  <Star className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>Emblema</span>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-white/90 backdrop-blur-sm rounded-full p-2 sm:p-3">
                    <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-amber-600" />
                  </div>
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-amber-700 transition-colors line-clamp-2">
                  {especialidad.nombre}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 font-medium">
                  {especialidad.descripcion}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-lg sm:text-xl lg:text-2xl font-bold text-amber-600">${especialidad.precio}</span>
                  <button className="text-amber-600 hover:text-amber-700 font-semibold text-xs sm:text-sm flex items-center space-x-1 sm:space-x-2 group-hover:translate-x-1 transition-transform">
                    <span>Ver más</span>
                    <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}