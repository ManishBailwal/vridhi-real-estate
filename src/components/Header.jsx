"use client"

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
} from '@/components/ui/navigation-menu'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  Menu,
  Info,
  Mail,
  Compass,
  Landmark,
  PlusCircle,
  DollarSign,
  Key,
  Settings,
  ShoppingBag,
  Briefcase,
  Building
} from 'lucide-react'

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/buy', label: 'Buy', icon: ShoppingBag },
    { href: '/rent', label: 'Rent', icon: Key },
    { href: '/sell', label: 'Sell', icon: DollarSign },
    { href: '/manage', label: 'Manage', icon: Settings },
    
    { href: '/listings', label: 'Listings', icon: Building },
    { href: '/about', label: 'About Us', icon: Info },
    { href: '/services', label: 'Loans', icon: Briefcase },
    {href: '/vastu', label: 'Vastu', icon: Compass},
  
    
      { href: '/contact', label: 'Contact', icon: Mail },
    
  ]

  const leftNav = navLinks.slice(0, 5)
  const rightNav = navLinks.slice(5)

  return (
    <header
      className={`fixed top-0 z-50 w-full border-b transition-all duration-300 ${
        isScrolled
          ? 'border-blue-800/30 bg-blue-900 shadow-lg'
          : 'border-transparent bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">

        {/* ================= MOBILE + TABLET ================= */}
        <div className="flex h-20 items-center justify-between lg:hidden">

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img
              src="/logo.png"
              alt={SITE.title}
              className="h-16 w-auto object-contain"
            />
          </Link>

          {/* Mobile Menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="bg-gradient-to-b from-blue-900 to-indigo-900 border-white/10">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <div className="rounded-lg bg-amber-500 p-1.5 shadow-md">
                    <Landmark className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-lg font-bold text-white font-serif">
                    {SITE.title}
                  </span>
                </SheetTitle>
              </SheetHeader>

              <nav className="mt-8 flex flex-col space-y-4">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-md ${
                        isActive
                          ? 'bg-amber-500/20 text-amber-400'
                          : 'text-slate-200 hover:bg-amber-500/20 hover:text-white'
                      }`}
                    >
                      <link.icon className="h-4 w-4" />
                      {link.label}
                    </Link>
                  )
                })}

                <Link
                  href="/request-listing"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 bg-amber-500 text-white rounded-md"
                >
                  <PlusCircle className="h-4 w-4" />
                  List Property
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* ================= DESKTOP ================= */}
        <div className="hidden lg:flex h-24 items-center justify-between relative">

          {/* LEFT NAV */}
          <NavigationMenu>
            <NavigationMenuList>
              {leftNav.map((link) => {
                const isActive = pathname === link.href
                return (
                  <NavigationMenuItem key={link.href}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={link.href}
                        className={`px-3 py-2 text-sm font-medium ${
                          isActive
                            ? 'text-amber-500'
                            : 'text-white hover:text-amber-500'
                        }`}
                      >
                        {link.label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )
              })}
            </NavigationMenuList>
          </NavigationMenu>

          {/* CENTER LOGO */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <Link href="/">
              <img
                src="/logo.png"
                alt={SITE.title}
                className="h-28 w-auto object-contain transition-transform hover:scale-105"
              />
            </Link>
          </div>

          {/* RIGHT NAV */}
          <div className="flex items-center gap-4">
            <NavigationMenu>
              <NavigationMenuList>
                {rightNav.map((link) => {
                  const isActive = pathname === link.href
                  return (
                    <NavigationMenuItem key={link.href}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={link.href}
                          className={`px-3 py-2 text-sm font-medium ${
                            isActive
                              ? 'text-amber-500'
                              : 'text-white hover:text-amber-500'
                          }`}
                        >
                          {link.label}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  )
                })}
              </NavigationMenuList>
            </NavigationMenu>

            <Link href="/request-listing">
              <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                List Property
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </header>
  )
}