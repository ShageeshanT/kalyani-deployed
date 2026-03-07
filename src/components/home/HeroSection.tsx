import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const heroSlides = [
  {
    id: 1,
    title: "New Arrivals",
    images: [
      "/heroimages/1/THA_0637.jpg",
      "/heroimages/1/THA_0727.jpg",
      "/heroimages/1/THA_0774.jpg",
    ],
  },
  {
    id: 2,
    title: "Heritage Collection",
    images: [
      "/heroimages/2/THA_0389.jpg",
      "/heroimages/2/THA_0673.jpg",
      "/heroimages/2/THA_0811.jpg",
    ],
  },
  {
    id: 3,
    title: "Signature Pieces",
    images: [
      "/heroimages/3/THA_0430.jpg",
      "/heroimages/3/THA_0490.jpg",
      "/heroimages/3/THA_0863.jpg",
    ],
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <section className="relative h-[calc(100vh-120px)] sm:h-[calc(100vh-140px)] md:h-screen w-full overflow-hidden bg-charcoal">
      {/* Slides */}
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Three-panel image layout */}
          <div className="h-full w-full grid grid-cols-1 md:grid-cols-3 gap-0.5 md:gap-0">
            {slide.images.map((image, imgIndex) => (
              <div
                key={imgIndex}
                className="relative h-full overflow-hidden"
              >
                <img
                  src={image}
                  alt={`${slide.title} ${imgIndex + 1}`}
                  className="h-full w-full object-cover"
                  style={{ objectPosition: "top" }}
                />
                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-black/20" />
              </div>
            ))}
          </div>

          {/* Collection Title - Centered */}
          <div className="absolute inset-0 flex items-end justify-center pb-20 sm:pb-28 md:pb-24">
            <div className="text-center px-4">
              <h2 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-serif font-light text-white tracking-[0.15em] sm:tracking-[0.3em] uppercase">
                {slide.title}
              </h2>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-2 text-white/70 hover:text-white transition-colors z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-8 w-8" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-2 text-white/70 hover:text-white transition-colors z-10"
        aria-label="Next slide"
      >
        <ChevronRight className="h-8 w-8" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8 flex items-center gap-2 sm:gap-3 z-10">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-white w-6 sm:w-8"
                : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

