import React from 'react';
import { Sparkles, Shield, Heart } from 'lucide-react';

export default function Footer({ setActivePage, openQuiz }) {
  const scrollToTop = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#090b10] border-t border-slate-800 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
                <Sparkles className="w-5 h-5 text-slate-950" />
              </div>
              <span className="text-2xl font-serif font-bold text-white tracking-tight">
                CAPILORIX<span className="text-amber-400">.</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Capilorix is an authoritative digital publication and comparison benchmark dedicated to follicular science, clinical scalp rejuvenation, and luxury grooming innovations.
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-amber-400" />
                FTC Compliant Publisher
              </span>
              <span>•</span>
              <span>Independent Laboratory Analysis</span>
            </div>
          </div>

          {/* Column 1: Review Categories */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Review Verticals
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => scrollToTop('home')} className="hover:text-amber-400 transition-colors">
                  FDA-Cleared Laser Caps
                </button>
              </li>
              <li>
                <button onClick={() => scrollToTop('home')} className="hover:text-amber-400 transition-colors">
                  Glueless HD Lace Wigs
                </button>
              </li>
              <li>
                <button onClick={() => scrollToTop('home')} className="hover:text-amber-400 transition-colors">
                  AHA/BHA Ingrown Pads
                </button>
              </li>
              <li>
                <button onClick={() => scrollToTop('home')} className="hover:text-amber-400 transition-colors">
                  Korean Scalp Serums
                </button>
              </li>
              <li>
                <button onClick={openQuiz} className="text-amber-400 font-semibold hover:underline">
                  Take Follicle Quiz →
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Legal & Trust */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Editorial & Trust
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => scrollToTop('about')} className="hover:text-amber-400 transition-colors">
                  About Our Lab & Team
                </button>
              </li>
              <li>
                <button onClick={() => scrollToTop('disclosure')} className="hover:text-amber-400 transition-colors">
                  FTC Affiliate Disclosure
                </button>
              </li>
              <li>
                <button onClick={() => scrollToTop('privacy')} className="hover:text-amber-400 transition-colors">
                  Privacy Policy (GDPR)
                </button>
              </li>
              <li>
                <button onClick={() => scrollToTop('terms')} className="hover:text-amber-400 transition-colors">
                  Terms & Medical Disclaimer
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Network & Contact */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Partnerships
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => scrollToTop('contact')} className="hover:text-amber-400 transition-colors">
                  Advertiser Inquiries
                </button>
              </li>
              <li>
                <span className="text-slate-500 block">CJ Publisher ID:</span>
                <span className="text-amber-300 font-mono text-[11px]">Active Verified</span>
              </li>
              <li>
                <span className="text-slate-500 block mt-2">Editorial Desk:</span>
                <span className="text-slate-300 font-mono text-[11px]">editor@capilorix.store</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Medical Disclaimer & Copyright */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 space-y-4">
          <p className="text-[11px] text-slate-500 leading-relaxed text-justify">
            <strong>Medical & FDA Disclaimer:</strong> The information provided on Capilorix (capilorix.store) is intended for informational and educational purposes only. Products, statements, and equipment reviewed on this site have not all been evaluated by the Food and Drug Administration (FDA) to diagnose, treat, cure, or prevent any medical condition. Always seek the advice of your physician, dermatologist, or trichologist regarding any medical hair loss concerns.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4 pt-2">
            <span>© 2026 Capilorix™ (capilorix.store). All rights reserved worldwide.</span>
            <span className="text-slate-600 text-[11px]">
              Engineered with Edge Performance for Ultra-Fast Global Delivery
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
