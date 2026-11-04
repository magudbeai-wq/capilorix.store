import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroEditorial from './components/HeroEditorial';
import SearchAndFilterBar from './components/SearchAndFilterBar';
import CategoryShowcase from './components/CategoryShowcase';
import ProductCard from './components/ProductCard';
import BestSellingGuides from './components/BestSellingGuides';
import LatestBeautyArticles from './components/LatestBeautyArticles';
import ComparisonTable from './components/ComparisonTable';
import EditorsPicks from './components/EditorsPicks';
import NewsletterSection from './components/NewsletterSection';
import Footer from './components/Footer';
import QuizModal from './components/QuizModal';

// Dedicated Full Pages
import ProductsPage from './pages/ProductsPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import CategoryPage from './pages/CategoryPage';
import ComparisonsPage from './pages/ComparisonsPage';
import GuidesPage from './pages/GuidesPage';
import EditorialPolicyPage from './pages/EditorialPolicyPage';
import HowWeReviewPage from './pages/HowWeReviewPage';
import AboutPage from './pages/AboutPage';
import DisclosurePage from './pages/DisclosurePage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import ContactPage from './pages/ContactPage';

// Step 4 & 5: Admin & Outbound Tracking Pages
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminLayout from './pages/admin/AdminLayout';
import AffiliateRedirectPage from './pages/AffiliateRedirectPage';
import { authService } from './services/authService';
import SEOHead from './components/SEOHead';

