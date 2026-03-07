"use client";

import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/layout/Layout";
import { Award, Heart, Shield, Gem, MapPin, Phone, Mail } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

const values = [
  {
    icon: Award,
    title: "Master Craftsmanship",
    description: "Each piece is meticulously handcrafted by our skilled artisans with decades of experience in traditional goldsmithing.",
  },
  {
    icon: Heart,
    title: "Passion for Perfection",
    description: "We pour our heart into every creation, ensuring each jewel reflects our commitment to excellence and beauty.",
  },
  {
    icon: Shield,
    title: "Trusted Quality",
    description: "We use only the finest materials with BIS hallmarked gold and certified gemstones, backed by our quality guarantee.",
  },
  {
    icon: Gem,
    title: "Timeless Designs",
    description: "Our collections blend traditional Sri Lankan artistry with contemporary aesthetics for pieces that transcend generations.",
  },
];

const milestones = [
  { year: "1985", title: "Foundation", description: "New Kalyani Jewellers was established in Colombo with a vision to bring exceptional craftsmanship to Sri Lanka." },
  { year: "1995", title: "Expansion", description: "Opened our flagship showroom and introduced our first signature bridal collection." },
  { year: "2010", title: "Recognition", description: "Received the National Excellence Award for outstanding contribution to the jewelry industry." },
  { year: "2024", title: "Digital Era", description: "Launched our online presence to serve customers across Sri Lanka and beyond." },
];

