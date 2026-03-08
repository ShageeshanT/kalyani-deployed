"use client";

import { useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

export function TestimonialsSection() {
  const { data: testimonials } = useQuery({
    queryKey: ["approved-testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("id, name, district, rating, message, created_at")
        .eq("status", "approved")
        .order("created_at", { ascending: false })
        .limit(6);
      if (error) throw error;
      return data;
    },
  });

  // Don't render the section if there are no approved testimonials yet
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="font-inter text-[11px] tracking-[0.35em] text-[#C49B08] uppercase mb-4">
            Our Customers
          </p>
          <h2 className="font-inter text-2xl md:text-3xl font-light tracking-[0.2em] text-gray-900 mb-4">
            WHAT THEY SAY
          </h2>
          <div className="w-10 h-px bg-[#C49B08]/50 mx-auto" />
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:border-[#C49B08]/30 hover:shadow-sm transition-all duration-300 flex flex-col"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-3.5 w-3.5 ${
                      star <= t.rating
                        ? "fill-[#C49B08] text-[#C49B08]"
                        : "fill-gray-100 text-gray-200"
                    }`}
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="font-inter text-sm text-gray-600 leading-relaxed flex-1 italic">
                &ldquo;{t.message}&rdquo;
              </p>

              {/* Name + District */}
              <div className="mt-5 pt-4 border-t border-gray-100">
                <p className="font-inter text-xs font-semibold tracking-wide text-gray-900">
                  {t.name}
                </p>
                {t.district && (
                  <p className="font-inter text-[11px] text-[#C49B08] mt-0.5">
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
          ))}
        </div>

      </div>
    </section>
  );
}
