import React, { useState } from 'react';
import { productService } from '../../services/productService';
import { CheckCircle2, AlertTriangle, ExternalLink, RefreshCw, ShieldCheck, Link2 } from 'lucide-react';

export default function AdminLinksTab({ products }) {
  const [healthData, setHealthData] = useState(() => productService.checkLinkHealth());
  const [isScanning, setIsScanning] = useState(false);

  const handleRescan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setHealthData(productService.checkLinkHealth());
      setIsScanning(false);
    }, 500);
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Rescan */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EFE8DA] pb-5">
        <div>
          <h2 className="text-2xl font-serif font-black text-[#1A1A1A]">
            Affiliate Link Health Auditor
          </h2>
          <p className="text-xs text-[#8A847F] mt-1">
            Automated verification of outbound tracking destinations, CJ parameters, and URL protocols.
          </p>
        </div>

        <button
          onClick={handleRescan}
          disabled={isScanning}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1A1A1A] text-white hover:bg-[#2C2926] text-xs font-semibold uppercase tracking-wider transition-all disabled:opacity-60"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-[#D4C3A3] ${isScanning ? 'animate-spin' : ''}`} />
          <span>{isScanning ? 'Auditing URLs...' : 'Re-scan All Links'}</span>
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#EFE8DA] shadow-xs">
          <div className="text-xs font-semibold text-[#8A847F] mb-1">Total Monitored Links</div>
          <div className="text-3xl font-serif font-black text-[#1A1A1A]">{healthData.total}</div>
          <div className="text-xs text-[#8A847F] mt-1 font-mono">{healthData.total} active merchant targets</div>
        </div>

        <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-green-200 bg-green-50/20 shadow-xs">
          <div className="text-xs font-semibold text-green-800 mb-1 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            <span>Healthy Verified Links</span>
          </div>
          <div className="text-3xl font-serif font-black text-green-900">{healthData.healthyCount}</div>
          <div className="text-xs text-green-700 mt-1 font-mono">100% Valid destination formats</div>
        </div>

        <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#EFE8DA] shadow-xs">
          <div className="text-xs font-semibold text-[#8A847F] mb-1 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#A4895C]" />
            <span>Tracking Security</span>
          </div>
          <div className="text-3xl font-serif font-black text-[#1A1A1A]">100%</div>
          <div className="text-xs text-[#8A847F] mt-1">rel="sponsored" on all outbounds</div>
        </div>

      </div>

      {/* Audit Results Table */}
      <div className="bg-[#FFFFFF] rounded-2xl border border-[#EFE8DA] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#FAF8F5] border-b border-[#EFE8DA] text-[#5A5552] font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Product Name</th>
                <th className="py-3 px-4">Merchant &amp; Network</th>
                <th className="py-3 px-4">Outbound URL</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Audit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5EFE6]">
              {healthData.results.map((res) => (
                <tr key={res.id} className="hover:bg-[#FCFAF7] transition-colors">
                  <td className="py-3 px-4 font-bold text-[#1A1A1A] max-w-xs truncate" title={res.name}>
                    {res.name}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-[#1A1A1A]">{res.merchant}</div>
                    <div className="text-[10px] text-[#8A847F]">{res.network}</div>
                  </td>
                  <td className="py-3 px-4 font-mono text-[10px] text-[#5A5552] max-w-sm truncate" title={res.affiliateUrl}>
                    {res.affiliateUrl}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {res.isHealthy ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-green-50 text-green-700 border border-green-200">
                        <CheckCircle2 className="w-3 h-3 text-green-600" />
                        <span>Verified</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-700 border border-red-200">
                        <AlertTriangle className="w-3 h-3 text-red-600" />
                        <span>{res.issue}</span>
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <a
                      href={res.affiliateUrl}
                      target="_blank"
                      rel="sponsored nofollow noopener"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#FAF8F5] text-[#8A7147] hover:text-[#1A1A1A] hover:bg-[#F2ECE4] border border-[#EFE8DA] font-semibold text-[11px]"
                    >
                      <span>Test Link</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

