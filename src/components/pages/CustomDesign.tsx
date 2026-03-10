"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { supabase } from "@/lib/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Upload, X, Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  whatsapp: z.string().min(10, "Please enter a valid WhatsApp number"),
  category: z.string().min(1, "Please select a category"),
  material: z.string().optional(),
  description: z.string().min(10, "Please describe your design idea in detail"),
});

type FormData = z.infer<typeof formSchema>;

const categories = [
  { value: "rings", label: "Rings" },
  { value: "necklaces", label: "Necklaces" },
  { value: "earrings", label: "Earrings" },
  { value: "bracelets", label: "Bracelets" },
  { value: "pendants", label: "Pendants" },
  { value: "bangles", label: "Bangles" },
];

const materials = [
  { value: "gold_24k", label: "24K Gold" },
  { value: "gold_22k", label: "22K Gold" },
  { value: "gold_18k", label: "18K Gold" },
  { value: "gold_14k", label: "14K Gold" },
  { value: "silver", label: "Silver" },
  { value: "platinum", label: "Platinum" },
  { value: "rose_gold", label: "Rose Gold" },
  { value: "white_gold", label: "White Gold" },
];

const inputClass =
  "bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-[#C49B08] focus:ring-[#C49B08]/20 font-inter";

const selectTriggerClass =
  "bg-white border-gray-300 text-gray-900 font-inter focus:border-[#C49B08] focus:ring-[#C49B08]/20";

const selectContentClass = "bg-white border-gray-200";

const selectItemClass =
  "text-gray-800 font-inter cursor-pointer data-[highlighted]:bg-gray-100 data-[highlighted]:text-gray-900";

export default function CustomDesign() {
  const [images, setImages] = useState<File[]>([]);
  const [imagesPreviews, setImagesPreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      whatsapp: "",
      category: "",
      material: "",
      description: "",
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    const totalFiles = images.length + newFiles.length;

    if (totalFiles > 5) {
      toast({
        title: "Too many images",
        description: "You can upload a maximum of 5 images",
        variant: "destructive",
      });
      return;
    }

    setImages((prev) => [...prev, ...newFiles]);

    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagesPreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagesPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    // Build a rich description that includes all details
    const fullDescription = [
      `Category: ${data.category}`,
      data.material ? `Material: ${data.material}` : null,
      `\n${data.description}`,
    ]
      .filter(Boolean)
      .join("\n");

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const insertData: Record<string, any> = {
        name: data.name,
        email: "N/A",
        phone: `${data.phone} | WhatsApp: ${data.whatsapp}`,
        description: fullDescription,
        status: "pending",
      };

      const { error } = await supabase
        .from("custom_requests")
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .insert(insertData as any);

      if (error) {
        console.error("Supabase error:", JSON.stringify(error, null, 2));
        throw error;
      }

      form.reset();
      setImages([]);
      setImagesPreviews([]);
      setSubmitted(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Submission error:", error);
      const msg =
        error?.message ||
        error?.error_description ||
        (typeof error === "string" ? error : "Unknown error — check console");
      toast({
        title: "Submission Failed",
        description: msg,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <Layout>
        <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-16">
          <div className="h-16 w-16 rounded-full bg-[#C49B08]/10 flex items-center justify-center mb-6">
            <svg className="h-8 w-8 text-[#C49B08]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl md:text-3xl font-inter font-light tracking-wide text-gray-900 mb-4 text-center">
            Request Submitted Successfully
          </h1>
          <p className="text-gray-500 font-inter font-light text-center max-w-md mb-8">
            Thank you for your custom design request. Our team will review your submission and contact you within 1–2 business days.
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
      <div className="min-h-screen bg-white py-12 md:py-20">
        <div className="container max-w-2xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-10">
            <p className="font-inter text-[11px] tracking-[0.35em] text-[#C49B08] uppercase mb-4">
              Kalyani Jewellers
            </p>
            <h1 className="font-inter text-3xl md:text-4xl font-light tracking-[0.2em] text-gray-900 mb-5">
              CUSTOM DESIGN
            </h1>
            <div className="w-10 h-px bg-[#C49B08]/50 mx-auto mb-5" />
            <p className="font-inter text-gray-500 tracking-wide text-sm leading-relaxed">
              Tell us about your dream jewelry piece and we&apos;ll bring it to life
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm font-inter">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                {/* ── Contact Information ── */}
                <div className="space-y-4">
                  <h2 className="text-base font-medium tracking-[0.08em] text-gray-800 border-b border-gray-200 pb-2">
                    Contact Information
                  </h2>

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Full Name *</FormLabel>
                        <FormControl>
                          <Input className={inputClass} placeholder="Enter your full name" {...field} />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">Contact Number *</FormLabel>
                          <FormControl>
                            <Input className={inputClass} placeholder="07X XXX XXXX" {...field} />
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="whatsapp"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">WhatsApp Number *</FormLabel>
                          <FormControl>
                            <Input className={inputClass} placeholder="07X XXX XXXX" {...field} />
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />
                  </div>

                </div>

                {/* ── Design Details ── */}
                <div className="space-y-4">
                  <h2 className="text-base font-medium tracking-[0.08em] text-gray-800 border-b border-gray-200 pb-2">
                    Design Details
                  </h2>

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Jewelry Category *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className={selectTriggerClass}>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className={selectContentClass}>
                            {categories.map((cat) => (
                              <SelectItem key={cat.value} value={cat.value} className={selectItemClass}>
                                {cat.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="material"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Preferred Material</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className={selectTriggerClass}>
                              <SelectValue placeholder="Select material" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className={selectContentClass}>
                            {materials.map((mat) => (
                              <SelectItem key={mat.value} value={mat.value} className={selectItemClass}>
                                {mat.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Design Description *</FormLabel>
                        <FormControl>
                          <Textarea
                            className={`${inputClass} min-h-[120px]`}
                            placeholder="Describe your dream jewelry piece in detail – style, stones, engravings, etc."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* ── Reference Images ── */}
                <div className="space-y-4">
                  <h2 className="text-base font-medium tracking-[0.08em] text-gray-800 border-b border-gray-200 pb-2">
                    Reference Images
                  </h2>

                  <div className="space-y-3">
                    <Label className="text-gray-700 font-medium">
                      Upload Reference Images (Max 5)
                    </Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-[#C49B08]/60 transition-colors bg-gray-50">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                        disabled={images.length >= 5}
                      />
                      <label
                        htmlFor="image-upload"
                        className="cursor-pointer flex flex-col items-center gap-2"
                      >
                        <Upload className="h-8 w-8 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          Click to upload or drag and drop
                        </span>
                        <span className="text-xs text-gray-400">
                          PNG, JPG up to 10MB each
                        </span>
                      </label>
                    </div>

                    {imagesPreviews.length > 0 && (
                      <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mt-4">
                        {imagesPreviews.map((preview, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={preview}
                              alt={`Preview ${index + 1}`}
                              className="w-full aspect-square object-cover rounded-lg border border-gray-200"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#C49B08] hover:bg-[#a8840a] text-white font-inter tracking-wider h-12 text-sm"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Design Request"
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
