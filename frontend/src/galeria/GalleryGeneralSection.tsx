// GalleryGeneralSection.tsx
import { useGallery } from './section/hooks/useGallery';
import { GalleryVideo } from './section/GalleryVideo';
import { CircularGallery } from './section/CircularGallery';
import { GridGallery } from './section/GridGallery';
import { ImageModal } from './section/ImageModal';
import { CategoryFilter } from './section/CategoryFilter';
import { ViewModeToggle } from './section/ViewModeToggle';
import { motion } from 'framer-motion';
import { BookOpen, Mountain } from 'lucide-react';
import { YouTubeModal } from './section/YouTubeModal';

// Datos de la galería
const galleryImages = [
  { 
    src: "/images/galeria/montanas-amanecer.jpg", 
    alt: "Amanecer en la Sierra Madre", 
    category: "paisajes",
    title: "Amanecer en la Sierra",
    description: "Los primeros rayos del sol acarician las cumbres ancestrales de nuestro territorio",
    date: "2024-01-15",
    location: "Cerro del Águila",
    photographer: "Juan Martínez"
  },
  { 
    src: "/images/galeria/Cascada.jpg", 
    alt: "Bosque de coníferas nativas", 
    category: "naturaleza",
    title: "Bosque Ancestral",
    description: "Donde los árboles centenarios guardan la memoria de nuestra tierra",
    date: "2024-02-03",
    location: "Bosque de los Abuelos",
    photographer: "María González"
  },
  { 
    src: "/images/galeria/san_juan-poster.webp", 
    alt: "Cascada cristalina en la montaña", 
    category: "naturaleza",
    title: "Cascada Xochitl",
    description: "El canto del agua que purifica y renueva la vida en nuestro ecosistema",
    date: "2024-01-22",
    location: "Cañada de las Flores",
    photographer: "Carlos Ruiz"
  },
  { 
    src: "/images/galeria/poster-hero.webp", 
    alt: "Tejidos tradicionales en telar", 
    category: "cultura",
    title: "Telares de Tradición",
    description: "Hilos que entrelazan historias, colores que pintan identidad",
    date: "2024-03-10",
    location: "Taller Comunitario",
    photographer: "Ana Torres"
  },
  { 
    src: "/images/galeria/Dia-muertos.png", 
    alt: "Trabajo colectivo en el campo", 
    category: "comunidad",
    title: "Tequio que Une",
    description: "Manos que trabajan juntas, corazones que laten al mismo ritmo",
    date: "2024-02-18",
    location: "Campos Comunales",
    photographer: "Pedro Hernández"
  },
  { 
    src: "/images/galeria/puente.jpeg", 
    alt: "Festival tradicional con danzas", 
    category: "tradiciones",
    title: "Danzas del Sol",
    description: "Ritmos ancestrales que celebran la conexión con el cosmos",
    date: "2024-03-15",
    location: "Plaza Principal",
    photographer: "Laura Mendoza"
  },
  { 
    src: "/images/galeria/Monte_virgen.jpg", 
    alt: "Arquitectura vernácula local", 
    category: "cultura",
    title: "Casas que Respiran",
    description: "Espacios construidos con materiales de la tierra, diseñados con sabiduría ancestral",
    date: "2024-03-05",
    location: "Barrio Antiguo",
    photographer: "Roberto Díaz"
  },
  { 
    src: "/images/galeria/punche.jpeg", 
    alt: "Niños aprendiendo en la naturaleza", 
    category: "comunidad",
    title: "Semillas del Mañana",
    description: "El conocimiento que florece entre juegos y risas en nuestro entorno natural",
    date: "2024-02-12",
    location: "Escuela al Aire Libre",
    photographer: "Sofia Castro"
  },
  { 
    src: "/images/galeria/maiz.jpg", 
    alt: "Preparación de comida tradicional", 
    category: "tradiciones",
    title: "Sabores que Cuentan",
    description: "Recetas que guardan el secreto de generaciones y el sabor de nuestra identidad",
    date: "2024-03-20",
    location: "Cocina Comunitaria",
    photographer: "Miguel Ángel"
  },
  { 
    src: "/images/galeria/milpa.jpeg", 
    alt: "Cielo estrellado sobre la comunidad", 
    category: "paisajes",
    title: "Manto Estrellado",
    description: "Noches donde el universo se acerca para susurrar secretos ancestrales",
    date: "2024-01-28",
    location: "Mirador Celestial",
    photographer: "Elena Morales"
  },
  { 
    src: "/images/galeria/licores.jpeg", 
    alt: "Hierbas medicinales y curandera", 
    category: "tradiciones",
    title: "Sabiduría Verde",
    description: "Plantas que sanan, manos que curan, conocimiento que perdura",
    date: "2024-02-25",
    location: "Jardín de Medicinas",
    photographer: "Isabel Ramírez"
  },
  { 
    src: "/images/galeria/cultura1.jpg", 
    alt: "Alfarería tradicional en barro", 
    category: "cultura",
    title: "Barro con Alma",
    description: "Arcilla que se transforma en vasijas que guardan nuestra esencia",
    date: "2024-03-08",
    location: "Taller de Alfarería",
    photographer: "José Luis"
  }
];

