import { Link } from 'react-router-dom';
import { MENU_GROUPS, BOTTOM_MENU_GROUP } from '../../constants/menu';

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const MenuDrawer = ({ isOpen, onClose }: MenuDrawerProps) => {
  if (!isOpen) return null;

  return (
    <div className="hidden md:block fixed inset-0 z-[60] pointer-events-none">
        {/* Drawer */}
        <div className="absolute right-0 top-0 h-full w-1/4 bg-white shadow-2xl flex flex-col pointer-events-auto">
            {/* Close Button Header */}
            <div className="p-6 flex justify-end">
            <button 
                onClick={onClose}
                className="flex items-center gap-4 text-gray-800 focus:outline-none"
            >
                <span className="text-sm font-medium">Cerrar</span>
                <span className="text-xl">X</span>
            </button>
            </div>

            {/* Desktop Content */}
            <div className="flex-1 overflow-y-auto px-8 -pb-6 mt-6 flex flex-col text-right">
                <div className="flex-1">
                {MENU_GROUPS.map((group, groupIndex) => (
                    <div key={groupIndex} className={`space-y-5 ${groupIndex > 0 ? 'pt-5 mt-5 border-t border-[#D1D1D1]' : ''}`}>
                        {group.map((item) => (
                            <Link 
                                key={item.label} 
                                to={item.to} 
                                className="block text-xl text-black font-[400] hover:text-red-500 transition-colors"
                                onClick={onClose}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                ))}
                </div>
                {/* Bottom Gray */}
                <div className="bg-[#EFEEEF] -mx-8 -mb-6 p-8 mt-4 text-right">
                <div className="space-y-4">
                    {BOTTOM_MENU_GROUP.map((item) => (
                        <Link 
                            key={item.label} 
                            to={item.to} 
                            className="block text-xl text-black font-[400] hover:text-gray-600"
                            onClick={onClose}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default MenuDrawer;
