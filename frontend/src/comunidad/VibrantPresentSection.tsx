// src/sections/VibrantPresentSection.tsx
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { InfoModal } from './section/InfoModal';

import { EducacionContent } from './section/pillars/EducacionContent';
import { FiestasContent } from './section/pillars/FiestasContent';
import { GastronomiaContent } from './section/pillars/GastronomiaContent';
import { TequioContent } from './section/pillars/TequioContent';

import { 
  Handshake, 
  Sprout, 
  PartyPopper, 
  School2,
  Users,
  LineChart,
  Home,
  BookOpen,
  Presentation,
  MapPin,
  Heart,
  Clock,
  Calendar,
  CheckCircle
} from 'lucide-react';
import React from 'react';
import { type ElementType, useEffect, useRef, useState } from 'react';

// --- Datos de los Pilares de la Comunidad ---
const pillarsData: {
  [x: string]: any; 
  title: string; 
  description: string; 
  Icon: ElementType;
  color: string;
  
}[] = [
  {
    title: 'Trabajo Colectivo (Tequio)',
    description: 'La faena comunitaria es el pilar de nuestra cohesión. Un sistema ancestral de ayuda mutua para construir y mantener el bienestar de todos.',
    Icon: Handshake,
    color: 'from-emerald-500 to-teal-600',
    ContentComponent: TequioContent,
  },
  {
    title: 'Gastronomía y Agricultura',
    description: 'Del campo a la mesa. Nuestros cultivos de maíz, frijol y café son la base de una cocina que nutre el cuerpo y preserva la soberanía alimentaria.',
    Icon: Sprout,
    color: 'from-amber-500 to-orange-600',
    ContentComponent: GastronomiaContent,
  },
  {
    title: 'Fiestas y Tradiciones',
    description: 'El calendario festivo es el corazón cultural. Danzas, música y fe convergen en celebraciones que reafirman nuestra identidad a lo largo del año.',
    Icon: PartyPopper,
    color: 'from-rose-500 to-pink-600',
    ContentComponent: FiestasContent,
  },
  {
    title: 'Educación y Futuro',
    description: 'Invertimos en las nuevas generaciones. Nuestras escuelas son semilleros de talento que preparan a los jóvenes para el futuro sin olvidar sus raíces.',
    Icon: School2,
    color: 'from-blue-500 to-indigo-600',
    ContentComponent: EducacionContent
  },
];

// --- Datos para la Radiografía Cuantitativa ---
const statsData: {
  value: number;
  suffix?: string;
  label: string;
  icon: ElementType;
  color: string;
}[] = [
  { value: 2500, label: 'Habitantes', icon: Users, color: 'text-blue-400' },
  { value: 45, suffix: '%', label: 'Población Joven (<30 años)', icon: Heart, color: 'text-rose-400' },
  { value: 5, label: 'Escuelas (Básica y Media)', icon: School2, color: 'text-amber-400' },
  { value: 98, suffix: '%', label: 'Cobertura Eléctrica', icon: Home, color: 'text-emerald-400' },
];

// --- Datos de Eventos Próximos ---
const upcomingEvents = [
  { 
    title: 'Feria del Maíz', 
    date: '15 Oct 2023', 
    description: 'Celebración anual de nuestra cosecha más importante',
    icon: Calendar,
    color: 'bg-amber-100 text-amber-700'
  },
  { 
    title: 'Tequio Comunitario', 
    date: '22 Oct 2023', 
    description: 'Jornada de trabajo colectivo para mejorar espacios públicos',
    icon: Users,
    color: 'bg-emerald-100 text-emerald-700'
  },
  { 
    title: 'Festival de Danzas', 
    date: '5 Nov 2023', 
    description: 'Exhibición de danzas tradicionales de la comunidad',
    icon: PartyPopper,
    color: 'bg-rose-100 text-rose-700'
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6, 
      ease: 'easeOut' 
    } 
  },
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

// --- Componente para Animar el Conteo de Números ---
function AnimatedNumber({ to, suffix }: { to: number, suffix?: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, latest => Math.round(latest));
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (inView) {
      animate(count, to, { duration: 2, ease: "easeOut" });
    }
  }, [inView, count, to]);

  return (
    <div className="flex items-baseline justify-center" ref={ref}>
      <motion.span className="text-5xl md:text-6xl font-bold">{rounded}</motion.span>
      {suffix && <span className="text-3xl md:text-4xl font-bold ml-1">{suffix}</span>}
    </div>
  );
}

