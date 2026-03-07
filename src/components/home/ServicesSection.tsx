import Link from "next/link";

const services = [
  {
    title: "Custom Design",
    href: "/custom",
  },
  {
    title: "Repair Services",
    href: "/repair",
  },
  {
    title: "Contact Us",
    href: "/contact",
  },
];

export function ServicesSection() {
  return (
    <section className="py-8 sm:py-10 md:py-12 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-3 sm:gap-6 md:gap-16 lg:gap-24">
          {services.map((service, index) => (
            <Link
              key={service.title}
              href={service.href}
              className="w-full sm:w-auto px-6 sm:px-8 md:px-12 py-3 sm:py-4 bg-[#D4AF37] rounded-full font-inter text-sm sm:text-base tracking-[0.1em] sm:tracking-[0.15em] text-black text-center hover:scale-105 hover:shadow-[0_0_25px_rgba(212,175,55,0.6)] transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {service.title}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

