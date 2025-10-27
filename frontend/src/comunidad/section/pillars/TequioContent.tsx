// src/sections/TequioContent.tsx
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { 
  Handshake, 
  Users, 
  Hammer,
  TreePine,
  Wrench,
  Heart,
  Award,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import React, { useState, useEffect } from 'react';

// --- Imágenes del Carrusel ---
const carouselImages = [
  {
    url: '/images/comunidad/valores-comunidad/caminos-rurales.jpg',
    title: 'Trabajo Colectivo en Caminos',
    description: 'Comunidad unida en el mantenimiento de caminos rurales'
  },
  {
    url: '/images/comunidad/valores-comunidad/rurales.jpg',
    title: 'Reforestación Comunitaria',
    description: 'Siembra de árboles nativos para preservar nuestros recursos'
  },
  {
    url: '/images/tequio-comunitario-3.jpg',
    title: 'Mantenimiento de Escuelas',
    description: 'Mejoramiento de infraestructura educativa entre todos'
  },
  {
    url: '/images/tequio-comunitario-4.jpg',
    title: 'Limpieza de Manantiales',
    description: 'Cuidado de nuestras fuentes de agua tradicionales'
  },
  {
    url: '/images/tequio-comunitario-5.jpg',
    title: 'Celebración del Tequio',
    description: 'Compartir y convivir después del trabajo colectivo'
  }
];

// --- Datos de Proyectos de Tequio ---
const proyectosData = [
  {
    nombre: 'Mantenimiento de Caminos Rurales',
    descripcion: 'Reparación y limpieza de los caminos que conectan nuestras comunidades y parcelas, asegurando el acceso seguro a todas las familias.',
    participantes: 50,
    frecuencia: 'Mensual',
    ultimaRealizacion: 'Octubre 2024',
    beneficios: ['Mejor acceso a comunidades', 'Transporte seguro', 'Comunicación fluida', 'Comercio local fortalecido'],
    herramientas: ['Palas', 'Carretillas', 'Rastrillos', 'Picos'],
    color: 'from-emerald-500 to-teal-600',
    icon: Hammer
  },
  {
    nombre: 'Reforestación Comunitaria',
    descripcion: 'Siembra de árboles nativos en áreas degradadas para preservar nuestros recursos naturales y mantener el equilibrio ecológico.',
    participantes: 35,
    frecuencia: 'Trimestral',
    ultimaRealizacion: 'Septiembre 2024',
    beneficios: ['Conservación de suelos', 'Agua limpia', 'Biodiversidad', 'Sombra y frescura'],
    herramientas: ['Barras', 'Machetes', 'Plantas nativas', 'Regaderas'],
    color: 'from-green-500 to-emerald-600',
    icon: TreePine
  },
  {
    nombre: 'Mantenimiento de Escuelas',
    descripcion: 'Reparación y mejora de infraestructura educativa para garantizar condiciones dignas de aprendizaje para nuestros niños.',
    participantes: 40,
    frecuencia: 'Bimestral',
    ultimaRealizacion: 'Agosto 2024',
    beneficios: ['Espacios dignos', 'Seguridad escolar', 'Ambiente propicio', 'Orgullo comunitario'],
    herramientas: ['Pintura', 'Herramientas de carpintería', 'Materiales', 'Andamios'],
    color: 'from-cyan-500 to-blue-600',
    icon: Wrench
  },
  {
    nombre: 'Limpieza de Manantiales',
    descripcion: 'Preservación de nuestras fuentes de agua mediante limpieza y mantenimiento, honrando la sabiduría ancestral.',
    participantes: 25,
    frecuencia: 'Semestral',
    ultimaRealizacion: 'Julio 2024',
    beneficios: ['Agua potable', 'Salud comunitaria', 'Tradición ancestral', 'Naturaleza protegida'],
    herramientas: ['Guantes', 'Rastrillos', 'Bolsas de recolección', 'Botas de hule'],
    color: 'from-blue-500 to-cyan-600',
    icon: Users
  }
];

// --- Testimonios de Participantes ---
const testimoniosData = [
  {
    nombre: 'Doña Rosa Martínez',
    edad: 68,
    participacion: '35 años en tequios',
    testimonio: 'El tequio nos une como familia. Mis hijos y nietos aprenden el valor del trabajo colectivo. Es nuestro legado más valioso que heredamos de nuestros abuelos.',
    icon: Heart
  },
  {
    nombre: 'Juan Pérez',
    edad: 42,
    participacion: 'Líder de tequio de caminos',
    testimonio: 'Cada tequio fortalece nuestra comunidad. Vemos resultados tangibles y crecemos juntos como pueblo. La unión hace la fuerza.',
    icon: Award
  },
  {
    nombre: 'María González',
    edad: 28,
    participacion: 'Coordinadora de tequios juveniles',
    testimonio: 'Los jóvenes encontramos en el tequio una forma de contribuir y mantener vivas nuestras tradiciones. Es nuestro granito de arena para San Juan Tahitic.',
    icon: Users
  }
];

// --- Beneficios del Tequio ---
const beneficiosData = [
  {
    titulo: 'Unión Comunitaria',
    descripcion: 'Fortalece los lazos entre familias y generaciones, creando redes de apoyo sólidas',
    icon: Users,
    color: 'bg-emerald-100 text-emerald-700'
  },
  {
    titulo: 'Desarrollo Sostenible',
    descripcion: 'Proyectos que benefician a toda la comunidad a largo plazo, cuidando nuestro entorno',
    icon: TreePine,
    color: 'bg-green-100 text-green-700'
  },
  {
    titulo: 'Preservación Cultural',
    descripcion: 'Mantenemos vivas tradiciones ancestrales de trabajo colectivo y ayuda mutua',
    icon: Heart,
    color: 'bg-rose-100 text-rose-700'
  },
  {
    titulo: 'Autogestión',
    descripcion: 'Solucionamos nuestras necesidades sin depender de externos, con nuestros recursos',
    icon: Award,
    color: 'bg-amber-100 text-amber-700'
  }
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

interface TequioContentProps {
  onBack?: () => void;
}

// Componente del Carrusel
function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Cambia cada 5 segundos

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  return (
    <motion.div 
      className="relative h-96 sm:h-[500px] rounded-3xl overflow-hidden shadow-2xl mb-16"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Imagen Principal */}
      <motion.div
        key={currentIndex}
        className="absolute inset-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${carouselImages[currentIndex].url})` }}
        >
          {/* Overlay gradiente */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end">
            <div className="p-8 text-white w-full">
              <motion.h3 
                className="text-2xl sm:text-3xl font-bold mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {carouselImages[currentIndex].title}
              </motion.h3>
              <motion.p 
                className="text-lg text-emerald-100 max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {carouselImages[currentIndex].description}
              </motion.p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Botones de Navegación */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 group"
      >
        <ChevronLeft className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 group"
      >
        <ChevronRight className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
      </button>

      {/* Indicadores */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-emerald-400 scale-125' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Contador */}
      <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-sm text-white">
        {currentIndex + 1} / {carouselImages.length}
      </div>
    </motion.div>
  );
}

export function TequioContent({ onBack }: TequioContentProps) {
  return (
    <section className="w-full bg-gradient-to-b from-emerald-50 to-teal-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- Header --- */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Tequio: <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">Trabajo Colectivo</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            La tradición ancestral que fortalece nuestra comunidad de San Juan Tahitic
          </p>
        </motion.div>

        {/* --- Carrusel de Imágenes --- */}
        <ImageCarousel />

        {/* --- Hero Section Informativa --- */}
        <motion.div
          className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-8 md:p-12 text-white mb-16 shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Unidos por el Bien Común
              </h2>
              <p className="text-emerald-100 text-lg leading-relaxed mb-6">
                El tequio es el corazón de nuestra organización social en San Juan Tahitic. 
                Por generaciones, esta práctica de trabajo colectivo nos ha permitido construir 
                escuelas, mantener caminos, preservar manantiales y fortalecer los lazos que 
                nos definen como comunidad.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white/20 rounded-lg px-4 py-2 backdrop-blur-sm">
                  <span className="font-semibold">Tradición Ancestral</span>
                </div>
                <div className="bg-white/20 rounded-lg px-4 py-2 backdrop-blur-sm">
                  <span className="font-semibold">Solidaridad</span>
                </div>
                <div className="bg-white/20 rounded-lg px-4 py-2 backdrop-blur-sm">
                  <span className="font-semibold">Progreso Colectivo</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="bg-white/20 p-8 rounded-2xl backdrop-blur-sm">
                <Handshake className="h-24 w-24 text-white" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* --- Proyectos de Tequio --- */}
        <div className="mb-20">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Proyectos Comunitarios</h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Las obras que construimos juntos para el beneficio de toda la comunidad
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-600 mx-auto rounded-full mt-4"></div>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {proyectosData.map((proyecto, index) => (
              <motion.div
                key={proyecto.nombre}
                variants={cardVariants}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-emerald-100"
              >
                {/* Header con gradiente */}
                <div className={`bg-gradient-to-r ${proyecto.color} p-6 text-white`}>
                  <div className="flex items-center">
                    <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm mr-4">
                      <proyecto.icon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl">{proyecto.nombre}</h4>
                      <p className="text-emerald-100 text-sm mt-1">
                        {proyecto.frecuencia} • {proyecto.participantes} participantes
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-slate-700 leading-relaxed mb-4">
                    {proyecto.descripcion}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-emerald-50 rounded-lg p-3 text-center">
                      <div className="text-xl font-bold text-emerald-600">{proyecto.participantes}</div>
                      <div className="text-xs text-emerald-800">Participantes</div>
                    </div>
                    <div className="bg-teal-50 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-teal-600">{proyecto.frecuencia}</div>
                      <div className="text-xs text-teal-800">Frecuencia</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h5 className="font-semibold text-slate-800 mb-3 text-sm">Beneficios para la comunidad:</h5>
                    <div className="grid grid-cols-1 gap-2">
                      {proyecto.beneficios.map((beneficio, idx) => (
                        <div key={idx} className="flex items-center">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                          <span className="text-slate-700 text-sm">{beneficio}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-emerald-50 rounded-xl p-4">
                    <h5 className="font-semibold text-emerald-800 mb-2 text-sm">Herramientas utilizadas:</h5>
                    <div className="flex flex-wrap gap-2">
                      {proyecto.herramientas.map((herramienta, idx) => (
                        <span 
                          key={idx}
                          className="bg-white text-emerald-700 px-3 py-1 rounded-full text-sm border border-emerald-200"
                        >
                          {herramienta}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* --- Beneficios del Tequio --- */}
        <div className="mb-20">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-slate-900 mb-4">¿Por qué el Tequio nos Fortalece?</h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Los valores y beneficios que obtenemos a través del trabajo colectivo
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-600 mx-auto rounded-full mt-4"></div>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {beneficiosData.map((beneficio, index) => (
              <motion.div
                key={beneficio.titulo}
                variants={cardVariants}
                className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 border border-emerald-100"
              >
                <div className={`p-3 rounded-xl ${beneficio.color} inline-flex mb-4`}>
                  <beneficio.icon className="h-6 w-6" />
                </div>
                <h4 className="font-bold text-slate-800 text-lg mb-3">{beneficio.titulo}</h4>
                <p className="text-slate-600 text-sm leading-relaxed">{beneficio.descripcion}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* --- Testimonios --- */}
        <div className="mb-16">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Voces de Nuestra Comunidad</h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Lo que nuestros vecinos dicen sobre la experiencia del tequio
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-600 mx-auto rounded-full mt-4"></div>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {testimoniosData.map((testimonio, index) => (
              <motion.div
                key={testimonio.nombre}
                variants={cardVariants}
                className="bg-white rounded-2xl shadow-lg p-6 border border-emerald-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-emerald-100 p-3 rounded-xl mr-4">
                    <testimonio.icon className="h-6 w-6 text-emerald-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">{testimonio.nombre}</h4>
                    <p className="text-emerald-600 text-sm">{testimonio.edad} años • {testimonio.participacion}</p>
                  </div>
                </div>
                
                <p className="text-slate-600 italic leading-relaxed">
                  "{testimonio.testimonio}"
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* --- Sección Informativa Final --- */}
        <motion.div
          className="text-center bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-10 md:p-12 shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Handshake className="h-16 w-16 text-white mx-auto mb-4" />
          <h3 className="text-3xl font-bold text-white mb-4">El Tequio: Herencia Cultural Viva</h3>
          <p className="text-emerald-100 text-lg max-w-2xl mx-auto mb-6">
            En San Juan Tahitic, el tequio continúa siendo el pilar fundamental de nuestra organización comunitaria, 
            demostrando que el trabajo colectivo es la base del desarrollo sostenible y la preservación 
            de nuestras tradiciones ancestrales para las futuras generaciones.
          </p>
          <div className="bg-white/20 rounded-xl p-4 inline-flex backdrop-blur-sm">
            <span className="text-white font-semibold">San Juan Tahitic - Comunidad Organizada</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}