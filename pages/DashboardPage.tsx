
import React, { useState, useEffect } from 'react';
import useDashboardViewModel from '@/viewModels/leadsViewModels';
import { useAuth } from '@/contexts/AuthContext';

export const DashboardPage = () => {
  const {loading, error, fetchDashboardLeads} = useDashboardViewModel();
  const [data, setData] = useState();
  const { user } = useAuth();
  
  // Use user.id as tenantId for now
  const tenantId = user?.id || 'default-tenant-id';

  useEffect( () => {
      const res = fetchDashboardLeads(tenantId);
      console.log("dashboard data " , res);
  },[tenantId])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to your lead management dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Total Leads</h3>
          <p className="text-2xl font-bold text-gray-900">1,234</p>
          <p className="text-xs text-gray-500 mt-1">+12% from last month</p>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Active Campaigns</h3>
          <p className="text-2xl font-bold text-gray-900">8</p>
          <p className="text-xs text-gray-500 mt-1">2 campaigns running</p>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Emails Sent Today</h3>
          <p className="text-2xl font-bold text-gray-900">23</p>
          <p className="text-xs text-gray-500 mt-1">Goal: 50 emails</p>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Response Rate</h3>
          <p className="text-2xl font-bold text-gray-900">12.5%</p>
          <p className="text-xs text-green-600 mt-1">+2.1% from last week</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-600">New lead: John Smith added</span>
              <span className="text-xs text-gray-400">2 minutes ago</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-600">Campaign "Summer Sale" launched</span>
              <span className="text-xs text-gray-400">1 hour ago</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-600">Lead status updated to "Interested"</span>
              <span className="text-xs text-gray-400">3 hours ago</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <span className="text-sm font-medium text-gray-900">Add New Lead</span>
              <p className="text-xs text-gray-500">Manually add a new lead to your pipeline</p>
            </button>
            <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <span className="text-sm font-medium text-gray-900">Create Campaign</span>
              <p className="text-xs text-gray-500">Start a new email marketing campaign</p>
            </button>
            <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <span className="text-sm font-medium text-gray-900">View Analytics</span>
              <p className="text-xs text-gray-500">Check your campaign performance metrics</p>
            </button>
          </div>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">Error loading dashboard data: {error}</p>
        </div>
      )}
    </div>
  );
};
