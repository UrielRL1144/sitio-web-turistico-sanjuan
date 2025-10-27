// src/sections/FiestasContent.tsx
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { 
  PartyPopper, 
  Music, 
  Calendar,
  Users,
  Clock,
  Star,
  Heart,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Palette,
  Drum
} from 'lucide-react';
import React, { useState, useEffect } from 'react';

// --- Imágenes del Carrusel Festivo ---
const carouselImages = [
  {
    url: '/images/comunidad/valores-comunidad/iglesia.webp',
    title: 'Fiesta Patronal de San Juan',
    description: 'Celebración en honor a nuestro santo patrón con procesiones y danzas tradicionales'
  },
  {
    url: '/images/comunidad/valores-comunidad/maiz.jpg',
    title: 'Danza de los Moros',
    description: 'Colorida representación histórica que preserva nuestra memoria cultural'
  },
  {
    url: '/images/fiestas-3.jpg',
    title: 'Día de Muertos',
    description: 'Altares y ofrendas que honran a nuestros ancestros'
  },
  {
    url: '/images/fiestas-4.jpg',
    title: 'Carnaval Tradicional',
    description: 'Máscaras, música y alegría en la celebración comunitaria'
  },
  {
    url: '/images/fiestas-5.jpg',
    title: 'Semana Santa',
    description: 'Tradiciones religiosas que unen a la comunidad'
  }
];

// --- Datos de Festividades Principales ---
const festividadesData = [
  {
    nombre: 'Fiesta Patronal de San Juan',
    fecha: '24 de Junio',
    descripcion: 'Celebración en honor a nuestro santo patrón con misas, procesiones y festejos comunitarios que duran tres días. La comunidad se une para honrar las tradiciones heredadas de nuestros antepasados.',
    actividades: ['Procesión religiosa', 'Danza de los Moros', 'Fuegos artificiales', 'Feria gastronómica', 'Jaripeo tradicional'],
    duracion: '3 días',
    color: 'from-blue-500 to-cyan-600',
    icon: Star,
    participantes: 'Toda la comunidad',
    elementoDestacado: 'Procesión con el santo patrón'
  },
  {
    nombre: 'Día de Muertos',
    fecha: '1-2 de Noviembre',
    descripcion: 'Honramos a nuestros ancestros con altares familiares, ofrendas y veladas en el panteón comunal. Una tradición que refleja nuestra relación con el ciclo de la vida y la muerte.',
    actividades: ['Altares familiares', 'Velada en panteón', 'Caminata de catrinas', 'Lectura de calaveritas', 'Cena comunitaria'],
    duracion: '2 días',
    color: 'from-purple-500 to-pink-600',
    icon: Heart,
    participantes: 'Familias completas',
    elementoDestacado: 'Altares con flor de cempasúchil'
  },
  {
    nombre: 'Carnaval Tradicional',
    fecha: 'Febrero/Marzo',
    descripcion: 'Celebración previa a la cuaresma con comparsas, máscaras artesanales y bailes tradicionales que llenan de color las calles del pueblo.',
    actividades: ['Comparsas', 'Baile de máscaras', 'Elección de rey feo', 'Juegos tradicionales', 'Concierto de bandas'],
    duracion: '4 días',
    color: 'from-rose-500 to-red-600',
    icon: PartyPopper,
    participantes: 'Jóvenes y adultos',
    elementoDestacado: 'Máscaras artesanales'
  },
  {
    nombre: 'Semana Santa',
    fecha: 'Marzo/Abril',
    descripcion: 'Representaciones vivientes de la pasión de Cristo y tradiciones religiosas ancestrales que congregan a la comunidad en reflexión y fe.',
    actividades: ['Vía crucis viviente', 'Procesión del silencio', 'Quema de judas', 'Vigilia pascual', 'Dramatizaciones'],
    duracion: '7 días',
    color: 'from-violet-500 to-purple-600',
    icon: Users,
    participantes: 'Comunidad religiosa',
    elementoDestacado: 'Vía crucis viviente'
  }
];

