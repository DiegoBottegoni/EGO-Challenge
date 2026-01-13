import { useParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import ModelFeatures from '../../components/ModelFeatures/ModelFeatures';
import ModelHighlights from '../../components/ModelHighlights/ModelHighlights';
import ModelHero from '../../components/ModelDetail/ModelHero';
import { useModelDetail } from '../../hooks/useModelDetail';

const ModelDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { model, loading, error } = useModelDetail(id);

  if (loading) return <Loader />;
  if (error || !model) return <div className="text-center text-red-500 text-lg p-8">{error || 'Model not found'}</div>;

  return (
    <div className="animate-fade-in">
        <ModelHero model={model} />
        
        {/* Features Carousel/Slider */}
        <ModelFeatures features={model.model_features} />
        
        {/* Highlights */}
        <ModelHighlights highlights={model.model_highlights} />
    </div>
  );
};

export default ModelDetail;
