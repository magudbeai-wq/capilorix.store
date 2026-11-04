import React, { useState } from 'react';
import { products } from '../data/products';
import { mainCategories } from '../data/categories';
import { 
  Award, 
  Star, 
  ExternalLink, 
  BookOpen, 
  Check, 
  X, 
  Sparkles, 
  ArrowRight,
  Filter
} from 'lucide-react';

export default function ComparisonsPage({ navigateTo }) {
  const [selectedCat, setSelectedCat] = useState('All');

  const filtered = selectedCat === 'All' 
    ? products 
    : products.filter(p => p.mainCategory === selectedCat || (p.secondaryCategories && p.secondaryCategories.includes(selectedCat)));

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#1A1A1A] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#8A847F] mb-6">
          <button onClick={() => navigateTo('/')} className="hover:text-[#1A1A1A]">Home</button>
          <span>/</span>
          <span className="text-[#1A1A1A] font-semibold">Comparisons</span>
        </nav>

        {/* Header */}
        <header className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#D4C3A3] text-xs font-semibold uppercase tracking-wider text-[#8A7147] mb-3">
            <Award className="w-3.5 h-3.5 text-[#A4895C]" />
            <span>Head-to-Head Comparison Matrix</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-black text-[#1A1A1A]">
            Product Comparisons &amp; Benchmarks
          </h1>
          <p className="mt-2 text-sm text-[#5A5552] font-light leading-relaxed">
            Side-by-side analysis of clinical bio-active concentrations, target concerns, verified peer ratings, and direct retailer pricing.
          </p>
        </header>

        {/* Category Filter Bar */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-6 scrollbar-none">
          <button
            onClick={() => setSelectedCat('All')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCat === 'All'
                ? 'bg-[#1A1A1A] text-white shadow-xs'
                : 'bg-[#FFFFFF] text-[#5A5552] hover:text-[#1A1A1A] border border-[#EFE8DA]'
            }`}
          >
            All Departments ({products.length})
          </button>
          {mainCategories.map((c) => (
            <button
              key={c.slug}
              onClick={() => setSelectedCat(c.slug)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCat === c.slug
                  ? 'bg-[#1A1A1A] text-white shadow-xs'
                  : 'bg-[#FFFFFF] text-[#5A5552] hover:text-[#1A1A1A] border border-[#EFE8DA]'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Full Interactive Comparison Table */}
        <div className="overflow-x-auto rounded-3xl border border-[#EFE8DA] shadow-xs bg-[#FFFFFF] mb-12">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-[#FDFBF7] border-b border-[#EFE8DA] text-xs text-[#8A7147] uppercase tracking-wider font-mono">
                <th className="py-4 px-6 font-semibold">Formula &amp; Brand</th>
                <th className="py-4 px-4 font-semibold">Department</th>
                <th className="py-4 px-4 font-semibold">Rating</th>
                <th className="py-4 px-4 font-semibold">Key Active Compounds</th>
                <th className="py-4 px-4 font-semibold">Direct Price</th>
                <th className="py-4 px-6 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5EFE6] text-sm">
              {filtered.map((p, idx) => (
                <tr key={p.id} className="hover:bg-[#FAF8F5] transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img 
                        src={p.frontImage || p.image} 
                        alt={p.name}
                        className="w-12 h-12 rounded-xl object-cover border border-[#EFE8DA] shrink-0"
                        loading="lazy"
                      />
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#B85D6A] font-mono block">
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
                        <span className="text-[11px] text-[#8A847F] block">
                          {p.badge}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#FAF8F5] border border-[#EFE8DA] text-[#5A5552]">
                      {p.subCategory || p.category}
                    </span>
                  </td>

                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 fill-[#D4C3A3] text-[#A4895C]" />
                      <span className="font-bold text-[#1A1A1A]">{p.rating}</span>
                      <span className="text-xs text-[#8A847F]">({p.reviewCount})</span>
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <span className="text-xs text-[#5A5552] block line-clamp-2">
                      {p.keyIngredients ? p.keyIngredients.slice(0, 2).join(', ') : p.features[0]}
                    </span>
                  </td>

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

      </div>
    </div>
  );
}

