import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Textarea } from './components/ui/textarea';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { useTranslation } from './contexts/TranslationContext'; // ← AGREGAR IMPORT

export function ContactSection() {
  const { t } = useTranslation(); // ← AGREGAR HOOK

  const contactInfo = [
    {
      icon: MapPin,
      title: t('contact.contactItems.location.title'), // ← TRADUCIBLE
      content: t('contact.contactItems.location.content'), // ← TRADUCIBLE
      details: t('contact.contactItems.location.details') // ← TRADUCIBLE
    },
    {
      icon: Phone,
      title: t('contact.contactItems.phone.title'), // ← TRADUCIBLE
      content: t('contact.contactItems.phone.content'), // ← TRADUCIBLE
      details: t('contact.contactItems.phone.details') // ← TRADUCIBLE
    },
    {
      icon: Mail,
      title: t('contact.contactItems.email.title'), // ← TRADUCIBLE
      content: t('contact.contactItems.email.content'), // ← TRADUCIBLE
      details: t('contact.contactItems.email.details') // ← TRADUCIBLE
    },
    {
      icon: Clock,
      title: t('contact.contactItems.hours.title'), // ← TRADUCIBLE
      content: t('contact.contactItems.hours.content'), // ← TRADUCIBLE
      details: t('contact.contactItems.hours.details') // ← TRADUCIBLE
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t('contact.contactForm.successMessage')); // ← TRADUCIBLE
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
          <h2 className="text-4xl text-white font-semibold font-serif mb-4">
            {t('contact.title')} {/* ← TRADUCIBLE */}
          </h2>
          <p className="text-xl text-amber-200 max-w-3xl mx-auto">
            {t('contact.subtitle')} {/* ← TRADUCIBLE */}
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Columna izquierda */}
          <div>
            <h3 className="text-2xl text-white font-medium font-serif mb-8">
              {t('contact.contactInfo')} {/* ← TRADUCIBLE */}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <Card key={index} className="group hover:shadow-lg transition-shadow duration-300 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                    <div className="bg-blue-100 p-2 rounded-lg mr-3 group-hover:bg-blue-200 transition-colors duration-300">
                      <info.icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg font-medium font-serif text-gray-900">{info.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-900 mb-1">{info.content}</p>
                    <CardDescription className="text-sm">{info.details}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-8">
              <h4 className="text-xl text-white font-bold font-serif mb-4">
                {t('contact.howToGetThere')} {/* ← TRADUCIBLE */}
              </h4>
              <div className="bg-white/90 p-6 rounded-lg shadow-md backdrop-blur-sm">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Mapa de ubicación de San Juan Tahitic"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <p className="text-gray-600 text-sm">
                  {t('contact.mapDescription')} {/* ← TRADUCIBLE */}
                </p>
              </div>
            </div>
          </div>
          {/* Columna derecha */}
          <div>
            <h3 className="text-2xl text-white font-bold font-serif mb-8">
              {t('contact.sendMessage')} {/* ← TRADUCIBLE */}
            </h3>
            <Card className="shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-gray-900 font-bold font-serif">
                  {t('contact.contactForm.title')} {/* ← TRADUCIBLE */}
                </CardTitle>
                <CardDescription>
                  {t('contact.contactForm.description')} {/* ← TRADUCIBLE */}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="nombre" className="block text-sm text-gray-700 mb-2">
                        {t('contact.contactForm.name')} {/* ← TRADUCIBLE */}
                      </label>
                      <Input 
                        id="nombre" 
                        name="nombre" 
                        required 
                        placeholder={t('contact.contactForm.namePlaceholder')} // ← TRADUCIBLE
                        className="w-full" 
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm text-gray-700 mb-2">
                        {t('contact.contactForm.email')} {/* ← TRADUCIBLE */}
                      </label>
                      <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        required 
                        placeholder={t('contact.contactForm.emailPlaceholder')} // ← TRADUCIBLE
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="telefono" className="block text-sm text-gray-700 mb-2">
                      {t('contact.contactForm.phone')} {/* ← TRADUCIBLE */}
                    </label>
                    <Input 
                      id="telefono" 
                      name="telefono" 
                      type="tel" 
                      placeholder={t('contact.contactForm.phonePlaceholder')} // ← TRADUCIBLE
                    />
                  </div>
                  <div>
                    <label htmlFor="asunto" className="block text-sm text-gray-700 mb-2">
                      {t('contact.contactForm.subject')} {/* ← TRADUCIBLE */}
                    </label>
                    <Input 
                      id="asunto" 
                      name="asunto" 
                      required 
                      placeholder={t('contact.contactForm.subjectPlaceholder')} // ← TRADUCIBLE
                    />
                  </div>
                  <div>
                    <label htmlFor="mensaje" className="block text-sm text-gray-700 mb-2">
                      {t('contact.contactForm.message')} {/* ← TRADUCIBLE */}
                    </label>
                    <Textarea
                      id="mensaje"
                      name="mensaje"
                      required
                      rows={5}
                      placeholder={t('contact.contactForm.messagePlaceholder')} // ← TRADUCIBLE
                    />
                  </div>
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold font-serif">
                    {t('contact.contactForm.submit')} {/* ← TRADUCIBLE */}
                  </Button>
                </form>
              </CardContent>
            </Card>
            <div className="mt-8 bg-blue-50 p-6 rounded-lg">
              <h4 className="text-lg text-gray-900 font-bold font-serif mb-3">
                {t('contact.additionalInfo')} {/* ← TRADUCIBLE */}
              </h4>
              <ul className="space-y-2 text-sm font-medium font-serif text-gray-600">
                {(t('contact.additionalItems') as unknown as string[]).map((item, index) => ( // ← TRADUCIBLE
                  <li key={index}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}