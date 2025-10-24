import { useRef, useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import productsData from '../archivos_data/cooperativa-products.json';
import { ProductCard } from '../comunidad/section-servicios/ProductCard';
import { ProductDetail } from '../comunidad/section-servicios/ProductDetail';
import { useNavigate } from "react-router-dom";


export type Product = (typeof productsData)[0];

export function ServiciosSection() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const navigate = useNavigate();
  const gridRef = useRef<HTMLDivElement>(null);



  return (
    // 1. LIMPIEZA: Quitamos todo el padding (py-10, px-4, etc.) de la sección principal.
    // El Hero se encargará de su propio espacio.
    <section id="servicios" className="relative min-h-screen bg-stone-50">
      
      {/* Botón de Regresar (para el modal) - Este es 'fixed', así que su posición es correcta. */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onClick={() => setSelectedProduct(null)}
            className="fixed top-28 left-4 sm:left-8 z-50 flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm font-semibold text-gray-800 shadow-lg backdrop-blur-md transition-transform hover:scale-105"
            aria-label="Regresar a la galería"
          >
            <ArrowLeft size={16} />
            Regresar a la Galería
          </motion.button>
        )}
      </AnimatePresence>

      {/* 2. REESTRUCTURACIÓN: El Hero Slider AHORA es hijo directo de la <section>.
           Así ocupará todo el ancho disponible. */}

      {/* 3. REESTRUCTURACIÓN: Creamos un NUEVO div contenedor para el resto del contenido.
           Este div recibe la ref y el padding que antes tenía la sección. */}
      <div ref={gridRef} className="max-w-7xl mx-auto py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        
        {/* El botón de regresar (navigate) va DENTRO del contenido, no antes. */}
        {!selectedProduct && (
          <div className="mb-10">
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold shadow-lg hover:scale-105 transition-all"
            >
              ← Regresar
            </button>
          </div>
        )}

        {/* 4. LIMPIEZA: Eliminamos el encabezado duplicado. Dejamos solo "Nuestra Colección". */}
        {!selectedProduct && (
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-16">
            Nuestra Colección
          </h2>
        )}

        {/* Cuadrícula de Productos */}
        {!selectedProduct && (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
          >
            {productsData.map((product) => (
              <ProductCard key={product.id} product={product} onSelect={() => setSelectedProduct(product)} />
            ))}
          </motion.div>
        )}

        {/* Vista Detallada del Producto */}
        <AnimatePresence>
          {selectedProduct && (
            <ProductDetail product={selectedProduct} />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}