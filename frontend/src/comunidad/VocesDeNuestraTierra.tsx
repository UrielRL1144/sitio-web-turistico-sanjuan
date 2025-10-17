import { AnimatePresence, motion } from "framer-motion";
import { testimoniosData } from "../comunidad/section-voces/data";
import { useCarousel } from "../comunidad/section-voces/useCarousel";
import { CarouselSlide } from "../comunidad/section-voces/components/CarouselSlide";
import { CarouselControls } from "../comunidad/section-voces/components/CarouselControls";
import { CarouselHeader } from "../comunidad/section-voces/components/CarouselHeader";
import { MiniGallery } from "../comunidad/section-voces/components/MiniGallery";
import { ClosingSection } from "../comunidad/section-voces/components/ClosingSection";

export function VocesDeNuestraTierra() {
  const { currentIndex, direction, next, prev, goTo, setIsPlaying } = useCarousel(testimoniosData.length);
  const current = testimoniosData[currentIndex];

  return (
    <section
      id="voces"
      className="w-full bg-gradient-to-b from-slate-50 to-slate-100 py-12 sm:py-20"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <CarouselHeader />

        <div className="relative overflow-hidden rounded-2xl shadow-xl min-h-[500px] sm:min-h-[600px]">
          <AnimatePresence mode="wait" custom={direction}>
            <CarouselSlide testimonio={current} direction={direction} />
          </AnimatePresence>
          <CarouselControls prev={prev} next={next} />
        </div>

        <MiniGallery testimonios={testimoniosData} currentIndex={currentIndex} goTo={goTo} />
        <ClosingSection />
      </div>
    </section>
  );
}
