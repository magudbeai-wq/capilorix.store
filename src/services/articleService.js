// Capilorix SEO Article Publishing System & CMS Service (Step 5)
// Supports Roundups, Product Reviews, Comparisons, and Guides with E-E-A-T Author Profiles

import { seedArticles } from '../data/articles';
import { authors, getAuthorById } from '../data/authors';

const ARTICLES_STORAGE_KEY = 'capilorix_managed_articles';

export const articleService = {
  // Get all articles
  getArticles() {
    try {
      const stored = localStorage.getItem(ARTICLES_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to parse managed articles from localStorage:', e);
    }

    try {
      localStorage.setItem(ARTICLES_STORAGE_KEY, JSON.stringify(seedArticles));
    } catch (e) {
      console.warn('Could not save initial articles to localStorage:', e);
    }
    return seedArticles;
  },

  // Get only published articles for public readers
  getPublishedArticles() {
    return this.getArticles().filter((a) => a.status === 'published');
  },

  // Get single article by slug
  getArticleBySlug(slug) {
    if (!slug) return null;
    const clean = slug.toLowerCase().replace(/^\/+|\/+$/g, '');
    const list = this.getArticles();
    return list.find((a) => a.slug === clean || a.id === clean) || null;
  },

  // Get single article by id
  getArticleById(id) {
    const list = this.getArticles();
    return list.find((a) => a.id === id) || null;
  },

  // Create or update an article
  saveArticle(articleData) {
    const list = this.getArticles();
    const id = articleData.id || `art-${Date.now().toString(36)}-${Math.random().toString(36).substr(2, 5)}`;
    const slug = articleData.slug ? this.generateSlug(articleData.slug) : this.generateSlug(articleData.title || 'beauty-article');

    const formattedArticle = {
      ...articleData,
      id,
      slug,
      status: articleData.status || 'draft',
      authorId: articleData.authorId || 'dr-elena-vance',
      publishedAt: articleData.publishedAt || new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      metaTitle: articleData.metaTitle || `${articleData.title} | Capilorix`,
      metaDescription: articleData.metaDescription || articleData.excerpt || 'Read the independent clinical review and buying advice on Capilorix.',
      canonicalUrl: articleData.canonicalUrl || `https://www.capilorix.store/blog/${slug}`,
      assignedProductIds: articleData.assignedProductIds || [],
      faqs: articleData.faqs || [],
      pros: articleData.pros || [],
      cons: articleData.cons || [],
      contentSections: articleData.contentSections || []
    };

    const existingIndex = list.findIndex((a) => a.id === id);
    if (existingIndex >= 0) {
      list[existingIndex] = { ...list[existingIndex], ...formattedArticle };
    } else {
      list.unshift(formattedArticle);
    }

    this.persist(list);
    return formattedArticle;
  },

  // Delete article
  deleteArticle(id) {
    const list = this.getArticles();
    const filtered = list.filter((a) => a.id !== id);
    this.persist(filtered);
    return true;
  },

  // Update status (draft, under-review, published, archived)
  updateStatus(id, newStatus) {
    const list = this.getArticles();
    const target = list.find((a) => a.id === id);
    if (target) {
      target.status = newStatus;
      target.updatedAt = new Date().toISOString().split('T')[0];
      this.persist(list);
      return target;
    }
    return null;
  },

  // Generate SEO-friendly slug
  generateSlug(title) {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  },

  // Persist articles list
  persist(list) {
    try {
      localStorage.setItem(ARTICLES_STORAGE_KEY, JSON.stringify(list));
      window.dispatchEvent(new CustomEvent('capilorix:articles_updated', { detail: list }));
    } catch (e) {
      console.error('Failed to persist articles:', e);
    }
  },

  // Export articles JSON
  exportJSON() {
    const list = this.getArticles();
    return JSON.stringify(list, null, 2);
  },

  // Import articles JSON
  importJSON(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      if (Array.isArray(parsed) && parsed.length > 0) {
        this.persist(parsed);
        return { success: true, count: parsed.length };
      }
      return { success: false, error: 'Uploaded JSON must be a non-empty array of articles.' };
    } catch (e) {
      return { success: false, error: e.message };
    }
  },

  // Reset to default seed articles
  resetToDefaults() {
    localStorage.removeItem(ARTICLES_STORAGE_KEY);
    return this.getArticles();
  }
};

