import React from 'react';
import { Search, X, Sparkles, Filter } from 'lucide-react';

export default function SearchAndFilterBar({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  onSelectCategory,
  categories = ['All', 'Skincare', 'Haircare', 'Cosmetics', 'Anti-Aging', 'Body & Barrier']
}) {
  const quickTags = [
    { label: 'Micro-Spicules', term: 'Microcrystal' },
    { label: 'Ceramides', term: 'Ceramide' },
    { label: 'French Melon', term: 'Melon' },
    { label: 'K-Beauty Cushion', term: 'Cushion' },
    { label: 'Urea 10%', term: 'Urea' },
    { label: 'Beef Tallow', term: 'Tallow' },
    { label: 'Docosanol 10%', term: 'Abreva' }
  ];

  return (
    <section className="py-8 bg-[#FAF8F5] border-b border-[#EFE8DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFFFFF] p-4 sm:p-6 rounded-2xl border border-[#EFE8DA] shadow-xs space-y-4">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Search Input Box */}
            <div className="relative flex-1">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products by active ingredient, brand, category, or concern..."
                className="w-full pl-11 pr-10 py-3 rounded-xl bg-[#FAF8F5] border border-[#EFE8DA] text-sm text-[#1A1A1A] placeholder-[#8A847F] focus:outline-none focus:border-[#A4895C] focus:bg-[#FFFFFF] transition-all"
              />
              <Search className="w-4 h-4 text-[#8A847F] absolute left-4 top-1/2 -translate-y-1/2" />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#8A847F] hover:text-[#1A1A1A]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Department Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              <span className="text-xs font-semibold text-[#8A847F] uppercase tracking-wider hidden lg:inline mr-1">
                Filter:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => onSelectCategory(cat)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
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

          {/* Quick Search Tag Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-[#F5EFE6] scrollbar-none text-xs">
            <span className="text-[11px] font-semibold text-[#8A7147] tracking-wider uppercase shrink-0 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#A4895C]" />
              <span>Trending Searches:</span>
            </span>
            {quickTags.map((tag) => (
              <button
                key={tag.label}
                onClick={() => setSearchTerm(tag.term)}
                className="px-2.5 py-1 rounded-md bg-[#FAF8F5] hover:bg-[#F6EAE8] hover:text-[#8C3D49] text-[#5A5552] border border-[#EFE8DA] transition-colors whitespace-nowrap"
              >
                {tag.label}
              </button>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

