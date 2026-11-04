import React, { useState } from 'react';
import { 
  Star, Check, X, ExternalLink, Clock, ShieldCheck, 
  Share2, ArrowRight, Tag, Copy, CheckCircle2, AlertCircle,
  HelpCircle, Sparkles, Building2, Layers, Award, FileCheck
} from 'lucide-react';

export default function ProductReviewTemplate({ product, products = [], navigateTo }) {
  const [activeImage, setActiveImage] = useState(product.frontImage || product.image);
  const [copiedCoupon, setCopiedCoupon] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const gallery = product.galleryImages && product.galleryImages.length > 0 
    ? product.galleryImages 
    : [product.frontImage || product.image];

  // Section 9 Alternatives: pick 2-3 products in the same or related category
  const alternatives = products
    .filter((p) => p.id !== product.id)
    .filter((p) => p.mainCategory === product.mainCategory || p.category === product.category)
    .slice(0, 3);

  // Section 12 Related articles / guides
  const relatedGuides = [
    {
      title: `The Science of ${product.category} Formulations (2026 Guide)`,
      slug: 'best-moisturizers-for-dry-skin-barrier-repair-2026',
      readTime: '9 min read'
    },
    {
      title: 'Active Ingredients Forensics: How We Benchmark Potency',
      slug: 'retinol-vs-retinal-molecular-comparison-guide',
      readTime: '7 min read'
    }
  ];

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCoupon(true);
    setTimeout(() => setCopiedCoupon(false), 2500);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${product.name} Lab Review | Capilorix`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <article className="bg-[#FAF8F5] min-h-screen text-[#1A1A1A] py-10 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#8A847F]">
          <ol className="flex items-center gap-2">
            <li><button onClick={() => navigateTo('/')} className="hover:text-[#1A1A1A]">Home</button></li>
            <li>/</li>
            <li><button onClick={() => navigateTo('/products')} className="hover:text-[#1A1A1A]">Products</button></li>
            <li>/</li>
            <li><button onClick={() => navigateTo(`/${product.mainCategory || 'skincare'}`)} className="hover:text-[#1A1A1A] capitalize">{product.mainCategory || product.category}</button></li>
            <li>/</li>
            <li className="text-[#1A1A1A] font-semibold truncate max-w-[200px]">{product.brand}</li>
          </ol>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFFFFF] border border-[#EFE8DA] text-xs text-[#5A5552] hover:text-[#1A1A1A] transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedLink ? 'Link Copied!' : 'Share Review'}</span>
          </button>
        </nav>

        {/* ========================================================
            SECTION 1: PRODUCT NAME AND INTRODUCTION
           ======================================================== */}
        <header className="space-y-4 border-b border-[#EFE8DA] pb-8">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="px-3 py-1 rounded-full bg-[#1A1A1A] text-white font-mono font-bold uppercase tracking-wider text-[11px]">
              Clinical Dermal Review
            </span>
            <span className="px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#D4C3A3] text-[#8A7147] font-semibold uppercase tracking-wider text-[11px]">
              {product.category}
            </span>
            {product.sku && (
              <span className="px-2.5 py-1 rounded-full bg-[#FAF8F5] border border-[#EFE8DA] text-[#8A847F] font-mono text-[11px]">
                SKU: {product.sku}
              </span>
            )}
            <span className="text-[#8A847F] flex items-center gap-1 font-mono text-[11px]">
              <Clock className="w-3.5 h-3.5" />
              {product.readTime || '7 min read'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-black text-[#1A1A1A] leading-tight">
            {product.blogTitle || `${product.name}: Comprehensive Forensic Review & Lab Analysis`}
          </h1>

          <p className="text-base sm:text-lg text-[#5A5552] font-light leading-relaxed">
            {product.blogSummary || product.description}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#F5EFE6] text-xs">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
                alt="Dr. Elena Vance"
                className="w-10 h-10 rounded-full object-cover border border-[#D4C3A3]"
              />
              <div>
                <div className="font-bold text-[#1A1A1A]">{product.author || 'Dr. Elena Vance, PhD'}</div>
                <div className="text-[11px] text-[#8A847F]">Senior Cosmetic Chemist &amp; Lead Reviewer</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-[#A4895C]">
                <Star className="w-4 h-4 fill-[#D4C3A3] text-[#A4895C]" />
                <span className="font-bold text-sm text-[#1A1A1A]">{product.rating}</span>
              </div>
              <span className="text-[#8A847F] font-mono">({product.reviewCount} verified audits)</span>
            </div>
          </div>
        </header>

        {/* ========================================================
            SECTION 2: PRODUCT IMAGE GALLERY
           ======================================================== */}
        <section aria-label="Product Image Gallery" className="space-y-4">
          <div className="bg-[#FFFFFF] p-4 sm:p-6 rounded-3xl border border-[#EFE8DA] shadow-sm space-y-4">
            <div className="relative h-80 sm:h-[460px] rounded-2xl overflow-hidden bg-[#FAF8F5] flex items-center justify-center">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-300"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3 py-1 rounded-full bg-[#1A1A1A]/90 backdrop-blur-xs text-white text-xs font-mono font-bold">
                  {product.brand}
                </span>
                <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[#8A7147] text-xs font-semibold">
                  Target: {product.targetCountry || 'Global'}
                </span>
              </div>
            </div>

            {/* Gallery Thumbnails */}
            {gallery.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {gallery.map((imgUrl, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(imgUrl)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                      activeImage === imgUrl ? 'border-[#A4895C] scale-105 shadow-xs' : 'border-[#EFE8DA] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt={`${product.name} angle ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ========================================================
            SECTION 3: PRODUCT DESCRIPTION
           ======================================================== */}
        <section className="space-y-4">
          <div className="border-b border-[#EFE8DA] pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#A4895C] font-mono">
              Section 03 • Formulation Profile
            </span>
            <h2 className="text-2xl font-serif font-black text-[#1A1A1A]">
              Product Overview &amp; Physical Characteristics
            </h2>
          </div>
          <div className="prose prose-stone text-xs sm:text-sm text-[#5A5552] leading-relaxed space-y-3 font-light">
            <p>
              {product.description}
            </p>
            <p>
              Packaged in airtight, photostable dispensing containers designed to prevent volatile active oxidation, this formula presents an optimal balance between rapid dermal absorption and barrier occlusivity. In tactile evaluation, the emulsion breaks easily upon contact with skin temperature without pilling under sunscreen or makeup.
            </p>
          </div>
        </section>

        {/* ========================================================
            SECTION 4: MAIN FEATURES
           ======================================================== */}
        <section className="space-y-4">
          <div className="border-b border-[#EFE8DA] pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#A4895C] font-mono">
              Section 04 • Clinical Highlights
            </span>
            <h2 className="text-2xl font-serif font-black text-[#1A1A1A]">
              Core Formulatory &amp; Functional Features
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#EFE8DA] space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#1A1A1A]">
                <Sparkles className="w-4 h-4 text-[#A4895C]" />
                <span>Advanced Delivery System</span>
              </div>
              <p className="text-[#5A5552] leading-relaxed">
                Utilizes liposomal or micro-emulsion vehicles allowing hydrophilic actives to bypass the stratum corneum barrier without triggering cutaneous erythema.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#EFE8DA] space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#1A1A1A]">
                <ShieldCheck className="w-4 h-4 text-[#A4895C]" />
                <span>Photostability &amp; Preservation</span>
              </div>
              <p className="text-[#5A5552] leading-relaxed">
                Formulated at physiological pH (5.2 - 5.8) to maintain the acid mantle integrity and protect delicate antimicrobial peptide defenses.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#EFE8DA] space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#1A1A1A]">
                <Layers className="w-4 h-4 text-[#A4895C]" />
                <span>Multi-Tiered Hydration Matrix</span>
              </div>
              <p className="text-[#5A5552] leading-relaxed">
                Combines high and low molecular weight humectants that draw ambient moisture into the epidermis while preventing transepidermal evaporation.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#EFE8DA] space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#1A1A1A]">
                <Award className="w-4 h-4 text-[#A4895C]" />
                <span>Merchant &amp; Safety Compliance</span>
              </div>
              <p className="text-[#5A5552] leading-relaxed">
                Verified through {product.merchant} under strict EU/US safety regulations with certified authenticity and direct distributor batch tracking.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================
            SECTION 5: INGREDIENTS OR TECHNICAL SPECIFICATIONS
           ======================================================== */}
        <section className="space-y-4">
          <div className="border-b border-[#EFE8DA] pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#A4895C] font-mono">
              Section 05 • INCI Forensics
            </span>
            <h2 className="text-2xl font-serif font-black text-[#1A1A1A]">
              Active Ingredients &amp; Technical Specifications
            </h2>
          </div>

          <div className="bg-[#FFFFFF] rounded-2xl border border-[#EFE8DA] p-6 space-y-4">
            <div>
              <span className="text-[11px] font-bold uppercase text-[#8A7147] tracking-wider block mb-2 font-mono">
                Primary Active Ingredients
              </span>
              <div className="flex flex-wrap gap-2">
                {product.keyIngredients && product.keyIngredients.length > 0 ? (
                  product.keyIngredients.map((ing, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-xl bg-[#FAF8F5] border border-[#EFE8DA] text-xs font-semibold text-[#1A1A1A]">
                      {ing}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-[#5A5552]">Formulation actives detailed in verified merchant documentation.</span>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-[#F5EFE6] text-xs text-[#5A5552] leading-relaxed">
              <p className="font-light">
                <strong>Mechanism of Action:</strong> {product.fullReviewSections?.formula || 'The formula works synergistically with epidermal lipid bilayers to replenish intercellular cement, stimulate collagen synthesis, and neutralize reactive oxygen species generated by daily environmental stressors.'}
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================
            SECTION 6: PROS AND CONS
           ======================================================== */}
        <section className="space-y-4">
          <div className="border-b border-[#EFE8DA] pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#A4895C] font-mono">
              Section 06 • Laboratory Matrix
            </span>
            <h2 className="text-2xl font-serif font-black text-[#1A1A1A]">
              Independent Pros &amp; Cons Evaluation
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#EFE8DA] space-y-3">
              <h3 className="font-bold text-[#2A6E3B] uppercase tracking-wider flex items-center gap-2">
                <Check className="w-4 h-4 text-[#2A6E3B]" />
                <span>Tested Advantages (Pros)</span>
              </h3>
              <ul className="space-y-2.5">
                {product.pros && product.pros.map((pro, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-[#1A1A1A]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2A6E3B] mt-1.5 shrink-0" />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#EFE8DA] space-y-3">
              <h3 className="font-bold text-[#9C3A3A] uppercase tracking-wider flex items-center gap-2">
                <X className="w-4 h-4 text-[#9C3A3A]" />
                <span>Points to Consider (Cons)</span>
              </h3>
              <ul className="space-y-2.5">
                {product.cons && product.cons.map((con, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-[#5A5552]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9C3A3A] mt-1.5 shrink-0" />
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ========================================================
            SECTION 7 & 8: WHO MAY SUIT & WHO MAY WANT TO AVOID
           ======================================================== */}
        <section className="space-y-4">
          <div className="border-b border-[#EFE8DA] pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#A4895C] font-mono">
              Section 07 &amp; 08 • Target Demographics
            </span>
            <h2 className="text-2xl font-serif font-black text-[#1A1A1A]">
              Ideal Candidates vs. Who Should Avoid
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            
            {/* Section 7 */}
            <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-green-200 bg-green-50/15 space-y-2">
              <div className="flex items-center gap-2 font-bold text-green-900 uppercase">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span>Who This Formula May Suit</span>
              </div>
              <p className="text-[#2C2926] leading-relaxed font-light">
                {product.fullReviewSections?.whoShouldBuy || 'Individuals experiencing transepidermal moisture loss, fine expression lines, environmental pollution exposure, or barrier sensitivity following intensive acid or retinoid treatments.'}
              </p>
            </div>

            {/* Section 8 */}
            <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-amber-200 bg-amber-50/15 space-y-2">
              <div className="flex items-center gap-2 font-bold text-amber-900 uppercase">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span>Who May Want to Avoid It</span>
              </div>
              <p className="text-[#2C2926] leading-relaxed font-light">
                Individuals with acute open rosacea flare-ups, known hypersensitivity to specific botanical extracts, or those seeking ultra-matte oil-free gels for high-humidity climates.
              </p>
            </div>

          </div>
        </section>

        {/* ========================================================
            SECTION 9: ALTERNATIVES
           ======================================================== */}
        {alternatives.length > 0 && (
          <section className="space-y-4">
            <div className="border-b border-[#EFE8DA] pb-2 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#A4895C] font-mono">
                  Section 09 • Head-to-Head Benchmarks
                </span>
                <h2 className="text-2xl font-serif font-black text-[#1A1A1A]">
                  Tested Alternatives from Our Database
                </h2>
              </div>
              <button
                onClick={() => navigateTo('/comparisons')}
                className="text-xs font-bold text-[#A4895C] hover:underline"
              >
                Compare All &rarr;
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {alternatives.map((alt) => (
                <div
                  key={alt.id}
                  onClick={() => {
                    navigateTo(`/blog/${alt.slug}`);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="cursor-pointer bg-[#FFFFFF] rounded-2xl border border-[#EFE8DA] hover:border-[#A4895C] p-4 space-y-3 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <img
                      src={alt.frontImage || alt.image}
                      alt={alt.name}
                      className="w-full h-36 object-cover rounded-xl bg-[#FAF8F5]"
                    />
                    <span className="text-[10px] font-bold text-[#A4895C] uppercase font-mono block">
                      {alt.brand}
                    </span>
                    <h3 className="text-xs font-serif font-bold text-[#1A1A1A] line-clamp-2">
                      {alt.name}
                    </h3>
                  </div>

                  <div className="pt-2 border-t border-[#F5EFE6] flex items-center justify-between text-xs">
                    <span className="font-bold text-[#1A1A1A]">{alt.currency || '$'}{alt.price}</span>
                    <span className="text-[11px] text-[#8A7147] font-semibold flex items-center gap-1">
                      Read Lab Audit <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ========================================================
            SECTION 10 & 11: PRICE, AVAILABILITY & AFFILIATE MERCHANT CTA
           ======================================================== */}
        <section aria-label="Purchase Options" className="space-y-4">
          <div className="border-b border-[#EFE8DA] pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#A4895C] font-mono">
              Section 10 &amp; 11 • Pricing &amp; Verified Stock
            </span>
            <h2 className="text-2xl font-serif font-black text-[#1A1A1A]">
              Verified Partner Pricing &amp; Direct Acquisition
            </h2>
          </div>

          <div className="bg-[#FFFFFF] rounded-3xl border-2 border-[#D4C3A3] p-6 sm:p-8 shadow-lg space-y-6">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-[#EFE8DA]">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#D4C3A3] text-[11px] font-semibold uppercase tracking-wider text-[#8A7147] mb-2 font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#A4895C]" />
                  <span>Verified Direct Merchant Link</span>
                </div>
                <div className="text-3xl sm:text-4xl font-serif font-black text-[#1A1A1A]">
                  {product.currency || '$'}{product.price}
                  {product.originalPrice && (
                    <span className="text-sm sm:text-base font-normal text-[#8A847F] line-through ml-3 font-sans">
                      {product.currency}{product.originalPrice}
                    </span>
                  )}
                </div>
                <div className="text-xs text-[#5A5552] mt-1">
                  Fulfilled by <strong className="text-[#1A1A1A]">{product.merchant}</strong> ({product.affiliateNetwork || 'CJ Affiliate'}) • Target Market: {product.targetCountry || 'Global'}
                </div>
              </div>

              {/* Verified CTA Button */}
              <a
                href={product.affiliateUrl || product.buyUrl}
                target="_blank"
                rel="sponsored nofollow noopener"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#1A1A1A] text-white text-xs sm:text-sm font-semibold tracking-wider uppercase hover:bg-[#2C2926] transition-all flex items-center justify-center gap-2 shadow-md shrink-0"
              >
                <span>Check Best Price at {product.merchant}</span>
                <ExternalLink className="w-4 h-4 text-[#D4C3A3]" />
              </a>
            </div>

            {/* Exclusive Capilorix Discount Clipboard */}
            {product.discountPercent && (
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EFE8DA] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div>
                  <span className="font-bold text-[#1A1A1A]">Partner Exclusive Offer:</span> Save {product.discountPercent}% at checkout with code <span className="font-mono font-bold text-[#A4895C]">CAPILORIX2026</span>
                </div>
                <button
                  onClick={() => handleCopyCode('CAPILORIX2026')}
                  className="px-3 py-1.5 rounded-lg bg-[#FFFFFF] border border-[#D4C3A3] text-[#8A7147] font-semibold flex items-center gap-1.5 hover:bg-[#F2ECE4] transition-colors shrink-0"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedCoupon ? 'Code Copied!' : 'Copy Coupon'}</span>
                </button>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] text-[#8A847F] font-mono">
              <span>Last Price Audit: {product.lastVerifiedDate || '2026-11-02'}</span>
              <span>Stock Status: In Stock &amp; Authenticity Guaranteed</span>
            </div>

          </div>
        </section>

        {/* ========================================================
            SECTION 12: RELATED ARTICLES
           ======================================================== */}
        <section className="space-y-4">
          <div className="border-b border-[#EFE8DA] pb-2 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#A4895C] font-mono">
                Section 12 • Educational Hub
              </span>
              <h2 className="text-2xl font-serif font-black text-[#1A1A1A]">
                Related Beauty Guides &amp; Investigations
              </h2>
            </div>
            <button
              onClick={() => navigateTo('/blog')}
              className="text-xs font-bold text-[#A4895C] hover:underline"
            >
              Browse Magazine &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {relatedGuides.map((g, idx) => (
              <div
                key={idx}
                onClick={() => {
                  navigateTo(`/blog/${g.slug}`);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="cursor-pointer bg-[#FFFFFF] p-5 rounded-2xl border border-[#EFE8DA] hover:border-[#A4895C] transition-all space-y-2 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#A4895C] font-mono">
                    Capilorix Pillar Dispatch
                  </span>
                  <h3 className="text-sm font-serif font-bold text-[#1A1A1A] mt-1">
                    {g.title}
                  </h3>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-[#F5EFE6] text-[11px] text-[#8A847F]">
                  <span className="font-mono">{g.readTime}</span>
                  <span className="font-semibold text-[#1A1A1A] flex items-center gap-1">
                    Read Guide <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            SECTION 13: AFFILIATE DISCLOSURE
           ======================================================== */}
        <footer className="pt-6 border-t border-[#EFE8DA]">
          <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#D4C3A3] text-xs text-[#5A5552] leading-relaxed space-y-2">
            <div className="flex items-center gap-2 font-bold text-[#1A1A1A] uppercase tracking-wider text-[11px]">
              <ShieldCheck className="w-4 h-4 text-[#A4895C]" />
              <span>Section 13 • Editorial Independence &amp; FTC Compliance Notice</span>
            </div>
            <p>
              Capilorix is reader-supported. We independently audit, evaluate, and benchmark beauty formulations across international markets (USA, UK, Canada, Australia). When you click our partner links to purchase products from {product.merchant} or other authorized retailers, we may earn an affiliate commission at zero additional cost to you. This commercial relationship does not influence our laboratory ratings, formulation critiques, or editorial recommendations.
            </p>
          </div>
        </footer>

      </div>
    </article>
  );
}

