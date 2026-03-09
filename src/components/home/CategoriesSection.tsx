import Link from "next/link";

const categories = [
  {
    name: "Rings",
    slug: "rings",
    description: "Elegant bands & statement pieces",
    image: "/heroimages/rings/THA_6074.jpg",
  },
  {
    name: "Necklaces",
    slug: "necklaces",
    description: "Chains, pendants & chokers",
    image: "/heroimages/necklace/THA_6198.jpg",
  },
  {
    name: "Earrings",
    slug: "earrings",
    description: "Studs, drops & hoops",
    image: "/heroimages/earrings/THA_6215.jpg",
  },
  {
    name: "Bracelets",
    slug: "bracelets",
    description: "Bangles & charm bracelets",
    image: "/heroimages/bracelets/THA_6877.jpg",
  },
];

export function CategoriesSection() {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-[#0f0e0b]">
      <div className="container mx-auto px-4 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <p className="font-inter text-[11px] tracking-[0.45em] uppercase text-[#C49B08] mb-4">
            Our Collections
          </p>
          <h2 className="font-inter text-3xl sm:text-4xl md:text-5xl font-light tracking-[0.15em] sm:tracking-[0.2em] text-white mb-4">
            Shop by Category
          </h2>
          <div className="w-10 h-px bg-[#C49B08]/50 mx-auto mb-5" />
          <p className="text-white/45 max-w-xl mx-auto font-inter text-sm tracking-wide px-4 leading-relaxed">
            Explore our exquisite collections, each piece meticulously crafted to
            celebrate life's precious moments.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.slug}
              href={`/collections?category=${category.slug}`}
              className="group relative overflow-hidden rounded-lg animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Gold border on hover */}
              <div className="absolute inset-0 border border-transparent group-hover:border-[#C49B08]/50 rounded-lg transition-all duration-300" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                {/* Gold rule */}
                <div className="w-6 h-px bg-[#C49B08]/70 mb-2.5 group-hover:w-10 transition-all duration-300" />
                <h3 className="font-inter text-base sm:text-lg md:text-xl font-light tracking-[0.15em] text-white mb-1 group-hover:text-[#C49B08] transition-colors duration-300">
                  {category.name}
                </h3>
                <p className="font-inter text-[11px] sm:text-xs text-white/55 tracking-wide">
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
