import { motion } from 'framer-motion';
import { Compass, MapPin, Clock, Sparkles } from 'lucide-react';
import { useTranslation } from '../../../contexts/TranslationContext'; // ← AGREGAR IMPORT

interface LocationSectionProps {
  cocina: any;
}

export function LocationSection({ cocina }: LocationSectionProps) {
  const { t } = useTranslation(); // ← AGREGAR HOOK

  return (
    <section id="ubicacion" className="relative overflow-hidden py-12 sm:py-16 lg:py-20 xl:py-24 bg-[url('images/cultura/Fondo-gastronomia1.svg')] bg-no-repeat bg-center bg-cover"
>
  {/* capa translúcida para oscurecer o aclarar */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 xl:gap-16">
          {/* Información de Contacto */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-6 sm:space-y-8"
          >
            <div>
              <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
                <Compass className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-amber-600" />
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-serif text-gray-900">
                  {t('cocinas.location.visitUs')} {/* ← TRADUCIBLE */}
                </h2>
              </div>
              
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start space-x-3 sm:space-x-4 p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl shadow-lg border border-amber-100">
                  <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600 mt-0.5 sm:mt-1 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold font-serif text-gray-900 text-base sm:text-lg mb-1 sm:mb-2">
                      {t('cocinas.location.address')} {/* ← TRADUCIBLE */}
                    </h3>
                    <p className="text-gray-600 font-medium font-serif text-sm sm:text-base break-words">
                      {cocina.ubicacion.direccion} {/* ← VIENE DEL JSON */}
                    </p>
                    <p className="text-gray-500 text-xs sm:text-sm mt-1 sm:mt-2">
                      {cocina.ubicacion.puntoReferencia} {/* ← VIENE DEL JSON */}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4 p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl shadow-lg border border-amber-100">
                  <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600 mt-0.5 sm:mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-bold font-serif text-gray-900 text-base sm:text-lg mb-1 sm:mb-2">
                      {t('cocinas.location.hours')} {/* ← TRADUCIBLE */}
                    </h3>
                    <div className="text-gray-600 space-y-1 sm:space-y-2 font-medium font-serif text-sm sm:text-base">
                      <div className="flex justify-between">
                        <span>{t('cocinas.location.mondayFriday')}:</span> {/* ← TRADUCIBLE */}
                        <span className="text-amber-600 font-semibold font-serif">{cocina.horarios.lunesViernes}</span> {/* ← VIENE DEL JSON */}
                      </div>
                      <div className="flex justify-between">
                        <span>{t('cocinas.location.saturdaySunday')}:</span> {/* ← TRADUCIBLE */}
                        <span className="text-amber-600 font-semibold font-serif">{cocina.horarios.sabadoDomingo}</span> {/* ← VIENE DEL JSON */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recomendaciones - RESPONSIVE */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-amber-100 p-4 sm:p-6">
              <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-amber-600" />
                <h3 className="font-bold font-serif text-gray-900 text-base sm:text-lg">
                  {t('cocinas.location.recommendations')} {/* ← TRADUCIBLE */}
                </h3>
              </div>
              <ul className="text-gray-600 space-y-2 sm:space-y-3 font-medium font-serif text-sm sm:text-base">
                {cocina.recomendaciones.slice(0, 3).map((recomendacion: string, index: number) => (
                  <li key={index} className="flex items-start space-x-2 sm:space-x-3">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-amber-400 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                    <span className="break-words">{recomendacion}</span> {/* ← VIENE DEL JSON */}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Mapa o Imagen de Ubicación - RESPONSIVE */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl border border-amber-100 h-64 sm:h-80 lg:h-96 xl:h-auto min-h-[300px]"
          >
            <div className="w-full h-full">
              <iframe
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDNgTUMD0bkJJcxmxUui2dLvOgQsOez6Ds&q=${encodeURIComponent(cocina.ubicacion.direccion)}`}
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: '0.75rem' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${t('cocinas.location.locationOf')} ${cocina.nombre}`}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}