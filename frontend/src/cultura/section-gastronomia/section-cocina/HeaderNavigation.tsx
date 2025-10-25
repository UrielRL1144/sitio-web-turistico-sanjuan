import { ChefHat, ChevronLeft, ChevronRight, Menu } from 'lucide-react';
import { MobileMenu } from './MobileMenu';
import { useState } from 'react'; // Añadir useState aquí

interface HeaderNavigationProps {
  cocinas: any[];
  cocinaActiva: number;
  onCocinaChange: (index: number) => void;
  onNavigate: (section: string) => void;
}

export function HeaderNavigation({ 
  cocinas, 
  cocinaActiva, 
  onCocinaChange, 
  onNavigate 
}: HeaderNavigationProps) {
  const [menuMovilAbierto, setMenuMovilAbierto] = useState(false);

  // Usar las funciones del padre en lugar del hook local
  const siguienteCocina = () => {
    const siguienteIndex = (cocinaActiva + 1) % cocinas.length;
    onCocinaChange(siguienteIndex);
  };

  const anteriorCocina = () => {
    const anteriorIndex = (cocinaActiva - 1 + cocinas.length) % cocinas.length;
    onCocinaChange(anteriorIndex);
  };

  const handleNavigate = (section: string) => {
    onNavigate(section);
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm border-b border-amber-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between py-3 sm:py-4">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <ChefHat className="h-6 w-6 sm:h-8 sm:w-8 text-amber-600" />
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
              Experiencias Gastronómicas
            </h1>
          </div>
          
          {/* Navegación entre cocinas - RESPONSIVE */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={anteriorCocina} 
              className="p-1 sm:p-2 rounded-full bg-amber-100 text-amber-700 hover:bg-amber-200 transition-colors"
              aria-label="Cocina anterior"
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            
            <div className="flex items-center space-x-1 sm:space-x-2">
              <span className="text-xs sm:text-sm font-medium text-gray-600 hidden xs:block">
                {cocinaActiva + 1} de {cocinas.length}
              </span>
              <div className="flex space-x-1">
                {cocinas.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => onCocinaChange(index)}
                    className={`transition-all ${
                      index === cocinaActiva 
                        ? 'bg-amber-600 w-4 sm:w-6' 
                        : 'bg-amber-300 hover:bg-amber-400 w-2 sm:w-2'
                    } h-2 rounded-full`}
                    aria-label={`Ir a cocina ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={siguienteCocina} 
              className="p-1 sm:p-2 rounded-full bg-amber-100 text-amber-700 hover:bg-amber-200 transition-colors"
              aria-label="Siguiente cocina"
            >
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>

            {/* Botón menú móvil */}
            <button
              onClick={() => setMenuMovilAbierto(!menuMovilAbierto)}
              className="lg:hidden p-2 rounded-lg bg-amber-100 text-amber-700 hover:bg-amber-200 transition-colors"
              aria-label="Menú de navegación"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Menú móvil */}
        <MobileMenu 
          isOpen={menuMovilAbierto}
          onClose={() => setMenuMovilAbierto(false)}
          onNavigate={handleNavigate}
        />
      </div>
    </div>
  );
}