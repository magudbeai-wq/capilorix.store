import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  Compass, 
  Menu, 
  X, 
  Globe, 
  BookOpen, 
  ShoppingBag, 
  ChevronDown, 
  ShieldCheck,
  Award,
  Layers
} from 'lucide-react';
import { mainCategories } from '../data/categories';

export default function Navbar({ 
  currentPath = '/',
  navigateTo,
  searchTerm = '', 
  setSearchTerm,
  onOpenQuiz,
  selectedCategory = 'All',
  onSelectCategory,
  selectedCurrency = 'USD',
  onSelectCurrency
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const currencies = [
    { code: 'USD', symbol: '$', label: 'USA ($ USD)', flag: '🇺🇸' },
    { code: 'GBP', symbol: '£', label: 'UK (£ GBP)', flag: '🇬🇧' },
    { code: 'EUR', symbol: '€', label: 'Europe (€ EUR)', flag: '🇪🇺' },
    { code: 'CAD', symbol: '$', label: 'Canada ($ CAD)', flag: '🇨🇦' },
    { code: 'AUD', symbol: '$', label: 'Australia ($ AUD)', flag: '🇦🇺' }
  ];

  const currentCurrencyObj = currencies.find(c => c.code === selectedCurrency) || currencies[0];

  const handleNav = (path) => {
    setMobileMenuOpen(false);
    if (navigateTo) {
      navigateTo(path);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#EFE8DA] shadow-xs text-[#1A1A1A]">
      {/* 1. International Announcement Top Bar */}
      <div className="bg-[#1A1A1A] text-[#FDFBF7] text-[11px] font-medium tracking-wider py-1.5 px-4 text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden sm:flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#D4C3A3]"></span>
            <span>AUTUMN/WINTER 2026 BEAUTY COMPENDIUM</span>
          </div>

          <div className="flex-1 text-center font-normal tracking-wide">
            <span className="text-[#D4C3A3] font-semibold">Complimentary Editorial Guides</span> &amp; Verified Merchant Pricing Across USA, UK, Canada &amp; Australia
          </div>

          <div className="relative hidden md:block">
            <button
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
              className="flex items-center gap-1.5 text-xs text-[#D4C3A3] hover:text-white transition-colors"
            >
              <span>{currentCurrencyObj.flag} {currentCurrencyObj.code}</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {currencyDropdownOpen && (
              <div className="absolute right-0 top-full mt-1 w-44 bg-[#FFFFFF] border border-[#EFE8DA] rounded-lg shadow-xl py-1 text-left z-50 text-[#1A1A1A]">
                {currencies.map(cur => (
                  <button
                    key={cur.code}
                    onClick={() => {
                      if (onSelectCurrency) onSelectCurrency(cur.code);
                      setCurrencyDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-[#FAF8F5] transition-colors ${
                      selectedCurrency === cur.code ? 'font-bold text-[#A4895C] bg-[#FAF8F5]' : ''
                    }`}
                  >
                    <span>{cur.flag} {cur.label}</span>
                    <span className="font-mono text-gray-400">{cur.symbol}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. Main Luxury Masthead */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">
          
          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#1A1A1A] hover:bg-[#F2ECE4] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Left Editorial Navigation Links */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-6 text-[12px] font-medium tracking-wider uppercase text-[#5A5552]">
            <button
              onClick={() => handleNav('/')}
              className={`hover:text-[#1A1A1A] transition-colors ${currentPath === '/' ? 'text-[#1A1A1A] font-semibold underline underline-offset-8 decoration-[#D4C3A3]' : ''}`}
            >
              Magazine
            </button>
            <button
              onClick={() => handleNav('/products')}
              className={`hover:text-[#1A1A1A] transition-colors ${currentPath === '/products' ? 'text-[#1A1A1A] font-semibold underline underline-offset-8 decoration-[#D4C3A3]' : ''}`}
            >
              Directory
            </button>
            <button
              onClick={() => handleNav('/reviews')}
              className={`hover:text-[#1A1A1A] transition-colors ${currentPath.startsWith('/reviews') || currentPath.startsWith('/blog') ? 'text-[#1A1A1A] font-semibold underline underline-offset-8 decoration-[#D4C3A3]' : ''}`}
            >
              Reviews
            </button>
            <button
              onClick={() => handleNav('/comparisons')}
              className={`hover:text-[#1A1A1A] transition-colors ${currentPath === '/comparisons' ? 'text-[#1A1A1A] font-semibold underline underline-offset-8 decoration-[#D4C3A3]' : ''}`}
            >
              Comparisons
            </button>
            <button
              onClick={() => handleNav('/guides')}
              className={`hover:text-[#1A1A1A] transition-colors ${currentPath === '/guides' ? 'text-[#1A1A1A] font-semibold underline underline-offset-8 decoration-[#D4C3A3]' : ''}`}
            >
              Guides
            </button>
          </nav>

          {/* Centered Brand Logo & Slogan */}
          <div className="text-center">
            <button
              onClick={() => handleNav('/')}
              className="inline-block group text-center"
            >
              <span className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black tracking-widest text-[#1A1A1A] block transition-transform group-hover:scale-[1.01]">
                CAPILORIX<span className="text-[#A4895C]">.</span>
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-[0.25em] text-[#8A7147] uppercase font-semibold block -mt-0.5">
                Discover Better Beauty. Make Smarter Choices.
              </span>
            </button>
          </div>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-3">
            {/* Search Input Trigger (Desktop) */}
            <div className="relative hidden lg:block w-44 xl:w-56">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm && setSearchTerm(e.target.value)}
                placeholder="Search formulas, brands..."
                className="w-full pl-8 pr-3 py-1.5 rounded-full bg-[#FFFFFF] border border-[#EFE8DA] text-xs text-[#1A1A1A] placeholder-[#8A847F] focus:outline-none focus:border-[#A4895C] focus:ring-1 focus:ring-[#A4895C] transition-all"
              />
              <Search className="w-3.5 h-3.5 text-[#8A847F] absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>

            {/* Diagnostic Quiz Button */}
            <button
              onClick={onOpenQuiz}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F6EAE8] hover:bg-[#EBD6D4] border border-[#E3B8B8] text-[#8C3D49] text-xs font-semibold tracking-wide transition-all shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B85D6A]" />
              <span className="hidden sm:inline">Skin Diagnostic</span>
            </button>

            {/* Catalog Button */}
            <button
              onClick={() => handleNav('/products')}
              className="p-2 rounded-full text-[#5A5552] hover:text-[#1A1A1A] hover:bg-[#F2ECE4] transition-colors relative"
              title="Browse Full Product Directory"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="mt-3 block lg:hidden">
          <div className="relative w-full">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm && setSearchTerm(e.target.value)}
              placeholder="Search clinical products, articles, reviews..."
              className="w-full pl-9 pr-3 py-2 rounded-full bg-[#FFFFFF] border border-[#EFE8DA] text-xs text-[#1A1A1A] placeholder-[#8A847F] focus:outline-none focus:border-[#A4895C]"
            />
            <Search className="w-4 h-4 text-[#8A847F] absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>

      {/* 3. 8 Main Categories Navigation Bar */}
      <div className="border-t border-[#EFE8DA] bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between overflow-x-auto py-2.5 gap-2 scrollbar-none text-xs">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={() => handleNav('/products')}
                className={`px-3 py-1 rounded-full whitespace-nowrap transition-all text-xs font-medium ${
                  currentPath === '/products'
                    ? 'bg-[#1A1A1A] text-[#FDFBF7] shadow-xs'
                    : 'text-[#5A5552] hover:text-[#1A1A1A] hover:bg-[#F2ECE4]'
                }`}
              >
                All (29)
              </button>

              {mainCategories.map((cat) => {
                const isActive = currentPath === `/${cat.slug}` || currentPath === `/${cat.slug}/`;
                return (
                  <button
                    key={cat.slug}
                    onClick={() => handleNav(`/${cat.slug}`)}
                    className={`px-3 py-1 rounded-full whitespace-nowrap transition-all text-xs font-medium ${
                      isActive
                        ? 'bg-[#1A1A1A] text-[#FDFBF7] shadow-xs'
                        : 'text-[#5A5552] hover:text-[#1A1A1A] hover:bg-[#F2ECE4]'
                    }`}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>

            <div className="hidden xl:flex items-center gap-4 text-xs font-medium text-[#8A7147] shrink-0 pl-4 border-l border-[#EFE8DA]">
              <button 
                onClick={() => handleNav('/how-we-review')} 
                className="flex items-center gap-1 hover:text-[#1A1A1A] transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#3D7055]" />
                <span>How We Review</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF8F5] border-b border-[#EFE8DA] px-4 py-4 space-y-3">
          <div className="space-y-1 text-sm font-medium">
            <button
              onClick={() => handleNav('/')}
              className="block w-full text-left py-2 px-3 rounded-lg hover:bg-[#F2ECE4]"
            >
              Magazine Home
            </button>
            <button
              onClick={() => handleNav('/products')}
              className="block w-full text-left py-2 px-3 rounded-lg hover:bg-[#F2ECE4]"
            >
              Full Products Directory (29)
            </button>
            <button
              onClick={() => handleNav('/reviews')}
              className="block w-full text-left py-2 px-3 rounded-lg hover:bg-[#F2ECE4]"
            >
              Editorial Reviews Hub
            </button>
            <button
              onClick={() => handleNav('/comparisons')}
              className="block w-full text-left py-2 px-3 rounded-lg hover:bg-[#F2ECE4]"
            >
              Side-by-Side Comparison Matrix
            </button>
            <button
              onClick={() => handleNav('/guides')}
              className="block w-full text-left py-2 px-3 rounded-lg hover:bg-[#F2ECE4]"
            >
              Educational Buying Guides
            </button>
          </div>

          <div className="pt-3 border-t border-[#EFE8DA]">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A7147] block mb-2 font-mono">
              The 8 Main Departments
            </span>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              {mainCategories.map(cat => (
                <button
                  key={cat.slug}
                  onClick={() => handleNav(`/${cat.slug}`)}
                  className="p-2 rounded-lg bg-[#FFFFFF] border border-[#EFE8DA] text-left hover:border-[#A4895C]"
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-[#EFE8DA]">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A7147] block mb-2">
              Select Market Currency
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {currencies.map(cur => (
                <button
                  key={cur.code}
                  onClick={() => {
                    if (onSelectCurrency) onSelectCurrency(cur.code);
                    setMobileMenuOpen(false);
                  }}
                  className={`p-2 rounded-lg border text-left flex items-center justify-between ${
                    selectedCurrency === cur.code ? 'border-[#A4895C] bg-[#FFFFFF] font-bold' : 'border-[#EFE8DA] bg-[#FAF8F5]'
                  }`}
                >
                  <span>{cur.flag} {cur.code}</span>
                  <span className="text-gray-400 font-mono">{cur.symbol}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-[#EFE8DA] flex flex-wrap gap-3 text-xs text-[#5A5552]">
            <button onClick={() => handleNav('/how-we-review')} className="hover:underline">How We Review</button>
            <button onClick={() => handleNav('/editorial-policy')} className="hover:underline">Editorial Policy</button>
            <button onClick={() => handleNav('/about')} className="hover:underline">About</button>
            <button onClick={() => handleNav('/disclosure')} className="hover:underline">FTC Disclosure</button>
            <button onClick={() => handleNav('/privacy')} className="hover:underline">Privacy</button>
            <button onClick={() => handleNav('/terms')} className="hover:underline">Terms</button>
            <button onClick={() => handleNav('/contact')} className="hover:underline">Contact</button>
          </div>
        </div>
      )}
    </header>
  );
}
