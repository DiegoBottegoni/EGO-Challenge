interface CarouselDotsProps {
  totalDots: number;
  currentDotIndex: number;
  handleDotClick: (index: number) => void;
}

const CarouselDots = ({ totalDots, currentDotIndex, handleDotClick }: CarouselDotsProps) => {
  return (
    <div className="flex justify-center gap-2 mt-8">
      {Array.from({ length: totalDots }).map((_, index) => {
        const isActive = index === currentDotIndex;
        
        return (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`h-2 rounded-full transition-all duration-300 focus:outline-none ${
              isActive ? 'w-8 bg-[#4A4A4A]' : 'w-2 bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to feature ${index + 1}`}
          />
        );
      })}
    </div>
  );
};

export default CarouselDots;
