import React from 'react';
import { Award, Star, ExternalLink, BookOpen, ArrowRight } from 'lucide-react';
import { products } from '../data/products';

export default function EditorsPicks({ navigateTo }) {
  // Top 3 Hall of Fame products
  const topPicks = [
    {
      product: products[0], // Rael Microcrystal
      hallOfFameTitle: "Best Innovation Award: Bio-Spicule Resurfacing",
      editorNote: "Rael's 2,000-microcrystal delivery technology has fundamentally shifted how we approach non-acid pore refining. The slight active tingle confirms deep physical channels that traditional AHAs simply cannot achieve."
    },
    {
      product: products[2], // Meaningful Beauty French Melon
      hallOfFameTitle: "Best Luxury Anti-Aging Investment",
      editorNote: "The French cantaloupe Superoxide Dismutase (SOD) stem cell technology provides an impenetrable antioxidant barrier. Exceptional for lifting facial contours and reversing photo-damage."
    },
    {
      product: products[1], // Beauty Formulas Ceramides
      hallOfFameTitle: "Best Barrier Discovery Under €5",
      editorNote: "Packing a complete physiological 3:1:1 lipid bilayer ratio of Ceramides NP, AP, and EOP into an ultra-accessible €4.70 serum is Europe's finest skincare feat this season."
    }
  ];

  return (
    <section className="py-16 bg-[#FDFBF7] border-b border-[#EFE8DA] text-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#D4C3A3] text-xs font-semibold uppercase tracking-wider text-[#8A7147] mb-3">
            <Award className="w-3.5 h-3.5 text-[#A4895C]" />
            <span>The Hall of Fame</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1A1A1A]">
            Editor's Picks
          </h2>
          <p className="mt-2 text-sm text-[#5A5552] font-light">
            Selected by our senior dermatological panel as the three most extraordinary formulations of 2026.
          </p>
        </div>

        {/* 3 Top Spotlight Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {topPicks.map(({ product, hallOfFameTitle, editorNote }) => (
            <div
              key={product.id}
              className="bg-[#FFFFFF] rounded-2xl border border-[#EFE8DA] hover:border-[#D4C3A3] shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Product Image */}
                <div className="relative h-60 w-full overflow-hidden bg-[#FAF8F5]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full bg-[#1A1A1A] text-white text-[11px] font-serif font-bold shadow-xs">
                      {hallOfFameTitle}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <span className="px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-xs text-[11px] font-bold text-[#1A1A1A] border border-[#EFE8DA]">
                      {product.currency}{product.price.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#B85D6A] uppercase tracking-wider font-mono">
                      {product.brand}
                    </span>
                    <div className="flex items-center gap-1 text-[#A4895C]">
                      <Star className="w-3.5 h-3.5 fill-[#D4C3A3] text-[#A4895C]" />
                      <span className="font-bold text-[#1A1A1A]">{product.rating}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-[#1A1A1A] leading-snug">
                    <a
                      href={`/blog/${product.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        if (navigateTo) navigateTo(`/blog/${product.slug}`);
                      }}
                      className="hover:text-[#8A7147] transition-colors"
                    >
                      {product.name}
                    </a>
                  </h3>

                  {/* Editor's Note Quote */}
                  <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EFE8DA] text-xs text-[#5A5552] italic leading-relaxed">
                    "{editorNote}"
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="p-6 pt-0 grid grid-cols-2 gap-2">
                <button
                  onClick={() => navigateTo && navigateTo(`/blog/${product.slug}`)}
                  className="py-2.5 px-3 rounded-xl bg-[#FAF8F5] hover:bg-[#F2ECE4] border border-[#EFE8DA] text-[#1A1A1A] text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#8A7147]" />
                  <span>Review</span>
                </button>

                <a
                  href={product.affiliateUrl}
                  target="_blank"
                  rel="sponsored nofollow noopener"
                  className="py-2.5 px-3 rounded-xl bg-[#1A1A1A] hover:bg-[#A4895C] text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <span>Shop Deal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
