import { FILTER_CATEGORIES } from '../../constants';

interface FilterBarProps {
  activeFilter: string | null;
  onFilterChange: (filter: string | null) => void;
  isSortOpen: boolean;
  setIsSortOpen: (isOpen: boolean) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const FilterBar = ({ 
  activeFilter, 
  onFilterChange, 
  setIsSortOpen,
  isOpen,
  setIsOpen
}: FilterBarProps) => {

  const handleMobileToggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    if (newState) setIsSortOpen(false);
  };

  const MobileFilterContent = () => (
    <div className="absolute left-0 top-full mt-2 w-56 bg-white shadow-xl rounded-md z-50 py-1">
      <button
        onClick={() => { onFilterChange(null); setIsOpen(false); }}
        className={`block w-full text-left px-4 py-3 text-sm text-[#373737] font-[400] hover:bg-gray-50 transition-colors ${!activeFilter ? 'bg-[#D1D6D634] font-[600]' : ''} border-b border-[#D8D8D8]`}
      >
        {FILTER_CATEGORIES.ALL}
      </button>
      <button
        onClick={() => { onFilterChange(FILTER_CATEGORIES.CARS); setIsOpen(false); }}
        className={`block w-full text-left px-4 py-3 text-sm text-[#373737] font-[400] hover:bg-gray-50 transition-colors ${activeFilter === FILTER_CATEGORIES.CARS ? 'bg-[#D1D6D634] font-[600]' : ''} border-b border-[#D8D8D8]`}
      >
        {FILTER_CATEGORIES.CARS}
      </button>
      <button
        onClick={() => { onFilterChange(FILTER_CATEGORIES.PICKUPS); setIsOpen(false); }}
        className={`block w-full text-left px-4 py-3 text-sm text-[#373737] font-[400] hover:bg-gray-50 transition-colors ${activeFilter === FILTER_CATEGORIES.PICKUPS ? 'bg-[#D1D6D634] font-[600]' : ''} border-b border-[#D8D8D8]`}
      >
        {FILTER_CATEGORIES.PICKUPS}
      </button>
      <button
        onClick={() => { onFilterChange(FILTER_CATEGORIES.SUVS); setIsOpen(false); }}
        className={`block w-full text-left px-4 py-3 text-sm text-[#373737] font-[400] hover:bg-gray-50 transition-colors ${activeFilter === FILTER_CATEGORIES.SUVS ? 'bg-[#D1D6D634] font-[600]' : ''}`}
      >
        {FILTER_CATEGORIES.SUVS}
      </button>
    </div>
  );

  return (
    <div className="relative">
      {/* Mobile Dropdown Trigger */}
      <div className="md:hidden">
        <button 
          onClick={handleMobileToggle}
          className="flex items-center gap-2 text-[#373737] font-[600] text-sm focus:outline-none"
        >
          Filtrar por
          <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
        </button>

        {isOpen && <MobileFilterContent />}
      </div>

      {/* Desktop Tabs */}
      <div className="hidden md:flex flex-wrap items-center gap-8">
        <span className="text-[#373737] font-[600] text-sm mr-2">Filtrar por</span>
        <button 
          onClick={() => onFilterChange(null)}
          className={`text-sm px-4 pt-2 pb-2 rounded-full transition-colors font-[400] ${!activeFilter ? 'bg-[#F7F7F7] text-[#373737]' : 'text-[#373737] hover:bg-gray-100'}`}
        >
          {FILTER_CATEGORIES.ALL}
        </button>
        <button 
          onClick={() => onFilterChange(FILTER_CATEGORIES.CARS)}
          className={`text-sm px-4 pt-2 pb-2 rounded-full transition-colors font-[400] ${activeFilter === FILTER_CATEGORIES.CARS ? 'bg-[#F7F7F7] text-[#373737]' : 'text-[#373737] hover:bg-gray-100'}`}
        >
          {FILTER_CATEGORIES.CARS}
        </button>
        <button 
          onClick={() => onFilterChange(FILTER_CATEGORIES.PICKUPS)}
          className={`text-sm px-4 pt-2 pb-2 rounded-full transition-colors font-[400] ${activeFilter === FILTER_CATEGORIES.PICKUPS ? 'bg-[#F7F7F7] text-[#373737]' : 'text-[#373737] hover:bg-gray-100'}`}
        >
          {FILTER_CATEGORIES.PICKUPS}
        </button>
        <button 
          onClick={() => onFilterChange(FILTER_CATEGORIES.SUVS)}
          className={`text-sm px-4 pt-2 pb-2 rounded-full transition-colors font-[400] ${activeFilter === FILTER_CATEGORIES.SUVS ? 'bg-[#F7F7F7] text-[#373737]' : 'text-[#373737] hover:bg-gray-100'}`}
        >
          {FILTER_CATEGORIES.SUVS}
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
