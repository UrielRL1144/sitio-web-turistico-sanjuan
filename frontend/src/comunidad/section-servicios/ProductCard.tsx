import { motion } from 'framer-motion';
import { type Product } from '../ServiciosSection';

interface ProductCardProps {
  product: Product;
  onSelect: () => void;
}

export function ProductCard({ product, onSelect }: ProductCardProps) {
  return (
    <motion.div
      layoutId={`product-card-${product.id}`} // La clave de la animación
      onClick={onSelect}
      className="cursor-pointer rounded-2xl bg-white shadow-md transition-shadow duration-300 hover:shadow-xl"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      <div className="overflow-hidden rounded-t-2xl">
        <motion.img
          layoutId={`product-image-${product.id}`}
          src={product.mainImage}
          alt={product.name}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <motion.h3 layoutId={`product-name-${product.id}`} className="text-lg font-bold text-gray-800">
          {product.name}
        </motion.h3>
        <motion.p layoutId={`product-tag-${product.id}`} className="text-sm text-amber-700">
          {product.tag}
        </motion.p>
      </div>
    </motion.div>
  );
}