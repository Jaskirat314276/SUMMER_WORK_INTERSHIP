
import React from 'react';
import { SettingsTab } from '@/components/dashboard/tabs/SettingsTab';

export const SettingsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Configure your account and preferences</p>
      </div>
      <SettingsTab />
    </div>
  );
};
