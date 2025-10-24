// src/pages/ProductPage.tsx
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductHeroSlider } from '@/comunidad/section-servicios/ProductHeroSlider';
import { ServiciosSection } from '@/comunidad/ServiciosSection';

export function ProductPage() {
  const navigate = useNavigate();
  const serviciosSectionRef = useRef<HTMLDivElement>(null);

  const handleScrollClick = () => {
    serviciosSectionRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <div>
      <ProductHeroSlider onScrollClick={handleScrollClick} />
      
      {/* Sección de servicios con referencia */}
      <div ref={serviciosSectionRef}>
        <ServiciosSection />
      </div>
    </div>
  );
}