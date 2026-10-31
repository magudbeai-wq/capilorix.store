import React, { useState } from 'react';
import { Sparkles, ShieldCheck, Compass, HelpCircle, Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar({ activePage, setActivePage, openQuiz }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Top Picks 2026' },
    { id: 'compare', label: 'Comparison Matrix' },
    { id: 'guide', label: 'Clinical Guide' },
    { id: 'about', label: 'About Us' },
    { id: 'disclosure', label: 'FTC Disclosure' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0b0d13]/90 backdrop-blur-md border-b border-slate-800/80">
      {/* Top Advisory Strip */}
      <div className="bg-gradient-to-r from-amber-950/40 via-amber-900/30 to-amber-950/40 border-b border-amber-500/20 px-4 py-1.5 text-xs text-amber-200/90 text-center flex items-center justify-center gap-2">
        <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
        <span>
          <strong>Reader Supported:</strong> We independently test every product. Purchases made via our verified links may earn an affiliate commission.
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <button 
            onClick={() => setActivePage('home')}
            className="flex items-center gap-3 group text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <span className="text-2xl font-serif font-bold tracking-tight text-white block">
                CAPILORIX<span className="text-amber-400">.</span>
              </span>
              <span className="text-[10px] tracking-widest text-slate-400 uppercase font-semibold block -mt-1">
                Clinical Scalp & Hair Lab
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setActivePage(link.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activePage === link.id
                    ? 'text-amber-400 bg-amber-400/10 border border-amber-400/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Action Button */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={openQuiz}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold text-sm shadow-md shadow-amber-500/20 transition-all hover:shadow-amber-500/40 active:scale-95"
            >
              <Compass className="w-4 h-4" />
              <span>Hair Match Quiz</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#0f121a] px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                setActivePage(link.id);
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`block w-full text-left px-3 py-2.5 rounded-lg text-base font-medium ${
                activePage === link.id
                  ? 'text-amber-400 bg-amber-400/10'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              openQuiz();
            }}
            className="w-full mt-3 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-amber-500 text-slate-950 font-bold text-sm"
          >
            <Compass className="w-4 h-4" />
            <span>Launch Hair Match Quiz</span>
          </button>
        </div>
      )}
    </header>
  );
}
