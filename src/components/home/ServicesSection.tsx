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
    <section className="bg-[#0f0e0b] relative py-10 md:py-14">
      {/* Gold separator lines */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C49B08]/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C49B08]/30 to-transparent" />

      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 sm:gap-8 md:gap-16 lg:gap-24">
          {services.map((service, index) => (
            <Link
              key={service.title}
              href={service.href}
              className="w-full sm:w-auto px-8 sm:px-10 md:px-14 py-3.5 bg-[#C49B08] hover:bg-[#a8840a] rounded-full font-inter text-xs sm:text-sm tracking-[0.18em] uppercase text-[#0f0e0b] font-medium text-center transition-all duration-300 hover:shadow-[0_0_28px_rgba(196,155,8,0.4)] hover:scale-[1.03] animate-fade-in-up"
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

