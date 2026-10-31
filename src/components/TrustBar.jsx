import React from 'react';
import { editorialStats } from '../data/products';

export default function TrustBar() {
  return (
    <section className="bg-[#0e111a] border-b border-slate-800/80 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {editorialStats.map((stat, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/60">
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-serif gradient-gold">
                {stat.value}
              </div>
              <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
