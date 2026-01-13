import { Link } from 'react-router-dom';
import { MENU_GROUPS, BOTTOM_MENU_GROUP } from '../../constants/menu';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  return (
    <div 
    className={`md:hidden fixed inset-x-0 bottom-0 top-16 bg-white z-[40] overflow-y-auto transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-y-0' : 'translate-y-full'
    }`}
  >
     <div className="flex flex-col h-full bg-white text-right">
         {/* Close Button Mobile */}
         <div className="p-6 pb-10 text-right">
            <button onClick={onClose} className="text-gray-800 flex items-center justify-end gap-2 ml-auto">
                <span className="text-sm font-medium">Cerrar</span>
                <span className="text-xl">X</span>
            </button>
         </div>

         {/* Mobile Menu Content */}
         <div className="flex-1 space-y-6 px-6 pb-6">
            {MENU_GROUPS.map((group, groupIndex) => (
                <div key={groupIndex} className={`space-y-4 ${groupIndex > 0 ? 'pt-8 border-t border-[#D1D1D1]' : ''}`}>
                    {group.map((item) => (
                        <Link 
                            key={item.label} 
                            to={item.to} 
                            className="block text-xl text-black font-[400] hover:text-red-500"
                            onClick={onClose}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            ))}
         </div>
         <div className="bg-[#EFEEEF] p-6 mt-6 text-right">
             <div className="space-y-4">
              {BOTTOM_MENU_GROUP.map((item) => (
                  <Link 
                      key={item.label} 
                      to={item.to} 
                      className="block text-lg text-black font-[400]"
                      onClick={onClose}
                  >
                      {item.label}
                  </Link>
              ))}
             </div>
         </div>
     </div>
  </div>
  );
};

export default MobileMenu;
