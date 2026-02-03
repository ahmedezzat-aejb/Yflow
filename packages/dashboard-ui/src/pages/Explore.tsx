import React from 'react';

export function Explore() {
  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900">Explore</h1>
        <p className="text-gray-600 mt-2">Discover automation flows and integrations</p>
      </div>
      
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Popular Flows</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-900">Email Automation</h3>
            <p className="text-sm text-gray-500 mt-1">Automate email workflows</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-900">Social Media</h3>
            <p className="text-sm text-gray-500 mt-1">Schedule social media posts</p>
          </div>
        </div>
      </div>
    </div>
  );
}
