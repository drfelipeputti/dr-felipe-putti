import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BeforeAfterCase {
  id: number;
  title: string;
  subtitle: string;
  results: string;
  duration: string;
  beforeImage: string;
  afterImage: string;
}

interface BeforeAfterCarouselProps {
  cases: BeforeAfterCase[];
}

export default function BeforeAfterCarousel({ cases }: BeforeAfterCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAfter, setShowAfter] = useState(false);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? cases.length - 1 : prevIndex - 1
    );
    setShowAfter(false);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === cases.length - 1 ? 0 : prevIndex + 1
    );
    setShowAfter(false);
  };

  const currentCase = cases[currentIndex];

  return (
    <div className="space-y-8">
      {/* Main Carousel */}
      <div className="relative bg-gradient-to-br from-[#f2f6eb] to-[#f7f9f3] rounded-3xl overflow-hidden border-2 border-[#e9eee1]">
        {/* Image Container */}
        <div className="relative aspect-square md:aspect-video overflow-hidden">
          <img
            src={showAfter ? currentCase.afterImage : currentCase.beforeImage}
            alt={showAfter ? "Depois" : "Antes"}
            className="w-full h-full object-cover"
          />

          {/* Before/After Label */}
          <div className="absolute top-4 right-4 bg-black/60 text-white px-4 py-2 rounded-full text-sm font-semibold">
            {showAfter ? "DEPOIS" : "ANTES"}
          </div>

          {/* Toggle Button */}
          <button
            onClick={() => setShowAfter(!showAfter)}
            className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/20 transition group"
          >
            <div className="bg-[#76993D] text-white px-6 py-3 rounded-full font-semibold opacity-0 group-hover:opacity-100 transition">
              {showAfter ? "Ver ANTES" : "Ver DEPOIS"}
            </div>
          </button>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#344D0E] p-3 rounded-full shadow-lg transition z-10"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#344D0E] p-3 rounded-full shadow-lg transition z-10"
          aria-label="Próximo"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Case Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
          <h3 className="text-2xl font-serif font-bold mb-2">{currentCase.title}</h3>
          <p className="text-sm text-gray-200 mb-3">{currentCase.subtitle}</p>
          <div className="flex gap-4 text-sm">
            <div>
              <span className="text-[#76993D] font-bold">{currentCase.results}</span>
              <p className="text-gray-300">Resultado</p>
            </div>
            <div>
              <span className="text-[#76993D] font-bold">{currentCase.duration}</span>
              <p className="text-gray-300">Duração</p>
            </div>
          </div>
        </div>
      </div>

      {/* Thumbnails Navigation */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {cases.map((caseItem, index) => (
          <button
            key={caseItem.id}
            onClick={() => {
              setCurrentIndex(index);
              setShowAfter(false);
            }}
            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
              index === currentIndex
                ? "border-[#76993D] shadow-lg"
                : "border-[#e9eee1] opacity-60 hover:opacity-100"
            }`}
          >
            <img
              src={caseItem.beforeImage}
              alt={`Case ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2">
        {cases.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index);
              setShowAfter(false);
            }}
            className={`h-3 rounded-full transition ${
              index === currentIndex ? "bg-[#76993D] w-8" : "bg-[#e9eee1] w-3"
            }`}
            aria-label={`Ir para case ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
