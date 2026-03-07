import Link from "next/link";
import Folder from "@/components/effects/Folder";

const categories = [
  {
    name: "Rings",
    slug: "rings",
    description: "Elegant bands & statement pieces",
    images: [
      "/heroimages/rings/THA_6074.jpg",
      "/heroimages/rings/THA_6097.jpg",
      "/heroimages/rings/THA_6151.jpg",
    ],
  },
  {
    name: "Necklaces",
    slug: "necklaces",
    description: "Chains, pendants & chokers",
    images: [
      "/heroimages/necklace/THA_6198.jpg",
      "/heroimages/necklace/THA_6255.jpg",
      "/heroimages/necklace/THA_6823.jpg",
    ],
  },
  {
    name: "Earrings",
    slug: "earrings",
    description: "Studs, drops & hoops",
    images: [
      "/heroimages/earrings/THA_6215.jpg",
      "/heroimages/earrings/THA_6220.jpg",
      "/heroimages/earrings/THA_6247.jpg",
    ],
  },
  {
    name: "Bracelets",
    slug: "bracelets",
    description: "Bangles & charm bracelets",
    images: [
      "/heroimages/bracelets/THA_6877.jpg",
      "/heroimages/bracelets/THA_6894.jpg",
      "/heroimages/bracelets/THA_6905.jpg",
    ],
  },
];

export function CategoriesSection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <span className="text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] uppercase text-primary font-inter">
            Our Collections
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-inter font-light tracking-[0.1em] sm:tracking-[0.2em] mt-3 sm:mt-4 mb-4 sm:mb-6">
            Shop by Category
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-inter text-xs sm:text-sm tracking-wide px-4">
            Explore our exquisite collections, each piece meticulously crafted to
            celebrate life's precious moments.
          </p>
        </div>

        {/* Categories Grid with Folders */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
          {categories.map((category, index) => (
            <Link
              key={category.slug}
              href={`/collections?category=${category.slug}`}
              className="flex flex-col items-center text-center group animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Folder with real images */}
              <div className="mb-3 sm:mb-4 md:mb-6 scale-75 sm:scale-90 md:scale-100">
                <Folder
                  color="#817004"
                  size={1.5}
                  items={category.images.map((src) => (
                    <img
                      key={src}
                      src={src}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                  ))}
                />
              </div>

              {/* Content */}
              <h3 className="text-base sm:text-lg md:text-xl font-inter font-light tracking-[0.1em] sm:tracking-[0.15em] mb-1 sm:mb-2 group-hover:text-primary transition-colors">
                {category.name}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground font-inter tracking-wide">
                {category.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
