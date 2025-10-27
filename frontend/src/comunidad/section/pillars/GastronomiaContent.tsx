// src/sections/GastronomiaContent.tsx
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { 
  Sprout, 
  Utensils, 
  Coffee, 
  Wheat,
  ChefHat,
  Trees,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import React, { useState, useEffect } from 'react';

// --- Imágenes del Carrusel Gastronómico ---
const carouselImages = [
  {
    url: '/images/comunidad//valores-comunidad/ganaderia.jpg',
    title: 'Cosecha del Maíz Criollo',
    description: 'Nuestro maíz ancestral, base de la alimentación comunitaria'
  },
  {
    url: '/images/gastronomia-2.jpg',
    title: 'Mercado Orgánico Comunitario',
    description: 'Productos frescos directamente de las huertas familiares'
  },
  {
    url: '/images/gastronomia-3.jpg',
    title: 'Preparación de Mole de Caderas',
    description: 'Plato ceremonial que preserva nuestras tradiciones'
  },
  {
    url: '/images/gastronomia-4.jpg',
    title: 'Café de Altura Orgánico',
    description: 'Cultivado en las laderas de nuestras montañas'
  },
  {
    url: '/images/gastronomia-5.jpg',
    title: 'Tamales de Frijol',
    description: 'Sabores que han pasado de generación en generación'
  }
];

// --- Datos de Productos Agrícolas ---
const productosData = [
  {
    nombre: 'Maíz Criollo',
    icon: Wheat,
    descripcion: 'Variedades ancestrales de maíz que conservan su sabor y propiedades nutricionales únicas, cultivadas mediante el sistema milpa.',
    temporada: 'Junio - Noviembre',
    caracteristicas: ['4 variedades nativas', 'Libre de transgénicos', 'Alto valor nutricional', 'Resistente a sequías'],
    color: 'from-amber-400 to-orange-500'
  },
  {
    nombre: 'Frijol Negro',
    icon: Sprout,
    descripcion: 'Cultivado en las laderas de la montaña, nuestro frijol es reconocido por su textura cremosa y sabor profundo característico.',
    temporada: 'Agosto - Diciembre',
    caracteristicas: ['Tipo negro criollo', 'Alto en proteínas', 'Cultivo de rotación', 'Secado al sol natural'],
    color: 'from-purple-600 to-indigo-700'
  },
  {
    nombre: 'Café de Altura',
    icon: Coffee,
    descripcion: 'Café orgánico cultivado a más de 1,200 msnm, con notas achocolatadas y aroma intenso. Proceso de beneficiado húmedo tradicional.',
    temporada: 'Octubre - Marzo',
    caracteristicas: ['Tipo arábiga', 'Secado en patios', 'Tostado artesanal', 'Embalaje tradicional'],
    color: 'from-yellow-700 to-amber-800'
  },
  {
    nombre: 'Hierbas Medicinales',
    icon: Trees,
    descripcion: 'Sabiduría ancestral en el uso de hierbas como manzanilla, árnica y yerbabuena, cultivadas en huertos familiares.',
    temporada: 'Todo el año',
    caracteristicas: ['20 variedades', 'Secado natural', 'Uso medicinal', 'Preparaciones ancestrales'],
    color: 'from-green-500 to-emerald-600'
  }
];

// --- Datos de Platos Típicos ---
const platosData = [
  {
    nombre: 'Mole de Caderas',
    descripcion: 'Plato ceremonial preparado con chivo, especias y chocolate. Patrimonio gastronómico de la región que se prepara en festividades importantes.',
    ingredientes: ['Chivo', 'Chiles mulatos', 'Chocolate ancestral', 'Ajonjolí', 'Especias locales'],
    temporada: 'Octubre',
    icon: ChefHat,
    preparacion: 'Cocción lenta de 8 horas'
  },
  {
    nombre: 'Tamales de Frijol',
    descripcion: 'Tamales envueltos en hoja de maíz, rellenos de frijol negro y hierbas de la región. Alimento básico en celebraciones familiares.',
    ingredientes: ['Maíz nixtamalizado', 'Frijol negro', 'Hoja de maíz', 'Epazote', 'Sal de tierra'],
    temporada: 'Todo el año',
    icon: Utensils,
    preparacion: 'Cocido al vapor por 2 horas'
  },
  {
    nombre: 'Atole de Maíz Blanco',
    descripcion: 'Bebida caliente preparada con maíz blanco molido, canela y piloncillo. Consuelo tradicional en temporadas de frío.',
    ingredientes: ['Maíz blanco', 'Canela de vara', 'Piloncillo', 'Agua purificada'],
    temporada: 'Temporada de frío',
    icon: Coffee,
    preparacion: 'Molido en metate y cocido lentamente'
  }
];

// --- Saberes Ancestrales ---
const saberesData = [
  {
    titulo: 'Sistema Milpa',
    descripcion: 'Cultivo intercalado de maíz, frijol y calabaza que enriquece el suelo y asegura diversidad alimentaria.',
    icon: Sprout,
    color: 'bg-green-100 text-green-700'
  },
  {
    titulo: 'Nixtamalización',
    descripcion: 'Proceso ancestral de cocer el maíz con cal para mejorar su valor nutricional y sabor.',
    icon: Utensils,
    color: 'bg-amber-100 text-amber-700'
  },
  {
    titulo: 'Conservación Natural',
    descripcion: 'Técnicas de secado al sol y almacenamiento en trojes que preservan los granos todo el año.',
    icon: Trees,
    color: 'bg-orange-100 text-orange-700'
  },
  {
    titulo: 'Medicina Herbolaria',
    descripcion: 'Uso tradicional de plantas medicinales para el cuidado de la salud familiar y comunitaria.',
    icon: ChefHat,
    color: 'bg-emerald-100 text-emerald-700'
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

interface GastronomiaContentProps {
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
                className="text-lg text-amber-100 max-w-2xl"
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
                ? 'bg-amber-400 scale-125' 
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

export function GastronomiaContent({ onBack }: GastronomiaContentProps) {
  return (
    <section className="w-full bg-gradient-to-b from-amber-50 to-orange-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- Header --- */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Gastronomía: <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">Sabores Ancestrales</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Del campo a la mesa: preservando nuestra soberanía alimentaria y sabores tradicionales en San Juan Tahitic
          </p>
        </motion.div>

        {/* --- Carrusel de Imágenes --- */}
        <ImageCarousel />

        {/* --- Hero Section Informativa --- */}
        <motion.div
          className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-3xl p-8 md:p-12 text-white mb-16 shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Raíces que Alimentan
              </h2>
              <p className="text-amber-100 text-lg leading-relaxed mb-6">
                En San Juan Tahitic, la tierra no solo nos da sustento, sino identidad. 
                Nuestra agricultura de milpa y cocina tradicional son el legado vivo de generaciones 
                que han sabido convivir en armonía con la naturaleza, preservando saberes ancestrales.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white/20 rounded-lg px-4 py-2 backdrop-blur-sm">
                  <span className="font-semibold">Agricultura Orgánica</span>
                </div>
                <div className="bg-white/20 rounded-lg px-4 py-2 backdrop-blur-sm">
                  <span className="font-semibold">Cocina Ancestral</span>
                </div>
                <div className="bg-white/20 rounded-lg px-4 py-2 backdrop-blur-sm">
                  <span className="font-semibold">Soberanía Alimentaria</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="bg-white/20 p-8 rounded-2xl backdrop-blur-sm">
                <Sprout className="h-24 w-24 text-white" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* --- Nuestros Productos --- */}
        <div className="mb-20">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Nuestros Productos</h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Cultivados con técnicas sostenibles que respetan los ciclos de la tierra y preservan nuestra biodiversidad
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-600 mx-auto rounded-full mt-4"></div>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {productosData.map((producto, index) => (
              <motion.div
                key={producto.nombre}
                variants={cardVariants}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-amber-100"
              >
                {/* Header con gradiente */}
                <div className={`bg-gradient-to-r ${producto.color} p-6 text-white`}>
                  <div className="flex items-center justify-center mb-2">
                    <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                      <producto.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h4 className="font-bold text-xl text-center">{producto.nombre}</h4>
                  <p className="text-amber-100 text-sm text-center mt-1">
                    {producto.temporada}
                  </p>
                </div>
                
                <div className="p-6">
                  <p className="text-slate-700 leading-relaxed mb-4 text-sm">
                    {producto.descripcion}
                  </p>

                  <div className="bg-amber-50 rounded-xl p-4">
                    <h5 className="font-semibold text-amber-800 mb-2 text-sm">Características:</h5>
                    <ul className="text-slate-700 space-y-1 text-sm">
                      {producto.caracteristicas.map((caracteristica, idx) => (
                        <li key={idx} className="flex items-center">
                          <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-2"></div>
                          {caracteristica}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* --- Platos Típicos --- */}
        <div className="mb-20">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Sabores de la Tierra</h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Recetas que han pasado de generación en generación, conservando nuestra identidad culinaria
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-600 mx-auto rounded-full mt-4"></div>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {platosData.map((plato, index) => (
              <motion.div
                key={plato.nombre}
                variants={cardVariants}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-amber-100"
              >
                <div className="bg-gradient-to-r from-amber-400 to-orange-500 p-6 text-white">
                  <div className="flex items-center justify-center">
                    <plato.icon className="h-8 w-8 mr-3" />
                    <h4 className="text-xl font-bold">{plato.nombre}</h4>
                  </div>
                  <p className="text-amber-100 text-sm text-center mt-2">{plato.temporada}</p>
                </div>
                <div className="p-6">
                  <p className="text-slate-700 mb-4 leading-relaxed text-sm">{plato.descripcion}</p>
                  
                  <div className="mb-4">
                    <h5 className="font-semibold text-slate-800 mb-2 text-sm">Ingredientes principales:</h5>
                    <div className="flex flex-wrap gap-1">
                      {plato.ingredientes.map((ingrediente) => (
                        <span 
                          key={ingrediente}
                          className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs"
                        >
                          {ingrediente}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-amber-50 rounded-lg p-3 text-center">
                    <p className="text-amber-700 text-sm font-medium">
                      {plato.preparacion}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* --- Saberes Ancestrales --- */}
        <div className="mb-20">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Saberes Ancestrales</h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Conocimientos tradicionales que sustentan nuestra relación con la tierra y los alimentos
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-600 mx-auto rounded-full mt-4"></div>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {saberesData.map((saber, index) => (
              <motion.div
                key={saber.titulo}
                variants={cardVariants}
                className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 border border-amber-100"
              >
                <div className={`p-3 rounded-xl ${saber.color} inline-flex mb-4`}>
                  <saber.icon className="h-6 w-6" />
                </div>
                <h4 className="font-bold text-slate-800 text-lg mb-3">{saber.titulo}</h4>
                <p className="text-slate-600 text-sm leading-relaxed">{saber.descripcion}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* --- Sección Informativa Final --- */}
        <motion.div
          className="text-center bg-gradient-to-r from-amber-500 to-orange-600 rounded-3xl p-10 md:p-12 shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Sprout className="h-16 w-16 text-white mx-auto mb-4" />
          <h3 className="text-3xl font-bold text-white mb-4">Patrimonio Gastronómico Vivo</h3>
          <p className="text-amber-100 text-lg max-w-2xl mx-auto mb-6">
            En San Juan Tahitic, cada alimento cuenta una historia, cada sabor preserva una memoria. 
            Nuestra gastronomía es el testimonio vivo de la relación armónica entre nuestra comunidad 
            y la tierra que nos sustenta.
          </p>
          <div className="bg-white/20 rounded-xl p-4 inline-flex backdrop-blur-sm">
            <span className="text-white font-semibold">San Juan Tahitic - Sabores que Trascienden</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}