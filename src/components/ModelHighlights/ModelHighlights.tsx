import type { ModelHighlight } from '../../types';

interface ModelHighlightsProps {
  highlights: ModelHighlight[];
}

const ModelHighlights = ({ highlights }: ModelHighlightsProps) => {
  return (
    <section className="bg-[#FFFFFF] py-16">
        <div className="max-w-[1200px] mx-auto px-4 space-y-24">
            {highlights.map((highlight, index) => (
                <div 
                    key={index} 
                    className={`flex flex-col md:flex-row gap-8 md:gap-16 items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                >
                    <div className="flex-1 w-full">
                        <img 
                            src={highlight.image} 
                            alt={highlight.title} 
                            className="w-full h-auto rounded-lg shadow-sm"
                        />
                    </div>
                    <div className="flex-1 space-y-6">
                        <h3 className="text-2xl md:text-3xl font-bold text-[#373737]">{highlight.title}</h3>
                        <div 
                            className="prose text-gray-600 leading-relaxed" 
                            dangerouslySetInnerHTML={{ __html: highlight.content }} 
                        />
                    </div>
                </div>
            ))}
        </div>
    </section>
  );
};

export default ModelHighlights;
