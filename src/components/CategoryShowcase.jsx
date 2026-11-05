import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { mainCategories } from '../data/categories';
import { products } from '../data/products';

export default function CategoryShowcase({ navigateTo }) {
  const getProductCount = (slug) => {
    return products.filter(p => p.mainCategory === slug || (p.secondaryCategories && p.secondaryCategories.includes(slug))).length;
  };

  return (
    <section className="py-16 bg-[#FDFBF7] border-b border-[#EFE8DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#D4C3A3] text-xs font-semibold uppercase tracking-wider text-[#8A7147] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#A4895C]" />
              <span>The 8 Core Departments</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1A1A1A]">
              Featured Beauty Categories
            </h2>
            <p className="mt-2 text-sm text-[#5A5552] max-w-xl font-light">
              Explore lab-verified benchmarks and editorial reviews across all 8 specialized beauty and dermatological sectors.
            </p>
          </div>

          <button
            onClick={() => navigateTo && navigateTo('/products')}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#8A7147] hover:text-[#1A1A1A] transition-colors self-start md:self-auto"
          >
            <span>View Complete Directory ({products.length} Formulas)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Categories Grid (4 columns on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mainCategories.map((cat) => {
            const count = getProductCount(cat.slug);
            return (
              <div
                key={cat.slug}
                onClick={() => navigateTo && navigateTo(`/${cat.slug}`)}
                className="group cursor-pointer bg-[#FFFFFF] rounded-2xl border border-[#EFE8DA] overflow-hidden shadow-xs hover:shadow-xl hover:border-[#D4C3A3] transition-all duration-300 flex flex-col justify-between"
              >
                {/* Category Image */}
                <div className="relative h-44 w-full overflow-hidden bg-[#FAF8F5]">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  
                  {/* Count Badge */}
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-xs text-[#1A1A1A] text-[10px] font-bold shadow-xs">
                      {count} Formulas
                    </span>
                  </div>

                  {/* Title on image */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="text-lg font-serif font-bold leading-tight">
                      {cat.name}
                    </h3>
                  </div>
                </div>

                {/* Category Subtext & Arrow */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-semibold text-[#8A7147] uppercase tracking-wider mb-1 font-mono">
                      {cat.headline}
                    </h4>
                    <p className="text-xs text-[#5A5552] line-clamp-2 font-light">
                      {cat.description}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-[#F5EFE6] flex items-center justify-between text-xs font-bold text-[#1A1A1A] group-hover:text-[#B85D6A] transition-colors">
                    <span>Explore Department</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
