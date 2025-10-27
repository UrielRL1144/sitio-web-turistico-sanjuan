// src/sections/EducacionContent.tsx
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { 
  School2, 
  BookOpen, 
  GraduationCap,
  Users,
  Lightbulb,
  Trophy,
  HeartHandshake,
  ChevronLeft,
  ChevronRight,
  Brain,
  Sparkles,
  Target,
  Rocket
} from 'lucide-react';
import React, { useState, useEffect } from 'react';

// --- Imágenes del Carrusel Educativo ---
const carouselImages = [
  {
    url: '/images/educacion-1.jpg',
    title: 'Aprendizaje Comunitario',
    description: 'Estudiantes desarrollando proyectos que benefician a toda la comunidad'
  },
  {
    url: '/images/educacion-2.jpg',
    title: 'Instalaciones Educativas',
    description: 'Espacios diseñados para el aprendizaje integral y el desarrollo humano'
  },
  {
    url: '/images/educacion-3.jpg',
    title: 'Actividades Prácticas',
    description: 'Educación que combina teoría y práctica en entornos reales'
  },
  {
    url: '/images/educacion-4.jpg',
    title: 'Celebraciones Académicas',
    description: 'Reconocimiento al esfuerzo y logros de nuestros estudiantes'
  },
  {
    url: '/images/educacion-5.jpg',
    title: 'Tecnología Educativa',
    description: 'Integrando herramientas modernas con métodos tradicionales'
  }
];

// --- Datos de Instituciones Educativas ---
const institucionesData = [
  {
    nombre: 'Jardín de Niños "María Montessori"',
    nivel: 'Preescolar',
    descripcion: 'Formación inicial con enfoque en desarrollo integral y valores comunitarios, donde los niños aprenden a través del juego y la exploración guiada.',
    estudiantes: 45,
    docentes: 3,
    fundacion: 1985,
    programas: ['Educación inicial', 'Talleres para padres', 'Activación física', 'Estimulación temprana'],
    color: 'from-cyan-500 to-blue-600',
    icon: BookOpen,
    enfoque: 'Desarrollo integral temprano',
    lema: 'Aprendiendo jugando, creciendo soñando'
  },
  {
    nombre: 'Primaria "Benito Juárez"',
    nivel: 'Primaria',
    descripcion: 'Educación básica que combina currículo oficial con saberes comunitarios, fomentando el pensamiento crítico y la identidad cultural.',
    estudiantes: 120,
    docentes: 8,
    fundacion: 1972,
    programas: ['Educación bilingüe', 'Huerto escolar', 'Taller de artes', 'Robótica básica'],
    color: 'from-blue-500 to-indigo-600',
    icon: School2,
    enfoque: 'Formación básica integral',
    lema: 'Saber para transformar'
  },
  {
    nombre: 'Telesecundaria "Netzahualcóyotl"',
    nivel: 'Secundaria',
    descripcion: 'Formación media con énfasis en tecnología y proyectos comunitarios, preparando a los jóvenes para los desafíos del mundo actual.',
    estudiantes: 85,
    docentes: 6,
    fundacion: 1990,
    programas: ['Club de ciencias', 'Proyectos sustentables', 'Orientación vocacional', 'Programación'],
    color: 'from-indigo-500 to-purple-600',
    icon: GraduationCap,
    enfoque: 'Educación tecnológica aplicada',
    lema: 'Innovando desde nuestras raíces'
  },
  {
    nombre: 'Bachillerato Comunitario',
    nivel: 'Preparatoria',
    descripcion: 'Educación media superior con especialidades técnicas y vinculación social, formando líderes comprometidos con su comunidad.',
    estudiantes: 60,
    docentes: 5,
    fundacion: 2010,
    programas: ['Turismo sustentable', 'Agroecología', 'Tecnologías de la información', 'Emprendimiento'],
    color: 'from-violet-500 to-purple-700',
    icon: Users,
    enfoque: 'Formación técnica y profesional',
    lema: 'Liderando con conciencia social'
  }
];

