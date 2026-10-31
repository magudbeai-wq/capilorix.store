# Capilorix™ — Clinical Hair Wellness & Scalp Innovation Affiliate Platform

An authoritative, high-converting digital publication and product comparison engine engineered specifically for **`capilorix.store`**.

Built with:
- **React 19**
- **Vite**
- **Tailwind CSS v4**
- **Lucide Icons**
- **Google E-E-A-T Schema.org Structured Data**

---

## 🚀 Quick Start (Run Locally)

To view the website on your local machine:

```bash
npm run dev
```

Open your browser to `http://localhost:3000`.

---

## 💰 How to Connect Your CJ Affiliate Links

All product data is centralized in:
📁 `src/data/products.js`

To update your affiliate link for any product:
1. Open CJ (Commission Junction) $\rightarrow$ **Links** $\rightarrow$ Search by Link ID (e.g. `17183935` for ISEE Hair).
2. Click **Get Code** $\rightarrow$ Copy the **Click URL** (e.g., `https://www.anrdoezrs.net/click-XXXXXX-XXXXXXX`).
3. In `src/data/products.js`, find the product and replace:
   ```javascript
   affiliateUrl: "https://www.anrdoezrs.net/click-your-actual-link-here",
   ```
4. Save the file. The "Check Best Price" buttons and Quiz recommendations will immediately route buyers through your link with proper `rel="sponsored nofollow"` attribution!

---

## 🌐 Deploying to `capilorix.store`

### Option 1: Vercel (Recommended & Free)
1. Push this folder to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) $\rightarrow$ Add New Project $\rightarrow$ Import your repo.
3. Vercel automatically detects Vite and builds it in seconds.
4. Go to **Project Settings** $\rightarrow$ **Domains** $\rightarrow$ Add `capilorix.store`.
5. Point your domain DNS records (A record to `76.76.21.21` or CNAME to `cname.vercel-dns.com`).

### Option 2: Netlify (Free Drag-and-Drop)
1. Run `npm run build` in this directory (creates the `dist/` folder).
2. Drag and drop the `dist/` folder directly into [app.netlify.com/drop](https://app.netlify.com/drop).
3. Connect `capilorix.store` in Netlify Domain Management.

---

## 🛡️ Mandatory Trust Pages Included
Advertisers from CJ, Google, and the FTC require specific compliance pages. These are already built:
- **FTC Affiliate Disclosure**: `src/pages/DisclosurePage.jsx`
- **About Us & Clinical Standards**: `src/pages/AboutPage.jsx`
- **Privacy Policy (GDPR/CCPA)**: `src/pages/PrivacyPage.jsx`
- **Terms & Medical Disclaimer**: `src/pages/TermsPage.jsx`
- **Contact & Brand Partnerships**: `src/pages/ContactPage.jsx`