import { products } from './data/products';
import { mainCategories } from './data/categories';
import { Sparkles, ArrowRight, Award, PlusCircle, ShieldCheck } from 'lucide-react';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname || '/');
  const [quizOpen, setQuizOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  const categories = ['All', 'Skincare', 'Haircare', 'Cosmetics', 'Anti-Aging', 'Body & Barrier'];

  // Handle URL synchronization for /products, /blog, /blog/:slug, /skincare, etc.
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path) => {
    if (path.startsWith('/#')) {
      const id = path.replace('/#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.history.pushState(null, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter products for homepage trending section
  const filteredProducts = products.filter((p) => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory || p.mainCategory === selectedCategory.toLowerCase();
    const matchesSearch = !searchTerm || 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.keyIngredients && p.keyIngredients.some(k => k.toLowerCase().includes(searchTerm.toLowerCase())));
    return matchesCat && matchesSearch;
  });

  // Determine current active view based on pathname
  const renderCurrentView = () => {
    const normPath = currentPath.endsWith('/') && currentPath.length > 1 
      ? currentPath.slice(0, -1) 
      : currentPath;

    // 0. Admin Console & Outbound Tracking Routes
    if (normPath.startsWith('/admin')) {
      if (authService.isAuthenticated()) {
        return <AdminLayout navigateTo={navigateTo} onLogout={() => setCurrentPath('/admin')} />;
      }
      return <AdminLoginPage onLoginSuccess={() => setCurrentPath('/admin')} navigateTo={navigateTo} />;
    }

    if (normPath.startsWith('/go/')) {
      const prodId = normPath.replace('/go/', '');
      return <AffiliateRedirectPage productId={prodId} navigateTo={navigateTo} />;
    }

    // 1. Individual Review Posts: /reviews/:slug or /blog/:slug
    if (normPath.startsWith('/reviews/')) {
      const slug = normPath.replace('/reviews/', '');
      return <BlogPostPage slug={slug} navigateTo={navigateTo} />;
    }
    if (normPath.startsWith('/blog/')) {
      const slug = normPath.replace('/blog/', '');
      return <BlogPostPage slug={slug} navigateTo={navigateTo} />;
    }

    // 2. Review Archive Hub: /reviews or /blog
    if (normPath === '/reviews' || normPath === '/blog') {
      return <BlogPage navigateTo={navigateTo} initialCategory={selectedCategory} />;
    }

    // 3. Comparisons Page: /comparisons
    if (normPath === '/comparisons') {
      return <ComparisonsPage navigateTo={navigateTo} />;
    }

    // 4. Guides Page: /guides
    if (normPath === '/guides') {
      return <GuidesPage navigateTo={navigateTo} />;
    }

    // 5. Products Catalog Route: /products
    if (normPath === '/products') {
      return <ProductsPage navigateTo={navigateTo} initialCategory={selectedCategory} />;
    }

    // 6. 8 Main Category Pages: /skincare, /haircare, /hair-tools, /makeup, /body-care, /beauty-tools, /fragrance, /k-beauty
    const matchedCategory = mainCategories.find(c => '/' + c.slug === normPath);
    if (matchedCategory) {
      return <CategoryPage categorySlug={matchedCategory.slug} navigateTo={navigateTo} />;
    }

    // Check if subcategory path: e.g. /skincare/serums
    for (const c of mainCategories) {
      if (normPath.startsWith(`/${c.slug}/`)) {
        const subSlug = normPath.replace(`/${c.slug}/`, '');
        return <CategoryPage categorySlug={c.slug} subCategoryParam={subSlug} navigateTo={navigateTo} />;
      }
    }

    // 7. Trust & Legal Pages
    if (normPath === '/editorial-policy') return <EditorialPolicyPage navigateTo={navigateTo} />;
    if (normPath === '/how-we-review') return <HowWeReviewPage navigateTo={navigateTo} />;
    if (normPath === '/about') return <AboutPage />;
    if (normPath === '/disclosure' || normPath === '/affiliate-disclosure') return <DisclosurePage />;
    if (normPath === '/privacy' || normPath === '/privacy-policy') return <PrivacyPage />;
    if (normPath === '/terms') return <TermsPage />;
    if (normPath === '/contact') return <ContactPage />;

    // 8. Default: Redesigned Luxury Homepage
    return (
      <>
        {/* Section 2: Large Editorial Hero Section */}
        <HeroEditorial
          onOpenQuiz={() => setQuizOpen(true)}
          navigateTo={navigateTo}
          featuredProduct={products[0]}
        />

        {/* Section 3: Search Products and Articles Bar */}
        <SearchAndFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          categories={categories}
        />

        {/* Section 4: Featured Beauty Categories (All 8 Core Departments) */}
        <CategoryShowcase
          onSelectCategory={setSelectedCategory}
          navigateTo={navigateTo}
        />

        {/* Section 5: Trending Product Reviews */}
        <section id="trending-reviews-section" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#D4C3A3] text-xs font-semibold uppercase tracking-wider text-[#8A7147] mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#A4895C]" />
                <span>Forensic Evaluations</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1A1A1A]">
                Trending Product Reviews
              </h2>
              <p className="mt-2 text-sm text-[#5A5552] max-w-xl font-light">
                Ranked by clinical active concentration, barrier biocompatibility, verified peer scores, and direct partner discounts.
              </p>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#1A1A1A] text-white shadow-xs'
                      : 'bg-[#FFFFFF] text-[#5A5552] hover:text-[#1A1A1A] hover:bg-[#F2ECE4] border border-[#EFE8DA]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Product Cards Stack */}
          {filteredProducts.length > 0 ? (
            <div className="space-y-8">
              {filteredProducts.map((product, idx) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  rank={idx + 1}
                  navigateTo={navigateTo}
                />
              ))}
            </div>
          ) : (
            <div className="p-12 rounded-3xl bg-[#FFFFFF] border border-dashed border-[#D4C3A3] text-center max-w-2xl mx-auto">
              <h3 className="text-xl font-serif font-bold text-[#1A1A1A] mb-2">
                No Matching Beauty Formulas
              </h3>
              <p className="text-xs text-[#5A5552] leading-relaxed mb-6">
                No products match the filter criteria for "{searchTerm}". Clear search to view all 29 formulas.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
                className="px-6 py-2.5 rounded-full bg-[#1A1A1A] text-white text-xs font-bold"
              >
                Reset All Filters
              </button>
            </div>
          )}

          <div className="mt-10 text-center">
            <button
              onClick={() => navigateTo('/products')}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#FAF8F5] hover:bg-[#F2ECE4] border border-[#D4C3A3] text-xs font-bold uppercase tracking-wider text-[#1A1A1A] transition-all shadow-xs"
            >
              <span>Explore All 29 Formulas in Products Directory</span>
              <ArrowRight className="w-4 h-4 text-[#8A7147]" />
            </button>
          </div>
        </section>

        {/* Section 6: Best-Selling Product Guides */}
        <section id="guides">
          <BestSellingGuides navigateTo={navigateTo} />
        </section>

        {/* Section 7: Latest Beauty Articles */}
        <LatestBeautyArticles navigateTo={navigateTo} />

        {/* Section 8: Product Comparison Section */}
        <section id="compare">
          <ComparisonTable navigateTo={navigateTo} />
        </section>

        {/* Section 9: Editor's Picks */}
        <EditorsPicks navigateTo={navigateTo} />

        {/* Section 10: Newsletter Subscription */}
        <NewsletterSection />
      </>
    );
  };

  const normPath = currentPath.endsWith('/') && currentPath.length > 1 
    ? currentPath.slice(0, -1) 
    : currentPath;
  const isDedicatedLayout = normPath.startsWith('/admin') || normPath.startsWith('/go/');

  if (isDedicatedLayout) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] text-[#1A1A1A]">
        <SEOHead currentPath={currentPath} />
        {renderCurrentView()}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1A1A1A] selection:bg-[#F6EAE8] selection:text-[#B85D6A]">
      <SEOHead currentPath={currentPath} />
      {/* Section 1: Premium Navigation Bar */}
      <Navbar
        currentPath={currentPath}
        navigateTo={navigateTo}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onOpenQuiz={() => setQuizOpen(true)}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        selectedCurrency={selectedCurrency}
        onSelectCurrency={setSelectedCurrency}
      />

      {/* Dynamic Content Region */}
      <main className="flex-grow">
        {renderCurrentView()}
      </main>

      {/* Section 11: Editorial Footer with Legal & Trust Links */}
      <Footer
        navigateTo={navigateTo}
        onOpenQuiz={() => setQuizOpen(true)}
      />

      {/* Interactive Regimen Diagnostic Modal */}
      <QuizModal
        isOpen={quizOpen}
        onClose={() => setQuizOpen(false)}
        navigateTo={navigateTo}
      />
    </div>
  );
}
