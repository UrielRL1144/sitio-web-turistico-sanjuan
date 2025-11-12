// src/components/VisualCardsSection.tsx
import { motion, useScroll, useTransform, useAnimation, useInView, useReducedMotion } from "framer-motion";
import { useRef, useEffect, useState, useCallback, forwardRef } from "react";
import { useTranslation } from '../contexts/TranslationContext'; // ← AGREGAR IMPORT
import { Link } from "react-router-dom";

/* =============================
   Tipos
============================= */
interface CardData {
  title: string;
  description: string;
  image: string;
  link: string;
  priority?: boolean;
}

interface VisualCardProps {
  card: CardData;
  index: number;
  shouldReduceMotion: boolean;
  isMobile: boolean;
}

interface VisualCardsSectionProps {
  // puedes añadir props aquí si las necesitas en el futuro
}

/* =============================
   Datos optimizados - AHORA CON TRADUCCIONES
============================= */
const getCardsData = (t: (key: any) => string): CardData[] => [
  {
    title: t('cards.adelaRestaurant.title'),
    description: t('cards.adelaRestaurant.description'),
    image: "/images/home/cards/Comedor.webp",
    link: "/section-gastronomia",
    priority: true
  },
  {
    title: t('cards.loversWaterfall.title'),
    description: t('cards.loversWaterfall.description'),
    image: "/images/home/cards/Cascada-enamorados.webp",
    link: "/turismo",
  },
  {
    title: t('cards.cabins.title'),
    description: t('cards.cabins.description'),
    image: "/images/home/cards/Cabanas.webp",
    link: "/comunidad#atracciones-proximas",
  },
  {
    title: t('cards.viewpoints.title'),
    description: t('cards.viewpoints.description'),
    image: "/images/home/cards/mirador.webp",
    link: "/galeria",
  },
  {
    title: t('cards.dances.title'),
    description: t('cards.dances.description'),
    image: "/images/home/cards/Danza.webp",
    link: "/cultura#danzas",
  },
  {
    title: t('cards.rivers.title'),
    description: t('cards.rivers.description'),
    image: "/images/home/cards/Rios.webp",
    link: "/turismo",
  },
];

// El resto del código se mantiene igual hasta el componente principal...
/* =============================
   Hook personalizado para detección de dispositivo y optimizaciones
============================= */
const useDeviceOptimization = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const checkDeviceCapabilities = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      // Detectar dispositivos low-end
      if ('hardwareConcurrency' in navigator && 'deviceMemory' in navigator) {
        const cores = navigator.hardwareConcurrency || 4;
        const memory = (navigator as any).deviceMemory || 4;
        setIsLowEndDevice(cores < 4 || memory < 4);
      }
    };

    checkDeviceCapabilities();
    
    // Debounce resize para mejor performance
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(checkDeviceCapabilities, 100);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  return { isMobile, isLowEndDevice, shouldReduceMotion: shouldReduceMotion || isLowEndDevice };
};

