// components/Settings.js

import React, { useState } from 'react';

const Settings = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);

  const handleEmailNotificationsChange = () => {
    setEmailNotifications(!emailNotifications);
  };

  return (
    <div className="container mx-auto py-12 px-6 bg-slate-100">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Account Settings</h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email Notifications</label>
          <div className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={emailNotifications}
              onChange={handleEmailNotificationsChange}
            />
            <span>{emailNotifications ? 'Enabled' : 'Disabled'}</span>
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Change Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            placeholder="Enter new password"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            placeholder="Confirm new password"
          />
        </div>

        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Settings;
