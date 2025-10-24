import { motion, type Variants } from 'framer-motion';
import { Home, Zap, Construction, Calendar, MapPin, Users, TreePine, ArrowRight, Play, ExternalLink } from 'lucide-react';
import { useState } from 'react';

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6, 
      ease: [0, 0.55, 0.45, 1],
    } 
  },
};

const galleryVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const projectData = {
  title: 'Cabañas Turísticas (Fase I)',
  subtitle: 'Alojamiento para el Futuro Turístico de Tahitic',
  description: 'Un proyecto comunitario para ofrecer una experiencia de inmersión única. Cabañas ecológicas y confortables construidas con métodos tradicionales y materiales locales, impulsando la economía y el ecoturismo.',
  status: 'En Construcción (80% completado)',
  progress: 80,
  features: [
    { label: 'Unidades Iniciales', value: 8, icon: Home },
    { label: 'Fecha Estimada', value: 'Primavera 2024', icon: Calendar },
    { label: 'Energía Autosuficiente', value: 'Solar', icon: Zap },
    { label: 'Ubicación', value: 'Vista al Valle', icon: MapPin },
    { label: 'Empleos Generados', value: '15+', icon: Users },
    { label: 'Materiales Locales', value: '95%', icon: TreePine },
  ],
  constructionImages: [
    {
      url: "/images/home/cards/Cabanas.webp",
      title: "Cimentación de las cabañas",
      description: "Trabajando en los cimientos con técnicas sostenibles"
    },
    {
      url: "/images/home/cards/cabañas2.webp",
      title: "Estructura principal",
      description: "Armazón de madera local en proceso"
    },
    {
      url: "/images/home/cards/Cabañas3.jpg",
      title: "Trabajo comunitario",
      description: "Vecinos participando en la construcción"
    },
    {
      url: "/images/home/cards/Cabañas4.jpg",
      title: "Vista del proyecto",
      description: "Panorámica del avance general"
    }
  ],
  timeline: [
    { phase: "Planificación", progress: 100, date: "Ene 2024" },
    { phase: "Cimentación", progress: 100, date: "Feb 2024" },
    { phase: "Estructura", progress: 90, date: "Mar 2024" },
    { phase: "Techado", progress: 70, date: "Abr 2024" },
    { phase: "Acabados", progress: 40, date: "May 2024" },
    { phase: "Landscaping", progress: 20, date: "Jun 2024" }
  ]
}

export function UpcomingAttractionsSection() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [showGallery, setShowGallery] = useState(false);

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % projectData.constructionImages.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + projectData.constructionImages.length) % projectData.constructionImages.length);
  };

  // Dentro del componente:
const [isLoading, setIsLoading] = useState(false);

