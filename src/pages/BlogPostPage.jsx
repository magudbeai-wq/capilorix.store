import React, { useState } from 'react';
import { articleService } from '../services/articleService';
import { productService } from '../services/productService';
import { authors, getAuthorById } from '../data/authors';
import ProductReviewTemplate from '../components/ProductReviewTemplate';
import {
  Star,
  Check,
  X,
  ExternalLink,
  Clock,
  Calendar,
  ShieldCheck,
  Award,
  Tag,
  ArrowLeft,
  ArrowRight,
  Share2,
  CheckCircle2,
  Sparkles,
  ShoppingBag,
  HelpCircle,
  FileCheck
} from 'lucide-react';

export default function BlogPostPage({ slug, navigateTo }) {
  // Check if slug matches a CMS Article or a Product Review
  const article = articleService.getArticleBySlug(slug);
  const products = productService.getProducts();
  const product = productService.getProductBySlug(slug) || products[0];

  const [copiedCoupon, setCopiedCoupon] = useState(false);
  const [shared, setShared] = useState(false);
  const [heroImg, setHeroImg] = useState(product ? (product.frontImage || product.image) : '');

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCoupon(true);
    setTimeout(() => setCopiedCoupon(false), 2500);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article ? article.title : (product.blogTitle || product.name),
        url: window.location.href
      }).catch(() => { });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShared(true);
      setTimeout(() => setShared(false), 2500);
    }
  };

  // If this is an editorial CMS article (Roundup, Comparison, Guide)
  if (article) {
    const author = getAuthorById(article.authorId);
    const reviewer = getAuthorById(article.reviewerId || 'dr-sarah-jenkins');
    
    // Resolve assigned products
    const assignedProducts = (article.assignedProductIds || [])
      .map((id) => productService.getProductById(id) || productService.getProductBySlug(id))
      .filter(Boolean);

    const relatedArticles = articleService.getPublishedArticles()
      .filter((a) => a.id !== article.id)
      .slice(0, 3);

    return (
      <article className="bg-[#FAF8F5] min-h-screen text-[#1A1A1A] py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#8A847F] mb-6">
            <div className="flex items-center gap-2">
              <button onClick={() => navigateTo('/')} className="hover:text-[#1A1A1A]">Home</button>
              <span>/</span>
              <button onClick={() => navigateTo('/blog')} className="hover:text-[#1A1A1A]">Editorial</button>
              <span>/</span>
              <span className="capitalize">{article.category}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFFFFF] border border-[#EFE8DA] text-xs text-[#5A5552] hover:text-[#1A1A1A] transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{shared ? 'Link Copied!' : 'Share'}</span>
              </button>
            </div>
          </div>

          {/* Article Header & Masthead */}
          <header className="mb-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="px-3 py-1 rounded-full bg-[#1A1A1A] text-white font-mono font-bold uppercase tracking-wider text-[11px]">
                {article.articleType}
              </span>
              <span className="px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#D4C3A3] text-[#8A7147] font-semibold uppercase tracking-wider text-[11px] capitalize">
                {article.category}
              </span>
              <span className="text-[#8A847F] flex items-center gap-1 font-mono">
                <Clock className="w-3.5 h-3.5" />
                {article.readTime}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif font-black text-[#1A1A1A] leading-tight">
              {article.title}
            </h1>

            {article.subtitle && (
              <p className="text-base sm:text-lg text-[#5A5552] font-light leading-relaxed">
                {article.subtitle}
              </p>
            )}

            {/* E-E-A-T Author & Reviewer Badge */}
            <div className="pt-4 border-t border-[#EFE8DA] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="w-11 h-11 rounded-full object-cover border border-[#D4C3A3]"
                />
                <div>
                  <div className="text-xs font-bold text-[#1A1A1A]">{author.name}</div>
                  <div className="text-[11px] text-[#8A847F]">{author.title}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#FFFFFF] border border-[#EFE8DA] text-[11px] text-[#5A5552]">
                <FileCheck className="w-4 h-4 text-[#2A6E3B] shrink-0" />
                <div>
                  <span className="font-semibold text-[#1A1A1A]">Medically Reviewed:</span> {reviewer.name}
                </div>
              </div>
            </div>
          </header>

          {/* Hero Cover Image */}
          <div className="mb-10 rounded-3xl overflow-hidden border border-[#EFE8DA] shadow-md bg-[#FAF8F5]">
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-80 sm:h-[450px] object-cover"
            />
          </div>

          {/* FTC Editorial Transparency Notice */}
          <div className="mb-10 p-4 rounded-2xl bg-[#FFFFFF] border border-[#D4C3A3] text-xs text-[#5A5552] flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#A4895C] shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <span className="font-bold text-[#1A1A1A]">Capilorix Reader-Supported Guarantee:</span> Our laboratory audits are 100% editorially independent. When you purchase formulas through our verified partner links, we may receive a standardized affiliate commission at zero additional cost to you.
            </div>
          </div>

          {/* Assigned Products Showcase / Decision Matrix */}
          {assignedProducts.length > 0 && (
            <section className="mb-12 space-y-6">
              <div className="border-b border-[#EFE8DA] pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#A4895C] font-mono">
                  Laboratory Selections
                </span>
                <h2 className="text-2xl font-serif font-black text-[#1A1A1A]">
                  Tested &amp; Benchmarked Formulas in this Report
                </h2>
              </div>

              <div className="space-y-6">
                {assignedProducts.map((p, idx) => (
                  <div key={p.id} className="bg-[#FFFFFF] rounded-2xl border border-[#EFE8DA] p-6 shadow-xs space-y-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <span className="w-8 h-8 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center font-serif font-bold text-sm shrink-0">
                          #{idx + 1}
                        </span>
                        <div>
                          <div className="text-[11px] font-mono text-[#A4895C] uppercase font-bold">{p.brand}</div>
                          <h3 className="text-lg font-serif font-bold text-[#1A1A1A]">{p.name}</h3>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <div className="text-right">
                          <div className="text-lg font-serif font-black text-[#1A1A1A]">
                            {p.currency || '$'}{p.price}
                          </div>
                          <div className="text-[10px] text-[#8A847F] font-mono">
                            Partner: {p.merchant}
                          </div>
                        </div>

                        <a
                          href={p.affiliateUrl || p.buyUrl}
                          target="_blank"
                          rel="sponsored nofollow noopener"
                          className="px-4 py-2.5 rounded-xl bg-[#1A1A1A] text-white text-xs font-semibold hover:bg-[#2C2926] transition-all flex items-center gap-1.5 shadow-sm"
                        >
                          <span>Check Price</span>
                          <ExternalLink className="w-3.5 h-3.5 text-[#D4C3A3]" />
                        </a>
                      </div>
                    </div>

                    <p className="text-xs text-[#5A5552] leading-relaxed">
                      {p.description}
                    </p>

                    {/* Pros & Cons pills */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                      {p.pros && p.pros.length > 0 && (
                        <div className="p-3 rounded-xl bg-green-50/50 border border-green-100 space-y-1">
                          <div className="font-bold text-green-900 text-[11px] uppercase">Key Advantage</div>
                          <div className="text-green-800 text-xs">{p.pros[0]}</div>
                        </div>
                      )}
                      {p.cons && p.cons.length > 0 && (
                        <div className="p-3 rounded-xl bg-amber-50/50 border border-amber-100 space-y-1">
                          <div className="font-bold text-amber-900 text-[11px] uppercase">Consideration</div>
                          <div className="text-amber-800 text-xs">{p.cons[0]}</div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Article Content Sections */}
          <div className="space-y-8 text-sm text-[#2C2926] leading-relaxed">
            {article.contentSections && article.contentSections.map((sec, idx) => (
              <div key={idx} className="space-y-3">
                <h2 className="text-2xl font-serif font-bold text-[#1A1A1A]">
                  {sec.heading}
                </h2>
                <div className="whitespace-pre-line text-xs sm:text-sm text-[#5A5552] font-light leading-relaxed">
                  {sec.body}
                </div>
              </div>
            ))}
          </div>

          {/* Pros & Cons Summary Matrix */}
          {((article.pros && article.pros.length > 0) || (article.cons && article.cons.length > 0)) && (
            <div className="my-10 p-6 rounded-3xl bg-[#FFFFFF] border border-[#EFE8DA] space-y-4">
              <h3 className="text-xl font-serif font-bold text-[#1A1A1A]">
                Capilorix Laboratory Pros &amp; Cons Matrix
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                <div>
                  <h4 className="font-bold text-[#2A6E3B] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-[#2A6E3B]" />
                    <span>Tested Advantages</span>
                  </h4>
                  <ul className="space-y-2">
                    {article.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-2 text-[#2C2926]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2A6E3B] mt-1.5 shrink-0" />
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-[#9C3A3A] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <X className="w-4 h-4 text-[#9C3A3A]" />
                    <span>Tested Considerations</span>
                  </h4>
                  <ul className="space-y-2">
                    {article.cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-2 text-[#5A5552]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#9C3A3A] mt-1.5 shrink-0" />
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* FAQ Accordion (with FAQPage schema compatibility) */}
          {article.faqs && article.faqs.length > 0 && (
            <section className="my-10 space-y-4">
              <div className="border-b border-[#EFE8DA] pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#A4895C] font-mono">
                  Clinical Q&amp;A
                </span>
                <h3 className="text-2xl font-serif font-bold text-[#1A1A1A]">
                  Frequently Asked Questions
                </h3>
              </div>

              <div className="space-y-3">
                {article.faqs.map((faq, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#EFE8DA] space-y-2">
                    <h4 className="text-sm font-serif font-bold text-[#1A1A1A]">
                      {faq.question}
                    </h4>
                    <p className="text-xs text-[#5A5552] leading-relaxed font-light">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Comprehensive E-E-A-T Author Bio Card */}
          <div className="my-12 p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] border border-[#EFE8DA] shadow-xs flex flex-col sm:flex-row items-start gap-6">
            <img
              src={author.avatar}
              alt={author.name}
              className="w-20 h-20 rounded-2xl object-cover border border-[#D4C3A3] shrink-0"
            />
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[10px] font-bold text-[#A4895C] uppercase tracking-wider font-mono">
                  Lead Clinical Author
                </span>
                <h4 className="text-lg font-serif font-bold text-[#1A1A1A]">{author.name}</h4>
                <div className="text-xs text-[#5A5552] font-medium">{author.title}</div>
              </div>
              <p className="text-xs text-[#5A5552] leading-relaxed font-light">
                {author.bio}
              </p>
              {author.qualifications && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {author.qualifications.map((q, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-md bg-[#FAF8F5] border border-[#EFE8DA] text-[10px] font-mono text-[#8A7147]">
                      {q}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="mt-12 pt-8 border-t border-[#EFE8DA] space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-serif font-bold text-[#1A1A1A]">
                  Related Editorial Analyses
                </h3>
                <button
                  onClick={() => navigateTo('/blog')}
                  className="text-xs font-bold text-[#A4895C] hover:underline"
                >
                  View All &rarr;
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => {
                      navigateTo(`/blog/${rel.slug}`);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="cursor-pointer bg-white rounded-2xl border border-[#EFE8DA] overflow-hidden p-4 space-y-3 hover:border-[#A4895C] transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <img
                        src={rel.coverImage}
                        alt={rel.title}
                        className="w-full h-32 object-cover rounded-xl"
                      />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#A4895C] font-mono">
                        {rel.category}
                      </span>
                      <h4 className="text-xs font-serif font-bold text-[#1A1A1A] line-clamp-2">
                        {rel.title}
                      </h4>
                    </div>
                    <div className="text-[10px] text-[#8A847F] pt-2 border-t border-[#F5EFE6]">
                      {rel.readTime}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </article>
    );
  }

  // Fallback: Individual Product Review Page (for any of the 29 products) with complete 13-Section Specification
  return (
    <ProductReviewTemplate
      product={product}
      products={products}
      navigateTo={navigateTo}
    />
  );
}
