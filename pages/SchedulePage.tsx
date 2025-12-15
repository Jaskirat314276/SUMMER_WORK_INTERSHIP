
import React from 'react';
import { ScheduleTab } from '@/components/dashboard/tabs/ScheduleTab';

export const SchedulePage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Schedule</h1>
        <p className="text-gray-600">Manage your scheduled campaigns and activities</p>
      </div>
      <ScheduleTab />
    </div>
  );
};
