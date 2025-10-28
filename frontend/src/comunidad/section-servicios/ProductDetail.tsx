// ProductDetail.tsx (Versión mejorada con scroll y mobile-first)
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Coffee, Leaf, Sun, Wine, Droplet, FlaskConical,
  Sprout, Flower, Beef, Star, Calendar, Users,
  Shield, CheckCircle, ArrowLeft, Share2, Heart,
  Maximize2, X, ChevronDown, ChevronUp
} from 'lucide-react';
import { type Product } from '../ServiciosSection';
import { useState, useRef, useEffect } from 'react';

const iconMap: { [key: string]: React.ComponentType<any> } = { 
  Coffee, Leaf, Sun, Wine, Droplet, FlaskConical,
  Sprout, Flower, Bee: Beef, Star, Calendar, Users, Shield, CheckCircle
};

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
}

const getIconComponent = (iconName: string): React.ComponentType<any> => {
  return iconMap[iconName] || Leaf;
};

export function ProductDetail({ product, onClose }: ProductDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageExpanded, setIsImageExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const allImages = [product.mainImage, ...(product.galleryImages || [])];
  const [isLiked, setIsLiked] = useState(false);

  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scroll al top cuando cambia el producto
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [product]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === allImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? allImages.length - 1 : prev - 1
    );
  };

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const hasVariants = product.variants && product.variants.length > 0;
  const hasFeatures = product.features && product.features.length > 0;
  const hasGallery = allImages.length > 1;

  // Secciones colapsables para móvil
  const sections = [
    {
      id: 'description',
      title: 'Descripción',
      content: product.description,
      icon: null,
      alwaysOpen: true
    },
    {
      id: 'story',
      title: 'Nuestra Historia',
      content: product.story,
      icon: Users,
      alwaysOpen: false
    },
    {
      id: 'materials',
      title: 'Ingredientes y Proceso',
      content: null,
      icon: Shield,
      alwaysOpen: false,
      customContent: (
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-700 mb-3">Materiales Principales</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {product.materials.map((material, index) => {
                const Icon = getIconComponent(material.icon);
                return (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Icon className="h-4 w-4 text-amber-600 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{material.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
          {product.process && (
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Proceso Artesanal</h4>
              <p className="text-gray-600 leading-relaxed text-sm bg-amber-50 p-4 rounded-lg border border-amber-100">
                {product.process}
              </p>
            </div>
          )}
        </div>
      )
    },
    ...(hasFeatures ? [{
      id: 'features',
      title: 'Características Destacadas',
      content: null,
      icon: CheckCircle,
      alwaysOpen: false,
      customContent: (
        <div className="grid grid-cols-1 gap-3">
          {product.features!.map((feature, index) => (
            <div key={index} className="flex items-start gap-3 bg-green-50 p-4 rounded-lg">
              <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
            </div>
          ))}
        </div>
      )
    }] : []),
    ...(product.producer ? [{
      id: 'producer',
      title: 'Elaborado por',
      content: product.producer,
      icon: null,
      alwaysOpen: false
    }] : [])
  ];

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
          {/* Header con controles */}
          <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 z-20 flex justify-between items-center">
            <button
              onClick={onClose}
              className="bg-white/90 backdrop-blur-sm rounded-full p-2 sm:p-3 shadow-lg hover:scale-110 transition-transform duration-200"
            >
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700" />
            </button>
            <div className="flex gap-1 sm:gap-2">
              <button
                onClick={() => setIsImageExpanded(true)}
                className="bg-white/90 backdrop-blur-sm rounded-full p-2 sm:p-3 shadow-lg hover:scale-110 transition-transform duration-200"
              >
                <Maximize2 className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700" />
              </button>
              <button className="bg-white/90 backdrop-blur-sm rounded-full p-2 sm:p-3 shadow-lg hover:scale-110 transition-transform duration-200">
                <Share2 className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700" />
              </button>
            </div>
          </div>

          <div className={`flex-1 min-h-0 flex ${isMobile ? 'flex-col' : 'flex-row'}`}>
            {/* Columna de la Galería */}
            <div className={`relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 ${
              isMobile ? 'h-64 sm:h-80 flex-shrink-0' : 'w-1/2 min-h-0'
            }`}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={allImages[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover cursor-zoom-in"
                  onClick={() => setIsImageExpanded(true)}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>

              {/* Controles de galería */}
              {hasGallery && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 sm:p-3 shadow-lg hover:scale-110 transition-all duration-200"
                  >
                    <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 sm:p-3 shadow-lg hover:scale-110 transition-all duration-200 rotate-180"
                  >
                    <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700" />
                  </button>
                  
                  {/* Indicadores de imagen */}
                  <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1 sm:gap-2">
                    {allImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                          index === currentImageIndex 
                            ? 'bg-white scale-125' 
                            : 'bg-white/50 hover:bg-white/80'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}

              {/* Badges en imagen */}
              <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex flex-col gap-1 sm:gap-2">
                {product.highlight && (
                  <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2 py-1 sm:px-3 sm:py-2 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                    <Star className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Destacado</span>
                  </div>
                )}
                {product.seasonal && (
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-1 sm:px-3 sm:py-2 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Temporada</span>
                  </div>
                )}
              </div>
            </div>

            {/* Columna de Información - Con scroll */}
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
                    className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight"
                  >
                    {product.name}
                  </motion.h2>
                  
                  <motion.div 
                    layoutId={`product-tag-${product.id}`}
                    className={`inline-block bg-gradient-to-r ${
                      product.color || 'from-gray-500 to-gray-600'
                    } text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold mt-2 sm:mt-3 shadow-lg`}
                  >
                    {product.tag}
                  </motion.div>
                </div>

                {/* Información de precio */}
                {product.price && (
                  <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl sm:rounded-2xl border border-emerald-100">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="text-2xl sm:text-3xl font-bold text-emerald-600">
                        ${product.price}
                      </span>
                      {product.unit && (
                        <span className="text-base sm:text-lg text-gray-500">/{product.unit}</span>
                      )}
                      {hasVariants && (
                        <span className="text-xs sm:text-sm text-gray-500 ml-2">
                          ({product.variants!.length} variantes)
                        </span>
                      )}
                    </div>
                    
                    {/* Estado de stock */}
                    <div className="flex items-center gap-2 sm:gap-3 mt-2">
                      {product.available ? (
                        <div className="flex items-center gap-2 text-green-600">
                          <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                          <span className="font-semibold text-sm sm:text-base">Disponible</span>
                          {product.stock && (
                            <span className="text-xs sm:text-sm text-green-700">
                              ¡Visitanos!
                            </span>
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-red-600">
                          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
                          <span className="font-semibold text-sm sm:text-base">Agotado</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Secciones de contenido */}
                <div className="space-y-3 sm:space-y-4">
                  {sections.map((section) => {
                    const isOpen = section.alwaysOpen || activeSection === section.id;
                    const SectionIcon = section.icon;

                    if (isMobile && !section.alwaysOpen) {
                      return (
                        <div key={section.id} className="border border-gray-200 rounded-xl overflow-hidden">
                          <button
                            onClick={() => toggleSection(section.id)}
                            className="w-full p-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-between text-left"
                          >
                            <div className="flex items-center gap-3">
                              {SectionIcon && <SectionIcon className="h-5 w-5 text-amber-600" />}
                              <span className="font-semibold text-gray-800">{section.title}</span>
                            </div>
                            {isOpen ? (
                              <ChevronUp className="h-5 w-5 text-gray-500" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-gray-500" />
                            )}
                          </button>
                          
                          <AnimatePresence>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="p-4 bg-white">
                                  {section.customContent || (
                                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                                      {section.content}
                                    </p>
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    }

                    // Vista desktop o secciones siempre abiertas
                    return (
                      <div key={section.id} className="bg-white rounded-xl p-4 sm:p-0 sm:bg-transparent">
                        <div className="flex items-center gap-3 mb-3">
                          {SectionIcon && <SectionIcon className="h-5 w-5 text-amber-600" />}
                          <h3 className="font-semibold text-gray-800 text-lg">{section.title}</h3>
                        </div>
                        {section.customContent || (
                          <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                            {section.content}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Botones de acción - Fijos en la parte inferior */}
              <div className="p-4 sm:p-6 lg:p-8 border-t border-gray-200 bg-white">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <a
                    href="/contacto"
                    className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 text-white text-center py-3 sm:py-4 px-6 rounded-xl sm:rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 text-sm sm:text-base"
                  >
                    <Users className="h-4 w-4 sm:h-5 sm:w-5" />
                    Solicitar Información
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Modal de Imagen Expandida */}
      <AnimatePresence>
        {isImageExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4"
            onClick={() => setIsImageExpanded(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-7xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsImageExpanded(false)}
                className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 sm:p-3 text-white hover:bg-white/30 transition-colors duration-200 z-10"
              >
                <X className="h-4 w-4 sm:h-6 sm:w-6" />
              </button>
              
              <img
                src={allImages[currentImageIndex]}
                alt={product.name}
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
              />
              
              {hasGallery && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-2 sm:p-4 text-white hover:bg-white/30 transition-colors duration-200"
                  >
                    <ArrowLeft className="h-4 w-4 sm:h-6 sm:w-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-2 sm:p-4 text-white hover:bg-white/30 transition-colors duration-200 rotate-180"
                  >
                    <ArrowLeft className="h-4 w-4 sm:h-6 sm:w-6" />
                  </button>
                  
                  <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1 sm:gap-2">
                    {allImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                          index === currentImageIndex 
                            ? 'bg-white scale-125' 
                            : 'bg-white/50 hover:bg-white/80'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}