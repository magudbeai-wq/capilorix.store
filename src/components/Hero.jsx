import React from 'react';
import { Award, CheckCircle2, ShieldCheck, Sparkles, TrendingUp, ChevronRight } from 'lucide-react';

export default function Hero({ onExplorePicks, onOpenQuiz }) {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 border-b border-slate-800/80">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-6 animate-pulse">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>2026 Clinical Benchmark & Buyer's Guide</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.15]">
            Scientifically Proven <br />
            <span className="gradient-gold">Hair Restoration</span> & Scalp Tech.
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed font-light">
            We independently test, analyze, and benchmark medical-grade laser caps, follicular bio-serums, and glueless human hair solutions so you never waste money on unproven gimmicks.
          </p>

          {/* Dual CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onExplorePicks}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-base shadow-xl shadow-amber-500/20 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Explore #1 Top Picks</span>
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={onOpenQuiz}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-700/80 font-semibold text-base transition-colors flex items-center justify-center gap-2"
            >
              <span>Take Scalp Diagnosis Quiz</span>
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="mt-12 pt-8 border-t border-slate-800/60 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span className="text-xs font-medium text-slate-300">FDA-Cleared Tech Only</span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
              <span className="text-xs font-medium text-slate-300">100% Unbiased Testing</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Award className="w-5 h-5 text-sky-400 shrink-0" />
              <span className="text-xs font-medium text-slate-300">Dermatologist Reviewed</span>
            </div>
            <div className="flex items-center gap-2.5">
              <TrendingUp className="w-5 h-5 text-purple-400 shrink-0" />
              <span className="text-xs font-medium text-slate-300">Verified Exclusive Deals</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
