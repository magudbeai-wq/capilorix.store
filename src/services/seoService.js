// Capilorix Technical SEO Engine (Step 7)
// Dynamic Document Metadata, Open Graph, Canonical URLs, and JSON-LD Structured Data

import { productService } from './productService';
import { articleService } from './articleService';
import { mainCategories } from '../data/categories';
import { getAuthorById } from '../data/authors';

const SITE_URL = 'https://www.capilorix.store';
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=85';

export const seoService = {
  // Determine SEO metadata based on current pathname
  getMetadataForPath(pathname = '/') {
    const norm = pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname;

    // 1. Homepage
    if (norm === '' || norm === '/') {
      return {
        title: 'Capilorix | Discover Better Beauty. Make Smarter Choices.',
        description: 'Discover luxury skincare, Korean skin care routines, and clinical reviews on top beauty devices and serums across the USA, UK, and Canada.',
        canonical: `${SITE_URL}/`,
        image: DEFAULT_IMAGE,
        type: 'website',
        schema: this.getHomepageSchema()
      };
    }

    // 2. Products Directory
    if (norm === '/products') {
      return {
        title: 'Beauty Products Directory: 50 Curated Formulations | Capilorix',
        description: 'Browse our complete catalog of 50 laboratory-tested skincare, haircare, cosmetics, and dermal recovery products with verified merchant pricing.',
        canonical: `${SITE_URL}/products`,
        image: DEFAULT_IMAGE,
        type: 'website',
        schema: this.getBreadcrumbSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Products Directory', url: `${SITE_URL}/products` }
        ])
      };
    }

    // 3. Comparisons Page
    if (norm === '/comparisons') {
      return {
        title: 'Beauty Product Comparisons & Clinical Benchmarks (2026) | Capilorix',
        description: 'Side-by-side product comparisons evaluating active ingredients, molecular weight, skin tolerance, texture, and pricing across verified partner merchants.',
        canonical: `${SITE_URL}/comparisons`,
        image: DEFAULT_IMAGE,
        type: 'website',
        schema: this.getBreadcrumbSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Comparisons', url: `${SITE_URL}/comparisons` }
        ])
      };
    }

    // 4. Guides Page
    if (norm === '/guides') {
      return {
        title: 'Beauty & Skincare Buying Guides (2026) | Capilorix Editorial',
        description: 'Evidence-based beauty buying guides written by cosmetic chemists and trichologists. Demystifying retinoids, ceramides, UV filters, and styling tools.',
        canonical: `${SITE_URL}/guides`,
        image: DEFAULT_IMAGE,
        type: 'website',
        schema: this.getBreadcrumbSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Guides', url: `${SITE_URL}/guides` }
        ])
      };
    }

    // 5. Reviews / Blog Hub
    if (norm === '/reviews' || norm === '/blog') {
      return {
        title: 'Editorial Reviews & Laboratory Investigations | Capilorix',
        description: 'Unbiased cosmetic reviews and laboratory audits. Real ingredient forensics, clinical performance ratings, and certified merchant discounts.',
        canonical: `${SITE_URL}/blog`,
        image: DEFAULT_IMAGE,
        type: 'website',
        schema: this.getBreadcrumbSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Editorial Reviews', url: `${SITE_URL}/blog` }
        ])
      };
    }

    // 6. Individual Article or Review: /blog/:slug or /reviews/:slug
    if (norm.startsWith('/blog/') || norm.startsWith('/reviews/')) {
      const slug = norm.replace(/^\/(blog|reviews)\//, '');
      
      // Check CMS Article first
      const article = articleService.getArticleBySlug(slug);
      if (article) {
        const author = getAuthorById(article.authorId);
        return {
          title: article.metaTitle || `${article.title} | Capilorix`,
          description: article.metaDescription || article.excerpt,
          canonical: article.canonicalUrl || `${SITE_URL}/blog/${article.slug}`,
          image: article.coverImage || DEFAULT_IMAGE,
          type: 'article',
          schema: this.getArticleSchema(article, author)
        };
      }

      // Check Product Review
      const product = productService.getProductBySlug(slug);
      if (product) {
        return {
          title: `${product.name} Lab Review & Verified Pricing | Capilorix`,
          description: product.blogSummary || product.description,
          canonical: `${SITE_URL}/reviews/${product.slug}`,
          image: product.frontImage || product.image || DEFAULT_IMAGE,
          type: 'product',
          schema: this.getProductSchema(product)
        };
      }
    }

    // 7. 8 Main Categories
    const matchedCategory = mainCategories.find(c => '/' + c.slug === norm);
    if (matchedCategory) {
      return {
        title: matchedCategory.seoTitle,
        description: matchedCategory.seoDescription,
        canonical: `${SITE_URL}/${matchedCategory.slug}`,
        image: matchedCategory.image || DEFAULT_IMAGE,
        type: 'website',
        schema: this.getCategorySchema(matchedCategory)
      };
    }

    // 8. Trust & Policy Pages
    if (norm === '/editorial-policy') {
      return {
        title: 'Editorial & Testing Policy | Capilorix Standards',
        description: 'Read the Capilorix 5 Editorial Cornerstones. Our commitment to commercial independence, peer-reviewed dermatological forensics, and reader trust.',
        canonical: `${SITE_URL}/editorial-policy`,
        image: DEFAULT_IMAGE,
        type: 'website',
        schema: null
      };
    }

    if (norm === '/how-we-review') {
      return {
        title: 'How We Review & Test Beauty Products | Capilorix Methodology',
        description: 'The Capilorix 4-Stage Testing Methodology: INCI forensics, texture evaluation, 30-day cohort testing, and live merchant price checks.',
        canonical: `${SITE_URL}/how-we-review`,
        image: DEFAULT_IMAGE,
        type: 'website',
        schema: null
      };
    }

    if (norm === '/affiliate-disclosure' || norm === '/disclosure') {
      return {
        title: 'FTC Affiliate Disclosure & Commercial Transparency | Capilorix',
        description: 'Full disclosure of our affiliate relationships with CJ Affiliate, Impact.com, and retail merchants. Reader-supported, editorially independent.',
        canonical: `${SITE_URL}/affiliate-disclosure`,
        image: DEFAULT_IMAGE,
        type: 'website',
        schema: null
      };
    }

    if (norm === '/privacy-policy' || norm === '/privacy') {
      return {
        title: 'Privacy Policy (GDPR / CCPA) | Capilorix',
        description: 'Learn how Capilorix protects your personal data, browser cookies, and privacy rights across our international digital publications.',
        canonical: `${SITE_URL}/privacy-policy`,
        image: DEFAULT_IMAGE,
        type: 'website',
        schema: null
      };
    }

    if (norm === '/terms') {
      return {
        title: 'Terms of Service & Medical Disclaimer | Capilorix',
        description: 'Capilorix website terms of service, acceptable use, and cosmetic/medical informational disclaimers.',
        canonical: `${SITE_URL}/terms`,
        image: DEFAULT_IMAGE,
        type: 'website',
        schema: null
      };
    }

    if (norm === '/contact') {
      return {
        title: 'Contact the Editorial Board | Capilorix',
        description: 'Get in touch with Capilorix editors, cosmetic chemists, and affiliate commercial coordinators.',
        canonical: `${SITE_URL}/contact`,
        image: DEFAULT_IMAGE,
        type: 'website',
        schema: null
      };
    }

    // Default Fallback
    return {
      title: 'Capilorix | Discover Better Beauty. Make Smarter Choices.',
      description: 'Luxury beauty editorial, unbiased clinical reviews, and smart affiliate shopping guides.',
      canonical: `${SITE_URL}${pathname}`,
      image: DEFAULT_IMAGE,
      type: 'website',
      schema: null
    };
  },

  // Apply metadata to DOM (document.title, meta tags, and JSON-LD script)
  applyMetadata(pathname) {
    if (typeof document === 'undefined') return;

    const meta = this.getMetadataForPath(pathname);

    // 1. Title
    document.title = meta.title;

    // 2. Description (Strictly capped to 155 chars to satisfy Bing & Google SEO guidelines)
    let safeDesc = meta.description || '';
    if (safeDesc.length > 155) {
      safeDesc = safeDesc.substring(0, 152).trim() + '...';
    }
    let descEl = document.querySelector('meta[name="description"]');
    if (!descEl) {
      descEl = document.createElement('meta');
      descEl.name = 'description';
      document.head.appendChild(descEl);
    }
    descEl.setAttribute('content', safeDesc);

    // 3. Canonical
    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.rel = 'canonical';
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', meta.canonical);

    // 4. Open Graph
    this.setMetaProperty('og:title', meta.title);
    this.setMetaProperty('og:description', safeDesc);
    this.setMetaProperty('og:url', meta.canonical);
    this.setMetaProperty('og:image', meta.image);
    this.setMetaProperty('og:type', meta.type);

    // 5. Twitter
    this.setMetaProperty('twitter:title', meta.title);
    this.setMetaProperty('twitter:description', safeDesc);
    this.setMetaProperty('twitter:image', meta.image);

    // 6. JSON-LD Structured Data
    let scriptEl = document.getElementById('capilorix-dynamic-jsonld');
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = 'capilorix-dynamic-jsonld';
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }

    if (meta.schema) {
      scriptEl.textContent = JSON.stringify(meta.schema, null, 2);
    } else {
      scriptEl.textContent = '';
    }
  },

  setMetaProperty(property, content) {
    let el = document.querySelector(`meta[property="${property}"]`) || document.querySelector(`meta[name="${property}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute('property', property);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content || '');
  },

  // Schema Generators
  getHomepageSchema() {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': `${SITE_URL}/#organization`,
          'name': 'Capilorix',
          'url': SITE_URL,
          'logo': `${SITE_URL}/logo.png`,
          'description': 'Premier international beauty editorial magazine and independent affiliate review platform.',
          'sameAs': [
            'https://twitter.com/capilorix',
            'https://instagram.com/capilorix.beauty',
            'https://pinterest.com/capilorix'
          ]
        },
        {
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          'url': SITE_URL,
          'name': 'Capilorix Beauty Editorial',
          'publisher': { '@id': `${SITE_URL}/#organization` },
          'potentialAction': {
            '@type': 'SearchAction',
            'target': `${SITE_URL}/products?search={search_term_string}`,
            'query-input': 'required name=search_term_string'
          }
        }
      ]
    };
  },

  getBreadcrumbSchema(items = []) {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': items.map((item, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'name': item.name,
        'item': item.url
      }))
    };
  },

  getArticleSchema(article, author) {
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      'headline': article.title,
      'description': article.excerpt || article.metaDescription,
      'image': article.coverImage,
      'datePublished': article.publishedAt,
      'dateModified': article.updatedAt || article.publishedAt,
      'author': {
        '@type': 'Person',
        'name': author.name,
        'jobTitle': author.title,
        'url': `${SITE_URL}/about`
      },
      'publisher': {
        '@type': 'Organization',
        'name': 'Capilorix',
        'url': SITE_URL
      },
      'mainEntityOfPage': {
        '@type': 'WebPage',
        '@id': article.canonicalUrl || `${SITE_URL}/blog/${article.slug}`
      }
    };
  },

  getProductSchema(product) {
    return {
      '@context': 'https://schema.org',
      '@type': 'Product',
      'name': product.name,
      'image': product.frontImage || product.image,
      'description': product.description,
      'brand': {
        '@type': 'Brand',
        'name': product.brand
      },
      'sku': product.sku || undefined,
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': product.rating || '4.8',
        'reviewCount': product.reviewCount || 100,
        'bestRating': '5',
        'worstRating': '1'
      },
      'offers': {
        '@type': 'Offer',
        'price': product.price,
        'priceCurrency': product.currency === '£' ? 'GBP' : product.currency === '€' ? 'EUR' : 'USD',
        'availability': 'https://schema.org/InStock',
        'url': product.affiliateUrl || product.buyUrl,
        'seller': {
          '@type': 'Organization',
          'name': product.merchant
        }
      }
    };
  },

  getCategorySchema(category) {
    return {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      'name': category.name,
      'description': category.seoDescription,
      'url': `${SITE_URL}/${category.slug}`,
      'mainEntity': {
        '@type': 'ItemList',
        'name': `${category.name} Formulas`,
        'itemListOrder': 'https://schema.org/ItemListOrderDescending'
      }
    };
  }
};

