// components/ImageGalleryModal.tsx - VERSIÓN PANTALLA COMPLETA
import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut, RotateCw, Download, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePlaces } from '@/hooks/usePlaces';

interface GalleryImage {
  id: string;
  url_foto: string;
  descripcion: string;
  es_principal?: boolean;
  orden?: number;
}

interface ImageGalleryModalProps {
  placeId: string;
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export const ImageGalleryModal = ({
  placeId,
  initialIndex = 0,
  isOpen,
  onClose,
  title = 'Galería de imágenes'
}: ImageGalleryModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showControls, setShowControls] = useState(true);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { getPlaceGallery } = usePlaces();

  const currentImage = galleryImages[currentIndex];
  const hasMultipleImages = galleryImages.length > 1;

  // Cargar galería
  useEffect(() => {
    const loadGallery = async () => {
      if (!isOpen || !placeId) return;
      
      try {
        setLoading(true);
        setError(null);
        console.log('🔄 [ImageGalleryModal] Cargando galería para placeId:', placeId);
        
        const images = await getPlaceGallery(placeId);
        console.log('✅ [ImageGalleryModal] Galería cargada:', images?.length, 'imágenes');
        
        setGalleryImages(images || []);
        
        if (initialIndex >= (images?.length || 0)) {
          setCurrentIndex(0);
        } else {
          setCurrentIndex(initialIndex);
        }
      } catch (err) {
        console.error('❌ [ImageGalleryModal] Error cargando galería:', err);
        setError('Error al cargar la galería de imágenes');
        setGalleryImages([]);
      } finally {
        setLoading(false);
      }
    };

    loadGallery();
  }, [isOpen, placeId, getPlaceGallery, initialIndex]);

