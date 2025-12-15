
import React from 'react';
import { NotificationsTab } from '@/components/dashboard/tabs/NotificationsTab';

export const NotificationsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
        <p className="text-gray-600">Manage your notifications and alerts</p>
      </div>
      <NotificationsTab />
    </div>
  );
};
