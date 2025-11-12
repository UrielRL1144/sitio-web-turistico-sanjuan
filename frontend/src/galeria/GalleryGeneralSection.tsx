// GalleryGeneralSection.tsx
import { useGallery } from './section/hooks/useGallery';
import { GalleryVideo } from './section/GalleryVideo';
import { CircularGallery } from './section/CircularGallery';
import { GridGallery } from './section/GridGallery';
import { ImageModal } from './section/ImageModal';
import { ViewModeToggle } from './section/ViewModeToggle';
import { motion } from 'framer-motion';
import { YouTubeModal } from './section/YouTubeModal';
import { useTranslation } from '../contexts/TranslationContext'; // ← AGREGAR IMPORT
import { useState, useMemo } from 'react'; // ← AGREGAR IMPORT
// Importar todos los archivos de datos
import galleryDataEs from '../archivos_data/gallery-data.es.json';
import galleryDataEn from '../archivos_data/gallery-data.en.json';
import galleryDataNah from '../archivos_data/gallery-data.nah.json';

export function GalleryGeneralSection() {
  const { language } = useTranslation(); // ← AGREGAR HOOK
  // Seleccionar datos según el idioma - NUEVO
  const galleryImages = useMemo(() => {
    switch (language) {
      case 'es':
        return (galleryDataEs as any).galleryImages;
      case 'en':
        return (galleryDataEn as any).galleryImages;
      case 'nah':
        return (galleryDataNah as any).galleryImages;
      default:
        return (galleryDataEs as any).galleryImages;
    }
  }, [language]);
  const {
    selectedImage,
    currentImageIndex,
    selectedCategory,
    viewMode,
    zoomLevel,
    categories,
    isMobile,
    filteredImages,
    currentImage,
    setSelectedCategory,
    setViewMode,
    openImage,
    closeImage,
    nextImage,
    prevImage,
    handleZoomIn,
    handleZoomOut,
    handleResetZoom,
    getCircularPosition,
    isYouTubeModalOpen,
    setIsYouTubeModalOpen,
    isVideoHovered,
    setIsVideoHovered,
    formatDate,
  } = useGallery(galleryImages);

  const { t } = useTranslation(); // ← AGREGAR HOOK

  // Función para obtener el nombre traducido de la categoría
  const getTranslatedCategory = (category: string) => {
    switch (category) {
      case 'paisajes': return t('gallery.landscapes');
      case 'naturaleza': return t('gallery.nature');
      case 'cultura': return t('gallery.culture');
      case 'comunidad': return t('gallery.community');
      case 'tradiciones': return t('gallery.traditions');
      default: return category;
    }
  };

  const handleVideoClick = () => {
    setIsYouTubeModalOpen(true);
  };

  const handleVideoHover = (hovered: boolean) => {
    setIsVideoHovered(hovered);
  };

  return (
    <section id="galeria" className="py-20 relative overflow-hidden min-h-screen">
      {/* Fondo con imagen SVG */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/galeria/fondo-galeria.svg)' }}
      />

      {/* Overlay para mejor legibilidad */}
      <div className="absolute inset-0 bg-black/45 backdrop-blur-[1px]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Encabezado */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 id="roots-heading" className="text-5xl lg:text-6xl font-bold font-serif text-gray-200 mb-6">
            {t('gallery.titlePart1')}{' '} {/* ← TRADUCIBLE */}
            <span className="bg-gradient-to-r from-teal-300 via-blue-400 to-emerald-500 bg-clip-text text-transparent">
              {t('gallery.titlePart2')}{' '} {/* ← TRADUCIBLE */}
            </span>
            <span className="bg-gradient-to-r from-teal-100 via-blue-200 to-emerald-300 bg-clip-text text-transparent">
              {t('gallery.titlePart3')} {/* ← TRADUCIBLE */}
            </span>
          </h2>
        </motion.div>

        {/* ✅ LAYOUT MEJORADO CON COMPONENTES EXISTENTES */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* SIDEBAR IZQUIERDO COMPLETO */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full lg:w-64 flex-shrink-0 lg:-ml-4"
          >
            <div className="bg-slate-800/20 backdrop-blur-sm rounded-4xl p-6 border border-slate-700/50 sticky top-8 space-y-6">
              
              {/* ✅ VIEW MODE TOGGLE EN SIDEBAR */}
              <ViewModeToggle
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                isMobile={isMobile}
              />

              {/* ✅ CATEGORÍAS VERTICALES */}
              <div>
                <h3 className="text-white font-semibold text-lg mb-4 font-serif">
                  {t('gallery.categoriesTitle')} {/* ← TRADUCIBLE */}
                </h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <motion.button
                      key={category}
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                        selectedCategory === category
                          ? 'bg-gradient-to-r from-blue-500 to-emerald-500 text-white shadow-lg'
                          : 'text-slate-300 hover:text-white hover:bg-slate-700/50 border border-slate-600/50'
                      }`}
                    >
                      {category === 'todas' 
                        ? `🌄 ${t('gallery.allCategories')}` // ← TRADUCIBLE
                        : `${
                            category === 'paisajes' ? '🏔️ ' :
                            category === 'naturaleza' ? '🌿 ' :
                            category === 'cultura' ? '🎨 ' :
                            category === 'comunidad' ? '👥 ' :
                            category === 'tradiciones' ? '📜 ' : '📸 '
                          }${getTranslatedCategory(category)}` // ← TRADUCIBLE
                      }
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* ✅ CONTADOR DE IMÁGENES */}
              <div className="pt-4 border-t border-slate-700/50">
                <p className="text-slate-400 text-sm">
                  {filteredImages.length} {filteredImages.length === 1 
                    ? t('gallery.imagesCount') // ← TRADUCIBLE
                    : t('gallery.imagesCount_plural') // ← TRADUCIBLE
                  }
                </p>
                <p className="text-slate-500 text-xs mt-1">
                  {t('gallery.categoryLabel')} {selectedCategory === 'todas' 
                    ? t('gallery.allCategoriesLabel') // ← TRADUCIBLE
                    : getTranslatedCategory(selectedCategory) // ← TRADUCIBLE
                  }
                </p>
              </div>
            </div>
          </motion.div>

          {/* ✅ CONTENIDO PRINCIPAL - MÁS ESPACIO */}
          <div className="flex-1 w-full min-w-0">
            {/* ✅ VIEW MODE TOGGLE EN PARTE SUPERIOR DERECHA */}
            <div className="flex justify-between items-start mb-6">
              {/* Espacio izquierdo para balance */}
              <div className="w-0 lg:w-32"></div>
              
              {/* Espacio derecho para balance */}
              <div className="w-0 lg:w-32"></div>
            </div>

            {/* ✅ GALERÍA PRINCIPAL CON MÁXIMO ESPACIO */}
            <div className="relative">
              <div className={`relative w-full mx-auto ${
                viewMode === 'grid' 
                  ? 'flex flex-col' 
                  : 'flex items-center justify-center min-h-[75vh]'
              }`}>
                
                {/* Video */}
                <div className={`
                  ${viewMode === 'grid' 
                    ? 'w-full mb-6' 
                    : 'relative z-10'
                  }
                `}>
                  <div className={`
                    ${viewMode === 'grid' 
                      ? 'w-full max-w-4xl mx-auto h-[350px] md:h-[450px] rounded-2xl overflow-hidden'
                      : 'w-44 h-44 md:w-52 md:h-52 rounded-2xl overflow-hidden'
                    }
                    transition-all duration-500
                  `}>
                    <GalleryVideo
                      isGridMode={viewMode === 'grid'}
                      onVideoClick={handleVideoClick}
                      isVideoHovered={isVideoHovered}
                      onVideoHover={handleVideoHover}
                    />
                  </div>
                </div>

                {/* Galería Circular */}
                {viewMode === 'circular' && filteredImages.length > 0 && (
                  <div className={`absolute inset-0 ${
                    isMobile ? 'scale-90' : 'scale-100'
                  } transition-transform duration-300`}>
                    <CircularGallery
                      images={filteredImages}
                      getCircularPosition={getCircularPosition}
                      onImageClick={openImage}
                    />
                  </div>
                )}

                {/* Grid Gallery */}
                {viewMode === 'grid' && filteredImages.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-4xl mx-auto"
                  >
                    <GridGallery
                      images={filteredImages}
                      onImageClick={openImage}
                    />
                  </motion.div>
                )}
              </div>
            </div>

            {/* ✅ LLAMADA A LA ACCIÓN */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center mt-12"
            >
              <div className="bg-gradient-to-r from-yellow-800 to-amber-900 rounded-3xl p-8 border border-slate-700/50 shadow-2xl">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 font-serif">
                  {t('gallery.communityCallToAction')} {/* ← TRADUCIBLE */}
                </h3>
                <p className="text-slate-300 text-lg mb-6 max-w-2xl mx-auto">
                  {t('gallery.communityDescription')} {/* ← TRADUCIBLE */}
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ✅ MODALES */}
        <ImageModal
          isOpen={!!selectedImage}
          onClose={closeImage}
          image={currentImage}
          currentIndex={currentImageIndex}
          totalImages={filteredImages.length}
          zoomLevel={zoomLevel}
          onNext={nextImage}
          onPrev={prevImage}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onResetZoom={handleResetZoom}
          formatDate={formatDate}
        />
        
        <YouTubeModal
          isOpen={isYouTubeModalOpen}
          onClose={() => setIsYouTubeModalOpen(false)}
          videoId="4r2isHLCNFo" 
        />
      </div>
    </section>
  );
}