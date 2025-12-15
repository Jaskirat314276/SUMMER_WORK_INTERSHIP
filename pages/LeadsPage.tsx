
import React from 'react';
import { LeadsTab } from '@/components/dashboard/tabs/LeadsTab';

export const LeadsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Leads</h1>
        <p className="text-gray-600">Manage and track your leads</p>
      </div>
      <LeadsTab />
    </div>
  );
};
