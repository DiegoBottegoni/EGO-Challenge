import { useState, useMemo } from 'react';
import type { Model } from '../types';
import { FILTER_CATEGORIES, SORT_OPTIONS } from '../constants';

export const useModelFilter = (models: Model[]) => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [activeSort, setActiveSort] = useState<string>(SORT_OPTIONS.NONE);

  const filteredAndSortedModels = useMemo(() => {
    let result = [...models];

    // Filter
    if (activeFilter) {
      if (activeFilter === FILTER_CATEGORIES.CARS) {
        result = result.filter(m => m.segment === 'Autos' || m.segment === 'Sedan' || m.segment === 'Hatchback');
      } else if (activeFilter === FILTER_CATEGORIES.PICKUPS) {
        result = result.filter(m => m.segment === 'Pickups y Comerciales');
      } else if (activeFilter === FILTER_CATEGORIES.SUVS) {
        result = result.filter(m => m.segment === 'SUVs y Crossovers' || m.segment === 'SUVs');
      }
    }

    // Sort
    switch (activeSort) {
      case SORT_OPTIONS.PRICE_ASC:
        result.sort((a, b) => a.price - b.price);
        break;
      case SORT_OPTIONS.PRICE_DESC:
        result.sort((a, b) => b.price - a.price);
        break;
      case SORT_OPTIONS.YEAR_DESC:
        result.sort((a, b) => b.year - a.year);
        break;
      case SORT_OPTIONS.YEAR_ASC:
        result.sort((a, b) => a.year - b.year);
        break;
      default:
        break;
    }

    return result;
  }, [models, activeFilter, activeSort]);

  return {
    activeFilter,
    setActiveFilter,
    activeSort,
    setActiveSort,
    filteredAndSortedModels
  };
};
