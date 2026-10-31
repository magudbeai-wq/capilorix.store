import React from 'react';
import { Award, ShieldCheck, Microscope, Users, Sparkles } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4">
          <Microscope className="w-3.5 h-3.5" />
          <span>Our Editorial Mission</span>
        </div>
        <h1 className="text-4xl font-serif font-bold text-white mb-4">
          About Capilorix™
        </h1>
        <p className="text-base text-slate-300 max-w-2xl mx-auto">
          Dedicated to demystifying follicular science, clinical hair restoration, and dermatological hair health with rigorous testing and honest reviews.
        </p>
      </div>

      <div className="space-y-8 text-slate-300 text-sm leading-relaxed">
        <div className="p-8 rounded-2xl bg-[#111420] border border-slate-800">
          <h2 className="text-xl font-bold text-white font-serif mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span>Why Capilorix Was Founded</span>
          </h2>
          <p className="mb-4">
            The hair loss and restoration market is flooded with deceptive advertising, unproven "miracle" oils, and predatory pricing. <strong>Capilorix (capilorix.store)</strong> was built to be the antidote: a definitive, lab-disciplined publication where clinical efficacy, verifiable photon metrics, and ingredient safety are held to the highest standard.
          </p>
          <p>
            Whether evaluating a \$1,000 FDA-cleared low-level laser cap, glueless virgin human hair systems, or medical-grade AHA/BHA chemical exfoliants, our recommendations prioritize real consumer outcomes above all else.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-[#111420] border border-slate-800">
          <h2 className="text-xl font-bold text-white font-serif mb-4 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>Our 4-Stage Benchmark Testing Protocol</span>
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="font-bold text-amber-400 shrink-0">1. Verification of Clinical Evidence:</span>
              <span>We audit published peer-reviewed studies (PubMed, clinical trials) to determine whether claimed active ingredients or laser wavelengths (e.g. 650nm) possess genuine therapeutic potential.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-bold text-amber-400 shrink-0">2. Build Quality & Safety Testing:</span>
              <span>We evaluate diode density, thermal safety, ergonomic cap comfort, hypoallergenic materials, and regulatory compliance (FDA 510(k) clearances).</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-bold text-amber-400 shrink-0">3. Real-World User Usability:</span>
              <span>We assess practical daily adherence: Is the device comfortable? Does a glueless wig truly stay secure without harmful adhesives? Are serums lightweight and grease-free?</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-bold text-amber-400 shrink-0">4. Value & Warranty Analysis:</span>
              <span>We evaluate consumer guarantees, return policies, and transparent pricing to ensure readers receive maximum return on their wellness investments.</span>
            </li>
          </ul>
        </div>

        <div className="p-8 rounded-2xl bg-[#111420] border border-slate-800">
          <h2 className="text-xl font-bold text-white font-serif mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-sky-400" />
            <span>Editorial Independence Guarantee</span>
          </h2>
          <p className="mb-3">
            Capilorix maintains strict editorial autonomy. While we participate in vetted affiliate partnerships (including CJ Affiliate, direct brand networks, and retail partners), commercial relationships never dictate our clinical verdicts or rating scores.
          </p>
          <p>
            Brands cannot buy a higher rating, remove legitimate critical observations, or influence our testing conclusions.
          </p>
        </div>
      </div>
    </div>
  );
}