export function VibrantPresentSection() {
  const [activePillar, setActivePillar] = useState(0);
  // 👇 1. Nuevo estado para controlar el modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Obtenemos los datos del pilar activo para pasarlos al modal
  const activePillarData = pillarsData[activePillar];
  // 👇 Obtenemos el componente de la data activa
  const ContentComponent = activePillarData.ContentComponent;
  
  return (
    <section id="presente" className="w-full bg-gradient-to-b from-slate-50 to-blue-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* --- Encabezado Mejorado --- */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white px-6 py-3 rounded-full mb-6 shadow-lg"
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <MapPin className="h-5 w-5" />
            <span className="font-medium">San Juan Tahitic Hoy</span>
          </motion.div>
          <h2 className="text-4xl sm:text-6xl font-bold text-slate-900 leading-tight mb-6">
            Nuestra Comunidad <span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">Vibrante</span>
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-xl text-slate-600 leading-relaxed">
            Descubre cómo vivimos hoy: una comunidad que honra su herencia mientras construye activamente su futuro con esperanza y unidad.
          </p>
        </motion.div>

        {/* --- Pilares de la Comunidad - Diseño Mejorado --- */}
        <div className="mb-24">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Pilares de Nuestra Comunidad</h3>
            <div className="w-24 h-1 bg-gradient-to-r from-sky-500 to-blue-600 mx-auto rounded-full"></div>
          </motion.div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Navegación de Pilares */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
                <h4 className="text-lg font-semibold text-slate-800 mb-4">Nuestros Valores</h4>
                <div className="space-y-3">
                  {pillarsData.map((pillar, index) => (
                    <button
                      key={pillar.title}
                      onClick={() => setActivePillar(index)}
                      className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                        activePillar === index 
                          ? `bg-gradient-to-r ${pillar.color} text-white shadow-md` 
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <div className="flex items-center">
                        <pillar.Icon className="h-5 w-5 mr-3" />
                        <span className="font-medium">{pillar.title}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Contenido del Pilar Activo */}
            <div className="lg:w-3/4">
              <motion.div
                key={activePillar}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden"
              >
                <div className={`h-64 bg-gradient-to-r ${pillarsData[activePillar].color} flex items-center justify-center`}>
                  <div className="text-white text-center p-6">
                    <div className="bg-white/20 p-4 rounded-full inline-flex mb-4">
                    {React.createElement(pillarsData[activePillar].Icon, { className: 'h-12 w-12' })}
                    </div>

                    <h3 className="text-3xl font-bold">{pillarsData[activePillar].title}</h3>
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-lg text-slate-700 leading-relaxed">
                    {pillarsData[activePillar].description}
                  </p>
                  <div className="mt-6 flex justify-end">
                    <button 
                    onClick={() => setIsModalOpen(true)}
                    className={`bg-gradient-to-r ${activePillarData.color} text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity shadow-md`}
                  >
                      Conocer más
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* --- Dashboard de Radiografía Mejorado --- */}
        <div className="mb-24">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Nuestra Comunidad en Números</h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Datos que reflejan la vitalidad y el progreso de San Juan Tahitic
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-sky-500 to-blue-600 mx-auto rounded-full mt-4"></div>
          </motion.div>
          
          <motion.div 
            className="bg-gradient-to-br from-slate-800 via-slate-900 to-blue-900 p-8 md:p-12 rounded-3xl shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {statsData.map((stat) => (
                <motion.div 
                  key={stat.label} 
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10 hover:bg-white/15 transition-all duration-300"
                  variants={cardVariants}
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-full bg-white/10">
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                  <div className="text-sky-400 mb-2">
                    <AnimatedNumber to={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-slate-300 text-sm font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
            
            <div className="mt-10 pt-8 border-t border-white/10">
              <div className="text-center">
                <p className="text-slate-400 text-sm">
                  Última actualización: Octubre 2023 • Fuente: Consejo Comunitario de San Juan Tahitic
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* --- Nueva Sección: Próximos Eventos --- */}
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
              Participa en las actividades que mantienen viva nuestra cultura y comunidad
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-sky-500 to-blue-600 mx-auto rounded-full mt-4"></div>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.title}
                variants={cardVariants}
                className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start mb-4">
                  <div className={`p-3 rounded-xl ${event.color} mr-4`}>
                    <event.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-lg">{event.title}</h4>
                    <p className="text-slate-500 text-sm flex items-center mt-1">
                      <Calendar className="h-4 w-4 mr-1" />
                      {event.date}
                    </p>
                  </div>
                </div>
                <p className="text-slate-600">{event.description}</p>
                <button className="mt-4 text-sky-600 font-medium text-sm hover:text-sky-700 transition-colors flex items-center">
                  Más información
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* --- Llamada a la Acción --- */}
        <motion.div
          className="text-center bg-gradient-to-r from-sky-500 to-blue-600 rounded-3xl p-10 md:p-12 shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-white mb-4">¿Te gustaría visitarnos?</h3>
          <p className="text-sky-100 text-lg max-w-2xl mx-auto mb-6">
            Conoce de primera mano la calidez y riqueza cultural de San Juan Tahitic. 
            Te invitamos a ser parte de nuestra comunidad, aunque sea por un día.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-sky-600 px-8 py-3 rounded-lg font-bold hover:bg-slate-100 transition-colors shadow-lg">
              Planificar Visita
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white/10 transition-colors">
              Contactar Comunidad
            </button>
          </div>
        </motion.div>
      </div>
      {/* 👇 3. Renderizado del Modal con Contenido Enriquecido */}
      <InfoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={activePillarData.title}
        Icon={activePillarData.Icon}
        gradient={activePillarData.color}
      >
        {/* 👇 RENDERIZAMOS EL COMPONENTE DINÁMICAMENTE */}
        <ContentComponent />
      </InfoModal>
    </section>
  );
}