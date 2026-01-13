import { Link } from 'react-router-dom';
import type { Model } from '../../types';

interface ModelCardProps {
  model: Model;
}

const ModelCard = ({ model }: ModelCardProps) => {
  const formattedPrice = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
  }).format(model.price);

  return (
    <Link to={`/models/${model.id}`} className="group block rounded-lg overflow-hidden transition-all duration-200 hover:-translate-y-1 flex flex-col h-full items-center text-center">
      <div className="pt-1 px-4 pb-0 flex flex-col items-center relative z-10">
        <h3 className="text-2xl font-[600] mb-1 text-black group-hover:text-red-600 transition-colors">{model.name}</h3>
        <p className="text-[#191919] font-[400] text-sm">{model.year} | {formattedPrice}</p>
      </div>
      
      <div className="w-full aspect-[16/9] overflow-hidden relative flex items-center justify-center -mt-8 md:-mt-4">
         <img 
            src={model.thumbnail} 
            alt={model.name} 
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" 
         />
      </div>

       <div className="p-1 -mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 relative">
          <span className="bg-[#191919] text-[#FFFFFF] font-toyota font-[600] px-8 py-2 rounded-full text-xs tracking-wider">Ver Modelo</span>
       </div>
    </Link>
  );
};

export default ModelCard;
