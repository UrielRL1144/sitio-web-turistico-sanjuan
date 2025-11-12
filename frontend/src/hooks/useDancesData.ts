// hooks/useDancesData.ts
import { useState, useEffect } from 'react';
import type { Dance } from '../i18n/types';
import { useTranslation } from '../contexts/TranslationContext';

// Importar todos los archivos de idioma
import danzasEs from '../archivos_data/danzas.json';
import danzasEn from '../archivos_data/danzas.en.json';
import danzasNah from '../archivos_data/danzas.nah.json';

interface DancesData {
  dances: Dance[];
}

export const useDancesData = () => {
  const [dances, setDances] = useState<Dance[]>([]);
  const { language } = useTranslation();

  // Cargar datos según el idioma
  useEffect(() => {
    const loadDancesData = () => {
      try {
        let data: DancesData;
        switch (language) {
          case 'es':
            data = danzasEs as DancesData;
            break;
          case 'en':
            data = danzasEn as DancesData;
            break;
          case 'nah':
            data = danzasNah as DancesData;
            break;
          default:
            data = danzasEs as DancesData;
        }
        setDances(data.dances);
      } catch (error) {
        console.error('Error loading dances data:', error);
        // Fallback a español
        setDances((danzasEs as DancesData).dances);
      }
    };

    loadDancesData();
  }, [language]);

  return {
    dances
  };
};