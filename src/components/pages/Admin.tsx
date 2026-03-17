"use client";

import { useAuth } from "@/hooks/useAuth";
import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Package, Palette, GitBranch, Wrench, Gem, MessageSquare } from "lucide-react";
import AdminProducts from "@/components/admin/AdminProducts";
import AdminCustomRequests from "@/components/admin/AdminCustomRequests";
import AdminRepairRequests from "@/components/admin/AdminRepairRequests";
import AdminBranches from "@/components/admin/AdminBranches";
import AdminGems from "@/components/admin/AdminGems";
import AdminTestimonials from "@/components/admin/AdminTestimonials";

const Admin = () => {
  const { loading, isAdmin } = useAuth();

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[80vh] flex items-center justify-center bg-gray-50">
          <Loader2 className="h-8 w-8 animate-spin text-[#C49B08]" />
        </div>
      </Layout>
    );
  }

  if (!isAdmin) {
    return (
      <Layout>
        <div className="min-h-[80vh] flex items-center justify-center bg-gray-50">
          <p className="font-inter text-gray-600 font-medium">Access denied.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 admin-theme">

        {/* Gold accent line at very top */}
        <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-[#C49B08] to-transparent" />

        {/* Dashboard Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-inter text-[11px] tracking-[0.4em] uppercase text-[#C49B08] mb-1">
                  New Kalyani Jewellers
                </p>
                <h1 className="font-display text-2xl sm:text-3xl font-semibold text-gray-900 tracking-[0.05em]">
                  Admin Dashboard
                </h1>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <span className="font-inter text-xs text-gray-500 tracking-wide">Live</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Tabs defaultValue="products" className="w-full">

            {/* Tab bar */}
            <div className="mb-8">
              <TabsList className="bg-white border border-gray-200 rounded-xl p-1 grid grid-cols-3 sm:grid-cols-6 w-full max-w-3xl shadow-sm gap-1 sm:gap-0 h-auto">
                <TabsTrigger
                  value="products"
                  className="font-inter font-semibold text-gray-500 data-[state=active]:bg-[#C49B08] data-[state=active]:text-white data-[state=active]:shadow-sm rounded-lg text-[10px] sm:text-xs gap-1 sm:gap-1.5 py-2 transition-all"
                >
                  <Package size={14} className="hidden sm:block" />
                  Products
                </TabsTrigger>
                <TabsTrigger
                  value="custom-requests"
                  className="font-inter font-semibold text-gray-500 data-[state=active]:bg-[#C49B08] data-[state=active]:text-white data-[state=active]:shadow-sm rounded-lg text-[10px] sm:text-xs gap-1 sm:gap-1.5 py-2 transition-all"
                >
                  <Palette size={14} className="hidden sm:block" />
                  Custom
                </TabsTrigger>
                <TabsTrigger
                  value="service-tickets"
                  className="font-inter font-semibold text-gray-500 data-[state=active]:bg-[#C49B08] data-[state=active]:text-white data-[state=active]:shadow-sm rounded-lg text-[10px] sm:text-xs gap-1 sm:gap-1.5 py-2 transition-all"
                >
                  <Wrench size={14} className="hidden sm:block" />
                  Repairs
                </TabsTrigger>
                <TabsTrigger
                  value="branches"
                  className="font-inter font-semibold text-gray-500 data-[state=active]:bg-[#C49B08] data-[state=active]:text-white data-[state=active]:shadow-sm rounded-lg text-[10px] sm:text-xs gap-1 sm:gap-1.5 py-2 transition-all"
                >
                  <GitBranch size={14} className="hidden sm:block" />
                  Branches
                </TabsTrigger>
                <TabsTrigger
                  value="gems"
                  className="font-inter font-semibold text-gray-500 data-[state=active]:bg-[#C49B08] data-[state=active]:text-white data-[state=active]:shadow-sm rounded-lg text-[10px] sm:text-xs gap-1 sm:gap-1.5 py-2 transition-all"
                >
                  <Gem size={14} className="hidden sm:block" />
                  Gems
                </TabsTrigger>
                <TabsTrigger
                  value="testimonials"
                  className="font-inter font-semibold text-gray-500 data-[state=active]:bg-[#C49B08] data-[state=active]:text-white data-[state=active]:shadow-sm rounded-lg text-[10px] sm:text-xs gap-1 sm:gap-1.5 py-2 transition-all"
                >
                  <MessageSquare size={14} className="hidden sm:block" />
                  Reviews
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="products">
              <AdminProducts />
            </TabsContent>
            <TabsContent value="custom-requests">
              <AdminCustomRequests />
            </TabsContent>
            <TabsContent value="service-tickets">
              <AdminRepairRequests />
            </TabsContent>
            <TabsContent value="branches">
              <AdminBranches />
            </TabsContent>
            <TabsContent value="gems">
              <AdminGems />
            </TabsContent>
            <TabsContent value="testimonials">
              <AdminTestimonials />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Admin;
