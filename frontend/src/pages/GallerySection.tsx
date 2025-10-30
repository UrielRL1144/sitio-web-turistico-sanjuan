import { GalleryGeneralSection } from '@/galeria/GalleryGeneralSection';
import  { ExperienceMural }  from '@/galeria/ExperienceMural';

export function GallerySection() {
  return (
    <>
      {/* Galería general */}
      <GalleryGeneralSection images={[]} />

      {/* Galería para usuarios */}
      <ExperienceMural />


    </>
  );
}