export default function About() {
  const { data: branches } = useQuery({
    queryKey: ["branches-public"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("branches")
        .select("id, name, address, city, phone, email")
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  return (
    <Layout>
      <div className="min-h-screen bg-white">

        {/* Hero */}
        <section className="py-20 md:py-28 bg-white border-b border-gray-100">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <p className="font-inter text-[11px] tracking-[0.35em] text-[#C49B08] uppercase mb-4">
              Our Story
            </p>
            <h1 className="font-inter text-4xl md:text-5xl font-light tracking-[0.25em] text-gray-900 mb-5">
              ABOUT US
            </h1>
            <div className="w-12 h-px bg-[#C49B08]/50 mx-auto mb-6" />
            <p className="font-inter text-sm text-gray-500 tracking-wide max-w-2xl mx-auto leading-relaxed">
              For nearly four decades, New Kalyani Jewellers has been crafting exquisite pieces that celebrate life's most precious moments. Our journey began with a simple belief — that every piece of jewelry should tell a story.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <p className="font-inter text-[11px] tracking-[0.35em] text-[#C49B08] uppercase mb-4">
                What We Stand For
              </p>
              <h2 className="font-inter text-2xl md:text-3xl font-light tracking-[0.2em] text-gray-900 mb-4">
                OUR VALUES
              </h2>
              <div className="w-10 h-px bg-[#C49B08]/50 mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="text-center p-6 rounded-xl bg-white border border-gray-200 hover:border-[#C49B08]/40 hover:shadow-sm transition-all duration-300"
                >
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#C49B08]/8 flex items-center justify-center">
                    <value.icon className="h-6 w-6 text-[#C49B08]" />
                  </div>
                  <h3 className="font-inter text-sm font-semibold tracking-wide text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="font-inter text-sm text-gray-500 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="font-inter text-[11px] tracking-[0.35em] text-[#C49B08] uppercase mb-4">
                  Heritage
                </p>
                <h2 className="font-inter text-2xl md:text-3xl font-light tracking-[0.2em] text-gray-900 mb-4">
                  A LEGACY OF EXCELLENCE
                </h2>
                <div className="w-10 h-px bg-[#C49B08]/50 mb-8" />
                <div className="space-y-4 font-inter text-sm text-gray-500 leading-relaxed">
                  <p>
                    Founded in 1985 by Master Goldsmith Kalyani Perera, our journey began in a small workshop in the heart of Colombo. With unwavering dedication to craftsmanship and an eye for timeless design, we quickly became a trusted name among discerning jewelry enthusiasts.
                  </p>
                  <p>
                    Today, New Kalyani Jewellers stands as a testament to the enduring appeal of handcrafted jewelry. Our artisans continue to blend traditional techniques passed down through generations with contemporary design sensibilities, creating pieces that are both classic and modern.
                  </p>
                  <p>
                    Every piece that leaves our workshop carries with it our promise of quality, authenticity, and the personal touch that only true craftsmanship can provide.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-[4/5] rounded-xl overflow-hidden bg-gray-100">
                  <img
                    src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&h=750&fit=crop"
                    alt="Jewelry craftsmanship"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -left-4 w-28 h-28 border border-[#C49B08]/40 rounded-xl -z-10" />
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <p className="font-inter text-[11px] tracking-[0.35em] text-[#C49B08] uppercase mb-4">
                Our Journey
              </p>
              <h2 className="font-inter text-2xl md:text-3xl font-light tracking-[0.2em] text-gray-900 mb-4">
                MILESTONES
              </h2>
              <div className="w-10 h-px bg-[#C49B08]/50 mx-auto" />
            </div>

            <div className="max-w-2xl mx-auto">
              {milestones.map((milestone, index) => (
                <div key={milestone.year} className="flex gap-6 mb-8 last:mb-0">
                  <div className="flex-shrink-0 w-16 text-right">
                    <span className="font-inter text-xl font-light text-[#C49B08] tracking-wide">
                      {milestone.year}
                    </span>
                  </div>
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#C49B08] mt-1.5" />
                    {index < milestones.length - 1 && (
                      <div className="w-px flex-1 bg-gray-200 mt-2" />
                    )}
                  </div>
                  <div className="pb-8">
                    <h3 className="font-inter text-sm font-semibold tracking-wide text-gray-900 mb-1">
                      {milestone.title}
                    </h3>
                    <p className="font-inter text-sm text-gray-500 leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Branches */}
        {branches && branches.length > 0 && (
          <section className="py-16 md:py-24 bg-gray-50">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="text-center mb-12">
                <p className="font-inter text-[11px] tracking-[0.35em] text-[#C49B08] uppercase mb-4">
                  Find Us
                </p>
                <h2 className="font-inter text-2xl md:text-3xl font-light tracking-[0.2em] text-gray-900 mb-4">
                  OUR LOCATIONS
                </h2>
                <div className="w-10 h-px bg-[#C49B08]/50 mx-auto" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
                {branches.map((branch) => (
                  <div
                    key={branch.id}
                    className="bg-white border border-gray-200 rounded-xl p-6 hover:border-[#C49B08]/40 hover:shadow-sm transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#C49B08]/8 flex items-center justify-center mb-4">
                      <MapPin className="h-5 w-5 text-[#C49B08]" />
                    </div>
                    <h3 className="font-inter text-sm font-semibold tracking-wide text-gray-900 mb-3">
                      {branch.name}
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-3.5 w-3.5 text-gray-400 mt-0.5 shrink-0" />
                        <p className="font-inter text-xs text-gray-500 leading-relaxed">
                          {branch.address}, {branch.city}
                        </p>
                      </div>
                      {branch.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                          <a
                            href={`tel:${branch.phone}`}
                            className="font-inter text-xs text-gray-500 hover:text-[#C49B08] transition-colors"
                          >
                            {branch.phone}
                          </a>
                        </div>
                      )}
                      {branch.email && (
                        <div className="flex items-center gap-2">
                          <Mail className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                          <a
                            href={`mailto:${branch.email}`}
                            className="font-inter text-xs text-gray-500 hover:text-[#C49B08] transition-colors break-all"
                          >
                            {branch.email}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Visit Us */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <p className="font-inter text-[11px] tracking-[0.35em] text-[#C49B08] uppercase mb-4">
              Visit Our Showroom
            </p>
            <h2 className="font-inter text-2xl md:text-3xl font-light tracking-[0.2em] text-gray-900 mb-4">
              EXPERIENCE IN PERSON
            </h2>
            <div className="w-10 h-px bg-[#C49B08]/50 mx-auto mb-8" />
            <p className="font-inter text-sm text-gray-500 tracking-wide max-w-xl mx-auto mb-8 leading-relaxed">
              We invite you to visit our showroom and experience our collections firsthand. Our expert consultants are ready to help you find the perfect piece.
            </p>
            <div className="font-inter text-sm text-gray-700 tracking-wide space-y-1">
              <p>475/A Kaduwela Rd</p>
              <p>Sri Jayawardenepura Kotte</p>
              <p className="text-[#C49B08] font-medium mt-4">0112 257 1482</p>
              <p className="text-gray-400">kj.kalyanijewellers@gmail.com</p>
              <p className="text-gray-400 text-xs mt-2">Open Monday – Saturday: 10:00 AM – 7:00 PM</p>
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
}
