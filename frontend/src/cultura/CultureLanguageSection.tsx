import { Volume2, Languages, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { useState } from 'react';

type Phrase = {
  nahuatl: string;
  spanish: string;
  audio: string;
};

const phrases: Phrase[] = [
  {
    nahuatl: "Cualli tonalli",
    spanish: "Buen día",
    audio: "/audio/nahuatl/cualli-tonalli.mp3",
  },
  {
    nahuatl: "Tlazohcamati",
    spanish: "Gracias",
    audio: "/audio/nahuatl/tlazohcamati.mp3",
  },
  {
    nahuatl: "Nochipa",
    spanish: "Siempre",
    audio: "/audio/nahuatl/nochipa.mp3",
  },
  {
    nahuatl: "Tlen mochi",
    spanish: "Todo",
    audio: "/audio/nahuatl/tlen-mochi.mp3",
  },
  {
    nahuatl: "Kualualtsi",
    spanish: "Hermoso",
    audio: "/audio/nahuatl/Kualualtsi.mp3",
  },
  {
    nahuatl: "sankentsi nimitsitas",
    spanish: "Hasta luego",
    audio: "/audio/nahuatl/sankentsi nimitsitas.mp3",
  },
];

export function CultureLanguageSection() {
  const [playingPhrase, setPlayingPhrase] = useState<number | null>(null);

  const playAudio = (src: string, index: number) => {
    // Si ya hay un audio reproduciéndose, no hacemos nada.
    if (playingPhrase !== null) return;
    
    setPlayingPhrase(index);
    const audio = new Audio(src);
    audio.play();
    audio.onended = () => {
      setPlayingPhrase(null);
    };
  };

  return (<section id="idioma" className="py-24 relative overflow-hidden bg-[url('images/cultura/Fondo-lenguas.svg')] bg-no-repeat bg-center bg-cover">
  {/* capa translúcida para oscurecer o aclarar */}
  <div className="absolute inset-0 bg-black/10"></div>

  {/* Elementos decorativos de fondo */}
  <div className="absolute top-10 left-10 w-40 h-40 bg-lime-200/30 rounded-full blur-3xl animate-float"></div>
  <div
    className="absolute bottom-10 right-10 w-32 h-32 bg-emerald-200/30 rounded-full blur-3xl animate-float"
    style={{ animationDelay: '1.5s' }}
  ></div>
  <div
    className="absolute top-1/2 left-1/2 w-64 h-64 bg-green-200/20 rounded-full blur-3xl animate-float"
    style={{ animationDelay: '0.5s' }}
  ></div>
  {/* Contenido principal */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="text-center mb-10">
        {/* 🔹 Sello decorativo arriba */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-2 bg-gradient-to-r from-lime-100/80 to-green-100/80 backdrop-blur-md px-4 py-2 rounded-md shadow-md shadow-emerald-800/10">
            <Languages className="h-5 w-5 text-green-600" />
            <span className="text-green-800 font-medium font-serif">
              Lenguaje Ancestral
            </span>
          </div>
        </div>

        {/* 🔹 Bloque translúcido debajo del sello */}
        <div className="block bg-white/70 backdrop-blur-md rounded-3xl px-8 py-10 shadow-xl shadow-emerald-900/20 max-w-5xl mx-auto">
          <h2 className="text-5xl lg:text-6xl font-bold font-serif text-gray-900 mb-6">
            Hablando{' '}
            <span className="bg-gradient-to-r from-green-600 via-lime-500 to-emerald-600 bg-clip-text text-transparent">
              Náhuatl
            </span>
          </h2>
          <p className="text-xl text-gray-800 leading-relaxed max-w-3xl mx-auto">
            Explora la belleza y la sonoridad de nuestra lengua materna a través de frases cotidianas que
            han sido transmitidas por generaciones en nuestro hermoso{' '}
            <span className="bg-gradient-to-r from-red-700 via-fuchsia-600 via-40% to-emerald-700 bg-clip-text text-transparent font-black font-serif tracking-tight text-2xl">
              San Juan Tahitic
            </span>
          </p>
        </div>
      </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {phrases.map((phrase, idx) => (
            <Card
              key={idx}
              className="group hover:shadow-culture transition-all duration-500 transform hover:-translate-y-2 border-0 bg-white/90 backdrop-blur-sm overflow-hidden"
            >
              <CardHeader className="flex flex-row items-center space-y-0 pb-4 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-lime-50 to-green-50 opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                
                <div className="relative mr-4">
                  <div className="absolute inset-0 bg-gradient-to-br from-lime-200 to-green-200 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                  <div className="relative bg-gradient-to-br from-lime-400 to-green-600 p-3 rounded-2xl shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                </div>
                
                <div className="flex-1 relative">
                  <CardTitle 
                    className={`text-2xl font-bold font-serif transition-colors duration-300 ${
                      playingPhrase === idx ? 'text-green-700' : 'text-gray-900 group-hover:text-green-700'
                    }`}
                  >
                    {phrase.nahuatl}
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-base leading-relaxed">
                    {phrase.spanish}
                  </CardDescription>
                </div>
              </CardHeader>
              
              <CardContent className="relative flex justify-end">
                <button
                  onClick={() => playAudio(phrase.audio, idx)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-full font-semibold font-serif shadow-md transform hover:scale-105 transition-all duration-300"
                >
                  <Volume2 size={20} />
                  Escuchar
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
        {/* Botón de exploración del diccionario */}
        <div className="text-center mt-16">
          <a
            href="https://nawatl.com/glosarios/palabras-en-nahuatl/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full font-semibold font-serif shadow-2xl transform hover:scale-105 transition-all duration-300 animate-float"
          >
            Explorar más
          </a>
        </div>
      </div>
    </section>
  );
}