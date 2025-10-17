// src/sections/VocesDeNuestraTierra.tsx
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight,
  Quote,
  Heart,
  Sprout,
  Users,
  BookOpen,
  Music,
  Handshake,
  Star
} from 'lucide-react';
import { useState, useEffect } from 'react';

// --- Datos de Testimonios ---
const testimoniosData = [
  {
    id: 1,
    nombre: "Doña Rosa Mendoza",
    rol: "Artesana Textil",
    testimonio: "Mis manos no solo tejen hilos, tejen los sueños y las historias que mi abuela me contó. Cada color y cada forma llevan un pedazo de nuestra alma y la memoria de nuestro pueblo.",
    imagen: "/images/comunidad/testimonios/artesana.webp",
    icon: BookOpen,
    color: "from-teal-500 to-cyan-600",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-200",
    detalles: "35 años tejiendo tradición",
    tagline: "Guardiana de técnicas ancestrales"
  },
  {
    id: 2,
    nombre: "Don Javier Hernández",
    rol: "Agricultor",
    testimonio: "Esta tierra no es un recurso, es nuestra madre. Respetar sus ciclos no es una opción, es nuestro deber de agradecimiento y la única manera de heredarle un futuro fértil a nuestros hijos.",
    imagen: "/images/comunidad/testimonios/agricultor.webp",
    icon: Sprout,
    color: "from-blue-500 to-sky-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    detalles: "Cultivando maíz criollo por 40 años",
    tagline: "Custodio de la tierra y sus cultivos"
  },
  {
    id: 3,
    nombre: "Ana López",
    rol: "Joven Líder",
    testimonio: "Cargamos con el orgullo de nuestro pasado, pero nuestros pies caminan hacia el futuro. Nuestro sueño es tender un puente para que el mundo conozca nuestra cultura, pero de una forma que nos permita conservar quiénes somos.",
    imagen: "/images/comunidad/testimonios/lider.webp",
    icon: Users,
    color: "from-sky-500 to-blue-600",
    bgColor: "bg-sky-50",
    borderColor: "border-sky-200",
    detalles: "Promotora de turismo sostenible",
    tagline: "Constructor de puentes culturales"
  },
  {
    id: 4,
    nombre: "Maestro Carlos Ruiz",
    rol: "Músico Tradicional",
    testimonio: "Cada nota de nuestra música cuenta la historia de nuestras montañas y ríos. No solo tocamos instrumentos, mantenemos viva la voz de nuestros ancestros a través de las melodías que nos heredaron.",
    imagen: "/images/comunidad/testimonios/musico.webp",
    icon: Music,
    color: "from-cyan-500 to-teal-600",
    bgColor: "bg-cyan-50",
    borderColor: "border-cyan-200",
    detalles: "50 años preservando sonidos ancestrales",
    tagline: "Portador de la memoria sonora"
  },
  {
    id: 5,
    nombre: "Doña Elena Martínez",
    rol: "Cocinera Tradicional",
    testimonio: "En mi cocina, los sabores son cartas de amor a nuestra tierra. Cada platillo cuenta una historia de siembras, cosechas y las manos que hicieron posible este milagro diario.",
    imagen: "/images/comunidad/testimonios/cocinera.webp",
    icon: Heart,
    color: "from-teal-600 to-cyan-700",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-200",
    detalles: "Especialista en cocina de maíz",
    tagline: "Guardiana de los sabores ancestrales"
  },
  {
    id: 6,
    nombre: "Don Miguel Torres",
    rol: "Coordinador de Tequios",
    testimonio: "El tequio nos recuerda que somos más fuertes juntos. Cuando trabajamos hombro con hombro, no solo construimos caminos o escuelas, tejemos la confianza que nos hace una verdadera comunidad.",
    imagen: "/images/comunidad/testimonios/tequio.webp",
    icon: Handshake,
    color: "from-blue-600 to-sky-700",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    detalles: "30 años organizando trabajo comunitario",
    tagline: "Tejedor de solidaridad"
  },
  {
    id: 7,
    nombre: "Profesora Sofia Reyes",
    rol: "Educadora Comunitaria",
    testimonio: "Enseñar aquí no es solo transmitir conocimientos, es ayudar a nuestros niños a encontrar el equilibrio entre el orgullo de sus raíces y las oportunidades del mundo moderno.",
    imagen: "/images/comunidad/testimonios/educadora.webp",
    icon: Star,
    color: "from-sky-600 to-blue-700",
    bgColor: "bg-sky-50",
    borderColor: "border-sky-200",
    detalles: "25 años formando nuevas generaciones",
    tagline: "Guía entre tradición y futuro"
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
};

export function VocesDeNuestraTierra() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextTestimonio = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimoniosData.length);
  };

  const prevTestimonio = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimoniosData.length) % testimoniosData.length);
  };

  const goToTestimonio = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextTestimonio();
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const currentTestimonio = testimoniosData[currentIndex];

  return (
    <section id="voces" className="w-full bg-gradient-to-b from-slate-50 to-slate-100 py-12 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- Encabezado --- */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-4 sm:mb-6 shadow-lg"
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Quote className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="font-medium text-sm sm:text-base">Historias que Laten</span>
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 sm:mb-6 px-4">
            Las Voces de <span className="bg-gradient-to-r from-teal-500 to-cyan-600 bg-clip-text text-transparent">Nuestra Tierra</span>
          </h2>
          
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed px-4">
            Conoce a las personas que dan vida a San Juan Tahitic. Cada rostro cuenta una historia, 
            cada voz guarda una tradición, y cada corazón late al ritmo de nuestra comunidad.
          </p>
        </motion.div>

        {/* --- Carrusel de Testimonios - VERSIÓN MÓVIL CORREGIDA --- */}
        <div className="relative max-w-7xl mx-auto">
          {/* Contenedor Principal */}
          <div 
            className="relative bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl overflow-hidden min-h-[500px] sm:min-h-[600px]"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.10 }
                }}
                className="absolute inset-0"
              >
                {/* DISEÑO MÓVIL: Stack vertical */}
                <div className="flex flex-col lg:grid lg:grid-cols-2 min-h-[500px] sm:min-h-[600px]">
                  
                  {/* SECCIÓN DE IMAGEN - Móvil primero */}
                  <div className="relative h-64 sm:h-80 lg:h-full bg-gradient-to-br from-slate-900 to-black order-1">
                    {/* Imagen de fondo */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${currentTestimonio.imagen})` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent lg:bg-gradient-to-t lg:from-black/70 lg:via-black/40 lg:to-transparent"></div>
                    </div>
                    
                    <div className="relative h-full flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 text-white z-10">
                      {/* Imagen de perfil - Tamaño responsive */}
                      <div className="relative mb-4 sm:mb-6 lg:mb-8">
                        <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 p-1 sm:p-2 mx-auto shadow-xl">
                          <div 
                            className="w-full h-full rounded-full bg-cover bg-center border-2 sm:border-4 border-white shadow-inner"
                            style={{ backgroundImage: `url(${currentTestimonio.imagen})` }}
                          ></div>
                        </div>
                        
                        {/* Icono decorativo */}
                        <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 bg-gradient-to-r from-teal-500 to-cyan-600 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center shadow-lg border border-white">
                          <currentTestimonio.icon className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-white" />
                        </div>
                      </div>

                      {/* Información de la persona - Texto responsive */}
                      <div className="text-center">
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 text-white drop-shadow-lg">
                          {currentTestimonio.nombre}
                        </h3>
                        <div className="inline-flex items-center space-x-1 sm:space-x-2 bg-white/20 backdrop-blur-sm px-3 sm:px-4 py-1 sm:py-2 rounded-full mb-3 sm:mb-4 border border-white/30">
                          <currentTestimonio.icon className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span className="font-medium text-sm sm:text-base">{currentTestimonio.rol}</span>
                        </div>
                        <p className="text-teal-200 text-xs sm:text-sm max-w-xs drop-shadow hidden sm:block">
                          {currentTestimonio.detalles}
                        </p>
                      </div>

                      {/* Tagline - Solo en desktop */}
                      <div className="absolute bottom-4 lg:bottom-8 left-1/2 transform -translate-x-1/2 hidden lg:block">
                        <div className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg border border-white/20">
                          <span className="font-semibold text-xs sm:text-sm">{currentTestimonio.tagline}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SECCIÓN DE CONTENIDO - Móvil segundo */}
                  <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 lg:p-12 bg-gradient-to-br from-white to-slate-50 order-2">
                    <div className="max-w-md w-full">
                      {/* Icono de cita */}
                      <div className="mb-4 sm:mb-6 lg:mb-8">
                        <div className="bg-teal-100 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center shadow-sm">
                          <Quote className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-teal-600" />
                        </div>
                      </div>

                      {/* Testimonio - Texto responsive */}
                      <blockquote className="mb-4 sm:mb-6 lg:mb-8">
                        <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl leading-relaxed font-light text-slate-800 italic">
                          "{currentTestimonio.testimonio}"
                        </p>
                      </blockquote>

                      {/* Línea decorativa */}
                      <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full mb-4 sm:mb-6"></div>

                      {/* Detalles móviles - Solo en móvil */}
                      <div className="lg:hidden text-slate-600 mb-4">
                        <p className="text-sm font-medium text-teal-700">{currentTestimonio.detalles}</p>
                        <p className="text-xs mt-1">Miembro activo de San Juan Tahitic</p>
                      </div>

                      {/* Tagline móvil */}
                      <div className="lg:hidden bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-4 py-2 rounded-full text-center mb-4">
                        <span className="font-semibold text-sm">{currentTestimonio.tagline}</span>
                      </div>

                      {/* Indicadores de navegación móvil */}
                      <div className="flex lg:hidden justify-center space-x-2 mt-4">
                        {testimoniosData.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => goToTestimonio(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              index === currentIndex
                                ? 'bg-teal-500 w-6'
                                : 'bg-slate-300 hover:bg-slate-400'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controles de Navegación - Tamaño responsive */}
            <button
              onClick={prevTestimonio}
              className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-slate-700 hover:text-teal-600 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 backdrop-blur-sm z-10 border border-slate-200"
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
            </button>

            <button
              onClick={nextTestimonio}
              className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-slate-700 hover:text-teal-600 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 backdrop-blur-sm z-10 border border-slate-200"
            >
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
            </button>
          </div>

          {/* Indicadores de Progreso - Espaciado responsive */}
          <div className="flex justify-center space-x-2 sm:space-x-3 mt-6 sm:mt-8">
            {testimoniosData.map((testimonio, index) => (
              <button
                key={testimonio.id}
                onClick={() => goToTestimonio(index)}
                className="group flex flex-col items-center"
              >
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <div
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'bg-teal-500 scale-125'
                        : 'bg-slate-300 group-hover:bg-slate-400'
                    }`}
                  />
                  <span
                    className={`text-xs sm:text-sm font-medium transition-all duration-300 hidden sm:block ${
                      index === currentIndex
                        ? 'text-teal-600'
                        : 'text-slate-500 group-hover:text-slate-700'
                    }`}
                  >
                    {index + 1}
                  </span>
                </div>
                <div
                  className={`h-1 mt-1 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-4 sm:w-6 lg:w-8 bg-gradient-to-r from-teal-500 to-cyan-500'
                      : 'w-0 bg-transparent group-hover:w-2 sm:group-hover:w-3 group-hover:bg-slate-300'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* --- Mini Galería - Grid responsive --- */}
        <motion.div
          className="mt-12 sm:mt-16 lg:mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <h3 className="text-xl sm:text-2xl font-bold text-center text-slate-900 mb-8 sm:mb-12 px-4">
            Conoce a Más Miembros de Nuestra Comunidad
          </h3>
          
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-3 lg:gap-4 px-2 sm:px-0">
            {testimoniosData.map((testimonio, index) => (
              <motion.button
                key={testimonio.id}
                variants={itemVariants}
                onClick={() => goToTestimonio(index)}
                className={`group flex flex-col items-center p-2 sm:p-3 lg:p-4 rounded-xl sm:rounded-2xl transition-all duration-300 ${
                  index === currentIndex
                    ? `${testimonio.bgColor} border-2 ${testimonio.borderColor} shadow-md sm:shadow-lg`
                    : 'bg-white hover:bg-slate-50 border-2 border-transparent hover:border-slate-200'
                }`}
              >
                <div className="relative mb-2 sm:mb-3">
                  <div 
                    className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full bg-cover bg-center border border-white shadow-sm"
                    style={{ backgroundImage: `url(${testimonio.imagen})` }}
                  >
                    <div className="w-full h-full rounded-full bg-black/30 flex items-center justify-center">
                      <testimonio.icon className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                    </div>
                  </div>
                  {index === currentIndex && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 bg-teal-500 rounded-full border border-white shadow-sm"></div>
                  )}
                </div>
                <span className={`text-xs font-medium text-center leading-tight transition-colors ${
                  index === currentIndex ? 'text-teal-700' : 'text-slate-700 group-hover:text-teal-600'
                }`}>
                  {testimonio.nombre.split(' ')[0]}
                </span>
                <span className="text-[10px] sm:text-xs text-slate-500 text-center mt-1 hidden sm:block">
                  {testimonio.rol}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* --- Cierre Emotivo - Padding responsive --- */}
        <motion.div
          className="text-center mt-12 sm:mt-16 lg:mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-teal-200 mx-2 sm:mx-0">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4">
              Cada Voz Cuenta una Historia
            </h3>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
              Estas son solo algunas de las muchas voces que conforman el coro vibrante de San Juan Tahitic. 
              Cada persona, con su oficio y su pasión, contribuye al tejido único de nuestra comunidad.
            </p>
            <div className="mt-4 sm:mt-6 flex justify-center">
              <div className="w-12 sm:w-16 h-1 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}