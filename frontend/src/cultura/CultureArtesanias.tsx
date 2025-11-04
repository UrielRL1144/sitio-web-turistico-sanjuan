// CultureArtesanias.tsx
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Hand, Star } from 'lucide-react';

// Hooks y componentes modulares
import { useArtesaniasData } from '../cultura/section-artesanias/hooks/useArtesaniasData';
import { useKeyboardNavigation } from '../cultura/section-artesanias/hooks/useKeyboardNavigation';
import { useFirstVisit } from '../cultura/section-artesanias/hooks/useFirstVisit';
import { ArtesaniaCard } from '../cultura/section-artesanias/ArtesaniaCard';
import { ArtesaniaModal } from '../cultura/section-artesanias/ArtesaniaModal';
import { FilterButtons } from '../cultura/section-artesanias/FilterButtons';
import { TooltipInformativo } from '../cultura/section-artesanias/TooltipInformativo';
import { categoryNames } from './section-artesanias/types';

export function CultureArtesanias() {
  const {
    craftsData,
    filteredCrafts,
    craftsToShow,
    filter,
    activeCraft,
    showAll,
    handleFilterClick,
    handleCraftClick,
    handleCloseModal,
    toggleShowAll,
    setActiveCraft
  } = useArtesaniasData();

  const isFirstVisit = useFirstVisit('artesanias-first-visit');

  // Hook para navegación por teclado
  useKeyboardNavigation(
    activeCraft,
    craftsData,
    handleCloseModal,
    setActiveCraft
  );

  const backgroundPatternClass = "py-24 relative overflow-hidden bg-[url('images/cultura/Fondo-artesanias.svg')] bg-no-repeat bg-center bg-cover";

  const activeCraftData = activeCraft 
    ? craftsData.find(craft => craft.id === activeCraft)
    : null;

  // Función para manejar el toggle con scroll al inicio
  const handleToggleWithScroll = () => {
    if (showAll) {
      // Si estamos mostrando todo y queremos ocultar, hacer scroll al inicio
      const sectionElement = document.getElementById('section-artesanias-locales');
      if (sectionElement) {
        // Calcular la posición del grid de artesanías dentro de la sección
        const gridElement = sectionElement.querySelector('.grid');
        if (gridElement) {
          const gridTop = gridElement.getBoundingClientRect().top + window.pageYOffset;
          const sectionTop = sectionElement.getBoundingClientRect().top + window.pageYOffset;
          
          // Hacer scroll suave al inicio del grid
          window.scrollTo({
            top: sectionTop - 100, // Un poco arriba para mejor visibilidad
            behavior: 'smooth'
          });
        }
      }
    }
    
    // Cambiar el estado de showAll después de un pequeño delay para que el scroll sea visible
    setTimeout(() => {
      toggleShowAll();
    }, 300);
  };

  return (
    <section 
      id="section-artesanias-locales"
      className={`relative overflow-hidden ${backgroundPatternClass}`}
      aria-label="Sección de artesanías locales de San Juan Tahitic"
    >
      {/* capa translúcida para oscurecer o aclarar */}
      <div className="absolute inset-0 bg-black/10"></div>
      {/* Tooltip informativo para primera visita */}
      <TooltipInformativo isFirstVisit={isFirstVisit} />
      
      <div className="max-w-7xl mx-auto px-2">
        {/* Header con título e instrucciones */}
        <div className="text-center mb-16">
          {/* 🔹 Fondo translúcido para el bloque completo */}
          <div className="inline-block bg-white/70 backdrop-blur-md rounded-2xl px-8 py-10 shadow-xl shadow-rose-900/20 max-w-5xl mx-auto">
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl lg:text-6xl font-bold font-serif text-gray-900 mb-6"
            >
              <span className="bg-gradient-to-r from-rose-700 via-pink-500 to-amber-800 bg-clip-text text-transparent">
                Artesanías{' '}
              </span>
              locales
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-800 leading-relaxed max-w-3xl mx-auto mb-8"
            >
              Creaciones únicas elaboradas por artesanos locales con técnicas transmitidas 
              de generación en generación.
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
                className="block mt-3 text-amber-600 font-semibold text-lg flex items-center justify-center gap-2 flex-wrap"
              >
                <Hand className="w-5 h-5" />
                <span className="lg:inline hidden">
                  Haz clic en cualquier artesanía para descubrir su historia completa
                </span>
                <span className="lg:hidden inline">
                  Toca cualquier artesanía para descubrir su historia completa
                </span>
              </motion.span>
            </motion.p>

            {/* Filtros por categoría */}
            <FilterButtons 
              currentFilter={filter} 
              onFilterChange={handleFilterClick} 
            />
          </div>
        </div>

        {/* Modal para artesanía expandida */}
        {activeCraftData && (
          <ArtesaniaModal
            craft={activeCraftData}
            isOpen={activeCraft !== null}
            onClose={handleCloseModal}
            onNavigate={setActiveCraft}
          />
        )}

        {/* Grid de Artesanías */}
        <motion.div
          layout
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-300 ${
            activeCraft !== null ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          {craftsToShow.map((craft) => (
            <ArtesaniaCard
              key={craft.id}
              craft={craft}
              onClick={handleCraftClick}
            />
          ))}
        </motion.div>

        {/* Botón "Ver Más" / "Ver Menos" con scroll automático */}
        {filteredCrafts.length > 6 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center gap-6 mt-12 mb-8 animate-pulse"
          >
            {/* Línea decorativa */}
            <motion.div
              className="w-32 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5 }}
            />
            
            {/* Botón principal */}
            <motion.button
              onClick={handleToggleWithScroll}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 15px 40px rgba(251, 191, 36, 0.4)",
                y: -2
              }}
              whileTap={{ scale: 0.95, y: 0 }}
              className="bg-white border-2 border-amber-500 text-amber-600 hover:bg-amber-50 font-bold font-serif px-8 py-4 rounded-full shadow-lg flex items-center gap-3 transition-all duration-300 group relative overflow-hidden"
            >
              {/* Efecto de fondo en hover */}
              <motion.div
                className="absolute inset-0 bg-amber-500 opacity-0 group-hover:opacity-5 transition-opacity duration-300"
                whileHover={{ opacity: 0.1 }}
              />
              
              <span className="text-lg relative z-10">
                {showAll ? 'Mostrar menos' : `Ver ${filteredCrafts.length - 6} más`}
              </span>
              <motion.div
                animate={{ 
                  rotate: showAll ? 180 : 0,
                  y: showAll ? 0 : 2
                }}
                transition={{ duration: 0.4, type: "spring" }}
                className="relative z-10"
              >
                {showAll ? (
                  <ChevronUp className="w-5 h-5 group-hover:scale-110 transition-transform" />
                ) : (
                  <ChevronDown className="w-5 h-5 group-hover:scale-110 transition-transform" />
                )}
              </motion.div>
            </motion.button>

            {/* Texto informativo */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-gray-700 text-sm text-center max-w-md mx-auto bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm shadow-amber-900/10"
            >
              {showAll 
                ? 'Estás viendo todas las artesanías disponibles'
                : `Hay ${filteredCrafts.length - 6} artesanías más por descubrir`
              }
            </motion.p>

            {/* Indicador de scroll cuando se muestran todas */}
            {showAll && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="flex items-center gap-2 text-amber-600 text-xs bg-amber-50 px-3 py-1 rounded-full"
              >
                <span>💡</span>
                <span>Al mostrar menos, volverás al inicio de las artesanías</span>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Contador de artesanías visibles */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-500 text-sm mb-8"
        >
          {filter !== 'todos' && ` en ${categoryNames[filter]}`}
        </motion.div>

        {/* Mensaje cuando no hay resultados */}
        {filteredCrafts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-gray-500 text-lg">
              No se encontraron artesanías en esta categoría.
            </div>
            <button
              onClick={() => handleFilterClick('todos')}
              className="mt-4 text-amber-600 hover:text-amber-700 font-semibold font-serif"
            >
              Ver todas las artesanías
            </button>
          </motion.div>
        )}

        {/* Sección de llamado a la acción */}
        <div className="flex justify-center py-16">
          <motion.div
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 35px rgba(255,140,0,0.6)",
              backgroundColor: "#ea580c",
            }}
            whileTap={{ scale: 0.97 }}
            className="relative z-10 max-w-3xl w-full bg-orange-600 text-white px-8 py-10 rounded-2xl shadow-2xl transition-all duration-300 overflow-hidden group text-center"
          >
            {/* Brillo deslizante */}
            <motion.span
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full bg-white opacity-10 transform -skew-x-12 pointer-events-none"
            />

            {/* Contenido narrativo con enfoque artesanal */}
            <h2 className="relative z-20 text-2xl font-extrabold font-serif mb-4 tracking-tight">
              ¡Visitanos en San Juan Tahitic!
            </h2>
            <p className="relative z-20 text-lg text-orange-100 mb-6">
              Descubre piezas únicas hemas a mano por artesanos locales. Cada creación refleja tradición, identidad y pasión.
            </p>

            {/* Icono animado como guiño visual */}
            <motion.div
              className="relative z-20 inline-block"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Star className="w-8 h-8 text-white" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}