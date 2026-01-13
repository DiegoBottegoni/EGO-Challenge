import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import MenuDrawer from './MenuDrawer';
import MobileMenu from './MobileMenu';

interface NavbarProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const Navbar = ({ isMenuOpen, toggleMenu }: NavbarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleModelDetailsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const lastId = localStorage.getItem('lastVisitedModelId');
    if (lastId) {
      navigate(`/models/${lastId}`);
    } else {
      alert("Seleccioná un modelo primero para ver los detalles.");
    }
  };

  return (
    <>
      <nav className="fixed top-0 w-full bg-white border-b border-gray-200 z-50 h-16 transition-all duration-300">
        
        <div className="relative w-full h-full flex items-center justify-center">
            
            <div className="absolute left-4 md:left-8 flex items-center z-20 top-1/2 -translate-y-1/2">
                <Link to="/" className="flex items-center shrink-0">
                    <img src="/Logo.svg" alt="EGO Logo" className="w-10 h-10 object-contain" /> 
                </Link>
            </div>

            <div className="hidden md:flex w-full max-w-[1200px] pr-4 md:pl-28 2xl:pl-4 h-full items-center">
                <div className="flex items-center gap-10 h-full">
                    <NavLink 
                        to="/" 
                        className={({ isActive }) => `
                            flex items-center h-full px-1 border-b-4 transition-all duration-200 font-medium text-[#191919]
                            ${isActive ? 'border-[#EB0A1E] text-[#EB0A1E]' : 'border-transparent text-[#191919] hover:text-[#EB0A1E]'}
                        `}
                        end
                    >
                        <h3 className="px-10">Modelos</h3>
                    </NavLink>
                    <NavLink 
                        to="/ficha" 
                        onClick={handleModelDetailsClick}
                        className={({ isActive }) => `
                            flex items-center h-full px-1 border-b-4 transition-all duration-200 font-medium text-[#191919]
                            ${isActive || location.pathname.startsWith('/models/') ? 'border-[#EB0A1E] text-[#EB0A1E]' : 'border-transparent text-[#191919] hover:text-[#EB0A1E]'}
                        `}
                    >
                        <h3>Ficha de modelo</h3>
                    </NavLink>
                </div>
            </div>

            <div className="absolute right-4 md:right-8 flex items-center z-20 top-1/2 -translate-y-1/2">
                <button 
                    onClick={toggleMenu}
                    className="flex items-center gap-4 text-gray-800 focus:outline-none"
                >
                    <div className="flex items-center gap-4">
                        <span className="hidden md:block font-medium text-[#191919]">Menú</span>
                        <div className="space-y-1.5">
                            <span className="block w-6 h-0.5 bg-gray-600"></span>
                            <span className="block w-6 h-0.5 bg-gray-600"></span>
                            <span className="block w-6 h-0.5 bg-gray-600"></span>
                        </div>
                    </div>
                </button>
            </div>
        </div>
      </nav>

      {isMenuOpen && (
          <div className="hidden md:block fixed inset-0 bg-black/95 z-[55]" onClick={toggleMenu} />
      )}

      <MobileMenu isOpen={isMenuOpen} onClose={toggleMenu} />

      <MenuDrawer isOpen={isMenuOpen} onClose={toggleMenu} />
    </>
  );
};

export default Navbar;