// --- Pilares Educativos ---
const pilaresData = [
  {
    titulo: 'Excelencia Académica',
    descripcion: 'Búsqueda constante del conocimiento y desarrollo de competencias de alto nivel',
    icon: Target,
    color: 'from-blue-500 to-cyan-500',
    metricas: ['95% de aprobación', '+20 premios académicos', 'Becas universitarias']
  },
  {
    titulo: 'Identidad Cultural',
    descripcion: 'Fortalecimiento de nuestra herencia y valores comunitarios en cada estudiante',
    icon: HeartHandshake,
    color: 'from-purple-500 to-pink-500',
    metricas: ['Talleres culturales', 'Lengua originaria', 'Tradiciones vivas']
  },
  {
    titulo: 'Innovación Tecnológica',
    descripcion: 'Integración de herramientas digitales con métodos pedagógicos avanzados',
    icon: Rocket,
    color: 'from-green-500 to-emerald-500',
    metricas: ['Aula digital', 'Programación', 'Proyectos STEAM']
  },
  {
    titulo: 'Sustentabilidad',
    descripcion: 'Educación ambiental y prácticas sostenibles como eje transversal',
    icon: Sparkles,
    color: 'from-amber-500 to-orange-500',
    metricas: ['Huertos escolares', 'Reciclaje', 'Energías limpias']
  }
];

// --- Trayectorias de Éxito ---
const trayectoriasData = [
  {
    nombre: 'Dra. Ana Martínez',
    logro: 'Médica Cirujana',
    trayectoria: 'Egresada de Primaria Benito Juárez, hoy especialista en salud comunitaria',
    institucion: 'Primaria "Benito Juárez"',
    icon: GraduationCap,
    año: 'Generación 2005',
    impacto: 'Fundadora del programa de salud rural en la comunidad'
  },
  {
    nombre: 'Ing. Carlos Mendoza',
    logro: 'Ingeniero en Biotecnología',
    trayectoria: 'De la Telesecundaria a investigador en agricultura sustentable',
    institucion: 'Telesecundaria "Netzahualcóyotl"',
    icon: School2,
    año: 'Generación 2008',
    impacto: 'Desarrollo de técnicas de cultivo orgánico para la región'
  },
  {
    nombre: 'Lic. Sofia Torres',
    logro: 'Abogada en Derecho Indígena',
    trayectoria: 'Primera generación del Bachillerato en estudiar derecho',
    institucion: 'Bachillerato Comunitario',
    icon: Users,
    año: 'Generación 2015',
    impacto: 'Defensora de los derechos territoriales comunitarios'
  }
];

