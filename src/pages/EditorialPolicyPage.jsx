import React from 'react';
import { Award, ShieldCheck, CheckCircle2, FileText, Scale } from 'lucide-react';

export default function EditorialPolicyPage({ navigateTo }) {
  return (
    <div className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left bg-[#FAF8F5] text-[#1A1A1A]">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#D4C3A3] text-[#8A7147] text-xs font-semibold uppercase tracking-wider mb-4">
          <Scale className="w-3.5 h-3.5 text-[#A4895C]" />
          <span>Journalistic Integrity</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif font-black text-[#1A1A1A] mb-4">
          Editorial &amp; Review Policy
        </h1>
        <p className="text-sm text-[#5A5552] max-w-2xl mx-auto font-light leading-relaxed">
          How Capilorix maintains unwavering journalistic independence, rigorous laboratory discipline, and total transparency in our beauty benchmarks.
        </p>
      </div>

      <div className="space-y-8 text-[#2D2D2A] text-sm leading-relaxed">
        
        {/* Core Principles */}
        <div className="p-8 rounded-3xl bg-[#FFFFFF] border border-[#EFE8DA] shadow-xs space-y-4">
          <h2 className="text-2xl font-serif font-bold text-[#1A1A1A] flex items-center gap-2">
            <Award className="w-5 h-5 text-[#A4895C]" />
            <span>Our Five Editorial Cornerstones</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EFE8DA] space-y-1">
              <span className="font-bold text-xs uppercase tracking-wider text-[#A4895C] font-mono">1. Independence</span>
              <p className="text-xs text-[#5A5552]">We never accept payment or incentives to guarantee positive reviews or manipulate ratings.</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EFE8DA] space-y-1">
              <span className="font-bold text-xs uppercase tracking-wider text-[#A4895C] font-mono">2. Evidence-Based</span>
              <p className="text-xs text-[#5A5552]">Every efficacy claim is audited against peer-reviewed scientific literature and clinical trials.</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EFE8DA] space-y-1">
              <span className="font-bold text-xs uppercase tracking-wider text-[#A4895C] font-mono">3. Commercial Separation</span>
              <p className="text-xs text-[#5A5552]">Our editorial board operates strictly independent of affiliate network commercial managers.</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EFE8DA] space-y-1">
              <span className="font-bold text-xs uppercase tracking-wider text-[#A4895C] font-mono">4. Real Experience</span>
              <p className="text-xs text-[#5A5552]">We clearly distinguish physical laboratory testing from desk-based comparative reviews.</p>
            </div>
          </div>
        </div>

        {/* Commercial Transparency */}
        <div className="p-8 rounded-3xl bg-[#FFFFFF] border border-[#EFE8DA] shadow-xs space-y-3">
          <h2 className="text-xl font-serif font-bold text-[#1A1A1A]">
            Commercial Affiliate Relationships
          </h2>
          <p className="text-[#5A5552]">
            Capilorix participates in affiliate marketing networks including CJ Affiliate (Commission Junction) and direct merchant programs. When our readers purchase products through our links, we may receive an affiliate commission at zero extra cost to the buyer.
          </p>
          <p className="text-[#5A5552]">
            Our commercial relationships have no bearing on what products we test, the ratings we assign, or the pros and cons we highlight. If a product does not meet our clinical benchmarks, our review states that plainly.
          </p>
        </div>

        {/* Corrections Policy */}
        <div className="p-8 rounded-3xl bg-[#FFFFFF] border border-[#EFE8DA] shadow-xs space-y-3">
          <h2 className="text-xl font-serif font-bold text-[#1A1A1A]">
            Corrections &amp; Updates Policy
          </h2>
          <p className="text-[#5A5552]">
            Beauty formulations change, prices fluctuate, and products are periodically reformulated. Our team regularly re-evaluates previously published reviews. If you notice an outdated price, discontinued item, or factual error, please alert our editorial desk at <strong>editorial@capilorix.store</strong>.
          </p>
        </div>

      </div>
    </div>
  );
}

