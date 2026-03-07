"use client";

import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { ServicesSection } from "@/components/home/ServicesSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { FloatingSocialButtons } from "@/components/home/FloatingSocialButtons";

const Index = () => {
  return (
    <Layout>
      <FloatingSocialButtons />
      <HeroSection />
      <CategoriesSection />
      <FeaturedProducts />
      <ServicesSection />
      <TestimonialsSection />
      <NewsletterSection />
    </Layout>
  );
};

export default Index;

