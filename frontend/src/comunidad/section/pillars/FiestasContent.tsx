// src/sections/FiestasContent.tsx
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { 
  PartyPopper, 
  Music, 
  Calendar,
  MapPin,
  Users,
  Clock,
  ArrowLeft,
  Star,
  Heart
} from 'lucide-react';
import React from 'react';
import { useState } from 'react';

// --- Datos de Festividades Principales ---
const festividadesData = [
  {
    nombre: 'Fiesta Patronal de San Juan',
    fecha: '24 de Junio',
    descripcion: 'Celebración en honor a nuestro santo patrón con misas, procesiones y festejos comunitarios.',
    actividades: ['Procesión religiosa', 'Danza de los Moros', 'Fuegos artificiales', 'Feria gastronómica'],
    duracion: '3 días',
    color: 'from-blue-500 to-cyan-600',
    icon: Star
  },
  {
    nombre: 'Día de Muertos',
    fecha: '1-2 de Noviembre',
    descripcion: 'Honramos a nuestros ancestros con altares, ofrendas y veladas en el panteón comunal.',
    actividades: ['Altares familiares', 'Velada en panteón', 'Caminata de catrinas', 'Lectura de calaveritas'],
    duracion: '2 días',
    color: 'from-purple-500 to-pink-600',
    icon: Heart
  },
  {
    nombre: 'Carnaval Tradicional',
    fecha: 'Febrero/Marzo',
    descripcion: 'Celebración previa a la cuaresma con comparsas, máscaras y bailes tradicionales.',
    actividades: ['Comparsas', 'Baile de máscaras', 'Elección de rey feo', 'Juegos tradicionales'],
    duracion: '4 días',
    color: 'from-rose-500 to-red-600',
    icon: PartyPopper
  },
  {
    nombre: 'Semana Santa',
    fecha: 'Marzo/Abril',
    descripcion: 'Representaciones vivientes de la pasión de Cristo y tradiciones religiosas ancestrales.',
    actividades: ['Vía crucis viviente', 'Procesión del silencio', 'Quema de judas', 'Vigilia pascual'],
    duracion: '7 días',
    color: 'from-violet-500 to-purple-600',
    icon: Users
  }
];

// --- Danzas y Tradiciones ---
const danzasData = [
  {
    nombre: 'Danza de los Moros',
    descripcion: 'Representación histórica de la lucha entre moros y cristianos, con trajes coloridos y música tradicional.',
    origen: 'Siglo XVI',
    participantes: '40 danzantes',
    temporada: 'Fiestas patronales',
    icon: Music
  },
  {
    nombre: 'Son de la Malinche',
    descripcion: 'Danza que narra encuentros culturales con movimientos elegantes y trajes bordados a mano.',
    origen: 'Época colonial',
    participantes: '20 danzantes',
    temporada: 'Festividades importantes',
    icon: Users
  },
  {
    nombre: 'Los Chinelos',
    descripcion: 'Danza alegre con saltos característicos y máscaras de bigotes, típica de carnavales.',
    origen: 'Siglo XIX',
    participantes: 'Ilimitado',
    temporada: 'Carnaval',
    icon: PartyPopper
  }
];

