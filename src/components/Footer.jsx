import React from 'react';
import { Sparkles, ShieldCheck, Heart, Award, Globe, ExternalLink } from 'lucide-react';
import { mainCategories } from '../data/categories';

export default function Footer({ navigateTo, onOpenQuiz }) {
  const handleNav = (path) => {
    if (navigateTo) {
      navigateTo(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#1A1A1A] text-[#FAF8F5] border-t border-[#2D2D2A] text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#2D2D2A]">
          
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <span className="text-3xl font-serif font-black tracking-widest text-white block">
                CAPILORIX<span className="text-[#D4C3A3]">.</span>
              </span>
              <span className="text-[10px] tracking-[0.25em] text-[#D4C3A3] uppercase font-semibold block mt-1">
                Discover Better Beauty. Make Smarter Choices.
              </span>
            </div>

            <p className="text-xs text-[#A8A29E] leading-relaxed max-w-sm font-light">
              Capilorix is an authoritative international beauty publication, clinical dermal review platform, and curated affiliate shopping directory serving readers across the USA, UK, Canada, and Australia.
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs text-[#D4C3A3] pt-1">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#D4C3A3]" />
                Independent Dermal Benchmarks
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-[#D4C3A3]" />
                US • UK • CA • AU • EU
              </span>
            </div>
          </div>

          {/* Column 1: The 8 Main Departments */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono">
              The 8 Departments
            </h3>
            <ul className="space-y-2 text-xs text-[#A8A29E]">
              {mainCategories.map((c) => (
                <li key={c.slug}>
                  <button onClick={() => handleNav(`/${c.slug}`)} className="hover:text-white transition-colors">
                    {c.name}
                  </button>
                </li>
              ))}
              <li className="pt-1">
                <button onClick={() => handleNav('/products')} className="text-[#D4C3A3] hover:underline font-semibold">
                  All 29 Products Directory &rarr;
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Editorial & Reviews */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono">
              Editorial &amp; Benchmarks
            </h3>
            <ul className="space-y-2.5 text-xs text-[#A8A29E]">
              <li>
                <button onClick={() => handleNav('/reviews')} className="hover:text-white transition-colors">
                  Editorial Review Archive (29 Posts)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/comparisons')} className="hover:text-white transition-colors">
                  Side-by-Side Comparison Matrix
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/guides')} className="hover:text-white transition-colors">
                  Forensic Ingredient Buying Guides
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/how-we-review')} className="hover:text-white transition-colors">
                  How We Review &amp; Test
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/editorial-policy')} className="hover:text-white transition-colors">
                  Editorial &amp; Corrections Policy
                </button>
              </li>
              <li>
                <button onClick={onOpenQuiz} className="hover:text-white transition-colors text-[#E3B8B8] font-semibold">
                  Skin Diagnostic Quiz →
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Trust & Legal */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono">
              Trust &amp; Legal
            </h3>
            <ul className="space-y-2.5 text-xs text-[#A8A29E]">
              <li>
                <button onClick={() => handleNav('/about')} className="hover:text-white transition-colors">
                  About Capilorix
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/affiliate-disclosure')} className="hover:text-white transition-colors">
                  FTC Affiliate Disclosure
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/privacy-policy')} className="hover:text-white transition-colors">
                  Privacy Policy (GDPR/CCPA)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/terms')} className="hover:text-white transition-colors">
                  Terms of Service &amp; Disclaimer
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/contact')} className="hover:text-white transition-colors">
                  Contact Editorial Board
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/admin')} className="hover:text-white transition-colors text-[#D4C3A3] font-mono flex items-center gap-1.5 pt-1">
                  <span>Editorial Portal (Admin)</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Transparent FTC Affiliate Disclosure & Compliance Banner */}
        <div className="py-6 border-b border-[#2D2D2A] text-xs text-[#78716C] leading-relaxed space-y-2">
          <p>
            <strong className="text-[#A8A29E]">FTC Affiliate &amp; Commercial Disclosure:</strong> Capilorix participates in affiliate marketing programs including CJ Affiliate (Commission Junction) and direct merchant programs. When you click links to products from retailers such as REVOLVE, NOTINO Europe, OnBuy UK/DE/FR/IE, Amore Mall, Macy's, Wayfair, and Woot! / Amazon and make a purchase, we may earn an affiliate commission at zero additional cost to you. Pricing, stock, and promo codes are verified at publication and subject to real-time merchant change.
          </p>
          <p>
            <strong className="text-[#A8A29E]">Medical &amp; FDA Disclaimer:</strong> The content published on Capilorix is intended exclusively for educational, journalistic, and informational purposes. Reviews, benchmarks, and ingredient analyses are not intended as medical advice, clinical diagnosis, or treatment for dermatological disease. Consult a board-certified dermatologist or healthcare provider before initiating new topical regimens.
          </p>
        </div>

        {/* Bottom Copyright & Masthead */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#78716C]">
          <div>
            © {new Date().getFullYear()} Capilorix Inc. All rights reserved. Discover Better Beauty. Make Smarter Choices.
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => handleNav('/privacy-policy')} className="hover:text-[#A8A29E] transition-colors">Privacy</button>
            <button onClick={() => handleNav('/terms')} className="hover:text-[#A8A29E] transition-colors">Terms</button>
            <button onClick={() => handleNav('/affiliate-disclosure')} className="hover:text-[#A8A29E] transition-colors">Disclosures</button>
            <button onClick={() => handleNav('/contact')} className="hover:text-[#A8A29E] transition-colors">Contact</button>
          </div>
        </div>

      </div>
    </footer>
  );
}
