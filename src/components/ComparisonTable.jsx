import React from 'react';
import { products } from '../data/products';
import { Star, Check, ExternalLink, Award } from 'lucide-react';

export default function ComparisonTable() {
  return (
    <section id="compare-section" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <Award className="w-3.5 h-3.5" />
          <span>Head-to-Head Benchmark</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
          2026 Clinical Comparison Matrix
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-300">
          Compare verified clinical ratings, primary active mechanisms, prices, and exclusive discount codes side by side.
        </p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-800 shadow-2xl bg-[#0f121b]">
        <table className="w-full text-left border-collapse min-w-[760px]">
          <thead>
            <tr className="bg-slate-900 border-b border-slate-800 text-xs text-slate-400 uppercase tracking-wider">
              <th className="py-4 px-6 font-semibold">Product & Brand</th>
              <th className="py-4 px-4 font-semibold">Rating</th>
              <th className="py-4 px-4 font-semibold">Best Suited For</th>
              <th className="py-4 px-4 font-semibold">Active Tech</th>
              <th className="py-4 px-4 font-semibold">Price</th>
              <th className="py-4 px-6 text-right font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80 text-sm">
            {products.map((p, index) => (
              <tr 
                key={p.id} 
                className={`hover:bg-slate-800/30 transition-colors ${
                  index === 0 ? 'bg-amber-500/5' : ''
                }`}
              >
                {/* Product Name & Thumb */}
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <img 
                      src={p.image} 
                      alt={p.name} 
                      className="w-12 h-12 rounded-lg object-cover border border-slate-700/80 shrink-0" 
                    />
                    <div>
                      <span className="text-[10px] uppercase font-bold text-amber-400 block tracking-wider">
                        {p.brand}
                      </span>
                      <span className="font-bold text-white hover:text-amber-300 transition-colors block text-sm line-clamp-1">
                        {p.name}
                      </span>
                      <span className="text-xs text-slate-400 block">
                        {p.badge}
                      </span>
                    </div>
                  </div>
                </td>

                {/* Rating */}
                <td className="py-4 px-4">
                  <div className="flex items-center gap-1.5 font-bold text-amber-400">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span>{p.rating}</span>
                  </div>
                  <span className="text-[11px] text-slate-500 block">
                    {p.reviewCount} reviews
                  </span>
                </td>

                {/* Best For */}
                <td className="py-4 px-4 text-xs text-slate-300">
                  <span className="px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700/50 inline-block font-medium">
                    {p.category}
                  </span>
                </td>

                {/* Active Tech */}
                <td className="py-4 px-4 text-xs text-slate-300 max-w-[200px]">
                  {p.features[0]}
                </td>

                {/* Price */}
                <td className="py-4 px-4">
                  <span className="font-serif font-black text-white text-base block">
                    {p.currency || '$'}{p.price.toFixed(2)}
                  </span>
                  {p.discountPercent > 0 && (
                    <span className="text-[11px] text-rose-400 font-bold block">
                      Save {p.discountPercent}%
                    </span>
                  )}
                </td>

                {/* CTA */}
                <td className="py-4 px-6 text-right">
                  <a
                    href={p.affiliateUrl}
                    target="_blank"
                    rel="sponsored nofollow noopener"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-transform active:scale-95 shadow-md shadow-amber-500/20"
                  >
                    <span>View Deal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