// --- Próximos Eventos ---
const eventosData = [
  {
    titulo: 'Velada de Día de Muertos',
    fecha: '1 Noviembre 2024',
    hora: '18:00 - 24:00',
    descripcion: 'Noche de vigilia en el panteón comunal con ofrendas, música y comida tradicional.',
    ubicacion: 'Panteón Municipal',
    icon: Calendar,
    destacado: true
  },
  {
    titulo: 'Ensayo Danza de Moros',
    fecha: 'Todos los domingos',
    hora: '10:00 - 13:00',
    descripcion: 'Prácticas abiertas para quienes deseen aprender esta tradición ancestral.',
    ubicacion: 'Cancha Deportiva',
    icon: Clock,
    destacado: false
  },
  {
    titulo: 'Preparación Altares',
    fecha: '28 Octubre 2024',
    hora: '16:00 - 20:00',
    descripcion: 'Taller comunitario para elaborar elementos tradicionales de ofrendas.',
    ubicacion: 'Casa de la Cultura',
    icon: Heart,
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

interface FiestasContentProps {
  onBack?: () => void;
}

export function FiestasContent({ onBack }: FiestasContentProps) {
  const [activeFestividad, setActiveFestividad] = useState(0);

  return (
    <section className="w-full bg-gradient-to-b from-rose-50 to-pink-50 py-16 sm:py-24">
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
              className="flex items-center space-x-2 text-rose-700 hover:text-rose-800 transition-colors mr-6"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Volver</span>
            </button>
          )}
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900">
              Fiestas y <span className="bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">Tradiciones</span>
            </h1>
            <p className="text-lg text-slate-600 mt-2 max-w-3xl">
              El corazón cultural de San Juan Tahitic late al ritmo de nuestras celebraciones ancestrales
            </p>
          </div>
        </motion.div>

        {/* --- Hero Section --- */}
        <motion.div
          className="bg-gradient-to-r from-rose-500 to-pink-600 rounded-3xl p-8 md:p-12 text-white mb-16 shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Celebrando Nuestra Identidad
              </h2>
              <p className="text-rose-100 text-lg leading-relaxed mb-6">
                Cada fiesta en San Juan Tahitic es un tejido vivo de historia, fe y comunidad. 
                Nuestras tradiciones no solo se preservan, se viven con la misma pasión 
                que hace cientos de años.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white/20 rounded-lg px-4 py-2 backdrop-blur-sm">
                  <span className="font-semibold">Tradición Viva</span>
                </div>
                <div className="bg-white/20 rounded-lg px-4 py-2 backdrop-blur-sm">
                  <span className="font-semibold">Unión Comunitaria</span>
                </div>
                <div className="bg-white/20 rounded-lg px-4 py-2 backdrop-blur-sm">
                  <span className="font-semibold">Herencia Cultural</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="bg-white/20 p-8 rounded-2xl backdrop-blur-sm">
                <PartyPopper className="h-24 w-24 text-white" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* --- Festividades Principales --- */}
        <div className="mb-20">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Festividades del Año</h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              El calendario que marca el ritmo de nuestra vida comunitaria
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-rose-500 to-pink-600 mx-auto rounded-full mt-4"></div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Navegación de Festividades */}
            <div className="space-y-4">
              {festividadesData.map((festividad, index) => (
                <motion.button
                  key={festividad.nombre}
                  onClick={() => setActiveFestividad(index)}
                  className={`w-full text-left p-6 rounded-2xl transition-all duration-300 ${
                    activeFestividad === index
                      ? 'bg-white shadow-xl border-2 border-rose-200'
                      : 'bg-rose-100 hover:bg-rose-200'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${festividad.color} mr-4`}>
                      <festividad.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-lg">{festividad.nombre}</h4>
                      <p className="text-rose-600 text-sm font-medium mt-1">{festividad.fecha}</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Detalle de la Festividad */}
            <motion.div
              key={activeFestividad}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <div className="flex items-center mb-6">
                <div className={`p-4 rounded-xl bg-gradient-to-r ${festividadesData[activeFestividad].color} mr-4`}>
                {React.createElement(festividadesData[activeFestividad].icon, { className: 'h-8 w-8 text-white' })}
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-slate-900">{festividadesData[activeFestividad].nombre}</h4>
                  <p className="text-rose-600 font-medium">{festividadesData[activeFestividad].fecha} • {festividadesData[activeFestividad].duracion}</p>
                </div>
              </div>
              
              <p className="text-slate-700 text-lg leading-relaxed mb-6">
                {festividadesData[activeFestividad].descripcion}
              </p>
              
              <div className="mb-6">
                <h5 className="font-semibold text-slate-800 mb-3">Actividades principales:</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {festividadesData[activeFestividad].actividades.map((actividad, idx) => (
                    <div key={idx} className="flex items-center">
                      <div className="w-2 h-2 bg-rose-500 rounded-full mr-3"></div>
                      <span className="text-slate-700">{actividad}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-rose-50 rounded-xl p-4">
                <h5 className="font-semibold text-rose-800 mb-2">Participación comunitaria:</h5>
                <p className="text-slate-700">
                  Toda la comunidad se involucra en la organización y celebración. 
                  Familias enteras participan generación tras generación.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* --- Danzas Tradicionales --- */}
        <div className="mb-20">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Danzas y Expresiones</h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              El movimiento que cuenta nuestra historia y preserva nuestra memoria
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-rose-500 to-pink-600 mx-auto rounded-full mt-4"></div>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {danzasData.map((danza, index) => (
              <motion.div
                key={danza.nombre}
                variants={cardVariants}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="bg-gradient-to-r from-rose-400 to-pink-500 p-6 text-white">
                  <div className="flex items-center">
                    <danza.icon className="h-8 w-8 mr-3" />
                    <h4 className="text-xl font-bold">{danza.nombre}</h4>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-slate-700 mb-4 leading-relaxed">{danza.descripcion}</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center text-slate-600">
                      <Clock className="h-4 w-4 mr-2" />
                      <span className="text-sm">Origen: {danza.origen}</span>
                    </div>
                    <div className="flex items-center text-slate-600">
                      <Users className="h-4 w-4 mr-2" />
                      <span className="text-sm">{danza.participantes}</span>
                    </div>
                    <div className="flex items-center text-slate-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="text-sm">{danza.temporada}</span>
                    </div>
                  </div>
                  
                  <button className="mt-6 w-full bg-rose-500 text-white py-2 rounded-lg font-medium hover:bg-rose-600 transition-colors">
                    Conocer más
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* --- Próximos Eventos --- */}
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
              No te pierdas las próximas celebraciones en nuestra comunidad
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-rose-500 to-pink-600 mx-auto rounded-full mt-4"></div>
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
                  evento.destacado ? 'border-rose-300 border-2' : 'border-rose-100'
                }`}
              >
                {evento.destacado && (
                  <div className="bg-rose-500 text-white px-3 py-1 rounded-full text-xs font-bold inline-block mb-4">
                    EVENTO DESTACADO
                  </div>
                )}
                
                <div className="flex items-start mb-4">
                  <div className="bg-rose-100 p-3 rounded-xl mr-4">
                    <evento.icon className="h-6 w-6 text-rose-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-lg">{evento.titulo}</h4>
                    <p className="text-rose-600 text-sm font-medium mt-1">{evento.fecha}</p>
                  </div>
                </div>
                
                <p className="text-slate-600 mb-4">{evento.descripcion}</p>
                
                <div className="space-y-2 text-sm text-slate-500">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{evento.hora}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{evento.ubicacion}</span>
                  </div>
                </div>
                
                <button className="mt-4 w-full bg-rose-500 text-white py-2 rounded-lg font-medium hover:bg-rose-600 transition-colors">
                  Confirmar asistencia
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* --- Llamada a la Acción --- */}
        <motion.div
          className="text-center bg-gradient-to-r from-rose-500 to-pink-600 rounded-3xl p-10 md:p-12 shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-white mb-4">¿Quieres vivir nuestras tradiciones?</h3>
          <p className="text-rose-100 text-lg max-w-2xl mx-auto mb-6">
            Te invitamos a ser parte de nuestras celebraciones. Los visitantes son siempre 
            bienvenidos para compartir la alegría y el color de nuestras fiestas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-rose-600 px-8 py-3 rounded-lg font-bold hover:bg-rose-50 transition-colors shadow-lg">
              Ver Calendario Completo
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white/10 transition-colors">
              Contactar Organizadores
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}