import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { CultureHome } from '@/cultura/CultureHome';
import { CultureSection } from '@/cultura/CultureSection';
import { CultureLanguageSection } from '@/cultura/CultureLanguageSection';
import { CultureGastronomySection } from '@/cultura/CultureGastronomy';
import { CultureDance } from '@/cultura/CultureDance';
import { CultureArtesanias } from '@/cultura/CultureArtesanias';

export function CulturePage() {
  const { hash } = useLocation(); // <- obtiene el #hash de la URL

  useEffect(() => {
    if (hash) {
      // Espera un pequeño tiempo para asegurar que el DOM esté listo
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    } else {
      // Si no hay hash, vuelve al inicio de la página
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [hash]);

  return (
    <>
      <CultureHome />
      <CultureSection />
      <CultureLanguageSection />
      <CultureArtesanias />
      <CultureGastronomySection />
      <CultureDance />
    </>
  );
}
