import React from 'react';

export function Logs() {
  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900">Logs</h1>
        <p className="text-gray-600 mt-2">View execution logs and system events</p>
      </div>
      
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Logs</h2>
        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">Flow execution completed</span>
              <span className="text-sm text-gray-500">2 minutes ago</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">Email automation flow executed successfully</p>
          </div>
          <div className="border-l-4 border-green-500 pl-4 py-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">API connection established</span>
              <span className="text-sm text-gray-500">5 minutes ago</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">Connected to Slack successfully</p>
          </div>
        </div>
      </div>
    </div>
  );
}
