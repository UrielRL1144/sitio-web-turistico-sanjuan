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
  Calendar,
  MapPin,
  Users,
  ArrowLeft
} from 'lucide-react';
import React from 'react';
import { useState } from 'react';

// --- Datos de Productos Agrícolas ---
const productosData = [
  {
    nombre: 'Maíz Criollo',
    icon: Wheat,
    descripcion: 'Variedades ancestrales de maíz que conservan su sabor y propiedades nutricionales únicas.',
    temporada: 'Junio - Noviembre',
    color: 'from-amber-400 to-orange-500'
  },
  {
    nombre: 'Frijol Negro',
    icon: Sprout,
    descripcion: 'Cultivado en las laderas de la montaña, nuestro frijol es reconocido por su textura y sabor.',
    temporada: 'Agosto - Diciembre',
    color: 'from-purple-600 to-indigo-700'
  },
  {
    nombre: 'Café de Altura',
    icon: Coffee,
    descripcion: 'Café orgánico cultivado a más de 1,200 msnm, con notas achocolatadas y aroma intenso.',
    temporada: 'Octubre - Marzo',
    color: 'from-brown-600 to-amber-800'
  },
  {
    nombre: 'Hierbas Medicinales',
    icon: Trees,
    descripcion: 'Sabiduría ancestral en el uso de hierbas como manzanilla, árnica y yerbabuena.',
    temporada: 'Todo el año',
    color: 'from-green-500 to-emerald-600'
  }
];

// --- Datos de Platos Típicos ---
const platosData = [
  {
    nombre: 'Mole de Caderas',
    descripcion: 'Plato ceremonial preparado con chivo, especias y chocolate. Patrimonio gastronómico de la región.',
    ingredientes: ['Chivo', 'Chiles mulatos', 'Chocolate', 'Ajonjolí', 'Especias'],
    temporada: 'Octubre',
    icon: ChefHat
  },
  {
    nombre: 'Tamales de Frijol',
    descripcion: 'Tamales envueltos en hoja de maíz, rellenos de frijol negro y hierbas de la región.',
    ingredientes: ['Maíz', 'Frijol negro', 'Hoja de maíz', 'Epazote'],
    temporada: 'Todo el año',
    icon: Utensils
  },
  {
    nombre: 'Atole de Maíz Blanco',
    descripcion: 'Bebida caliente preparada con maíz blanco molido, canela y piloncillo.',
    ingredientes: ['Maíz blanco', 'Canela', 'Piloncillo', 'Agua'],
    temporada: 'Temporada de frío',
    icon: Coffee
  }
];

