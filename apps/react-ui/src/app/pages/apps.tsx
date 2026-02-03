import { useState } from 'react';
import {
  MagnifyingGlassIcon,
  CogIcon,
  CloudIcon,
  DocumentTextIcon,
  ShoppingCartIcon,
  UserGroupIcon,
  ArrowRightIcon,
  FunnelIcon,
  StarIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

interface App {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  color: string;
  isInstalled: boolean;
  isPremium: boolean;
  popularity: number;
  features: string[];
  connections: number;
}

const apps: App[] = [
  // Communication Apps
  {
    id: 'slack',
    name: 'Slack',
    description: 'Team communication and collaboration platform',
    category: 'Communication',
    icon: '💬',
    color: 'bg-purple-500',
    isInstalled: false,
    isPremium: false,
    popularity: 98,
    features: ['Send Messages', 'Create Channels', 'File Sharing', 'Webhooks'],
    connections: 1250000
  },
  {
    id: 'discord',
    name: 'Discord',
    description: 'Voice, video, and text communication for communities',
    category: 'Communication',
    icon: '🎮',
    color: 'bg-indigo-500',
    isInstalled: false,
    isPremium: false,
    popularity: 95,
    features: ['Send Messages', 'Voice Channels', 'Server Management', 'Webhooks'],
    connections: 980000
  },
  {
    id: 'teams',
    name: 'Microsoft Teams',
    description: 'Enterprise communication and collaboration',
    category: 'Communication',
    icon: '👥',
    color: 'bg-blue-500',
    isInstalled: false,
    isPremium: true,
    popularity: 92,
    features: ['Chat', 'Video Calls', 'File Sharing', 'Calendar Integration'],
    connections: 850000
  },
  {
    id: 'gmail',
    name: 'Gmail',
    description: 'Google\'s email service with powerful automation',
    category: 'Communication',
    icon: '📧',
    color: 'bg-red-500',
    isInstalled: true,
    isPremium: false,
    popularity: 99,
    features: ['Send Emails', 'Read Emails', 'Label Management', 'Filters'],
    connections: 2100000
  },
  {
    id: 'outlook',
    name: 'Outlook',
    description: 'Microsoft\'s email and calendar service',
    category: 'Communication',
    icon: '📨',
    color: 'bg-blue-600',
    isInstalled: false,
    isPremium: true,
    popularity: 88,
    features: ['Email Management', 'Calendar', 'Contacts', 'Tasks'],
    connections: 750000
  },

  // Productivity Apps
  {
    id: 'notion',
    name: 'Notion',
    description: 'All-in-one workspace for notes and collaboration',
    category: 'Productivity',
    icon: '📝',
    color: 'bg-gray-800',
    isInstalled: true,
    isPremium: false,
    popularity: 94,
    features: ['Create Pages', 'Databases', 'Templates', 'Collaboration'],
    connections: 650000
  },
  {
    id: 'trello',
    name: 'Trello',
    description: 'Visual project management with boards and cards',
    category: 'Productivity',
    icon: '📋',
    color: 'bg-blue-400',
    isInstalled: false,
    isPremium: false,
    popularity: 91,
    features: ['Create Boards', 'Manage Cards', 'Checklists', 'Team Collaboration'],
    connections: 580000
  },
  {
    id: 'asana',
    name: 'Asana',
    description: 'Work management platform for teams',
    category: 'Productivity',
    icon: '✅',
    color: 'bg-green-500',
    isInstalled: false,
    isPremium: true,
    popularity: 89,
    features: ['Task Management', 'Projects', 'Timeline', 'Team Workload'],
    connections: 520000
  },
  {
    id: 'clickup',
    name: 'ClickUp',
    description: 'All-in-one productivity platform',
    category: 'Productivity',
    icon: '🎯',
    color: 'bg-purple-600',
    isInstalled: false,
    isPremium: false,
    popularity: 87,
    features: ['Tasks', 'Docs', 'Goals', 'Whiteboards'],
    connections: 450000
  },
  {
    id: 'jira',
    name: 'Jira',
    description: 'Issue tracking and project management',
    category: 'Productivity',
    icon: '🔧',
    color: 'bg-blue-700',
    isInstalled: false,
    isPremium: true,
    popularity: 93,
    features: ['Issue Tracking', 'Project Management', 'Agile Boards', 'Reporting'],
    connections: 680000
  },

  // E-commerce Apps
  {
    id: 'shopify',
    name: 'Shopify',
    description: 'E-commerce platform for online stores',
    category: 'E-commerce',
    icon: '🛒',
    color: 'bg-green-600',
    isInstalled: false,
    isPremium: true,
    popularity: 96,
    features: ['Product Management', 'Order Processing', 'Inventory', 'Customer Data'],
    connections: 890000
  },
  {
    id: 'woocommerce',
    name: 'WooCommerce',
    description: 'Open-source e-commerce plugin for WordPress',
    category: 'E-commerce',
    icon: '🏪',
    color: 'bg-purple-700',
    isInstalled: false,
    isPremium: false,
    popularity: 90,
    features: ['Product Catalog', 'Order Management', 'Payment Integration', 'Shipping'],
    connections: 420000
  },
  {
    id: 'stripe',
    name: 'Stripe',
    description: 'Payment processing platform',
    category: 'E-commerce',
    icon: '💳',
    color: 'bg-indigo-600',
    isInstalled: true,
    isPremium: false,
    popularity: 97,
    features: ['Payment Processing', 'Subscriptions', 'Invoicing', 'Financial Reports'],
    connections: 1100000
  },
  {
    id: 'paypal',
    name: 'PayPal',
    description: 'Digital payment platform',
    category: 'E-commerce',
    icon: '💰',
    color: 'bg-blue-500',
    isInstalled: false,
    isPremium: false,
    popularity: 94,
    features: ['Payments', 'Invoicing', 'Disputes', 'Reporting'],
    connections: 950000
  },

  // Marketing Apps
  {
    id: 'mailchimp',
    name: 'Mailchimp',
    description: 'Email marketing and automation platform',
    category: 'Marketing',
    icon: '🐒',
    color: 'bg-yellow-500',
    isInstalled: false,
    isPremium: true,
    popularity: 92,
    features: ['Email Campaigns', 'Automation', 'Analytics', 'A/B Testing'],
    connections: 620000
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    description: 'Inbound marketing, sales, and service platform',
    category: 'Marketing',
    icon: '🎯',
    color: 'bg-orange-500',
    isInstalled: false,
    isPremium: true,
    popularity: 95,
    features: ['CRM', 'Marketing Automation', 'Sales Pipeline', 'Analytics'],
    connections: 780000
  },
  {
    id: 'google-ads',
    name: 'Google Ads',
    description: 'Online advertising platform',
    category: 'Marketing',
    icon: '📊',
    color: 'bg-blue-600',
    isInstalled: false,
    isPremium: false,
    popularity: 91,
    features: ['Campaign Management', 'Ad Creation', 'Performance Tracking', 'Budget Control'],
    connections: 540000
  },
  {
    id: 'facebook-ads',
    name: 'Facebook Ads',
    description: 'Social media advertising platform',
    category: 'Marketing',
    icon: '📘',
    color: 'bg-blue-700',
    isInstalled: false,
    isPremium: false,
    popularity: 89,
    features: ['Ad Campaigns', 'Audience Targeting', 'Analytics', 'A/B Testing'],
    connections: 480000
  },

  // Data & Analytics Apps
  {
    id: 'google-sheets',
    name: 'Google Sheets',
    description: 'Online spreadsheet application',
    category: 'Data',
    icon: '📊',
    color: 'bg-green-500',
    isInstalled: true,
    isPremium: false,
    popularity: 98,
    features: ['Spreadsheets', 'Formulas', 'Charts', 'Collaboration'],
    connections: 1800000
  },
  {
    id: 'airtable',
    name: 'Airtable',
    description: 'Cloud collaboration service with database',
    category: 'Data',
    icon: '🗂️',
    color: 'bg-blue-400',
    isInstalled: false,
    isPremium: true,
    popularity: 88,
    features: ['Database Management', 'Forms', 'Automations', 'API Integration'],
    connections: 380000
  },
  {
    id: 'tableau',
    name: 'Tableau',
    description: 'Data visualization and business intelligence',
    category: 'Data',
    icon: '📈',
    color: 'bg-orange-600',
    isInstalled: false,
    isPremium: true,
    popularity: 85,
    features: ['Data Visualization', 'Dashboards', 'Analytics', 'Reporting'],
    connections: 320000
  },

  // Storage & File Management
  {
    id: 'google-drive',
    name: 'Google Drive',
    description: 'Cloud storage and file synchronization',
    category: 'Storage',
    icon: '☁️',
    color: 'bg-blue-500',
    isInstalled: true,
    isPremium: false,
    popularity: 97,
    features: ['File Storage', 'File Sharing', 'Document Editing', 'Collaboration'],
    connections: 1600000
  },
  {
    id: 'dropbox',
    name: 'Dropbox',
    description: 'Cloud storage and file sharing service',
    category: 'Storage',
    icon: '📦',
    color: 'bg-blue-600',
    isInstalled: false,
    isPremium: false,
    popularity: 90,
    features: ['File Storage', 'File Sync', 'Sharing', 'Version History'],
    connections: 720000
  },
  {
    id: 'onedrive',
    name: 'OneDrive',
    description: 'Microsoft\'s cloud storage service',
    category: 'Storage',
    icon: '📁',
    color: 'bg-blue-700',
    isInstalled: false,
    isPremium: true,
    popularity: 86,
    features: ['File Storage', 'Office Integration', 'Sharing', 'Security'],
    connections: 580000
  }
];

const categories = ['All', 'Communication', 'Productivity', 'E-commerce', 'Marketing', 'Data', 'Storage'];
const sortByOptions = ['Popular', 'Name', 'Connections'];

export function Apps() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Popular');
  const [showInstalledOnly, setShowInstalledOnly] = useState(false);

  const filteredApps = apps.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.features.some(feature => feature.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || app.category === selectedCategory;
    const matchesInstalled = !showInstalledOnly || app.isInstalled;
    return matchesSearch && matchesCategory && matchesInstalled;
  }).sort((a, b) => {
    if (sortBy === 'Popular') return b.popularity - a.popularity;
    if (sortBy === 'Name') return a.name.localeCompare(b.name);
    if (sortBy === 'Connections') return b.connections - a.connections;
    return 0;
  });

  const formatConnections = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Apps</h1>
              <p className="mt-2 text-gray-600">Connect your favorite apps and automate your workflows</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-sm text-gray-500">
                {apps.filter(app => app.isInstalled).length} of {apps.length} apps installed
              </div>
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <CogIcon className="w-5 h-5 mr-2" />
                Request App
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search apps..."
              />
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <FunnelIcon className="w-5 h-5 text-gray-400" />
                <span className="text-sm font-medium text-gray-700">Category:</span>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="block w-40 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="block w-32 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  {sortByOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={showInstalledOnly}
                  onChange={(e) => setShowInstalledOnly(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Installed only</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Apps Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredApps.map((app) => (
            <div key={app.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className={`w-12 h-12 ${app.color} rounded-lg flex items-center justify-center mr-3`}>
                      <span className="text-2xl">{app.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{app.name}</h3>
                      <div className="flex items-center mt-1">
                        <div className={`w-2 h-2 rounded-full ${app.isInstalled ? 'bg-green-500' : 'bg-gray-300'} mr-2`}></div>
                        <span className="text-xs text-gray-500">{app.category}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {app.isPremium && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        Premium
                      </span>
                    )}
                    {app.isInstalled && (
                      <CheckCircleIcon className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4">{app.description}</p>

                {/* Features */}
                <div className="mb-4">
                  <div className="text-xs font-medium text-gray-700 mb-2">Features:</div>
                  <div className="flex flex-wrap gap-1">
                    {app.features.slice(0, 3).map((feature, index) => (
                      <span key={index} className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">
                        {feature}
                      </span>
                    ))}
                    {app.features.length > 3 && (
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">
                        +{app.features.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <StarIcon className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="text-sm text-gray-600">{app.popularity}%</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <UserGroupIcon className="w-4 h-4 mr-1" />
                      <span>{formatConnections(app.connections)}</span>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <button className={`w-full flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  app.isInstalled
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}>
                  {app.isInstalled ? (
                    <>
                      <CogIcon className="w-4 h-4 mr-2" />
                      Configure
                    </>
                  ) : (
                    <>
                      <ArrowRightIcon className="w-4 h-4 mr-2" />
                      Connect
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredApps.length === 0 && (
          <div className="text-center py-12">
            <MagnifyingGlassIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No apps found</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