// --- Danzas y Expresiones Culturales ---
const danzasData = [
  {
    nombre: 'Danza de los Moros',
    descripcion: 'Representación histórica de la lucha entre moros y cristianos, con trajes coloridos bordados a mano y música de viento tradicional.',
    origen: 'Siglo XVI - Tradición colonial',
    participantes: '40 danzantes + músicos',
    temporada: 'Fiestas patronales y principales',
    icon: Drum,
    vestimenta: 'Trajes bordados con lentejuelas',
    significado: 'Encuentro cultural y religioso'
  },
  {
    nombre: 'Son de la Malinche',
    descripcion: 'Danza ceremonial que narra encuentros culturales con movimientos elegantes, considerada patrimonio cultural inmaterial.',
    origen: 'Época colonial - Raíces prehispánicas',
    participantes: '20 danzantes especializados',
    temporada: 'Festividades importantes',
    icon: Music,
    vestimenta: 'Huipiles y enredos tradicionales',
    significado: 'Fusión cultural y identidad'
  },
  {
    nombre: 'Los Chinelos',
    descripcion: 'Danza alegre con saltos característicos y máscaras de bigotes grandes, símbolo de alegría y crítica social festiva.',
    origen: 'Siglo XIX - Tradición morelense',
    participantes: 'Participación abierta comunitaria',
    temporada: 'Carnaval y fiestas populares',
    icon: PartyPopper,
    vestimenta: 'Túnica y máscara de bigotón',
    significado: 'Celebración y sátira social'
  }
];

