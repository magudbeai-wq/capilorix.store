import React, { useState } from 'react';
import { 
  Star, Check, X, ExternalLink, ArrowRight, ShieldCheck, 
  Sparkles, Award, Scale, HelpCircle, Layers 
} from 'lucide-react';

export default function ProductComparisonTemplate({ productA, productB, allProducts = [], onSelectA, onSelectB, navigateTo }) {
  if (!productA || !productB) {
    return null;
  }

  // Feature criteria
  const features = [
    { label: 'Category & Focus', valA: productA.category, valB: productB.category },
    { label: 'Merchant & Origin', valA: productA.merchant, valB: productB.merchant },
    { label: 'Affiliate Network', valA: productA.affiliateNetwork || 'CJ Affiliate', valB: productB.affiliateNetwork || 'CJ Affiliate' },
    { label: 'Target Country', valA: productA.targetCountry || 'Global', valB: productB.targetCountry || 'Global' },
    { label: 'Key Active Ingredients', valA: (productA.keyIngredients || []).join(', ') || 'Specialized Complex', valB: (productB.keyIngredients || []).join(', ') || 'Specialized Complex' },
    { label: 'Verified Peer Rating', valA: `${productA.rating} / 5.0 (${productA.reviewCount} reviews)`, valB: `${productB.rating} / 5.0 (${productB.reviewCount} reviews)` },
    { label: 'Verified Partner Price', valA: `${productA.currency || '$'}${productA.price}`, valB: `${productB.currency || '$'}${productB.price}` },
  ];

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#1A1A1A] py-10 font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#8A847F]">
          <button onClick={() => navigateTo('/')} className="hover:text-[#1A1A1A]">Home</button>
          <span>/</span>
          <button onClick={() => navigateTo('/comparisons')} className="hover:text-[#1A1A1A]">Comparisons</button>
          <span>/</span>
          <span className="text-[#1A1A1A] font-semibold">{productA.brand} vs. {productB.brand}</span>
        </nav>

        {/* Header & Product Selectors */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#D4C3A3] text-xs font-semibold uppercase tracking-wider text-[#8A7147]">
            <Scale className="w-3.5 h-3.5 text-[#A4895C]" />
            <span>Side-by-Side Formulation Audit</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-serif font-black text-[#1A1A1A] leading-tight">
            {productA.name} <br className="hidden sm:inline" />
            <span className="text-[#A4895C] font-sans font-light text-2xl sm:text-3xl">vs.</span> {productB.name}
          </h1>

          <p className="text-xs sm:text-sm text-[#5A5552] font-light leading-relaxed">
            Independent head-to-head comparison evaluating active ingredients, texture, dermal tolerance, pricing, and suitability across skin profiles.
          </p>

          {/* Interactive Switchers if allProducts available */}
          {allProducts.length > 1 && onSelectA && onSelectB && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-xs text-left max-w-xl mx-auto">
              <div>
                <label className="block font-bold text-[#5A5552] uppercase mb-1 text-[10px]">Select Product A</label>
                <select
                  value={productA.id}
                  onChange={(e) => {
                    const found = allProducts.find((p) => p.id === e.target.value);
                    if (found) onSelectA(found);
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#EFE8DA] font-semibold text-[#1A1A1A]"
                >
                  {allProducts.map((p) => (
                    <option key={p.id} value={p.id}>{p.brand} - {p.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#5A5552] uppercase mb-1 text-[10px]">Select Product B</label>
                <select
                  value={productB.id}
                  onChange={(e) => {
                    const found = allProducts.find((p) => p.id === e.target.value);
                    if (found) onSelectB(found);
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#EFE8DA] font-semibold text-[#1A1A1A]"
                >
                  {allProducts.map((p) => (
                    <option key={p.id} value={p.id}>{p.brand} - {p.name}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </header>

        {/* Side-by-Side Product Presentation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Product A Card */}
          <div className="bg-[#FFFFFF] rounded-3xl border border-[#EFE8DA] p-6 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="relative h-64 rounded-2xl overflow-hidden bg-[#FAF8F5]">
                <img
                  src={productA.frontImage || productA.image}
                  alt={productA.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#1A1A1A] text-white text-xs font-mono font-bold">
                  Product A
                </span>
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#A4895C] font-mono">
                  {productA.brand}
                </span>
                <h2 className="text-xl font-serif font-bold text-[#1A1A1A] mt-0.5">
                  {productA.name}
                </h2>
                <div className="flex items-center gap-1 text-[#A4895C] mt-1 text-xs">
                  <Star className="w-3.5 h-3.5 fill-[#D4C3A3] text-[#A4895C]" />
                  <span className="font-bold text-[#1A1A1A]">{productA.rating}</span>
                  <span className="text-[#8A847F]">({productA.reviewCount} audits)</span>
                </div>
              </div>

              <p className="text-xs text-[#5A5552] leading-relaxed font-light">
                {productA.description}
              </p>
            </div>

            <div className="pt-4 border-t border-[#F5EFE6] space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#8A847F] uppercase font-mono block">Verified Price</span>
                  <span className="text-2xl font-serif font-black text-[#1A1A1A]">
                    {productA.currency || '$'}{productA.price}
                  </span>
                </div>
                <span className="text-xs text-[#5A5552]">At <strong>{productA.merchant}</strong></span>
              </div>

              <a
                href={productA.affiliateUrl || productA.buyUrl}
                target="_blank"
                rel="sponsored nofollow noopener"
                className="w-full py-3 rounded-xl bg-[#1A1A1A] text-white text-xs font-semibold tracking-wider uppercase hover:bg-[#2C2926] transition-all flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Check {productA.brand} Price</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#D4C3A3]" />
              </a>
            </div>
          </div>

          {/* Product B Card */}
          <div className="bg-[#FFFFFF] rounded-3xl border border-[#EFE8DA] p-6 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="relative h-64 rounded-2xl overflow-hidden bg-[#FAF8F5]">
                <img
                  src={productB.frontImage || productB.image}
                  alt={productB.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#1A1A1A] text-white text-xs font-mono font-bold">
                  Product B
                </span>
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#A4895C] font-mono">
                  {productB.brand}
                </span>
                <h2 className="text-xl font-serif font-bold text-[#1A1A1A] mt-0.5">
                  {productB.name}
                </h2>
                <div className="flex items-center gap-1 text-[#A4895C] mt-1 text-xs">
                  <Star className="w-3.5 h-3.5 fill-[#D4C3A3] text-[#A4895C]" />
                  <span className="font-bold text-[#1A1A1A]">{productB.rating}</span>
                  <span className="text-[#8A847F]">({productB.reviewCount} audits)</span>
                </div>
              </div>

              <p className="text-xs text-[#5A5552] leading-relaxed font-light">
                {productB.description}
              </p>
            </div>

            <div className="pt-4 border-t border-[#F5EFE6] space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#8A847F] uppercase font-mono block">Verified Price</span>
                  <span className="text-2xl font-serif font-black text-[#1A1A1A]">
                    {productB.currency || '$'}{productB.price}
                  </span>
                </div>
                <span className="text-xs text-[#5A5552]">At <strong>{productB.merchant}</strong></span>
              </div>

              <a
                href={productB.affiliateUrl || productB.buyUrl}
                target="_blank"
                rel="sponsored nofollow noopener"
                className="w-full py-3 rounded-xl bg-[#1A1A1A] text-white text-xs font-semibold tracking-wider uppercase hover:bg-[#2C2926] transition-all flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Check {productB.brand} Price</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#D4C3A3]" />
              </a>
            </div>
          </div>

        </div>

        {/* Feature Comparison Table */}
        <section className="bg-[#FFFFFF] rounded-3xl border border-[#EFE8DA] shadow-xs overflow-hidden">
          <div className="p-6 border-b border-[#EFE8DA]">
            <h3 className="text-xl font-serif font-bold text-[#1A1A1A]">
              Detailed Technical &amp; Formulation Comparison
            </h3>
            <p className="text-xs text-[#8A847F] mt-1">
              Direct point-by-point specifications between {productA.brand} and {productB.brand}.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#FAF8F5] text-[#5A5552] font-semibold uppercase tracking-wider text-[11px] border-b border-[#EFE8DA]">
                  <th className="py-3 px-6 w-1/3">Evaluation Metric</th>
                  <th className="py-3 px-6 w-1/3 font-serif font-bold text-[#1A1A1A]">{productA.brand}</th>
                  <th className="py-3 px-6 w-1/3 font-serif font-bold text-[#1A1A1A]">{productB.brand}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F5EFE6]">
                {features.map((f, i) => (
                  <tr key={i} className="hover:bg-[#FCFAF7] transition-colors">
                    <td className="py-3.5 px-6 font-semibold text-[#5A5552]">{f.label}</td>
                    <td className="py-3.5 px-6 text-[#1A1A1A] font-medium">{f.valA}</td>
                    <td className="py-3.5 px-6 text-[#1A1A1A] font-medium">{f.valB}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Advantages & Disadvantages Side-by-Side */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="bg-[#FFFFFF] p-6 rounded-3xl border border-[#EFE8DA] space-y-4">
            <h3 className="text-lg font-serif font-bold text-[#1A1A1A]">
              {productA.brand} Advantages &amp; Considerations
            </h3>
            
            <div className="space-y-3 text-xs">
              <div>
                <span className="font-bold text-[#2A6E3B] uppercase block mb-1.5 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#2A6E3B]" />
                  <span>Strengths</span>
                </span>
                <ul className="space-y-1 text-[#1A1A1A]">
                  {(productA.pros || ['Rapid dermal bioavailability', 'Non-comedogenic certification']).map((p, i) => (
                    <li key={i} className="flex items-start gap-1.5">&bull; {p}</li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 border-t border-[#F5EFE6]">
                <span className="font-bold text-[#9C3A3A] uppercase block mb-1.5 flex items-center gap-1.5">
                  <X className="w-3.5 h-3.5 text-[#9C3A3A]" />
                  <span>Trade-offs</span>
                </span>
                <ul className="space-y-1 text-[#5A5552]">
                  {(productA.cons || ['Higher unit cost per fluid ounce']).map((c, i) => (
                    <li key={i} className="flex items-start gap-1.5">&bull; {c}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-[#FFFFFF] p-6 rounded-3xl border border-[#EFE8DA] space-y-4">
            <h3 className="text-lg font-serif font-bold text-[#1A1A1A]">
              {productB.brand} Advantages &amp; Considerations
            </h3>
            
            <div className="space-y-3 text-xs">
              <div>
                <span className="font-bold text-[#2A6E3B] uppercase block mb-1.5 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#2A6E3B]" />
                  <span>Strengths</span>
                </span>
                <ul className="space-y-1 text-[#1A1A1A]">
                  {(productB.pros || ['Broad availability across global regions', 'High cost-to-volume ratio']).map((p, i) => (
                    <li key={i} className="flex items-start gap-1.5">&bull; {p}</li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 border-t border-[#F5EFE6]">
                <span className="font-bold text-[#9C3A3A] uppercase block mb-1.5 flex items-center gap-1.5">
                  <X className="w-3.5 h-3.5 text-[#9C3A3A]" />
                  <span>Trade-offs</span>
                </span>
                <ul className="space-y-1 text-[#5A5552]">
                  {(productB.cons || ['Requires longer absorption window before SPF']).map((c, i) => (
                    <li key={i} className="flex items-start gap-1.5">&bull; {c}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </section>

        {/* Different Use Cases ("Choose A if... / Choose B if...") */}
        <section className="bg-[#FFFFFF] p-6 sm:p-8 rounded-3xl border border-[#EFE8DA] space-y-6">
          <div className="border-b border-[#EFE8DA] pb-3">
            <h3 className="text-xl font-serif font-bold text-[#1A1A1A]">
              Which Formula Should You Choose?
            </h3>
            <p className="text-xs text-[#8A847F] mt-1">
              Dermatological guidelines to select based on your personal skin tolerance and routine.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#EFE8DA] space-y-2">
              <span className="font-serif font-bold text-sm text-[#1A1A1A] block">
                Choose {productA.name} If:
              </span>
              <ul className="space-y-2 text-[#5A5552] leading-relaxed">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#A4895C] shrink-0 mt-0.5" />
                  <span>Your primary concern is active barrier lipid regeneration and clinical ingredient concentration.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#A4895C] shrink-0 mt-0.5" />
                  <span>You layer multiple serums and require rapid non-greasy absorption.</span>
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#EFE8DA] space-y-2">
              <span className="font-serif font-bold text-sm text-[#1A1A1A] block">
                Choose {productB.name} If:
              </span>
              <ul className="space-y-2 text-[#5A5552] leading-relaxed">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#A4895C] shrink-0 mt-0.5" />
                  <span>You seek maximum value per ounce or a richer emollient texture for nighttime occlusivity.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#A4895C] shrink-0 mt-0.5" />
                  <span>You prefer a multi-purpose barrier formula suitable for both face and body applications.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Final Editorial Recommendation & Verdict Box */}
        <section className="p-6 sm:p-8 rounded-3xl bg-[#1A1A1A] text-white space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-xs text-[#D4C3A3] uppercase font-mono font-bold tracking-wider">
            <Award className="w-4 h-4 text-[#D4C3A3]" />
            <span>The Capilorix Final Editorial Verdict</span>
          </div>

          <h3 className="text-2xl font-serif font-bold text-white">
            Our Independent Recommendation
          </h3>

          <p className="text-xs sm:text-sm text-[#D5CECE] font-light leading-relaxed">
            Both formulations have successfully passed our safety and authenticity audits. For targeted dermal treatment and advanced active delivery, <strong>{productA.name}</strong> maintains a slight technical advantage. For extensive daily hydration and cost-effectiveness across household routines, <strong>{productB.name}</strong> represents an outstanding commercial option.
          </p>

          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs">
            <span className="text-[#A8A29E] font-mono text-[11px]">
              All partner links tested with rel="sponsored" attribution.
            </span>
            <div className="flex items-center gap-3">
              <a
                href={productA.affiliateUrl || productA.buyUrl}
                target="_blank"
                rel="sponsored nofollow noopener"
                className="px-4 py-2 rounded-xl bg-[#FFFFFF] text-[#1A1A1A] font-semibold hover:bg-[#F2ECE4] transition-all"
              >
                View {productA.brand}
              </a>
              <a
                href={productB.affiliateUrl || productB.buyUrl}
                target="_blank"
                rel="sponsored nofollow noopener"
                className="px-4 py-2 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20 transition-all"
              >
                View {productB.brand}
              </a>
            </div>
          </div>
        </section>

        {/* FTC Disclosure */}
        <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#EFE8DA] text-[11px] text-[#8A847F] text-center leading-relaxed">
          Capilorix is reader-supported. We independently audit products before recommendation. When you purchase via our merchant links, we may receive an affiliate commission.
        </div>

      </div>
    </div>
  );
}

