import React from 'react';
import { FileText, AlertTriangle } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4">
          <FileText className="w-3.5 h-3.5" />
          <span>Legal Agreement</span>
        </div>
        <h1 className="text-4xl font-serif font-bold text-white mb-4">
          Terms of Service & Medical Disclaimer
        </h1>
        <p className="text-sm text-slate-400">
          Last Updated: 2026 • Please read carefully before using this site.
        </p>
      </div>

      <div className="space-y-6 text-slate-300 text-sm leading-relaxed p-8 rounded-2xl bg-[#111420] border border-slate-800">
        <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <h2 className="text-sm font-bold text-amber-300 mb-1">
              Important Medical Disclaimer
            </h2>
            <p className="text-xs text-slate-300">
              The content published on Capilorix (capilorix.store) is for educational and informational purposes only. It is not intended as medical advice, clinical diagnosis, or individualized treatment plans. Always consult a licensed board-certified dermatologist, trichologist, or qualified physician before initiating any medical device, dietary supplement, or clinical topical regimen.
            </p>
          </div>
        </div>

        <section>
          <h2 className="text-lg font-bold text-white font-serif mb-2">1. Acceptance of Terms</h2>
          <p>
            By accessing or browsing <strong>capilorix.store</strong>, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white font-serif mb-2">2. Intellectual Property & Copyright</h2>
          <p>
            All editorial reviews, comparison frameworks, graphics, logos, and custom code on this site are the intellectual property of Capilorix, protected by international copyright laws. Reproduction without prior written authorization is strictly prohibited.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white font-serif mb-2">3. Accuracy of Retail Pricing & Stock</h2>
          <p>
            While we strive to keep all pricing, coupon codes, and inventory statuses accurate and current, prices and availability are subject to change by third-party merchants (including Stylevana, ISEE Hair, Amore Mall, and First Aid Beauty) without notice. The price displayed on the checkout page of the respective merchant at time of purchase is the binding price.
          </p>
        </section>
      </div>
    </div>
  );
}
