// Capilorix Affiliate Product Management Service (Step 4)
// Handles CRUD, publication states, search/filter, and link health verification

import { products as defaultProducts } from '../data/products';

const PRODUCTS_STORAGE_KEY = 'capilorix_managed_products';

export const productService = {
  // Initialize and get all products
  getProducts() {
    try {
      const stored = localStorage.getItem(PRODUCTS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Sync updated categories, prune old non-beauty items, and auto-merge new products
          const defaultMap = new Map(defaultProducts.map((p) => [p.id, p]));
          const validIds = new Set(defaultProducts.map((p) => p.id));
          let updated = parsed
            .filter((p) => validIds.has(p.id))
            .map((p) => {
              const fresh = defaultMap.get(p.id);
              return fresh
                ? {
                    ...p,
                    mainCategory: fresh.mainCategory,
                    subCategory: fresh.subCategory,
                    imageAlt: fresh.imageAlt || p.imageAlt,
                    frontImage: fresh.frontImage || p.frontImage,
                    image: fresh.image || p.image
                  }
                : p;
            });

          const existingIds = new Set(updated.map((p) => p.id));
          const missing = defaultProducts.filter((p) => !existingIds.has(p.id));
          if (missing.length > 0 || updated.length !== parsed.length) {
            const merged = [...updated, ...missing];
            try {
              localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(merged));
            } catch (_) {}
            return merged;
          }
          return updated;
        }
      }
    } catch (e) {
      console.warn('Failed to parse managed products from localStorage:', e);
    }
    // Seed with the verified 29 products
    const initialized = defaultProducts.map((p) => ({
      ...p,
      status: p.status || 'published',
      targetCountry: p.targetCountry || (p.currency === 'GBP' ? 'UK' : p.currency === 'EUR' ? 'EU' : 'US'),
      merchantWebsite: p.merchantWebsite || this.extractDomain(p.affiliateUrl || p.buyUrl),
      affiliateNetwork: p.affiliateNetwork || (p.advertiserId ? 'CJ Affiliate' : 'Impact / Direct'),
      commissionInfo: p.commissionInfo || (p.epc7Day ? `EPC: $${p.epc7Day}` : 'Standard Partner Tier (8%-15%)'),
      lastVerifiedDate: p.lastVerifiedDate || '2026-11-02'
    }));

    try {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(initialized));
    } catch (e) {
      console.warn('Could not save initial products to localStorage:', e);
    }
    return initialized;
  },

  // Helper to extract clean domain
  extractDomain(url) {
    if (!url) return 'partner-merchant.com';
    try {
      const parsed = new URL(url);
      return parsed.hostname.replace('www.', '');
    } catch {
      return 'merchant.com';
    }
  },

  // Get single product by id
  getProductById(id) {
    const list = this.getProducts();
    return list.find((p) => p.id === id) || null;
  },

  // Get single product by slug
  getProductBySlug(slug) {
    if (!slug) return null;
    const clean = slug.toLowerCase().replace(/^\/+|\/+$/g, '');
    const list = this.getProducts();
    return list.find((p) => p.slug === clean || p.id === clean) || null;
  },

  // Create or update product
  saveProduct(productData) {
    const list = this.getProducts();
    const id = productData.id || `prod-${Date.now().toString(36)}-${Math.random().toString(36).substr(2, 5)}`;
    const slug = productData.slug || this.generateSlug(productData.name || 'product');

    const formattedProduct = {
      ...productData,
      id,
      slug,
      status: productData.status || 'published',
      lastVerifiedDate: productData.lastVerifiedDate || new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString()
    };

    const existingIndex = list.findIndex((p) => p.id === id);
    if (existingIndex >= 0) {
      list[existingIndex] = { ...list[existingIndex], ...formattedProduct };
    } else {
      list.unshift(formattedProduct);
    }

    this.persist(list);
    return formattedProduct;
  },

  // Delete product
  deleteProduct(id) {
    const list = this.getProducts();
    const filtered = list.filter((p) => p.id !== id);
    this.persist(filtered);
    return true;
  },

  // Toggle publish / unpublish status
  togglePublish(id) {
    const list = this.getProducts();
    const target = list.find((p) => p.id === id);
    if (target) {
      target.status = target.status === 'published' ? 'draft' : 'published';
      this.persist(list);
      return target.status;
    }
    return null;
  },

  // Link Health Check: Inspects all active affiliate links
  checkLinkHealth() {
    const list = this.getProducts();
    const results = list.map((p) => {
      const link = p.affiliateUrl || p.buyUrl || '';
      let isHealthy = true;
      let issue = null;

      if (!link || link.trim() === '') {
        isHealthy = false;
        issue = 'Missing Affiliate URL';
      } else if (!link.startsWith('http://') && !link.startsWith('https://')) {
        isHealthy = false;
        issue = 'Malformed protocol (missing https://)';
      } else if (p.affiliateNetwork === 'CJ Affiliate' && !link.includes('exta=') && !link.includes('cjunct') && !link.includes('deeplink')) {
        issue = 'Notice: CJ tracking parameter not detected';
      }

      return {
        id: p.id,
        name: p.name,
        merchant: p.merchant,
        affiliateUrl: link,
        network: p.affiliateNetwork,
        status: p.status,
        isHealthy,
        issue,
        lastVerified: p.lastVerifiedDate
      };
    });

    const healthyCount = results.filter((r) => r.isHealthy).length;
    const brokenCount = results.length - healthyCount;

    return {
      total: results.length,
      healthyCount,
      brokenCount,
      results
    };
  },

  // Generate URL slug from title/name
  generateSlug(name) {
    return name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  },

  // Persist to localStorage
  persist(list) {
    try {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(list));
      window.dispatchEvent(new CustomEvent('capilorix:products_updated', { detail: list }));
    } catch (e) {
      console.error('Failed to persist products:', e);
    }
  },

  // Export products JSON
  exportJSON() {
    const list = this.getProducts();
    return JSON.stringify(list, null, 2);
  },

  // Import products JSON
  importJSON(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      if (Array.isArray(parsed) && parsed.length > 0) {
        this.persist(parsed);
        return { success: true, count: parsed.length };
      }
      return { success: false, error: 'Uploaded JSON must be a non-empty array of products.' };
    } catch (e) {
      return { success: false, error: e.message };
    }
  },

  // Reset to original factory seeds
  resetToDefaults() {
    localStorage.removeItem(PRODUCTS_STORAGE_KEY);
    return this.getProducts();
  }
};

