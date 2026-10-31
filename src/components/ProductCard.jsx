import React, { useState } from 'react';
import { 
  Star, 
  Check, 
  X, 
  ExternalLink, 
  BookOpen, 
  Tag, 
  Copy, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  Award
} from 'lucide-react';

export default function ProductCard({ product, rank, navigateTo }) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <article className="bg-[#FFFFFF] rounded-2xl border border-[#EFE8DA] hover:border-[#D4C3A3] shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden text-[#1A1A1A] flex flex-col justify-between">
      
      {/* 1. Card Top Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-5 sm:px-6 py-3 bg-[#FDFBF7] border-b border-[#EFE8DA]">
        <div className="flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-full bg-[#1A1A1A] text-[#FDFBF7] font-bold text-xs flex items-center justify-center font-serif">
            #{rank}
          </span>
          <span className="text-xs font-semibold px-3 py-0.5 rounded-full bg-[#FAF8F5] border border-[#D4C3A3] text-[#8A7147] tracking-wider uppercase">
            {product.badge}
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-medium text-[#8A847F] uppercase tracking-wider">
          <span className="font-semibold text-[#1A1A1A]">{product.merchant}</span>
          <span>•</span>
          <span>{product.category}</span>
        </div>
      </div>

      {/* 2. Main Body Content Grid */}
      <div className="p-5 sm:p-6 lg:p-7">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Column A: Authentic Photography & Quick Action */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <div className="relative rounded-xl overflow-hidden bg-[#FAF8F5] aspect-square w-full border border-[#EFE8DA] group">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              
              {/* Discount Tag */}
              {product.discountPercent > 0 && (
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#B85D6A] text-white font-bold text-xs shadow-xs">
                  SAVE {product.discountPercent}%
                </div>
              )}

              {/* In-Stock Tag */}
              <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-white/95 backdrop-blur-xs text-[10px] font-bold text-[#3D7055] border border-[#EFE8DA] shadow-xs">
                Verified In Stock
              </div>
            </div>

            {/* Price Row */}
            <div className="flex items-baseline justify-between p-3 rounded-xl bg-[#FAF8F5] border border-[#EFE8DA]">
              <div>
                <span className="text-2xl font-serif font-black text-[#1A1A1A]">
                  {product.currency}{product.price.toFixed(2)}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-xs text-[#8A847F] line-through ml-2">
                    {product.currency}{product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              <span className="text-[11px] font-bold text-[#8A7147] uppercase tracking-wider">
                Direct Merchant Price
              </span>
            </div>

            {/* Coupon Code Pill */}
            {product.verifiedCoupon && (
              <button
                onClick={() => handleCopyCode(product.verifiedCoupon.split(' ')[0])}
                className="w-full py-1.5 px-3 rounded-lg border border-dashed border-[#D4C3A3] bg-[#FDFBF7] hover:bg-[#F6EAE8] text-[11px] font-mono text-[#8A7147] hover:text-[#8C3D49] flex items-center justify-between transition-colors"
                title="Click to copy verified discount code"
              >
                <div className="flex items-center gap-1.5 truncate">
                  <Tag className="w-3 h-3 text-[#A4895C]" />
                  <span className="truncate">{product.verifiedCoupon}</span>
                </div>
                <span className="font-bold shrink-0">{copied ? 'COPIED!' : 'COPY'}</span>
              </button>
            )}
          </div>

          {/* Column B: Editorial Breakdown & Specs */}
          <div className="lg:col-span-8 flex flex-col justify-between h-full space-y-4">
            
            {/* Header: Brand & Star Rating */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2 text-xs">
                <span className="font-bold tracking-widest text-[#B85D6A] uppercase font-mono">
                  {product.brand}
                </span>

                <div className="flex items-center gap-1.5 text-xs">
                  <div className="flex text-[#A4895C]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#D4C3A3] text-[#A4895C]" />
                    ))}
                  </div>
                  <span className="font-bold text-[#1A1A1A]">{product.rating}</span>
                  <span className="text-[#8A847F]">({product.reviewCount} peer ratings)</span>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#1A1A1A] leading-snug hover:text-[#8A7147] transition-colors">
                <a 
                  href={`/blog/${product.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    if (navigateTo) navigateTo(`/blog/${product.slug}`);
                  }}
                >
                  {product.name}
                </a>
              </h3>

              {/* Skin Type & Target Concern */}
              {product.skinType && (
                <div className="mt-2 inline-flex items-center gap-1.5 text-xs text-[#5A5552] bg-[#FAF8F5] px-2.5 py-1 rounded-md border border-[#EFE8DA]">
                  <span className="font-semibold text-[#1A1A1A]">Target Concern:</span>
                  <span>{product.skinType}</span>
                </div>
              )}
            </div>

            {/* Key Active Ingredients */}
            {product.keyIngredients && (
              <div>
                <span className="text-[11px] font-bold text-[#8A7147] uppercase tracking-wider block mb-1.5">
                  Clinical Bio-Actives:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {product.keyIngredients.map((ing) => (
                    <span 
                      key={ing}
                      className="px-2.5 py-1 rounded-md bg-[#FAF8F5] border border-[#EFE8DA] text-[11px] text-[#5A5552] font-medium"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Pros and Cons Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#EFE8DA]">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#3D7055] uppercase tracking-wider mb-2">
                  <Check className="w-3.5 h-3.5" />
                  <span>Lab Pros</span>
                </div>
                <ul className="space-y-1.5 text-xs text-[#5A5552]">
                  {product.pros.map((pro, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-[#3D7055] font-bold">•</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#EFE8DA]">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#B85D6A] uppercase tracking-wider mb-2">
                  <X className="w-3.5 h-3.5" />
                  <span>Nuances &amp; Notes</span>
                </div>
                <ul className="space-y-1.5 text-xs text-[#5A5552]">
                  {product.cons.map((con, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-[#B85D6A] font-bold">•</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Editorial Verdict Excerpt */}
            <div className="pt-2 text-xs text-[#5A5552] leading-relaxed italic border-t border-[#F5EFE6]">
              "{product.verdict}"
            </div>

            {/* Dual CTAs: Read Full Editorial Review + Shop Partner Deal */}
            <div className="pt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => navigateTo && navigateTo(`/blog/${product.slug}`)}
                className="w-full py-3 px-4 rounded-xl bg-[#FAF8F5] hover:bg-[#F2ECE4] border border-[#EFE8DA] text-[#1A1A1A] text-xs font-bold tracking-wide transition-colors flex items-center justify-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-[#8A7147]" />
                <span>Read Editorial Review</span>
              </button>

              <a
                href={product.affiliateUrl}
                target="_blank"
                rel="sponsored nofollow noopener"
                className="w-full py-3 px-4 rounded-xl bg-[#1A1A1A] hover:bg-[#A4895C] text-[#FDFBF7] text-xs font-bold tracking-wide transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Shop Verified Partner Deal</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

          </div>

        </div>
      </div>

    </article>
  );
}
