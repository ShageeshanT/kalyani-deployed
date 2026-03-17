"use client";

import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

interface Testimonial {
  id: string;
  name: string;
  district: string | null;
  rating: number;
  message: string;
  created_at: string;
}

// ─── Touch hook ───────────────────────────────────────────────────────────────
// The CSS animation on the inner track runs uninterrupted.
// This hook adds a manual translateX offset on a wrapper div while the user
// is dragging. On release the offset snaps back to 0 with a short transition.
// Movement in the opposite direction of the carousel is blocked (clamped to 0).
function useMarqueeTouch(direction: "left" | "right") {
  const startX = useRef(0);
  const [offset, setOffset] = useState(0);
  const [snapping, setSnapping] = useState(false);

  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    setSnapping(false);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    const dx = e.touches[0].clientX - startX.current;
    // Block wrong-direction swipes
    if (direction === "left" && dx > 0) { setOffset(0); return; }
    if (direction === "right" && dx < 0) { setOffset(0); return; }
    setOffset(dx);
  };

  const onTouchEnd = () => {
    setSnapping(true);
    setOffset(0);
  };

  return {
    handlers: { onTouchStart, onTouchMove, onTouchEnd } as React.HTMLAttributes<HTMLDivElement>,
    offsetStyle: {
      transform: `translateX(${offset}px)`,
      transition: snapping ? "transform 0.35s ease-out" : "none",
    } as React.CSSProperties,
  };
}

// ─── Card ──────────────────────────────────────────────────────────────────────
function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="flex-shrink-0 w-[220px] sm:w-[270px] md:w-[300px] bg-white border border-gray-200 rounded-xl p-4 sm:p-5 mx-2 sm:mx-3 flex flex-col">
      <div className="flex gap-0.5 mb-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-3 w-3 sm:h-3.5 sm:w-3.5 ${
              star <= t.rating
                ? "fill-[#C49B08] text-[#C49B08]"
                : "fill-gray-100 text-gray-200"
            }`}
          />
        ))}
      </div>

      <p className="font-inter text-xs sm:text-sm text-gray-600 leading-relaxed flex-1 italic line-clamp-4">
        &ldquo;{t.message}&rdquo;
      </p>

      <div className="mt-4 pt-3 border-t border-gray-100">
        <p className="font-inter text-xs font-semibold tracking-wide text-gray-900">
          {t.name}
        </p>
        {t.district && (
          <p className="font-inter text-[10px] text-[#C49B08] mt-0.5">
            {t.district}
          </p>
        )}
        <p className="font-inter text-[10px] text-gray-400 mt-0.5">
          {new Date(t.created_at).toLocaleDateString("en-GB", {
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>
    </div>
  );
}

// ─── Section ───────────────────────────────────────────────────────────────────
export function TestimonialsSection() {
  const { data: testimonials } = useQuery({
    queryKey: ["approved-testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("id, name, district, rating, message, created_at")
        .eq("status", "approved")
        .order("created_at", { ascending: false })
        .limit(12);
      if (error) throw error;
      return data as Testimonial[];
    },
  });

  const row1Touch = useMarqueeTouch("left");
  const row2Touch = useMarqueeTouch("right");

  if (!testimonials || testimonials.length === 0) return null;

  const reversed = [...testimonials].reverse();

  // 6× repeat — seamless on any screen width; loop point = -16.6667% of track
  const REPS = 6;
  const row1 = Array.from({ length: REPS }, () => testimonials).flat();
  const row2 = Array.from({ length: REPS }, () => reversed).flat();

  // 220 px/s — fast and energetic. card = 300px + 24px gap = 324px
  const cardW = 324;
  const speed = 220;
  const cycleDuration = (testimonials.length * cardW) / speed;
  const duration = `${cycleDuration.toFixed(1)}s`;

  // Negative delays so the carousel is already mid-scroll when the user reaches the section
  const delay1 = `-${(cycleDuration * 0.2).toFixed(1)}s`;
  const delay2 = `-${(cycleDuration * 0.6).toFixed(1)}s`;

  const animStyle = (delay: string) =>
    ({
      "--marquee-duration": duration,
      "--marquee-delay": delay,
    } as React.CSSProperties);

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      {/* Header */}
      <div className="text-center mb-12 px-4">
        <p className="font-inter text-[11px] tracking-[0.35em] text-[#C49B08] uppercase mb-4">
          Our Customers
        </p>
        <h2 className="font-display text-2xl md:text-3xl font-light tracking-[0.15em] text-gray-900 mb-4">
          What They Say
        </h2>
        <div className="w-10 h-px bg-[#C49B08]/50 mx-auto" />
      </div>

      {/* Row 1 — scrolls left; swipe left to advance */}
      <div
        className="overflow-hidden mb-3 sm:mb-4"
        style={{ touchAction: "pan-y" }}
        {...row1Touch.handlers}
      >
        <div style={row1Touch.offsetStyle}>
          <div className="flex animate-marquee-left" style={animStyle(delay1)}>
            {row1.map((t, i) => (
              <TestimonialCard key={`r1-${i}`} t={t} />
            ))}
          </div>
        </div>
      </div>

      {/* Row 2 — scrolls right; swipe right to advance */}
      <div
        className="overflow-hidden"
        style={{ touchAction: "pan-y" }}
        {...row2Touch.handlers}
      >
        <div style={row2Touch.offsetStyle}>
          <div className="flex animate-marquee-right" style={animStyle(delay2)}>
            {row2.map((t, i) => (
              <TestimonialCard key={`r2-${i}`} t={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
