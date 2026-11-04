import React from 'react';
import { BookOpen, ArrowRight, ShieldCheck, Clock, User } from 'lucide-react';

export default function BestSellingGuides({ navigateTo }) {
  const guides = [
    {
      id: "guide-micro-spicule",
      tag: "Dermatological Tech",
      title: "The 2026 Micro-Spicule Exfoliation Handbook: Why Bio-Microneedles Beat Chemical Peels",
      readTime: "7 min read",
      author: "Dr. Sarah Lin",
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
      excerpt: "Marine sponge spicules bypass surface acid damage by channeling directly into epidermal junctions. We break down the clinical physics, prickling sensation, and pore-minimizing results.",
      targetSlug: "rael-microcrystal-activated-pm-serum-2000-review"
    },
    {
      id: "guide-barrier-rebuilding",
      tag: "Cutaneous Recovery",
      title: "The Dermal Lipid Blueprint: Rebuilding a Stripped Moisture Barrier in 14 Days",
      readTime: "6 min read",
      author: "Elena Vance",
      image: "https://images.unsplash.com/photo-1608248597359-001097e8832a?auto=format&fit=crop&w=800&q=80",
      excerpt: "How the 3:1:1 physiological ratio of ceramides, cholesterol, and free fatty acids halts transepidermal water loss (TEWL) and calms persistent facial erythema.",
      targetSlug: "beauty-formulas-ceramides-restorative-serum-review"
    },
    {
      id: "guide-french-melon-sod",
      tag: "Cellular Longevity",
      title: "French Melon Superoxide Dismutase (SOD): The Antioxidant Longevity Phenomenon",
      readTime: "8 min read",
      author: "Camilla Rossi",
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
      excerpt: "Why the rare cantaloupe melons of Provence resist decay 4x longer than standard fruit—and how their enzyme complexes stimulate dermal fibroblast collagen synthesis.",
      targetSlug: "meaningful-beauty-youth-activating-melon-serum-duo-review"
    }
  ];

  return (
    <section className="py-16 bg-[#FAF8F5] border-b border-[#EFE8DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#D4C3A3] text-xs font-semibold uppercase tracking-wider text-[#8A7147] mb-3">
              <BookOpen className="w-3.5 h-3.5 text-[#A4895C]" />
              <span>Editorial Forensics</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1A1A1A]">
              Best-Selling Product Guides
            </h2>
            <p className="mt-2 text-sm text-[#5A5552] max-w-xl font-light">
              Deep clinical investigative breakdowns into the active biochemical mechanisms behind this year's most requested beauty innovations.
            </p>
          </div>

          <button
            onClick={() => navigateTo && navigateTo('/blog')}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#8A7147] hover:text-[#1A1A1A] transition-colors self-start md:self-auto"
          >
            <span>Explore All Editorial Articles</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {guides.map((guide) => (
            <article
              key={guide.id}
              onClick={() => navigateTo && navigateTo(`/blog/${guide.targetSlug}`)}
              className="group cursor-pointer bg-[#FFFFFF] rounded-2xl border border-[#EFE8DA] overflow-hidden shadow-xs hover:shadow-xl hover:border-[#D4C3A3] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-52 w-full overflow-hidden bg-[#FAF8F5]">
                  <img
                    src={guide.image}
                    alt={guide.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-xs text-[10px] font-bold text-[#B85D6A] uppercase tracking-wider shadow-xs">
                      {guide.tag}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#8A847F]">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{guide.readTime}</span>
                    </div>
                    <span>{guide.author}</span>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-[#1A1A1A] leading-snug group-hover:text-[#8A7147] transition-colors">
                    {guide.title}
                  </h3>

                  <p className="text-xs text-[#5A5552] leading-relaxed line-clamp-3 font-light">
                    {guide.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <div className="pt-3 border-t border-[#F5EFE6] flex items-center justify-between text-xs font-bold text-[#1A1A1A] group-hover:text-[#B85D6A] transition-colors">
                  <span>Read Full Investigation</span>
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

