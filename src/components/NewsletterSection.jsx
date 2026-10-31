import React, { useState } from 'react';
import { Mail, CheckCircle2, Sparkles, ShieldCheck } from 'lucide-react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="py-16 bg-[#FAF8F5] border-b border-[#EFE8DA] text-[#1A1A1A]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-[#FFFFFF] via-[#FDFBF7] to-[#F5EFE6] border border-[#D4C3A3] p-8 sm:p-12 shadow-xl overflow-hidden text-center">
          
          {/* Subtle champagne radial accents */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#F6EAE8]/40 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#EFE8DA]/40 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#D4C3A3] text-xs font-semibold uppercase tracking-wider text-[#8A7147]">
              <Sparkles className="w-3.5 h-3.5 text-[#A4895C]" />
              <span>VIP Editorial Access</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#1A1A1A] tracking-tight">
              The Capilorix Beauty Dispatch
            </h2>

            <p className="text-sm sm:text-base text-[#5A5552] font-light leading-relaxed">
              Join 45,000+ discerning readers across the USA, UK, Canada, and Australia receiving our Sunday morning forensic ingredient breakdowns, flash merchant discount alerts, and lab reviews.
            </p>

            {/* Newsletter Form or Success State */}
            {subscribed ? (
              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#3D7055]/30 text-[#3D7055] inline-flex items-center gap-2 text-sm font-semibold animate-fade-in">
                <CheckCircle2 className="w-5 h-5 text-[#3D7055]" />
                <span>Welcome to the Dispatch! Your first Sunday morning forensic analysis is on its way.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="pt-2 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <div className="relative flex-1">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your private email address..."
                    className="w-full pl-11 pr-4 py-3.5 rounded-full bg-[#FFFFFF] border border-[#EFE8DA] text-sm text-[#1A1A1A] placeholder-[#8A847F] focus:outline-none focus:border-[#A4895C] shadow-inner"
                  />
                  <Mail className="w-4 h-4 text-[#8A847F] absolute left-4 top-1/2 -translate-y-1/2" />
                </div>

                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-full bg-[#1A1A1A] hover:bg-[#A4895C] text-[#FDFBF7] text-sm font-bold tracking-wide transition-all shadow-md shrink-0"
                >
                  Join VIP List
                </button>
              </form>
            )}

            <div className="pt-3 flex items-center justify-center gap-2 text-xs text-[#8A847F]">
              <ShieldCheck className="w-4 h-4 text-[#3D7055]" />
              <span>Zero spam. Unsubscribe with 1-click anytime. No sponsored sales pitches.</span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
