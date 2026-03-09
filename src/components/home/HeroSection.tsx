"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";

const heroSlides = [
  {
    id: 1,
    label: "New Arrivals — 2025",
    title: "New Arrivals",
    subtitle: "Discover our latest pieces, each crafted for those who wear their story with grace",
    cta: "Shop New In",
    href: "/new",
    images: [
      "/heroimages/1/THA_0637.jpg",
      "/heroimages/1/THA_0727.jpg",
      "/heroimages/1/THA_0774.jpg",
    ],
  },
  {
    id: 2,
    label: "Timeless Elegance",
    title: "Heritage Collection",
    subtitle: "Where ancestral craftsmanship meets contemporary refinement",
    cta: "Explore Collection",
    href: "/collections",
    images: [
      "/heroimages/2/THA_0389.jpg",
      "/heroimages/2/THA_0673.jpg",
      "/heroimages/2/THA_0811.jpg",
    ],
  },
  {
    id: 3,
    label: "The Finest Selection",
    title: "Signature Pieces",
    subtitle: "Each jewel a testament to four decades of mastery and devotion",
    cta: "View Pieces",
    href: "/collections",
    images: [
      "/heroimages/3/THA_0430.jpg",
      "/heroimages/3/THA_0490.jpg",
      "/heroimages/3/THA_0863.jpg",
    ],
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    if (index === currentSlide) return;
    setIsTransitioning(true);
    setTimeout(() => setIsTransitioning(false), 600);
    setCurrentSlide(index);
  };

  const nextSlide = () => goToSlide((currentSlide + 1) % heroSlides.length);
  const prevSlide = () => goToSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length);

  const slide = heroSlides[currentSlide];

  return (
    <section className="relative h-[calc(100vh-120px)] sm:h-[calc(100vh-140px)] md:h-screen w-full overflow-hidden bg-charcoal">

      {/* Slides */}
      {heroSlides.map((s, index) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Mobile: single image only */}
          <div className="block md:hidden h-full">
            <img
              src={s.images[0]}
              alt={s.title}
              className="h-full w-full object-cover"
              style={{ objectPosition: "top" }}
            />
          </div>

          {/* Desktop: three-panel image layout */}
          <div className="hidden md:grid grid-cols-3 h-full gap-0">
            {s.images.map((image, imgIndex) => (
              <div key={imgIndex} className="relative h-full overflow-hidden">
                <img
                  src={image}
                  alt={`${s.title} ${imgIndex + 1}`}
                  className="h-full w-full object-cover"
                  style={{ objectPosition: "top" }}
                />
              </div>
            ))}
          </div>

          {/* Gradient overlay — subtle top, rich bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent via-40% to-black/75" />
          {/* Side vignette */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
        </div>
      ))}

      {/* Text content — fades with slide */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-end pb-20 sm:pb-24 md:pb-20 z-10 transition-opacity duration-500 ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="text-center px-4 max-w-3xl mx-auto">

          {/* Gold label */}
          <p className="font-inter text-[10px] sm:text-[11px] tracking-[0.5em] sm:tracking-[0.6em] uppercase text-[#C49B08] mb-3">
            {slide.label}
          </p>

          {/* Thin gold rule */}
          <div className="w-8 h-px bg-[#C49B08]/60 mx-auto mb-5" />

          {/* Main title */}
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white tracking-[0.25em] sm:tracking-[0.35em] uppercase leading-none mb-5">
            {slide.title}
          </h2>

          {/* Subtitle */}
          <p className="font-inter text-[11px] sm:text-sm text-white/60 tracking-[0.12em] mb-8 max-w-sm sm:max-w-md mx-auto leading-relaxed">
            {slide.subtitle}
          </p>

          {/* CTA button */}
          <Link
            href={slide.href}
            className="inline-flex items-center gap-2.5 px-8 sm:px-10 py-3 border border-white/35 text-white text-[10px] sm:text-[11px] tracking-[0.3em] uppercase font-inter hover:border-[#C49B08] hover:text-[#C49B08] transition-all duration-300 group"
          >
            {slide.cta}
            <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
          </Link>

        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-2 text-white/40 hover:text-white transition-all duration-300 z-10 hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-7 w-7" strokeWidth={1} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-2 text-white/40 hover:text-white transition-all duration-300 z-10 hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight className="h-7 w-7" strokeWidth={1} />
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-6 sm:bottom-8 right-5 sm:right-8 flex items-center gap-2 sm:gap-3 z-10">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-px transition-all duration-500 ${
              index === currentSlide
                ? "w-8 sm:w-10 bg-[#C49B08]"
                : "w-3 sm:w-4 bg-white/35 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-6 sm:bottom-8 left-5 sm:left-8 z-10 flex items-center gap-2">
        <span className="font-inter text-[11px] text-white/70 tracking-[0.2em]">
          0{currentSlide + 1}
        </span>
        <div className="w-6 h-px bg-white/30" />
        <span className="font-inter text-[11px] text-white/35 tracking-[0.2em]">
          0{heroSlides.length}
        </span>
      </div>

    </section>
  );
}
