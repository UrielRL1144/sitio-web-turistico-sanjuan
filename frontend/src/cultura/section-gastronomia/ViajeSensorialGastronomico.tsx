// ViajeSensorialGastronomico.tsx - Versión híbrida
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeaderNavigation } from '../section-gastronomia/section-cocina/HeaderNavigation'; // MANTENER
import { FloatingNavigation } from '../section-gastronomia/section-cocina/FloatingNavigation';
import { HeroSection } from '../section-gastronomia/section-cocina/HeroSection';
import { RestaurantInfo } from '../section-gastronomia/section-cocina/RestaurantInfo';
import { FeaturedDishes } from '../section-gastronomia/section-cocina/FeaturedDishes';
import { LocationSection } from '../section-gastronomia/section-cocina/LocationSection';
import { CallToAction } from '../section-gastronomia/section-cocina/CallToAction';
import { ExpandedModal } from '../section-gastronomia/section-cocina/ExpandedModal';
import cocinasData from '../../archivos_data/cocinas-tradicionales.json';
import { Wifi, Car, TreePine, Users, Utensils, BookOpen, ChefHat, Sparkles, Calendar } from 'lucide-react';

export function ViajeSensorialGastronomico() {
  const [cocinaActiva, setCocinaActiva] = useState(0);
  const [restauranteExpandido, setRestauranteExpandido] = useState<any>(null);
  const [showFloatingNav, setShowFloatingNav] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  const cocinas = cocinasData.cocinas;
  const cocina = cocinas[cocinaActiva];

   // Detectar cuando el usuario está en la sección de cocinas
  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('cocinas-section');
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const isInView = rect.top <= 100 && rect.bottom >= 100;
      
      setShowFloatingNav(isInView);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Verificar estado inicial

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Ocultar floating nav después de interacción en móvil
  useEffect(() => {
    if (hasUserInteracted) {
      const timer = setTimeout(() => {
        setShowFloatingNav(false);
        setHasUserInteracted(false);
      }, 3000); // Ocultar después de 3 segundos de inactividad

      return () => clearTimeout(timer);
    }
  }, [hasUserInteracted]);

  const getServiceIcon = (servicio: string) => {
    const icons: { [key: string]: any } = {
      'WiFi Gratuito': Wifi,
      'Estacionamiento': Car,
      'Terraza Jardín': TreePine,
      'Grupos Grandes': Users,
      'Comida Para Llevar': Utensils,
      'Reservaciones': BookOpen,
      'Espacio al Aire Libre': TreePine,
      'Demonstraciones Culinarias': ChefHat,
      'Talleres de Cocina': Utensils,
      'Venta de Ingredientes Locales': Sparkles,
      'Eventos Especiales': Calendar
    };
    return icons[servicio] || Sparkles;
  };

   const handleNavigate = (section: string) => {
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  };

  const siguienteCocina = () => {
    const siguienteIndex = (cocinaActiva + 1) % cocinas.length;
    setCocinaActiva(siguienteIndex);
    setHasUserInteracted(true);
  };

  const anteriorCocina = () => {
    const anteriorIndex = (cocinaActiva - 1 + cocinas.length) % cocinas.length;
    setCocinaActiva(anteriorIndex);
    setHasUserInteracted(true);
  };

  const handleCocinaChange = (index: number) => {
    setCocinaActiva(index);
    setHasUserInteracted(true);
  };

  return (
    <div 
      id="cocinas-section"
      className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 overflow-x-hidden relative"
    >
       {/* CONTENEDOR PARA STICKY RELATIVE */}
      <div className="relative"> {/* 👈 Este contenedor es clave */}
        
      
        
        {/* Floating Navigation Contextual (nuevo) */}
        <FloatingNavigation
          cocinas={cocinas}
          cocinaActiva={cocinaActiva}
          onCocinaChange={handleCocinaChange}
          onSiguienteCocina={siguienteCocina}
          onAnteriorCocina={anteriorCocina}
          isVisible={showFloatingNav}
          onClose={() => setShowFloatingNav(false)}
        />

        {/* HERO SECTION CON NAVEGACIÓN INTEGRADA */}
        <HeroSection 
          cocina={cocina}
          cocinaActiva={cocinaActiva}
          totalCocinas={cocinas.length}
          onNavigate={handleNavigate}
          onSiguienteCocina={siguienteCocina}
          onAnteriorCocina={anteriorCocina}
          onCocinaChange={setCocinaActiva}
        />

        {/* Restaurant Info */}
        <RestaurantInfo cocina={cocina} />

        {/* Featured Dishes */}
        <FeaturedDishes 
          cocina={cocina}
          onExpandRestaurant={setRestauranteExpandido}
        />

        {/* Location Section */}
        <LocationSection cocina={cocina} />

        {/* Call to Action */}
        {/*<CallToAction cocina={cocina} />

        {/* Expanded Modal */}
        <ExpandedModal 
          restauranteExpandido={restauranteExpandido}
          onClose={() => setRestauranteExpandido(null)}
          getServiceIcon={getServiceIcon}
        />
      </div>
    </div>
  );
}