  // Resetear estado cuando cambia la imagen o se abre/cierra el modal
  useEffect(() => {
    if (isOpen && galleryImages.length > 0) {
      setZoom(1);
      setRotation(0);
      setPosition({ x: 0, y: 0 });
      setShowControls(true);
      
      // Ocultar controles después de 3 segundos
      const timer = setTimeout(() => {
        setShowControls(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, currentIndex, galleryImages.length]);

  // Mostrar controles temporalmente cuando cambia la imagen
  useEffect(() => {
    if (galleryImages.length > 0) {
      setShowControls(true);
      const timer = setTimeout(() => {
        setShowControls(false);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [currentIndex, galleryImages.length]);

  // Navegación con teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || galleryImages.length === 0) return;

      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
        case '+':
        case '=':
          handleZoomIn();
          break;
        case '-':
          handleZoomOut();
          break;
        case 'r':
        case 'R':
          handleRotate();
          break;
        case '0':
          resetTransform();
          break;
        case ' ':
          setShowControls(prev => !prev);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, galleryImages.length, onClose]);

  const goToPrevious = useCallback(() => {
    if (!hasMultipleImages) return;
    setCurrentIndex(prev => (prev === 0 ? galleryImages.length - 1 : prev - 1));
    resetTransform();
  }, [hasMultipleImages, galleryImages.length]);

  const goToNext = useCallback(() => {
    if (!hasMultipleImages) return;
    setCurrentIndex(prev => (prev === galleryImages.length - 1 ? 0 : prev + 1));
    resetTransform();
  }, [hasMultipleImages, galleryImages.length]);

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.25, 1));
  };

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  const resetTransform = () => {
    setZoom(1);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
  };

  const handleDownload = () => {
    if (!currentImage) return;
    
    const link = document.createElement('a');
    link.href = currentImage.url_foto;
    link.download = `imagen-${currentIndex + 1}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || zoom <= 1) return;
    
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    
    const limit = (zoom - 1) * 100;
    setPosition({
      x: Math.max(Math.min(newX, limit), -limit),
      y: Math.max(Math.min(newY, limit), -limit)
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const toggleControls = () => {
    setShowControls(prev => !prev);
  };

  // No renderizar si no está abierto
  if (!isOpen) return null;

  // Estados de carga
  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
        <div className="text-white text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-sm text-gray-300">Cargando galería...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div className="text-white text-center">
          <p className="text-lg mb-4">❌ Error</p>
          <p className="text-sm text-gray-300 mb-4">{error}</p>
          <Button
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700"
          >
            Cerrar
          </Button>
        </div>
      </div>
    );
  }

  if (!currentImage || galleryImages.length === 0) {
    return (
      <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div className="text-white text-center">
          <p className="text-lg mb-4">📷</p>
          <p className="text-sm text-gray-300">No hay imágenes en la galería</p>
          <Button
            onClick={onClose}
            className="mt-4 bg-gray-600 hover:bg-gray-700"
          >
            Cerrar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        // Cerrar al hacer clic en el fondo (pero no en la imagen o controles)
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* Botón de cerrar */}
      {showControls && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-40 bg-black/50 rounded-full p-2 backdrop-blur-sm"
        >
          <X className="w-8 h-8" />
        </button>
      )}

      {/* Controles superiores */}
      {showControls && (
        <div className="absolute top-4 left-4 z-40 flex items-center gap-2 bg-black/50 rounded-lg p-3 backdrop-blur-sm">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDownload}
            className="text-white hover:bg-white/20"
            title="Descargar imagen"
          >
            <Download className="w-4 h-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleRotate}
            className="text-white hover:bg-white/20"
            title="Rotar imagen (R)"
          >
            <RotateCw className="w-4 h-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleZoomOut}
            disabled={zoom <= 1}
            className="text-white hover:bg-white/20 disabled:opacity-50"
            title="Zoom out (-)"
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleZoomIn}
            disabled={zoom >= 3}
            className="text-white hover:bg-white/20 disabled:opacity-50"
            title="Zoom in (+)"
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={resetTransform}
            disabled={zoom === 1 && rotation === 0}
            className="text-white hover:bg-white/20 disabled:opacity-50"
            title="Reset transformación (0)"
          >
            <span className="text-sm">⟲</span>
          </Button>
        </div>
      )}

      {/* Navegación entre imágenes */}
      {hasMultipleImages && showControls && (
        <>
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-40 text-white hover:bg-white/20 bg-black/50 backdrop-blur-sm"
            title="Imagen anterior (←)"
          >
            <ChevronLeft className="w-8 h-8" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-40 text-white hover:bg-white/20 bg-black/50 backdrop-blur-sm"
            title="Siguiente imagen (→)"
          >
            <ChevronRight className="w-8 h-8" />
          </Button>
        </>
      )}

      {/* Imagen principal */}
      <div 
        className="relative max-w-full max-h-full flex items-center justify-center"
        onDoubleClick={toggleControls}
      >
        <div
          className={cn(
            "relative transition-transform duration-200",
            isDragging ? "cursor-grabbing" : zoom > 1 ? "cursor-grab" : "cursor-default"
          )}
          style={{
            transform: `scale(${zoom}) rotate(${rotation}deg) translate(${position.x}px, ${position.y}px)`,
            transformOrigin: 'center center'
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <img
            src={currentImage.url_foto}
            alt={currentImage.descripcion}
            className="max-w-screen max-h-screen object-contain rounded-lg shadow-lg"
            draggable={false}
          />
        </div>
      </div>

      {/* Información de la imagen */}
      {showControls && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-40 max-w-2xl w-full px-4">
          <div className="bg-black/70 backdrop-blur-sm text-white p-4 rounded-lg text-center">
            {/* Título y posición */}
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">{title}</h3>
              {hasMultipleImages && (
                <span className="text-sm text-gray-300 bg-black/50 px-2 py-1 rounded">
                  {currentIndex + 1} / {galleryImages.length}
                </span>
              )}
            </div>
            
            {/* Descripción */}
            {currentImage.descripcion && (
              <p className="text-sm leading-relaxed">{currentImage.descripcion}</p>
            )}
            
            {/* Indicadores de zoom y rotación */}
            {(zoom !== 1 || rotation !== 0) && (
              <div className="flex justify-center gap-4 mt-2 text-xs text-gray-300">
                {zoom > 1 && <span>Zoom: {zoom.toFixed(1)}x</span>}
                {rotation !== 0 && <span>Rotación: {rotation}°</span>}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Indicador de posición inferior derecho (mínimo) */}
      {!showControls && hasMultipleImages && (
        <div className="absolute bottom-4 right-4 z-40 bg-black/70 text-white px-3 py-2 rounded-lg text-sm backdrop-blur-sm">
          <span>{currentIndex + 1} / {galleryImages.length}</span>
        </div>
      )}

      {/* Overlay para navegación táctil */}
      {hasMultipleImages && (
        <div className="absolute inset-0 z-30 flex justify-between items-center pointer-events-none">
          <div 
            className="h-full w-1/4 flex items-center justify-start opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
            onClick={goToPrevious}
          >
            <div className="bg-black/30 text-white p-2 rounded-full ml-4 pointer-events-auto">
              <ChevronLeft className="w-6 h-6" />
            </div>
          </div>
          <div 
            className="h-full w-1/4 flex items-center justify-end opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
            onClick={goToNext}
          >
            <div className="bg-black/30 text-white p-2 rounded-full mr-4 pointer-events-auto">
              <ChevronRight className="w-6 h-6" />
            </div>
          </div>
        </div>
      )}

      {/* Instrucciones de uso (solo mostrar brevemente al abrir) */}
      {showControls && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-40 bg-black/70 text-white px-4 py-2 rounded-lg text-sm backdrop-blur-sm text-center">
          <p>Doble clic para alternar controles • Espacio para mostrar/ocultar • ESC para salir</p>
        </div>
      )}
    </div>
  );
};