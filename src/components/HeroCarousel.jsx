import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, ShieldCheck, Tag } from 'lucide-react';

export default function HeroCarousel({ onOpenQuiz }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      badge: "Clinical Hair Restoration",
      tagline: "FDA-Cleared Laser Tech",
      title: "Activate Natural Follicle Regrowth",
      subtitle: "Medical-grade 650nm photobiomodulation clinically proven to increase hair density by 37% without prescriptions.",
      ctaText: "Explore Laser Caps",
      ctaLink: "#picks-section",
      dealBadge: "Verified $100 OFF",
      modelImg: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80",
      productImg: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=600&q=80",
      bgGradient: "from-amber-950/40 via-[#121624] to-[#0b0d13]"
    },
    {
      id: 2,
      badge: "Glueless 100% Human Hair",
      tagline: "Zero Adhesive • 3-Sec Install",
      title: "Instant Volume & Undetectable Lace",
      subtitle: "Pre-cut 9x6 HD lace and breathable 3D caps protect your native edges while delivering salon-grade volume.",
      ctaText: "View #1 Glueless Wigs",
      ctaLink: "#picks-section",
      dealBadge: "34% OFF Flash Sale",
      modelImg: "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=1200&q=80",
      productImg: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=600&q=80",
      bgGradient: "from-purple-950/40 via-[#121624] to-[#0b0d13]"
    },
    {
      id: 3,
      badge: "Korean Bio-Tech Scalp Care",
      tagline: "Sulwhasoo & Laneige Curated",
      title: "Deep Dermal & Follicle Hydration",
      subtitle: "Restore your scalp's protective barrier and unclog micro-capillary roots with fermented Asian botanicals.",
      ctaText: "Discover K-Beauty Deals",
      ctaLink: "#picks-section",
      dealBadge: "Up to 63% Savings",
      modelImg: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1200&q=80",
      productImg: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80",
      bgGradient: "from-emerald-950/40 via-[#121624] to-[#0b0d13]"
    }
  ];

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const active = slides[currentSlide];

  return (
    <div className="relative w-full overflow-hidden bg-[#0a0c12] border-b border-slate-800">
      <div className={`relative min-h-[480px] sm:min-h-[520px] lg:min-h-[560px] bg-gradient-to-r ${active.bgGradient} transition-all duration-700 ease-in-out flex items-center`}>
        {/* Background Image with soft gradient blending like dm.de */}
        <div className="absolute inset-0 z-0">
          <img
            src={active.modelImg}
            alt={active.title}
            className="w-full h-full object-cover object-center lg:object-left opacity-35 lg:opacity-45 mix-blend-luminosity filter transition-opacity duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0d13] via-[#0b0d13]/80 to-transparent lg:w-3/5" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d13] via-transparent to-transparent" />
        </div>

        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Ad Hero Text */}
            <div className="lg:col-span-7 space-y-4 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{active.badge}</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-300 normal-case">{active.tagline}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
                {active.title}
              </h1>

              <p className="text-sm sm:text-base text-slate-300 max-w-xl font-light leading-relaxed">
                {active.subtitle}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={active.ctaLink}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/20 flex items-center gap-2 transition-all active:scale-95 group"
                >
                  <span>{active.ctaText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>

                <button
                  onClick={onOpenQuiz}
                  className="px-5 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white font-semibold text-sm border border-slate-700/80 transition-colors"
                >
                  Find My Match (Quiz)
                </button>

                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-bold">
                  <Tag className="w-3.5 h-3.5" />
                  <span>{active.dealBadge}</span>
                </div>
              </div>
            </div>

            {/* Right dm-Style Floating Ad Card */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-sm rounded-2xl bg-[#141724]/90 backdrop-blur-md border border-slate-700/80 p-5 shadow-2xl hover:border-amber-500/50 transition-all text-left group">
                <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-slate-950 mb-4 border border-slate-800">
                  <img
                    src={active.productImg}
                    alt={active.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-md bg-amber-500 text-slate-950 font-extrabold text-[11px] shadow">
                    Featured Partner
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
                    Verified Commercial Offer
                  </span>
                  <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                    {active.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-snug line-clamp-2">
                    {active.subtitle}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Lab Tested</span>
                  </span>
                  <a
                    href="#picks-section"
                    className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 group-hover:underline"
                  >
                    <span>View Deal →</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Arrow Controls (dm.de style) */}
        <button
          onClick={prevSlide}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-slate-900/80 hover:bg-amber-500 hover:text-slate-950 text-white border border-slate-700/80 flex items-center justify-center backdrop-blur-md transition-all shadow-lg z-20"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-slate-900/80 hover:bg-amber-500 hover:text-slate-950 text-white border border-slate-700/80 flex items-center justify-center backdrop-blur-md transition-all shadow-lg z-20"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Slide Indicators / Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all ${
                currentSlide === idx ? 'w-8 bg-amber-400' : 'w-2 bg-slate-700 hover:bg-slate-500'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
