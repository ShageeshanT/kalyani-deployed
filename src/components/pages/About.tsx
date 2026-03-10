"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/layout/Layout";
import {
  Award, Heart, Shield, Gem, MapPin, Phone, Mail,
  Star, Send, MessageSquare, ArrowRight,
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";

const stats = [
  { number: "40+",    label: "Years of Excellence" },
  { number: "10,000+", label: "Happy Customers" },
  { number: "500+",   label: "Unique Designs" },
  { number: "3",      label: "Showroom Locations" },
];

const values = [
  {
    icon: Award,
    title: "Master Craftsmanship",
    description:
      "Each piece is meticulously handcrafted by our skilled artisans with decades of experience in traditional goldsmithing.",
  },
  {
    icon: Heart,
    title: "Passion for Perfection",
    description:
      "We pour our heart into every creation, ensuring each jewel reflects our commitment to excellence and beauty.",
  },
  {
    icon: Shield,
    title: "Trusted Quality",
    description:
      "We use only the finest materials with BIS hallmarked gold and certified gemstones, backed by our quality guarantee.",
  },
  {
    icon: Gem,
    title: "Timeless Designs",
    description:
      "Our collections blend traditional Sri Lankan artistry with contemporary aesthetics for pieces that transcend generations.",
  },
];

const craftSteps = [
  {
    step: "01",
    title: "Design",
    description:
      "Our master designers sketch each piece by hand, blending traditional motifs with contemporary elegance to capture your vision.",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=750&fit=crop&q=80",
  },
  {
    step: "02",
    title: "Create",
    description:
      "Skilled artisans bring designs to life using time-honoured goldsmithing techniques passed through generations of craftsmanship.",
    image:
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&h=750&fit=crop&q=80",
  },
  {
    step: "03",
    title: "Deliver",
    description:
      "Every piece is meticulously inspected, hallmarked, and presented in our signature packaging — ready to be cherished.",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=750&fit=crop&q=80",
  },
];

const milestones = [
  { year: "1985", title: "Foundation",   description: "New Kalyani Jewellers was established in Colombo with a vision to bring exceptional craftsmanship to Sri Lanka." },
  { year: "1995", title: "Expansion",    description: "Opened our flagship showroom and introduced our first signature bridal collection." },
  { year: "2010", title: "Recognition",  description: "Received the National Excellence Award for outstanding contribution to the jewelry industry." },
  { year: "2024", title: "Digital Era",  description: "Launched our online presence to serve customers across Sri Lanka and beyond." },
];

const SL_DISTRICTS = [
  "Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo",
  "Galle", "Gampaha", "Hambantota", "Jaffna", "Kalutara",
  "Kandy", "Kegalle", "Kilinochchi", "Kurunegala", "Mannar",
  "Matale", "Matara", "Monaragala", "Mullaitivu", "Nuwara Eliya",
  "Polonnaruwa", "Puttalam", "Ratnapura", "Trincomalee", "Vavuniya",
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

  const [rating, setRating]         = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [formData, setFormData]     = useState({ name: "", district: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted]   = useState(false);
  const [formError, setFormError]   = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.district || !formData.message.trim() || rating === 0) {
      setFormError("Please fill in your name, select your district, write a message, and choose a star rating.");
      return;
    }
    setSubmitting(true);
    setFormError("");

    const { error } = await supabase.from("testimonials").insert({
      name:     formData.name.trim(),
      district: formData.district,
      email:    formData.email.trim() || null,
      rating,
      message:  formData.message.trim(),
      status:   "pending",
    });

    setSubmitting(false);
    if (error) {
      setFormError("Something went wrong. Please try again.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-white">

        {/* ── Full-Bleed Hero ── */}
        <section className="relative h-[65vh] min-h-[440px] flex items-center justify-center overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1400&h=700&fit=crop&q=80"
            alt="Kalyani Jewellers"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/55 to-black/70" />
          {/* Decorative corner frame */}
          <div className="absolute top-8 left-8 right-8 bottom-8 border border-[#C49B08]/25 pointer-events-none hidden md:block" />

          <div className="relative z-10 text-center px-4">
            <p className="font-inter text-[11px] tracking-[0.45em] text-[#C49B08] uppercase mb-5">
              Our Story
            </p>
            <h1 className="font-inter text-4xl md:text-6xl font-light tracking-[0.3em] text-white mb-5">
              ABOUT US
            </h1>
            <div className="w-12 h-px bg-[#C49B08]/60 mx-auto mb-6" />
            <p className="font-inter text-sm text-white/70 tracking-wide max-w-xl mx-auto leading-relaxed">
              For nearly four decades, New Kalyani Jewellers has been crafting exquisite pieces
              that celebrate life&apos;s most precious moments.
            </p>
          </div>
        </section>

        {/* ── Stats Strip ── */}
        <section className="py-10 bg-white border-b border-gray-100">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((stat) => (
                <div key={stat.label} className="py-2">
                  <p className="font-inter text-3xl md:text-4xl font-light text-[#C49B08] tracking-wide mb-1">
                    {stat.number}
                  </p>
                  <p className="font-inter text-[10px] tracking-[0.2em] uppercase text-gray-400">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Values ── */}
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

        {/* ── Our Story ── */}
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
                    Founded in 1985 by Master Goldsmith Kalyani Perera, our journey began in a small
                    workshop in the heart of Colombo. With unwavering dedication to craftsmanship and
                    an eye for timeless design, we quickly became a trusted name among discerning
                    jewelry enthusiasts.
                  </p>
                  <p>
                    Today, New Kalyani Jewellers stands as a testament to the enduring appeal of
                    handcrafted jewelry. Our artisans continue to blend traditional techniques passed
                    down through generations with contemporary design sensibilities, creating pieces
                    that are both classic and modern.
                  </p>
                  <p>
                    Every piece that leaves our workshop carries with it our promise of quality,
                    authenticity, and the personal touch that only true craftsmanship can provide.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-[4/5] rounded-xl overflow-hidden bg-gray-100">
                  <img
                    src="https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=600&h=750&fit=crop&q=80"
                    alt="Jewelry craftsmanship"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -left-4 w-28 h-28 border border-[#C49B08]/40 rounded-xl -z-10" />
              </div>
            </div>
          </div>
        </section>

        {/* ── Our Craft (Process) ── */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <p className="font-inter text-[11px] tracking-[0.35em] text-[#C49B08] uppercase mb-4">
                The Process
              </p>
              <h2 className="font-inter text-2xl md:text-3xl font-light tracking-[0.2em] text-gray-900 mb-4">
                OUR CRAFT
              </h2>
              <div className="w-10 h-px bg-[#C49B08]/50 mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {craftSteps.map((step) => (
                <div key={step.step} className="group relative overflow-hidden rounded-xl">
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="font-inter text-[#C49B08] text-[10px] tracking-[0.35em] uppercase mb-1.5">
                      Step {step.step}
                    </p>
                    <h3 className="font-inter text-xl font-light tracking-[0.15em] text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="font-inter text-xs text-white/70 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Milestones ── */}
        <section className="py-16 md:py-24 bg-gray-50">
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

        {/* ── CTA Banner ── */}
        <section className="relative py-20 overflow-hidden">
          {/* Background image with dark tint */}
          <img
            src="https://images.unsplash.com/photo-1601121141418-b49661b3b056?w=1400&h=500&fit=crop&q=70"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/72" />
          {/* Inner decorative border */}
          <div className="absolute top-5 left-5 right-5 bottom-5 border border-[#C49B08]/20 rounded-xl pointer-events-none" />

          <div className="relative z-10 text-center px-4">
            <p className="font-inter text-[11px] tracking-[0.45em] text-[#C49B08] uppercase mb-5">
              Discover More
            </p>
            <h2 className="font-inter text-3xl md:text-4xl font-light tracking-[0.25em] text-white mb-5">
              EXPLORE OUR COLLECTION
            </h2>
            <div className="w-10 h-px bg-[#C49B08]/50 mx-auto mb-7" />
            <p className="font-inter text-sm text-white/55 max-w-md mx-auto mb-8 leading-relaxed">
              Browse our curated selection of handcrafted gold jewellery, custom pieces,
              and certified gemstones — each one a story waiting to be worn.
            </p>
            <Link
              href="/collections"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 border border-[#C49B08] text-[#C49B08] hover:bg-[#C49B08] hover:text-white font-inter text-xs tracking-[0.2em] uppercase rounded-full transition-all duration-300 group"
            >
              Browse Collection
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </section>

        {/* ── Our Locations ── */}
        {branches && branches.length > 0 && (
          <section className="py-16 md:py-24 bg-white">
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

        {/* ── Share Your Experience (Testimonial Form) ── */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-10">
              <p className="font-inter text-[11px] tracking-[0.35em] text-[#C49B08] uppercase mb-4">
                We&apos;d Love to Hear From You
              </p>
              <h2 className="font-inter text-2xl md:text-3xl font-light tracking-[0.2em] text-gray-900 mb-4">
                SHARE YOUR EXPERIENCE
              </h2>
              <div className="w-10 h-px bg-[#C49B08]/50 mx-auto" />
            </div>

            <div className="max-w-xl mx-auto">
              {submitted ? (
                <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#C49B08]/10 flex items-center justify-center">
                    <MessageSquare className="h-6 w-6 text-[#C49B08]" />
                  </div>
                  <h3 className="font-inter text-base font-semibold text-gray-900 mb-2">
                    Thank you for sharing!
                  </h3>
                  <p className="font-inter text-sm text-gray-500">
                    Your testimonial has been submitted and is pending review. We appreciate your feedback.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 space-y-5"
                >
                  {/* Star Rating */}
                  <div>
                    <label className="font-inter text-xs font-medium text-gray-700 tracking-wide uppercase mb-3 block">
                      Your Rating <span className="text-red-400">*</span>
                    </label>
                    <div className="flex gap-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="transition-transform hover:scale-110 focus:outline-none"
                        >
                          <Star
                            className={`h-7 w-7 transition-colors ${
                              star <= (hoverRating || rating)
                                ? "fill-[#C49B08] text-[#C49B08]"
                                : "fill-gray-100 text-gray-300"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="font-inter text-xs font-medium text-gray-700 tracking-wide uppercase mb-1.5 block">
                      Your Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Priya Fernando"
                      value={formData.name}
                      onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg font-inter text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#C49B08] transition-colors"
                    />
                  </div>

                  {/* District */}
                  <div>
                    <label className="font-inter text-xs font-medium text-gray-700 tracking-wide uppercase mb-1.5 block">
                      District <span className="text-red-400">*</span>
                    </label>
                    <select
                      value={formData.district}
                      onChange={(e) => setFormData((p) => ({ ...p, district: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg font-inter text-sm text-gray-900 focus:outline-none focus:border-[#C49B08] transition-colors bg-white appearance-none cursor-pointer"
                    >
                      <option value="">Select your district</option>
                      {SL_DISTRICTS.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>

                  {/* Email (optional) */}
                  <div>
                    <label className="font-inter text-xs font-medium text-gray-700 tracking-wide uppercase mb-1.5 block">
                      Email{" "}
                      <span className="text-gray-400 normal-case font-normal">(optional, not displayed)</span>
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg font-inter text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#C49B08] transition-colors"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="font-inter text-xs font-medium text-gray-700 tracking-wide uppercase mb-1.5 block">
                      Your Experience <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your experience with New Kalyani Jewellers..."
                      value={formData.message}
                      onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg font-inter text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#C49B08] transition-colors resize-none"
                    />
                  </div>

                  {formError && (
                    <p className="font-inter text-xs text-red-500">{formError}</p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-[#C49B08] hover:bg-[#a8840a] text-white font-inter text-xs tracking-[0.15em] uppercase rounded-lg transition-colors disabled:opacity-60"
                  >
                    {submitting ? (
                      <>
                        <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="h-3.5 w-3.5" />
                        Submit Testimonial
                      </>
                    )}
                  </button>

                  <p className="font-inter text-[10px] text-gray-400 text-center">
                    Testimonials are reviewed before being published on our site.
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ── Visit Us ── */}
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
              We invite you to visit our showroom and experience our collections firsthand.
              Our expert consultants are ready to help you find the perfect piece.
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
