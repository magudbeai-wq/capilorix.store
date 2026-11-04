import React, { useState } from 'react';
import { authService } from '../../services/authService';
import { ShieldCheck, Lock, Mail, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';

export default function AdminLoginPage({ onLoginSuccess, navigateTo }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const res = authService.login(email, password);
      setIsLoading(false);
      if (res.success) {
        if (onLoginSuccess) {
          onLoginSuccess(res.user);
        } else {
          navigateTo('/admin');
        }
      } else {
        setError(res.error || 'Invalid credentials');
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#FFFFFF] rounded-3xl border border-[#EFE8DA] shadow-xl p-8 sm:p-10">
        
        {/* Header Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#1A1A1A] text-white mb-4 shadow-md">
            <Lock className="w-6 h-6 text-[#D4C3A3]" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#D4C3A3] text-xs font-semibold uppercase tracking-wider text-[#8A7147] mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#A4895C]" />
            <span>Capilorix Editorial Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-black text-[#1A1A1A]">
            Administrative Portal
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-[#8A847F]">
            Sign in to manage affiliate products, track outbound conversions, and publish SEO editorial reviews.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-800 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#5A5552] mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter administrator email"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#EFE8DA] text-sm text-[#1A1A1A] focus:outline-none focus:border-[#A4895C] transition-colors"
              />
              <Mail className="w-4 h-4 text-[#8A847F] absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#5A5552] mb-1.5">
              Security Key / Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#EFE8DA] text-sm text-[#1A1A1A] focus:outline-none focus:border-[#A4895C] transition-colors"
              />
              <Lock className="w-4 h-4 text-[#8A847F] absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-[#1A1A1A] text-white text-xs sm:text-sm font-semibold tracking-wider uppercase hover:bg-[#2C2926] transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-60"
            >
              {isLoading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In To Console</span>
                  <ArrowRight className="w-4 h-4 text-[#D4C3A3]" />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-[#EFE8DA] text-center">
          <button
            onClick={() => navigateTo('/')}
            className="text-xs text-[#8A847F] hover:text-[#1A1A1A] underline transition-colors"
          >
            &larr; Return to Public Website
          </button>
        </div>

      </div>
    </div>
  );
}

