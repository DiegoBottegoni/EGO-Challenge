interface CarouselArrowsProps {
  scrollLeft: () => void;
  scrollRight: () => void;
}

const CarouselArrows = ({ scrollLeft, scrollRight }: CarouselArrowsProps) => {
  return (
    <>
      <div className="hidden md:flex absolute top-16 left-0 h-40 w-12 items-center justify-center z-20">
          <button 
            onClick={scrollLeft} 
            className="w-full h-full flex items-center justify-center focus:outline-none rounded-r-xl rounded-l-none border border-transparent transition-opacity hover:opacity-80"
            style={{ backgroundColor: '#FFFFFF33' }}
          >
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18L9 12L15 6" stroke="#474747" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
          </button>
      </div>
      <div className="hidden md:flex absolute top-16 right-0 h-40 w-12 items-center justify-center z-20">
           <button 
             onClick={scrollRight} 
             className="w-full h-full flex items-center justify-center focus:outline-none rounded-l-xl rounded-r-none border border-transparent transition-opacity hover:opacity-80"
             style={{ backgroundColor: '#FFFFFF33' }}
           >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18L15 12L9 6" stroke="#474747" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
          </button>
      </div>
    </>
  );
};

export default CarouselArrows;
