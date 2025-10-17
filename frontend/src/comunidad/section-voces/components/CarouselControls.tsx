import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  prev: () => void;
  next: () => void;
}

export function CarouselControls({ prev, next }: Props) {
  return (
    <>
      <button
        onClick={prev}
        aria-label="Anterior testimonio"
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center"
      >
        <ChevronLeft />
      </button>
      <button
        onClick={next}
        aria-label="Siguiente testimonio"
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center"
      >
        <ChevronRight />
      </button>
    </>
  );
}
