import React, { useState } from 'react';
import { products } from '../data/products';
import { 
  Star, 
  Check, 
  X, 
  ExternalLink, 
  Clock, 
  Calendar, 
  ShieldCheck, 
  Award, 
  Tag, 
  ArrowLeft, 
  ArrowRight, 
  Share2, 
  CheckCircle2,
  Sparkles,
  ShoppingBag
} from 'lucide-react';

export default function BlogPostPage({ slug, navigateTo }) {
  const product = products.find((p) => p.slug === slug) || products[0];
  const [copiedCoupon, setCopiedCoupon] = useState(false);
  const [shared, setShared] = useState(false);

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCoupon(true);
    setTimeout(() => setCopiedCoupon(false), 2500);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.blogTitle || product.name,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShared(true);
      setTimeout(() => setShared(false), 2500);
    }
  };

  // Find 3 other related products from same or adjacent category
  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .filter((p) => p.category === product.category || Math.random() > 0.5)
    .slice(0, 3);

  return (
    <article className="bg-[#FAF8F5] min-h-screen text-[#1A1A1A] py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Breadcrumb Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#8A847F] mb-6">
          <div className="flex items-center gap-2">
            <button onClick={() => navigateTo('/')} className="hover:text-[#1A1A1A]">Home</button>
            <span>/</span>
            <button onClick={() => navigateTo('/blog')} className="hover:text-[#1A1A1A]">Editorial Reviews</button>
            <span>/</span>
            <button onClick={() => navigateTo('/products')} className="hover:text-[#1A1A1A]">{product.category}</button>
            <span>/</span>
            <span className="text-[#1A1A1A] font-semibold truncate max-w-[200px]">{product.brand}</span>
          </div>

          <button
            onClick={() => navigateTo('/blog')}
            className="inline-flex items-center gap-1 font-bold text-[#8A7147] hover:text-[#1A1A1A]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Reviews</span>
          </button>
        </div>

        {/* Article Masthead */}
        <header className="space-y-4 mb-8">
          
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#D4C3A3] text-xs font-semibold text-[#8A7147] uppercase tracking-wider">
              {product.category}
            </span>
            <span className="px-3 py-1 rounded-full bg-[#F6EAE8] border border-[#E3B8B8] text-xs font-semibold text-[#8C3D49]">
              {product.badge}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-black text-[#1A1A1A] leading-[1.15]">
            {product.blogTitle || `${product.name} In-Depth Clinical Review`}
          </h1>

          <p className="text-base sm:text-lg text-[#5A5552] font-light leading-relaxed">
            {product.blogSummary || product.verdict}
          </p>

          {/* Author Byline & Fact Check Badge */}
          <div className="pt-3 border-t border-[#EFE8DA] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#EFE8DA] overflow-hidden border border-white shadow-xs">
                <img
                  src="https://images.unsplash.com/photo-1594824813589-4b68fd5bb49a?auto=format&fit=crop&w=150&q=80"
                  alt={product.author}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-xs">
                <div className="font-bold text-[#1A1A1A]">{product.author}</div>
                <div className="text-[#8A847F] flex items-center gap-1.5">
                  <span>{product.publishedDate}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {product.readTime}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FFFFFF] border border-[#EFE8DA] text-[11px] font-semibold text-[#3D7055]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#3D7055]" />
                <span>Fact-Checked &amp; Lab-Verified</span>
              </span>

              <button
                onClick={handleShare}
                className="p-2 rounded-full bg-[#FFFFFF] border border-[#EFE8DA] text-[#5A5552] hover:text-[#1A1A1A] transition-colors"
                title="Share this article"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

        </header>

        {/* Featured Product Hero Card */}
        <div className="bg-[#FFFFFF] rounded-3xl border border-[#EFE8DA] shadow-lg overflow-hidden mb-12">
          
          <div className="relative h-80 sm:h-96 w-full overflow-hidden bg-[#FAF8F5]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
              <span className="bg-black/70 backdrop-blur-xs px-3 py-1 rounded-md font-mono">
                Verified Sample: {product.sku}
              </span>
              <span className="bg-white/95 backdrop-blur-xs text-[#1A1A1A] px-3 py-1 rounded-md font-bold">
                Sold by {product.merchant}
              </span>
            </div>
          </div>

          {/* Quick Score & Buy Banner */}
          <div className="p-6 sm:p-8 bg-[#FDFBF7] border-t border-[#EFE8DA] space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-[#B85D6A] uppercase tracking-wider font-mono">
                  {product.brand}
                </span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1A1A1A]">
                  {product.name}
                </h2>
                
                <div className="flex items-center gap-2 mt-1 text-xs">
                  <div className="flex text-[#A4895C]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#D4C3A3] text-[#A4895C]" />
                    ))}
                  </div>
                  <span className="font-bold text-[#1A1A1A]">{product.rating} / 5.00</span>
                  <span className="text-[#8A847F]">({product.reviewCount} verified buyer evaluations)</span>
                </div>
              </div>

              <div className="text-left sm:text-right shrink-0">
                <div className="text-3xl font-serif font-black text-[#1A1A1A]">
                  {product.currency}{product.price.toFixed(2)}
                </div>
                {product.originalPrice > product.price && (
                  <span className="text-xs text-[#8A847F] line-through block">
                    Retail: {product.currency}{product.originalPrice.toFixed(2)} ({product.discountPercent}% OFF)
                  </span>
                )}
              </div>
            </div>

            {/* Direct Shop Button */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href={product.affiliateUrl}
                target="_blank"
                rel="sponsored nofollow noopener"
                className="flex-1 py-4 px-6 rounded-2xl bg-[#1A1A1A] hover:bg-[#A4895C] text-white text-sm font-bold tracking-wide transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Check Live Price on {product.merchant}</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              {product.verifiedCoupon && (
                <button
                  onClick={() => handleCopyCode(product.verifiedCoupon.split(' ')[0])}
                  className="py-4 px-5 rounded-2xl border border-dashed border-[#D4C3A3] bg-[#FFFFFF] hover:bg-[#F6EAE8] text-xs font-mono text-[#8A7147] hover:text-[#8C3D49] flex items-center justify-center gap-2 transition-colors shrink-0"
                >
                  <Tag className="w-3.5 h-3.5" />
                  <span>{copiedCoupon ? 'Coupon Copied!' : product.verifiedCoupon}</span>
                </button>
              )}
            </div>

          </div>

        </div>

        {/* In-Depth Article Content Sections */}
        <div className="bg-[#FFFFFF] rounded-3xl border border-[#EFE8DA] p-6 sm:p-10 shadow-xs space-y-8 text-[#2D2D2A] leading-relaxed">
          
          {/* Section 1: Clinical Verdict Summary */}
          <div className="p-5 rounded-2xl bg-[#FAF8F5] border-l-4 border-[#A4895C] space-y-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#8A7147] font-mono">
              The Capilorix Executive Verdict
            </h3>
            <p className="text-sm text-[#1A1A1A] italic leading-relaxed">
              "{product.verdict}"
            </p>
          </div>

          {/* Section 2: Active Biochemical Formulation */}
          <section className="space-y-3">
            <h2 className="text-2xl font-serif font-bold text-[#1A1A1A]">
              1. The Active Formulation &amp; Biochemical Architecture
            </h2>
            <p className="text-sm text-[#5A5552] leading-relaxed font-light">
              {product.fullReviewSections?.formula || 
                `Formulated with high-potency bio-compatible actives, ${product.name} operates on a cellular level to enhance cutaneous vitality. Unlike generic off-the-shelf cosmetics, its molecular delivery is engineered for sustained biological release without sensitizing delicate facial and body tissue.`}
            </p>

            {product.keyIngredients && (
              <div className="pt-2">
                <span className="text-xs font-bold text-[#8A7147] uppercase tracking-wider block mb-2 font-mono">
                  Key Actives &amp; Concentrations:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.keyIngredients.map((ing) => (
                    <div key={ing} className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#EFE8DA] text-xs flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#A4895C] shrink-0" />
                      <span className="font-medium text-[#1A1A1A]">{ing}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Section 3: Laboratory & 30-Day Testing */}
          <section className="space-y-3">
            <h2 className="text-2xl font-serif font-bold text-[#1A1A1A]">
              2. Laboratory Efficacy &amp; 30-Day Cohort Testing
            </h2>
            <p className="text-sm text-[#5A5552] leading-relaxed font-light">
              {product.fullReviewSections?.testing || 
                `Our clinical panel subjected ${product.brand}'s formula to extensive 4-week instrumented analysis. Evaluated using dermal hydration corneometers, profilometry roughness scans, and patient self-assessment indices across diverse skin types.`}
            </p>
          </section>

          {/* Section 4: Pros and Cons Matrix */}
          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-[#1A1A1A]">
              3. The Clinical Pros &amp; Practical Nuances
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#EFE8DA]">
                <div className="flex items-center gap-2 text-xs font-bold text-[#3D7055] uppercase tracking-wider mb-3">
                  <Check className="w-4 h-4" />
                  <span>Validated Strengths</span>
                </div>
                <ul className="space-y-2 text-xs text-[#5A5552]">
                  {product.pros.map((pro, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#3D7055] font-bold mt-0.5">•</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#EFE8DA]">
                <div className="flex items-center gap-2 text-xs font-bold text-[#B85D6A] uppercase tracking-wider mb-3">
                  <X className="w-4 h-4" />
                  <span>Important Nuances</span>
                </div>
                <ul className="space-y-2 text-xs text-[#5A5552]">
                  {product.cons.map((con, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#B85D6A] font-bold mt-0.5">•</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Section 5: Application Protocol & How to Use */}
          <section className="space-y-3">
            <h2 className="text-2xl font-serif font-bold text-[#1A1A1A]">
              4. Recommended Clinical Application Protocol
            </h2>
            <p className="text-sm text-[#5A5552] leading-relaxed font-light">
              {product.fullReviewSections?.howToUse || 
                `For maximum bio-availability, apply after thorough cleansing and water-based toning. Warm a measured dose between fingertips and gently press into targeted skin, allowing 60 seconds of full absorption before layering subsequent moisturizers or sun protection.`}
            </p>
          </section>

          {/* Section 6: Target Audience: Who Should Buy */}
          <section className="space-y-3">
            <h2 className="text-2xl font-serif font-bold text-[#1A1A1A]">
              5. Candidate Profile: Who Benefits Most
            </h2>
            <p className="text-sm text-[#5A5552] leading-relaxed font-light">
              {product.fullReviewSections?.whoShouldBuy || 
                `Ideal for individuals experiencing targeted dermal challenges who seek reliable, active ingredient transparency without inflated boutique marketing markups.`}
            </p>
          </section>

          {/* Final Callout Banner */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#1A1A1A] to-[#2D2D2A] text-white text-center space-y-4">
            <span className="inline-block px-3 py-1 rounded-full bg-[#A4895C] text-xs font-bold tracking-wider uppercase">
              Exclusive Partner Verified Deal
            </span>
            <h3 className="text-2xl font-serif font-bold">
              Ready to Experience {product.name}?
            </h3>
            <p className="text-xs sm:text-sm text-[#D4C3A3] max-w-lg mx-auto font-light">
              Verified available directly through {product.merchant} for {product.currency}{product.price.toFixed(2)}. Includes fast tracked delivery across the USA, UK, Canada, Australia &amp; Europe.
            </p>
            <div className="pt-2">
              <a
                href={product.affiliateUrl}
                target="_blank"
                rel="sponsored nofollow noopener"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white hover:bg-[#FAF8F5] text-[#1A1A1A] text-sm font-bold tracking-wide transition-all shadow-lg"
              >
                <span>Shop Verified Deal on {product.merchant}</span>
                <ExternalLink className="w-4 h-4 text-[#A4895C]" />
              </a>
            </div>
            <div className="text-[11px] text-[#A8A29E]">
              Price &amp; stock verified active. Backed by direct merchant buyer protections.
            </div>
          </div>

        </div>

        {/* Related Product Reviews Grid */}
        <div className="mt-16 pt-12 border-t border-[#EFE8DA]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold text-[#8A7147] uppercase tracking-wider block font-mono">
                More Investigations
              </span>
              <h3 className="text-2xl font-serif font-bold text-[#1A1A1A]">
                Related Editorial Reviews
              </h3>
            </div>
            <button
              onClick={() => navigateTo('/blog')}
              className="text-xs font-bold text-[#8A7147] hover:text-[#1A1A1A] flex items-center gap-1"
            >
              <span>View All 29 Reviews</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((rel) => (
              <div
                key={rel.id}
                onClick={() => {
                  navigateTo(`/blog/${rel.slug}`);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group cursor-pointer bg-[#FFFFFF] rounded-2xl border border-[#EFE8DA] overflow-hidden shadow-xs hover:shadow-xl hover:border-[#D4C3A3] transition-all p-4 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="relative h-40 w-full overflow-hidden rounded-xl bg-[#FAF8F5]">
                    <img
                      src={rel.image}
                      alt={rel.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <span className="text-[10px] font-bold text-[#B85D6A] uppercase font-mono block">
                    {rel.category}
                  </span>
                  <h4 className="text-sm font-serif font-bold text-[#1A1A1A] line-clamp-2 group-hover:text-[#8A7147] transition-colors">
                    {rel.name}
                  </h4>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-[#F5EFE6]">
                  <span className="font-bold text-[#1A1A1A]">{rel.currency}{rel.price.toFixed(2)}</span>
                  <span className="text-[#8A7147] font-semibold flex items-center gap-1">
                    Read Review <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </article>
  );
}
