"use client" // Needed for Sheet state and NavigationMenu

import React, { useState } from 'react'
import Link from 'next/link'
import { SITE } from '@/lib/constants'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Menu, Home, Building, Info, Users, Mail, Landmark, BookOpen, PlusCircle } from 'lucide-react' // Import icons

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/listings', label: 'Listings', icon: Building },
    { href: '/about', label: 'About Us', icon: Info },
    { href: '/agents', label: 'Agents', icon: Users },
    { href: '/blog', label: 'Blog', icon: BookOpen },
    { href: '/contact', label: 'Contact', icon: Mail },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-gradient-to-r from-sky-900/95 via-indigo-900/95 to-slate-900/95 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
           <div className="rounded-lg bg-amber-500 p-1.5 shadow-md ring-1 ring-amber-400/20">
             <Landmark className="h-5 w-5 text-white" />
           </div>
           <span className="text-xl font-bold text-white font-serif">
             {SITE.title}
           </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          <NavigationMenu>
            <NavigationMenuList>
              {navLinks.map((link) => (
                <NavigationMenuItem key={link.href}>
                  {/* Use Radix's asChild pattern so we don't end up with nested <a> tags.
                      NavigationMenuPrimitive.Link will use the child (next/link) as the anchor element. */}
                  <NavigationMenuLink asChild>
                    <Link href={link.href} className="px-4 py-2 text-sm font-medium text-slate-200 hover:text-white hover:bg-white/10 rounded-md transition-colors">
                      {link.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          
          {/* List Your Property Button */}
          <Link href="/request-listing">
            <Button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold gap-2">
              <PlusCircle className="h-4 w-4" />
              List Property
            </Button>
          </Link>
        </div>

        {/* Mobile Navigation Trigger */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon" className="border-white/20 bg-white/5 hover:bg-white/10 text-white">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-gradient-to-b from-slate-900 to-indigo-900 border-white/10">
            <SheetHeader>
               <SheetTitle className="flex items-center gap-2">
                 <div className="rounded-lg bg-amber-500 p-1.5 shadow-md">
                   <Landmark className="h-4 w-4 text-white" />
                 </div>
                 <span className="text-lg font-bold text-white font-serif">{SITE.title}</span>
               </SheetTitle>
            </SheetHeader>
            <nav className="mt-8 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-slate-200 hover:bg-amber-500/20 hover:text-white transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Link>
              ))}
              
              {/* List Property Link for Mobile */}
              <Link
                href="/request-listing"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold bg-amber-500 hover:bg-amber-600 text-white transition-colors mt-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <PlusCircle className="h-4 w-4" />
                List Your Property
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
