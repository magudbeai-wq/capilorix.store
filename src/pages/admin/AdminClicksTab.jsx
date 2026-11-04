import React, { useState } from 'react';
import { MousePointerClick, Download, Trash2, Filter, Search, Globe, Building2, ExternalLink } from 'lucide-react';

export default function AdminClicksTab({ metrics, onClearClicks }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [merchantFilter, setMerchantFilter] = useState('All');
  const [countryFilter, setCountryFilter] = useState('All');

  const clicks = metrics.recentClicks || [];

  const uniqueMerchants = ['All', ...new Set(clicks.map((c) => c.merchant).filter(Boolean))];
  const uniqueCountries = ['All', ...new Set(clicks.map((c) => c.country).filter(Boolean))];

  const filteredClicks = clicks.filter((c) => {
    const matchesSearch = !searchTerm ||
      c.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.merchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.subId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesMerchant = merchantFilter === 'All' || c.merchant === merchantFilter;
    const matchesCountry = countryFilter === 'All' || c.country === countryFilter;

    return matchesSearch && matchesMerchant && matchesCountry;
  });

  const exportCSV = () => {
    if (clicks.length === 0) return;
    const headers = ['Timestamp', 'Product Name', 'Merchant', 'Network', 'Target URL', 'Sub-ID', 'Country'];
    const rows = clicks.map((c) => [
      c.timestamp,
      `"${c.productName.replace(/"/g, '""')}"`,
      `"${c.merchant}"`,
      `"${c.network}"`,
      `"${c.targetUrl}"`,
      `"${c.subId}"`,
      `"${c.country}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `capilorix_affiliate_clicks_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EFE8DA] pb-5">
        <div>
          <h2 className="text-2xl font-serif font-black text-[#1A1A1A]">
            Affiliate Outbound Click Telemetry
          </h2>
          <p className="text-xs text-[#8A847F] mt-1">
            Real-time tracking of visitor exits to CJ Affiliate and partner merchant checkouts with sub-IDs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={exportCSV}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FAF8F5] border border-[#EFE8DA] text-[#1A1A1A] hover:bg-[#F2ECE4] text-xs font-semibold"
          >
            <Download className="w-4 h-4 text-[#A4895C]" />
            <span>Export CSV</span>
          </button>
          
          <button
            onClick={() => {
              if (window.confirm('Clear all recorded affiliate click history?')) {
                onClearClicks();
              }
            }}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 text-xs font-semibold"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Log</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-[#FFFFFF] p-4 rounded-2xl border border-[#EFE8DA] shadow-xs flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#8A847F] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by product, merchant, or sub-ID..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#FAF8F5] border border-[#EFE8DA] text-xs text-[#1A1A1A] focus:outline-none focus:border-[#A4895C]"
          />
        </div>

        <select
          value={merchantFilter}
          onChange={(e) => setMerchantFilter(e.target.value)}
          className="px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#EFE8DA] text-xs text-[#1A1A1A] focus:outline-none focus:border-[#A4895C]"
        >
          {uniqueMerchants.map((m) => (
            <option key={m} value={m}>{m === 'All' ? 'All Merchants' : m}</option>
          ))}
        </select>

        <select
          value={countryFilter}
          onChange={(e) => setCountryFilter(e.target.value)}
          className="px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#EFE8DA] text-xs text-[#1A1A1A] focus:outline-none focus:border-[#A4895C]"
        >
          {uniqueCountries.map((c) => (
            <option key={c} value={c}>{c === 'All' ? 'All Countries' : c}</option>
          ))}
        </select>
      </div>

      {/* Clicks Table */}
      <div className="bg-[#FFFFFF] rounded-2xl border border-[#EFE8DA] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#FAF8F5] border-b border-[#EFE8DA] text-[#5A5552] font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Date / Time</th>
                <th className="py-3 px-4">Product Name</th>
                <th className="py-3 px-4">Merchant &amp; Network</th>
                <th className="py-3 px-4">Sub-ID Campaign Tag</th>
                <th className="py-3 px-4">Destination URL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5EFE6]">
              {filteredClicks.length > 0 ? (
                filteredClicks.map((c) => (
                  <tr key={c.id} className="hover:bg-[#FCFAF7] transition-colors">
                    <td className="py-3 px-4 font-mono text-[11px] text-[#8A847F] whitespace-nowrap">
                      {new Date(c.timestamp).toLocaleString()}
                    </td>
                    <td className="py-3 px-4 font-bold text-[#1A1A1A]">
                      {c.productName}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-[#1A1A1A]">{c.merchant}</div>
                      <div className="text-[10px] text-[#8A847F]">{c.network}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#EFE8DA] font-mono text-[10px] text-[#8A7147] font-semibold">
                        {c.subId}
                      </span>
                    </td>
                    <td className="py-3 px-4 max-w-xs">
                      <a
                        href={c.targetUrl}
                        target="_blank"
                        rel="sponsored nofollow noopener"
                        className="inline-flex items-center gap-1 font-mono text-[10px] text-[#A4895C] hover:underline truncate max-w-full"
                        title={c.targetUrl}
                      >
                        <span className="truncate">{c.targetUrl}</span>
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-xs text-[#8A847F]">
                    No outbound clicks matching current filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

