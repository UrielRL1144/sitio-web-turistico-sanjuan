import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
                                                                          //'../../../components/ui/card';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { Users, Music, Palette, Book, Crown, Sparkles, Heart, Calendar, MapPin, Clock, Star, Download, Share2, Play, Pause } from 'lucide-react';

export function CalendarSection() {
  const [activeExperience, setActiveExperience] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [visitorCount, setVisitorCount] = useState(0);
  const [collectedStamps, setCollectedStamps] = useState<string[]>([]);

  const culturalAspects = [
    {
      icon: Music,
      title: "Danzas Tradicionales",
      description: "Expresiones culturales que transmiten la historia, la espiritualidad y la identidad de San Juan Tahitic a través del movimiento y el ritmo.",
      details: ["Coreografías ancestrales", "Vestimenta típica", "Fiestas patronales y rituales"],
      gradient: "from-purple-400 to-pink-500",
      bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
      video: "/videos/danza-preview.mp4",
      stamp: "danza"
    },
    {
      icon: Palette,
      title: "Artesanías Locales",
      description: "Creaciones únicas elaboradas por artesanos locales con técnicas transmitidas de generación en generación.",
      details: ["Textiles tradicionales", "Cerámica artesanal", "Tallado en madera"],
      gradient: "from-amber-400 to-orange-600",
      bgColor: "bg-gradient-to-br from-amber-50 to-orange-50",
      video: "/videos/artesania-preview.mp4",
      stamp: "artesania"
    },
    {
      icon: Book,
      title: "Historia y Leyendas",
      description: "Relatos que forman parte del patrimonio oral de nuestra comunidad y definen nuestra identidad cultural.",
      details: ["Leyendas ancestrales", "Sitios históricos", "Tradición oral"],
      gradient: "from-yellow-400 to-amber-600",
      bgColor: "bg-gradient-to-br from-yellow-50 to-amber-50",
      video: "/videos/historia-preview.mp4",
      stamp: "historia"
    },
    {
      icon: Users,
      title: "Festividades",
      description: "Celebraciones comunitarias que fortalecen los lazos sociales y preservan nuestras costumbres más queridas.",
      details: ["Fiestas patronales", "Celebraciones estacionales", "Encuentros culturales"],
      gradient: "from-rose-400 to-pink-600",
      bgColor: "bg-gradient-to-br from-rose-50 to-pink-50",
      video: "/videos/festival-preview.mp4",
      stamp: "festival"
    }
  ];

  const culturalStats = [
    { icon: Crown, number: "500+", label: "Años de Historia", color: "text-amber-600" },
    { icon: Palette, number: "20+", label: "Artesanos Locales", color: "text-orange-600" },
    { icon: Calendar, number: "8", label: "Festivales Anuales", color: "text-rose-600" },
    { icon: Heart, number: "100%", label: "Tradición Viva", color: "text-red-600" }
  ];

  const upcomingEvents = [
    { date: "15 Nov", name: "Festival de la Luna", type: "Celebración", spots: 12 },
    { date: "22 Nov", name: "Taller de Cerámica", type: "Taller", spots: 8 },
    { date: "30 Nov", name: "Noche de Leyendas", type: "Cultural", spots: 15 }
  ];

  // Simular contador de visitantes
  useEffect(() => {
    const interval = setInterval(() => {
      setVisitorCount(prev => prev + Math.floor(Math.random() * 3));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleExperienceClick = (index: number, stamp: string) => {
    setActiveExperience(activeExperience === index ? null : index);
    if (!collectedStamps.includes(stamp)) {
      setCollectedStamps(prev => [...prev, stamp]);
    }
  };

  const generateItinerary = () => {
    const itinerary = {
      title: "Tu Experiencia Cultural Personalizada",
      activities: collectedStamps.map(stamp => {
        const aspect = culturalAspects.find(a => a.stamp === stamp);
        return aspect?.title;
      }).filter(Boolean),
      duration: `${collectedStamps.length * 2} horas`,
      difficulty: collectedStamps.length > 2 ? "Intensa" : "Moderada"
    };
    
    // Aquí podrías generar un PDF o mostrar un modal
    alert(`¡Itinerario generado!\nActividades: ${itinerary.activities.join(', ')}\nDuración: ${itinerary.duration}`);
  };

  return (
    <section id="cultura" className="py-24 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-20 right-10 w-40 h-40 bg-orange-200/30 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 left-10 w-32 h-32 bg-amber-200/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-rose-200/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '0.5s' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Header interactivo */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-orange-100 px-6 py-3 rounded-full mb-6 shadow-lg">
            <Sparkles className="h-5 w-5 text-orange-600" />
            <span className="text-orange-800 font-semibold">
              {visitorCount}+ personas planean visitar este mes
            </span>
          </div>
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Vive la Magia de{' '}
            <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              San Juan Tahitic
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            No solo leas sobre nuestra cultura - <strong>vívela, siéntela y llévatela contigo</strong>. 
            Una experiencia que transformará tu manera de ver el mundo.
          </p>
        </div>

        {/* Pasaporte Cultural */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 mb-12 border-2 border-orange-200 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-gray-900 flex items-center">
              <MapPin className="h-6 w-6 mr-2 text-orange-600" />
              Tu Pasaporte Cultural
            </h3>
            <span className="text-sm text-gray-600">
              {collectedStamps.length}/4 experiencias descubiertas
            </span>
          </div>
          <div className="grid grid-cols-4 gap-4 mb-4">
            {culturalAspects.map((aspect, index) => (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 mx-auto rounded-full border-4 ${
                  collectedStamps.includes(aspect.stamp) 
                    ? 'border-green-500 bg-green-100' 
                    : 'border-gray-300 bg-gray-100'
                } flex items-center justify-center transition-all duration-300`}>
                  <aspect.icon className={`h-6 w-6 ${
                    collectedStamps.includes(aspect.stamp) ? 'text-green-600' : 'text-gray-400'
                  }`} />
                </div>
                <span className="text-xs mt-2 font-medium block">
                  {collectedStamps.includes(aspect.stamp) ? '¡Descubierto!' : 'Por descubrir'}
                </span>
              </div>
            ))}
          </div>
          {collectedStamps.length > 0 && (
            <button 
              onClick={generateItinerary}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
            >
              <Download className="h-5 w-5 mr-2" />
              Generar Mi Itinerario Personalizado
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {culturalAspects.map((aspect, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-culture transition-all duration-500 transform hover:-translate-y-2 border-0 bg-white/90 backdrop-blur-sm overflow-hidden cursor-pointer"
              onClick={() => handleExperienceClick(index, aspect.stamp)}
            >
              <CardHeader className="flex flex-row items-start space-y-0 pb-4 relative">
                {/* Gradiente de fondo animado */}
                <div className={`absolute inset-0 ${aspect.bgColor} opacity-0 group-hover:opacity-50 transition-opacity duration-500`}></div>
                
                <div className="relative mr-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-200 to-amber-200 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                  <div className={`relative bg-gradient-to-br ${aspect.gradient} p-4 rounded-2xl shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    <aspect.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                
                <div className="flex-1 relative">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl text-gray-900 group-hover:text-orange-700 transition-colors duration-300 mb-3">
                      {aspect.title}
                    </CardTitle>
                    {collectedStamps.includes(aspect.stamp) && (
                      <Star className="h-5 w-5 text-amber-500 fill-current" />
                    )}
                  </div>
                  <CardDescription className="text-gray-600 text-base leading-relaxed">
                    {aspect.description}
                  </CardDescription>
                </div>
              </CardHeader>
              
              <CardContent className="relative">
                {/* Video preview interactivo */}
                {activeExperience === index && (
                  <div className="mb-4 rounded-xl overflow-hidden shadow-lg">
                    <div className="relative aspect-video bg-black">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-center justify-center">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsPlaying(!isPlaying);
                          }}
                          className="bg-white/20 backdrop-blur-sm rounded-full p-4 hover:bg-white/30 transition-all duration-300"
                        >
                          {isPlaying ? 
                            <Pause className="h-8 w-8 text-white" /> : 
                            <Play className="h-8 w-8 text-white" />
                          }
                        </button>
                      </div>
                      <div className="text-white absolute bottom-4 left-4">
                        <p className="text-sm font-medium">Preview de la experiencia</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  {aspect.details.map((detail, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-center text-gray-700 group-hover:text-orange-700 transition-colors duration-300"
                    >
                      <div className={`w-3 h-3 bg-gradient-to-r ${aspect.gradient} rounded-full mr-3 shadow-lg group-hover:scale-125 transition-transform duration-300`}></div>
                      <span className="font-medium">{detail}</span>
                    </div>
                  ))}
                </div>
                
                {/* Barra de progreso decorativa */}
                <div className="mt-6 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full bg-gradient-to-r ${aspect.gradient} transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 shadow-lg`}></div>
                </div>

                {/* Call to Action */}
                <button className="w-full mt-4 bg-gradient-to-r from-orange-400 to-amber-400 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Quiero Experimentar Esto
                </button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Sección de Eventos Próximos */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 mb-12 border-2 border-orange-200 shadow-xl">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Próximas Experiencias Inmersivas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="bg-gradient-to-br from-white to-orange-50 rounded-2xl p-6 border border-orange-100 hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-orange-100 px-3 py-1 rounded-full">
                    <span className="text-orange-700 font-semibold text-sm">{event.date}</span>
                  </div>
                  <div className="bg-red-100 px-2 py-1 rounded-full">
                    <span className="text-red-600 text-xs font-medium">{event.spots} cupos</span>
                  </div>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-700 transition-colors duration-300">
                  {event.name}
                </h4>
                <p className="text-gray-600 mb-4">{event.type}</p>
                <button className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-2 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                  Reservar Mi Lugar
                </button>
              </div>
            ))}
          </div>
        </div>

       

      </div>
    </section>
  );
}