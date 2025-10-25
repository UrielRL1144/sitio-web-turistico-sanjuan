import { motion } from 'framer-motion';
import { BookOpen, Award, Sparkles, Wifi, Car, TreePine, Users, Utensils, BookOpen as Reservations, ChefHat, Calendar } from 'lucide-react';

interface RestaurantInfoProps {
  cocina: any;
}

// Mover la función getServiceIcon aquí ya que es específica de este componente
const getServiceIcon = (servicio: string) => {
  const icons: { [key: string]: any } = {
    'WiFi Gratuito': Wifi,
    'Estacionamiento': Car,
    'Terraza Jardín': TreePine,
    'Grupos Grandes': Users,
    'Comida Para Llevar': Utensils,
    'Reservaciones': Reservations,
    'Espacio al Aire Libre': TreePine,
    'Demonstraciones Culinarias': ChefHat,
    'Talleres de Cocina': Utensils,
    'Venta de Ingredientes Locales': Sparkles,
    'Eventos Especiales': Calendar
  };
  return icons[servicio] || Sparkles;
};

export function RestaurantInfo({ cocina }: RestaurantInfoProps) {
  return (
    <section id="informacion-restaurante" className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-12 sm:py-16 lg:py-20 xl:py-24">
      <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 items-start">
        {/* Historia y Ambiente */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6 sm:space-y-8"
        >
          <div>
            <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
              <BookOpen className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-amber-600" />
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900">Nuestra Historia</h2>
            </div>
            <div className="prose prose-sm sm:prose-lg max-w-none text-gray-600 mb-6 sm:mb-8">
              <p className="text-base sm:text-lg leading-relaxed mb-4 sm:mb-6 font-medium">
                {cocina.historia.contenido}
              </p>
              <blockquote className="border-l-4 border-amber-500 pl-4 sm:pl-6 italic text-gray-700 my-4 sm:my-6 text-base sm:text-xl font-light bg-amber-50 py-3 sm:py-4 rounded-r-2xl">
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-amber-500 mb-1 sm:mb-2" />
                "{cocina.historia.fraseEmblematica}"
              </blockquote>
            </div>
          </div>

          {/* Servicios del Restaurante - RESPONSIVE */}
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl p-4 sm:p-6 lg:p-8 border border-amber-100">
            <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
              <Award className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-amber-600" />
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Servicios que Ofrecemos</h3>
            </div>
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
              {cocina.servicios.map((servicio: string, index: number) => {
                const IconComponent = getServiceIcon(servicio);
                return (
                  <div key={index} className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-amber-50 hover:bg-amber-100 transition-colors group">
                    <div className="p-1 sm:p-2 bg-white rounded-lg sm:rounded-xl shadow-sm group-hover:shadow-md transition-shadow flex-shrink-0">
                      <IconComponent className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-amber-600" />
                    </div>
                    <span className="text-xs sm:text-sm lg:text-base text-gray-700 font-medium break-words">
                      {servicio}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Imagen Ambiental - RESPONSIVE */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl overflow-hidden border border-amber-100 transform hover:scale-[1.02] transition-transform duration-300">
            <img
              src={cocina.imagenes.ambiente}
              alt={`Ambiente de ${cocina.nombre}`}
              className="w-full h-48 sm:h-64 md:h-72 lg:h-80 xl:h-96 object-cover"
            />
            <div className="p-4 sm:p-6 lg:p-8">
              <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-amber-600" />
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">El Ambiente</h3>
              </div>
              <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed font-medium">
                {cocina.descripcionAmbiente}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}