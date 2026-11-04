import React from 'react';
import { Microscope, ShieldCheck, CheckCircle2, Sparkles, Scale, Clock, HeartHandshake } from 'lucide-react';

export default function HowWeReviewPage({ navigateTo }) {
  return (
    <div className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left bg-[#FAF8F5] text-[#1A1A1A]">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#D4C3A3] text-[#8A7147] text-xs font-semibold uppercase tracking-wider mb-4">
          <Microscope className="w-3.5 h-3.5 text-[#A4895C]" />
          <span>Testing Protocol</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif font-black text-[#1A1A1A] mb-4">
          How We Review Beauty Products
        </h1>
        <p className="text-sm text-[#5A5552] max-w-2xl mx-auto font-light leading-relaxed">
          Inside the Capilorix 4-Stage Testing Methodology: from bio-chemical forensic audits to 30-day instrumental testing and live pricing checks.
        </p>
      </div>

      <div className="space-y-8 text-[#2D2D2A] text-sm leading-relaxed">
        
        {/* Stage 1 */}
        <div className="p-8 rounded-3xl bg-[#FFFFFF] border border-[#EFE8DA] shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#A4895C] uppercase tracking-wider font-mono">
            <span className="w-6 h-6 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center">1</span>
            <span>Stage One: Bio-Chemical Formulation Audit</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#1A1A1A]">
            Active Ingredient Forensics &amp; Literature Review
          </h2>
          <p className="text-[#5A5552]">
            Before any product is recommended, we dissect its complete International Nomenclature of Cosmetic Ingredients (INCI) list. We verify:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-[#5A5552]">
            <li>Whether clinical bio-actives are included at therapeutic, biologically effective concentrations.</li>
            <li>Delivery mechanisms (e.g. spicule size, liposomal encapsulation, molecular weight).</li>
            <li>Absence of prohibited contaminants, toxic preservatives, and unstable carrier oils.</li>
            <li>Optimal pH ranges required for active acid or enzymatic stability.</li>
          </ul>
        </div>

        {/* Stage 2 */}
        <div className="p-8 rounded-3xl bg-[#FFFFFF] border border-[#EFE8DA] shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#A4895C] uppercase tracking-wider font-mono">
            <span className="w-6 h-6 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center">2</span>
            <span>Stage Two: Sensorial &amp; Wearability Testing</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#1A1A1A]">
            Real-World Application &amp; Texture Analysis
          </h2>
          <p className="text-[#5A5552]">
            Great formulations on paper often fail in real life. Our testers evaluate:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-[#5A5552]">
            <li>Absorption speed, finish (satin, dewy, or matte), and residue.</li>
            <li>Cosmetic compatibility: Does the formula pill under sunscreen or cushion foundation?</li>
            <li>Aromatics and sensory nuance: Natural botanical scents versus overpowering synthetic perfumes.</li>
            <li>Packaging hygiene: Airless pumps and sealed tubes versus contamination-prone open jars.</li>
          </ul>
        </div>

        {/* Stage 3 */}
        <div className="p-8 rounded-3xl bg-[#FFFFFF] border border-[#EFE8DA] shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#A4895C] uppercase tracking-wider font-mono">
            <span className="w-6 h-6 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center">3</span>
            <span>Stage Three: 30-Day Cohort Observation</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#1A1A1A]">
            Instrumental &amp; Visual Efficacy Benchmarks
          </h2>
          <p className="text-[#5A5552]">
            Skin turnover cycles take 28 to 40 days. Where practical, products undergo extended evaluation using hydration corneometers, visual surface profilometry, and daily participant symptom logs.
          </p>
        </div>

        {/* Stage 4 */}
        <div className="p-8 rounded-3xl bg-[#FFFFFF] border border-[#EFE8DA] shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#A4895C] uppercase tracking-wider font-mono">
            <span className="w-6 h-6 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center">4</span>
            <span>Stage Four: Value &amp; Merchant Verification</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#1A1A1A]">
            Direct Retail Pricing &amp; Buyer Protections
          </h2>
          <p className="text-[#5A5552]">
            Finally, we audit live merchant pricing across the USA, UK, Canada, Australia, and Europe. We check return policies, verify coupon codes, and ensure our links connect readers directly to authentic, authorized merchant stock.
          </p>
        </div>

      </div>
    </div>
  );
}
