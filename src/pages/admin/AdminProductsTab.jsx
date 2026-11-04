import React, { useState } from 'react';
import { mainCategories } from '../../data/categories';
import { 
  Package, Search, Plus, Edit2, Trash2, Eye, EyeOff, ExternalLink, 
  Check, X, AlertCircle, Sparkles, Filter, Globe, Building2, CheckCircle2 
} from 'lucide-react';

export default function AdminProductsTab({ products, onSaveProduct, onDeleteProduct, onTogglePublish }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [merchantFilter, setMerchantFilter] = useState('All');
  const [countryFilter, setCountryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  // Form State
  const initialForm = {
    name: '',
    brand: '',
    category: 'Skincare',
    mainCategory: 'skincare',
    subCategory: 'Serums',
    secondaryCategories: ['skincare'],
    price: 35.0,
    originalPrice: 45.0,
    currency: '$',
    frontImage: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1000&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1000&q=85'
    ],
    description: '',
    ingredients: '',
    advantages: '',
    disadvantages: '',
    merchant: 'OnBuy.com',
    merchantWebsite: 'onbuy.com',
    affiliateUrl: '',
    affiliateNetwork: 'CJ Affiliate',
    targetCountry: 'US',
    commissionInfo: '10% CPS / EPC: $8.33',
    status: 'published',
    rating: 4.8,
    reviewCount: 120
  };

  const [formData, setFormData] = useState(initialForm);

  // Extract unique merchants and countries for filter dropdowns
  const uniqueMerchants = ['All', ...new Set(products.map((p) => p.merchant).filter(Boolean))];
  const uniqueCountries = ['All', ...new Set(products.map((p) => p.targetCountry).filter(Boolean))];

  // Filter products
  const filteredProducts = products.filter((p) => {
    const matchesSearch = !searchTerm ||
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.merchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.sku && p.sku.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCat = categoryFilter === 'All' || 
      p.mainCategory === categoryFilter.toLowerCase() ||
      p.category === categoryFilter;

    const matchesMerchant = merchantFilter === 'All' || p.merchant === merchantFilter;
    const matchesCountry = countryFilter === 'All' || p.targetCountry === countryFilter;
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;

    return matchesSearch && matchesCat && matchesMerchant && matchesCountry && matchesStatus;
  });

  const handleOpenCreate = () => {
    setEditingProduct(null);
    setFormData(initialForm);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (prod) => {
    setEditingProduct(prod);
    setFormData({
      ...prod,
      advantages: Array.isArray(prod.pros) ? prod.pros.join('\n') : (prod.pros || ''),
      disadvantages: Array.isArray(prod.cons) ? prod.cons.join('\n') : (prod.cons || ''),
      ingredients: Array.isArray(prod.keyIngredients) ? prod.keyIngredients.join(', ') : (prod.keyIngredients || ''),
      galleryImages: prod.galleryImages || [prod.frontImage || prod.image]
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const prosArray = formData.advantages ? formData.advantages.split('\n').map((s) => s.trim()).filter(Boolean) : [];
    const consArray = formData.disadvantages ? formData.disadvantages.split('\n').map((s) => s.trim()).filter(Boolean) : [];
    const ingredientsArray = formData.ingredients ? formData.ingredients.split(',').map((s) => s.trim()).filter(Boolean) : [];

    const productPayload = {
      ...formData,
      id: editingProduct ? editingProduct.id : undefined,
      pros: prosArray,
      cons: consArray,
      keyIngredients: ingredientsArray,
      image: formData.frontImage,
      lastVerifiedDate: new Date().toISOString().split('T')[0]
    };

    onSaveProduct(productPayload);
    setIsModalOpen(false);
    showNotice(editingProduct ? 'Product updated successfully.' : 'New product created successfully.');
  };

  const showNotice = (msg) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(''), 4000);
  };

  return (
    <div className="space-y-6">
      
      {/* Feedback Banner */}
      {feedbackMsg && (
        <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-900 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-green-600" />
          <span>{feedbackMsg}</span>
        </div>
      )}

      {/* Header & Create Product Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EFE8DA] pb-5">
        <div>
          <h2 className="text-2xl font-serif font-black text-[#1A1A1A]">
            Affiliate Products Directory
          </h2>
          <p className="text-xs text-[#8A847F] mt-1">
            Manage product specs, affiliate tracking URLs, merchant affiliations, and publication status.
          </p>
        </div>
        
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1A1A1A] text-white text-xs font-semibold tracking-wider uppercase hover:bg-[#2C2926] transition-all shadow-xs shrink-0"
        >
          <Plus className="w-4 h-4 text-[#D4C3A3]" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-[#FFFFFF] p-4 rounded-2xl border border-[#EFE8DA] shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row gap-3">
          
          {/* Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#8A847F] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by product name, brand, SKU or merchant..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#FAF8F5] border border-[#EFE8DA] text-xs text-[#1A1A1A] focus:outline-none focus:border-[#A4895C]"
            />
          </div>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#EFE8DA] text-xs font-medium text-[#1A1A1A] focus:outline-none focus:border-[#A4895C]"
          >
            <option value="All">All Categories ({products.length})</option>
            {mainCategories.map((c) => (
              <option key={c.slug} value={c.name}>{c.name}</option>
            ))}
          </select>

          {/* Merchant Filter */}
          <select
            value={merchantFilter}
            onChange={(e) => setMerchantFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#EFE8DA] text-xs font-medium text-[#1A1A1A] focus:outline-none focus:border-[#A4895C]"
          >
            {uniqueMerchants.map((m) => (
              <option key={m} value={m}>{m === 'All' ? 'All Merchants' : m}</option>
            ))}
          </select>

          {/* Country Filter */}
          <select
            value={countryFilter}
            onChange={(e) => setCountryFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#EFE8DA] text-xs font-medium text-[#1A1A1A] focus:outline-none focus:border-[#A4895C]"
          >
            {uniqueCountries.map((c) => (
              <option key={c} value={c}>{c === 'All' ? 'All Countries' : c}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#EFE8DA] text-xs font-medium text-[#1A1A1A] focus:outline-none focus:border-[#A4895C]"
          >
            <option value="All">All Statuses</option>
            <option value="published">Published Live</option>
            <option value="draft">Draft / Unpublished</option>
          </select>

        </div>

        <div className="flex items-center justify-between text-xs text-[#8A847F] pt-2 border-t border-[#F5EFE6] font-mono">
          <div>Showing <span className="font-bold text-[#1A1A1A]">{filteredProducts.length}</span> of {products.length} products</div>
          {(searchTerm || categoryFilter !== 'All' || merchantFilter !== 'All' || countryFilter !== 'All' || statusFilter !== 'All') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setCategoryFilter('All');
                setMerchantFilter('All');
                setCountryFilter('All');
                setStatusFilter('All');
              }}
              className="text-[#A4895C] hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-[#FFFFFF] rounded-2xl border border-[#EFE8DA] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#FAF8F5] border-b border-[#EFE8DA] text-[#5A5552] font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Product &amp; Brand</th>
                <th className="py-3 px-4">Category &amp; Country</th>
                <th className="py-3 px-4">Merchant &amp; Network</th>
                <th className="py-3 px-4">Price &amp; Commission</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5EFE6]">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-[#FCFAF7] transition-colors">
                  
                  {/* Product & Brand */}
                  <td className="py-3 px-4 max-w-xs">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.frontImage || p.image}
                        alt={p.name}
                        className="w-11 h-11 object-cover rounded-xl bg-[#FAF8F5] border border-[#EFE8DA] shrink-0"
                      />
                      <div className="truncate">
                        <div className="font-bold text-[#1A1A1A] truncate" title={p.name}>
                          {p.name}
                        </div>
                        <div className="text-[11px] text-[#8A847F] flex items-center gap-2 mt-0.5">
                          <span>{p.brand}</span>
                          {p.sku && <span className="font-mono text-[10px] text-[#A4895C]">SKU: {p.sku}</span>}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Category & Country */}
                  <td className="py-3 px-4">
                    <span className="inline-block px-2 py-0.5 rounded-md bg-[#FAF8F5] border border-[#EFE8DA] text-[#1A1A1A] font-semibold text-[11px] capitalize">
                      {p.mainCategory || p.category}
                    </span>
                    <div className="text-[10px] text-[#8A847F] mt-1 font-mono">
                      Target: <span className="font-bold text-[#1A1A1A]">{p.targetCountry || 'Global'}</span>
                    </div>
                  </td>

                  {/* Merchant & Network */}
                  <td className="py-3 px-4">
                    <div className="font-bold text-[#1A1A1A]">{p.merchant}</div>
                    <div className="text-[10px] text-[#8A847F] mt-0.5">
                      {p.affiliateNetwork || 'CJ Affiliate'}
                    </div>
                  </td>

                  {/* Price & Commission */}
                  <td className="py-3 px-4">
                    <div className="font-bold text-[#1A1A1A]">
                      {p.currency || '$'}{p.price}
                    </div>
                    <div className="text-[10px] text-[#A4895C] mt-0.5 font-medium truncate max-w-[130px]" title={p.commissionInfo}>
                      {p.commissionInfo || 'Standard Partner Tier'}
                    </div>
                  </td>

                  {/* Publication Status Toggle */}
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => onTogglePublish(p.id)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase transition-colors ${
                        p.status === 'published'
                          ? 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100'
                          : 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100'
                      }`}
                      title="Click to toggle publication status"
                    >
                      {p.status === 'published' ? (
                        <>
                          <Eye className="w-3 h-3 text-green-600" />
                          <span>Live</span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3 h-3 text-amber-600" />
                          <span>Draft</span>
                        </>
                      )}
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {/* Test Affiliate Link */}
                      <a
                        href={p.affiliateUrl || p.buyUrl}
                        target="_blank"
                        rel="sponsored nofollow noopener"
                        className="p-1.5 rounded-lg bg-[#FAF8F5] text-[#8A847F] hover:text-[#1A1A1A] hover:bg-[#F2ECE4] border border-[#EFE8DA]"
                        title="Test Outbound Affiliate URL in New Tab"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>

                      {/* Edit */}
                      <button
                        onClick={() => handleOpenEdit(p)}
                        className="p-1.5 rounded-lg bg-[#FAF8F5] text-[#8A847F] hover:text-[#1A1A1A] hover:bg-[#F2ECE4] border border-[#EFE8DA]"
                        title="Edit Product"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => {
                          if (window.confirm(`Are you sure you want to delete "${p.name}"?`)) {
                            onDeleteProduct(p.id);
                            showNotice('Product removed.');
                          }
                        }}
                        className="p-1.5 rounded-lg bg-[#FAF8F5] text-red-500 hover:text-red-700 hover:bg-red-50 border border-[#EFE8DA]"
                        title="Delete Product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE / EDIT PRODUCT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#1A1A1A]/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#FFFFFF] w-full max-w-3xl rounded-3xl border border-[#EFE8DA] shadow-2xl my-8 max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-[#EFE8DA] flex items-center justify-between">
              <div>
                <h3 className="text-xl font-serif font-black text-[#1A1A1A]">
                  {editingProduct ? 'Edit Affiliate Product' : 'Create New Affiliate Product'}
                </h3>
                <p className="text-xs text-[#8A847F] mt-0.5">
                  Configure merchant credentials, pricing, advantages, and tracking parameters.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-[#8A847F] hover:text-[#1A1A1A] hover:bg-[#FAF8F5]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 text-xs">
              
              {/* Product Name & Brand */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#5A5552] uppercase mb-1">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#EFE8DA] text-[#1A1A1A] focus:outline-none focus:border-[#A4895C]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#5A5552] uppercase mb-1">Brand Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#EFE8DA] text-[#1A1A1A] focus:outline-none focus:border-[#A4895C]"
                  />
                </div>
              </div>

              {/* Category & Subcategory */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-[#5A5552] uppercase mb-1">Main Category</label>
                  <select
                    value={formData.mainCategory}
                    onChange={(e) => {
                      const sel = e.target.value;
                      const catObj = mainCategories.find((c) => c.slug === sel);
                      setFormData({ 
                        ...formData, 
                        mainCategory: sel,
                        category: catObj ? catObj.name : sel,
                        subCategory: catObj && catObj.subcategories[0] ? catObj.subcategories[0] : 'General'
                      });
                    }}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#EFE8DA] text-[#1A1A1A] focus:outline-none focus:border-[#A4895C]"
                  >
                    {mainCategories.map((c) => (
                      <option key={c.slug} value={c.slug}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#5A5552] uppercase mb-1">Subcategory</label>
                  <input
                    type="text"
                    value={formData.subCategory || ''}
                    onChange={(e) => setFormData({ ...formData, subCategory: e.target.value })}
                    placeholder="e.g. Serums, Cleansers"
                    className="w-full px-3 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#EFE8DA] text-[#1A1A1A] focus:outline-none focus:border-[#A4895C]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#5A5552] uppercase mb-1">Target Country</label>
                  <select
                    value={formData.targetCountry || 'US'}
                    onChange={(e) => setFormData({ ...formData, targetCountry: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#EFE8DA] text-[#1A1A1A] focus:outline-none focus:border-[#A4895C]"
                  >
                    <option value="US">USA (USD)</option>
                    <option value="UK">United Kingdom (GBP)</option>
                    <option value="EU">European Union (EUR)</option>
                    <option value="CA">Canada (CAD)</option>
                    <option value="AU">Australia (AUD)</option>
                    <option value="Global">Global / Worldwide</option>
                  </select>
                </div>
              </div>

              {/* Pricing & Commission */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block font-bold text-[#5A5552] uppercase mb-1">Sale Price</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#EFE8DA] text-[#1A1A1A] focus:outline-none focus:border-[#A4895C]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#5A5552] uppercase mb-1">Retail Price</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#EFE8DA] text-[#1A1A1A] focus:outline-none focus:border-[#A4895C]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#5A5552] uppercase mb-1">Currency</label>
                  <input
                    type="text"
                    value={formData.currency}
                    onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#EFE8DA] text-[#1A1A1A] focus:outline-none focus:border-[#A4895C]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#5A5552] uppercase mb-1">Commission Info</label>
                  <input
                    type="text"
                    value={formData.commissionInfo || ''}
                    onChange={(e) => setFormData({ ...formData, commissionInfo: e.target.value })}
                    placeholder="e.g. 10% CPS / EPC $8.33"
                    className="w-full px-3 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#EFE8DA] text-[#1A1A1A] focus:outline-none focus:border-[#A4895C]"
                  />
                </div>
              </div>

              {/* Merchant & Affiliate Tracking URL */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-[#5A5552] uppercase mb-1">Merchant Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.merchant}
                    onChange={(e) => setFormData({ ...formData, merchant: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#EFE8DA] text-[#1A1A1A] focus:outline-none focus:border-[#A4895C]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#5A5552] uppercase mb-1">Affiliate Network</label>
                  <select
                    value={formData.affiliateNetwork}
                    onChange={(e) => setFormData({ ...formData, affiliateNetwork: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#EFE8DA] text-[#1A1A1A] focus:outline-none focus:border-[#A4895C]"
                  >
                    <option value="CJ Affiliate">CJ Affiliate (Commission Junction)</option>
                    <option value="Impact.com">Impact.com</option>
                    <option value="Direct Merchant">Direct Merchant Program</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-[#5A5552] uppercase mb-1">Publication Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#EFE8DA] text-[#1A1A1A] focus:outline-none focus:border-[#A4895C]"
                  >
                    <option value="published">Published Live</option>
                    <option value="draft">Draft / Unpublished</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#5A5552] uppercase mb-1">Affiliate Tracking URL *</label>
                <input
                  type="url"
                  required
                  value={formData.affiliateUrl || formData.buyUrl || ''}
                  onChange={(e) => setFormData({ ...formData, affiliateUrl: e.target.value, buyUrl: e.target.value })}
                  placeholder="https://.../?exta=cjunct"
                  className="w-full px-3 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#EFE8DA] font-mono text-[11px] text-[#1A1A1A] focus:outline-none focus:border-[#A4895C]"
                />
              </div>

              {/* Front Image URL */}
              <div>
                <label className="block font-bold text-[#5A5552] uppercase mb-1">Front Image Packshot URL *</label>
                <input
                  type="url"
                  required
                  value={formData.frontImage}
                  onChange={(e) => setFormData({ ...formData, frontImage: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#EFE8DA] font-mono text-[11px] text-[#1A1A1A] focus:outline-none focus:border-[#A4895C]"
                />
              </div>

              {/* Description & Ingredients */}
              <div>
                <label className="block font-bold text-[#5A5552] uppercase mb-1">Product Description</label>
                <textarea
                  rows="3"
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#EFE8DA] text-[#1A1A1A] focus:outline-none focus:border-[#A4895C]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#5A5552] uppercase mb-1">Key Ingredients / Technical Specifications (comma separated)</label>
                <input
                  type="text"
                  value={formData.ingredients || ''}
                  onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                  placeholder="Ceramides, Hyaluronic Acid, Niacinamide"
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#EFE8DA] text-[#1A1A1A] focus:outline-none focus:border-[#A4895C]"
                />
              </div>

              {/* Advantages & Disadvantages */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#2A6E3B] uppercase mb-1">Product Advantages (Pros - 1 per line)</label>
                  <textarea
                    rows="3"
                    value={formData.advantages || ''}
                    onChange={(e) => setFormData({ ...formData, advantages: e.target.value })}
                    placeholder="Fast absorption&#10;Clinically tested&#10;Non-comedogenic"
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#EFE8DA] text-[#1A1A1A] focus:outline-none focus:border-[#A4895C]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#9C3A3A] uppercase mb-1">Product Disadvantages (Cons - 1 per line)</label>
                  <textarea
                    rows="3"
                    value={formData.disadvantages || ''}
                    onChange={(e) => setFormData({ ...formData, disadvantages: e.target.value })}
                    placeholder="Premium price tag&#10;Takes 5 mins to settle"
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#EFE8DA] text-[#1A1A1A] focus:outline-none focus:border-[#A4895C]"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-[#EFE8DA] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-[#EFE8DA] text-[#5A5552] hover:bg-[#FAF8F5] font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#1A1A1A] text-white font-semibold tracking-wider uppercase hover:bg-[#2C2926] transition-all"
                >
                  {editingProduct ? 'Save Product Changes' : 'Create Product'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
