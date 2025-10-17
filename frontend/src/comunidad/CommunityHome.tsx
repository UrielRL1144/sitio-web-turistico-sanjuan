import { ArrowDown, HeartHandshake } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export function CommunityHome() {
  return (
    <section
      id="comunidad"
      aria-labelledby="community-heading"
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Video de fondo representativo de la comunidad */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/videos/Comunidad/poster-hero.webp"
          className="w-full h-full object-cover"
        >
          {/* Proporciona videos optimizados para la comunidad */}
          <source src="/videos/Comunidad/output-hero.webm" type="video/webm" />
          <source src="/videos/Comunidad/output-hero.mp4" type="video/mp4" />
          Tu navegador no soporta la reproducción de video.
        </video>

        {/* Overlay para mejorar legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/30"></div>
      </div>

      {/* Contenido principal centrado */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Badge superior temático */}
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-teal-100/80 to-cyan-100/80 px-4 py-2 rounded-full mb-6 backdrop-blur-sm shadow-sm">
            <HeartHandshake className="h-5 w-5 text-teal-600" aria-hidden="true" />
            <span className="text-teal-800 font-medium">Nuestra Gente, Nuestra Fortaleza</span>
          </div>

          {/* Título principal optimizado para SEO */}
          <h1
            id="community-heading"
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight text-white drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)]"
          >
            Unidos por{' '}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-sky-500 bg-clip-text text-transparent">
              tradición
            </span>
          </h1>

          {/* Descripción */}
          <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-white drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)]">
            Somos una familia unida por la tierra, las historias de nuestros ancestros y un profundo sentido de ayuda mutua. 
            Descubre las manos y los corazones que hacen de San Juan Tahitic un lugar único.
          </p>
        </motion.div>

        {/* Botones de llamada a la acción */}
        <motion.div
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.button
            onClick={() =>
              document.getElementById("raices")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              })
            }
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 bg-teal-500 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-teal-600 transition-colors"
          >
            Conoce a nuestra historia
            <ArrowDown className="h-5 w-5" />
          </motion.button>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Link
              to="/proyectos-comunitarios"
              className="block border-2 border-cyan-400 text-cyan-100 hover:bg-cyan-500/20 px-8 py-3 rounded-full font-semibold transition-all duration-300 text-center backdrop-blur-sm"
            >
              Proyectos Locales
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}