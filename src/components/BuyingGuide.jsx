import React, { useState } from 'react';
import { BookOpen, HelpCircle, ChevronDown, ChevronUp, CheckCircle, ShieldAlert } from 'lucide-react';

export default function BuyingGuide() {
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      q: "Does Red Light Laser Therapy (LLLT) actually stimulate hair growth?",
      a: "Yes. Low-Level Laser Therapy (LLLT) at 650nm wavelength is cleared by the FDA for androgenetic alopecia. It works by photobiomodulation: the laser light penetrates into the dermal papilla, stimulating mitochondrial ATP production, improving micro-capillary circulation, and extending the anagen (growth) cycle of the hair follicle."
    },
    {
      q: "What makes glueless HD lace wigs better for natural hair follicles?",
      a: "Traditional lace wigs require toxic adhesive glues or alcohol-based solvents that clog scalp pores and cause traction alopecia along the edges. Modern 3D ergonomic glueless caps (like ISEE Hair M-Cap) use anti-slip silicone tension bands and pre-cut 9x6 HD lace, completely eliminating the need for glue while keeping your native hair follicles protected."
    },
    {
      q: "How can I prevent ingrown hair bumps and inflamed follicles?",
      a: "Follicular bumps typically occur when dead skin cells trap growing hairs inside the pore lining. Dermatologists recommend combining a BHA (such as 2% Salicylic Acid) to dissolve deep sebum with an AHA (such as Glycolic Acid) to exfoliate surface dead skin. Products like First Aid Beauty Ingrown Hair Pads provide this exact clinical combination."
    },
    {
      q: "Are the discounts and promo codes on Capilorix verified?",
      a: "Yes. Our team works directly with official merchant affiliate networks (including CJ Affiliate and direct brand partnerships). Every coupon code, promotional discount, and bundled package displayed on Capilorix is hand-verified weekly."
    }
  ];

  return (
    <section className="py-16 bg-[#0c0e15] border-t border-slate-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Educational Authority</span>
          </div>
          <h2 className="text-3xl font-serif font-bold text-white">
            The Science of Hair & Scalp Restoration
          </h2>
          <p className="mt-3 text-sm text-slate-300">
            Understand how clinical technologies work before investing your hard-earned money.
          </p>
        </div>

        {/* 3 Pillars of Efficacy */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center mb-4">
              01
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Micro-Capillary Flow</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Without adequate blood flow, hair follicles shrink due to DHT buildup. 650nm laser photobiomodulation reactivates cellular respiration at the cellular root.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center mb-4">
              02
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Dermal Exfoliation</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Sebum plugs and keratin buildup block hair shafts from emerging smoothly. Gentle chemical exfoliants (AHA/BHA) maintain an optimal environment for follicle density.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center mb-4">
              03
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Protective Glueless Styling</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Avoiding chemical adhesives prevents traction alopecia. 100% human hair virgin solutions allow immediate aesthetic confidence while natural hair recovers beneath.
            </p>
          </div>
        </div>

        {/* FAQ Accordion (For Rich Google FAQ Snippets) */}
        <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle className="w-5 h-5 text-amber-400" />
            <h3 className="text-xl font-bold text-white font-serif">
              Frequently Asked Clinical Questions
            </h3>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="rounded-xl border border-slate-800 bg-slate-950/60 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                  className="w-full p-4 text-left flex items-center justify-between font-medium text-sm text-slate-200 hover:text-amber-300 transition-colors"
                >
                  <span>{faq.q}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-4 h-4 text-amber-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-4 pb-4 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