const handleOpenPDF = async () => {
  setIsLoading(true);
  // Pequeño delay para mejor UX
  await new Promise(resolve => setTimeout(resolve, 500));
  window.open('/documentos/plan-cabanas-turisticas.pdf', '_blank');
  setIsLoading(false);
};

  return (
    <section id="atracciones-proximas" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 mb-24">
      {/* Encabezado */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-teal-500 to-emerald-600 text-white px-6 py-3 rounded-full mb-6 shadow-lg"
          initial={{ scale: 0.9 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Construction className="h-5 w-5" />
          <span className="font-medium">Proyecto en Desarrollo</span>
        </motion.div>
        
        <h3 className="text-4xl font-bold text-slate-900 mb-4">
          Nuestras <span className="bg-gradient-to-r from-teal-500 to-emerald-600 bg-clip-text text-transparent">Novedades</span>
        </h3>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          Un vistazo a los proyectos que están transformando San Juan Tahitic y que pronto podrás disfrutar.
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-emerald-600 mx-auto rounded-full mt-4"></div>
      </motion.div>

      {/* Tarjeta Principal del Proyecto */}
      <motion.div
        className="bg-white rounded-3xl shadow-2xl overflow-hidden lg:flex border border-slate-200"
        initial="hidden"
        whileInView="visible"
        variants={cardVariants}
        viewport={{ once: true }}
      >
        {/* Lado Izquierdo - Galería de Construcción */}
        <div className="lg:w-1/2 h-80 lg:h-auto bg-gradient-to-br from-slate-900 to-slate-700 relative overflow-hidden">
          {/* Imagen principal */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-all duration-700"
            style={{ backgroundImage: `url(${projectData.constructionImages[selectedImage].url})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          </div>
          
          {/* Overlay de información */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h4 className="text-lg font-bold mb-1">{projectData.constructionImages[selectedImage].title}</h4>
              <p className="text-sm text-slate-200">{projectData.constructionImages[selectedImage].description}</p>
            </motion.div>
          </div>

          {/* Controles de galería */}
          <div className="absolute top-4 left-4 flex space-x-2">
            {projectData.constructionImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === selectedImage 
                    ? 'bg-white scale-125' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>

          {/* Botón de progreso */}
          <div className="absolute top-4 right-4 bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-semibold px-4 py-2 rounded-full text-sm shadow-lg backdrop-blur-sm">
            {projectData.status}
          </div>

          {/* Barra de progreso */}
          <div className="absolute top-16 right-4 left-4 bg-white/20 backdrop-blur-sm rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-teal-400 to-emerald-500 h-full rounded-full shadow-lg"
              initial={{ width: 0 }}
              animate={{ width: `${projectData.progress}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </div>

          {/* Botones de navegación */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full transition-all"
          >
            <ArrowRight className="h-5 w-5 rotate-180" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full transition-all"
          >
            <ArrowRight className="h-5 w-5" />
          </button>

          {/* Botón ver galería completa */}
          <button
            onClick={() => setShowGallery(true)}
            className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center space-x-2"
          >
            <Play className="h-4 w-4" />
            <span>Ver Galería</span>
          </button>
        </div>
        
        {/* Lado Derecho - Información */}
        <div className="lg:w-1/2 p-8 md:p-12">
          <h4 className="text-sm font-bold uppercase tracking-widest text-teal-600 mb-2 flex items-center">
            <Construction className="h-4 w-4 mr-2" />
            Proyecto Comunitario
          </h4>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">{projectData.title}</h2>
          <p className="text-lg text-slate-700 mb-8 leading-relaxed">{projectData.description}</p>
          
          {/* Timeline del proyecto */}
          <div className="mb-8">
            <h5 className="font-semibold text-slate-800 mb-4 flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-teal-500" />
              Cronograma del Proyecto
            </h5>
            <div className="space-y-3">
              {projectData.timeline.map((phase, index) => (
                <div key={phase.phase} className="flex items-center justify-between">
                  <span className="text-sm text-slate-600 flex-1">{phase.phase}</span>
                  <div className="w-24 bg-slate-200 rounded-full h-2 mx-4">
                    <div 
                      className="bg-gradient-to-r from-teal-400 to-emerald-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${phase.progress}%` }}
                    />
                  </div>
                  <span className="text-xs text-slate-500 w-12 text-right">{phase.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Características */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {projectData.features.map((feature) => (
              <motion.div
                key={feature.label}
                whileHover={{ scale: 1.02 }}
                className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-all cursor-pointer group"
              >
                <div className="bg-gradient-to-r from-teal-500 to-emerald-600 p-2 rounded-lg group-hover:scale-110 transition-transform">
                  <feature.icon className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-medium">{feature.label}</p>
                  <p className="text-base font-semibold text-slate-800">{feature.value}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
                onClick={handleOpenPDF}
                disabled={isLoading}
                className="bg-gradient-to-r from-teal-500 to-emerald-600 text-white px-8 py-3 rounded-lg font-bold hover:from-teal-600 hover:to-emerald-700 transition-all shadow-lg shadow-teal-500/50 hover:shadow-xl hover:shadow-teal-500/70 flex items-center justify-center space-x-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                {isLoading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                ) : (
                    <>
                    <span>Conoce el Plan Completo</span>
                    <ExternalLink className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    </>
                )}
                </button>
          </div>
        </div>
      </motion.div>

      {/* Modal de Galería (simplificado) */}
      {showGallery && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setShowGallery(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative max-w-4xl max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={projectData.constructionImages[selectedImage].url}
              alt={projectData.constructionImages[selectedImage].title}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <button
              onClick={() => setShowGallery(false)}
              className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-all"
            >
              <ArrowRight className="h-5 w-5 rotate-45" />
            </button>
          </motion.div>
        </motion.div>
      )}

      {/* Sección de impacto comunitario */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="mt-12 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-2xl p-8 border border-teal-200"
      >
        <h4 className="text-2xl font-bold text-slate-900 mb-4 text-center">Impacto en la Comunidad</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <Users className="h-8 w-8 text-teal-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-slate-900 mb-1">15+</div>
            <div className="text-slate-600">Empleos Generados</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <Home className="h-8 w-8 text-teal-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-slate-900 mb-1">8</div>
            <div className="text-slate-600">Cabañas en Construcción</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <TreePine className="h-8 w-8 text-teal-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-slate-900 mb-1">95%</div>
            <div className="text-slate-600">Materiales Locales</div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}