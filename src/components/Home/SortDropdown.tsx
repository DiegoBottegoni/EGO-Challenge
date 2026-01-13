import { SORT_OPTIONS } from '../../constants';

interface SortDropdownProps {
  activeSort: string;
  onSortChange: (sort: string) => void;
  setIsFilterOpen: (isOpen: boolean) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const SortDropdown = ({
  activeSort,
  onSortChange,
  setIsFilterOpen,
  isOpen,
  setIsOpen
}: SortDropdownProps) => {

  const sortOptions = [
    { value: SORT_OPTIONS.NONE, label: 'Nada' },
    { value: SORT_OPTIONS.PRICE_ASC, label: <span>De <span className="font-[600]">menor</span> a <span className="font-[600]">mayor</span> precio</span> },
    { value: SORT_OPTIONS.PRICE_DESC, label: <span>De <span className="font-[600]">mayor</span> a <span className="font-[600]">menor</span> precio</span> },
    { value: SORT_OPTIONS.YEAR_DESC, label: <span>Más <span className="font-[600]">nuevos</span> primero</span> },
    { value: SORT_OPTIONS.YEAR_ASC, label: <span>Más <span className="font-[600]">viejos</span> primero</span> },
  ];

  const handleToggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    if (newState) setIsFilterOpen(false);
  };

  return (
    <div className="relative flex justify-end">
      <button 
        onClick={handleToggle}
        className="flex items-center gap-2 text-[#373737] font-[600] text-sm focus:outline-none"
      >
        Ordenar por
        <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-white shadow-xl rounded-md z-50 py-1">
          {sortOptions.map((option, index) => (
            <button
              key={option.value}
              onClick={() => { onSortChange(option.value); setIsOpen(false); }}
              className={`
                block w-full text-left px-4 py-3 text-sm text-[#373737] hover:bg-gray-50 transition-colors
                ${activeSort === option.value ? 'bg-[#D1D6D634] font-[400]' : ''}
                ${index !== sortOptions.length - 1 ? 'border-b border-[#D8D8D8]' : ''}
              `}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
