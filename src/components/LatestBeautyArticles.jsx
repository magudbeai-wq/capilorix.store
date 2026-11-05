import React from 'react';
import { BookOpen, ArrowRight, Clock, User, Sparkles } from 'lucide-react';
import { products } from '../data/products';

export default function LatestBeautyArticles({ navigateTo }) {
  // Select 4 diverse products with rich review stories
  const featuredArticles = products.slice(0, 4);

  return (
    <section className="py-16 bg-[#FDFBF7] border-b border-[#EFE8DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#D4C3A3] text-xs font-semibold uppercase tracking-wider text-[#8A7147] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#A4895C]" />
              <span>The Beauty Dispatch</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1A1A1A]">
              Latest Editorial Reviews &amp; Articles
            </h2>
            <p className="mt-2 text-sm text-[#5A5552] max-w-xl font-light">
              Unbiased reviews written by clinical dermal specialists, cosmetic chemists, and trichology contributors.
            </p>
          </div>

          <button
            onClick={() => navigateTo && navigateTo('/blog')}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#8A7147] hover:text-[#1A1A1A] transition-colors self-start md:self-auto"
          >
            <span>View All Curated Reviews</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4-Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredArticles.map((item) => (
            <article
              key={item.id}
              onClick={() => navigateTo && navigateTo(`/blog/${item.slug}`)}
              className="group cursor-pointer bg-[#FFFFFF] rounded-2xl border border-[#EFE8DA] overflow-hidden shadow-xs hover:shadow-xl hover:border-[#D4C3A3] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-[#FAF8F5]">
                  <img
                    src={item.image}
                    alt={item.blogTitle || item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-xs text-[10px] font-bold text-[#8A7147] uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-2.5">
                  <div className="flex items-center justify-between text-[11px] text-[#8A847F]">
                    <span>{item.publishedDate}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {item.readTime}
                    </span>
                  </div>

                  <h3 className="text-base font-serif font-bold text-[#1A1A1A] leading-snug line-clamp-2 group-hover:text-[#B85D6A] transition-colors">
                    {item.blogTitle || item.name}
                  </h3>

                  <p className="text-xs text-[#5A5552] line-clamp-3 font-light leading-relaxed">
                    {item.blogSummary || item.verdict}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="pt-3 border-t border-[#F5EFE6] flex items-center justify-between text-xs font-bold text-[#1A1A1A] group-hover:text-[#B85D6A] transition-colors">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}

