
import React from 'react';
import { ProfileScreen } from '@/components/profile/ProfileScreen';

export const ProfilePage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        <p className="text-gray-600">Manage your personal information</p>
      </div>
      <ProfileScreen />
    </div>
  );
};
