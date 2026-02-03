import React, { useState, useEffect } from 'react';

interface DashboardStats {
  activeFlows: number;
  projects: number;
  executions: number;
}

export function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    activeFlows: 0,
    projects: 0,
    executions: 0
  });

  useEffect(() => {
    // Simulate fetching dashboard data
    const fetchStats = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await fetch('/api/dashboard/stats');
        // const data = await response.json();
        
        // Mock data for now
        setStats({
          activeFlows: 5,
          projects: 3,
          executions: 42
        });
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Yflow Dashboard</h2>
        <p className="text-gray-600">Welcome to your automation platform</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Active Flows</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.activeFlows}</p>
          <p className="text-sm text-gray-500 mt-2">Currently running</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Projects</h3>
          <p className="text-3xl font-bold text-green-600">{stats.projects}</p>
          <p className="text-sm text-gray-500 mt-2">Total projects</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Executions</h3>
          <p className="text-3xl font-bold text-purple-600">{stats.executions}</p>
          <p className="text-sm text-gray-500 mt-2">This month</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <p className="text-sm font-medium text-gray-900">Flow "Data Sync" completed</p>
                <p className="text-xs text-gray-500">2 minutes ago</p>
              </div>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Success
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <p className="text-sm font-medium text-gray-900">New project "Marketing" created</p>
                <p className="text-xs text-gray-500">1 hour ago</p>
              </div>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Created
              </span>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-gray-900">Flow "Email Campaign" started</p>
                <p className="text-xs text-gray-500">3 hours ago</p>
              </div>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                Running
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Create New Flow</p>
                  <p className="text-xs text-gray-500">Start building automation</p>
                </div>
              </div>
            </button>
            
            <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Create New Project</p>
                  <p className="text-xs text-gray-500">Organize your flows</p>
                </div>
              </div>
            </button>

            <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Browse Templates</p>
                  <p className="text-xs text-gray-500">Get started quickly</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
