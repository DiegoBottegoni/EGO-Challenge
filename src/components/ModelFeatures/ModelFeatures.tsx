import type { ModelFeature } from '../../types';
import { useCarousel } from '../../hooks/useCarousel';
import CarouselArrows from './CarouselArrows';
import CarouselDots from './CarouselDots';

interface ModelFeaturesProps {
  features: ModelFeature[];
}

const ModelFeatures = ({ features }: ModelFeaturesProps) => {
  const {
    scrollContainerRef,
    displayFeatures,
    totalDots,
    currentDotIndex,
    setIsPaused,
    scrollLeft,
    scrollRight,
    handleDotClick
  } = useCarousel(features);

  return (
    <section 
      className="bg-[#F7F7F7] py-16 relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <CarouselArrows scrollLeft={scrollLeft} scrollRight={scrollRight} />

      {/* Full-width Carousel Container */}
      <div className="w-full overflow-hidden relative">
        <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-6 pb-6 hide-scrollbar" 
            style={{ 
              paddingLeft: 'max(1rem, calc((100vw - 1200px) / 2))',
              paddingRight: 'max(1rem, calc((100vw - 1200px) / 2))',
              maskImage: 'linear-gradient(to right, rgba(0,0,0,0.5) 0%, black 10%, black 90%, rgba(0,0,0,0.5) 100%)',
              WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0.5) 0%, black 10%, black 90%, rgba(0,0,0,0.5) 100%)'
            }}
        >
            {displayFeatures.map((feature, index) => (
            <div key={index} className="flex-shrink-0 w-[85%] md:w-[40%] lg:w-[23%] flex flex-col gap-4 group">
                <div className="rounded-lg overflow-hidden h-40 bg-white flex items-center justify-center transition-opacity group-hover:opacity-30">
                    <img 
                        src={feature.image} 
                        alt={feature.name} 
                        className="w-full h-full object-cover" 
                        onError={(e) => e.currentTarget.style.display = 'none'}
                    />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">{feature.name}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{feature.description}</p>
            </div>
            ))}
        </div>
      </div>

      <CarouselDots 
        totalDots={totalDots} 
        currentDotIndex={currentDotIndex} 
        handleDotClick={handleDotClick} 
      />

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default ModelFeatures;

