import React from 'react';
import { Lock, ShieldCheck } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left bg-[#FAF8F5] text-[#1A1A1A]">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#D4C3A3] text-[#8A7147] text-xs font-semibold uppercase tracking-wider mb-4">
          <Lock className="w-3.5 h-3.5 text-[#A4895C]" />
          <span>User Data Protection</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif font-black text-[#1A1A1A] mb-4">
          Privacy Policy
        </h1>
        <p className="text-sm text-[#8A847F]">
          Last Updated: 2026 • Compliant with GDPR, CCPA &amp; Global Privacy Regulations
        </p>
      </div>

      <div className="space-y-6 text-[#2D2D2A] text-sm leading-relaxed p-8 rounded-3xl bg-[#FFFFFF] border border-[#EFE8DA] shadow-xs">
        <section>
          <h2 className="text-xl font-bold text-[#1A1A1A] font-serif mb-2">1. Overview</h2>
          <p className="text-[#5A5552]">
            Capilorix ("we," "our," or "the Site") is committed to safeguarding visitor privacy. This Privacy Policy outlines what information is collected when you browse <strong>capilorix.store</strong> and how it is protected.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#1A1A1A] font-serif mb-2">2. Information We Collect</h2>
          <p className="mb-2 text-[#5A5552]">
            We do not require users to register accounts or submit sensitive financial credentials. Data collected is strictly limited to:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-[#5A5552]">
            <li>Voluntary communications when you submit an inquiry through our contact concierge.</li>
            <li>Voluntary email submissions to "The Capilorix Beauty Dispatch" VIP newsletter.</li>
            <li>Standard, anonymized analytical log data (browser version, referring URL, dwell time, device type).</li>
            <li>Interactive responses submitted during our beauty diagnostic quiz (stored locally in browser session storage).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#1A1A1A] font-serif mb-2">3. Cookies &amp; Affiliate Attribution Tracking</h2>
          <p className="text-[#5A5552]">
            When you click an outbound link to one of our merchant partners (such as through CJ Affiliate, REVOLVE, NOTINO, OnBuy, or Amore Mall), the merchant's network places a standard attribution tracking cookie on your device. These cookies contain zero personally identifiable information (PII) and serve solely to attribute sales to our publication. These cookies typically expire after 30 to 90 days.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#1A1A1A] font-serif mb-2">4. Your International Rights (GDPR &amp; CCPA)</h2>
          <p className="text-[#5A5552]">
            Depending on your jurisdiction (including the EU, UK, Canada, Australia, and California), you maintain the right to request access to any personal data we hold, request data deletion, or opt out of non-essential cookies via your browser settings. To exercise your rights, contact us at <strong>privacy@capilorix.store</strong>.
          </p>
        </section>
      </div>
    </div>
  );
}
