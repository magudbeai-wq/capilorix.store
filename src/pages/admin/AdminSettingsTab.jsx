import React, { useState } from 'react';
import { productService } from '../../services/productService';
import { articleService } from '../../services/articleService';
import { Download, Upload, RotateCcw, Key, Save, CheckCircle2, ShieldCheck, Database } from 'lucide-react';

export default function AdminSettingsTab({ onDataReload }) {
  const [cjPublisherId, setCjPublisherId] = useState(() => localStorage.getItem('capilorix_cj_pid') || '7819130');
  const [cjApiKey, setCjApiKey] = useState(() => localStorage.getItem('capilorix_cj_key') || '');
  const [impactSid, setImpactSid] = useState(() => localStorage.getItem('capilorix_impact_sid') || '');
  const [impactToken, setImpactToken] = useState(() => localStorage.getItem('capilorix_impact_token') || '');
  const [notice, setNotice] = useState('');

  const handleSaveApiKeys = (e) => {
    e.preventDefault();
    localStorage.setItem('capilorix_cj_pid', cjPublisherId);
    localStorage.setItem('capilorix_cj_key', cjApiKey);
    localStorage.setItem('capilorix_impact_sid', impactSid);
    localStorage.setItem('capilorix_impact_token', impactToken);
    showNotice('Affiliate network API hooks saved successfully.');
  };

  const handleExportAll = () => {
    const backupData = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      products: productService.getProducts(),
      articles: articleService.getArticles()
    };

    const jsonString = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `capilorix_full_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showNotice('Database backup exported to JSON file.');
  };

  const handleImportFile = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (parsed.products && Array.isArray(parsed.products)) {
          productService.importJSON(JSON.stringify(parsed.products));
        }
        if (parsed.articles && Array.isArray(parsed.articles)) {
          articleService.importJSON(JSON.stringify(parsed.articles));
        }
        if (onDataReload) onDataReload();
        showNotice('Database restored successfully from JSON backup.');
      } catch (err) {
        alert('Invalid JSON file format: ' + err.message);
      }
    };
    reader.readAsText(file);
  };

  const handleResetFactory = () => {
    if (window.confirm('Are you sure you want to restore all verified factory seed products and articles? Any custom additions will be reset.')) {
      productService.resetToDefaults();
      articleService.resetToDefaults();
      if (onDataReload) onDataReload();
      showNotice('Database restored to default factory state.');
    }
  };

  const showNotice = (msg) => {
    setNotice(msg);
    setTimeout(() => setNotice(''), 4000);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      
      {notice && (
        <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-900 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-green-600" />
          <span>{notice}</span>
        </div>
      )}

      {/* Database Backup & Restore */}
      <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#EFE8DA] shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A4895C]">
          <Database className="w-4 h-4 text-[#A4895C]" />
          <span>Data Storage &amp; Disaster Recovery</span>
        </div>
        <h3 className="text-xl font-serif font-black text-[#1A1A1A]">
          Backup &amp; Restore Catalog
        </h3>
        <p className="text-xs text-[#8A847F] max-w-2xl">
          Export your entire verified product catalog, editorial reviews, and outbound links as a single JSON file. You can restore this backup at any time or commit it to your repository.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={handleExportAll}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1A1A1A] text-white text-xs font-semibold hover:bg-[#2C2926] transition-all"
          >
            <Download className="w-4 h-4 text-[#D4C3A3]" />
            <span>Export Complete JSON Backup</span>
          </button>

          <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#EFE8DA] text-[#1A1A1A] text-xs font-semibold hover:bg-[#F2ECE4] cursor-pointer transition-all">
            <Upload className="w-4 h-4 text-[#A4895C]" />
            <span>Restore from JSON File</span>
            <input
              type="file"
              accept=".json"
              onChange={handleImportFile}
              className="hidden"
            />
          </label>

          <button
            onClick={handleResetFactory}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 text-xs font-semibold transition-all ml-auto"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
            <span>Reset to Verified Factory Seeds</span>
          </button>
        </div>
      </div>

      {/* Affiliate Network API Hooks */}
      <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#EFE8DA] shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A4895C]">
          <Key className="w-4 h-4 text-[#A4895C]" />
          <span>Affiliate Network API Hooks (CJ Affiliate &amp; Impact.com)</span>
        </div>
        <h3 className="text-xl font-serif font-black text-[#1A1A1A]">
          Network Credentials &amp; Automatic Feed Sync
        </h3>
        <p className="text-xs text-[#8A847F] max-w-2xl">
          All catalog products currently use verified manual tracking links with sub-IDs. When your developer API tokens are issued by CJ or Impact, configure them below for automated price and stock synchronization.
        </p>

        <form onSubmit={handleSaveApiKeys} className="space-y-4 pt-2 text-xs">
          
          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EFE8DA] space-y-3">
            <h4 className="font-bold text-[#1A1A1A] text-sm">Commission Junction (CJ Affiliate) API</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-[#5A5552] uppercase mb-1">Publisher ID (PID)</label>
                <input
                  type="text"
                  value={cjPublisherId}
                  onChange={(e) => setCjPublisherId(e.target.value)}
                  placeholder="e.g. 7819130"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#EFE8DA] text-[#1A1A1A] font-mono text-[11px]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-[#5A5552] uppercase mb-1">Personal Access Token (Key)</label>
                <input
                  type="password"
                  value={cjApiKey}
                  onChange={(e) => setCjApiKey(e.target.value)}
                  placeholder="••••••••••••••••••••••••"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#EFE8DA] text-[#1A1A1A] font-mono text-[11px]"
                />
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EFE8DA] space-y-3">
            <h4 className="font-bold text-[#1A1A1A] text-sm">Impact.com REST API</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-[#5A5552] uppercase mb-1">Account SID</label>
                <input
                  type="text"
                  value={impactSid}
                  onChange={(e) => setImpactSid(e.target.value)}
                  placeholder="e.g. IRxxxxxxxx"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#EFE8DA] text-[#1A1A1A] font-mono text-[11px]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-[#5A5552] uppercase mb-1">Auth Token</label>
                <input
                  type="password"
                  value={impactToken}
                  onChange={(e) => setImpactToken(e.target.value)}
                  placeholder="••••••••••••••••••••••••"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#EFE8DA] text-[#1A1A1A] font-mono text-[11px]"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1A1A1A] text-white font-semibold text-xs uppercase tracking-wider hover:bg-[#2C2926]"
            >
              <Save className="w-3.5 h-3.5 text-[#D4C3A3]" />
              <span>Save Network Configuration</span>
            </button>
          </div>

        </form>
      </div>

    </div>
  );
}

