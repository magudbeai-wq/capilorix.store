import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  Heart, 
  User, 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  Percent, 
  Menu, 
  X, 
  Compass, 
  Flame 
} from 'lucide-react';

export default function Navbar({ activePage, setActivePage, openQuiz, searchTerm, setSearchTerm }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories = [
    { id: 'all', label: 'All Reviews' },
    { id: 'laser', label: 'Laser Caps & Tech' },
    { id: 'wigs', label: 'Glueless Wigs' },
    { id: 'scalp', label: 'Scalp & Follicles' },
    { id: 'kbeauty', label: 'K-Beauty Serums' },
    { id: 'ingrown', label: 'AHA/BHA Pads' },
    { id: 'deals', label: 'Flash Deals %', highlight: true },
    { id: 'about', label: 'About Us' },
    { id: 'disclosure', label: 'Editorial Policy' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (id) => {
    if (id === 'deals' || id === 'all' || id === 'laser' || id === 'wigs' || id === 'scalp' || id === 'kbeauty' || id === 'ingrown') {
      setActivePage('home');
      setTimeout(() => {
        const el = document.getElementById('picks-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      setActivePage(id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0c0e16] border-b border-slate-800 shadow-xl">
      {/* 1. Main Brand & Search Bar (dm.de style) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 shrink-0 group text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <span className="text-2xl font-serif font-black tracking-tight text-white block">
                CAPILORIX<span className="text-amber-400">.</span>
              </span>
              <span className="text-[9px] tracking-widest text-slate-400 uppercase font-bold block -mt-1">
                Clinical Scalp & Hair Lab
              </span>
            </div>
          </button>

          {/* Center Search Bar (like dm.de "Suchen und finden") */}
          <div className="hidden md:flex flex-1 max-w-xl mx-4">
            <div className="relative w-full">
              <input
                type="text"
                value={searchTerm || ''}
                onChange={(e) => setSearchTerm && setSearchTerm(e.target.value)}
                placeholder="Search clinical products, laser caps, wigs, deals..."
                className="w-full pl-11 pr-4 py-2.5 rounded-full bg-slate-900 border border-slate-700/80 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all shadow-inner"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Right Action Icons (dm.de style: Wishlist, Deals, Quiz) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={openQuiz}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold transition-all"
            >
              <Compass className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Hair Quiz</span>
            </button>

            <button
              onClick={() => handleNavClick('deals')}
              className="p-2.5 rounded-full text-slate-300 hover:text-rose-400 hover:bg-slate-800 transition-colors relative"
              title="Flash Deals"
            >
              <Flame className="w-5 h-5 text-rose-400" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            </button>

            <button
              onClick={() => handleNavClick('home')}
              className="p-2.5 rounded-full text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              title="Saved Items"
            >
              <Heart className="w-5 h-5 text-slate-300 hover:text-amber-400" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 md:hidden hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="md:hidden mt-3">
          <div className="relative w-full">
            <input
              type="text"
              value={searchTerm || ''}
              onChange={(e) => setSearchTerm && setSearchTerm(e.target.value)}
              placeholder="Search products, laser caps, deals..."
              className="w-full pl-10 pr-4 py-2 rounded-full bg-slate-900 border border-slate-700/80 text-white placeholder-slate-400 text-xs focus:outline-none focus:border-amber-400"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>

      {/* 2. Sub-Navigation Horizontal Bar (Categories row like dm.de) */}
      <div className="border-t border-b border-slate-800/80 bg-[#0f121d] overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1 sm:gap-2 py-2 text-xs font-semibold whitespace-nowrap">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleNavClick(cat.id)}
                className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                  cat.highlight
                    ? 'text-rose-400 bg-rose-500/10 border border-rose-500/20 font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {cat.highlight && <Percent className="w-3 h-3 text-rose-400" />}
                <span>{cat.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* 3. Continuous dm-Style 3-Perks Ticker Bar */}
      <div className="bg-[#121624] border-b border-slate-800/60 py-2 px-4 text-[11px] text-slate-300">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-2 text-center">
          <div className="flex items-center justify-center gap-2">
            <Truck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span><strong>Free Global Shipping</strong> via authorized partner programs</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Percent className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span><strong>Up to 50% Verified Deals</strong> & exclusive daily promo codes</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-400 shrink-0" />
            <span><strong>100% Dermatologist & Lab Tested</strong> benchmark reviews</span>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#0f121d] px-4 py-4 space-y-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setMobileMenuOpen(false);
                handleNavClick(cat.id);
              }}
              className="block w-full text-left px-3 py-2 text-sm text-slate-200 hover:bg-slate-800 rounded-lg"
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
