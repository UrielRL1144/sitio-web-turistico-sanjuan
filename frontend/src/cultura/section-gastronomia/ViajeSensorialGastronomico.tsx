import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeaderNavigation } from '../section-gastronomia/section-cocina/HeaderNavigation';
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

  const cocinas = cocinasData.cocinas;
  const cocina = cocinas[cocinaActiva];

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

  return (
    <div 
      id="cocinas-section" // 👈 ID CRÍTICO para el hook de scroll
      className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 overflow-x-hidden"
    >
      <div className="w-full max-w-[100vw] overflow-hidden">
        
        {/* Header Navigation con efecto de scroll */}
        <HeaderNavigation 
          cocinas={cocinas}
          cocinaActiva={cocinaActiva}
          onCocinaChange={setCocinaActiva}
          onNavigate={handleNavigate}
        />

        {/* Hero Section */}
        <HeroSection 
          cocina={cocina}
          onNavigate={handleNavigate}
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
        <CallToAction cocina={cocina} />

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