"use client";

import dynamic from "next/dynamic";
import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { CategoriesSection } from "@/components/home/CategoriesSection";

// Lazy load below-the-fold sections
const FeaturedProducts = dynamic(() => import("@/components/home/FeaturedProducts").then(m => ({ default: m.FeaturedProducts })));
const JewellerySection = dynamic(() => import("@/components/home/JewellerySection").then(m => ({ default: m.JewellerySection })));
const ServicesSection = dynamic(() => import("@/components/home/ServicesSection").then(m => ({ default: m.ServicesSection })));
const TestimonialsSection = dynamic(() => import("@/components/home/TestimonialsSection").then(m => ({ default: m.TestimonialsSection })));
const NewsletterSection = dynamic(() => import("@/components/home/NewsletterSection").then(m => ({ default: m.NewsletterSection })));
const FloatingSocialButtons = dynamic(() => import("@/components/home/FloatingSocialButtons").then(m => ({ default: m.FloatingSocialButtons })));

const Index = () => {
  return (
    <Layout>
      <FloatingSocialButtons />
      <HeroSection />
      <CategoriesSection />
      <FeaturedProducts />
      <JewellerySection />
      <ServicesSection />
      <TestimonialsSection />
      <NewsletterSection />
    </Layout>
  );
};

export default Index;
