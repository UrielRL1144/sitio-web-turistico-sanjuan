// src/components/TimelineModal.tsx
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

// Reutilizamos la interfaz, así que hay que exportarla desde RootsSection
// o definirla en un archivo de tipos compartido (ej. types.ts)
interface TimelineItemProps {
  id: number; year: string; category: string; icon: string;
  title: string; description: string; image: string;
  modalContent?: {
    text: string;
    images?: string[];
  } | null;
}

interface ModalProps {
  item: TimelineItemProps;
  onClose: () => void;
  onImageClick: (index: number) => void; // 👇 1. Nueva prop para manejar el clic
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { y: "-100vh", opacity: 0 },
  visible: { y: "0", opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 15 } },
}as const;; 

export function TimelineModal({ item, onClose, onImageClick }: ModalProps) {
  if (!item.modalContent) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      onClick={onClose} // Cierra al hacer clic en el fondo
    >
      <motion.div
        className="relative bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        variants={modalVariants}
        onClick={(e) => e.stopPropagation()} // Evita que el clic en el modal se propague al fondo
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-slate-500 hover:text-slate-800 transition-colors z-10"
          aria-label="Cerrar modal"
        >
          <X size={28} />
        </button>

        {/* Galería de Imágenes */}
        {item.modalContent.images && item.modalContent.images.length > 0 && (
          <div className="grid grid-cols-3 gap-1">
            {item.modalContent.images.map((img, index) => (
              <img 
                key={index} 
                src={img} 
                alt={`${item.title} - imagen ${index + 1}`} 
                className="w-full h-32 object-cover cursor-pointer" 
                // 👇 3. El clic aquí abrirá el lightbox en la imagen correcta
                // El índice es 'index + 1' porque la imagen principal es la 0.
                onClick={() => onImageClick(index + 1)}
              />
            ))}
          </div>
        )}

        {/* Contenido de Texto */}
        <div className="p-8">
          <p className="text-sm font-semibold text-teal-600 mb-2">{item.category} - {item.year}</p>
          <h2 className="text-3xl font-bold text-slate-800 mb-4">{item.title}</h2>
          <p className="text-slate-600 leading-relaxed whitespace-pre-line">
            {item.modalContent.text}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}