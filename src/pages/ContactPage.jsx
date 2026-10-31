import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, ShieldCheck, Building } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Brand Review Submission / Affiliate Partnership',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left bg-[#FAF8F5] text-[#1A1A1A]">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#D4C3A3] text-[#8A7147] text-xs font-semibold uppercase tracking-wider mb-4">
          <Mail className="w-3.5 h-3.5 text-[#A4895C]" />
          <span>Concierge &amp; Inquiries</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif font-black text-[#1A1A1A] mb-4">
          Editorial &amp; Partnership Concierge
        </h1>
        <p className="text-sm text-[#5A5552] max-w-xl mx-auto font-light leading-relaxed">
          For affiliate network managers, brand review submissions, reader inquiries, and international syndication partnerships.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Contact Info Sidebar */}
        <div className="md:col-span-5 space-y-4">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] border border-[#EFE8DA] shadow-xs space-y-5">
            <h2 className="text-base font-bold text-[#1A1A1A] font-serif flex items-center gap-2">
              <Building className="w-4 h-4 text-[#A4895C]" />
              <span>Publisher Information</span>
            </h2>

            <div className="space-y-4 text-xs text-[#5A5552]">
              <div>
                <span className="text-[#8A847F] block uppercase font-semibold text-[10px] font-mono">Domain</span>
                <span className="font-mono text-[#8A7147] font-bold text-sm">capilorix.store</span>
              </div>

              <div>
                <span className="text-[#8A847F] block uppercase font-semibold text-[10px] font-mono">Affiliate &amp; Network Inquiries</span>
                <span className="font-mono text-[#1A1A1A]">partners@capilorix.store</span>
              </div>

              <div>
                <span className="text-[#8A847F] block uppercase font-semibold text-[10px] font-mono">Editorial Board</span>
                <span className="font-mono text-[#1A1A1A]">editorial@capilorix.store</span>
              </div>

              <div>
                <span className="text-[#8A847F] block uppercase font-semibold text-[10px] font-mono">Response Window</span>
                <span className="text-[#3D7055] font-semibold">Within 24 business hours (Mon-Fri)</span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#F5EFE6] text-xs text-[#8A847F] leading-relaxed">
              <ShieldCheck className="w-4 h-4 text-[#3D7055] inline mr-1 -mt-0.5" />
              <span>Independent editorial discretion applies to all product sample submissions.</span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-7">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] border border-[#EFE8DA] shadow-xs">
            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#3D7055] mx-auto" />
                <h3 className="text-xl font-serif font-bold text-[#1A1A1A]">Inquiry Dispatched</h3>
                <p className="text-xs text-[#5A5552] max-w-sm mx-auto">
                  Thank you for reaching out to the Capilorix Editorial Desk. A senior member of our team will review your inquiry within 24 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5 font-mono">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Alexandra Croft"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#EFE8DA] text-xs text-[#1A1A1A] placeholder-[#8A847F] focus:outline-none focus:border-[#A4895C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5 font-mono">
                    Business / Personal Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g., alexandra@luxurybeauty.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#EFE8DA] text-xs text-[#1A1A1A] placeholder-[#8A847F] focus:outline-none focus:border-[#A4895C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5 font-mono">
                    Inquiry Subject
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#EFE8DA] text-xs text-[#1A1A1A] focus:outline-none focus:border-[#A4895C]"
                  >
                    <option value="Brand Review Submission / Affiliate Partnership">Brand Review Submission / Affiliate Partnership</option>
                    <option value="CJ Affiliate Network Direct Relations">CJ Affiliate Network Direct Relations</option>
                    <option value="Editorial Correction or Price Update">Editorial Correction or Price Update</option>
                    <option value="Reader Question / Regimen Guidance">Reader Question / Regimen Guidance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5 font-mono">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details regarding your request, merchant campaign, or question..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#EFE8DA] text-xs text-[#1A1A1A] placeholder-[#8A847F] focus:outline-none focus:border-[#A4895C]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-[#1A1A1A] hover:bg-[#A4895C] text-white text-xs font-bold tracking-wide transition-all shadow-md flex items-center justify-center gap-2"
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