// --- Eventos Gastronómicos ---
const eventosData = [
  {
    titulo: 'Feria del Maíz',
    fecha: '15-17 Octubre 2024',
    descripcion: 'Celebración de la cosecha del maíz con exhibiciones, concursos y degustaciones.',
    ubicacion: 'Plaza Principal',
    icon: Calendar
  },
  {
    titulo: 'Mercado Orgánico Semanal',
    fecha: 'Todos los sábados',
    descripcion: 'Venta directa de productos frescos de nuestras huertas familiares.',
    ubicacion: 'Mercado Comunitario',
    icon: Users
  },
  {
    titulo: 'Taller de Cocina Tradicional',
    fecha: 'Primer domingo de cada mes',
    descripcion: 'Aprende a preparar platillos ancestrales con nuestras cocineras tradicionales.',
    ubicacion: 'Casa de la Cultura',
    icon: ChefHat
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

export function GastronomiaContent({ onBack }: GastronomiaContentProps) {
  const [activeProduct, setActiveProduct] = useState(0);

  return (
    <section className="w-full bg-gradient-to-b from-amber-50 to-orange-50 py-16 sm:py-24">
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
              className="flex items-center space-x-2 text-amber-700 hover:text-amber-800 transition-colors mr-6"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Volver</span>
            </button>
          )}
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900">
              Gastronomía y <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">Agricultura</span>
            </h1>
            <p className="text-lg text-slate-600 mt-2 max-w-3xl">
              Del campo a la mesa: preservando nuestra soberanía alimentaria y sabores ancestrales
            </p>
          </div>
        </motion.div>

        {/* --- Hero Section --- */}
        <motion.div
          className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-3xl p-8 md:p-12 text-white mb-16 shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Raíces que Alimentan
              </h2>
              <p className="text-amber-100 text-lg leading-relaxed mb-6">
                En San Juan Tahitic, la tierra no solo nos da sustento, sino identidad. 
                Nuestra agricultura milpa y cocina tradicional son el legado vivo de generaciones 
                que han sabido convivir en armonía con la naturaleza.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white/20 rounded-lg px-4 py-2 backdrop-blur-sm">
                  <span className="font-semibold">Agricultura Orgánica</span>
                </div>
                <div className="bg-white/20 rounded-lg px-4 py-2 backdrop-blur-sm">
                  <span className="font-semibold">Cocina Ancestral</span>
                </div>
                <div className="bg-white/20 rounded-lg px-4 py-2 backdrop-blur-sm">
                  <span className="font-semibold">Comercio Justo</span>
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
              Cultivados con técnicas sostenibles que respetan los ciclos de la tierra
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-600 mx-auto rounded-full mt-4"></div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Navegación de Productos */}
            <div className="space-y-4">
              {productosData.map((producto, index) => (
                <motion.button
                  key={producto.nombre}
                  onClick={() => setActiveProduct(index)}
                  className={`w-full text-left p-6 rounded-2xl transition-all duration-300 ${
                    activeProduct === index
                      ? 'bg-white shadow-xl border-2 border-amber-200'
                      : 'bg-amber-100 hover:bg-amber-200'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${producto.color} mr-4`}>
                      <producto.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-lg">{producto.nombre}</h4>
                      <p className="text-slate-600 text-sm mt-1">{producto.temporada}</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Detalle del Producto */}
            <motion.div
              key={activeProduct}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <div className="flex items-center mb-6">
                <div className={`p-4 rounded-xl bg-gradient-to-r ${productosData[activeProduct].color} mr-4`}>
                 {React.createElement(productosData[activeProduct].icon, { className: 'h-8 w-8 text-white' })}
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-slate-900">{productosData[activeProduct].nombre}</h4>
                  <p className="text-amber-600 font-medium">{productosData[activeProduct].temporada}</p>
                </div>
              </div>
              <p className="text-slate-700 text-lg leading-relaxed mb-6">
                {productosData[activeProduct].descripcion}
              </p>
              <div className="bg-amber-50 rounded-xl p-4">
                <h5 className="font-semibold text-amber-800 mb-2">Características:</h5>
                <ul className="text-slate-700 space-y-1">
                  <li>• Cultivo 100% orgánico</li>
                  <li>• Técnicas agrícolas ancestrales</li>
                  <li>• Libre de agroquímicos</li>
                  <li>• Comercio justo y local</li>
                </ul>
              </div>
            </motion.div>
          </div>
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
              Recetas que han pasado de generación en generación, conservando nuestra identidad
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-600 mx-auto rounded-full mt-4"></div>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {platosData.map((plato, index) => (
              <motion.div
                key={plato.nombre}
                variants={cardVariants}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="bg-gradient-to-r from-amber-400 to-orange-500 p-6 text-white">
                  <div className="flex items-center">
                    <plato.icon className="h-8 w-8 mr-3" />
                    <h4 className="text-xl font-bold">{plato.nombre}</h4>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-slate-700 mb-4 leading-relaxed">{plato.descripcion}</p>
                  
                  <div className="mb-4">
                    <h5 className="font-semibold text-slate-800 mb-2">Ingredientes principales:</h5>
                    <div className="flex flex-wrap gap-2">
                      {plato.ingredientes.map((ingrediente) => (
                        <span 
                          key={ingrediente}
                          className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm"
                        >
                          {ingrediente}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center text-slate-600 text-sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{plato.temporada}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* --- Eventos y Actividades --- */}
        <div className="mb-16">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Eventos Gastronómicos</h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Participa en nuestras actividades y conoce de cerca nuestra riqueza culinaria
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
            {eventosData.map((evento, index) => (
              <motion.div
                key={evento.titulo}
                variants={cardVariants}
                className="bg-white rounded-2xl shadow-lg p-6 border border-amber-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start mb-4">
                  <div className="bg-amber-100 p-3 rounded-xl mr-4">
                    <evento.icon className="h-6 w-6 text-amber-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-lg">{evento.titulo}</h4>
                    <p className="text-amber-600 text-sm font-medium mt-1">{evento.fecha}</p>
                  </div>
                </div>
                
                <p className="text-slate-600 mb-4">{evento.descripcion}</p>
                
                <div className="flex items-center text-slate-500 text-sm">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{evento.ubicacion}</span>
                </div>
                
                <button className="mt-4 w-full bg-amber-500 text-white py-2 rounded-lg font-medium hover:bg-amber-600 transition-colors">
                  Más información
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* --- Llamada a la Acción --- */}
        <motion.div
          className="text-center bg-gradient-to-r from-amber-500 to-orange-600 rounded-3xl p-10 md:p-12 shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-white mb-4">¿Quieres probar nuestros sabores?</h3>
          <p className="text-amber-100 text-lg max-w-2xl mx-auto mb-6">
            Visita nuestro mercado comunitario o participa en nuestros talleres de cocina tradicional. 
            Descubre el verdadero sabor de San Juan Tahitic.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-amber-600 px-8 py-3 rounded-lg font-bold hover:bg-amber-50 transition-colors shadow-lg">
              Ver Calendario de Eventos
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white/10 transition-colors">
              Contactar Productores
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}