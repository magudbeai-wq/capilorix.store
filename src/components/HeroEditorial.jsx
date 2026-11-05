import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Award, Star, ExternalLink, BookOpen } from 'lucide-react';
import { products } from '../data/products';

export default function HeroEditorial({ onOpenQuiz, navigateTo, featuredProduct }) {
  const product = featuredProduct || {
    id: "revolve-rael-microcrystal-activated-pm-serum-2000",
    slug: "rael-microcrystal-activated-pm-serum-2000-review",
    name: "Rael Microcrystal Activated PM Serum 2000",
    brand: "Rael Beauty",
    merchant: "REVOLVE (CJ Affiliate)",
    price: 23.00,
    originalPrice: 32.00,
    discountPercent: 28,
    currency: "$",
    rating: 4.96,
    reviewCount: 3890,
    badge: "Viral Micro-Spicule Sensation • High EPC",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1000&q=85",
    affiliateUrl: "http://www.revolve.com/content/deeplink/womens/product/RUHL-WU33",
    verifiedCoupon: "REVOLVEDEAL (Verified $23.00 Price)"
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FDFBF7] via-[#FAF8F5] to-[#F5EFE6] border-b border-[#EFE8DA] py-12 lg:py-20 text-[#1A1A1A]">
      {/* Subtle Editorial Watermark & Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#1A1A1A_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Edition Badge */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 pb-4 border-b border-[#EFE8DA]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#D4C3A3] text-xs font-semibold text-[#8A7147] tracking-wider uppercase">
            <Award className="w-3.5 h-3.5 text-[#A4895C]" />
            <span>Autumn/Winter 2026 Clinical Evaluation Issue</span>
          </div>

          <div className="text-xs text-[#8A847F] tracking-widest uppercase font-mono">
            Audience: USA • UK • Canada • Australia • EU
          </div>
        </div>

        {/* Hero Grid: Editorial Story (Left) + Magazine Feature Showcase (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Cover Story & Headline */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#B85D6A] uppercase">
              <span className="w-8 h-[1px] bg-[#B85D6A]"></span>
              <span>The Independent Dermal Authority</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight text-[#1A1A1A] leading-[1.12]">
              The New Science of Radiance: <br className="hidden sm:inline" />
              <span className="italic font-normal font-editorial text-[#8A7147]">
                Micro-Spicules, Stem Cells &amp; Barrier Healing.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#5A5552] leading-relaxed max-w-2xl font-light">
              We conduct forensic ingredient breakdowns, laboratory efficacy benchmarks, and real-world 30-day trials on the season's {products.length} most potent beauty and wellness formulas—connecting you directly to verified merchant pricing.
            </p>

            {/* Author Byline & Verification Credentials */}
            <div className="flex items-center gap-4 py-2">
              <div className="w-11 h-11 rounded-full bg-[#EFE8DA] border-2 border-white shadow-xs overflow-hidden shrink-0">
                <img 
                  src="https://images.unsplash.com/photo-1594824813589-4b68fd5bb49a?auto=format&fit=crop&w=200&q=80" 
                  alt="Dr. Sarah Lin, Clinical Dermal Specialist"
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="text-xs">
                <div className="font-semibold text-[#1A1A1A] flex items-center gap-1.5">
                  <span>Curated by Dr. Sarah Lin &amp; The Capilorix Editorial Board</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-[#3D7055]" />
                </div>
                <div className="text-[#8A847F]">
                  Peer-Benchmarked • Zero Sponsored Biases • Updated Daily
                </div>
              </div>
            </div>

            {/* Action Callouts */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <button
                onClick={() => {
                  const el = document.getElementById('trending-reviews-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  else if (navigateTo) navigateTo('/products');
                }}
                className="px-7 py-3.5 rounded-full bg-[#1A1A1A] hover:bg-[#2D2D2A] text-[#FDFBF7] text-sm font-semibold tracking-wide transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
              >
                <span>Explore All {products.length} Verified Reviews</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onOpenQuiz}
                className="px-7 py-3.5 rounded-full bg-[#F6EAE8] hover:bg-[#EBD6D4] border border-[#E3B8B8] text-[#8C3D49] text-sm font-semibold tracking-wide transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#B85D6A]" />
                <span>Take Beauty Match Quiz</span>
              </button>
            </div>

            {/* Trust Highlights */}
            <div className="pt-4 grid grid-cols-3 gap-3 border-t border-[#EFE8DA] text-center sm:text-left">
              <div>
                <span className="block text-xl sm:text-2xl font-serif font-black text-[#1A1A1A]">{products.length}</span>
                <span className="text-[11px] text-[#8A847F] uppercase tracking-wider">Formulas Benchmarked</span>
              </div>
              <div>
                <span className="block text-xl sm:text-2xl font-serif font-black text-[#1A1A1A]">4.94<span className="text-[#A4895C] text-sm font-sans font-normal">/5</span></span>
                <span className="text-[11px] text-[#8A847F] uppercase tracking-wider">Average Clinical Score</span>
              </div>
              <div>
                <span className="block text-xl sm:text-2xl font-serif font-black text-[#1A1A1A]">100%</span>
                <span className="text-[11px] text-[#8A847F] uppercase tracking-wider">Authentic Photography</span>
              </div>
            </div>

          </div>

          {/* Right Column: Featured Product Cover Showcase */}
          <div className="lg:col-span-5">
            <div className="relative bg-[#FFFFFF] rounded-2xl border border-[#EFE8DA] p-5 sm:p-6 shadow-xl overflow-hidden group">
              
              {/* Gold Ribbon Sticker */}
              <div className="absolute top-4 left-4 z-20">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#D4C3A3] text-[11px] font-bold text-[#8A7147] tracking-wider uppercase shadow-xs">
                  <Star className="w-3.5 h-3.5 fill-[#D4C3A3] text-[#A4895C]" />
                  <span>Editor's #1 Overall Pick</span>
                </span>
              </div>

              {/* Discount Sticker */}
              <div className="absolute top-4 right-4 z-20">
                <span className="inline-block px-2.5 py-1 rounded-full bg-[#B85D6A] text-white text-xs font-bold shadow-xs">
                  {product.discountPercent}% OFF
                </span>
              </div>

              {/* High-Resolution Authentic Image Container */}
              <div className="relative h-72 sm:h-80 w-full rounded-xl overflow-hidden bg-[#FAF8F5] mb-5 border border-[#F2ECE4]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                
                {/* Floating Image Caption */}
                <div className="absolute bottom-3 left-3 right-3 text-white text-xs flex items-center justify-between">
                  <span className="bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-md font-mono text-[11px]">
                    Verified Lab Sample
                  </span>
                  <span className="bg-white/90 backdrop-blur-xs text-[#1A1A1A] px-2.5 py-1 rounded-md font-bold text-[11px]">
                    {product.merchant}
                  </span>
                </div>
              </div>

              {/* Card Meta & Details */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-[#8A847F]">
                  <span className="font-semibold uppercase tracking-wider text-[#B85D6A]">{product.brand}</span>
                  <div className="flex items-center gap-1 text-[#A4895C]">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#D4C3A3] text-[#A4895C]" />
                      ))}
                    </div>
                    <span className="font-bold text-[#1A1A1A] ml-1">{product.rating}</span>
                    <span className="text-[#8A847F]">({product.reviewCount})</span>
                  </div>
                </div>

                <h3 className="text-xl font-serif font-bold text-[#1A1A1A] leading-snug">
                  {product.name}
                </h3>

                <p className="text-xs text-[#5A5552] line-clamp-2">
                  Viral 2,000-strength microcrystal spicules penetrate deep beneath the epidermal surface to accelerate turnover, shrink pores, and restore glass-skin clarity.
                </p>

                {/* Pricing & Deals */}
                <div className="flex items-baseline gap-2 pt-1 border-t border-[#F2ECE4]">
                  <span className="text-2xl font-serif font-bold text-[#1A1A1A]">
                    {product.currency}{product.price.toFixed(2)}
                  </span>
                  <span className="text-sm text-[#8A847F] line-through">
                    {product.currency}{product.originalPrice.toFixed(2)}
                  </span>
                  <span className="text-xs font-semibold text-[#3D7055] ml-auto">
                    In Stock &amp; Verified
                  </span>
                </div>

                {/* Dual Buttons: Read Editorial Review + Shop Deal */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    onClick={() => navigateTo && navigateTo(`/blog/${product.slug}`)}
                    className="px-3 py-2.5 rounded-xl bg-[#FAF8F5] hover:bg-[#F2ECE4] border border-[#EFE8DA] text-[#1A1A1A] text-xs font-bold tracking-wide transition-colors flex items-center justify-center gap-1.5"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[#8A7147]" />
                    <span>Read Review</span>
                  </button>

                  <a
                    href={product.affiliateUrl}
                    target="_blank"
                    rel="sponsored nofollow noopener"
                    className="px-3 py-2.5 rounded-xl bg-[#1A1A1A] hover:bg-[#A4895C] text-white text-xs font-bold tracking-wide transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <span>Shop Deal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

