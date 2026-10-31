import React from 'react';
import { Lock } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4">
          <Lock className="w-3.5 h-3.5" />
          <span>User Data Protection</span>
        </div>
        <h1 className="text-4xl font-serif font-bold text-white mb-4">
          Privacy Policy
        </h1>
        <p className="text-sm text-slate-400">
          Last Updated: 2026 • Compliant with GDPR, CCPA & Global Privacy Regulations
        </p>
      </div>

      <div className="space-y-6 text-slate-300 text-sm leading-relaxed p-8 rounded-2xl bg-[#111420] border border-slate-800">
        <section>
          <h2 className="text-lg font-bold text-white font-serif mb-2">1. Overview</h2>
          <p>
            Capilorix ("we," "our," or "the Site") is committed to safeguarding visitor privacy. This Privacy Policy outlines what information is collected when you browse <strong>capilorix.store</strong> and how it is used.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white font-serif mb-2">2. Information We Collect</h2>
          <p className="mb-2">
            We do not require users to create accounts or submit sensitive financial information. Data collected is limited to:
          </p>
          <ul className="list-disc list-inside space-y-1 text-slate-400">
            <li>Voluntary communications when you submit an inquiry through our contact form.</li>
            <li>Standard, anonymized server log data (browser type, referral URL, page dwell time, device operating system).</li>
            <li>Interactive responses submitted during our diagnostic quiz (stored locally within your browser session).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white font-serif mb-2">3. Cookies & Affiliate Tracking Technologies</h2>
          <p>
            When you click an outbound link to one of our merchant partners (such as through CJ Affiliate), the merchant's network places a standard attribution tracking cookie on your device. These cookies contain zero personally identifiable information (PII) and serve solely to attribute sales to our publication. These cookies typically expire after 30 to 90 days.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white font-serif mb-2">4. Your Rights (GDPR & CCPA)</h2>
          <p>
            Depending on your jurisdiction, you have the right to request information on data we hold, request deletion, or opt out of non-essential tracking cookies via your browser preferences.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white font-serif mb-2">5. Contact Our Data Privacy Officer</h2>
          <p>
            For privacy inquiries or data rights requests, please contact: <code className="text-amber-300">privacy@capilorix.store</code>.
          </p>
        </section>
      </div>
    </div>
  );
}
