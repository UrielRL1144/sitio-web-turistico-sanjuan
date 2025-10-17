// src/sections/EducacionContent.tsx
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { 
  School2, 
  BookOpen, 
  GraduationCap,
  Users,
  Calendar,
  MapPin,
  ArrowLeft,
  Lightbulb,
  Trophy,
  HeartHandshake
} from 'lucide-react';
import React from 'react';
import { useState } from 'react';

// --- Datos de Instituciones Educativas ---
const institucionesData = [
  {
    nombre: 'Jardín de Niños "María Montessori"',
    nivel: 'Preescolar',
    descripcion: 'Formación inicial con enfoque en desarrollo integral y valores comunitarios.',
    estudiantes: 45,
    docentes: 3,
    fundacion: 1985,
    programas: ['Educación inicial', 'Talleres para padres', 'Activación física'],
    color: 'from-cyan-500 to-blue-600',
    icon: BookOpen
  },
  {
    nombre: 'Primaria "Benito Juárez"',
    nivel: 'Primaria',
    descripcion: 'Educación básica que combina currículo oficial con saberes comunitarios.',
    estudiantes: 120,
    docentes: 8,
    fundacion: 1972,
    programas: ['Educación bilingüe', 'Huerto escolar', 'Taller de artes'],
    color: 'from-blue-500 to-indigo-600',
    icon: School2
  },
  {
    nombre: 'Telesecundaria "Netzahualcóyotl"',
    nivel: 'Secundaria',
    descripcion: 'Formación media con énfasis en tecnología y proyectos comunitarios.',
    estudiantes: 85,
    docentes: 6,
    fundacion: 1990,
    programas: ['Club de ciencias', 'Proyectos sustentables', 'Orientación vocacional'],
    color: 'from-indigo-500 to-purple-600',
    icon: GraduationCap
  },
  {
    nombre: 'Bachillerato Comunitario',
    nivel: 'Preparatoria',
    descripcion: 'Educación media superior con especialidades técnicas y vinculación social.',
    estudiantes: 60,
    docentes: 5,
    fundacion: 2010,
    programas: ['Turismo sustentable', 'Agroecología', 'Tecnologías de la información'],
    color: 'from-violet-500 to-purple-700',
    icon: Users
  }
];

// --- Programas Especiales ---
const programasData = [
  {
    nombre: 'Tutorías Comunitarias',
    descripcion: 'Estudiantes de niveles superiores apoyan a los más jóvenes en su proceso educativo.',
    beneficiarios: 'Todos los estudiantes',
    horario: 'Lunes a viernes 16:00-18:00',
    icon: HeartHandshake,
    color: 'bg-green-100 text-green-700'
  },
  {
    nombre: 'Talleres de Verano',
    descripcion: 'Programa intensivo de reforzamiento académico y actividades recreativas.',
    beneficiarios: 'Estudiantes de primaria y secundaria',
    horario: 'Julio - Agosto',
    icon: Lightbulb,
    color: 'bg-amber-100 text-amber-700'
  },
  {
    nombre: 'Olimpiadas del Conocimiento',
    descripcion: 'Competencia académica anual que promueve la excelencia educativa.',
    beneficiarios: 'Estudiantes destacados',
    horario: 'Noviembre',
    icon: Trophy,
    color: 'bg-blue-100 text-blue-700'
  }
];

// --- Logros y Reconocimientos ---
const logrosData = [
  {
    año: 2023,
    logro: 'Primer lugar estatal en Olimpiada de Matemáticas',
    estudiantes: 'María González, Carlos Ruiz',
    institucion: 'Primaria "Benito Juárez"',
    icon: Trophy
  },
  {
    año: 2022,
    logro: 'Certificación como Escuela Sustentable',
    estudiantes: 'Comunidad escolar completa',
    institucion: 'Telesecundaria "Netzahualcóyotl"',
    icon: School2
  },
  {
    año: 2021,
    logro: 'Premio al Mérito Académico Comunitario',
    estudiantes: 'Generación 2020-2021',
    institucion: 'Bachillerato Comunitario',
    icon: GraduationCap
  }
];

