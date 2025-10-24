// components/ExperienciaGastronomicaRefinada.tsx
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, ChevronLeft, ChevronRight, Calendar, Clock, MapPin, 
  Expand, Scroll, Filter, Play, Pause, Star, Users, Wifi,
  Car, Utensils, Heart, ChefHat, Sparkles, Award, BookOpen,
  Phone, MessageCircle, Mail, ExternalLink, Compass,
  TreePine, Coffee, Soup, Salad, Beef, Wheat, Menu,
  Home
} from 'lucide-react';
import cocinasData from '../../archivos_data/cocinas-tradicionales.json';
import { Card } from '@/components/ui/card';

export function ViajeSensorialGastronomico() {
  const [cocinaActiva, setCocinaActiva] = useState(0);
  const [modoGaleria, setModoGaleria] = useState(false);
  const [imagenExpandida, setImagenExpandida] = useState<string | null>(null);
  const [restauranteExpandido, setRestauranteExpandido] = useState<any>(null);
  const [fechaSeleccionada, setFechaSeleccionada] = useState<string>('');
  const [menuMovilAbierto, setMenuMovilAbierto] = useState(false);

  const cocinas = cocinasData.cocinas;
  const cocina = cocinas[cocinaActiva];

  // Navegación entre cocinas
  const siguienteCocina = () => {
    setCocinaActiva((prev) => (prev + 1) % cocinas.length);
  };

  const anteriorCocina = () => {
    setCocinaActiva((prev) => (prev - 1 + cocinas.length) % cocinas.length);
  };

  // Obtener fechas únicas para el selector
  const fechasUnicas = [...new Set(cocina.galerias.map((g: any) => g.fecha))].sort();

  // Galería filtrada por fecha
  const galeriaFiltrada = fechaSeleccionada
    ? cocina.galerias.filter((g: any) => g.fecha === fechaSeleccionada)
    : cocina.galerias;

  // Scroll interno para contenido largo
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkScroll = () => {
      if (scrollRef.current) {
        const { scrollHeight, clientHeight } = scrollRef.current;
        setShowScrollIndicator(scrollHeight > clientHeight);
      }
    };

    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [restauranteExpandido]);

  // Iconos para servicios
  const getServiceIcon = (servicio: string) => {
    const icons: { [key: string]: any } = {
      'WiFi Gratuito': Wifi,
      'Estacionamiento': Car,
      'Terraza Jardín': TreePine,
      'Grupos Grandes': Users,
      'Comida Para Llevar': Utensils,
      'Reservaciones': BookOpen,
      'Espacio al Aire Libre': TreePine,
      'Demonstraciones Culinarias': ChefHat,
      'Talleres de Cocina': Utensils,
      'Venta de Ingredientes Locales': Sparkles,
      'Eventos Especiales': Calendar
    };
    return icons[servicio] || Sparkles;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Header con Navegación entre Cocinas - RESPONSIVE */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-amber-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between py-3 sm:py-4">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <ChefHat className="h-6 w-6 sm:h-8 sm:w-8 text-amber-600" />
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                Experiencias Gastronómicas
              </h1>
            </div>
            
            {/* Navegación entre cocinas - RESPONSIVE */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button
                onClick={anteriorCocina}
                className="p-1 sm:p-2 rounded-full bg-amber-100 text-amber-700 hover:bg-amber-200 transition-colors"
                aria-label="Cocina anterior"
              >
                <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
              
              <div className="flex items-center space-x-1 sm:space-x-2">
                <span className="text-xs sm:text-sm font-medium text-gray-600 hidden xs:block">
                  {cocinaActiva + 1} de {cocinas.length}
                </span>
                <div className="flex space-x-1">
                  {cocinas.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCocinaActiva(index)}
                      className={`transition-all ${
                        index === cocinaActiva 
                          ? 'bg-amber-600 w-4 sm:w-6' 
                          : 'bg-amber-300 hover:bg-amber-400 w-2 sm:w-2'
                      } h-2 rounded-full`}
                      aria-label={`Ir a cocina ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              <button
                onClick={siguienteCocina}
                className="p-1 sm:p-2 rounded-full bg-amber-100 text-amber-700 hover:bg-amber-200 transition-colors"
                aria-label="Siguiente cocina"
              >
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>

              {/* Botón menú móvil */}
              <button
                onClick={() => setMenuMovilAbierto(!menuMovilAbierto)}
                className="lg:hidden p-2 rounded-lg bg-amber-100 text-amber-700 hover:bg-amber-200 transition-colors"
                aria-label="Menú de navegación"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Menú móvil */}
          <AnimatePresence>
            {menuMovilAbierto && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden border-t border-amber-200 pt-4 pb-2"
              >
                <div className="flex flex-col space-y-3">
                  <button
                    onClick={() => {
                      document.getElementById('informacion-restaurante')?.scrollIntoView({ behavior: 'smooth' });
                      setMenuMovilAbierto(false);
                    }}
                    className="flex items-center space-x-3 text-gray-700 hover:text-amber-600 transition-colors"
                  >
                    <BookOpen className="h-5 w-5" />
                    <span>Nuestra Historia</span>
                  </button>
                  <button
                    onClick={() => {
                      document.getElementById('ubicacion')?.scrollIntoView({ behavior: 'smooth' });
                      setMenuMovilAbierto(false);
                    }}
                    className="flex items-center space-x-3 text-gray-700 hover:text-amber-600 transition-colors"
                  >
                    <Compass className="h-5 w-5" />
                    <span>Ubicación</span>
                  </button>
                  <button
                    onClick={() => {
                      document.querySelector('#platillos-emblematicos')?.scrollIntoView({ behavior: 'smooth' });
                      setMenuMovilAbierto(false);
                    }}
                    className="flex items-center space-x-3 text-gray-700 hover:text-amber-600 transition-colors"
                  >
                    <Star className="h-5 w-5" />
                    <span>Platillos Emblemáticos</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Hero Section - RESPONSIVE */}
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
              onClick={() => document.getElementById('informacion-restaurante')?.scrollIntoView({ behavior: 'smooth' })}
              className="group bg-white text-amber-900 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base lg:text-lg hover:bg-amber-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center space-x-2 w-full sm:w-auto justify-center"
            >
              <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Descubre Nuestra Historia</span>
            </button>
            <button
              onClick={() => document.getElementById('ubicacion')?.scrollIntoView({ behavior: 'smooth' })}
              className="group border-2 border-white text-white px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base lg:text-lg hover:bg-white hover:text-amber-900 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 w-full sm:w-auto justify-center"
            >
              <Compass className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>¿Cómo Llegar?</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Información del Restaurante - RESPONSIVE */}
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
                {cocina.servicios.map((servicio, index) => {
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

      {/* Platillos Emblemáticos - RESPONSIVE */}
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
              .filter(esp => esp.esEmblema)
              .slice(0, 3)
              .map((especialidad, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-white to-amber-50 rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-xl sm:hover:shadow-2xl transition-all duration-300 border border-amber-100 group cursor-pointer"
                onClick={() => setRestauranteExpandido({...cocina, especialidadDestacada: especialidad})}
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

      {/* Ubicación y Horarios - RESPONSIVE */}
      <section id="ubicacion" className="bg-gradient-to-br from-amber-100 to-orange-100 py-12 sm:py-16 lg:py-20 xl:py-24">
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
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900">Visítanos</h2>
                </div>
                
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-start space-x-3 sm:space-x-4 p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl shadow-lg border border-amber-100">
                    <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600 mt-0.5 sm:mt-1 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 text-base sm:text-lg mb-1 sm:mb-2">Dirección</h3>
                      <p className="text-gray-600 font-medium text-sm sm:text-base break-words">
                        {cocina.ubicacion.direccion}
                      </p>
                      <p className="text-gray-500 text-xs sm:text-sm mt-1 sm:mt-2">
                        {cocina.ubicacion.puntoReferencia}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 sm:space-x-4 p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl shadow-lg border border-amber-100">
                    <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600 mt-0.5 sm:mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-base sm:text-lg mb-1 sm:mb-2">Horarios</h3>
                      <div className="text-gray-600 space-y-1 sm:space-y-2 font-medium text-sm sm:text-base">
                        <div className="flex justify-between">
                          <span>Lunes - Viernes:</span>
                          <span className="text-amber-600 font-semibold">{cocina.horarios.lunesViernes}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Sábado - Domingo:</span>
                          <span className="text-amber-600 font-semibold">{cocina.horarios.sabadoDomingo}</span>
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
                  <h3 className="font-bold text-gray-900 text-base sm:text-lg">Recomendaciones</h3>
                </div>
                <ul className="text-gray-600 space-y-2 sm:space-y-3 font-medium text-sm sm:text-base">
                  {cocina.recomendaciones.slice(0, 3).map((recomendacion, index) => (
                    <li key={index} className="flex items-start space-x-2 sm:space-x-3">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-amber-400 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                      <span className="break-words">{recomendacion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Mapa o Imagen de Ubicación - RESPONSIVE */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl overflow-hidden border border-amber-100 h-64 sm:h-80 lg:h-96 xl:h-auto min-h-[300px]"
            >
              {/* Aquí iría tu componente de mapa o imagen de ubicación */}
              <div className="w-full h-full">
                <iframe
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDNgTUMD0bkJJcxmxUui2dLvOgQsOez6Ds&q=${encodeURIComponent(cocina.ubicacion.direccion)}`}
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: '0.75rem' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Ubicación de ${cocina.nombre}`}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Llamada a la Acción Final - RESPONSIVE */}
      <section className="bg-gradient-to-r from-amber-600 via-amber-700 to-orange-700 text-white py-12 sm:py-16 lg:py-20 xl:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-amber-400/20 rounded-full -translate-y-16 sm:-translate-y-24 lg:-translate-y-32 translate-x-16 sm:translate-x-24 lg:translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-36 sm:h-36 lg:w-48 lg:h-48 bg-orange-400/20 rounded-full translate-y-12 sm:translate-y-18 lg:translate-y-24 -translate-x-12 sm:-translate-x-18 lg:-translate-x-24"></div>
        
        <div className="relative max-w-4xl mx-auto text-center px-3 sm:px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-6 sm:mb-8"
          >
            <Sparkles className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 mx-auto mb-4 sm:mb-6 text-amber-300" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 sm:mb-6 px-2">
              ¿Listo para una Experiencia Inolvidable?
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg sm:text-xl lg:text-2xl mb-6 sm:mb-8 opacity-90 font-light px-2"
            >
              Te esperamos para compartir lo mejor de nuestra tradición culinaria
            </motion.p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-2"
          >
            <Card className="group bg-white text-amber-900 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base lg:text-lg hover:bg-amber-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center space-x-2 w-full sm:w-auto justify-center">
              <Home className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Visitanos</span>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 sm:mt-10 lg:mt-12 flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-6 lg:space-x-8 text-amber-200 text-sm sm:text-base"
          >
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="font-semibold">{cocina.contacto.telefono}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="font-semibold break-all">{cocina.contacto.correo}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modal Expandido para Información Completa - RESPONSIVE */}
      <AnimatePresence>
        {restauranteExpandido && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-2 sm:p-4"
            onClick={() => setRestauranteExpandido(null)}
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
                  onClick={() => setRestauranteExpandido(null)}
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
        )}
      </AnimatePresence>
    </div>
  );
}