// src/sections/VocesDeNuestraTierra/data.ts
import {
  BookOpen,
  Sprout,
  Users,
  Music,
  Heart,
  Handshake,
  Star
} from 'lucide-react';

export interface Testimonio {
  id: number;
  nombre: string;
  rol: string;
  testimonio: string;
  imagen: string;
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
  borderColor: string;
  detalles: string;
  tagline: string;
}

export const testimoniosData: Testimonio[] = [
  {
    id: 1,
    nombre: "Doña Rosa Mendoza",
    rol: "Artesana Textil",
    testimonio: "Mis manos no solo tejen hilos, tejen los sueños y las historias...",
    imagen: "/images/comunidad/testimonios/artesana.webp",
    icon: BookOpen,
    color: "from-teal-500 to-cyan-600",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-200",
    detalles: "35 años tejiendo tradición",
    tagline: "Guardiana de técnicas ancestrales"
  },
  {
    id: 2,
    nombre: "Don Javier Hernández",
    rol: "Agricultor",
    testimonio: "Esta tierra no es un recurso, es nuestra madre...",
    imagen: "/images/comunidad/testimonios/jose.webp",
    icon: Sprout,
    color: "from-blue-500 to-sky-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    detalles: "Cultivando maíz criollo por 40 años",
    tagline: "Custodio de la tierra y sus cultivos"
  },
  {
    id: 3,
    nombre: "Ana López",
    rol: "Joven Líder",
    testimonio: "Cargamos con el orgullo de nuestro pasado, pero nuestros pies caminan hacia el futuro. Nuestro sueño es tender un puente para que el mundo conozca nuestra cultura..",
    imagen: "/images/comunidad/testimonios/joven.webp",
    icon: Users,
    color: "from-sky-500 to-blue-600",
    bgColor: "bg-sky-50",
    borderColor: "border-sky-200",
    detalles: "Promotora de turismo sostenible",
    tagline: "Constructor de puentes culturales"
  },
  {
    id: 4,
    nombre: "Maestro Carlos Ruiz",
    rol: "Músico Tradicional",
    testimonio: "Cada nota de nuestra música cuenta la historia de nuestras montañas y ríos. No solo tocamos instrumentos, mantenemos viva la voz de nuestros ancestros a través de las melodías que nos heredaron.",
    imagen: "/images/comunidad/testimonios/musico.jpg",
    icon: Music,
    color: "from-cyan-500 to-teal-600",
    bgColor: "bg-cyan-50",
    borderColor: "border-cyan-200",
    detalles: "50 años preservando sonidos ancestrales",
    tagline: "Portador de la memoria sonora"
  },
  {
    id: 5,
    nombre: "Doña Elena Martínez",
    rol: "Cocinera Tradicional",
    testimonio: "En mi cocina, los sabores son cartas de amor a nuestra tierra. Cada platillo cuenta una historia de siembras, cosechas y las manos que hicieron posible este milagro diario.",
    imagen: "/images/comunidad/testimonios/cocinera.png",
    icon: Heart,
    color: "from-teal-600 to-cyan-700",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-200",
    detalles: "Especialista en cocina de maíz",
    tagline: "Guardiana de los sabores ancestrales"
  },
  {
    id: 6,
    nombre: "Don Miguel Torres",
    rol: "Coordinador de Tequios",
    testimonio: "El tequio nos recuerda que somos más fuertes juntos. Cuando trabajamos hombro con hombro, no solo construimos caminos o escuelas, tejemos la confianza que nos hace una verdadera comunidad.",
    imagen: "/images/comunidad/testimonios/coordinador.jpg",
    icon: Handshake,
    color: "from-blue-600 to-sky-700",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    detalles: "30 años organizando trabajo comunitario",
    tagline: "Tejedor de solidaridad"
  },
  {
    id: 7,
    nombre: "Profesora Sofia Reyes",
    rol: "Educadora Comunitaria",
    testimonio: "Enseñar aquí no es solo transmitir conocimientos, es ayudar a nuestros niños a encontrar el equilibrio entre el orgullo de sus raíces y las oportunidades del mundo moderno.",
    imagen: "/images/comunidad/testimonios/maestra.jpg",
    icon: Star,
    color: "from-sky-600 to-blue-700",
    bgColor: "bg-sky-50",
    borderColor: "border-sky-200",
    detalles: "25 años formando nuevas generaciones",
    tagline: "Guía entre tradición y futuro"
  }
  // ... resto de testimonios
];
