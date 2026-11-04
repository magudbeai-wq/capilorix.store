import React, { useState } from 'react';
import { products } from '../data/products';
import { BookOpen, Search, Clock, ArrowRight, Star, ShieldCheck, Sparkles } from 'lucide-react';

export default function BlogPage({ navigateTo, initialCategory = 'All' }) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'Skincare', 'Haircare', 'Cosmetics', 'Anti-Aging', 'Body & Barrier'];

  // Filter articles for all 29 products
  const filtered = products.filter((p) => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = !searchTerm ||
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.blogTitle && p.blogTitle.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (p.blogSummary && p.blogSummary.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (p.author && p.author.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  // Featured Lead Story (Rael Microcrystal)
  const leadStory = products[0];

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#1A1A1A] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="mb-8 border-b border-[#EFE8DA] pb-6">
          <div className="flex items-center gap-2 text-xs text-[#8A847F] mb-3">
            <button onClick={() => navigateTo('/')} className="hover:text-[#1A1A1A]">Home</button>
            <span>/</span>
            <span className="text-[#1A1A1A] font-semibold">Editorial Reviews &amp; Blog</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#D4C3A3] text-xs font-semibold uppercase tracking-wider text-[#8A7147] mb-2">
                <BookOpen className="w-3.5 h-3.5 text-[#A4895C]" />
                <span>The Capilorix Beauty Dispatch</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-serif font-black text-[#1A1A1A]">
                Clinical Reviews &amp; Forensic Guides
              </h1>
              <p className="mt-2 text-sm text-[#5A5552] max-w-2xl font-light">
                Every formula evaluated by board-certified dermal specialists, cosmetic chemists, and trichologists. Explore all 29 forensic reviews below.
              </p>
            </div>

            <div className="text-xs text-[#8A847F] font-mono">
              Archive: <span className="font-bold text-[#1A1A1A]">{filtered.length}</span> Published Reviews
            </div>
          </div>
        </div>

        {/* Lead Story Feature (when not actively searching) */}
        {!searchTerm && selectedCategory === 'All' && leadStory && (
          <div 
            onClick={() => navigateTo(`/blog/${leadStory.slug}`)}
            className="group cursor-pointer bg-[#FFFFFF] rounded-3xl border border-[#EFE8DA] hover:border-[#D4C3A3] shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden mb-12 grid grid-cols-1 lg:grid-cols-12"
          >
            <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto overflow-hidden bg-[#FAF8F5]">
              <img
                src={leadStory.image}
                alt={leadStory.blogTitle || leadStory.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-[#1A1A1A] text-white text-xs font-serif font-bold">
                  Lead Story • Editor's #1 Pick
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-[#8A847F]">
                  <span className="font-bold text-[#B85D6A] uppercase tracking-wider font-mono">
                    {leadStory.brand}
                  </span>
                  <div className="flex items-center gap-1 text-[#A4895C]">
                    <Star className="w-3.5 h-3.5 fill-[#D4C3A3] text-[#A4895C]" />
                    <span className="font-bold text-[#1A1A1A]">{leadStory.rating}</span>
                  </div>
                </div>

                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1A1A1A] leading-snug group-hover:text-[#8A7147] transition-colors">
                  {leadStory.blogTitle}
                </h2>

                <p className="text-xs sm:text-sm text-[#5A5552] leading-relaxed font-light">
                  {leadStory.blogSummary}
                </p>
              </div>

              <div className="pt-4 border-t border-[#F5EFE6]">
                <div className="flex items-center justify-between text-xs text-[#8A847F] mb-3">
                  <span>By {leadStory.author}</span>
                  <span className="flex items-center gap-1 font-mono">
                    <Clock className="w-3.5 h-3.5" />
                    {leadStory.readTime}
                  </span>
                </div>

                <div className="inline-flex items-center gap-2 text-xs font-bold text-[#1A1A1A] group-hover:text-[#B85D6A] transition-colors">
                  <span>Read Complete Forensic Investigation</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filter and Search Bar */}
        <div className="bg-[#FFFFFF] p-4 sm:p-5 rounded-2xl border border-[#EFE8DA] shadow-xs mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            
            <div className="relative flex-1 w-full">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search reviews by title, author, or ingredient..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#EFE8DA] text-xs sm:text-sm text-[#1A1A1A] placeholder-[#8A847F] focus:outline-none focus:border-[#A4895C]"
              />
              <Search className="w-4 h-4 text-[#8A847F] absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
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
        </div>

        {/* Reviews Grid (All 29 Products) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <article
              key={item.id}
              onClick={() => navigateTo(`/blog/${item.slug}`)}
              className="group cursor-pointer bg-[#FFFFFF] rounded-2xl border border-[#EFE8DA] overflow-hidden shadow-xs hover:shadow-xl hover:border-[#D4C3A3] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-56 w-full overflow-hidden bg-[#FAF8F5]">
                  <img
                    src={item.image}
                    alt={item.blogTitle || item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-xs text-[10px] font-bold text-[#8A7147] uppercase tracking-wider shadow-xs">
                      {item.category}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded-full bg-[#FAF8F5] text-[10px] font-bold text-[#1A1A1A] border border-[#EFE8DA] flex items-center gap-1 shadow-xs">
                      <Star className="w-3 h-3 fill-[#D4C3A3] text-[#A4895C]" />
                      <span>{item.rating}</span>
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#8A847F]">
                    <span>{item.publishedDate}</span>
                    <span className="flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3" />
                      {item.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-[#1A1A1A] leading-snug group-hover:text-[#B85D6A] transition-colors line-clamp-2">
                    {item.blogTitle || item.name}
                  </h3>

                  <p className="text-xs text-[#5A5552] leading-relaxed line-clamp-3 font-light">
                    {item.blogSummary || item.verdict}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <div className="pt-3 border-t border-[#F5EFE6] flex items-center justify-between text-xs text-[#8A847F]">
                  <span className="truncate max-w-[170px]">{item.author}</span>
                  <div className="flex items-center gap-1 font-bold text-[#1A1A1A] group-hover:text-[#B85D6A] transition-colors shrink-0">
                    <span>Read Review</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
}

