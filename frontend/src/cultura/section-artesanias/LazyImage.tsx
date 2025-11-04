// LazyImage.tsx
import { useState, useEffect } from 'react';
import type { LazyImageProps } from './types';

export const LazyImage: React.FC<LazyImageProps> = ({ 
  src, 
  alt, 
  className = '', 
  onLoad 
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      setImageSrc(src);
      setImageLoaded(true);
      onLoad?.();
    };
    
    img.onerror = () => {
      setHasError(true);
      setImageLoaded(true);
    };
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, onLoad]);

  if (hasError) {
    return (
      <div className={`${className} bg-gray-100 flex items-center justify-center rounded-2xl`}>
        <div className="text-gray-400 text-center p-4">
          <div className="w-8 h-8 mx-auto mb-2 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-xs">⚠️</span>
          </div>
          <span className="text-sm">Imagen no disponible</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center rounded-2xl">
          <div className="text-gray-400">Cargando artesanía...</div>
        </div>
      )}
      <img
        src={imageSrc}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 rounded-2xl ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        loading="lazy"
      />
    </div>
  );
};