import { useState, useEffect } from 'react';
import {
  CubeIcon,
  CogIcon,
  ChartBarIcon,
  PlusIcon,
  ArrowTrendingUpIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

interface DashboardStats {
  activeFlows: number;
  projects: number;
  executions: number;
  successRate: number;
}

interface RecentActivity {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  description: string;
  timestamp: string;
}

export function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    activeFlows: 0,
    projects: 0,
    executions: 0,
    successRate: 0
  });

  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);

  useEffect(() => {
    // Simulate fetching dashboard data
    setStats({
      activeFlows: 12,
      projects: 5,
      executions: 1247,
      successRate: 94.5
    });

    setRecentActivity([
      {
        id: '1',
        type: 'success',
        title: 'Email Marketing Flow Completed',
        description: 'Successfully sent 245 emails',
        timestamp: '2 minutes ago'
      },
      {
        id: '2',
        type: 'error',
        title: 'Data Sync Failed',
        description: 'Connection timeout to external API',
        timestamp: '15 minutes ago'
      },
      {
        id: '3',
        type: 'info',
        title: 'New Project Created',
        description: 'Social Media Automation project',
        timestamp: '1 hour ago'
      },
      {
        id: '4',
        type: 'success',
        title: 'Lead Generation Flow Active',
        description: 'Processing 50 new leads',
        timestamp: '2 hours ago'
      }
    ]);
  }, []);

  const getActivityIcon = (type: RecentActivity['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case 'error':
        return <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />;
      default:
        return <ClockIcon className="w-5 h-5 text-blue-500" />;
    }
  };

  const getActivityBg = (type: RecentActivity['type']) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your automations.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <PlusIcon className="w-5 h-5 mr-2" />
            New Flow
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <PlusIcon className="w-5 h-5 mr-2" />
            New Project
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Flows</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.activeFlows}</p>
              <div className="flex items-center mt-2">
                <ArrowTrendingUpIcon className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+12% from last month</span>
              </div>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <CogIcon className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Projects</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.projects}</p>
              <div className="flex items-center mt-2">
                <ArrowTrendingUpIcon className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+2 new this week</span>
              </div>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <CubeIcon className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Executions</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.executions.toLocaleString()}</p>
              <div className="flex items-center mt-2">
                <ArrowTrendingUpIcon className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+23% from last week</span>
              </div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <ChartBarIcon className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Success Rate</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.successRate}%</p>
              <div className="flex items-center mt-2">
                <ArrowTrendingUpIcon className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+2.1% improvement</span>
              </div>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <CheckCircleIcon className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className={`flex items-start p-4 rounded-lg border ${getActivityBg(activity.type)}`}>
                  <div className="flex-shrink-0 mr-3">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">{activity.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                    <p className="text-xs text-gray-500 mt-2">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center">
                  <PlusIcon className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Create New Flow</p>
                    <p className="text-xs text-gray-500">Start building automation</p>
                  </div>
                </div>
              </button>

              <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center">
                  <CubeIcon className="w-5 h-5 text-purple-600 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Create Project</p>
                    <p className="text-xs text-gray-500">Organize your flows</p>
                  </div>
                </div>
              </button>

              <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center">
                  <ChartBarIcon className="w-5 h-5 text-green-600 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">View Analytics</p>
                    <p className="text-xs text-gray-500">Track performance</p>
                  </div>
                </div>
              </button>

              <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center">
                  <CogIcon className="w-5 h-5 text-yellow-600 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Browse Templates</p>
                    <p className="text-xs text-gray-500">Get started quickly</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
