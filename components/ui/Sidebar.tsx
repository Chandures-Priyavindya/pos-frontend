"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  ShoppingCart, 
  LayoutDashboard,
  Users,
  HelpCircle,
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const pathname = usePathname();

  const navigationItems = [
    {
      href: '/cashier',
      icon: LayoutDashboard,
      label: 'DASHBOARD',
      isActive: pathname === '/cashier'
    },
    {
      href: '/cashier/customers',
      icon: Users,
      label: 'CUSTOMERS',
      isActive: pathname === '/cashier/customers'
    },
    {
      href: '/cashier/help',
      icon: HelpCircle,
      label: 'HELP',
      isActive: pathname === '/cashier/help'
    }
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <ShoppingCart className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-slate-800">SwiftCart</span>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            className="lg:hidden"
            onClick={onToggle}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="p-4 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href}>
                <Button 
                  variant={item.isActive ? "default" : "ghost"}
                  className={`w-full justify-start gap-3 ${
                    item.isActive 
                      ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                      : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-4 left-4 right-4 space-y-2">
          <Button variant="ghost" className="w-full justify-start gap-3 text-slate-600 hover:text-slate-800 hover:bg-slate-100">
            <Settings className="h-5 w-5" />
            SETTINGS
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3 text-slate-600 hover:text-slate-800 hover:bg-slate-100">
            <LogOut className="h-5 w-5" />
            LOG OUT
          </Button>
        </div>
      </div>
    </>
  );
}