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
          <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        </div>
      </Layout>
    );
  }

  if (!isAdmin) {
    return (
      <Layout>
        <div className="min-h-[80vh] flex items-center justify-center">
          <p className="font-inter text-gray-500">Access denied.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 admin-theme">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">
            Admin Dashboard
          </h1>

          <Tabs defaultValue="products" className="w-full">
            <div className="overflow-x-auto mb-6">
            <TabsList className="bg-white border border-gray-200 rounded-lg p-1 grid grid-cols-6 min-w-[640px] w-full max-w-3xl">
              <TabsTrigger
                value="products"
                className="text-gray-600 data-[state=active]:bg-gray-900 data-[state=active]:text-white rounded-md text-sm gap-1.5"
              >
                <Package size={15} />
                Products
              </TabsTrigger>
              <TabsTrigger
                value="custom-requests"
                className="text-gray-600 data-[state=active]:bg-gray-900 data-[state=active]:text-white rounded-md text-sm gap-1.5"
              >
                <Palette size={15} />
                Custom
              </TabsTrigger>
              <TabsTrigger
                value="service-tickets"
                className="text-gray-600 data-[state=active]:bg-gray-900 data-[state=active]:text-white rounded-md text-sm gap-1.5"
              >
                <Wrench size={15} />
                Repairs
              </TabsTrigger>
              <TabsTrigger
                value="branches"
                className="text-gray-600 data-[state=active]:bg-gray-900 data-[state=active]:text-white rounded-md text-sm gap-1.5"
              >
                <GitBranch size={15} />
                Branches
              </TabsTrigger>
              <TabsTrigger
                value="gems"
                className="text-gray-600 data-[state=active]:bg-gray-900 data-[state=active]:text-white rounded-md text-sm gap-1.5"
              >
                <Gem size={15} />
                Gems
              </TabsTrigger>
              <TabsTrigger
                value="testimonials"
                className="text-gray-600 data-[state=active]:bg-gray-900 data-[state=active]:text-white rounded-md text-sm gap-1.5"
              >
                <MessageSquare size={15} />
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
