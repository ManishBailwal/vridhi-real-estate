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
import { Menu, Home, Building, Info, Users, Mail, Landmark } from 'lucide-react' // Import icons

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/listings', label: 'Listings', icon: Building },
    { href: '/about', label: 'About Us', icon: Info },
    { href: '/agents', label: 'Agents', icon: Users },
    { href: '/contact', label: 'Contact', icon: Mail },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
           {/* Replace with your SVG logo or Text */}
           <Landmark className="h-6 w-6 text-primary" /> 
           <span className="text-xl font-bold text-primary font-serif">
             {SITE.title}
           </span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {navLinks.map((link) => (
              <NavigationMenuItem key={link.href}>
                {/* Use Radix's asChild pattern so we don't end up with nested <a> tags.
                    NavigationMenuPrimitive.Link will use the child (next/link) as the anchor element. */}
                <NavigationMenuLink asChild>
                  <Link href={link.href} className={navigationMenuTriggerStyle()}>
                    {link.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Navigation Trigger */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
               <SheetTitle className="flex items-center gap-2">
                 <Landmark className="h-5 w-5 text-primary" />
                 <span className="text-lg font-bold text-primary font-serif">{SITE.title}</span>
               </SheetTitle>
            </SheetHeader>
            <nav className="mt-8 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                  onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
