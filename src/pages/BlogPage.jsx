import React, { useState } from 'react';
import { articleService } from '../services/articleService';
import { productService } from '../services/productService';
import { authors, getAuthorById } from '../data/authors';
import { mainCategories } from '../data/categories';
import { BookOpen, Search, Clock, ArrowRight, Star, ShieldCheck, Sparkles, Filter, Layers } from 'lucide-react';

export default function BlogPage({ navigateTo, initialCategory = 'All' }) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedFormat, setSelectedFormat] = useState('All'); // 'All', 'roundup', 'comparison', 'guide', 'review'
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch articles from CMS service
  const cmsArticles = articleService.getPublishedArticles();
  const products = productService.getProducts();

  // Combine articles and product reviews
  // Map CMS articles
  const formattedCmsArticles = cmsArticles.map((art) => {
    const authorObj = getAuthorById(art.authorId);
    return {
      id: art.id,
      slug: art.slug,
      title: art.title,
      subtitle: art.subtitle,
      excerpt: art.excerpt,
      coverImage: art.coverImage,
      category: art.category,
      format: art.articleType || 'roundup',
      author: authorObj.name,
      authorTitle: authorObj.title,
      authorAvatar: authorObj.avatar,
      readTime: art.readTime || '8 min read',
      rating: 4.95,
      date: art.publishedAt || '2026-10-28',
      isCmsArticle: true
    };
  });

  // Map product-specific reviews
  const formattedProductReviews = products.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.blogTitle || `${p.name} In-Depth Laboratory Review`,
    subtitle: `${p.brand} • ${p.merchant}`,
    excerpt: p.blogSummary || p.description,
    coverImage: p.frontImage || p.image,
    category: p.mainCategory || p.category.toLowerCase(),
    format: 'review',
    author: p.author || 'Dr. Elena Vance, PhD',
    authorTitle: 'Senior Cosmetic Chemist',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    readTime: p.readTime || '6 min read',
    rating: p.rating || 4.85,
    date: p.lastVerifiedDate || '2026-10-30',
    isCmsArticle: false
  }));

  // Merged editorial collection
  const allEditorial = [...formattedCmsArticles, ...formattedProductReviews];

  // Filtering
  const filtered = allEditorial.filter((item) => {
    const targetCat = selectedCategory.toLowerCase().replace(/\s+/g, '-');
    const matchesCat = selectedCategory === 'All' || 
      item.category.toLowerCase() === targetCat ||
      item.category.toLowerCase().includes(targetCat);

    const matchesFormat = selectedFormat === 'All' || item.format === selectedFormat;

    const matchesSearch = !searchTerm ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.author.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCat && matchesFormat && matchesSearch;
  });

  const leadStory = formattedCmsArticles[0] || allEditorial[0];

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#1A1A1A] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="mb-8 border-b border-[#EFE8DA] pb-6">
          <div className="flex items-center gap-2 text-xs text-[#8A847F] mb-3">
            <button onClick={() => navigateTo('/')} className="hover:text-[#1A1A1A]">Home</button>
            <span>/</span>
            <span className="text-[#1A1A1A] font-semibold">Editorial Reviews &amp; CMS Hub</span>
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
                Every formula evaluated by board-certified dermal specialists, cosmetic chemists, and trichologists. Explore {allEditorial.length} forensic reviews and guides below.
              </p>
            </div>

            <div className="text-xs text-[#8A847F] font-mono">
              Archive: <span className="font-bold text-[#1A1A1A]">{filtered.length}</span> Published Stories
            </div>
          </div>
        </div>

        {/* Lead Story Feature (when not actively searching) */}
        {!searchTerm && selectedCategory === 'All' && selectedFormat === 'All' && leadStory && (
          <div 
            onClick={() => navigateTo(`/blog/${leadStory.slug}`)}
            className="group cursor-pointer bg-[#FFFFFF] rounded-3xl border border-[#EFE8DA] hover:border-[#D4C3A3] shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden mb-12 grid grid-cols-1 lg:grid-cols-12"
          >
            <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto overflow-hidden bg-[#FAF8F5]">
              <img
                src={leadStory.coverImage}
                alt={leadStory.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3 py-1 rounded-full bg-[#1A1A1A] text-white text-xs font-serif font-bold">
                  Lead Story • Clinical Roundup
                </span>
                <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[#8A7147] text-xs font-bold uppercase tracking-wider font-mono">
                  {leadStory.category}
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-[#8A847F]">
                  <span className="font-bold text-[#A4895C] uppercase tracking-wider font-mono">
                    Verified Laboratory Audit
                  </span>
                  <div className="flex items-center gap-1 text-[#A4895C]">
                    <Star className="w-3.5 h-3.5 fill-[#D4C3A3] text-[#A4895C]" />
                    <span className="font-bold text-[#1A1A1A]">{leadStory.rating}</span>
                  </div>
                </div>

                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1A1A1A] leading-snug group-hover:text-[#8A7147] transition-colors">
                  {leadStory.title}
                </h2>

                <p className="text-xs sm:text-sm text-[#5A5552] leading-relaxed font-light line-clamp-3">
                  {leadStory.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-[#F5EFE6]">
                <div className="flex items-center justify-between text-xs text-[#8A847F] mb-3">
                  <div className="flex items-center gap-2">
                    <img
                      src={leadStory.authorAvatar}
                      alt={leadStory.author}
                      className="w-6 h-6 rounded-full object-cover border border-[#D4C3A3]"
                    />
                    <span className="font-medium text-[#1A1A1A]">{leadStory.author}</span>
                  </div>
                  <span className="flex items-center gap-1 font-mono text-[11px]">
                    <Clock className="w-3.5 h-3.5" />
                    {leadStory.readTime}
                  </span>
                </div>

                <div className="inline-flex items-center gap-2 text-xs font-bold text-[#1A1A1A] group-hover:text-[#A4895C] transition-colors">
                  <span>Read Complete Investigation &amp; Product Breakdown</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filter and Format Controls */}
        <div className="bg-[#FFFFFF] p-4 sm:p-5 rounded-2xl border border-[#EFE8DA] shadow-xs mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            
            {/* Search */}
            <div className="relative flex-1 w-full">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search reviews by active ingredient, topic, or author..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#EFE8DA] text-xs sm:text-sm text-[#1A1A1A] placeholder-[#8A847F] focus:outline-none focus:border-[#A4895C]"
              />
              <Search className="w-4 h-4 text-[#8A847F] absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>

            {/* Format Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto pb-1 lg:pb-0 scrollbar-none">
              <span className="text-xs font-semibold text-[#8A847F] mr-1 hidden sm:inline">Format:</span>
              {[
                { id: 'All', label: 'All Stories' },
                { id: 'roundup', label: 'Best Roundups' },
                { id: 'comparison', label: 'Comparisons' },
                { id: 'guide', label: 'How-To Guides' },
                { id: 'review', label: 'Single Reviews' }
              ].map((fmt) => (
                <button
                  key={fmt.id}
                  onClick={() => setSelectedFormat(fmt.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedFormat === fmt.id
                      ? 'bg-[#1A1A1A] text-white shadow-xs'
                      : 'bg-[#FAF8F5] text-[#5A5552] hover:text-[#1A1A1A] border border-[#EFE8DA]'
                  }`}
                >
                  {fmt.label}
                </button>
              ))}
            </div>

          </div>

          {/* Department Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-3 border-t border-[#F5EFE6] scrollbar-none">
            <span className="text-xs font-semibold text-[#8A847F] mr-1 hidden sm:inline">Department:</span>
            {['All', ...mainCategories.map((c) => c.name)].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#A4895C] text-white shadow-xs'
                    : 'bg-[#FAF8F5] text-[#5A5552] hover:text-[#1A1A1A] border border-[#EFE8DA]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => navigateTo(`/blog/${item.slug}`)}
              className="group cursor-pointer bg-[#FFFFFF] rounded-2xl border border-[#EFE8DA] hover:border-[#D4C3A3] shadow-xs hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 sm:h-52 overflow-hidden bg-[#FAF8F5]">
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#1A1A1A]/90 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider font-mono">
                      {item.format}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-xs text-[#8A7147] text-[10px] font-bold uppercase tracking-wider capitalize font-mono">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="p-5 sm:p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#8A847F]">
                    <div className="flex items-center gap-1.5">
                      <img
                        src={item.authorAvatar}
                        alt={item.author}
                        className="w-5 h-5 rounded-full object-cover border border-[#EFE8DA]"
                      />
                      <span className="font-semibold text-[#1A1A1A]">{item.author}</span>
                    </div>
                    <span className="font-mono text-[10px]">{item.readTime}</span>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-[#1A1A1A] group-hover:text-[#A4895C] transition-colors leading-snug line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#5A5552] font-light leading-relaxed line-clamp-3">
                    {item.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-5 sm:p-6 pt-0 border-t border-[#F5EFE6] mt-4 flex items-center justify-between text-xs">
                <span className="font-mono text-[10px] text-[#8A847F] pt-3">
                  Published: {item.date}
                </span>
                <span className="inline-flex items-center gap-1 font-bold text-[#1A1A1A] group-hover:text-[#A4895C] transition-colors pt-3">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
