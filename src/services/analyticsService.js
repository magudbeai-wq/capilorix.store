// Capilorix Affiliate Outbound Click & Conversion Tracking Service
// Implements sub-ID (sid) attribution and non-PII click telemetry

const CLICKS_STORAGE_KEY = 'capilorix_affiliate_clicks';

export const analyticsService = {
  // Get all recorded outbound affiliate clicks
  getClicks() {
    try {
      const stored = localStorage.getItem(CLICKS_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to load clicks from localStorage:', e);
    }
    // Default initial demonstration logs
    return [
      {
        id: 'clk_1',
        productId: 'revolve-rael-microcrystal-activated-pm-serum-2000',
        productName: 'Rael Microcrystal Activated PM Serum 2000',
        merchant: 'REVOLVE',
        network: 'CJ Affiliate',
        targetUrl: 'http://www.revolve.com/content/deeplink/womens/product/RUHL-WU33',
        subId: 'cpx_review_sidebar',
        country: 'US',
        timestamp: new Date(Date.now() - 1000 * 60 * 35).toISOString()
      },
      {
        id: 'clk_2',
        productId: 'beauty-formulas-ceramides-atjaunojoss-serums-30-ml',
        productName: 'Beauty Formulas Ceramides Atjaunojošs Serums 30ml',
        merchant: 'NOTINO.lv',
        network: 'CJ Affiliate',
        targetUrl: 'https://www.notino.lv/beauty-formulas/ceramides-atjaunojoss-serums/p-16355753/',
        subId: 'cpx_skincare_hub',
        country: 'LV',
        timestamp: new Date(Date.now() - 1000 * 60 * 95).toISOString()
      },
      {
        id: 'clk_3',
        productId: 'iope-uv-shield-tone-up-sun-makeup-base-spf50',
        productName: 'IOPE UV Shield Tone-Up Sun Makeup Base SPF50+ PA++++',
        merchant: 'Amore Mall',
        network: 'CJ Affiliate',
        targetUrl: 'https://global.amoremall.com/products/uv-shield-tone-up-sun-makeup-base-spf50-pa-50ml',
        subId: 'cpx_kbeauty_editorial',
        country: 'US',
        timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString()
      }
    ];
  },

  // Record an outbound affiliate click event
  trackOutboundClick(product, options = {}) {
    if (!product) return;

    try {
      const clicks = this.getClicks();
      const clickEvent = {
        id: 'clk_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36),
        productId: product.id || 'unknown',
        productName: product.name || 'Unnamed Product',
        merchant: product.merchant || 'Direct Partner',
        network: product.affiliateNetwork || (product.advertiserId ? 'CJ Affiliate' : 'Direct / Impact'),
        targetUrl: product.affiliateUrl || product.buyUrl || '#',
        subId: options.subId || `capilorix_${(product.mainCategory || 'web')}_${Date.now().toString(36)}`,
        country: options.country || product.targetCountry || 'Global',
        referrer: window.location.pathname,
        timestamp: new Date().toISOString()
      };

      clicks.unshift(clickEvent);
      // Keep recent 1000 clicks in local cache
      const capped = clicks.slice(0, 1000);
      localStorage.setItem(CLICKS_STORAGE_KEY, JSON.stringify(capped));

      // Trigger custom window event for real-time dashboard listeners
      window.dispatchEvent(new CustomEvent('capilorix:affiliate_click', { detail: clickEvent }));
      return clickEvent;
    } catch (e) {
      console.error('Failed to record affiliate click:', e);
    }
  },

  // Calculate summary metrics for the Admin Dashboard
  getMetrics() {
    const clicks = this.getClicks();
    const totalClicks = clicks.length;

    // Group by merchant
    const merchantCounts = {};
    const productCounts = {};
    const countryCounts = {};

    clicks.forEach((c) => {
      merchantCounts[c.merchant] = (merchantCounts[c.merchant] || 0) + 1;
      productCounts[c.productName] = (productCounts[c.productName] || 0) + 1;
      countryCounts[c.country] = (countryCounts[c.country] || 0) + 1;
    });

    const topMerchants = Object.entries(merchantCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const topProducts = Object.entries(productCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return {
      totalClicks,
      topMerchants,
      topProducts,
      countryCounts,
      recentClicks: clicks.slice(0, 10)
    };
  },

  // Clear click log
  clearClicks() {
    localStorage.removeItem(CLICKS_STORAGE_KEY);
  }
};

