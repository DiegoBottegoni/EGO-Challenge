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
    handleDotClick,
    isOverflowing
  } = useCarousel(features);

  return (
    <section
      className="bg-[#F7F7F7] py-6 relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <CarouselArrows scrollLeft={scrollLeft} scrollRight={scrollRight} />

      {/* Full-width Carousel Container */}
      <div className="w-full overflow-hidden relative">
        <div
          ref={scrollContainerRef}
          className={`flex overflow-x-auto gap-4 pb-4 hide-scrollbar ${!isOverflowing ? 'justify-around' : ''}`}
          style={{
            paddingLeft: 'max(1rem, calc((100vw - 1200px) / 2))',
            paddingRight: 'max(1rem, calc((100vw - 1200px) / 2))',
            maskImage: 'linear-gradient(to right, rgba(0,0,0,0.5) 0%, black 10%, black 90%, rgba(0,0,0,0.5) 100%)',
            WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0.5) 0%, black 10%, black 90%, rgba(0,0,0,0.5) 100%)'
          }}
        >
          {displayFeatures.map((feature, index) => (
            <div key={index} className="flex-shrink-0 w-[80%] md:w-[35%] lg:w-[21%] flex flex-col gap-4 group">
              <div className="rounded-lg overflow-hidden w-full aspect-[270/146] bg-white flex items-center justify-center transition-opacity group-hover:opacity-30">
                <img
                  src={feature.image}
                  alt={feature.name}
                  className="w-full h-full object-cover"
                  onError={(e) => e.currentTarget.style.display = 'none'}
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">{feature.name}</h3>
              <p className="text-gray-600 leading-relaxed text-xs">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="-mt-6 mb-4">
        <CarouselDots
          totalDots={totalDots}
          currentDotIndex={currentDotIndex}
          handleDotClick={handleDotClick}
        />
      </div>

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