// --- Logros Colectivos ---
const logrosColectivosData = [
  {
    año: '2020-2024',
    logro: 'Certificación como Comunidad de Aprendizaje',
    descripcion: 'Reconocimiento nacional por nuestro modelo educativo comunitario integral',
    participantes: 'Toda la comunidad educativa',
    icon: Trophy,
    impacto: 'Modelo replicado en 5 comunidades vecinas'
  },
  {
    año: '2018-2023',
    logro: 'Programa de Intercambio Académico',
    descripcion: 'Establecimiento de alianzas con universidades nacionales e internacionales',
    participantes: 'Estudiantes de bachillerato',
    icon: Lightbulb,
    impacto: '15 estudiantes en programas de intercambio'
  },
  {
    año: '2015-2024',
    logro: 'Infraestructura Educativa Sustentable',
    descripcion: 'Transformación de espacios educativos con energías renovables y diseño bioclimático',
    participantes: 'Comunidad completa',
    icon: Sparkles,
    impacto: '3 edificios educativos renovados'
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

interface EducacionContentProps {
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

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

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
                className="text-lg text-blue-100 max-w-2xl"
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

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-blue-400 scale-125' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-sm text-white">
        {currentIndex + 1} / {carouselImages.length}
      </div>
    </motion.div>
  );
}

export function EducacionContent({ onBack }: EducacionContentProps) {
  return (
    <section className="w-full bg-gradient-to-b from-blue-50 to-indigo-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- Header con Diseño de Libro Abierto --- */}
        <motion.div
          className="text-center mb-8 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative inline-flex items-center justify-center mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full blur-xl opacity-20 animate-pulse"></div>
            <div className="relative bg-white rounded-2xl p-6 shadow-lg border border-blue-200">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 rounded-xl">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <div className="text-left">
                  <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
                    Educación <span className="bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">Transformadora</span>
                  </h1>
                  <p className="text-slate-600 text-sm mt-1">
                    Donde el conocimiento encuentra propósito comunitario
                  </p>
                </div>
              </div>
            </div>
          </div>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto mt-4">
            Invertimos en las nuevas generaciones para construir un futuro prometedor sin perder nuestras raíces
          </p>
        </motion.div>

        {/* --- Carrusel de Imágenes --- */}
        <ImageCarousel />

        {/* --- Hero Section con Diseño de Escalera Académica --- */}
        <motion.div
          className="relative bg-white rounded-3xl p-8 md:p-12 mb-16 shadow-2xl border border-blue-100 overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/5 rounded-full -translate-x-16 -translate-y-16"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-indigo-500/5 rounded-full translate-x-20 translate-y-20"></div>
          
          <div className="relative grid lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <div className="flex items-center mb-6">
                <Brain className="h-10 w-10 text-blue-600 mr-4" />
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                  Construyendo Futuros con <span className="bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">Propósito</span>
                </h2>
              </div>
              <p className="text-slate-700 text-lg leading-relaxed mb-6">
                En San Juan Tahitic, la educación es el motor que impulsa nuestro desarrollo comunitario. 
                Integramos saberes ancestrales con innovación educativa, formando ciudadanos críticos, 
                creativos y comprometidos con el bienestar colectivo.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">310+</div>
                  <div className="text-sm text-slate-600">Estudiantes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600">22</div>
                  <div className="text-sm text-slate-600">Docentes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">4</div>
                  <div className="text-sm text-slate-600">Instituciones</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600">49</div>
                  <div className="text-sm text-slate-600">Años de tradición</div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-8 rounded-2xl text-white shadow-xl transform rotate-3">
                  <GraduationCap className="h-16 w-16 text-white" />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-xl shadow-lg border border-blue-200 transform -rotate-6">
                  <Sparkles className="h-8 w-8 text-blue-600" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* --- Pilares Educativos en Diseño de Diamante --- */}
        <div className="mb-20">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Pilares de Nuestra Educación</h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Los fundamentos que guían nuestro proyecto educativo comunitario
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full mt-4"></div>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {pilaresData.map((pilar, index) => (
              <motion.div
                key={pilar.titulo}
                variants={cardVariants}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-blue-100 group hover:scale-105"
              >
                <div className={`bg-gradient-to-r ${pilar.color} p-4 rounded-xl inline-flex mb-4 group-hover:scale-110 transition-transform`}>
                  <pilar.icon className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-bold text-slate-800 text-lg mb-3">{pilar.titulo}</h4>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">{pilar.descripcion}</p>
                <div className="space-y-2">
                  {pilar.metricas.map((metrica, idx) => (
                    <div key={idx} className="flex items-center text-slate-500 text-xs">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                      {metrica}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* --- Trayectoria Educativa en Diseño de Línea de Tiempo Vertical --- */}
        <div className="mb-20">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Nuestra Trayectoria Educativa</h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Un camino de aprendizaje continuo desde la primera infancia hasta la educación superior
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full mt-4"></div>
          </motion.div>

          <div className="relative">
            {/* Línea central */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-500 to-indigo-600 h-full rounded-full"></div>
            
            <div className="space-y-8">
              {institucionesData.map((institucion, index) => (
                <motion.div
                  key={institucion.nombre}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  {/* Contenido */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition-all duration-300">
                      <div className="flex items-center mb-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${institucion.color} mr-4`}>
                          <institucion.icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-slate-800 text-lg">{institucion.nombre}</h4>
                          <p className="text-blue-600 text-sm">{institucion.nivel}</p>
                        </div>
                      </div>
                      <p className="text-slate-600 text-sm mb-3">{institucion.descripcion}</p>
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>{institucion.estudiantes} estudiantes</span>
                        <span>Fundada {institucion.fundacion}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Punto en la línea */}
                  <div className="w-2/12 flex justify-center">
                    <div className={`w-6 h-6 rounded-full border-4 border-white bg-gradient-to-r ${institucion.color} shadow-lg z-10`}></div>
                  </div>
                  
                  {/* Información adicional */}
                  <div className="w-5/12">
                    <div className={`bg-blue-50 rounded-xl p-4 ${index % 2 === 0 ? 'text-left' : 'text-right'}`}>
                      <p className="text-blue-800 text-sm font-medium mb-2">{institucion.enfoque}</p>
                      <p className="text-blue-600 text-xs italic">"{institucion.lema}"</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* --- Trayectorias de Éxito en Diseño de Perfiles --- */}
        <div className="mb-20">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Historias de Éxito</h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Nuestros egresados son el mejor testimonio de la calidad educativa
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full mt-4"></div>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {trayectoriasData.map((trayectoria, index) => (
              <motion.div
                key={trayectoria.nombre}
                variants={cardVariants}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-blue-100 group"
              >
                <div className="bg-gradient-to-r from-blue-400 to-indigo-500 p-6 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <trayectoria.icon className="h-8 w-8 text-white" />
                      <span className="bg-white/20 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium">
                        {trayectoria.año}
                      </span>
                    </div>
                    <h4 className="font-bold text-xl mb-1">{trayectoria.nombre}</h4>
                    <p className="text-blue-100 text-sm">{trayectoria.logro}</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-slate-700 mb-4 leading-relaxed text-sm">
                    {trayectoria.trayectoria}
                  </p>
                  
                  <div className="space-y-2 text-sm text-slate-600 mb-4">
                    <div className="flex items-center">
                      <School2 className="h-4 w-4 mr-2 text-blue-500" />
                      <span>{trayectoria.institucion}</span>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-blue-700 text-sm text-center">
                      <strong>Impacto:</strong> {trayectoria.impacto}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* --- Logros Colectivos en Diseño de Medallas --- */}
        <div className="mb-16">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Logros Colectivos</h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Reconocimientos que reflejan el trabajo en equipo de toda nuestra comunidad educativa
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full mt-4"></div>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {logrosColectivosData.map((logro, index) => (
              <motion.div
                key={logro.año}
                variants={cardVariants}
                className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition-all duration-300 text-center group"
              >
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <logro.icon className="h-8 w-8 text-white" />
                </div>
                
                <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold inline-block mb-3">
                  {logro.año}
                </div>
                
                <h4 className="font-bold text-slate-800 text-lg mb-3">{logro.logro}</h4>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">{logro.descripcion}</p>
                
                <div className="space-y-2 text-xs text-slate-500">
                  <div className="flex items-center justify-center">
                    <Users className="h-3 w-3 mr-1" />
                    <span>{logro.participantes}</span>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-2">
                    <span className="text-blue-700 font-medium">{logro.impacto}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* --- Sección Final con Diseño de Diploma --- */}
        <motion.div
          className="text-center bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl p-10 md:p-12 shadow-2xl relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full -translate-x-20 -translate-y-20"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-16 translate-y-16"></div>
          
          <div className="relative">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 inline-flex mb-6">
              <GraduationCap className="h-12 w-12 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">Educación que Transforma Vidas</h3>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-6">
              En San Juan Tahitic, cada aula es un espacio de esperanza, cada lección un puente hacia el futuro, 
              y cada estudiante una semilla de cambio para nuestra comunidad y el mundo.
            </p>
            <div className="bg-white/20 rounded-xl p-4 inline-flex backdrop-blur-sm">
              <span className="text-white font-semibold">San Juan Tahitic - Donde el Aprendizaje Crea Futuros</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}