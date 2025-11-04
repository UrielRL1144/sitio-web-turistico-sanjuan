// hooks/useArtesaniasData.ts - versión mejorada
import { useState, useMemo, useCallback } from 'react';
import type{ ArtisanCraft, FilterType } from '../types';
import artesaniasData from '../../../archivos_data/artesanias.json';

export const useArtesaniasData = (scrollToTop?: () => void) => {
  const [filter, setFilter] = useState<FilterType>('todos');
  const [activeCraft, setActiveCraft] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  // Casting seguro de datos
  const craftsData: ArtisanCraft[] = (artesaniasData as any).artesanias;

  // Filtrar artesanías de forma memoizada
  const filteredCrafts = useMemo(() => {
    return filter === 'todos' 
      ? craftsData 
      : craftsData.filter(craft => craft.category === filter);
  }, [filter, craftsData]);

  // Artesanías a mostrar (limitadas o todas)
  const craftsToShow = useMemo(() => {
    return showAll ? filteredCrafts : filteredCrafts.slice(0, 6);
  }, [showAll, filteredCrafts]);

  const handleFilterClick = (newFilter: FilterType) => {
    setFilter(newFilter);
    setActiveCraft(null);
    setShowAll(false);
  };

  const handleCraftClick = (id: number) => {
    setActiveCraft(activeCraft === id ? null : id);
  };

  const handleCloseModal = () => {
    setActiveCraft(null);
  };

  const toggleShowAll = useCallback(() => {
    const willShowAll = !showAll;
    setShowAll(willShowAll);
    
    // Si estamos cambiando a "Ver menos", hacer scroll al inicio
    if (!willShowAll) {
      setTimeout(() => {
        scrollToTop?.();
      }, 100);
    }
  }, [showAll, scrollToTop]);

  return {
    craftsData,
    filteredCrafts,
    craftsToShow,
    filter,
    activeCraft,
    showAll,
    handleFilterClick,
    handleCraftClick,
    handleCloseModal,
    toggleShowAll,
    setActiveCraft
  };
};