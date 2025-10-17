// src/sections/TequioContent.tsx
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { 
  Handshake, 
  Users, 
  Calendar,
  MapPin,
  ArrowLeft,
  Hammer,
  TreePine,
  Wrench,
  Heart,
  Clock,
  Award
} from 'lucide-react';
import React from 'react';
import { useState } from 'react';

// --- Datos de Proyectos de Tequio ---
const proyectosData = [
  {
    nombre: 'Mantenimiento de Caminos Rurales',
    descripcion: 'Reparación y limpieza de los caminos que conectan nuestras comunidades y parcelas.',
    participantes: 50,
    frecuencia: 'Mensual',
    ultimaRealizacion: 'Octubre 2024',
    beneficios: ['Mejor acceso a comunidades', 'Transporte seguro', 'Comunicación fluida'],
    herramientas: ['Palas', 'Carretillas', 'Rastrillos'],
    color: 'from-emerald-500 to-teal-600',
    icon: Hammer
  },
  {
    nombre: 'Reforestación Comunitaria',
    descripcion: 'Siembra de árboles nativos en áreas degradadas para preservar nuestros recursos naturales.',
    participantes: 35,
    frecuencia: 'Trimestral',
    ultimaRealizacion: 'Septiembre 2024',
    beneficios: ['Conservación de suelos', 'Agua limpia', 'Biodiversidad'],
    herramientas: ['Barras', 'Machetes', 'Plantas nativas'],
    color: 'from-green-500 to-emerald-600',
    icon: TreePine
  },
  {
    nombre: 'Mantenimiento de Escuelas',
    descripcion: 'Reparación y mejora de infraestructura educativa para mejores condiciones de aprendizaje.',
    participantes: 40,
    frecuencia: 'Bimestral',
    ultimaRealizacion: 'Agosto 2024',
    beneficios: ['Espacios dignos', 'Seguridad escolar', 'Ambiente propicio'],
    herramientas: ['Pintura', 'Herramientas de carpintería', 'Materiales'],
    color: 'from-cyan-500 to-blue-600',
    icon: Wrench
  },
  {
    nombre: 'Limpieza de Manantiales',
    descripcion: 'Preservación de nuestras fuentes de agua mediante limpieza y mantenimiento.',
    participantes: 25,
    frecuencia: 'Semestral',
    ultimaRealizacion: 'Julio 2024',
    beneficios: ['Agua potable', 'Salud comunitaria', 'Tradición ancestral'],
    herramientas: ['Guantes', 'Rastrillos', 'Bolsas de recolección'],
    color: 'from-blue-500 to-cyan-600',
    icon: Users
  }
];

// --- Próximas Jornadas de Tequio ---
const jornadasData = [
  {
    titulo: 'Tequio: Reparación de Centro de Salud',
    fecha: '18 Noviembre 2024',
    hora: '08:00 - 14:00',
    descripcion: 'Mejora de instalaciones del centro de salud para mejor atención médica comunitaria.',
    ubicacion: 'Centro de Salud Comunitario',
    participantesRequeridos: 30,
    materialesNecesarios: ['Pintura', 'Cemento', 'Herramientas básicas'],
    icon: Hammer,
    destacado: true
  },
  {
    titulo: 'Tequio: Limpieza de Áreas Comunes',
    fecha: '2 Diciembre 2024',
    hora: '07:00 - 12:00',
    descripcion: 'Limpieza general de plazas, calles y espacios públicos de la comunidad.',
    ubicacion: 'Plaza Principal y alrededores',
    participantesRequeridos: 40,
    materialesNecesarios: ['Escobas', 'Rastrillos', 'Bolsas de basura'],
    icon: Users,
    destacado: false
  },
  {
    titulo: 'Tequio: Construcción de Vivero Comunitario',
    fecha: '15 Enero 2024',
    hora: '08:00 - 16:00',
    descripcion: 'Construcción de vivero para producción de plantas medicinales y ornamentales.',
    ubicacion: 'Terreno comunitario junto al río',
    participantesRequeridos: 25,
    materialesNecesarios: ['Madera', 'Malla sombra', 'Herramientas de construcción'],
    icon: TreePine,
    destacado: true
  }
];

