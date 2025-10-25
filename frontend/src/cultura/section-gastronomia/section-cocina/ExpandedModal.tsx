import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Clock, BookOpen, Award, Phone, Star } from 'lucide-react';
import { useScrollIndicator } from '../hooks/useScrollIndicator';
import { useRef } from 'react';

interface ExpandedModalProps {
  restauranteExpandido: any;
  onClose: () => void;
  getServiceIcon: (servicio: string) => any;
}

export function ExpandedModal({ restauranteExpandido, onClose, getServiceIcon }: ExpandedModalProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const showScrollIndicator = useScrollIndicator(scrollRef);

  if (!restauranteExpandido) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-2 sm:p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-2xl sm:rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-amber-100"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header con imagen del restaurante - RESPONSIVE */}
          <div className="relative h-32 sm:h-40 md:h-48">
            <img
              src={restauranteExpandido.imagenes.ambiente || restauranteExpandido.especialidadDestacada?.imagen}
              alt={restauranteExpandido.nombre}
              className="w-full h-full object-cover"
            />
            <button
              onClick={onClose}
              className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-white/20 backdrop-blur-sm text-gray-800 p-2 sm:p-3 rounded-full hover:bg-white/30 transition-colors shadow-lg"
              aria-label="Cerrar modal"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
            </button>
          </div>

          {/* Contenido con scroll interno - RESPONSIVE */}
          <div 
            ref={scrollRef}
            className="p-4 sm:p-6 lg:p-8 max-h-[calc(90vh-8rem)] sm:max-h-[calc(90vh-10rem)] overflow-y-auto"
          >
            <div className="mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 mb-1 sm:mb-2">
                {restauranteExpandido.nombre}
              </h2>
              <div className="flex items-center text-gray-600 text-sm sm:text-base">
                <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                {restauranteExpandido.ubicacion.direccion}
              </div>
            </div>

            {restauranteExpandido.especialidadDestacada && (
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 border border-amber-200">
                <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                  <Star className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-amber-600" />
                  <h3 className="font-bold text-gray-900 text-base sm:text-lg">
                    ⭐ Platillo Emblemático Destacado
                  </h3>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 text-lg sm:text-xl mb-1 sm:mb-2">
                      {restauranteExpandido.especialidadDestacada.nombre}
                    </h4>
                    <p className="text-gray-600 text-xs sm:text-sm">
                      {restauranteExpandido.especialidadDestacada.descripcion}
                    </p>
                  </div>
                  <span className="text-amber-600 font-bold text-xl sm:text-2xl mt-2 sm:mt-0 sm:ml-4">
                    ${restauranteExpandido.especialidadDestacada.precio}
                  </span>
                </div>
              </div>
            )}

            {/* Información detallada - RESPONSIVE */}
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
              <div>
                <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                  <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600" />
                  <h3 className="font-semibold text-gray-800 text-base sm:text-lg">Nuestra Historia</h3>
                </div>
                <p className="text-gray-600 leading-relaxed font-medium text-sm sm:text-base">
                  {restauranteExpandido.historia.contenido}
                </p>
              </div>

              <div>
                <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                  <Award className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600" />
                  <h3 className="font-semibold text-gray-800 text-base sm:text-lg">Servicios</h3>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  {restauranteExpandido.servicios.slice(0, 4).map((servicio: string, index: number) => {
                    const IconComponent = getServiceIcon(servicio);
                    return (
                      <div key={index} className="flex items-center space-x-2 sm:space-x-3 text-gray-600 text-sm sm:text-base">
                        <IconComponent className="h-3 w-3 sm:h-4 sm:w-4 text-amber-600 flex-shrink-0" />
                        <span className="font-medium break-words">{servicio}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Horarios - RESPONSIVE */}
            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600" />
                <h3 className="font-semibold text-gray-800 text-base sm:text-lg">Horarios de Atención</h3>
              </div>
              <div className="text-gray-600 space-y-1 sm:space-y-2 font-medium text-sm sm:text-base">
                <div className="flex justify-between">
                  <span>Lunes - Viernes:</span>
                  <span className="text-amber-600">{restauranteExpandido.horarios.lunesViernes}</span>
                </div>
                <div className="flex justify-between">
                  <span>Sábado - Domingo:</span>
                  <span className="text-amber-600">{restauranteExpandido.horarios.sabadoDomingo}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer del modal con CTA - RESPONSIVE */}
          <div className="border-t border-gray-200 p-4 sm:p-6 bg-gradient-to-r from-amber-50 to-orange-50">
            <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
              <div className="text-gray-700 text-xs sm:text-sm font-medium text-center sm:text-left mb-2 sm:mb-0">
                ¿Tienes dudas? Llámanos: <strong className="break-all">{restauranteExpandido.contacto.telefono}</strong>
              </div>
              <button className="bg-amber-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold hover:bg-amber-700 transition-colors whitespace-nowrap shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2 text-sm sm:text-base w-full sm:w-auto justify-center">
                <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>Hacer Reservación</span>
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}