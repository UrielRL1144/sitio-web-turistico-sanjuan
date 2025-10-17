// src/sections/VocesDeNuestraTierra/components/CarouselHeader.tsx
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "../variants";
import { Mic2 } from "lucide-react";

export function CarouselHeader() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="text-center mb-10 sm:mb-14"
    >
      <motion.div
        variants={itemVariants}
        className="inline-flex items-center gap-2 bg-teal-100 px-4 py-2 rounded-full text-teal-800 mb-4 mx-auto"
      >
        <Mic2 className="w-5 h-5" />
        <span className="font-medium text-sm sm:text-base">Voces de Nuestra Tierra</span>
      </motion.div>

      <motion.h2
        variants={itemVariants}
        className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-800 tracking-tight"
      >
        Historias que <span className="bg-gradient-to-r from-teal-500 to-cyan-600 bg-clip-text text-transparent">conectan</span> generaciones
      </motion.h2>

      <motion.p
        variants={itemVariants}
        className="mt-4 text-slate-600 max-w-2xl mx-auto text-sm sm:text-base"
      >
        La voz de cada habitante guarda una parte de nuestra identidad. Escucha, siente y conecta con quienes mantienen viva la cultura de San Juan Tahitic.
      </motion.p>
    </motion.div>
  );
}
