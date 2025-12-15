
import React from 'react';
import { BillingScreen } from '@/components/billing/BillingScreen';

export const BillingPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Billing</h1>
        <p className="text-gray-600">Manage your subscription and billing</p>
      </div>
      <BillingScreen />
    </div>
  );
};
