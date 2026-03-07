import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Please enter your email",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate subscription
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast({
      title: "Thank you for subscribing!",
      description: "You'll receive our latest updates and exclusive offers.",
    });
    
    setEmail("");
    setIsLoading(false);
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-40 sm:w-60 md:w-80 h-40 sm:h-60 md:h-80 rounded-full bg-accent/5 blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase text-primary font-inter">
            Stay Connected
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-inter font-light tracking-[0.1em] sm:tracking-[0.2em] mt-3 sm:mt-4 mb-4 sm:mb-6">
            Join Our Circle
          </h2>
          <p className="text-muted-foreground mb-6 sm:mb-8 font-inter tracking-wide text-sm sm:text-base px-2">
            Subscribe to receive exclusive offers, new collection alerts, and
            jewelry care tips. Be the first to know about our special events.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="luxury-input flex-1"
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="luxury-button-primary gap-2"
            >
              {isLoading ? (
                "Subscribing..."
              ) : (
                <>
                  Subscribe
                  <Send className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <p className="text-xs text-muted-foreground mt-4 font-inter tracking-wide">
            By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}

