import React from 'react';
import { Package, FileText, MousePointerClick, CheckCircle, AlertTriangle, Building2, TrendingUp, ArrowUpRight } from 'lucide-react';

export default function AdminOverviewTab({ products, articles, metrics, setActiveTab, navigateTo }) {
  const publishedProducts = products.filter((p) => p.status === 'published').length;
  const publishedArticles = articles.filter((a) => a.status === 'published').length;
  const draftArticles = articles.filter((a) => a.status === 'draft' || a.status === 'under-review').length;

  return (
    <div className="space-y-8">
      
      {/* Top Welcome & KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#EFE8DA] shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold text-[#8A847F] mb-2">
            <span>Total Curated Products</span>
            <Package className="w-4 h-4 text-[#A4895C]" />
          </div>
          <div className="text-3xl font-serif font-black text-[#1A1A1A]">
            {products.length}
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-[#2A6E3B]">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>{publishedProducts} Published Active</span>
          </div>
        </div>

        <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#EFE8DA] shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold text-[#8A847F] mb-2">
            <span>Editorial Articles</span>
            <FileText className="w-4 h-4 text-[#A4895C]" />
          </div>
          <div className="text-3xl font-serif font-black text-[#1A1A1A]">
            {articles.length}
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-[#8A847F]">
            <span>{publishedArticles} Live • {draftArticles} In Review/Draft</span>
          </div>
        </div>

        <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#EFE8DA] shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold text-[#8A847F] mb-2">
            <span>Affiliate Outbound Clicks</span>
            <MousePointerClick className="w-4 h-4 text-[#A4895C]" />
          </div>
          <div className="text-3xl font-serif font-black text-[#1A1A1A]">
            {metrics.totalClicks}
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-[#2A6E3B]">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Real-time sub-ID attribution</span>
          </div>
        </div>

        <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#EFE8DA] shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold text-[#8A847F] mb-2">
            <span>Affiliate Networks</span>
            <Building2 className="w-4 h-4 text-[#A4895C]" />
          </div>
          <div className="text-3xl font-serif font-black text-[#1A1A1A]">
            2 Active
          </div>
          <div className="mt-2 text-xs text-[#5A5552]">
            <span>CJ Affiliate + Impact.com</span>
          </div>
        </div>

      </div>

      {/* Quick Launch Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => setActiveTab('products')}
          className="text-left bg-[#FFFFFF] p-5 rounded-2xl border border-[#EFE8DA] hover:border-[#A4895C] transition-all group shadow-xs"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#A4895C]">Affiliate Engine</span>
            <ArrowUpRight className="w-4 h-4 text-[#8A847F] group-hover:text-[#1A1A1A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
          <h3 className="text-lg font-serif font-bold text-[#1A1A1A] mb-1">Manage {products.length} Beauty Products</h3>
          <p className="text-xs text-[#8A847F]">Edit affiliate URLs, track EPCs, update merchant disclosures, or toggle live status.</p>
        </button>

        <button
          onClick={() => setActiveTab('articles')}
          className="text-left bg-[#FFFFFF] p-5 rounded-2xl border border-[#EFE8DA] hover:border-[#A4895C] transition-all group shadow-xs"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#A4895C]">Editorial CMS</span>
            <ArrowUpRight className="w-4 h-4 text-[#8A847F] group-hover:text-[#1A1A1A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
          <h3 className="text-lg font-serif font-bold text-[#1A1A1A] mb-1">Publish SEO Content</h3>
          <p className="text-xs text-[#8A847F]">Draft roundups, product reviews, side-by-side comparisons, and E-E-A-T guides.</p>
        </button>

        <button
          onClick={() => setActiveTab('links')}
          className="text-left bg-[#FFFFFF] p-5 rounded-2xl border border-[#EFE8DA] hover:border-[#A4895C] transition-all group shadow-xs"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#A4895C]">Link Health</span>
            <ArrowUpRight className="w-4 h-4 text-[#8A847F] group-hover:text-[#1A1A1A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
          <h3 className="text-lg font-serif font-bold text-[#1A1A1A] mb-1">Audit Tracking Links</h3>
          <p className="text-xs text-[#8A847F]">Verify URL schemes, CJ exta parameters, and ensure zero 404 affiliate destinations.</p>
        </button>
      </div>

      {/* Top Merchants & Recent Clicks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Top Merchants by Conversion Click Share */}
        <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#EFE8DA] shadow-xs">
          <h3 className="text-lg font-serif font-bold text-[#1A1A1A] mb-4">
            Top Performing Affiliate Merchants
          </h3>
          <div className="space-y-3">
            {metrics.topMerchants.length > 0 ? (
              metrics.topMerchants.map((m, idx) => (
                <div key={m.name} className="flex items-center justify-between p-3 rounded-xl bg-[#FAF8F5] border border-[#EFE8DA]">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center text-xs font-bold font-mono">
                      {idx + 1}
                    </span>
                    <div>
                      <div className="text-xs font-bold text-[#1A1A1A]">{m.name}</div>
                      <div className="text-[10px] text-[#8A847F]">CJ Affiliate Program</div>
                    </div>
                  </div>
                  <div className="text-xs font-bold text-[#A4895C]">
                    {m.count} Outbound Clicks
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-[#8A847F] py-4 text-center">No outbound click data recorded yet.</p>
            )}
          </div>
        </div>

        {/* Recent Outbound Click Stream */}
        <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#EFE8DA] shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-serif font-bold text-[#1A1A1A]">
              Recent Outbound Affiliate Activity
            </h3>
            <button
              onClick={() => setActiveTab('clicks')}
              className="text-xs text-[#A4895C] font-semibold hover:underline"
            >
              View Full Log &rarr;
            </button>
          </div>
          
          <div className="space-y-3">
            {metrics.recentClicks.length > 0 ? (
              metrics.recentClicks.slice(0, 5).map((clk) => (
                <div key={clk.id} className="p-3 rounded-xl bg-[#FAF8F5] border border-[#EFE8DA] flex items-center justify-between text-xs">
                  <div className="truncate mr-3">
                    <div className="font-bold text-[#1A1A1A] truncate">{clk.productName}</div>
                    <div className="text-[10px] text-[#8A847F] flex items-center gap-2 mt-0.5 font-mono">
                      <span>{clk.merchant}</span>
                      <span>•</span>
                      <span>SubID: {clk.subId}</span>
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <span className="px-2 py-0.5 rounded bg-[#F5EFE6] text-[#8A7147] font-semibold text-[10px]">
                      {clk.country}
                    </span>
                    <div className="text-[10px] text-[#8A847F] mt-0.5 font-mono">
                      {new Date(clk.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-[#8A847F] py-4 text-center">No clicks recorded yet.</p>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}

