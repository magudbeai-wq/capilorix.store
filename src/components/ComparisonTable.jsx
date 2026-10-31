import React from 'react';
import { products } from '../data/products';
import { Star, Check, ExternalLink, Award, BookOpen, ArrowRight } from 'lucide-react';

export default function ComparisonTable({ navigateTo }) {
  // Showcase top 8 benchmarked products for clean matrix readability
  const benchmarkProducts = products.slice(0, 8);

  return (
    <section id="compare-section" className="py-16 bg-[#FAF8F5] border-b border-[#EFE8DA] text-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#D4C3A3] text-xs font-semibold uppercase tracking-wider text-[#8A7147] mb-3">
            <Award className="w-3.5 h-3.5 text-[#A4895C]" />
            <span>Side-by-Side Matrix</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1A1A1A]">
            Product Comparison Section
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#5A5552] font-light">
            Compare active delivery mechanisms, clinical ratings, direct merchant pricing, and certified pros side-by-side.
          </p>
        </div>

        {/* Matrix Container */}
        <div className="overflow-x-auto rounded-2xl border border-[#EFE8DA] shadow-sm bg-[#FFFFFF]">
          <table className="w-full text-left border-collapse min-w-[850px]">
            <thead>
              <tr className="bg-[#FDFBF7] border-b border-[#EFE8DA] text-xs text-[#8A7147] uppercase tracking-wider">
                <th className="py-4 px-6 font-semibold">Formula &amp; Brand</th>
                <th className="py-4 px-4 font-semibold">Peer Rating</th>
                <th className="py-4 px-4 font-semibold">Category</th>
                <th className="py-4 px-4 font-semibold">Key Actives</th>
                <th className="py-4 px-4 font-semibold">Direct Price</th>
                <th className="py-4 px-6 text-right font-semibold">Verified Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5EFE6] text-sm">
              {benchmarkProducts.map((p, index) => (
                <tr 
                  key={p.id} 
                  className={`hover:bg-[#FAF8F5] transition-colors ${
                    index === 0 ? 'bg-[#FDFBF7]' : ''
                  }`}
                >
                  {/* Product Thumbnail & Title */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img 
                        src={p.image} 
                        alt={p.name} 
                        className="w-12 h-12 rounded-lg object-cover border border-[#EFE8DA] shrink-0" 
                        loading="lazy"
                      />
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#B85D6A] block tracking-wider font-mono">
                          {p.brand}
                        </span>
                        <a
                          href={`/blog/${p.slug}`}
                          onClick={(e) => {
                            e.preventDefault();
                            if (navigateTo) navigateTo(`/blog/${p.slug}`);
                          }}
                          className="font-serif font-bold text-[#1A1A1A] hover:text-[#8A7147] transition-colors block text-sm line-clamp-1"
                        >
                          {p.name}
                        </a>
                        <span className="text-xs text-[#8A847F] block">
                          {p.badge}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Rating */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 fill-[#D4C3A3] text-[#A4895C]" />
                      <span className="font-bold text-[#1A1A1A]">{p.rating}</span>
                      <span className="text-xs text-[#8A847F]">({p.reviewCount})</span>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-4 px-4">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#FAF8F5] border border-[#EFE8DA] text-[#5A5552] whitespace-nowrap">
                      {p.category}
                    </span>
                  </td>

                  {/* Key Actives */}
                  <td className="py-4 px-4">
                    <span className="text-xs text-[#5A5552] block line-clamp-2">
                      {p.keyIngredients ? p.keyIngredients.slice(0, 2).join(', ') : p.features[0]}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className="font-serif font-bold text-base text-[#1A1A1A]">
                      {p.currency}{p.price.toFixed(2)}
                    </span>
                    {p.discountPercent > 0 && (
                      <span className="block text-[10px] text-[#B85D6A] font-bold">
                        Save {p.discountPercent}%
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-6 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => navigateTo && navigateTo(`/blog/${p.slug}`)}
                        className="p-2 rounded-lg bg-[#FAF8F5] hover:bg-[#F2ECE4] border border-[#EFE8DA] text-[#1A1A1A] transition-colors"
                        title="Read In-Depth Review"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-[#8A7147]" />
                      </button>

                      <a
                        href={p.affiliateUrl}
                        target="_blank"
                        rel="sponsored nofollow noopener"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#1A1A1A] hover:bg-[#A4895C] text-white text-xs font-semibold transition-colors shadow-xs"
                      >
                        <span>Shop</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Matrix Footer CTA */}
        <div className="mt-6 text-center">
          <button
            onClick={() => navigateTo && navigateTo('/products')}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8A7147] hover:text-[#1A1A1A] transition-colors"
          >
            <span>View All 29 Formulas in Interactive Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
