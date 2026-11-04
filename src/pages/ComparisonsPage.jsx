import React, { useState } from 'react';
import { products } from '../data/products';
import { mainCategories } from '../data/categories';
import ProductComparisonTemplate from '../components/ProductComparisonTemplate';
import { 
  Award, 
  Star, 
  ExternalLink, 
  BookOpen, 
  Scale,
  Sparkles, 
  ArrowRight,
  Filter,
  Layers
} from 'lucide-react';

export default function ComparisonsPage({ navigateTo }) {
  const [viewMode, setViewMode] = useState('sideBySide'); // 'sideBySide' | 'matrix'
  const [selectedCat, setSelectedCat] = useState('All');
  const [productA, setProductA] = useState(products[0]);
  const [productB, setProductB] = useState(products[1] || products[0]);

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
          <span className="text-[#1A1A1A] font-semibold">Comparisons &amp; Benchmarks</span>
        </nav>

        {/* View Mode Switcher */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#EFE8DA]">
          <div>
            <h1 className="text-2xl sm:text-4xl font-serif font-black text-[#1A1A1A]">
              Formulation Comparison Hub
            </h1>
            <p className="text-xs sm:text-sm text-[#5A5552] mt-1 font-light">
              Benchmark actives, delivery mechanisms, size, pricing, and independent pros &amp; cons.
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#FFFFFF] border border-[#EFE8DA]">
            <button
              onClick={() => setViewMode('sideBySide')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'sideBySide'
                  ? 'bg-[#1A1A1A] text-white shadow-xs'
                  : 'text-[#5A5552] hover:text-[#1A1A1A]'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>Side-by-Side (A vs B)</span>
            </button>

            <button
              onClick={() => setViewMode('matrix')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'matrix'
                  ? 'bg-[#1A1A1A] text-white shadow-xs'
                  : 'text-[#5A5552] hover:text-[#1A1A1A]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Full Catalog Matrix</span>
            </button>
          </div>
        </div>

        {/* MODE 1: Side-by-Side Dual Audit */}
        {viewMode === 'sideBySide' && (
          <ProductComparisonTemplate
            productA={productA}
            productB={productB}
            allProducts={products}
            onSelectA={setProductA}
            onSelectB={setProductB}
            navigateTo={navigateTo}
          />
        )}

        {/* MODE 2: Full Catalog Matrix */}
        {viewMode === 'matrix' && (
          <div className="space-y-6">
            {/* Category Filter Bar */}
            <div className="flex items-center justify-start gap-2 overflow-x-auto pb-3 scrollbar-none">
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

            {/* Matrix Table */}
            <div className="overflow-x-auto rounded-3xl border border-[#EFE8DA] shadow-xs bg-[#FFFFFF]">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                  <tr className="bg-[#FDFBF7] border-b border-[#EFE8DA] text-xs text-[#8A7147] uppercase tracking-wider font-mono">
                    <th className="py-4 px-6 font-semibold">Formula &amp; Brand</th>
                    <th className="py-4 px-4 font-semibold">Category</th>
                    <th className="py-4 px-4 font-semibold">Score</th>
                    <th className="py-4 px-4 font-semibold">Key Actives</th>
                    <th className="py-4 px-4 font-semibold">Price</th>
                    <th className="py-4 px-6 text-right font-semibold">Quick Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F5EFE6] text-xs">
                  {filtered.map((p) => (
                    <tr key={p.id} className="hover:bg-[#FAF8F5] transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.frontImage || p.image}
                            alt={p.name}
                            className="w-12 h-12 object-cover rounded-xl bg-[#FAF8F5] border border-[#EFE8DA] shrink-0"
                          />
                          <div>
                            <span className="text-[10px] font-bold text-[#A4895C] uppercase tracking-wider font-mono block">
                              {p.brand}
                            </span>
                            <span className="font-serif font-bold text-sm text-[#1A1A1A] block max-w-xs truncate" title={p.name}>
                              {p.name}
                            </span>
                            <span className="text-[10px] text-[#8A847F] mt-0.5 block font-mono">
                              Merchant: {p.merchant} ({p.targetCountry || 'Global'})
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
                          {p.keyIngredients ? p.keyIngredients.slice(0, 2).join(', ') : 'Specialized Complex'}
                        </span>
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="font-serif font-bold text-base text-[#1A1A1A]">
                          {p.currency}{p.price}
                        </span>
                      </td>

                      <td className="py-4 px-6 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setProductA(p);
                              setViewMode('sideBySide');
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="px-2.5 py-1.5 rounded-lg bg-[#FAF8F5] hover:bg-[#F2ECE4] border border-[#EFE8DA] text-[11px] font-semibold text-[#8A7147] transition-colors"
                          >
                            Compare A/B
                          </button>

                          <button
                            onClick={() => navigateTo && navigateTo(`/blog/${p.slug}`)}
                            className="p-1.5 rounded-lg bg-[#FAF8F5] hover:bg-[#F2ECE4] border border-[#EFE8DA] text-[#1A1A1A] transition-colors"
                            title="Read Review"
                          >
                            <BookOpen className="w-3.5 h-3.5 text-[#8A7147]" />
                          </button>

                          <a
                            href={p.affiliateUrl || p.buyUrl}
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
        )}

      </div>
    </div>
  );
}
