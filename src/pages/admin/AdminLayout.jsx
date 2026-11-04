import React, { useState, useEffect } from 'react';
import { authService } from '../../services/authService';
import { productService } from '../../services/productService';
import { articleService } from '../../services/articleService';
import { analyticsService } from '../../services/analyticsService';

import AdminOverviewTab from './AdminOverviewTab';
import AdminProductsTab from './AdminProductsTab';
import AdminArticlesTab from './AdminArticlesTab';
import AdminClicksTab from './AdminClicksTab';
import AdminLinksTab from './AdminLinksTab';
import AdminSettingsTab from './AdminSettingsTab';

import { 
  LayoutDashboard, Package, FileText, MousePointerClick, 
  Link2, Settings, LogOut, ArrowLeft, Shield, Sparkles 
} from 'lucide-react';

export default function AdminLayout({ navigateTo, onLogout }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentUser, setCurrentUser] = useState(() => authService.getUser());
  const [products, setProducts] = useState(() => productService.getProducts());
  const [articles, setArticles] = useState(() => articleService.getArticles());
  const [metrics, setMetrics] = useState(() => analyticsService.getMetrics());

  // Reload handler when data changes
  const reloadData = () => {
    setProducts(productService.getProducts());
    setArticles(articleService.getArticles());
    setMetrics(analyticsService.getMetrics());
  };

  // Product Actions
  const handleSaveProduct = (prodData) => {
    productService.saveProduct(prodData);
    reloadData();
  };

  const handleDeleteProduct = (id) => {
    productService.deleteProduct(id);
    reloadData();
  };

  const handleToggleProductPublish = (id) => {
    productService.togglePublish(id);
    reloadData();
  };

  // Article Actions
  const handleSaveArticle = (artData) => {
    articleService.saveArticle(artData);
    reloadData();
  };

  const handleDeleteArticle = (id) => {
    articleService.deleteArticle(id);
    reloadData();
  };

  const handleUpdateArticleStatus = (id, newStatus) => {
    articleService.updateStatus(id, newStatus);
    reloadData();
  };

  const handleClearClicks = () => {
    analyticsService.clearClicks();
    reloadData();
  };

  const handleLogoutClick = () => {
    authService.logout();
    if (onLogout) onLogout();
    navigateTo('/');
  };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'products', label: `Products (${products.length})`, icon: Package },
    { id: 'articles', label: `Articles (${articles.length})`, icon: FileText },
    { id: 'clicks', label: 'Outbound Clicks', icon: MousePointerClick },
    { id: 'links', label: 'Link Health', icon: Link2 },
    { id: 'settings', label: 'Settings & Sync', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1A1A] flex flex-col">
      
      {/* Top Admin Masthead */}
      <header className="bg-[#1A1A1A] text-white border-b border-[#2C2926] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Brand & Portal Title */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigateTo('/')}
                className="flex items-center gap-2 text-xs text-[#D4C3A3] hover:text-white transition-colors"
                title="Return to Public Website"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">View Public Store</span>
              </button>

              <div className="h-4 w-px bg-white/20 hidden sm:block" />

              <div className="flex items-center gap-2">
                <span className="font-serif font-black tracking-wider text-base text-white">CAPILORIX</span>
                <span className="px-2 py-0.5 rounded-full bg-[#A4895C]/20 border border-[#A4895C]/40 text-[#D4C3A3] text-[10px] font-semibold uppercase tracking-wider">
                  Admin Console
                </span>
              </div>
            </div>

            {/* User Profile & Logout */}
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2.5 text-xs text-right">
                <div>
                  <div className="font-bold text-white">{currentUser?.name || 'Administrator'}</div>
                  <div className="text-[10px] text-[#D4C3A3] font-mono">{currentUser?.email || 'admin@capilorix.store'}</div>
                </div>
                <img
                  src={currentUser?.avatar}
                  alt="Admin"
                  className="w-8 h-8 rounded-full border border-[#D4C3A3] object-cover"
                />
              </div>

              <button
                onClick={handleLogoutClick}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-white transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-3.5 h-3.5 text-red-400" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>

          </div>

          {/* Navigation Bar */}
          <div className="flex items-center gap-1 overflow-x-auto py-2 border-t border-white/10 scrollbar-none">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-[#FFFFFF] text-[#1A1A1A] shadow-xs'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#A4895C]' : 'text-white/60'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

        </div>
      </header>

      {/* Main Admin Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <AdminOverviewTab
            products={products}
            articles={articles}
            metrics={metrics}
            setActiveTab={setActiveTab}
            navigateTo={navigateTo}
          />
        )}

        {activeTab === 'products' && (
          <AdminProductsTab
            products={products}
            onSaveProduct={handleSaveProduct}
            onDeleteProduct={handleDeleteProduct}
            onTogglePublish={handleToggleProductPublish}
          />
        )}

        {activeTab === 'articles' && (
          <AdminArticlesTab
            articles={articles}
            products={products}
            onSaveArticle={handleSaveArticle}
            onDeleteArticle={handleDeleteArticle}
            onUpdateStatus={handleUpdateArticleStatus}
            navigateTo={navigateTo}
          />
        )}

        {activeTab === 'clicks' && (
          <AdminClicksTab
            metrics={metrics}
            onClearClicks={handleClearClicks}
          />
        )}

        {activeTab === 'links' && (
          <AdminLinksTab
            products={products}
          />
        )}

        {activeTab === 'settings' && (
          <AdminSettingsTab
            onDataReload={reloadData}
          />
        )}
      </main>

      {/* Admin Footer */}
      <footer className="border-t border-[#EFE8DA] bg-white py-4 text-center text-xs text-[#8A847F]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Capilorix Beauty Editorial Architecture • Internal Management Mode</span>
          <span className="font-mono text-[11px]">System Status: All 29 Commercial Links Operational</span>
        </div>
      </footer>

    </div>
  );
}
