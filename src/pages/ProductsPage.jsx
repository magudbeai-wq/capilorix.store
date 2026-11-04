import React, { useState } from 'react';
import { products, beautyCategories } from '../data/products';
import ProductCard from '../components/ProductCard';
import { Sparkles, Search, Filter, ArrowUpDown, ShoppingBag } from 'lucide-react';

export default function ProductsPage({ navigateTo, initialCategory = 'All' }) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('featured'); // 'featured', 'rating', 'price-low', 'price-high'

  const categories = ['All', ...beautyCategories.map(c => c.name)];

  // Filter & Search
  const filtered = products.filter((p) => {
    const targetSlug = selectedCategory.toLowerCase().replace(/\s+/g, '-');
    const matchesCat = selectedCategory === 'All' || 
      p.category === selectedCategory ||
      p.mainCategory === targetSlug ||
      (p.secondaryCategories && p.secondaryCategories.includes(targetSlug));
      
    const matchesSearch = !searchTerm || 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.keyIngredients && p.keyIngredients.some(k => k.toLowerCase().includes(searchTerm.toLowerCase())));
    return matchesCat && matchesSearch;
  });

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return 0; // featured maintains curated order
  });

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#1A1A1A] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Breadcrumb & Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-[#8A847F] mb-3">
            <button onClick={() => navigateTo('/')} className="hover:text-[#1A1A1A]">Home</button>
            <span>/</span>
            <span className="text-[#1A1A1A] font-semibold">Products Directory</span>
            {selectedCategory !== 'All' && (
              <>
                <span>/</span>
                <span className="text-[#A4895C] font-semibold">{selectedCategory}</span>
              </>
            )}
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#EFE8DA] pb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#D4C3A3] text-xs font-semibold uppercase tracking-wider text-[#8A7147] mb-2">
                <ShoppingBag className="w-3.5 h-3.5 text-[#A4895C]" />
                <span>The Capilorix Curated Directory</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-serif font-black text-[#1A1A1A]">
                All Benchmarked Beauty Formulas
              </h1>
              <p className="mt-2 text-sm text-[#5A5552] max-w-2xl font-light">
                Browse our complete catalog of 29 laboratory-tested skincare, haircare, cosmetics, anti-aging, and dermal recovery products with verified direct merchant pricing.
              </p>
            </div>

            <div className="text-xs text-[#8A847F] font-mono">
              Showing <span className="font-bold text-[#1A1A1A]">{sorted.length}</span> of 29 Formulas
            </div>
          </div>
        </div>

        {/* Filter and Control Bar */}
        <div className="bg-[#FFFFFF] p-4 sm:p-5 rounded-2xl border border-[#EFE8DA] shadow-xs mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products by active ingredient, brand, or concern..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#EFE8DA] text-xs sm:text-sm text-[#1A1A1A] placeholder-[#8A847F] focus:outline-none focus:border-[#A4895C]"
              />
              <Search className="w-4 h-4 text-[#8A847F] absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-semibold text-[#8A847F] flex items-center gap-1">
                <ArrowUpDown className="w-3.5 h-3.5" />
                <span>Sort By:</span>
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#FAF8F5] border border-[#EFE8DA] rounded-xl px-3 py-2 text-xs font-semibold text-[#1A1A1A] focus:outline-none focus:border-[#A4895C]"
              >
                <option value="featured">Editorial Rank (Featured)</option>
                <option value="rating">Highest Peer Rating</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-[#F5EFE6] scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#1A1A1A] text-white shadow-xs'
                    : 'bg-[#FAF8F5] text-[#5A5552] hover:text-[#1A1A1A] hover:bg-[#F2ECE4] border border-[#EFE8DA]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Stack */}
        {sorted.length > 0 ? (
          <div className="space-y-8">
            {sorted.map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                rank={idx + 1}
                navigateTo={navigateTo}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#FFFFFF] rounded-2xl border border-dashed border-[#EFE8DA] p-8">
            <h3 className="text-xl font-serif font-bold text-[#1A1A1A] mb-2">No Matching Formulas Found</h3>
            <p className="text-xs text-[#8A847F] mb-4">
              We couldn't find any products matching "{searchTerm}". Try clearing your search query.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="px-5 py-2.5 rounded-xl bg-[#1A1A1A] text-white text-xs font-semibold"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

