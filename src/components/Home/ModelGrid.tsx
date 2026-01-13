import type { Model } from '../../types';
import ModelCard from '../ModelCard/ModelCard';

interface ModelGridProps {
  models: Model[];
}

const ModelGrid = ({ models }: ModelGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 pb-12 gap-y-2 md:gap-y-16">
      {models.map((model) => (
        <ModelCard key={model.id} model={model} />
      ))}
      {models.length === 0 && (
        <div className="col-span-full text-center py-12 text-gray-500">
            No se encontraron modelos para esta categoría.
        </div>
      )}
    </div>
  );
};

export default ModelGrid;
