import React, { useState } from 'react';
import { X, Sparkles, Check, ArrowRight, RotateCcw, ExternalLink } from 'lucide-react';
import { products } from '../data/products';

export default function QuizModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [concern, setConcern] = useState('');
  const [preference, setPreference] = useState('');
  const [result, setResult] = useState(null);

  if (!isOpen) return null;

  const handleCalculateResult = (pref) => {
    setPreference(pref);
    
    // Smart recommendation logic
    let matchedProduct = products[0]; // Default ISEE Hair
    if (concern === 'thinning' && pref === 'device') {
      matchedProduct = products.find(p => p.id === 'capilorix-laser-cap') || products[1];
    } else if (concern === 'bumps') {
      matchedProduct = products.find(p => p.id === 'fab-ingrown-pads') || products[3];
    } else if (concern === 'scalp-dry') {
      matchedProduct = products.find(p => p.id === 'amore-beauty-box') || products[2];
    } else if (concern === 'vegan') {
      matchedProduct = products.find(p => p.id === 'stylevana-vegan-beauty') || products[4];
    } else {
      matchedProduct = products.find(p => p.id === 'isee-hair-mcap') || products[0];
    }

    setResult(matchedProduct);
    setStep(3);
  };

  const resetQuiz = () => {
    setStep(1);
    setConcern('');
    setPreference('');
    setResult(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl rounded-2xl bg-[#111420] border border-amber-500/30 shadow-2xl p-6 sm:p-8 overflow-hidden text-left">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Step 1: Concern */}
        {step === 1 && (
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-semibold mb-4 border border-amber-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Step 1 of 2 — Follicle Diagnosis</span>
            </div>
            <h3 className="text-2xl font-serif font-bold text-white mb-2">
              What is your primary hair or scalp priority?
            </h3>
            <p className="text-sm text-slate-400 mb-6">
              Our clinical matrix matches you with dermatologist-tested protocols.
            </p>

            <div className="space-y-3">
              {[
                { id: 'thinning', label: 'Thinning hair, receding hairline, or slow density regrowth' },
                { id: 'instant-volume', label: 'Instant volume, protective styling & natural glueless wigs' },
                { id: 'bumps', label: 'Ingrown hair bumps, razor irritation, or follicular clogged pores' },
                { id: 'scalp-dry', label: 'Dry scalp, depleted barrier & dehydrated roots' },
                { id: 'vegan', label: 'Clean herbal, organic & vegan scalp revitalization' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setConcern(item.id);
                    setStep(2);
                  }}
                  className="w-full p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-400/50 hover:bg-slate-800/80 transition-all text-left flex items-center justify-between group"
                >
                  <span className="text-sm font-medium text-slate-200 group-hover:text-amber-300">
                    {item.label}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Preference */}
        {step === 2 && (
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-semibold mb-4 border border-amber-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Step 2 of 2 — Treatment Modality</span>
            </div>
            <h3 className="text-2xl font-serif font-bold text-white mb-2">
              Which treatment approach do you prefer?
            </h3>
            <p className="text-sm text-slate-400 mb-6">
              Select whether you prefer hands-free technology, topical care, or instant wear solutions.
            </p>

            <div className="space-y-3">
              {[
                { id: 'device', label: 'Medical-grade devices (Laser Photobiomodulation / Tech)' },
                { id: 'wearable', label: 'Zero-damage instant glueless wear & protective solutions' },
                { id: 'topical', label: 'Topical clinical bio-actives (Peptides, AHA/BHA, Botanical Serums)' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleCalculateResult(item.id)}
                  className="w-full p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-400/50 hover:bg-slate-800/80 transition-all text-left flex items-center justify-between group"
                >
                  <span className="text-sm font-medium text-slate-200 group-hover:text-amber-300">
                    {item.label}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep(1)}
              className="mt-6 text-xs text-slate-400 hover:text-white flex items-center gap-1"
            >
              <span>← Back to Step 1</span>
            </button>
          </div>
        )}

        {/* Step 3: Result */}
        {step === 3 && result && (
          <div className="text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold mb-3 border border-emerald-500/30">
              <Check className="w-3.5 h-3.5" />
              <span>100% Clinical Match Found</span>
            </div>

            <h3 className="text-2xl font-serif font-bold text-white mb-2">
              Your Recommended Protocol
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Based on your answers, our algorithm pinpointed this top-ranked solution:
            </p>

            <div className="p-5 rounded-2xl bg-slate-900 border border-amber-500/30 text-left mb-6">
              <div className="flex items-center gap-4">
                <img
                  src={result.image}
                  alt={result.name}
                  className="w-20 h-20 rounded-xl object-cover border border-slate-700 shrink-0"
                />
                <div>
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wide block">
                    {result.brand}
                  </span>
                  <h4 className="font-bold text-white text-base leading-snug">
                    {result.name}
                  </h4>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-xl font-black text-amber-300 font-serif">
                      ${result.price.toFixed(2)}
                    </span>
                    {result.originalPrice > result.price && (
                      <span className="text-xs text-slate-500 line-through">
                        ${result.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <p className="mt-4 text-xs text-slate-300 leading-relaxed border-t border-slate-800 pt-3">
                {result.verdict}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={result.affiliateUrl}
                target="_blank"
                rel="sponsored nofollow noopener"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-lg flex items-center justify-center gap-2"
              >
                <span>Claim Verified Deal</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={resetQuiz}
                className="w-full sm:w-auto px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Quiz</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
