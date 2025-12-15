
import React from 'react';
import { CampaignsTab } from '@/components/dashboard/tabs/CampaignsTab';

export const CampaignsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Campaigns</h1>
        <p className="text-gray-600">Create and manage your email campaigns</p>
      </div>
      <CampaignsTab />
    </div>
  );
};