// --- Próximos Eventos Educativos ---
const eventosData = [
  {
    titulo: 'Feria de Ciencias 2024',
    fecha: '15 Noviembre 2024',
    descripcion: 'Exposición de proyectos científicos y tecnológicos desarrollados por estudiantes.',
    ubicacion: 'Patio Central de la Comunidad',
    participantes: 'Todos los niveles educativos',
    icon: Lightbulb,
    destacado: true
  },
  {
    titulo: 'Jornada de Puertas Abiertas',
    fecha: '25 Enero 2024',
    descripcion: 'Conoce nuestras instalaciones y proyectos educativos. Familias bienvenidas.',
    ubicacion: 'Todas las instituciones',
    participantes: 'Nuevas inscripciones',
    icon: Users,
    destacado: false
  },
  {
    titulo: 'Taller de Orientación Vocacional',
    fecha: '8 Marzo 2024',
    descripcion: 'Sesiones informativas sobre opciones de educación superior y carreras profesionales.',
    ubicacion: 'Bachillerato Comunitario',
    participantes: 'Estudiantes de secundaria y preparatoria',
    icon: GraduationCap,
    destacado: true
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

export function EducacionContent({ onBack }: EducacionContentProps) {
  const [activeInstitucion, setActiveInstitucion] = useState(0);

  return (
    <section className="w-full bg-gradient-to-b from-blue-50 to-indigo-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- Header con Navegación --- */}
        <motion.div
          className="flex items-center mb-12"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-blue-700 hover:text-blue-800 transition-colors mr-6"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Volver</span>
            </button>
          )}
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900">
              Educación y <span className="bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">Futuro</span>
            </h1>
            <p className="text-lg text-slate-600 mt-2 max-w-3xl">
              Invertimos en las nuevas generaciones para construir un futuro prometedor sin perder nuestras raíces
            </p>
          </div>
        </motion.div>

        {/* --- Hero Section --- */}
        <motion.div
          className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl p-8 md:p-12 text-white mb-16 shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Formando Líderes del Mañana
              </h2>
              <p className="text-blue-100 text-lg leading-relaxed mb-6">
                En San Juan Tahitic, la educación es el puente entre nuestra herencia cultural 
                y las oportunidades del futuro. Nuestras escuelas son espacios donde el conocimiento 
                se construye colectivamente.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white/20 rounded-lg px-4 py-2 backdrop-blur-sm">
                  <span className="font-semibold">Educación Integral</span>
                </div>
                <div className="bg-white/20 rounded-lg px-4 py-2 backdrop-blur-sm">
                  <span className="font-semibold">Raíces Comunitarias</span>
                </div>
                <div className="bg-white/20 rounded-lg px-4 py-2 backdrop-blur-sm">
                  <span className="font-semibold">Innovación Educativa</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="bg-white/20 p-8 rounded-2xl backdrop-blur-sm">
                <GraduationCap className="h-24 w-24 text-white" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* --- Instituciones Educativas --- */}
        <div className="mb-20">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Nuestras Instituciones</h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Una trayectoria educativa completa desde la primera infancia hasta la educación media superior
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full mt-4"></div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Navegación de Instituciones */}
            <div className="space-y-4">
              {institucionesData.map((institucion, index) => (
                <motion.button
                  key={institucion.nombre}
                  onClick={() => setActiveInstitucion(index)}
                  className={`w-full text-left p-6 rounded-2xl transition-all duration-300 ${
                    activeInstitucion === index
                      ? 'bg-white shadow-xl border-2 border-blue-200'
                      : 'bg-blue-100 hover:bg-blue-200'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${institucion.color} mr-4`}>
                      <institucion.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-lg">{institucion.nombre}</h4>
                      <p className="text-blue-600 text-sm font-medium mt-1">{institucion.nivel}</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Detalle de la Institución */}
            <motion.div
              key={activeInstitucion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <div className="flex items-center mb-6">
                <div className={`p-4 rounded-xl bg-gradient-to-r ${institucionesData[activeInstitucion].color} mr-4`}>
                  {React.createElement(institucionesData[activeInstitucion].icon, { className: 'h-8 w-8 text-white' })}
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-slate-900">{institucionesData[activeInstitucion].nombre}</h4>
                  <p className="text-blue-600 font-medium">
                    {institucionesData[activeInstitucion].nivel} • Fundada en {institucionesData[activeInstitucion].fundacion}
                  </p>
                </div>
              </div>
              
              <p className="text-slate-700 text-lg leading-relaxed mb-6">
                {institucionesData[activeInstitucion].descripcion}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">{institucionesData[activeInstitucion].estudiantes}</div>
                  <div className="text-sm text-blue-800">Estudiantes</div>
                </div>
                <div className="bg-indigo-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-indigo-600">{institucionesData[activeInstitucion].docentes}</div>
                  <div className="text-sm text-indigo-800">Docentes</div>
                </div>
              </div>
              
              <div className="mb-6">
                <h5 className="font-semibold text-slate-800 mb-3">Programas destacados:</h5>
                <div className="flex flex-wrap gap-2">
                  {institucionesData[activeInstitucion].programas.map((programa, idx) => (
                    <span 
                      key={idx}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {programa}
                    </span>
                  ))}
                </div>
              </div>

              <button className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors">
                Solicitar información
              </button>
            </motion.div>
          </div>
        </div>

        {/* --- Programas Especiales --- */}
        <div className="mb-20">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Programas Complementarios</h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Iniciativas que enriquecen la formación académica y fortalecen nuestra comunidad
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full mt-4"></div>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {programasData.map((programa, index) => (
              <motion.div
                key={programa.nombre}
                variants={cardVariants}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="bg-gradient-to-r from-blue-400 to-indigo-500 p-6 text-white">
                  <div className="flex items-center">
                    <programa.icon className="h-8 w-8 mr-3" />
                    <h4 className="text-xl font-bold">{programa.nombre}</h4>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-slate-700 mb-4 leading-relaxed">{programa.descripcion}</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center text-slate-600">
                      <Users className="h-4 w-4 mr-2" />
                      <span className="text-sm">{programa.beneficiarios}</span>
                    </div>
                    <div className="flex items-center text-slate-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="text-sm">{programa.horario}</span>
                    </div>
                  </div>
                  
                  <button className="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors">
                    Más información
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* --- Logros y Reconocimientos --- */}
        <div className="mb-20">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Logros Destacados</h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              El talento y dedicación de nuestros estudiantes y docentes nos llena de orgullo
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
            {logrosData.map((logro, index) => (
              <motion.div
                key={logro.año}
                variants={cardVariants}
                className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start mb-4">
                  <div className="bg-blue-100 p-3 rounded-xl mr-4">
                    <logro.icon className="h-6 w-6 text-blue-700" />
                  </div>
                  <div>
                    <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold inline-block mb-2">
                      {logro.año}
                    </div>
                    <h4 className="font-bold text-slate-800 text-lg">{logro.logro}</h4>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex items-center">
                    <GraduationCap className="h-4 w-4 mr-2" />
                    <span>{logro.estudiantes}</span>
                  </div>
                  <div className="flex items-center">
                    <School2 className="h-4 w-4 mr-2" />
                    <span>{logro.institucion}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* --- Próximos Eventos Educativos --- */}
        <div className="mb-16">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Próximos Eventos</h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Participa en las actividades que enriquecen nuestra vida educativa
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
            {eventosData.map((evento, index) => (
              <motion.div
                key={evento.titulo}
                variants={cardVariants}
                className={`bg-white rounded-2xl shadow-lg p-6 border hover:shadow-xl transition-all duration-300 ${
                  evento.destacado ? 'border-blue-300 border-2' : 'border-blue-100'
                }`}
              >
                {evento.destacado && (
                  <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold inline-block mb-4">
                    EVENTO DESTACADO
                  </div>
                )}
                
                <div className="flex items-start mb-4">
                  <div className="bg-blue-100 p-3 rounded-xl mr-4">
                    <evento.icon className="h-6 w-6 text-blue-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-lg">{evento.titulo}</h4>
                    <p className="text-blue-600 text-sm font-medium mt-1">{evento.fecha}</p>
                  </div>
                </div>
                
                <p className="text-slate-600 mb-4">{evento.descripcion}</p>
                
                <div className="space-y-2 text-sm text-slate-500 mb-4">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{evento.ubicacion}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{evento.participantes}</span>
                  </div>
                </div>
                
                <button className="w-full bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors">
                  Confirmar participación
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* --- Llamada a la Acción --- */}
        <motion.div
          className="text-center bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl p-10 md:p-12 shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-white mb-4">¿Te interesa nuestra propuesta educativa?</h3>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-6">
            Únete a nuestra comunidad educativa. Contamos con programas de intercambio, 
            voluntariado y colaboración para enriquecer la experiencia de aprendizaje.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors shadow-lg">
              Proceso de Inscripción
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white/10 transition-colors">
              Ser Voluntario
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}