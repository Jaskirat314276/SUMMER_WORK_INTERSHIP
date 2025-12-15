
import React from 'react';
import { AnalyticsTab } from '@/components/dashboard/tabs/AnalyticsTab';

export const AnalyticsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600">Track your performance and insights</p>
      </div>
      <AnalyticsTab />
    </div>
  );
};
