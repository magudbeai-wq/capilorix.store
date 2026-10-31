import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, ShieldCheck, Building } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Partnership Inquiry / Brand Review Request',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4">
          <Mail className="w-3.5 h-3.5" />
          <span>Get in Touch</span>
        </div>
        <h1 className="text-4xl font-serif font-bold text-white mb-4">
          Editorial & Partnership Desk
        </h1>
        <p className="text-sm text-slate-400 max-w-xl mx-auto">
          For affiliate network managers, brand review sample submissions, reader inquiries, and corporate partnerships.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Contact Info Sidebar */}
        <div className="md:col-span-5 space-y-4">
          <div className="p-6 rounded-2xl bg-[#111420] border border-slate-800">
            <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <Building className="w-4 h-4 text-amber-400" />
              <span>Affiliate & Editorial Desk</span>
            </h2>

            <div className="space-y-4 text-xs text-slate-300">
              <div>
                <span className="text-slate-500 block uppercase font-semibold text-[10px]">Publisher Domain</span>
                <span className="font-mono text-amber-300 text-sm">capilorix.store</span>
              </div>

              <div>
                <span className="text-slate-500 block uppercase font-semibold text-[10px]">Advertiser & CJ Relations</span>
                <span className="font-mono text-slate-200">partners@capilorix.store</span>
              </div>

              <div>
                <span className="text-slate-500 block uppercase font-semibold text-[10px]">Editorial & Product Submissions</span>
                <span className="font-mono text-slate-200">editor@capilorix.store</span>
              </div>

              <div>
                <span className="text-slate-500 block uppercase font-semibold text-[10px]">Average Response Time</span>
                <span className="text-emerald-400 font-semibold">Under 24 Business Hours</span>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-500/20 text-xs text-slate-300 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <p>
              Are you an advertiser on CJ Affiliate or Impact? Please include your Advertiser ID or Merchant Name in the inquiry for priority expedited onboarding.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="md:col-span-7">
          <div className="p-8 rounded-2xl bg-[#111420] border border-slate-800">
            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                <h3 className="text-xl font-serif font-bold text-white mb-2">Message Received</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto mb-6">
                  Thank you for reaching out. Our editorial and partnership desk has received your note and will reply within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold hover:bg-slate-700"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-400 font-medium mb-1.5">Your Name or Organization</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Dr. Jane Smith or Brand Representative"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-medium mb-1.5">Business Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-medium mb-1.5">Inquiry Topic</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option>Partnership Inquiry / Brand Review Request</option>
                    <option>CJ Affiliate Program Integration</option>
                    <option>Editorial Correction or Ingredient Inquiries</option>
                    <option>Advertising / Sponsored Spotlights</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 font-medium mb-1.5">Message / Details</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Please include product details, clinical documentation links, or partner ID..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Inquiry to Editorial Desk</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