// --- Patrimonio Cultural Inmaterial ---
const patrimonioData = [
  {
    titulo: 'Música de Viento Tradicional',
    descripcion: 'Bandas comunitarias que preservan el repertorio musical ancestral para festividades.',
    icon: Music,
    color: 'from-blue-500 to-cyan-500',
    estado: 'Tradición activa'
  },
  {
    titulo: 'Artesanía Festiva',
    descripcion: 'Elaboración de máscaras, trajes y adornos utilizando técnicas heredadas generacionalmente.',
    icon: Palette,
    color: 'from-purple-500 to-pink-500',
    estado: 'En preservación'
  },
  {
    titulo: 'Gastronomía Ceremonial',
    descripcion: 'Preparación de alimentos especiales para cada festividad según recetas ancestrales.',
    icon: Heart,
    color: 'from-rose-500 to-red-500',
    estado: 'Tradición viva'
  },
  {
    titulo: 'Oralidad y Narrativa',
    descripcion: 'Transmisión de historias, leyendas y conocimientos a través de la tradición oral.',
    icon: Users,
    color: 'from-violet-500 to-purple-500',
    estado: 'En documentación'
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
                className="text-lg text-rose-100 max-w-2xl"
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
                ? 'bg-rose-400 scale-125' 
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

export function FiestasContent({ onBack }: FiestasContentProps) {
  return (
    <section className="w-full bg-gradient-to-b from-rose-50 to-pink-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- Header con Diseño Circular --- */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-pink-600 rounded-full blur-lg opacity-30 animate-pulse"></div>
            <div className="relative bg-white rounded-full p-4 shadow-lg">
              <PartyPopper className="h-12 w-12 text-rose-600" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Fiestas y <span className="bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">Tradiciones</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            El corazón cultural de San Juan Tahitic late al ritmo de nuestras celebraciones ancestrales
          </p>
        </motion.div>

        {/* --- Carrusel de Imágenes --- */}
        <ImageCarousel />

        {/* --- Hero Section con Diseño Asimétrico --- */}
        <motion.div
          className="relative bg-white rounded-3xl p-8 md:p-12 mb-16 shadow-2xl border border-rose-100 overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-rose-500/10 to-pink-600/10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-rose-500/5 to-pink-600/5 rounded-full translate-y-24 -translate-x-24"></div>
          
          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center mb-4">
                <Sparkles className="h-8 w-8 text-rose-500 mr-3" />
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                  Celebrando Nuestra Identidad
                </h2>
              </div>
              <p className="text-slate-700 text-lg leading-relaxed mb-6">
                Cada fiesta en San Juan Tahitic es un tejido vivo de historia, fe y comunidad. 
                Nuestras tradiciones no solo se preservan, se viven con la misma pasión 
                que hace cientos de años, creando memorias que trascienden generaciones.
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="bg-rose-100 text-rose-800 rounded-full px-4 py-2 text-sm font-medium">
                  Tradición Viva
                </div>
                <div className="bg-pink-100 text-pink-800 rounded-full px-4 py-2 text-sm font-medium">
                  Unión Comunitaria
                </div>
                <div className="bg-rose-50 text-rose-700 rounded-full px-4 py-2 text-sm font-medium">
                  Herencia Cultural
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="bg-gradient-to-r from-rose-500 to-pink-600 p-8 rounded-2xl text-white shadow-lg">
                  <Users className="h-16 w-16 text-white" />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-xl shadow-lg border border-rose-200">
                  <Calendar className="h-8 w-8 text-rose-600" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* --- Festividades en Timeline Horizontal --- */}
        <div className="mb-20">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Calendario Festivo Anual</h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Eventos que marcan el ritmo de nuestra vida comunitaria a lo largo del año
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-rose-500 to-pink-600 mx-auto rounded-full mt-4"></div>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {festividadesData.map((festividad, index) => (
              <motion.div
                key={festividad.nombre}
                variants={cardVariants}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-rose-100 group"
              >
                <div className={`bg-gradient-to-r ${festividad.color} p-6 text-white relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <festividad.icon className="h-8 w-8 text-white" />
                      <span className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium">
                        {festividad.duracion}
                      </span>
                    </div>
                    <h4 className="font-bold text-xl mb-2">{festividad.nombre}</h4>
                    <p className="text-white/90 text-sm">{festividad.fecha}</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-slate-700 leading-relaxed mb-4 text-sm">
                    {festividad.descripcion}
                  </p>

                  <div className="mb-4">
                    <h5 className="font-semibold text-slate-800 mb-2 text-sm">Actividades destacadas:</h5>
                    <div className="space-y-1">
                      {festividad.actividades.slice(0, 3).map((actividad, idx) => (
                        <div key={idx} className="flex items-center text-slate-600 text-sm">
                          <div className="w-1.5 h-1.5 bg-rose-500 rounded-full mr-2"></div>
                          {actividad}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-rose-50 rounded-lg p-3">
                    <p className="text-rose-700 text-sm font-medium text-center">
                      {festividad.elementoDestacado}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* --- Danzas Tradicionales con Diseño de Tarjetas Expandidas --- */}
        <div className="mb-20">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Expresiones Dancísticas</h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              El movimiento que cuenta nuestra historia y preserva nuestra memoria colectiva
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
            {danzasData.map((danza, index) => (
              <motion.div
                key={danza.nombre}
                variants={cardVariants}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-rose-100 group"
              >
                <div className="bg-gradient-to-r from-rose-400 to-pink-500 p-6 text-white">
                  <div className="flex items-center justify-between">
                    <danza.icon className="h-8 w-8 text-white" />
                    <span className="bg-white/20 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium">
                      {danza.temporada}
                    </span>
                  </div>
                  <h4 className="font-bold text-xl mt-3">{danza.nombre}</h4>
                </div>
                
                <div className="p-6">
                  <p className="text-slate-700 mb-4 leading-relaxed text-sm">
                    {danza.descripcion}
                  </p>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-slate-600 text-sm">
                      <Clock className="h-4 w-4 mr-2 text-rose-500" />
                      <span><strong>Origen:</strong> {danza.origen}</span>
                    </div>
                    <div className="flex items-center text-slate-600 text-sm">
                      <Users className="h-4 w-4 mr-2 text-rose-500" />
                      <span><strong>Participantes:</strong> {danza.participantes}</span>
                    </div>
                    <div className="flex items-center text-slate-600 text-sm">
                      <Palette className="h-4 w-4 mr-2 text-rose-500" />
                      <span><strong>Vestimenta:</strong> {danza.vestimenta}</span>
                    </div>
                  </div>

                  <div className="bg-rose-50 rounded-lg p-3">
                    <p className="text-rose-700 text-sm text-center">
                      <strong>Significado:</strong> {danza.significado}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* --- Patrimonio Cultural con Diseño de Mosaico --- */}
        <div className="mb-16">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Patrimonio Cultural Inmaterial</h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Saberes y expresiones que definen nuestra identidad como comunidad
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-rose-500 to-pink-600 mx-auto rounded-full mt-4"></div>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {patrimonioData.map((item, index) => (
              <motion.div
                key={item.titulo}
                variants={cardVariants}
                className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 border border-rose-100 group hover:scale-105"
              >
                <div className={`bg-gradient-to-r ${item.color} p-4 rounded-xl inline-flex mb-4 group-hover:scale-110 transition-transform`}>
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-bold text-slate-800 text-lg mb-3">{item.titulo}</h4>
                <p className="text-slate-600 text-sm leading-relaxed mb-3">{item.descripcion}</p>
                <span className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-xs font-medium">
                  {item.estado}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* --- Sección Final con Diseño de Medallón --- */}
        <motion.div
          className="text-center bg-gradient-to-r from-rose-500 to-pink-600 rounded-3xl p-10 md:p-12 shadow-2xl relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-16 -translate-y-16"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/10 rounded-full translate-x-12 translate-y-12"></div>
          
          <div className="relative">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 inline-flex mb-6">
              <Sparkles className="h-12 w-12 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">Memoria que se Hace Fiesta</h3>
            <p className="text-rose-100 text-lg max-w-2xl mx-auto mb-6">
              En San Juan Tahitic, cada celebración es un capítulo vivo de nuestra historia compartida. 
              Las tradiciones que hoy preservamos son el legado que entregaremos a las futuras generaciones, 
              manteniendo viva la llama de nuestra identidad cultural.
            </p>
            <div className="bg-white/20 rounded-xl p-4 inline-flex backdrop-blur-sm">
              <span className="text-white font-semibold">San Juan Tahitic - Donde la Tradición Vive</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}