/* =============================
   Hook personalizado para auto-scroll optimizado
============================= */
const useAutoScroll = (
  containerRef: React.RefObject<HTMLDivElement | null>,
  isActive: boolean,
  isMobile: boolean,
  shouldReduceMotion: boolean
) => {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getCardStep = useCallback(() => {
    if (!containerRef.current) return 400;
    const firstCard = containerRef.current.querySelector<HTMLDivElement>(".snap-center");
    const gap = 32;
    if (!firstCard) return 400;
    return firstCard.clientWidth + gap;
  }, [containerRef]);

  const scrollToPosition = useCallback((position: number) => {
    if (!containerRef.current) return;
    
    // Usar requestAnimationFrame para mejor performance
    animationFrameRef.current = requestAnimationFrame(() => {
      containerRef.current!.scrollTo({
        left: position,
        behavior: shouldReduceMotion ? 'auto' : 'smooth'
      });
    });
  }, [containerRef, shouldReduceMotion]);

  const scrollBy = useCallback((delta: number) => {
    if (!containerRef.current) return;
    
    animationFrameRef.current = requestAnimationFrame(() => {
      containerRef.current!.scrollBy({
        left: delta,
        behavior: shouldReduceMotion ? 'auto' : 'smooth'
      });
    });
  }, [containerRef, shouldReduceMotion]);

  const centerFirstCard = useCallback(() => {
    const c = containerRef.current;
    if (!c) return;
    const first = c.querySelector<HTMLElement>(".snap-center");
    if (!first) return;
    const clientWidth = c.clientWidth;
    const offsetLeft = first.offsetLeft;
    const left = Math.max(0, offsetLeft - (clientWidth - first.clientWidth) / 2);
    scrollToPosition(left);
  }, [containerRef, scrollToPosition]);

  const startAutoScroll = useCallback(() => {
    if (shouldReduceMotion || !isActive) return;
    
    stopAutoScroll();

    intervalRef.current = setInterval(() => {
      const c = containerRef.current;
      if (!c) return;

      const cardStep = getCardStep();
      const scrollWidth = c.scrollWidth;
      const clientWidth = c.clientWidth;
      const current = Math.round(c.scrollLeft);

      if (current + clientWidth >= scrollWidth - 2) {
        scrollToPosition(0);
      } else {
        scrollBy(cardStep);
      }
    }, isMobile ? 4000 : 3000); // Más lento en móviles
  }, [containerRef, getCardStep, scrollToPosition, scrollBy, isActive, isMobile, shouldReduceMotion]);

  const stopAutoScroll = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, []);

  const pauseThenResume = useCallback((delayMs = 3000) => {
    stopAutoScroll();
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      if (isActive) startAutoScroll();
    }, delayMs);
  }, [stopAutoScroll, startAutoScroll, isActive]);

  useEffect(() => {
    return () => {
      stopAutoScroll();
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, [stopAutoScroll]);

  return {
    startAutoScroll,
    stopAutoScroll,
    pauseThenResume,
    centerFirstCard,
    scrollBy,
    scrollToPosition
  };
};

/* =============================
   Tarjeta individual optimizada
============================= */
const VisualCard = ({ card, index, shouldReduceMotion, isMobile }: VisualCardProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: isMobile ? "-50px" : "-100px" });
  const { t } = useTranslation(); // ← AGREGAR HOOK

  // Optimización: solo usar parallax en dispositivos capaces
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  
  const y = useTransform(
    scrollYProgress, 
    [0, 1], 
    shouldReduceMotion ? [0, 0] : [-50, 50] // Menos movimiento en dispositivos limitados
  );

  const variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: shouldReduceMotion ? 0.4 : 0.6, 
        delay: shouldReduceMotion ? 0 : index * 0.10 
      } 
    },
  };

  const hoverVariants = shouldReduceMotion ? {} : {
    whileHover: { scale: 1.02 }
  };

  return (
    <motion.div
      ref={ref}
      className="relative snap-center flex-shrink-0 w-[calc(100vw-48px)] max-w-[350px] mx-auto sm:w-[350px] lg:w-[400px] h-[400px] sm:h-[450px] rounded-2xl overflow-hidden shadow-2xl cursor-pointer group bg-gray-900"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      {...hoverVariants}
      role="article"
      aria-label={`${t('cards.goToCard')} ${card.title}`} // ← TRADUCIBLE
    >
      {/* Imagen optimizada */}
      <motion.div 
        style={shouldReduceMotion ? undefined : { y }} 
        className="absolute inset-0 w-full h-full"
      >
        <img
          src={card.image}
          alt={card.title}
          width={400}
          height={450}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          loading={card.priority ? "eager" : "lazy"}
          decoding="async"
        />
      </motion.div>

      {/* Overlay optimizado */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-all duration-500 group-hover:from-black/90 group-hover:via-black/50" />

      {/* Contenido */}
      <div className="relative z-10 p-6 sm:p-8 flex flex-col justify-end h-full text-white">
        <h3 className="text-xl sm:text-2xl font-bold font-serif mb-2 drop-shadow-lg leading-tight">{card.title}</h3>
        <p className="text-gray-200 text-xs sm:text-sm drop-shadow-md line-clamp-2">{card.description}</p>

       {/* Botón optimizado CON REACT ROUTER */}
<Link
  to={card.link}
  aria-label={`${t('cards.exploreButton')} ${card.title}`}
  className={`
    mt-4 sm:mt-6 inline-block w-fit px-4 sm:px-6 py-2 text-xs sm:text-sm font-medium font-serif
    border border-white/80 rounded-full transition-all duration-300 
    opacity-100 translate-y-0 sm:opacity-0 sm:translate-y-4 sm:group-hover:opacity-100 sm:group-hover:translate-y-0 
    hover:bg-white hover:text-gray-900 shadow-md
    focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 animate-glow
    ${shouldReduceMotion ? 'sm:opacity-100 sm:translate-y-0' : ''}
  `}
  onClick={(e) => e.stopPropagation()}
>
  {t('cards.exploreButton')}
</Link>
      </div>
    </motion.div>
  );
};

