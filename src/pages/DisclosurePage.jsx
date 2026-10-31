import React from 'react';
import { ShieldCheck, Info, DollarSign, CheckCircle } from 'lucide-react';

export default function DisclosurePage() {
  return (
    <div className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Full Legal Compliance</span>
        </div>
        <h1 className="text-4xl font-serif font-bold text-white mb-4">
          Affiliate & Commercial Disclosure
        </h1>
        <p className="text-sm text-slate-400">
          Last Updated: 2026 • Compliant with Federal Trade Commission (FTC) 16 CFR § 255
        </p>
      </div>

      <div className="space-y-6 text-slate-300 text-sm leading-relaxed">
        <div className="p-6 rounded-2xl bg-[#111420] border border-amber-500/30">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h2 className="text-base font-bold text-white mb-2">
                Executive Disclosure Statement
              </h2>
              <p>
                In compliance with FTC guidelines, please assume that any link on <strong>Capilorix (capilorix.store)</strong> that directs you to an external merchant website is an affiliate tracking link. When you click these links and complete a purchase, Capilorix may earn a commission from the merchant partner.
              </p>
              <p className="mt-2 text-amber-300 font-semibold">
                Crucially: This commission comes at ZERO additional cost to you. In many instances, using our verified promo links and discount codes provides exclusive discounts and savings not available to the public.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
          <h2 className="text-lg font-bold text-white font-serif mb-3">
            Our Affiliate Network Partnerships
          </h2>
          <p className="mb-3">
            Capilorix operates as an authorized digital publisher across reputable affiliate marketing networks, including but not limited to:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-slate-400">
            <li><strong>CJ Affiliate (Commission Junction)</strong>: Partnering with premier retail merchants such as ISEE Hair, Amore Mall, Stylevana, First Aid Beauty, and leading personal care brands.</li>
            <li><strong>Direct-to-Consumer (DTC) Brand Programs</strong>: Specialized biotech labs, medical device manufacturers, and follicular health laboratories.</li>
            <li><strong>Retail Affiliate Networks</strong>: Major authorized distributor channels.</li>
          </ul>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
          <h2 className="text-lg font-bold text-white font-serif mb-3">
            Editorial Independence & How We Test
          </h2>
          <p className="mb-3">
            Affiliate compensation does not determine our product evaluations, comparison matrix rankings, or editorial scores. We frequently review and benchmark products with which we have no financial association if our readers benefit from the analysis.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-xs">
            <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-950 border border-slate-800">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>We never accept payment to write a favorable review</span>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-950 border border-slate-800">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>All testing adheres to objective clinical benchmarks</span>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-950 border border-slate-800">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Cons and limitations are transparently disclosed</span>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-950 border border-slate-800">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Links use rel="sponsored nofollow" for Google compliance</span>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
          <h2 className="text-lg font-bold text-white font-serif mb-3">
            Questions Regarding Our Commercial Policies
          </h2>
          <p>
            If you have questions regarding our commercial affiliations, merchant tracking cookies, or editorial integrity standards, please visit our <a href="#" className="text-amber-400 underline">Contact Page</a> or reach our compliance team directly at <code className="text-amber-300">compliance@capilorix.store</code>.
          </p>
        </div>
      </div>
    </div>
  );
}
