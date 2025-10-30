import React from 'react'
import Link from 'next/link'
import { Landmark, Phone, Mail, MapPin } from 'lucide-react' // Import icons
import { SITE } from '../lib/constants';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground mt-auto"> {/* mt-auto pushes footer down */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          
          {/* Column 1: Logo & Brief */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Landmark className="h-7 w-7" />
              <span className="text-2xl font-bold font-serif">
                {SITE.title}
              </span>
            </Link>
      <p className="text-sm text-muted-foreground/80"> {/* Adjusted text color for better contrast on dark bg */}
        {SITE.description}
      </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="mb-4 text-lg font-semibold uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/listings" className="hover:text-accent transition-colors">Listings</Link></li>
              <li><Link href="/about" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link href="/agents" className="hover:text-accent transition-colors">Our Agents</Link></li>
              <li><Link href="/blog" className="hover:text-accent transition-colors">Blog</Link></li> {/* Added Blog */}
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h4 className="mb-4 text-lg font-semibold uppercase tracking-wider">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/buyers-guide" className="hover:text-accent transition-colors">Buyer&apos;s Guide</Link></li> {/* Added Resources */}
              <li><Link href="/sellers-guide" className="hover:text-accent transition-colors">Seller&apos;s Guide</Link></li>
              <li><Link href="/market-report" className="hover:text-accent transition-colors">Market Report</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-accent transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h4 className="mb-4 text-lg font-semibold uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>{SITE.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                <a href={`tel:${SITE.contactPhone}`} className="hover:text-accent transition-colors">{SITE.contactPhone}</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                <a href={`mailto:${SITE.contactEmail}`} className="hover:text-accent transition-colors">{SITE.contactEmail}</a>
              </li>
            </ul>
            {/* Optional: Add Social Media Icons here */}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t border-primary-foreground/20 pt-6 text-center text-sm text-muted-foreground/80">
          © {currentYear} {SITE.title}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
