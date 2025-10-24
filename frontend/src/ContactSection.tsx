import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Textarea } from './components/ui/textarea';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

export function ContactSection() {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Ubicación",
      content: "San Juan Tahitic, Región Central",
      details: "Accesible por carretera principal"
    },
    {
      icon: Phone,
      title: "Teléfono",
      content: "+1 (555) 123-4567",
      details: "Lunes a Domingo 8:00 AM - 6:00 PM"
    },
    {
      icon: Mail,
      title: "Email",
      content: "info@sanjuantahitic.com",
      details: "Respuesta en 24 horas"
    },
    {
      icon: Clock,
      title: "Horarios de Visita",
      content: "Todos los días",
      details: "8:00 AM - 6:00 PM"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Gracias por tu mensaje. Te contactaremos pronto.');
  };

  return (
    <section id="contacto" className="relative py-20 overflow-hidden bg-gray-50">
      {/* 🔹 Fondo con imagen y gradiente (solo mitad superior) */}
      <div
        className="absolute inset-0 bg-[url('images/Exploracion.svg')]
                   bg-cover bg-center opacity-85"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 100%)',
          filter: 'blur(1.5px) brightness(0.75)',
        }}
      ></div>

      {/* Capa de sombra para mejorar legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/30 via-gray-800/10 to-transparent"></div>

      {/* Contenido principal */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl text-white mb-4">Contacto e Información</h2>
          <p className="text-xl text-amber-200 max-w-3xl mx-auto">
            Planifica tu visita a San Juan Tahitic. Estamos aquí para ayudarte a 
            organizar una experiencia memorable en nuestro destino.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Columna izquierda */}
          <div>
            <h3 className="text-2xl text-white mb-8">Información de Contacto</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <Card key={index} className="group hover:shadow-lg transition-shadow duration-300 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                    <div className="bg-blue-100 p-2 rounded-lg mr-3 group-hover:bg-blue-200 transition-colors duration-300">
                      <info.icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg text-gray-900">{info.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-900 mb-1">{info.content}</p>
                    <CardDescription className="text-sm">{info.details}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8">
              <h4 className="text-xl text-white mb-4">¿Cómo llegar?</h4>
              <div className="bg-white/90 p-6 rounded-lg shadow-md backdrop-blur-sm">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Mapa de ubicación de San Juan Tahitic"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <p className="text-gray-600 text-sm">
                  San Juan Tahitic se encuentra ubicado en una zona de fácil acceso por carretera. 
                  Desde la capital regional, el viaje toma aproximadamente 2 horas en vehículo particular 
                  o transporte público.
                </p>
              </div>
            </div>
          </div>

          {/* Columna derecha */}
          <div>
            <h3 className="text-2xl text-white mb-8">Envíanos un Mensaje</h3>
            <Card className="shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-gray-900">Formulario de Contacto</CardTitle>
                <CardDescription>
                  Completa el formulario y te responderemos a la brevedad
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="nombre" className="block text-sm text-gray-700 mb-2">
                        Nombre *
                      </label>
                      <Input id="nombre" name="nombre" required placeholder="Tu nombre completo" className="w-full" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm text-gray-700 mb-2">
                        Email *
                      </label>
                      <Input id="email" name="email" type="email" required placeholder="tu@email.com" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="telefono" className="block text-sm text-gray-700 mb-2">
                      Teléfono
                    </label>
                    <Input id="telefono" name="telefono" type="tel" placeholder="Tu número de teléfono" />
                  </div>

                  <div>
                    <label htmlFor="asunto" className="block text-sm text-gray-700 mb-2">
                      Asunto *
                    </label>
                    <Input id="asunto" name="asunto" required placeholder="¿En qué podemos ayudarte?" />
                  </div>

                  <div>
                    <label htmlFor="mensaje" className="block text-sm text-gray-700 mb-2">
                      Mensaje *
                    </label>
                    <Textarea
                      id="mensaje"
                      name="mensaje"
                      required
                      rows={5}
                      placeholder="Cuéntanos más detalles sobre tu consulta o visita planeada..."
                    />
                  </div>

                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Enviar Mensaje
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="mt-8 bg-blue-50 p-6 rounded-lg">
              <h4 className="text-lg text-gray-900 mb-3">Información Adicional</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Se recomienda reservar con anticipación para tours guiados</li>
                <li>• Temporada alta: Diciembre a Marzo</li>
                <li>• Disponemos de guías locales especializados</li>
                <li>• Aceptamos grupos de diferentes tamaños</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