export function GalleryGeneralSection() {
  const {
    selectedImage,
    currentImageIndex, // ✅ Ahora está disponible
    selectedCategory,
    viewMode,
    zoomLevel, // ✅ Ahora está disponible
    isPlaying,
    isMuted,
    videoRef,
    categories,
    isMobile,
    filteredImages,
    currentImage,
    setSelectedCategory,
    setViewMode,
    setIsPlaying,
    setIsMuted,
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
  } = useGallery(galleryImages);

  // ✅ Función para abrir modal de YouTube
  const handleVideoClick = () => {
    setIsYouTubeModalOpen(true);
  };

  // ✅ Función para hover del video
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
            Mira,{' '}
            <span className="bg-gradient-to-r from-teal-300 via-blue-400 to-emerald-500 bg-clip-text text-transparent">
              siente,{' '}
            </span>
            <span className="bg-gradient-to-r from-teal-100 via-blue-200 to-emerald-300 bg-clip-text text-transparent">
              descubre
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
          <div className="bg-slate-800/20 backdrop-blur-sm rounded-4xl p-6 border border-slate-700/50 sticky top-8 space-y-">
            
            {/* ✅ VIEW MODE TOGGLE EN SIDEBAR */}
            <ViewModeToggle
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              isMobile={isMobile}
            />

      {/* ✅ CATEGORÍAS VERTICALES */}
      <div>
        <h3 className="text-white font-semibold text-lg mb-4 font-serif">
          Categorías
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
                      {category === 'todas' ? '🌄 Todas las Categorías' : 
                       `${
                         category === 'paisajes' ? '🏔️ ' :
                         category === 'naturaleza' ? '🌿 ' :
                         category === 'cultura' ? '🎨 ' :
                         category === 'comunidad' ? '👥 ' :
                         category === 'tradiciones' ? '📜 ' : '📸 '
                       }${category.charAt(0).toUpperCase() + category.slice(1)}`}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* ✅ CONTADOR DE IMÁGENES */}
              <div className="pt-4 border-t border-slate-700/50">
                <p className="text-slate-400 text-sm">
                  {filteredImages.length} {filteredImages.length === 1 ? 'imagen' : 'imágenes'}
                </p>
                <p className="text-slate-500 text-xs mt-1">
                  Categoría: {selectedCategory === 'todas' ? 'Todas' : selectedCategory}
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
                  ¿Formas parte de nuestra comunidad?
                </h3>
                <p className="text-slate-300 text-lg mb-6 max-w-2xl mx-auto">
                  Comparte tus momentos y contribuye a la memoria visual colectiva de San Juan Tahitic
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