"use client";

import { useRouter, usePathname } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Home, Users, Building2, MessageSquare, LogOut, LayoutDashboard, Menu, X, BookOpen, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export function AdminSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/admin');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const menuItems = [
    {
      title: 'Dashboard',
      icon: LayoutDashboard,
      href: '/admin/dashboard',
    },
    {
      title: 'Properties',
      icon: Building2,
      href: '/admin/properties',
    },
    {
      title: 'Agents',
      icon: Users,
      href: '/admin/agents',
    },
    {
      title: 'Blogs',
      icon: BookOpen,
      href: '/admin/blogs',
    },
    {
      title: 'Testimonials',
      icon: MessageSquare,
      href: '/admin/testimonials',
    },
    {
      title: 'Queries',
      icon: Mail,
      href: '/admin/contacts',
    },
  ];

  const isActive = (href) => pathname === href;

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg border border-slate-200"
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6 text-slate-900" />
        ) : (
          <Menu className="w-6 h-6 text-slate-900" />
        )}
      </button>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen bg-white border-r border-slate-200 shadow-lg z-40
          transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          w-64
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500 flex items-center justify-center">
                <LayoutDashboard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900">Admin Panel</h1>
                <p className="text-xs text-slate-600">Vridhi Real Estate</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <button
                      onClick={() => {
                        router.push(item.href);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`
                        w-full flex items-center gap-3 px-4 py-3 rounded-lg
                        transition-all duration-200
                        ${
                          active
                            ? 'bg-amber-500 text-white shadow-md'
                            : 'text-slate-700 hover:bg-slate-100'
                        }
                      `}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.title}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer Actions */}
          <div className="p-4 border-t border-slate-200 space-y-2">
            <Button
              onClick={() => {
                router.push('/');
                setIsMobileMenuOpen(false);
              }}
              variant="outline"
              className="w-full gap-2"
            >
              <Home className="w-4 h-4" />
              View Site
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full gap-2 text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
