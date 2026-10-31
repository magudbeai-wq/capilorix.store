import React, { useState } from 'react';
import { Star, Check, X, ExternalLink, Tag, Copy, Shield, ChevronDown, ChevronUp } from 'lucide-react';

export default function ProductCard({ product, rank }) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const getBadgeColor = (type) => {
    switch (type) {
      case 'gold':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'emerald':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'rose':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      default:
        return 'bg-sky-500/20 text-sky-300 border-sky-500/40';
    }
  };

  return (
    <article className="relative rounded-2xl bg-[#111420] border border-slate-800 hover:border-slate-700/80 transition-all shadow-xl overflow-hidden flex flex-col justify-between">
      {/* Top Header Badge Strip */}
      <div className="flex items-center justify-between px-6 py-3.5 bg-slate-900/90 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-bold text-xs flex items-center justify-center border border-amber-500/40">
            #{rank}
          </span>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${getBadgeColor(product.badgeColor)}`}>
            {product.badge}
          </span>
        </div>
        <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
          {product.category}
        </span>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Image & Discount Column */}
          <div className="lg:col-span-4 relative rounded-xl overflow-hidden bg-slate-950 aspect-square sm:aspect-video lg:aspect-square flex items-center justify-center border border-slate-800">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            {product.discountPercent > 0 && (
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-rose-600 text-white font-extrabold text-xs shadow-lg">
                SAVE {product.discountPercent}%
              </div>
            )}
            <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm text-[10px] text-slate-300 border border-white/10">
              Verified Partner
            </div>
          </div>

          {/* Details & Features Column */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-semibold text-amber-400 tracking-wide uppercase">
                  {product.brand}
                </span>
                <span className="text-slate-600">•</span>
                <div className="flex items-center gap-1 text-amber-400 text-xs font-semibold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-slate-400 font-normal">({product.reviewCount} verified ratings)</span>
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-white hover:text-amber-400 transition-colors leading-snug">
                {product.name}
              </h2>

              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                {product.verdict}
              </p>

              {/* Verified Coupon Pill */}
              {product.verifiedCoupon && (
                <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs">
                  <Tag className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-slate-200">Promo: <strong className="text-amber-300">{product.verifiedCoupon}</strong></span>
                  <button
                    onClick={() => handleCopyCode(product.verifiedCoupon.split(' ')[0])}
                    className="ml-2 text-slate-400 hover:text-white transition-colors"
                    title="Copy promo code"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              )}

              {/* Key Specs */}
              <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Pros & Cons Accordion */}
        <div className="mt-6 pt-5 border-t border-slate-800/80">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center justify-between w-full text-xs font-semibold text-slate-400 hover:text-slate-200"
          >
            <span>{expanded ? 'Hide Laboratory Pros & Cons' : 'View Laboratory Pros & Cons Breakdown'}</span>
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {expanded && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs animate-fadeIn">
              <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20">
                <div className="font-bold text-emerald-300 mb-2 flex items-center gap-1.5">
                  <Check className="w-4 h-4" />
                  <span>Key Advantages:</span>
                </div>
                <ul className="space-y-1.5 text-slate-300">
                  {product.pros.map((pro, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/20">
                <div className="font-bold text-rose-300 mb-2 flex items-center gap-1.5">
                  <X className="w-4 h-4" />
                  <span>Considerations:</span>
                </div>
                <ul className="space-y-1.5 text-slate-300">
                  {product.cons.map((con, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-rose-400 font-bold">•</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Footer with Price and Primary CTA Button */}
      <div className="px-6 py-4 bg-slate-900/60 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-[11px] text-slate-400">Verified Retail Price</div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-white font-serif">
              {product.currency || '$'}{product.price.toFixed(2)}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-slate-500 line-through">
                {product.currency || '$'}{product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        <div className="w-full sm:w-auto flex items-center gap-3">
          <a
            href={product.affiliateUrl}
            target="_blank"
            rel="sponsored nofollow noopener"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 active:scale-95 group"
          >
            <span>Check Best Price & Deal</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </article>
  );
}
