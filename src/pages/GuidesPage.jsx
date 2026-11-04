import React from 'react';
import { BookOpen, Clock, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import BestSellingGuides from '../components/BestSellingGuides';

export default function GuidesPage({ navigateTo }) {
  const editorialGuides = [
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
    },
    {
      id: "guide-korean-cushions",
      tag: "Cosmetic Formulation",
      title: "The Science of High-Adhesion Cushion Foundations: 24-Hour Transfer Resistance",
      readTime: "6 min read",
      author: "Camilla Rossi",
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
      excerpt: "How Magnefit powder technology and breathable polymers eliminate mask-friction transfer while providing weightless, natural second-skin coverage.",
      targetSlug: "hera-black-cushion-foundation-duo-set-review"
    },
    {
      id: "guide-pure-tallow",
      tag: "Ancestral Lipids",
      title: "Grass-Fed Beef Tallow vs. Petroleum Jelly: Which Truly Heals Severe Dermal Xerosis?",
      readTime: "7 min read",
      author: "Elena Vance",
      image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=800&q=80",
      excerpt: "Comparing non-comedogenic biological sebum equivalence with mineral-oil based occlusives for treating chronic dry skin and winter cracked barriers.",
      targetSlug: "pure-beef-tallow-raw-honey-solid-moisturizing-balm-review"
    },
    {
      id: "guide-korean-spf",
      tag: "Sun Protection",
      title: "Next-Gen Chemical UV Filters: Why Korea's SPF50+ Sunscreens Outperform Western Formulas",
      readTime: "5 min read",
      author: "Dr. Sarah Lin",
      image: "https://images.unsplash.com/photo-1556228722-d0b5de70b774?auto=format&fit=crop&w=800&q=80",
      excerpt: "Evaluating photostable Tinosorb and Uvinul molecules, PM2.5 particulate anti-pollution shields, and delicate rosy tone-up calamine finishes.",
      targetSlug: "iope-uv-shield-tone-up-sun-spf50-pa-four-plus-review"
    }
  ];

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#1A1A1A] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#8A847F] mb-6">
          <button onClick={() => navigateTo('/')} className="hover:text-[#1A1A1A]">Home</button>
          <span>/</span>
          <span className="text-[#1A1A1A] font-semibold">Editorial Guides</span>
        </nav>

        {/* Header */}
        <header className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#D4C3A3] text-xs font-semibold uppercase tracking-wider text-[#8A7147] mb-3">
            <BookOpen className="w-3.5 h-3.5 text-[#A4895C]" />
            <span>Forensic Buyer Guides</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-black text-[#1A1A1A]">
            Beauty &amp; Dermal Science Guides
          </h1>
          <p className="mt-2 text-sm text-[#5A5552] font-light leading-relaxed">
            In-depth forensic explainers on active cosmetic chemistry, lipid barrier restoration, and how to make smarter beauty choices.
          </p>
        </header>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {editorialGuides.map((guide) => (
            <article
              key={guide.id}
              onClick={() => navigateTo(`/blog/${guide.targetSlug}`)}
              className="group cursor-pointer bg-[#FFFFFF] rounded-3xl border border-[#EFE8DA] overflow-hidden shadow-xs hover:shadow-xl hover:border-[#D4C3A3] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-56 w-full overflow-hidden bg-[#FAF8F5]">
                  <img
                    src={guide.image}
                    alt={guide.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-xs text-[10px] font-bold text-[#B85D6A] uppercase tracking-wider shadow-xs">
                      {guide.tag}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#8A847F]">
                    <span>{guide.author}</span>
                    <span className="flex items-center gap-1 font-mono">
                      <Clock className="w-3.5 h-3.5" />
                      {guide.readTime}
                    </span>
                  </div>

                  <h2 className="text-lg font-serif font-bold text-[#1A1A1A] leading-snug group-hover:text-[#8A7147] transition-colors">
                    {guide.title}
                  </h2>

                  <p className="text-xs text-[#5A5552] leading-relaxed line-clamp-3 font-light">
                    {guide.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <div className="pt-3 border-t border-[#F5EFE6] flex items-center justify-between text-xs font-bold text-[#1A1A1A] group-hover:text-[#B85D6A] transition-colors">
                  <span>Read Full Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
}

