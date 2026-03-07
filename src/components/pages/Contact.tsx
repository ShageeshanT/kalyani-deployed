"use client";

import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Clock, CheckCircle } from "lucide-react";
import { z } from "zod";

const contactFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().max(15).optional(),
  subject: z.string().trim().max(200).optional(),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

const inputClass =
  "bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-[#C49B08] font-inter";

export default function Contact() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
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
      const validated = contactFormSchema.parse(formData);

      const { error } = await supabase.from("inquiries").insert({
        name: validated.name,
        email: validated.email,
        phone: validated.phone || null,
        subject: validated.subject || null,
        message: validated.message,
      });

      if (error) throw error;

      setSubmitted(true);
      toast({
        title: "Message Sent",
        description: "Thank you for contacting us. We will respond shortly.",
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
        toast({
          title: "Error",
          description: "Failed to send message. Please try again.",
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
            Message Sent Successfully
          </h1>
          <p className="text-gray-500 font-inter font-light text-center max-w-md mb-8">
            Thank you for reaching out. Our team will get back to you within 24 hours.
          </p>
          <Button
            onClick={() => {
              setSubmitted(false);
              setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
            }}
            variant="outline"
            className="font-inter tracking-wider border-gray-300 text-gray-700"
          >
            Send Another Message
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-white py-10 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10 md:mb-12">
            <p className="font-inter text-[11px] tracking-[0.35em] text-[#C49B08] uppercase mb-4">
              New Kalyani Jewellers
            </p>
            <h1 className="font-inter text-3xl md:text-4xl font-light tracking-[0.2em] text-gray-900 mb-4">
              CONTACT US
            </h1>
            <div className="w-10 h-px bg-[#C49B08]/50 mx-auto mb-4" />
            <p className="text-gray-500 font-inter font-light max-w-lg mx-auto text-sm tracking-wide leading-relaxed">
              We would love to hear from you. Get in touch for any inquiries about our collections or services.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-lg font-inter font-light tracking-wide text-gray-900 mb-6">
                Get in Touch
              </h2>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#C49B08]/10 rounded-full flex-shrink-0">
                    <MapPin className="h-5 w-5 text-[#C49B08]" />
                  </div>
                  <div>
                    <h3 className="font-inter font-medium text-gray-900 mb-1">
                      Visit Our Store
                    </h3>
                    <p className="text-gray-500 font-inter font-light text-sm">
                      475/A Kaduwela Rd,
                      <br />
                      Sri Jayawardenepura Kotte
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#C49B08]/10 rounded-full flex-shrink-0">
                    <Phone className="h-5 w-5 text-[#C49B08]" />
                  </div>
                  <div>
                    <h3 className="font-inter font-medium text-gray-900 mb-1">
                      Call Us
                    </h3>
                    <a
                      href="tel:01122571482"
                      className="text-gray-500 font-inter font-light text-sm hover:text-[#C49B08] transition-colors"
                    >
                      0112 257 1482
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#C49B08]/10 rounded-full flex-shrink-0">
                    <Mail className="h-5 w-5 text-[#C49B08]" />
                  </div>
                  <div>
                    <h3 className="font-inter font-medium text-gray-900 mb-1">
                      Email Us
                    </h3>
                    <a
                      href="mailto:kj.kalyanijewellers@gmail.com"
                      className="text-gray-500 font-inter font-light text-sm hover:text-[#C49B08] transition-colors break-all"
                    >
                      kj.kalyanijewellers@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#C49B08]/10 rounded-full flex-shrink-0">
                    <Clock className="h-5 w-5 text-[#C49B08]" />
                  </div>
                  <div>
                    <h3 className="font-inter font-medium text-gray-900 mb-1">
                      Business Hours
                    </h3>
                    <p className="text-gray-500 font-inter font-light text-sm">
                      Monday – Saturday: 10:00 AM – 7:00 PM
                      <br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 md:p-8 shadow-sm">
              <h2 className="text-lg font-inter font-light tracking-wide text-gray-900 mb-6">
                Send a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="font-inter font-light text-gray-700">
                      Your Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="Full name"
                    />
                    {errors.name && (
                      <p className="text-xs text-red-500">{errors.name}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="font-inter font-light text-gray-700">
                      Phone (Optional)
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="Your phone number"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="font-inter font-light text-gray-700">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="font-inter font-light text-gray-700">
                    Subject (Optional)
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="How can we help?"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="font-inter font-light text-gray-700">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={`${inputClass} min-h-[120px]`}
                    placeholder="Write your message here..."
                  />
                  {errors.message && (
                    <p className="text-xs text-red-500">{errors.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#C49B08] hover:bg-[#a8840a] text-white font-inter tracking-wider h-12"
                >
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
