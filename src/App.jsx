import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import ProductCard from './components/ProductCard';
import ComparisonTable from './components/ComparisonTable';
import BuyingGuide from './components/BuyingGuide';
import Footer from './components/Footer';
import QuizModal from './components/QuizModal';
import AboutPage from './pages/AboutPage';
import DisclosurePage from './pages/DisclosurePage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import ContactPage from './pages/ContactPage';
import { products } from './data/products';
import { Sparkles, PlusCircle, ShieldCheck } from 'lucide-react';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [quizOpen, setQuizOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Wigs & Restoration', 'Laser Therapy Tech', 'Scalp & Skin Barrier', 'Follicular Care', 'Organic Scalp Care'];

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const handleScrollToPicks = () => {
    setActivePage('home');
    setTimeout(() => {
      const el = document.getElementById('picks-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0d13] text-slate-100">
      {/* Navigation */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        openQuiz={() => setQuizOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {activePage === 'home' && (
          <>
            <Hero
              onExplorePicks={handleScrollToPicks}
              onOpenQuiz={() => setQuizOpen(true)}
            />
            
            <TrustBar />

            {/* Featured Top Picks Section */}
            <section id="picks-section" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-2 border border-amber-500/20">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Lab-Tested Roundups</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
                    2026 Top Rated Hair & Scalp Solutions
                  </h2>
                  <p className="mt-2 text-sm text-slate-400">
                    Ranked by clinical diode output, hair fiber density, barrier repair efficacy, and verified real-buyer feedback.
                  </p>
                </div>

                {products.length > 0 && (
                  <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                          selectedCategory === cat
                            ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                            : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Cards Stack or Clean Empty State */}
              {products.length > 0 ? (
                <div className="space-y-8">
                  {filteredProducts.map((product, idx) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      rank={idx + 1}
                    />
                  ))}
                </div>
              ) : (
                <div className="p-12 rounded-2xl bg-[#111420] border border-dashed border-slate-800 text-center max-w-2xl mx-auto">
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto mb-4 border border-amber-500/20">
                    <PlusCircle className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-white mb-2">
                    Ready to Add Your Products
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-6">
                    All sample posts have been removed. Add your affiliate products to <code className="text-amber-300 font-mono bg-slate-900 px-2 py-0.5 rounded border border-slate-800">src/data/products.js</code> and they will immediately appear here with comparison tables and "Check Best Price" affiliate buttons!
                  </p>
                  <div className="inline-flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/30 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Your site structure & legal compliance pages are 100% active.</span>
                  </div>
                </div>
              )}
            </section>

            {/* Comparison Matrix (renders when products exist) */}
            {products.length > 0 && <ComparisonTable />}

            {/* Educational Guide & FAQs */}
            <BuyingGuide />
          </>
        )}

        {activePage === 'compare' && (
          <div className="py-8">
            {products.length > 0 ? (
              <ComparisonTable />
            ) : (
              <div className="py-20 text-center text-slate-400 text-sm">
                Add products to view the side-by-side comparison matrix.
              </div>
            )}
            <BuyingGuide />
          </div>
        )}

        {activePage === 'guide' && (
          <div className="py-8">
            <BuyingGuide />
          </div>
        )}

        {activePage === 'about' && <AboutPage />}
        {activePage === 'disclosure' && <DisclosurePage />}
        {activePage === 'privacy' && <PrivacyPage />}
        {activePage === 'terms' && <TermsPage />}
        {activePage === 'contact' && <ContactPage />}
      </main>

      {/* Footer */}
      <Footer
        setActivePage={setActivePage}
        openQuiz={() => setQuizOpen(true)}
      />

      {/* Interactive Hair Quiz Modal */}
      <QuizModal
        isOpen={quizOpen}
        onClose={() => setQuizOpen(false)}
      />
    </div>
  );
}