/* =============================
   Sección principal optimizada - CON forwardRef
============================= */
export const VisualCardsSection = forwardRef<HTMLDivElement, VisualCardsSectionProps>(
  (props, ref) => {
    const { t } = useTranslation(); // ← AGREGAR HOOK
    const containerRef = useRef<HTMLDivElement | null>(null);
    const { isMobile, isLowEndDevice, shouldReduceMotion } = useDeviceOptimization();
    const inView = useInView(containerRef, { once: true, amount: 0.3 });
    
    const {
      startAutoScroll,
      stopAutoScroll,
      pauseThenResume,
      centerFirstCard,
      scrollBy,
      scrollToPosition
    } = useAutoScroll(containerRef, inView, isMobile, shouldReduceMotion);

    // Efectos optimizados
    useEffect(() => {
      if (inView && !shouldReduceMotion) {
        // Pequeño delay para centrado inicial
        const centerTimer = setTimeout(() => {
          centerFirstCard();
        }, 100);

        startAutoScroll();

        // Event listeners optimizados
        const el = containerRef.current;
        if (!el) return;

        const onInteract = () => pauseThenResume(8000);
        const onEnter = () => stopAutoScroll();
        const onLeave = () => {
          if (inView) {
            pauseThenResume(3000);
          }
        };

        // Passive events para mejor performance
        el.addEventListener("mouseenter", onEnter, { passive: true });
        el.addEventListener("mouseleave", onLeave, { passive: true });
        el.addEventListener("touchstart", onInteract, { passive: true });
        el.addEventListener("wheel", onInteract, { passive: true });

        return () => {
          clearTimeout(centerTimer);
          el.removeEventListener("mouseenter", onEnter);
          el.removeEventListener("mouseleave", onLeave);
          el.removeEventListener("touchstart", onInteract);
          el.removeEventListener("wheel", onInteract);
          stopAutoScroll();
        };
      }
    }, [inView, shouldReduceMotion, startAutoScroll, stopAutoScroll, pauseThenResume, centerFirstCard]);

    // Preload de primera imagen crítica
    useEffect(() => {
      const preloadImage = new Image();
      preloadImage.src = getCardsData(t)[0].image; // ← USAR getCardsData(t)
    }, [t]);

    return (
      <section 
        ref={ref}
        className="relative bg-black py-16 sm:py-24 px-0 overflow-hidden"
        aria-label={t('cards.exploreTitle')} // ← TRADUCIBLE
      >
        {/* Título optimizado */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif text-white text-center drop-shadow-2xl"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.3 : 0.8 }}
            viewport={{ once: true }}
          >
            {t('cards.exploreTitle')} {/* ← TRADUCIBLE */}
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg text-gray-400 mt-3 sm:mt-4 text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.3 : 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            {t('cards.exploreSubtitle')} {/* ← TRADUCIBLE */}
          </motion.p>
        </div>

        {/* Flechas optimizadas */}
        {!isMobile && (
          <>
            <button
              aria-label={t('cards.previous')} // ← TRADUCIBLE
              onClick={() => {
                const c = containerRef.current;
                if (!c) return;
                c.scrollBy({ left: -400, behavior: 'smooth' });
                pauseThenResume();
              }}
              className="hidden sm:flex absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 z-30 items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 lg:w-6 lg:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              aria-label={t('cards.next')} // ← TRADUCIBLE
              onClick={() => {
                const c = containerRef.current;
                if (!c) return;
                c.scrollBy({ left: 400, behavior: 'smooth' });
                pauseThenResume();
              }}
              className="hidden sm:flex absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 z-30 items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 lg:w-6 lg:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Carrusel optimizado */}
        <div
          ref={containerRef}
          className="flex flex-nowrap gap-6 sm:gap-8 py-4 px-4 sm:px-6 lg:px-8 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide"
          role="region"
          aria-label={t('cards.exploreTitle')} // ← TRADUCIBLE
          aria-live="polite"
        >
          {getCardsData(t).map((card, index) => ( // ← USAR getCardsData(t)
            <VisualCard 
              key={`${card.title}-${index}`}
              card={card} 
              index={index}
              shouldReduceMotion={shouldReduceMotion}
              isMobile={isMobile}
            />
          ))}
        </div>

        {/* Indicadores de progreso para móvil */}
        {isMobile && (
          <div className="flex justify-center mt-6 space-x-2">
            {getCardsData(t).map((_, index) => ( // ← USAR getCardsData(t)
              <button
                key={index}
                aria-label={`${t('cards.goToCard')} ${index + 1}`} // ← TRADUCIBLE
                className="w-2 h-2 rounded-full bg-white/30 hover:bg-white/50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white"
                onClick={() => {
                  // Navegación directa a tarjeta específica
                  const c = containerRef.current;
                  if (c) {
                    const cards = c.querySelectorAll<HTMLElement>('.snap-center');
                    if (cards[index]) {
                      const cardStep = cards[index].offsetLeft;
                      scrollToPosition(cardStep);
                      pauseThenResume();
                    }
                  }
                }}
              />
            ))}
          </div>
        )}
      </section>
    );
  }
);

VisualCardsSection.displayName = 'VisualCardsSection';