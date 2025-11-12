import { motion } from 'framer-motion';
import { ArrowLeft, Maximize2, Share2, CheckCheck, X } from 'lucide-react';
import { ProductShare } from './ProductShare';
import { useTranslation } from '../../../contexts/TranslationContext'; // ← AGREGAR IMPORT

interface ProductHeaderProps {
  onClose: () => void;
  onExpandImage: () => void;
  showShareOptions: boolean;
  setShowShareOptions: (show: boolean) => void;
  copiedToClipboard: boolean;
  handleShare: () => void;
  shareOnSocialMedia: (platform: string) => void;
}

export function ProductHeader({ 
  onClose, 
  onExpandImage,
  showShareOptions,
  setShowShareOptions,
  copiedToClipboard,
  handleShare,
  shareOnSocialMedia
}: ProductHeaderProps) {
  const { t } = useTranslation(); // ← AGREGAR HOOK

  return (
    <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 z-20 flex justify-between items-center">
      {/* Grupo de botones a la IZQUIERDA: Regresar, Expandir y Compartir */}
      <div className="flex gap-1 sm:gap-2 relative">
        {/* Botón de retroceso */}
        <button
          onClick={onClose}
          className="bg-white/80 backdrop-blur-sm rounded-full p-2 sm:p-3 shadow-lg hover:scale-110 transition-transform duration-200"
          aria-label={t('services.goBack')} 
        >
          <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700" />
        </button>
        
        {/* Botón de expandir imagen */}
        <button
          onClick={onExpandImage}
          className="bg-white/90 backdrop-blur-sm rounded-full p-2 sm:p-3 shadow-lg hover:scale-110 transition-transform duration-200"
          aria-label={t('services.expandImage')} 
        >
          <Maximize2 className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700" />
        </button>
        
        {/* Componente de compartir */}
        <ProductShare
          showShareOptions={showShareOptions}
          setShowShareOptions={setShowShareOptions}
          copiedToClipboard={copiedToClipboard}
          handleShare={handleShare}
          shareOnSocialMedia={shareOnSocialMedia}
        />
      </div>
      
      {/* Botón de cierre (X) solo a la DERECHA */}
      <button
        onClick={onClose}
        className="bg-black backdrop-blur-sm rounded-full p-2 sm:p-3 shadow-lg hover:scale-110 transition-transform duration-200"
        aria-label={t('services.close')} 
      >
        <X className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
      </button>
    </div>
  );
}