import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Priya Fernandopulle",
    location: "Colombo",
    rating: 5,
    text: "The craftsmanship is exceptional. My engagement ring from Luxe Jewels is absolutely stunning. The attention to detail is remarkable.",
  },
  {
    id: 2,
    name: "Dinesh Jayawardena",
    location: "Kandy",
    rating: 5,
    text: "I've been a customer for over 10 years. Their custom design service brought my grandmother's heirloom back to life beautifully.",
  },
  {
    id: 3,
    name: "Amara Silva",
    location: "Galle",
    rating: 5,
    text: "Best jewelry store in Sri Lanka! The quality, the service, and the designs are all world-class. Highly recommend for any occasion.",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-sm tracking-[0.3em] uppercase text-primary font-inter">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-inter font-light tracking-[0.2em] mt-4 mb-6">
            What Our Customers Say
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="luxury-card p-8 relative animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-primary/20">
                <Quote className="h-12 w-12" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-primary text-primary"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-muted-foreground leading-relaxed mb-6 italic font-inter tracking-wide">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-inter font-semibold">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-inter font-medium tracking-wide">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground font-inter">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

