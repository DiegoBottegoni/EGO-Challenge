import { useState } from 'react';
import Loader from '../../components/Loader/Loader';
import { useModels } from '../../hooks/useModels';
import { useModelFilter } from '../../hooks/useModelFilter';
import FilterBar from '../../components/Home/FilterBar';
import SortDropdown from '../../components/Home/SortDropdown';
import ModelGrid from '../../components/Home/ModelGrid';

const Home = () => {
  const { models, loading, error } = useModels();
  const { 
    activeFilter, 
    setActiveFilter, 
    activeSort, 
    setActiveSort, 
    filteredAndSortedModels 
  } = useModelFilter(models);

  // UI state for dropdowns
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  if (loading) return <Loader />;
  if (error) return <div className="text-center text-[#EB0A1E] text-lg p-8">{error}</div>;

  return (
    <div className="py-12 px-4 max-w-[1200px] mx-auto mt-8">
      <h1 className="text-4xl md:text-6xl font-[700] text-left mb-8 -mt-10 md:mb-16 md:-mt-2 text-[#373737] tracking-tight">Descubrí todos los modelos</h1>
      
      <div className="flex flex-row justify-between items-center border-b border-gray-200 pb-4 mb-12 gap-4 relative z-30">
          
          <FilterBar 
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            isSortOpen={isSortOpen}
            setIsSortOpen={setIsSortOpen}
            isOpen={isFilterOpen}
            setIsOpen={setIsFilterOpen}
          />

          <SortDropdown 
            activeSort={activeSort}
            onSortChange={setActiveSort}
            setIsFilterOpen={setIsFilterOpen}
            isOpen={isSortOpen}
            setIsOpen={setIsSortOpen}
          />
      </div>

      <ModelGrid models={filteredAndSortedModels} />
    </div>
  );
};

export default Home;

