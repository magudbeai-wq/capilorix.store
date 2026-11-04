import React, { useState } from 'react';
import { authors, getAuthorById } from '../../data/authors';
import { mainCategories } from '../../data/categories';
import { 
  FileText, Plus, Search, Edit2, Trash2, Eye, EyeOff, Globe, 
  Sparkles, CheckCircle2, AlertCircle, X, HelpCircle, Layers, Check 
} from 'lucide-react';

export default function AdminArticlesTab({ articles, products, onSaveArticle, onDeleteArticle, onUpdateStatus, navigateTo }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  // Form State
  const initialForm = {
    title: '',
    subtitle: '',
    slug: '',
    articleType: 'roundup', // 'roundup', 'review', 'comparison', 'guide'
    category: 'skincare',
    status: 'draft', // 'draft', 'under-review', 'published', 'archived'
    authorId: 'dr-elena-vance',
    reviewerId: 'dr-sarah-jenkins',
    readTime: '8 min read',
    coverImage: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1200&q=85',
    excerpt: '',
    metaTitle: '',
    metaDescription: '',
    canonicalUrl: '',
    assignedProductIds: [],
    featuredProductId: '',
    prosText: '',
    consText: '',
    bodyContent: '',
    faqs: [
      { question: 'How was this tested?', answer: 'Tested using instrumental corneometer and cohort evaluations over 30 days.' }
    ]
  };

  const [formData, setFormData] = useState(initialForm);

  // Auto-generate slug when title changes in new article
  const handleTitleChange = (val) => {
    const autoSlug = val
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: prev.slug === '' || !editingArticle ? autoSlug : prev.slug,
      metaTitle: prev.metaTitle === '' || !editingArticle ? `${val} | Capilorix` : prev.metaTitle,
      metaDescription: prev.metaDescription === '' || !editingArticle ? prev.excerpt : prev.metaDescription
    }));
  };

  // Filtered Articles
  const filteredArticles = articles.filter((a) => {
    const matchesSearch = !searchTerm ||
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (a.excerpt && a.excerpt.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesType = typeFilter === 'All' || a.articleType === typeFilter;
    const matchesStatus = statusFilter === 'All' || a.status === statusFilter;
    const matchesCat = categoryFilter === 'All' || a.category === categoryFilter;

    return matchesSearch && matchesType && matchesStatus && matchesCat;
  });

  const handleOpenCreate = () => {
    setEditingArticle(null);
    setFormData(initialForm);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (art) => {
    setEditingArticle(art);
    const sectionsText = Array.isArray(art.contentSections)
      ? art.contentSections.map((s) => `### ${s.heading}\n\n${s.body}`).join('\n\n')
      : (art.content || '');

    setFormData({
      ...art,
      prosText: Array.isArray(art.pros) ? art.pros.join('\n') : '',
      consText: Array.isArray(art.cons) ? art.cons.join('\n') : '',
      bodyContent: sectionsText,
      assignedProductIds: art.assignedProductIds || [],
      faqs: art.faqs && art.faqs.length > 0 ? art.faqs : initialForm.faqs
    });
    setIsModalOpen(true);
  };

  const handleAddFaq = () => {
    setFormData((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { question: '', answer: '' }]
    }));
  };

  const handleUpdateFaq = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.faqs];
      updated[index][field] = value;
      return { ...prev, faqs: updated };
    });
  };

  const handleRemoveFaq = (index) => {
    setFormData((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index)
    }));
  };

  const handleToggleProductAssignment = (prodId) => {
    setFormData((prev) => {
      const exists = prev.assignedProductIds.includes(prodId);
      const updated = exists
        ? prev.assignedProductIds.filter((id) => id !== prodId)
        : [...prev.assignedProductIds, prodId];
      return { 
        ...prev, 
        assignedProductIds: updated,
        featuredProductId: prev.featuredProductId || (updated[0] || '')
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Parse sections from bodyContent
    const rawSections = formData.bodyContent.split(/^###\s+/m).filter(Boolean);
    const parsedSections = rawSections.map((block) => {
      const lines = block.split('\n');
      const heading = lines[0].trim();
      const body = lines.slice(1).join('\n').trim();
      return { heading, body };
    });

    const payload = {
      ...formData,
      id: editingArticle ? editingArticle.id : undefined,
      pros: formData.prosText.split('\n').map((s) => s.trim()).filter(Boolean),
      cons: formData.consText.split('\n').map((s) => s.trim()).filter(Boolean),
      contentSections: parsedSections.length > 0 ? parsedSections : [
        { heading: 'Editorial Analysis', body: formData.bodyContent }
      ],
      canonicalUrl: formData.canonicalUrl || `https://www.capilorix.store/blog/${formData.slug}`
    };

    onSaveArticle(payload);
    setIsModalOpen(false);
    showNotice(editingArticle ? 'Article updated successfully.' : 'New article created successfully.');
  };

  const showNotice = (msg) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(''), 4000);
  };

  return (
    <div className="space-y-6">
      
      {/* Feedback Notice */}
      {feedbackMsg && (
        <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-900 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-green-600" />
          <span>{feedbackMsg}</span>
        </div>
      )}

      {/* Header & Create Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EFE8DA] pb-5">
        <div>
          <h2 className="text-2xl font-serif font-black text-[#1A1A1A]">
            SEO Editorial Publishing CMS
          </h2>
          <p className="text-xs text-[#8A847F] mt-1">
            Author, review, and manage roundups, single-product reviews, comparisons, and E-E-A-T guides.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1A1A1A] text-white text-xs font-semibold tracking-wider uppercase hover:bg-[#2C2926] transition-all shadow-xs shrink-0"
        >
          <Plus className="w-4 h-4 text-[#D4C3A3]" />
          <span>Create New Article</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-[#FFFFFF] p-4 rounded-2xl border border-[#EFE8DA] shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row gap-3">
          
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#8A847F] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search articles by title, slug, or keywords..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#FAF8F5] border border-[#EFE8DA] text-xs text-[#1A1A1A] focus:outline-none focus:border-[#A4895C]"
            />
          </div>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#EFE8DA] text-xs font-medium text-[#1A1A1A] focus:outline-none focus:border-[#A4895C]"
          >
            <option value="All">All Formats</option>
            <option value="roundup">Best Product Roundup</option>
            <option value="review">Individual Review</option>
            <option value="comparison">Product Comparison</option>
            <option value="guide">Buying Guide &amp; How-To</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#EFE8DA] text-xs font-medium text-[#1A1A1A] focus:outline-none focus:border-[#A4895C]"
          >
            <option value="All">All Editorial States</option>
            <option value="published">Published</option>
            <option value="under-review">Under Review</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#EFE8DA] text-xs font-medium text-[#1A1A1A] focus:outline-none focus:border-[#A4895C]"
          >
            <option value="All">All Categories</option>
            {mainCategories.map((c) => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </select>

        </div>
      </div>

      {/* Articles Table */}
      <div className="bg-[#FFFFFF] rounded-2xl border border-[#EFE8DA] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#FAF8F5] border-b border-[#EFE8DA] text-[#5A5552] font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Article Title &amp; Slug</th>
                <th className="py-3 px-4">Type &amp; Department</th>
                <th className="py-3 px-4">E-E-A-T Author</th>
                <th className="py-3 px-4">Assigned Products</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5EFE6]">
              {filteredArticles.map((art) => {
                const authorObj = getAuthorById(art.authorId);
                return (
                  <tr key={art.id} className="hover:bg-[#FCFAF7] transition-colors">
                    
                    {/* Title & Slug */}
                    <td className="py-3 px-4 max-w-sm">
                      <div className="font-bold text-[#1A1A1A] line-clamp-1" title={art.title}>
                        {art.title}
                      </div>
                      <div className="text-[11px] text-[#8A847F] font-mono mt-0.5 truncate">
                        /blog/{art.slug}
                      </div>
                    </td>

                    {/* Type & Category */}
                    <td className="py-3 px-4">
                      <span className="inline-block px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#EFE8DA] text-[#8A7147] font-semibold uppercase text-[10px]">
                        {art.articleType}
                      </span>
                      <div className="text-[11px] text-[#5A5552] capitalize mt-0.5">
                        {art.category}
                      </div>
                    </td>

                    {/* Author */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <img
                          src={authorObj.avatar}
                          alt={authorObj.name}
                          className="w-7 h-7 rounded-full object-cover border border-[#EFE8DA]"
                        />
                        <div>
                          <div className="font-semibold text-[#1A1A1A]">{authorObj.name}</div>
                          <div className="text-[10px] text-[#8A847F] truncate max-w-[120px]">{authorObj.title}</div>
                        </div>
                      </div>
                    </td>

                    {/* Assigned Products */}
                    <td className="py-3 px-4">
                      <span className="font-semibold text-[#1A1A1A]">
                        {art.assignedProductIds ? art.assignedProductIds.length : 0} Products
                      </span>
                      <div className="text-[10px] text-[#8A847F]">
                        {art.readTime || '8 min read'}
                      </div>
                    </td>

                    {/* Status Select */}
                    <td className="py-3 px-4 text-center">
                      <select
                        value={art.status}
                        onChange={(e) => onUpdateStatus(art.id, e.target.value)}
                        className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border cursor-pointer ${
                          art.status === 'published'
                            ? 'bg-green-50 text-green-700 border-green-200'
                            : art.status === 'under-review'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : art.status === 'archived'
                            ? 'bg-gray-100 text-gray-600 border-gray-300'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                      >
                        <option value="published">Published</option>
                        <option value="under-review">Under Review</option>
                        <option value="draft">Draft</option>
                        <option value="archived">Archived</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        
                        {/* Public Link */}
                        <button
                          onClick={() => navigateTo(`/blog/${art.slug}`)}
                          className="p-1.5 rounded-lg bg-[#FAF8F5] text-[#8A847F] hover:text-[#1A1A1A] hover:bg-[#F2ECE4] border border-[#EFE8DA]"
                          title="View on Live Website"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        {/* Edit */}
                        <button
                          onClick={() => handleOpenEdit(art)}
                          className="p-1.5 rounded-lg bg-[#FAF8F5] text-[#8A847F] hover:text-[#1A1A1A] hover:bg-[#F2ECE4] border border-[#EFE8DA]"
                          title="Edit Article"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete article "${art.title}"?`)) {
                              onDeleteArticle(art.id);
                              showNotice('Article deleted.');
                            }
                          }}
                          className="p-1.5 rounded-lg bg-[#FAF8F5] text-red-500 hover:text-red-700 hover:bg-red-50 border border-[#EFE8DA]"
                          title="Delete Article"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE / EDIT ARTICLE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#1A1A1A]/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#FFFFFF] w-full max-w-4xl rounded-3xl border border-[#EFE8DA] shadow-2xl my-8 max-h-[92vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-[#EFE8DA] flex items-center justify-between">
              <div>
                <h3 className="text-xl font-serif font-black text-[#1A1A1A]">
                  {editingArticle ? 'Edit Editorial Article & CMS' : 'Create New Editorial Article'}
                </h3>
                <p className="text-xs text-[#8A847F] mt-0.5">
                  Configure SEO metadata, assign tested products, and preview Google SERP rendering.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-[#8A847F] hover:text-[#1A1A1A] hover:bg-[#FAF8F5]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 text-xs">
              
              {/* Title & Subtitle */}
              <div>
                <label className="block font-bold text-[#5A5552] uppercase mb-1">Article Headline (H1) *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g. The 5 Best Moisturizers for Dry Skin (2026 Lab Test)"
                  className="w-full px-3 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#EFE8DA] text-sm text-[#1A1A1A] font-serif font-bold focus:outline-none focus:border-[#A4895C]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#5A5552] uppercase mb-1">URL Slug *</label>
                  <div className="flex items-center">
                    <span className="px-3 py-2.5 rounded-l-xl bg-[#EFE8DA] text-[#5A5552] font-mono text-[11px] border border-r-0 border-[#EFE8DA]">
                      /blog/
                    </span>
                    <input
                      type="text"
                      required
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-r-xl bg-[#FAF8F5] border border-[#EFE8DA] font-mono text-[11px] text-[#1A1A1A] focus:outline-none focus:border-[#A4895C]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#5A5552] uppercase mb-1">Article Subtitle / Deck</label>
                  <input
                    type="text"
                    value={formData.subtitle || ''}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    placeholder="Independent laboratory evaluation of physiological lipid ratios..."
                    className="w-full px-3 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#EFE8DA] text-[#1A1A1A] focus:outline-none focus:border-[#A4895C]"
                  />
                </div>
              </div>

              {/* Format, Category, Status, Author */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block font-bold text-[#5A5552] uppercase mb-1">Article Format</label>
                  <select
                    value={formData.articleType}
                    onChange={(e) => setFormData({ ...formData, articleType: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#EFE8DA] text-[#1A1A1A] focus:outline-none focus:border-[#A4895C]"
                  >
                    <option value="roundup">Best Product Roundup</option>
                    <option value="review">Individual Review</option>
                    <option value="comparison">Product Comparison</option>
                    <option value="guide">Buying Guide &amp; How-To</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#5A5552] uppercase mb-1">Main Department</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#EFE8DA] text-[#1A1A1A] focus:outline-none focus:border-[#A4895C]"
                  >
                    {mainCategories.map((c) => (
                      <option key={c.slug} value={c.slug}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#5A5552] uppercase mb-1">Editorial Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#EFE8DA] text-[#1A1A1A] focus:outline-none focus:border-[#A4895C]"
                  >
                    <option value="draft">Draft</option>
                    <option value="under-review">Under Review</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#5A5552] uppercase mb-1">E-E-A-T Author</label>
                  <select
                    value={formData.authorId}
                    onChange={(e) => setFormData({ ...formData, authorId: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#EFE8DA] text-[#1A1A1A] focus:outline-none focus:border-[#A4895C]"
                  >
                    {authors.map((a) => (
                      <option key={a.id} value={a.id}>{a.name} ({a.title.split(' ')[0]})</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Cover Image & Excerpt */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#5A5552] uppercase mb-1">Cover Image URL *</label>
                  <input
                    type="url"
                    required
                    value={formData.coverImage}
                    onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#EFE8DA] font-mono text-[11px] text-[#1A1A1A] focus:outline-none focus:border-[#A4895C]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#5A5552] uppercase mb-1">Read Time Estimate</label>
                  <input
                    type="text"
                    value={formData.readTime || '8 min read'}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#EFE8DA] text-[#1A1A1A] focus:outline-none focus:border-[#A4895C]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#5A5552] uppercase mb-1">Article Excerpt / Lead Paragraph</label>
                <textarea
                  rows="2"
                  value={formData.excerpt || ''}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Summary displayed on category hubs, search cards, and meta tags..."
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#EFE8DA] text-[#1A1A1A] focus:outline-none focus:border-[#A4895C]"
                />
              </div>

              {/* SEO & SERP PREVIEW BOX */}
              <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#D4C3A3] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#8A7147] uppercase tracking-wider">
                    <Globe className="w-4 h-4 text-[#A4895C]" />
                    <span>Google SERP Snippet Preview (Search Engine Simulation)</span>
                  </div>
                  <span className="text-[10px] text-[#8A847F] font-mono">Real-time character audit</span>
                </div>

                {/* Simulated Google Search Result */}
                <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E5E0D8] space-y-1 shadow-xs">
                  <div className="flex items-center gap-2 text-xs text-[#202124]">
                    <span className="font-medium">https://www.capilorix.store</span>
                    <span className="text-[#5f6368]">&rsaquo; blog &rsaquo; {formData.slug || 'url-slug'}</span>
                  </div>
                  <div className="text-base sm:text-lg font-medium text-[#1a0dab] hover:underline cursor-pointer font-sans truncate">
                    {formData.metaTitle || `${formData.title} | Capilorix`}
                  </div>
                  <div className="text-xs text-[#4d5156] line-clamp-2 leading-relaxed">
                    {formData.metaDescription || formData.excerpt || 'Read our clinical review and laboratory breakdown on Capilorix.'}
                  </div>
                </div>

                {/* Meta Title & Meta Description Inputs with Length Indicators */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-[#5A5552] uppercase">Custom Meta Title</span>
                      <span className={`text-[10px] font-mono ${(formData.metaTitle?.length || 0) > 60 ? 'text-red-500 font-bold' : 'text-[#8A847F]'}`}>
                        {formData.metaTitle?.length || 0} / 60 chars
                      </span>
                    </div>
                    <input
                      type="text"
                      value={formData.metaTitle}
                      onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                      placeholder="Title displayed on Google search..."
                      className="w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#EFE8DA] text-[#1A1A1A] focus:outline-none focus:border-[#A4895C]"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-[#5A5552] uppercase">Custom Meta Description</span>
                      <span className={`text-[10px] font-mono ${(formData.metaDescription?.length || 0) > 160 ? 'text-red-500 font-bold' : 'text-[#8A847F]'}`}>
                        {formData.metaDescription?.length || 0} / 160 chars
                      </span>
                    </div>
                    <input
                      type="text"
                      value={formData.metaDescription}
                      onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                      placeholder="Description displayed on Google search..."
                      className="w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#EFE8DA] text-[#1A1A1A] focus:outline-none focus:border-[#A4895C]"
                    />
                  </div>
                </div>
              </div>

              {/* Assigned Products (Catalog Multi-Select) */}
              <div>
                <label className="block font-bold text-[#5A5552] uppercase mb-1">
                  Assign Affiliate Products from Catalog ({formData.assignedProductIds.length} Selected)
                </label>
                <p className="text-[11px] text-[#8A847F] mb-2">
                  Selected products will render interactive review cards with live prices, verified buy buttons, and affiliate tracking.
                </p>
                <div className="max-h-40 overflow-y-auto p-3 rounded-xl bg-[#FAF8F5] border border-[#EFE8DA] grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {products.map((p) => {
                    const isSelected = formData.assignedProductIds.includes(p.id);
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => handleToggleProductAssignment(p.id)}
                        className={`text-left p-2 rounded-lg border text-[11px] flex items-center justify-between transition-all ${
                          isSelected
                            ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                            : 'bg-white text-[#1A1A1A] border-[#EFE8DA] hover:border-[#A4895C]'
                        }`}
                      >
                        <span className="truncate mr-2 font-medium">{p.name}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#D4C3A3] shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Body Content Sections (Markdown / Headings) */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-bold text-[#5A5552] uppercase">
                    Article Body Sections (Markdown)
                  </label>
                  <span className="text-[10px] text-[#8A847F] font-mono">Use ### for section headings</span>
                </div>
                <textarea
                  rows="7"
                  value={formData.bodyContent}
                  onChange={(e) => setFormData({ ...formData, bodyContent: e.target.value })}
                  placeholder="### Why Most Barrier Creams Fail&#10;&#10;Standard commercial lotions rely on...&#10;&#10;### Laboratory Evaluation Protocol&#10;&#10;Our clinical panel tested 24 moisturizers..."
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#EFE8DA] text-[#1A1A1A] font-mono text-xs focus:outline-none focus:border-[#A4895C]"
                />
              </div>

              {/* Pros & Cons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#2A6E3B] uppercase mb-1">Tested Advantages (Pros - 1 per line)</label>
                  <textarea
                    rows="3"
                    value={formData.prosText}
                    onChange={(e) => setFormData({ ...formData, prosText: e.target.value })}
                    placeholder="Clinically verified 3:1:1 lipid ratio&#10;Zero fragrance"
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#EFE8DA] text-[#1A1A1A] focus:outline-none focus:border-[#A4895C]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#9C3A3A] uppercase mb-1">Tested Disadvantages (Cons - 1 per line)</label>
                  <textarea
                    rows="3"
                    value={formData.consText}
                    onChange={(e) => setFormData({ ...formData, consText: e.target.value })}
                    placeholder="Heavier texture takes 3 mins to absorb"
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#EFE8DA] text-[#1A1A1A] focus:outline-none focus:border-[#A4895C]"
                  />
                </div>
              </div>

              {/* FAQ Builder (for FAQPage Schema) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-[#5A5552] uppercase">FAQ Builder (Structured Schema Support)</span>
                    <p className="text-[10px] text-[#8A847F]">Generates FAQPage JSON-LD schema for Google rich snippet display.</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddFaq}
                    className="px-3 py-1 rounded-lg bg-[#FAF8F5] border border-[#EFE8DA] text-[#8A7147] hover:text-[#1A1A1A] font-bold text-[11px]"
                  >
                    + Add FAQ
                  </button>
                </div>

                <div className="space-y-2">
                  {formData.faqs.map((faq, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-[#FAF8F5] border border-[#EFE8DA] space-y-2 relative">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#8A7147] text-[10px]">FAQ #{idx + 1}</span>
                        {formData.faqs.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveFaq(idx)}
                            className="text-red-500 hover:text-red-700 text-[10px]"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <input
                        type="text"
                        value={faq.question}
                        onChange={(e) => handleUpdateFaq(idx, 'question', e.target.value)}
                        placeholder="e.g. How long does it take to repair a barrier?"
                        className="w-full px-3 py-1.5 rounded-lg bg-white border border-[#EFE8DA] text-[#1A1A1A]"
                      />
                      <textarea
                        rows="2"
                        value={faq.answer}
                        onChange={(e) => handleUpdateFaq(idx, 'answer', e.target.value)}
                        placeholder="Answer with clinical evidence..."
                        className="w-full px-3 py-1.5 rounded-lg bg-white border border-[#EFE8DA] text-[#1A1A1A]"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Controls */}
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
                  {editingArticle ? 'Save Article & Publish Settings' : 'Create Article'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}

