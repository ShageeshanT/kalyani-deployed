"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/lib/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { User, Package, Heart, LogOut, Settings } from "lucide-react";

interface Profile {
  full_name: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
}

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading: authLoading, signOut } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<Profile>({
    full_name: "",
    phone: "",
    address: "",
    city: "",
  });

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth");
    } else if (user) {
      fetchProfile();
    }
  }, [user, authLoading, router]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("full_name, phone, address, city")
        .eq("id", user!.id)
        .single();

      if (error && error.code !== "PGRST116") throw error;
      if (data) {
        setProfile(data);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from("profiles")
        .upsert({
          id: user!.id,
          full_name: profile.full_name,
          phone: profile.phone,
          address: profile.address,
          city: profile.city,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;

      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  if (authLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse text-gray-400 font-inter">Loading...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-white py-10 md:py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-inter font-light tracking-wide text-gray-900 mb-2">
              My Account
            </h1>
            <p className="text-gray-500 font-inter font-light">
              {user?.email}
            </p>
          </div>

          <Tabs defaultValue="profile" className="w-full">
            <div className="overflow-x-auto mb-6">
              <TabsList className="bg-white border border-gray-200 rounded-lg p-1 grid grid-cols-4 min-w-[360px] w-full max-w-xl">
                <TabsTrigger
                  value="profile"
                  className="font-inter text-xs sm:text-sm text-gray-600 data-[state=active]:bg-gray-900 data-[state=active]:text-white rounded-md gap-1.5"
                >
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Profile</span>
                </TabsTrigger>
                <TabsTrigger
                  value="orders"
                  className="font-inter text-xs sm:text-sm text-gray-600 data-[state=active]:bg-gray-900 data-[state=active]:text-white rounded-md gap-1.5"
                >
                  <Package className="h-4 w-4" />
                  <span className="hidden sm:inline">Orders</span>
                </TabsTrigger>
                <TabsTrigger
                  value="wishlist"
                  className="font-inter text-xs sm:text-sm text-gray-600 data-[state=active]:bg-gray-900 data-[state=active]:text-white rounded-md gap-1.5"
                >
                  <Heart className="h-4 w-4" />
                  <span className="hidden sm:inline">Wishlist</span>
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className="font-inter text-xs sm:text-sm text-gray-600 data-[state=active]:bg-gray-900 data-[state=active]:text-white rounded-md gap-1.5"
                >
                  <Settings className="h-4 w-4" />
                  <span className="hidden sm:inline">Settings</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="profile">
              <div className="bg-white border border-gray-200 rounded-lg p-5 md:p-8">
                <h2 className="text-lg font-inter font-light tracking-wide text-gray-900 mb-6">
                  Personal Information
                </h2>
                <form onSubmit={handleUpdateProfile} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="full_name" className="font-inter font-light text-gray-700">
                        Full Name
                      </Label>
                      <Input
                        id="full_name"
                        value={profile.full_name || ""}
                        onChange={(e) =>
                          setProfile((prev) => ({ ...prev, full_name: e.target.value }))
                        }
                        className="font-inter bg-white border-gray-300 text-gray-900 focus:border-[#C49B08]"
                        placeholder="Your full name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="font-inter font-light text-gray-700">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={profile.phone || ""}
                        onChange={(e) =>
                          setProfile((prev) => ({ ...prev, phone: e.target.value }))
                        }
                        className="font-inter bg-white border-gray-300 text-gray-900 focus:border-[#C49B08]"
                        placeholder="Your phone number"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address" className="font-inter font-light text-gray-700">
                      Address
                    </Label>
                    <Input
                      id="address"
                      value={profile.address || ""}
                      onChange={(e) =>
                        setProfile((prev) => ({ ...prev, address: e.target.value }))
                      }
                      className="font-inter bg-white border-gray-300 text-gray-900 focus:border-[#C49B08]"
                      placeholder="Your street address"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city" className="font-inter font-light text-gray-700">
                      City
                    </Label>
                    <Input
                      id="city"
                      value={profile.city || ""}
                      onChange={(e) =>
                        setProfile((prev) => ({ ...prev, city: e.target.value }))
                      }
                      className="font-inter bg-white border-gray-300 text-gray-900 focus:border-[#C49B08]"
                      placeholder="Your city"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="bg-[#C49B08] hover:bg-[#a8840a] text-white font-inter tracking-wider h-11"
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </Button>
                </form>
              </div>
            </TabsContent>

            <TabsContent value="orders">
              <div className="bg-white border border-gray-200 rounded-lg p-5 md:p-8">
                <h2 className="text-lg font-inter font-light tracking-wide text-gray-900 mb-6">
                  Order History
                </h2>
                <div className="text-center py-12">
                  <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 font-inter font-light">
                    No orders yet
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="wishlist">
              <div className="bg-white border border-gray-200 rounded-lg p-5 md:p-8">
                <h2 className="text-lg font-inter font-light tracking-wide text-gray-900 mb-6">
                  My Wishlist
                </h2>
                <div className="text-center py-12">
                  <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 font-inter font-light mb-4">
                    Your wishlist is empty
                  </p>
                  <Button
                    variant="outline"
                    className="font-inter tracking-wider border-gray-300 text-gray-700"
                    onClick={() => router.push("/collections")}
                  >
                    Browse Collections
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="settings">
              <div className="bg-white border border-gray-200 rounded-lg p-5 md:p-8">
                <h2 className="text-lg font-inter font-light tracking-wide text-gray-900 mb-6">
                  Account Settings
                </h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between py-4 border-b border-gray-200">
                    <div>
                      <p className="font-inter text-gray-900">Email</p>
                      <p className="text-sm text-gray-500 font-inter font-light">
                        {user?.email}
                      </p>
                    </div>
                  </div>

                  <Button
                    variant="destructive"
                    onClick={handleSignOut}
                    className="font-inter tracking-wider"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
