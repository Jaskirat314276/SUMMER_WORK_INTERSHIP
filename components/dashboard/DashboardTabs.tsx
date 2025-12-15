
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LeadsTab } from './tabs/LeadsTab';
import { CampaignsTab } from './tabs/CampaignsTab';
import { AnalyticsTab } from './tabs/AnalyticsTab';
import { SettingsTab } from './tabs/SettingsTab';
import { NotificationsTab } from './tabs/NotificationsTab';
import { ScheduleTab } from './tabs/ScheduleTab';
import { ProfileScreen } from '../profile/ProfileScreen';
import { BillingScreen } from '../billing/BillingScreen';
import useDashboardViewModel from '@/viewModels/leadsViewModels';
import { useAuth } from '@/contexts/AuthContext';

export const DashboardTabs = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const {loading, error, fetchDashboardLeads} = useDashboardViewModel();
  const [data, setData] = useState();
  console.log("dashboard screen loaded ");
  const { user } = useAuth();
  console.log("user is", user);
  
  // Use user.id as tenantId for now
  const tenantId = user?.id || 'default-tenant-id';
  console.log("tenantId is " , tenantId);

  useEffect(() => {
    const handleSidebarNavigation = (event: CustomEvent) => {
      const { tabId } = event.detail;
      setActiveTab(tabId);
    };

    window.addEventListener('sidebarNavigation', handleSidebarNavigation as EventListener);

    return () => {
      window.removeEventListener('sidebarNavigation', handleSidebarNavigation as EventListener);
    };
  }, []);

  useEffect( () => {
      const res = fetchDashboardLeads(tenantId);
      console.log("dashboard data " , res);
  },[tenantId])

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Manage your leads and campaigns</p>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-sm font-medium text-gray-500">Total Leads</h3>
              <p className="text-2xl font-bold text-gray-900">1,234</p>
            </div>
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-sm font-medium text-gray-500">Active Campaigns</h3>
              <p className="text-2xl font-bold text-gray-900">8</p>
            </div>
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-sm font-medium text-gray-500">Email Sent Today</h3>
              <p className="text-2xl font-bold text-gray-900">23</p>
            </div>
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-sm font-medium text-gray-500">Response Rate</h3>
              <p className="text-2xl font-bold text-gray-900">12.5%</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="leads">
          <LeadsTab />
        </TabsContent>

        <TabsContent value="campaigns">
          <CampaignsTab />
        </TabsContent>

        <TabsContent value="analytics">
          <AnalyticsTab />
        </TabsContent>

        <TabsContent value="notifications">
          <NotificationsTab />
        </TabsContent>

        <TabsContent value="schedule">
          <ScheduleTab />
        </TabsContent>

        <TabsContent value="settings">
          <SettingsTab />
        </TabsContent>

        <TabsContent value="profile">
          <ProfileScreen />
        </TabsContent>

        <TabsContent value="billing">
          <BillingScreen />
        </TabsContent>
      </Tabs>
    </div>
  );
};
