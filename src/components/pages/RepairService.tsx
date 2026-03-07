"use client";

import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/lib/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle } from "lucide-react";
import { z } from "zod";

const repairFormSchema = z.object({
  customerName: z.string().trim().min(1, "Name is required").max(100),
  customerPhone: z.string().trim().min(10, "Valid phone number required").max(15),
  itemDescription: z.string().trim().min(1, "Item description is required").max(500),
  repairDescription: z.string().trim().min(1, "Please describe the repair needed").max(1000),
  pickupPreference: z.string().optional(),
});

const inputClass =
  "bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-[#C49B08] focus:ring-[#C49B08]/20 font-inter";

const selectItemClass =
  "text-gray-800 font-inter cursor-pointer data-[highlighted]:bg-gray-100 data-[highlighted]:text-gray-900";

export default function RepairService() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    customerName: "",
    customerPhone: "",
    itemDescription: "",
    repairDescription: "",
    pickupPreference: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const validated = repairFormSchema.parse(formData);

      const { error } = await supabase.from("repair_requests").insert({
        name: validated.customerName,
        email: "N/A",
        phone: validated.customerPhone,
        item_description: validated.itemDescription,
        issue_description: validated.repairDescription,
        status: "pending",
      } as any);

      if (error) throw error;

      setSubmitted(true);
      toast({
        title: "Request Submitted",
        description: "We will contact you shortly regarding your repair request.",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.issues.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        const msg =
          (error as any)?.message ||
          (error as any)?.error_description ||
          "Failed to submit request. Please try again.";
        console.error("Repair request error:", error);
        toast({
          title: "Error",
          description: msg,
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <Layout>
        <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-16">
          <CheckCircle className="h-16 w-16 text-[#C49B08] mb-6" />
          <h1 className="text-2xl md:text-3xl font-inter font-light tracking-wide text-gray-900 mb-4 text-center">
            Request Submitted Successfully
          </h1>
          <p className="text-gray-500 font-inter font-light text-center max-w-md mb-8">
            Thank you for your repair request. Our team will review your submission and contact you within 1–2 business days.
          </p>
          <Button
            onClick={() => setSubmitted(false)}
            className="font-inter tracking-wider bg-[#C49B08] hover:bg-[#a8840a] text-white h-12 px-8 text-sm"
          >
            Submit Another Request
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <p className="font-inter text-[11px] tracking-[0.35em] text-[#C49B08] uppercase mb-4">
              Kalyani Jewellers
            </p>
            <h1 className="font-inter text-3xl md:text-4xl font-light tracking-[0.2em] text-gray-900 mb-5">
              REPAIR SERVICES
            </h1>
            <div className="w-10 h-px bg-[#C49B08]/50 mx-auto mb-5" />
            <p className="text-gray-500 font-inter font-light max-w-lg mx-auto text-sm tracking-wide leading-relaxed">
              Submit a repair request for your precious jewellery. Our expert craftsmen will restore your pieces to their original beauty.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Name + Phone row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="customerName" className="font-inter font-medium text-gray-700">
                    Full Name
                  </Label>
                  <Input
                    id="customerName"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Your full name"
                  />
                  {errors.customerName && (
                    <p className="text-xs text-red-500">{errors.customerName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customerPhone" className="font-inter font-medium text-gray-700">
                    Phone Number
                  </Label>
                  <Input
                    id="customerPhone"
                    name="customerPhone"
                    type="tel"
                    value={formData.customerPhone}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="07X XXX XXXX"
                  />
                  {errors.customerPhone && (
                    <p className="text-xs text-red-500">{errors.customerPhone}</p>
                  )}
                </div>
              </div>

              {/* Item Description */}
              <div className="space-y-2">
                <Label htmlFor="itemDescription" className="font-inter font-medium text-gray-700">
                  Item Description
                </Label>
                <Input
                  id="itemDescription"
                  name="itemDescription"
                  value={formData.itemDescription}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="e.g., 22K Gold Ring with Diamond"
                />
                {errors.itemDescription && (
                  <p className="text-xs text-red-500">{errors.itemDescription}</p>
                )}
              </div>

              {/* Issue Description */}
              <div className="space-y-2">
                <Label htmlFor="repairDescription" className="font-inter font-medium text-gray-700">
                  Describe the Issue
                </Label>
                <Textarea
                  id="repairDescription"
                  name="repairDescription"
                  value={formData.repairDescription}
                  onChange={handleChange}
                  className={`${inputClass} min-h-[120px]`}
                  placeholder="Please describe what repairs or restoration work is needed..."
                />
                {errors.repairDescription && (
                  <p className="text-xs text-red-500">{errors.repairDescription}</p>
                )}
              </div>

              {/* Pickup Preference */}
              <div className="space-y-2">
                <Label className="font-inter font-medium text-gray-700">
                  Pickup Preference
                </Label>
                <Select
                  value={formData.pickupPreference}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, pickupPreference: value }))
                  }
                >
                  <SelectTrigger className="bg-white border-gray-300 text-gray-900 font-inter focus:border-[#C49B08] focus:ring-[#C49B08]/20">
                    <SelectValue placeholder="Select your preference" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200">
                    <SelectItem value="store_dropoff" className={selectItemClass}>
                      Drop off at Store
                    </SelectItem>
                    <SelectItem value="courier_pickup" className={selectItemClass}>
                      Courier Pickup
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#C49B08] hover:bg-[#a8840a] text-white font-inter tracking-wider h-12 text-sm"
              >
                {loading ? "Submitting..." : "Submit Repair Request"}
              </Button>
            </form>
          </div>

          {/* Footer note */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 font-inter">
              Need urgent assistance? Call us at{" "}
              <a href="tel:01122571482" className="text-[#C49B08] hover:underline">
                0112 257 1482
              </a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
