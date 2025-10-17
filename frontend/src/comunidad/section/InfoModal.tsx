// src/components/InfoModal.tsx
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle } from 'lucide-react';
import { type ElementType, type ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  Icon: ElementType;
  gradient: string;
  children: ReactNode; // Aceptará cualquier contenido JSX
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 200, damping: 25 } },
} as const;

export function InfoModal({ isOpen, onClose, title, Icon, gradient, children }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <motion.div
            className="relative bg-slate-50 rounded-2xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-y-auto flex flex-col"
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()}
          >
            {/* --- Encabezado del Modal --- */}
            <div className={`sticky top-0 bg-gradient-to-r ${gradient} p-6 flex items-center justify-between text-white rounded-t-2xl`}>
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-xl">
                  <Icon className="h-8 w-8" />
                </div>
                <h2 className="text-2xl font-bold">{title}</h2>
              </div>
              <button
                onClick={onClose}
                className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors"
                aria-label="Cerrar modal"
              >
                <X size={24} />
              </button>
            </div>

            {/* --- Contenido Reutilizable --- */}
            <div className="p-8">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}