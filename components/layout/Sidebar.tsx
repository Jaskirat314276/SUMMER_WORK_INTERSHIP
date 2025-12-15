
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Mail, 
  Settings, 
  Grid, 
  X,
  Bell,
  Calendar,
  User,
  CreditCard
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  { name: 'Dashboard', icon: Home, path: '/dashboard' },
  { name: 'Leads', icon: Users, path: '/leads' },
  { name: 'Campaigns', icon: Mail, path: '/campaigns' },
  { name: 'Analytics', icon: Grid, path: '/analytics' },
  { name: 'Notifications', icon: Bell, path: '/notifications' },
  { name: 'Schedule', icon: Calendar, path: '/schedule' },
  { name: 'Settings', icon: Settings, path: '/settings' },
  { name: 'Profile', icon: User, path: '/profile' },
  { name: 'Billing', icon: CreditCard, path: '/billing' },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/' || location.pathname === '/dashboard';
    }
    return location.pathname === path;
  };

  const handleNavClick = () => {
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <div className={cn(
      "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0",
      isOpen ? "translate-x-0" : "-translate-x-full"
    )}>
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">CRM</span>
          </div>
          <span className="font-bold text-xl text-gray-900">LeadGen Pro</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="lg:hidden"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      <nav className="p-4 space-y-2">
        {navigation.map((item) => (
          <Button
            key={item.name}
            variant={isActive(item.path) ? "default" : "ghost"}
            className="w-full justify-start gap-2"
            asChild
            onClick={handleNavClick}
          >
            <Link to={item.path}>
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          </Button>
        ))}
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-sm text-gray-900 mb-1">Current Plan</h3>
          <p className="text-xs text-gray-600 mb-2">Professional</p>
          <div className="text-xs text-gray-600">
            <div className="flex justify-between">
              <span>Emails sent today</span>
              <span>23/30</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
