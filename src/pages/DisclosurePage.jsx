import React from 'react';
import { ShieldCheck, Info, DollarSign, CheckCircle } from 'lucide-react';

export default function DisclosurePage() {
  return (
    <div className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left bg-[#FAF8F5] text-[#1A1A1A]">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#D4C3A3] text-[#8A7147] text-xs font-semibold uppercase tracking-wider mb-4">
          <ShieldCheck className="w-3.5 h-3.5 text-[#3D7055]" />
          <span>Full Legal Compliance</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif font-black text-[#1A1A1A] mb-4">
          Affiliate &amp; Commercial Disclosure
        </h1>
        <p className="text-sm text-[#8A847F]">
          Last Updated: 2026 • Compliant with Federal Trade Commission (FTC) 16 CFR § 255
        </p>
      </div>

      <div className="space-y-6 text-[#2D2D2A] text-sm leading-relaxed">
        <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] border border-[#D4C3A3] shadow-xs">
          <div className="flex items-start gap-4">
            <Info className="w-6 h-6 text-[#A4895C] shrink-0 mt-1" />
            <div>
              <h2 className="text-lg font-bold text-[#1A1A1A] font-serif mb-2">
                Executive Disclosure Statement
              </h2>
              <p className="text-[#5A5552]">
                In compliance with FTC guidelines, please assume that any link on <strong>Capilorix (capilorix.store)</strong> that directs you to an external merchant website is an affiliate tracking link. When you click these links and complete a purchase, Capilorix may earn a commission from the merchant partner.
              </p>
              <p className="mt-3 text-[#8A7147] font-semibold">
                Crucially: This commission comes at ZERO additional cost to you. In many instances, using our verified promo links and discount codes provides exclusive discounts and savings negotiated with our retail partners.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] border border-[#EFE8DA] shadow-xs">
          <h2 className="text-xl font-bold text-[#1A1A1A] font-serif mb-3">
            Our Verified Affiliate Network Partnerships
          </h2>
          <p className="mb-3 text-[#5A5552]">
            Capilorix operates as an authorized digital publisher across reputable affiliate marketing networks, including:
          </p>
          <ul className="list-disc list-inside space-y-2 text-[#5A5552]">
            <li><strong>CJ Affiliate (Commission Junction)</strong>: Partnering with premier retail merchants such as REVOLVE, NOTINO Europe, OnBuy (UK, DE, FR, IE), Amore Mall (Amorepacific luxury beauty), Macy's, Wayfair North America, and Woot! / Amazon.</li>
            <li><strong>Direct Merchant Programs</strong>: Authorized European and American beauty laboratories, dermatological skincare brands, and trichology specialists.</li>
          </ul>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] border border-[#EFE8DA] shadow-xs">
          <h2 className="text-xl font-bold text-[#1A1A1A] font-serif mb-3">
            Editorial Independence &amp; How We Test
          </h2>
          <p className="mb-4 text-[#5A5552]">
            Affiliate compensation does not determine our product evaluations, comparison matrix rankings, or editorial scores. We frequently review and benchmark products with which we have no financial association if our readers benefit from the analysis.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-2 p-3 rounded-xl bg-[#FAF8F5] border border-[#EFE8DA]">
              <CheckCircle className="w-4 h-4 text-[#3D7055] shrink-0" />
              <span>Independent Laboratory Testing</span>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-xl bg-[#FAF8F5] border border-[#EFE8DA]">
              <CheckCircle className="w-4 h-4 text-[#3D7055] shrink-0" />
              <span>No Sponsored Positive Reviews</span>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-xl bg-[#FAF8F5] border border-[#EFE8DA]">
              <CheckCircle className="w-4 h-4 text-[#3D7055] shrink-0" />
              <span>Transparent Price &amp; Stock Audits</span>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-xl bg-[#FAF8F5] border border-[#EFE8DA]">
              <CheckCircle className="w-4 h-4 text-[#3D7055] shrink-0" />
              <span>Zero Fake Testimonials or Staged Ratings</span>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] border border-[#EFE8DA] shadow-xs">
          <h2 className="text-xl font-bold text-[#1A1A1A] font-serif mb-3">
            Medical &amp; FDA Disclaimer
          </h2>
          <p className="text-[#5A5552]">
            The statements and reviews on this website have not been evaluated by the Food and Drug Administration (FDA) or European Medicines Agency (EMA). Products reviewed on Capilorix are not intended to diagnose, treat, cure, or prevent any medical condition. Always consult a licensed healthcare professional before beginning new skincare or wellness treatments.
          </p>
        </div>
      </div>
    </div>
  );
}
