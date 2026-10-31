import React from 'react';
import { Award, ShieldCheck, Microscope, Users, Sparkles, Globe } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left bg-[#FAF8F5] text-[#1A1A1A]">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#D4C3A3] text-[#8A7147] text-xs font-semibold uppercase tracking-wider mb-4">
          <Microscope className="w-3.5 h-3.5 text-[#A4895C]" />
          <span>Our Editorial Mission</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif font-black text-[#1A1A1A] mb-4">
          About Capilorix
        </h1>
        <p className="text-base text-[#5A5552] max-w-2xl mx-auto font-light leading-relaxed">
          Discover Better Beauty. Make Smarter Choices. We are an independent international beauty publication dedicated to forensic ingredient analysis, clinical efficacy reviews, and verified merchant pricing.
        </p>
      </div>

      <div className="space-y-8 text-[#2D2D2A] text-sm leading-relaxed">
        <div className="p-8 rounded-3xl bg-[#FFFFFF] border border-[#EFE8DA] shadow-xs">
          <h2 className="text-2xl font-bold text-[#1A1A1A] font-serif mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-[#A4895C]" />
            <span>Why Capilorix Was Founded</span>
          </h2>
          <p className="mb-4 text-[#5A5552]">
            The international beauty and cosmetics industry is flooded with exaggerated marketing claims, counterfeit products, and confusing price fluctuations. <strong>Capilorix (capilorix.store)</strong> was built to serve as an authoritative, independent guide for discerning consumers across the USA, UK, Canada, and Australia.
          </p>
          <p className="text-[#5A5552]">
            Whether we are evaluating microcrystal spicule serums from REVOLVE, bio-identical ceramide restoratives from NOTINO Europe, Cindy Crawford's melon stem cell elixirs on OnBuy, or K-beauty cushions from Amorepacific, our mission is unwavering: empower readers with forensic clarity and direct access to genuine merchant deals.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-[#FFFFFF] border border-[#EFE8DA] shadow-xs">
          <h2 className="text-2xl font-bold text-[#1A1A1A] font-serif mb-4 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#3D7055]" />
            <span>Our 4-Stage Forensic Testing Standard</span>
          </h2>
          <ul className="space-y-4 text-[#5A5552]">
            <li className="flex items-start gap-3">
              <span className="font-bold text-[#A4895C] shrink-0 font-mono">1. Active Ingredient Forensics:</span>
              <span>We audit published dermatological literature (PubMed, clinical trials) to determine whether claimed actives (e.g., Docosanol 10%, Urea 10%, French cantaloupe SOD, Micro-spicules) possess genuine, peer-reviewed clinical efficacy.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-bold text-[#A4895C] shrink-0 font-mono">2. Formulation Purity & Safety:</span>
              <span>We verify absence of toxic contaminants, assess comedogenicity, check pH stability, and ensure formulas are suitable for delicate skin and scalp barriers.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-bold text-[#A4895C] shrink-0 font-mono">3. Real-World Sensorial Testing:</span>
              <span>We evaluate absorption speed, weight, fragrance nuance, and practical daily wearability across diverse skin tones and skin types.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-bold text-[#A4895C] shrink-0 font-mono">4. Direct Pricing & Merchant Verification:</span>
              <span>We track real-time pricing across authorized international retailers (CJ Affiliate, Revolve, Notino, OnBuy, Amore Mall, Macy's, Wayfair, Woot) to ensure readers secure genuine stock at authentic discounts.</span>
            </li>
          </ul>
        </div>

        <div className="p-8 rounded-3xl bg-[#FFFFFF] border border-[#EFE8DA] shadow-xs">
          <h2 className="text-2xl font-bold text-[#1A1A1A] font-serif mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-[#B85D6A]" />
            <span>Serving Global Beauty Connoisseurs</span>
          </h2>
          <p className="text-[#5A5552]">
            Capilorix proudly serves readers in the United States, United Kingdom, Canada, Australia, and European Union. Our editorial board curates products with international availability, verified merchant tracking, and transparent currency localization.
          </p>
        </div>
      </div>
    </div>
  );
}
