import { motion } from 'framer-motion';
import { type Product } from '../ServiciosSection';
import { Coffee, Leaf, Sun, Wine, Droplet, FlaskConical } from 'lucide-react';

const iconMap = { Coffee, Leaf, Sun, Wine, Droplet, FlaskConical };

export function ProductDetail({ product }: { product: Product }) {
  return (
    <motion.div
      layoutId={`product-card-${product.id}`}
      className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden"
    >
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Columna de la Imagen */}
        <div className="overflow-hidden">
          <motion.img
            layoutId={`product-image-${product.id}`}
            src={product.mainImage}
            alt={product.name}
            className="w-full h-full object-cover min-h-[400px]"
          />
        </div>

        {/* Columna de Información */}
        <div className="p-8 flex flex-col">
          <motion.h2 layoutId={`product-name-${product.id}`} className="text-3xl font-bold text-gray-900">
            {product.name}
          </motion.h2>
          <motion.p layoutId={`product-tag-${product.id}`} className="text-md text-amber-800 font-semibold mt-1">
            {product.tag}
          </motion.p>

          {/* Origen con Orgullo */}
          <div className="mt-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
            Hecho con orgullo por la Cooperativa Comunitaria de San Juan Tahitic
          </div>
          
          <div className="my-6 border-t border-gray-200"></div>

          {/* Descripción Narrativa */}
          <p className="text-gray-700 leading-relaxed flex-grow">
            {product.story}
          </p>

          {/* Materiales */}
          <div className="mt-6">
            <h4 className="font-bold text-gray-800 mb-2">Materiales y Proceso</h4>
            <div className="flex flex-col gap-2">
              {product.materials.map((material) => {
                const Icon = iconMap[material.icon as keyof typeof iconMap];
                return (
                  <div key={material.text} className="flex items-center gap-2 text-gray-600">
                    <Icon className="w-4 h-4 text-amber-700" />
                    <span>{material.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Botón de Contacto */}
          <a
            href="/contacto" // O la ruta a tu formulario
            className="mt-8 text-center w-full rounded-full bg-amber-800 px-6 py-3 font-semibold text-white shadow-md transition-transform duration-300 hover:scale-105 hover:bg-amber-900"
          >
            Solicitar Información
          </a>
        </div>
      </div>
    </motion.div>
  );
}