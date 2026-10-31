import React, { useState } from 'react';
import { X, Sparkles, Check, ArrowRight, RotateCcw, ExternalLink, BookOpen, Star } from 'lucide-react';
import { products } from '../data/products';

export default function QuizModal({ isOpen, onClose, navigateTo }) {
  const [step, setStep] = useState(1);
  const [concern, setConcern] = useState('');
  const [preference, setPreference] = useState('');
  const [result, setResult] = useState(null);

  if (!isOpen) return null;

  const handleCalculateResult = (pref) => {
    setPreference(pref);
    
    // Smart recommendation logic tailored to 2026 catalog
    let matchedProduct = products[0]; // Default Rael Microcrystal
    if (concern === 'texture') {
      matchedProduct = products.find(p => p.id === 'revolve-rael-microcrystal-activated-pm-serum-2000') || products[0];
    } else if (concern === 'barrier') {
      matchedProduct = products.find(p => p.id === 'notino-beauty-formulas-ceramides-restorative-serum') || products[1];
    } else if (concern === 'anti-aging') {
      matchedProduct = products.find(p => p.id === 'onbuy-meaningful-beauty-youth-activating-melon-serum-duo') || products[2];
    } else if (concern === 'makeup') {
      matchedProduct = products.find(p => p.id === 'hera-black-cushion-foundation-duo') || products[24];
    } else if (concern === 'hair') {
      matchedProduct = products.find(p => p.id === 'longtake-blacktea-fig-shampoo') || products[22];
    } else {
      matchedProduct = products[0];
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in text-[#1A1A1A]">
      <div className="relative w-full max-w-xl rounded-3xl bg-[#FAF8F5] border border-[#D4C3A3] shadow-2xl p-6 sm:p-8 overflow-hidden text-left">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#8A847F] hover:text-[#1A1A1A] hover:bg-[#F2ECE4] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Step 1: Concern */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#D4C3A3] text-xs font-semibold text-[#8A7147] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#A4895C]" />
              <span>Step 1 of 2 — Dermal Diagnostic</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1A1A1A]">
              What is your primary beauty or skin priority?
            </h3>
            <p className="text-xs text-[#5A5552] font-light">
              Select the cutaneous objective you wish to address first:
            </p>

            <div className="space-y-2.5 pt-2">
              {[
                { id: 'texture', label: 'Congested Pores, Rough Texture & Stubborn Blemishes', desc: 'Seeking overnight cellular renewal and pore shrinking.' },
                { id: 'barrier', label: 'Dehydrated, Stung, or Compromised Moisture Barrier', desc: 'Seeking bio-identical ceramide replenishment and relief.' },
                { id: 'anti-aging', label: 'Fine Lines, Loss of Firmness & Environmental Dullness', desc: 'Seeking super-antioxidant stem cell collagen lifting.' },
                { id: 'makeup', label: 'Flawless Second-Skin Base & Transfer-Proof Radiance', desc: 'Seeking Korea’s top luxury semi-matte cushions.' },
                { id: 'hair', label: 'Dry, Frizzy Strands, Scalp Therapy & Niche Perfumery', desc: 'Seeking botanical black tea shampoo and scalp wellness.' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setConcern(item.id);
                    setStep(2);
                  }}
                  className="w-full p-4 rounded-2xl bg-[#FFFFFF] hover:bg-[#FDFBF7] border border-[#EFE8DA] hover:border-[#A4895C] text-left transition-all shadow-xs group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-serif font-bold text-sm text-[#1A1A1A] group-hover:text-[#8A7147] transition-colors block">
                        {item.label}
                      </span>
                      <span className="text-xs text-[#8A847F] font-light block mt-0.5">
                        {item.desc}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#8A847F] group-hover:text-[#A4895C] transition-transform group-hover:translate-x-1 shrink-0 ml-3" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Protocol Preference */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#D4C3A3] text-xs font-semibold text-[#8A7147] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#A4895C]" />
              <span>Step 2 of 2 — Treatment Format</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1A1A1A]">
              Which application style fits your lifestyle?
            </h3>
            <p className="text-xs text-[#5A5552] font-light">
              Choose your ideal formulation preference:
            </p>

            <div className="space-y-2.5 pt-2">
              {[
                { id: 'serum', label: 'Targeted High-Potency Night Serum / Elixir', desc: 'Concentrated micro-actives delivered directly onto cleansed skin.' },
                { id: 'barrier-cream', label: 'Deep Replenishing Barrier Cream / Mousse', desc: 'Rich lipid-identical creams that seal in lasting moisture.' },
                { id: 'kit', label: 'Complete Cohesive Regimen Kit', desc: 'Synergistic multi-step boxed kits for complete morning & night care.' },
                { id: 'touch-up', label: 'On-the-Go Compact or Travel Essence', desc: 'Portable formats for effortless daytime protection.' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleCalculateResult(item.id)}
                  className="w-full p-4 rounded-2xl bg-[#FFFFFF] hover:bg-[#FDFBF7] border border-[#EFE8DA] hover:border-[#A4895C] text-left transition-all shadow-xs group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-serif font-bold text-sm text-[#1A1A1A] group-hover:text-[#8A7147] transition-colors block">
                        {item.label}
                      </span>
                      <span className="text-xs text-[#8A847F] font-light block mt-0.5">
                        {item.desc}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#8A847F] group-hover:text-[#A4895C] transition-transform group-hover:translate-x-1 shrink-0 ml-3" />
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep(1)}
              className="text-xs text-[#8A847F] hover:text-[#1A1A1A] font-medium pt-2 block"
            >
              ← Back to previous question
            </button>
          </div>
        )}

        {/* Step 3: Diagnostic Match Result */}
        {step === 3 && result && (
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#3D7055] text-xs font-semibold text-[#3D7055] uppercase tracking-wider">
              <Check className="w-3.5 h-3.5" />
              <span>Clinical Match Formulated</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1A1A1A]">
              Your Prescribed Regimen Match
            </h3>

            <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#EFE8DA] shadow-sm flex flex-col sm:flex-row gap-4 items-center">
              <img
                src={result.image}
                alt={result.name}
                className="w-24 h-24 rounded-xl object-cover border border-[#EFE8DA] shrink-0"
              />
              <div className="space-y-1 text-center sm:text-left flex-1">
                <span className="text-[10px] uppercase font-bold text-[#B85D6A] font-mono block">
                  {result.brand} • {result.category}
                </span>
                <h4 className="font-serif font-bold text-base text-[#1A1A1A] leading-snug">
                  {result.name}
                </h4>
                <div className="flex items-center justify-center sm:justify-start gap-1 text-xs text-[#A4895C]">
                  <Star className="w-3.5 h-3.5 fill-[#D4C3A3] text-[#A4895C]" />
                  <span className="font-bold text-[#1A1A1A]">{result.rating}</span>
                  <span className="text-[#8A847F]">({result.reviewCount} reviews)</span>
                </div>
                <div className="font-serif font-bold text-lg text-[#1A1A1A] pt-1">
                  {result.currency}{result.price.toFixed(2)}
                </div>
              </div>
            </div>

            <p className="text-xs text-[#5A5552] italic leading-relaxed">
              "{result.verdict}"
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => {
                  onClose();
                  if (navigateTo) navigateTo(`/blog/${result.slug}`);
                }}
                className="py-3 px-4 rounded-xl bg-[#FAF8F5] hover:bg-[#F2ECE4] border border-[#EFE8DA] text-xs font-bold text-[#1A1A1A] transition-colors flex items-center justify-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#8A7147]" />
                <span>Read Full Review</span>
              </button>

              <a
                href={result.affiliateUrl}
                target="_blank"
                rel="sponsored nofollow noopener"
                className="py-3 px-4 rounded-xl bg-[#1A1A1A] hover:bg-[#A4895C] text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-xs"
              >
                <span>Shop Live Deal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <button
              onClick={resetQuiz}
              className="w-full text-center text-xs text-[#8A847F] hover:text-[#1A1A1A] flex items-center justify-center gap-1.5 pt-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Diagnostic Assessment</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
