import React from 'react';
import { FileText, AlertTriangle } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left bg-[#FAF8F5] text-[#1A1A1A]">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#D4C3A3] text-[#8A7147] text-xs font-semibold uppercase tracking-wider mb-4">
          <FileText className="w-3.5 h-3.5 text-[#A4895C]" />
          <span>Legal Agreement</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif font-black text-[#1A1A1A] mb-4">
          Terms of Service &amp; Medical Disclaimer
        </h1>
        <p className="text-sm text-[#8A847F]">
          Last Updated: 2026 • Please read carefully before using this site.
        </p>
      </div>

      <div className="space-y-6 text-[#2D2D2A] text-sm leading-relaxed p-8 rounded-3xl bg-[#FFFFFF] border border-[#EFE8DA] shadow-xs">
        <div className="p-5 rounded-2xl bg-[#F6EAE8] border border-[#E3B8B8] flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-[#B85D6A] shrink-0 mt-0.5" />
          <div>
            <h2 className="text-sm font-bold text-[#8C3D49] mb-1">
              Important Medical &amp; Dermatological Disclaimer
            </h2>
            <p className="text-xs text-[#5A5552] leading-relaxed">
              The content published on Capilorix (capilorix.store) is for educational and journalistic purposes only. It is not intended as medical advice, clinical diagnosis, or individualized treatment plans. Always consult a licensed board-certified dermatologist, physician, or trichologist before initiating any new topical treatments or medical regimens.
            </p>
          </div>
        </div>

        <section>
          <h2 className="text-xl font-bold text-[#1A1A1A] font-serif mb-2">1. Acceptance of Terms</h2>
          <p className="text-[#5A5552]">
            By accessing or browsing <strong>capilorix.store</strong>, you agree to be bound by these Terms of Service and all applicable international laws. If you do not agree with any of these terms, you are prohibited from using this site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#1A1A1A] font-serif mb-2">2. Intellectual Property &amp; Copyright</h2>
          <p className="text-[#5A5552]">
            All editorial reviews, articles, comparison frameworks, graphics, logos, and custom code on this site are the intellectual property of Capilorix, protected by international copyright laws. Reproduction without prior written authorization is strictly prohibited.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#1A1A1A] font-serif mb-2">3. Accuracy of Merchant Pricing &amp; Stock</h2>
          <p className="text-[#5A5552]">
            While we strive to keep all pricing, coupon codes, and inventory statuses accurate and current, prices and availability are subject to change by third-party retailers without notice. The final binding price is the price displayed on the checkout page of the respective partner retailer at the time of purchase.
          </p>
        </section>
      </div>
    </div>
  );
}
