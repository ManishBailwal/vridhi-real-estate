import React from 'react';
import Link from 'next/link';
import { Landmark, Phone, Mail, MapPin, Instagram, Youtube, MessageCircle } from 'lucide-react';
import { SITE } from '@/lib/constants';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-gradient-to-tr from-sky-900 via-indigo-900 to-slate-900 text-white">
      <div className="container mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

          {/* Brand */}
          <div className="md:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3 mb-4">
              <img 
                src="/logo.png" 
                alt={SITE.title} 
                className="h-12 w-auto object-contain"
              />
              <div>
                <div className="text-2xl font-bold leading-tight">{SITE.title}</div>
                <div className="text-sm text-slate-300">{SITE.tagline || SITE.description}</div>
              </div>
            </Link>

            <p className="mt-6 text-sm text-slate-300/90">{SITE.description}</p>

            <div className="mt-6 flex items-center gap-3">
              <a href={SITE.socialMedia?.whatsapp || '#'} aria-label="WhatsApp" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-amber-600/10 hover:bg-amber-600/20 transition">
                <MessageCircle className="w-5 h-5 text-white" />
              </a>
              <a href={SITE.socialMedia?.instagram || '#'} aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-amber-600/10 hover:bg-amber-600/20 transition">
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a href={SITE.socialMedia?.facebook || '#'} aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-amber-600/10 hover:bg-amber-600/20 transition">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
              </a>
              <a href={SITE.socialMedia?.youtube || '#'} aria-label="YouTube" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-amber-600/10 hover:bg-amber-600/20 transition">
                <Youtube className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-2">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-4">Explore</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/listings" className="text-slate-200 hover:text-white transition">Listings</Link></li>
              <li><Link href="/about" className="text-slate-200 hover:text-white transition">About Us</Link></li>
              <li><Link href="/agents" className="text-slate-200 hover:text-white transition">Our Agents</Link></li>
              <li><Link href="/contact" className="text-slate-200 hover:text-white transition">Contact</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-4">Resources</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/buyers-guide" className="text-slate-200 hover:text-white transition">Buyer&apos;s Guide</Link></li>
              <li><Link href="/sellers-guide" className="text-slate-200 hover:text-white transition">Seller&apos;s Guide</Link></li>
              <li><Link href="/market-report" className="text-slate-200 hover:text-white transition">Market Report</Link></li>
              <li><Link href="/privacy-policy" className="text-slate-200 hover:text-white transition">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="md:col-span-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-4">Contact</h4>

            <ul className="space-y-3 text-sm text-slate-200 mb-6">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-slate-300 mt-0.5" />
                <span>{SITE.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-slate-300" />
                <a href={`tel:${SITE.contactPhone}`} className="hover:text-white transition">{SITE.contactPhone}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-slate-300" />
                <a href={`mailto:${SITE.contactEmail}`} className="hover:text-white transition">{SITE.contactEmail}</a>
              </li>
            </ul>

            <div className="bg-white/5 p-4 rounded-xl ring-1 ring-white/6">
              <div className="text-sm font-semibold text-slate-200 mb-2">Subscribe to our newsletter</div>
              <p className="text-xs text-slate-300 mb-3">Latest listings, market insights and curated offers — delivered monthly.</p>

              {/* simple static form - replace action with your endpoint if available */}
              <form action="#" method="post" className="flex gap-2">
                <label htmlFor="footer-email" className="sr-only">Email</label>
                <input id="footer-email" name="email" type="email" placeholder="Enter your email" className="flex-1 min-w-0 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-slate-300 outline-none focus:ring-2 focus:ring-orange-400" />
                <button type="submit" className="px-4 py-2 bg-amber-500 hover:bg-amber-600 rounded-lg text-slate-900 text-sm font-semibold shadow-sm">Subscribe</button>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-slate-400">© {currentYear} {SITE.title}. All rights reserved.</div>
          <div className="flex items-center gap-4 text-sm text-slate-300">
            <Link href="/terms" className="hover:text-white transition">Terms</Link>
            <span className="text-slate-600">/</span>
            <Link href="/privacy-policy" className="hover:text-white transition">Privacy</Link>
          </div>
        </div>
        <div className="mt-4 text-center text-xs text-slate-500">
          Developed by <a href="https://arterns.in" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition">Arterns Technologies</a>
        </div>
      </div>
    </footer>
  );
}