// --- Testimonios de Participantes ---
const testimoniosData = [
  {
    nombre: 'Doña Rosa Martínez',
    edad: 68,
    participacion: '35 años en tequios',
    testimonio: 'El tequio nos une como familia. Mis hijos y nietos aprenden el valor del trabajo colectivo. Es nuestro legado más valioso.',
    icon: Heart
  },
  {
    nombre: 'Juan Pérez',
    edad: 42,
    participacion: 'Líder de tequio de caminos',
    testimonio: 'Cada tequio fortalece nuestra comunidad. Vemos resultados tangibles y crecemos juntos como pueblo.',
    icon: Award
  },
  {
    nombre: 'María González',
    edad: 28,
    participacion: 'Coordinadora de tequios juveniles',
    testimonio: 'Los jóvenes encontramos en el tequio una forma de contribuir y mantener vivas nuestras tradiciones.',
    icon: Users
  }
];

// --- Beneficios del Tequio ---
const beneficiosData = [
  {
    titulo: 'Unión Comunitaria',
    descripcion: 'Fortalece los lazos entre familias y generaciones',
    icon: Users,
    color: 'bg-emerald-100 text-emerald-700'
  },
  {
    titulo: 'Desarrollo Sostenible',
    descripcion: 'Proyectos que benefician a toda la comunidad a largo plazo',
    icon: TreePine,
    color: 'bg-green-100 text-green-700'
  },
  {
    titulo: 'Preservación Cultural',
    descripcion: 'Mantenemos vivas tradiciones ancestrales de trabajo colectivo',
    icon: Heart,
    color: 'bg-rose-100 text-rose-700'
  },
  {
    titulo: 'Autogestión',
    descripcion: 'Solucionamos nuestras necesidades sin depender de externos',
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

export function TequioContent({ onBack }: TequioContentProps) {
  const [activeProyecto, setActiveProyecto] = useState(0);

  return (
    <section className="w-full bg-gradient-to-b from-emerald-50 to-teal-50 py-16 sm:py-24">
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
              className="flex items-center space-x-2 text-emerald-700 hover:text-emerald-800 transition-colors mr-6"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Volver</span>
            </button>
          )}
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900">
              Trabajo Colectivo <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">(Tequio)</span>
            </h1>
            <p className="text-lg text-slate-600 mt-2 max-w-3xl">
              La faena comunitaria que construye y mantiene el bienestar de todos, generación tras generación
            </p>
          </div>
        </motion.div>

        {/* --- Hero Section --- */}
        <motion.div
          className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-8 md:p-12 text-white mb-16 shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Unidos por el Bien Común
              </h2>
              <p className="text-emerald-100 text-lg leading-relaxed mb-6">
                El tequio es más que trabajo comunitario: es el corazón de nuestra organización social. 
                Por generaciones, esta práctica ha permitido construir escuelas, caminos, y mantener 
                la unidad que nos define como comunidad.
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

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Navegación de Proyectos */}
            <div className="space-y-4">
              {proyectosData.map((proyecto, index) => (
                <motion.button
                  key={proyecto.nombre}
                  onClick={() => setActiveProyecto(index)}
                  className={`w-full text-left p-6 rounded-2xl transition-all duration-300 ${
                    activeProyecto === index
                      ? 'bg-white shadow-xl border-2 border-emerald-200'
                      : 'bg-emerald-100 hover:bg-emerald-200'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${proyecto.color} mr-4`}>
                      <proyecto.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-lg">{proyecto.nombre}</h4>
                      <p className="text-emerald-600 text-sm font-medium mt-1">
                        {proyecto.frecuencia} • {proyecto.participantes} participantes
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Detalle del Proyecto */}
            <motion.div
              key={activeProyecto}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <div className="flex items-center mb-6">
                <div className={`p-4 rounded-xl bg-gradient-to-r ${proyectosData[activeProyecto].color} mr-4`}>
                  {React.createElement(proyectosData[activeProyecto].icon, { className: 'h-8 w-8 text-white' })}
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-slate-900">{proyectosData[activeProyecto].nombre}</h4>
                  <p className="text-emerald-600 font-medium">
                    {proyectosData[activeProyecto].frecuencia} • Último: {proyectosData[activeProyecto].ultimaRealizacion}
                  </p>
                </div>
              </div>
              
              <p className="text-slate-700 text-lg leading-relaxed mb-6">
                {proyectosData[activeProyecto].descripcion}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-emerald-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-emerald-600">{proyectosData[activeProyecto].participantes}</div>
                  <div className="text-sm text-emerald-800">Participantes promedio</div>
                </div>
                <div className="bg-teal-50 rounded-lg p-4 text-center">
                  <div className="text-xl font-bold text-teal-600">{proyectosData[activeProyecto].frecuencia}</div>
                  <div className="text-sm text-teal-800">Frecuencia</div>
                </div>
              </div>

              <div className="mb-6">
                <h5 className="font-semibold text-slate-800 mb-3">Beneficios para la comunidad:</h5>
                <div className="grid grid-cols-1 gap-2">
                  {proyectosData[activeProyecto].beneficios.map((beneficio, idx) => (
                    <div key={idx} className="flex items-center">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                      <span className="text-slate-700">{beneficio}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-emerald-50 rounded-xl p-4">
                <h5 className="font-semibold text-emerald-800 mb-2">Herramientas utilizadas:</h5>
                <div className="flex flex-wrap gap-2">
                  {proyectosData[activeProyecto].herramientas.map((herramienta, idx) => (
                    <span 
                      key={idx}
                      className="bg-white text-emerald-700 px-3 py-1 rounded-full text-sm border border-emerald-200"
                    >
                      {herramienta}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
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
                className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300"
              >
                <div className={`p-3 rounded-xl ${beneficio.color} inline-flex mb-4`}>
                  <beneficio.icon className="h-6 w-6" />
                </div>
                <h4 className="font-bold text-slate-800 text-lg mb-2">{beneficio.titulo}</h4>
                <p className="text-slate-600 text-sm leading-relaxed">{beneficio.descripcion}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* --- Próximas Jornadas --- */}
        <div className="mb-20">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Próximas Jornadas de Tequio</h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Únete a las próximas faenas comunitarias. Tu participación hace la diferencia.
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
            {jornadasData.map((jornada, index) => (
              <motion.div
                key={jornada.titulo}
                variants={cardVariants}
                className={`bg-white rounded-2xl shadow-lg p-6 border hover:shadow-xl transition-all duration-300 ${
                  jornada.destacado ? 'border-emerald-300 border-2' : 'border-emerald-100'
                }`}
              >
                {jornada.destacado && (
                  <div className="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold inline-block mb-4">
                    JORNADA PRIORITARIA
                  </div>
                )}
                
                <div className="flex items-start mb-4">
                  <div className="bg-emerald-100 p-3 rounded-xl mr-4">
                    <jornada.icon className="h-6 w-6 text-emerald-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-lg">{jornada.titulo}</h4>
                    <p className="text-emerald-600 text-sm font-medium mt-1">{jornada.fecha}</p>
                  </div>
                </div>
                
                <p className="text-slate-600 mb-4">{jornada.descripcion}</p>
                
                <div className="space-y-3 text-sm text-slate-500 mb-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{jornada.hora}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{jornada.ubicacion}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{jornada.participantesRequeridos} participantes requeridos</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h5 className="font-semibold text-slate-800 mb-2 text-sm">Materiales necesarios:</h5>
                  <div className="flex flex-wrap gap-1">
                    {jornada.materialesNecesarios.map((material, idx) => (
                      <span 
                        key={idx}
                        className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded text-xs"
                      >
                        {material}
                      </span>
                    ))}
                  </div>
                </div>
                
                <button className="w-full bg-emerald-500 text-white py-2 rounded-lg font-medium hover:bg-emerald-600 transition-colors">
                  Confirmar mi participación
                </button>
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

        {/* --- Llamada a la Acción --- */}
        <motion.div
          className="text-center bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-10 md:p-12 shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-white mb-4">¿Quieres participar en el Tequio?</h3>
          <p className="text-emerald-100 text-lg max-w-2xl mx-auto mb-6">
            Todos son bienvenidos a contribuir. El tequio no requiere experiencia previa, 
            solo las ganas de trabajar juntos por el bien de nuestra comunidad.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-bold hover:bg-emerald-50 transition-colors shadow-lg">
              Unirme al Próximo Tequio
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white/10 transition-colors">
              Contactar Coordinadores
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}