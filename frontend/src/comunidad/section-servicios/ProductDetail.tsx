import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { type Product } from '../ServiciosSection';
import { useMobileDetection } from './ProductDetailComponents/hooks/useMobileDetection';
import { useProductImages } from './ProductDetailComponents/hooks/useProductImages';
import { useShareProduct } from './ProductDetailComponents/hooks/useShareProduct';
import { ProductHeader } from './ProductDetailComponents/ProductHeader';
import { ProductGallery } from './ProductDetailComponents/ProductGallery';
import { ProductSections } from './ProductDetailComponents/ProductSections';
import { ExpandedImageModal } from './ProductDetailComponents/ExpandedImageModal';
import { CheckCircle, Users } from 'lucide-react';
import { useTranslation } from '../../contexts/TranslationContext'; // ← AGREGAR IMPORT

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
}

export function ProductDetail({ product, onClose }: ProductDetailProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation(); // ← AGREGAR HOOK
  
  const isMobile = useMobileDetection();
  
  const {
    currentImageIndex,
    isImageExpanded,
    setIsImageExpanded,
    allImages,
    hasGallery,
    nextImage,
    prevImage,
    goToImage
  } = useProductImages(product);

  const {
    showShareOptions,
    setShowShareOptions,
    copiedToClipboard,
    handleShare,
    shareOnSocialMedia
  } = useShareProduct(product);

  // Scroll al top cuando cambia el producto
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [product]);

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const hasVariants = product.variants && product.variants.length > 0;

  return (
    <>
      {/* Modal Principal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          layoutId={`product-card-${product.id}`}
          className="max-w-6xl w-full h-[95vh] sm:h-[90vh] bg-white rounded-3xl sm:rounded-3xl shadow-2xl overflow-hidden relative flex flex-col"
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25 }}
        >
          <ProductHeader
            onClose={onClose}
            onExpandImage={() => setIsImageExpanded(true)}
            showShareOptions={showShareOptions}
            setShowShareOptions={setShowShareOptions}
            copiedToClipboard={copiedToClipboard}
            handleShare={handleShare}
            shareOnSocialMedia={shareOnSocialMedia}
          />

          <div className={`flex-1 min-h-0 flex ${isMobile ? 'flex-col' : 'flex-row'}`}>
            <ProductGallery
              product={product}
              currentImageIndex={currentImageIndex}
              hasGallery={hasGallery}
              allImages={allImages}
              onPrevImage={prevImage}
              onNextImage={nextImage}
              onGoToImage={goToImage}
              onExpandImage={() => setIsImageExpanded(true)}
              isMobile={isMobile}
            />

            {/* Columna de Información */}
            <div className={`flex flex-col flex-1 min-h-0 ${
              isMobile ? 'border-t border-gray-200' : ''
            }`}>
              <div 
                ref={contentRef}
                className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8"
              >
                {/* Header información */}
                <div className="mb-4 sm:mb-6">
                  <motion.h2 
                    layoutId={`product-name-${product.id}`}
                    className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-gray-900 leading-tight"
                  >
                    {product.name}
                  </motion.h2>
                  
                  <motion.div 
                    layoutId={`product-tag-${product.id}`}
                    className={`inline-block bg-gradient-to-r ${
                      product.color || 'from-gray-500 to-gray-600'
                    } text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold font-serif mt-2 sm:mt-3 shadow-lg`}
                  >
                    {product.tag}
                  </motion.div>
                </div>

                {/* Información de precio */}
                {product.price && (
                  <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl sm:rounded-2xl border border-emerald-100">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="text-2xl sm:text-3xl font-bold font-serif text-emerald-600">
                        ${product.price}
                      </span>
                      {product.unit && (
                        <span className="text-base sm:text-lg text-gray-500">/{product.unit}</span>
                      )}
                      {hasVariants && (
                        <span className="text-xs sm:text-sm text-gray-500 ml-2">
                          ({product.variants!.length} {t('services.variantsCount')}) {/* ← TRADUCIBLE */}
                        </span>
                      )}
                    </div>
                    
                    {/* Estado de stock */}
                    <div className="flex items-center gap-2 sm:gap-3 mt-2">
                      {product.available ? (
                        <div className="flex items-center gap-2 text-green-600">
                          <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                          <span className="font-semibold font-serif text-sm sm:text-base">
                            {t('services.available')} {/* ← TRADUCIBLE */}
                          </span>
                          {product.stock && (
                            <span className="text-xs sm:text-sm text-green-700">
                              {t('services.visitUs')} {/* ← TRADUCIBLE */}
                            </span>
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-red-600">
                          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
                          <span className="font-semibold font-serif text-sm sm:text-base">
                            {t('services.soldOut')} {/* ← TRADUCIBLE */}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <ProductSections
                  product={product}
                  activeSection={activeSection}
                  onToggleSection={toggleSection}
                  isMobile={isMobile}
                />
              </div>

              {/* Botones de acción */}
              <div className="p-4 sm:p-6 lg:p-8 border-t border-gray-200 bg-white">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <a
                    href="/contacto"
                    className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 text-white text-center py-3 sm:py-4 px-6 rounded-xl sm:rounded-2xl font-bold font-serif shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 text-sm sm:text-base"
                  >
                    <Users className="h-4 w-4 sm:h-5 sm:w-5" />
                    {t('services.requestInfo')} {/* ← TRADUCIBLE */}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Overlay para cerrar el menú de compartir */}
      <AnimatePresence>
        {showShareOptions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-10"
            onClick={() => setShowShareOptions(false)}
          />
        )}
      </AnimatePresence>

      <ExpandedImageModal
        isOpen={isImageExpanded}
        onClose={() => setIsImageExpanded(false)}
        currentImage={allImages[currentImageIndex]}
        alt={product.name}
        hasGallery={hasGallery}
        onPrevImage={prevImage}
        onNextImage={nextImage}
        onGoToImage={goToImage}
        currentImageIndex={currentImageIndex}
        allImages={allImages}
      />
    </>
  );
}