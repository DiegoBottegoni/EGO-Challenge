import type { ModelDetail } from '../../types';

interface ModelHeroProps {
  model: ModelDetail;
}

const ModelHero = ({ model }: ModelHeroProps) => {
  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8 md:py-12 flex flex-col md:flex-row gap-8 md:items-center">
        <div className="flex-1">
             <img src={model.photo} alt={model.name} className="w-full h-auto object-contain" />
        </div>
        <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-bold text-[#373737] mb-2">{model.name}</h1>
            <h2 className="text-2xl md:text-4xl font-bold text-[#373737] mb-8">{model.title}</h2>
            <div className="prose max-w-none text-gray-600 mb-8" dangerouslySetInnerHTML={{ __html: model.description }} />
        </div>
    </div>
  );
};

export default ModelHero;
