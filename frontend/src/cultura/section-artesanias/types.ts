// types.ts
export interface Artisan {
  name: string;
  experience: string;
  location: string;
}

export interface ArtisanCraft {
  id: number;
  name: string;
  category: 'textiles' | 'ceramica' | 'madera';
  description: string;
  materials: string[];
  techniques: string[];
  timeRequired: string;
  priceRange: string;
  artisan: Artisan;
  image: string;
  story: string;
}

export interface ArtesaniasData {
  artesanias: ArtisanCraft[];
}

export interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  onLoad?: () => void;
}

export type FilterType = 'todos' | 'textiles' | 'ceramica' | 'madera';

// Constantes para categorías
export const categoryIcons = {
  textiles: 'Scissors',
  ceramica: 'Palette',
  madera: 'Brush'
} as const;

export const categoryColors = {
  textiles: 'bg-blue-100 text-blue-800 border-blue-200',
  ceramica: 'bg-amber-100 text-amber-800 border-amber-200',
  madera: 'bg-emerald-100 text-emerald-800 border-emerald-200'
} as const;

export const categoryNames = {
  textiles: 'Textiles Tradicionales',
  ceramica: 'Cerámica Artesanal',
  madera: 'Tallado en Madera'
} as const;