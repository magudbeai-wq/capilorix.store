import React, { useEffect } from 'react';
import { productService } from '../services/productService';
import { analyticsService } from '../services/analyticsService';
import { ExternalLink, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';

export default function AffiliateRedirectPage({ productId, navigateTo }) {
  const product = productService.getProductById(productId) || productService.getProductBySlug(productId);
  const targetUrl = product ? (product.affiliateUrl || product.buyUrl) : null;

  useEffect(() => {
    if (product && targetUrl) {
      // Record telemetry
      analyticsService.trackOutboundClick(product, {
        subId: `cpx_go_${Date.now().toString(36)}`,
        country: product.targetCountry || 'Global'
      });

      // Immediate redirect after brief 400ms delay so visitor sees branded transfer
      const timer = setTimeout(() => {
        window.location.replace(targetUrl);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [product, targetUrl]);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#FFFFFF] rounded-3xl border border-[#EFE8DA] p-8 text-center space-y-4">
          <h2 className="text-xl font-serif font-black text-[#1A1A1A]">Product Not Found</h2>
          <p className="text-xs text-[#8A847F]">The affiliate destination requested could not be located in our active directory.</p>
          <button
            onClick={() => navigateTo('/products')}
            className="px-5 py-2.5 rounded-xl bg-[#1A1A1A] text-white text-xs font-semibold"
          >
            Return to Products Directory
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-[#FFFFFF] rounded-3xl border border-[#EFE8DA] p-8 sm:p-10 text-center shadow-xl space-y-6">
        
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#FAF8F5] border border-[#D4C3A3] text-[#A4895C] mx-auto">
          <Loader2 className="w-7 h-7 animate-spin text-[#A4895C]" />
        </div>

        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#D4C3A3] text-[11px] font-semibold uppercase tracking-wider text-[#8A7147] mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#A4895C]" />
            <span>Capilorix Verified Commercial Partner</span>
          </div>
          <h1 className="text-2xl font-serif font-black text-[#1A1A1A]">
            Redirecting to {product.merchant}
          </h1>
          <p className="text-xs text-[#8A847F] mt-2 max-w-sm mx-auto">
            You are being securely directed to the official merchant storefront for <span className="font-semibold text-[#1A1A1A]">{product.name}</span> with verified pricing and discounts applied.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EFE8DA] flex items-center gap-4 text-left">
          <img
            src={product.frontImage || product.image}
            alt={product.name}
            className="w-14 h-14 rounded-xl object-cover border border-[#EFE8DA] bg-white shrink-0"
          />
          <div className="truncate">
            <div className="font-bold text-xs text-[#1A1A1A] truncate">{product.name}</div>
            <div className="text-[11px] text-[#A4895C] font-semibold mt-0.5">
              Verified Price: {product.currency || '$'}{product.price}
            </div>
            <div className="text-[10px] text-[#8A847F] mt-0.5">
              Partner: {product.merchant} ({product.affiliateNetwork || 'CJ Affiliate'})
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <a
            href={targetUrl}
            target="_blank"
            rel="sponsored nofollow noopener"
            className="w-full py-3.5 rounded-xl bg-[#1A1A1A] text-white text-xs font-semibold tracking-wider uppercase hover:bg-[#2C2926] transition-all flex items-center justify-center gap-2 shadow-md"
          >
            <span>Proceed to {product.merchant} Now</span>
            <ExternalLink className="w-4 h-4 text-[#D4C3A3]" />
          </a>

          <button
            onClick={() => navigateTo(-1)}
            className="text-xs text-[#8A847F] hover:text-[#1A1A1A] underline transition-colors pt-2"
          >
            Cancel and Return
          </button>
        </div>

      </div>
    </div>
  );
}

