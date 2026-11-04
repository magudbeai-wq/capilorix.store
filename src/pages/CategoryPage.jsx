import React, { useState } from 'react';
import { mainCategories } from '../data/categories';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { 
  Sparkles, 
  Search, 
  Filter, 
  ArrowUpDown, 
  ShoppingBag, 
  ChevronRight, 
  HelpCircle,
  Award,
  CheckCircle2,
  BookOpen
} from 'lucide-react';

export default function CategoryPage({ categorySlug, navigateTo, subCategoryParam = 'All' }) {
  const category = mainCategories.find((c) => c.slug === categorySlug) || mainCategories[0];
  const [selectedSubCategory, setSelectedSubCategory] = useState(subCategoryParam);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  // Filter products for this category
  const categoryProducts = products.filter((p) => {
    const inMain = p.mainCategory === category.slug;
    const inSecondary = p.secondaryCategories && p.secondaryCategories.includes(category.slug);
    const matchesCategory = inMain || inSecondary;

    const matchesSub = selectedSubCategory === 'All' || 
      p.subCategory === selectedSubCategory ||
      (p.features && p.features.some(f => f.toLowerCase().includes(selectedSubCategory.toLowerCase()))) ||
      p.name.toLowerCase().includes(selectedSubCategory.toLowerCase());

    const matchesSearch = !searchTerm || 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.keyIngredients && p.keyIngredients.some(k => k.toLowerCase().includes(searchTerm.toLowerCase())));

    return matchesCategory && matchesSub && matchesSearch;
  });

  // Sort
  const sortedProducts = [...categoryProducts].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return 0; // featured maintains curated ranking
  });

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#1A1A1A] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#8A847F] mb-6">
          <button onClick={() => navigateTo('/')} className="hover:text-[#1A1A1A] transition-colors">
            Home
          </button>
          <span>/</span>
          <button onClick={() => navigateTo('/products')} className="hover:text-[#1A1A1A] transition-colors">
            Departments
          </button>
          <span>/</span>
          <span className="text-[#1A1A1A] font-semibold">{category.name}</span>
          {selectedSubCategory !== 'All' && (
            <>
              <span>/</span>
              <span className="text-[#A4895C] font-semibold">{selectedSubCategory}</span>
            </>
          )}
        </nav>

        {/* Category Hero Banner Spread */}
        <header className="relative rounded-3xl bg-[#FFFFFF] border border-[#EFE8DA] p-6 sm:p-10 lg:p-12 shadow-xs mb-10 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#D4C3A3] text-xs font-semibold uppercase tracking-wider text-[#8A7147]">
                <Award className="w-3.5 h-3.5 text-[#A4895C]" />
                <span>Capilorix Department Benchmark</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-serif font-black text-[#1A1A1A] tracking-tight">
                {category.name}
              </h1>

              <p className="text-base sm:text-lg text-[#8A7147] font-serif italic">
                {category.headline}
              </p>

              <p className="text-xs sm:text-sm text-[#5A5552] max-w-2xl font-light leading-relaxed">
                {category.description}
              </p>

              {/* Department Statistics */}
              <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-[#8A847F]">
                <div>
                  <span className="font-serif font-bold text-lg text-[#1A1A1A] block">
                    {categoryProducts.length}
                  </span>
                  <span className="uppercase text-[10px] tracking-wider">Benchmarked Formulas</span>
                </div>
                <div className="w-[1px] h-8 bg-[#EFE8DA] hidden sm:block" />
                <div>
                  <span className="font-serif font-bold text-lg text-[#3D7055] block">
                    100%
                  </span>
                  <span className="uppercase text-[10px] tracking-wider">Independent Audits</span>
                </div>
                <div className="w-[1px] h-8 bg-[#EFE8DA] hidden sm:block" />
                <div>
                  <span className="font-serif font-bold text-lg text-[#1A1A1A] block">
                    Verified
                  </span>
                  <span className="uppercase text-[10px] tracking-wider">Direct Merchant Pricing</span>
                </div>
              </div>
            </div>

            {/* Category Visual Artwork */}
            <div className="lg:col-span-4 relative rounded-2xl overflow-hidden aspect-video sm:aspect-square lg:aspect-4/3 bg-[#FAF8F5] border border-[#EFE8DA] shadow-inner">
              <img
                src={category.image}
                alt={`${category.name} Luxury Formulations`}
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 text-white text-xs font-mono">
                {category.subcategories.length} Specialized Sub-Categories
              </div>
            </div>
          </div>
        </header>

        {/* Subcategories Filter Pills Bar */}
        <div className="bg-[#FFFFFF] p-4 sm:p-5 rounded-2xl border border-[#EFE8DA] shadow-xs mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Search within category */}
            <div className="relative flex-1">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={`Search ${category.name} formulas, actives, or brands...`}
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

          {/* Subcategory Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-[#F5EFE6] scrollbar-none">
            <button
              onClick={() => setSelectedSubCategory('All')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedSubCategory === 'All'
                  ? 'bg-[#1A1A1A] text-white shadow-xs'
                  : 'bg-[#FAF8F5] text-[#5A5552] hover:text-[#1A1A1A] hover:bg-[#F2ECE4] border border-[#EFE8DA]'
              }`}
            >
              All {category.name}
            </button>
            {category.subcategories.map((sub) => (
              <button
                key={sub}
                onClick={() => setSelectedSubCategory(sub)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedSubCategory === sub
                    ? 'bg-[#1A1A1A] text-white shadow-xs'
                    : 'bg-[#FAF8F5] text-[#5A5552] hover:text-[#1A1A1A] hover:bg-[#F2ECE4] border border-[#EFE8DA]'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Stack */}
        {sortedProducts.length > 0 ? (
          <div className="space-y-8 mb-16">
            {sortedProducts.map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                rank={idx + 1}
                navigateTo={navigateTo}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#FFFFFF] rounded-2xl border border-dashed border-[#EFE8DA] p-8 mb-16">
            <h3 className="text-xl font-serif font-bold text-[#1A1A1A] mb-2">No Matching Formulas</h3>
            <p className="text-xs text-[#8A847F] mb-4">
              We couldn't find any products in {category.name} matching your filter "{selectedSubCategory}".
            </p>
            <button
              onClick={() => {
                setSelectedSubCategory('All');
                setSearchTerm('');
              }}
              className="px-5 py-2.5 rounded-xl bg-[#1A1A1A] text-white text-xs font-semibold"
            >
              Reset {category.name} Filter
            </button>
          </div>
        )}

        {/* Category SEO Editorial Guide & FAQs Section */}
        {category.faqs && category.faqs.length > 0 && (
          <section className="bg-[#FFFFFF] rounded-3xl border border-[#EFE8DA] p-6 sm:p-10 shadow-xs space-y-6">
            <div className="flex items-center gap-2 text-xs font-bold text-[#8A7147] uppercase tracking-wider font-mono">
              <HelpCircle className="w-4 h-4 text-[#A4895C]" />
              <span>Dermatological Guidance &amp; FAQ</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1A1A1A]">
              Frequently Asked Questions About {category.name}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {category.faqs.map((faq, i) => (
                <div key={i} className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#EFE8DA] space-y-2">
                  <h3 className="text-sm font-serif font-bold text-[#1A1A1A] flex items-start gap-2">
                    <span className="text-[#A4895C] font-mono">Q:</span>
                    <span>{faq.q}</span>
                  </h3>
                  <p className="text-xs text-[#5A5552] leading-relaxed font-light pl-5">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[#F5EFE6] flex flex-wrap items-center justify-between gap-4 text-xs text-[#8A847F]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#3D7055]" />
                <span>Audited against peer-reviewed clinical research and FTC 16 CFR § 255.</span>
              </div>
              <button
                onClick={() => navigateTo('/editorial-policy')}
                className="text-[#8A7147] hover:text-[#1A1A1A] font-semibold underline underline-offset-4"
              >
                Read Our Full Editorial Policy &rarr;
              </button>
            </div>
          </section>
        )}

      </div>
    </div>
  );
}

