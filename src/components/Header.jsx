"use client" // Needed for Sheet state and NavigationMenu

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
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
import { Menu, Home, Building, Info, Users, Mail, Landmark, BookOpen, PlusCircle, DollarSign, Key, Settings, ShoppingBag } from 'lucide-react' // Import icons

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/buy', label: 'Buy', icon: ShoppingBag },
    { href: '/rent', label: 'Rent', icon: Key },
    { href: '/sell', label: 'Sell', icon: DollarSign },
    { href: '/manage', label: 'Manage', icon: Settings },
    { href: '/listings', label: 'Listings', icon: Building },
    { href: '/about', label: 'About Us', icon: Info },
    { href: '/contact', label: 'Contact', icon: Mail },
  ];

  return (
    <header 
      className={`fixed top-0 z-50 w-full border-b transition-all duration-300 ${
        isScrolled 
          ? 'border-blue-800/30 bg-blue-900 shadow-lg' 
          : 'border-transparent bg-transparent'
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
           <div className="rounded-lg bg-amber-500 p-1.5 shadow-md ring-1 ring-amber-400/20">
             <Landmark className="h-5 w-5 text-white" />
           </div>
           <span className={`text-2xl font-bold font-serif transition-colors duration-300 ${
             isScrolled ? 'text-white' : 'text-slate-900'
           }`}>
             {SITE.title}
           </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          <NavigationMenu>
            <NavigationMenuList>
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <NavigationMenuItem key={link.href}>
                    <NavigationMenuLink asChild>
                      <Link 
                        href={link.href} 
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                          isScrolled 
                            ? isActive 
                              ? 'text-amber-500 hover:text-amber-400' 
                              : 'text-white hover:text-amber-500 hover:bg-white/10'
                            : isActive
                              ? 'text-amber-500 hover:text-amber-600'
                              : 'text-slate-900 hover:text-amber-500 hover:bg-slate-100'
                        }`}
                      >
                        {link.label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
          
          {/* List Your Property Button */}
          <Link href="/request-listing">
            <Button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold gap-2 cursor-pointer">
              <PlusCircle className="h-4 w-4" />
              List Property
            </Button>
          </Link>
        </div>

        {/* Mobile Navigation Trigger */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button 
              variant="outline" 
              size="icon" 
              className={`border transition-colors ${
                isScrolled 
                  ? 'border-white/20 bg-white/5 hover:bg-white/10 text-white'
                  : 'border-slate-900/20 bg-slate-900/5 hover:bg-slate-900/10 text-slate-900'
              }`}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-gradient-to-b from-blue-900 to-indigo-900 border-white/10">
            <SheetHeader>
               <SheetTitle className="flex items-center gap-2">
                 <div className="rounded-lg bg-amber-500 p-1.5 shadow-md">
                   <Landmark className="h-4 w-4 text-white" />
                 </div>
                 <span className="text-lg font-bold text-white font-serif">{SITE.title}</span>
               </SheetTitle>
            </SheetHeader>
            <nav className="mt-8 flex flex-col space-y-4">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      isActive 
                        ? 'bg-amber-500/20 text-amber-400'
                        : 'text-slate-200 hover:bg-amber-500/20 hover:text-white'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <link.icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                );
              })}
              
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
