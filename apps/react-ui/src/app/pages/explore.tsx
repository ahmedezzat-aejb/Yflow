import { useState } from 'react';
import {
  MagnifyingGlassIcon,
  SparklesIcon,
  CogIcon,
  DocumentTextIcon,
  GlobeAltIcon,
  ChartBarIcon,
  ClockIcon,
  StarIcon,
  ArrowRightIcon,
  FunnelIcon,
  BriefcaseIcon
} from '@heroicons/react/24/outline';

interface ExploreItem {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  popularity: number;
  isNew: boolean;
  isPremium: boolean;
  tags: string[];
}

const exploreItems: ExploreItem[] = [
  // Popular Flows
  {
    id: '1',
    name: 'Email Automation Suite',
    description: 'Complete email marketing automation with personalization',
    category: 'Popular',
    icon: '📧',
    popularity: 98,
    isNew: false,
    isPremium: false,
    tags: ['Email', 'Marketing', 'Automation']
  },
  {
    id: '2',
    name: 'Social Media Manager',
    description: 'Schedule and manage posts across all social platforms',
    category: 'Popular',
    icon: '📱',
    popularity: 95,
    isNew: true,
    isPremium: false,
    tags: ['Social Media', 'Scheduling', 'Marketing']
  },
  {
    id: '3',
    name: 'E-commerce Integration',
    description: 'Connect your online store with multiple sales channels',
    category: 'Popular',
    icon: '🛒',
    popularity: 92,
    isNew: false,
    isPremium: true,
    tags: ['E-commerce', 'Sales', 'Integration']
  },

  // Business Automation
  {
    id: '4',
    name: 'CRM Integration',
    description: 'Sync customer data between your CRM and other tools',
    category: 'Business',
    icon: '🤝',
    popularity: 89,
    isNew: false,
    isPremium: true,
    tags: ['CRM', 'Customer Data', 'Sync']
  },
  {
    id: '5',
    name: 'Invoice Processing',
    description: 'Automated invoice creation and payment processing',
    category: 'Business',
    icon: '🧾',
    popularity: 87,
    isNew: false,
    isPremium: true,
    tags: ['Finance', 'Invoicing', 'Automation']
  },
  {
    id: '6',
    name: 'Project Management Sync',
    description: 'Keep all your project management tools in sync',
    category: 'Business',
    icon: '📊',
    popularity: 85,
    isNew: true,
    isPremium: false,
    tags: ['Project Management', 'Sync', 'Productivity']
  },

  // Data & Analytics
  {
    id: '7',
    name: 'Data Pipeline Builder',
    description: 'Create complex data processing pipelines',
    category: 'Data',
    icon: '🔄',
    popularity: 91,
    isNew: false,
    isPremium: true,
    tags: ['Data', 'ETL', 'Analytics']
  },
  {
    id: '8',
    name: 'Report Generator',
    description: 'Automated business report generation and delivery',
    category: 'Data',
    icon: '📈',
    popularity: 88,
    isNew: false,
    isPremium: false,
    tags: ['Reporting', 'Analytics', 'Business']
  },
  {
    id: '9',
    name: 'Dashboard Creator',
    description: 'Build custom dashboards from multiple data sources',
    category: 'Data',
    icon: '📊',
    popularity: 86,
    isNew: true,
    isPremium: true,
    tags: ['Dashboard', 'Data Visualization', 'Analytics']
  },

  // Communication
  {
    id: '10',
    name: 'Slack Automation',
    description: 'Automate Slack workflows and notifications',
    category: 'Communication',
    icon: '💬',
    popularity: 93,
    isNew: false,
    isPremium: false,
    tags: ['Slack', 'Communication', 'Team']
  },
  {
    id: '11',
    name: 'Email Notifications',
    description: 'Smart email notification system with filtering',
    category: 'Communication',
    icon: '📨',
    popularity: 90,
    isNew: false,
    isPremium: false,
    tags: ['Email', 'Notifications', 'Communication']
  },
  {
    id: '12',
    name: 'SMS Gateway',
    description: 'Send and receive SMS messages programmatically',
    category: 'Communication',
    icon: '📱',
    popularity: 84,
    isNew: true,
    isPremium: true,
    tags: ['SMS', 'Messaging', 'Communication']
  },

  // Productivity
  {
    id: '13',
    name: 'Task Automator',
    description: 'Automate repetitive tasks and workflows',
    category: 'Productivity',
    icon: '✅',
    popularity: 89,
    isNew: false,
    isPremium: false,
    tags: ['Tasks', 'Productivity', 'Automation']
  },
  {
    id: '14',
    name: 'Calendar Sync',
    description: 'Keep all your calendars synchronized',
    category: 'Productivity',
    icon: '📅',
    popularity: 87,
    isNew: false,
    isPremium: false,
    tags: ['Calendar', 'Sync', 'Productivity']
  },
  {
    id: '15',
    name: 'File Manager',
    description: 'Automated file organization and backup',
    category: 'Productivity',
    icon: '📁',
    popularity: 82,
    isNew: true,
    isPremium: false,
    tags: ['File Management', 'Backup', 'Organization']
  }
];

const categories = ['All', 'Popular', 'Business', 'Data', 'Communication', 'Productivity'];
const sortByOptions = ['Popular', 'Newest', 'Name'];

export function Explore() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Popular');

  const filteredItems = exploreItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    if (sortBy === 'Popular') return b.popularity - a.popularity;
    if (sortBy === 'Newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
    if (sortBy === 'Name') return a.name.localeCompare(b.name);
    return 0;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Popular': return <SparklesIcon className="w-5 h-5" />;
      case 'Business': return <BriefcaseIcon className="w-5 h-5" />;
      case 'Data': return <ChartBarIcon className="w-5 h-5" />;
      case 'Communication': return <GlobeAltIcon className="w-5 h-5" />;
      case 'Productivity': return <CogIcon className="w-5 h-5" />;
      default: return <DocumentTextIcon className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Explore</h1>
              <p className="mt-2 text-gray-600">Discover automation flows and integrations</p>
            </div>
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <SparklesIcon className="w-5 h-5 mr-2" />
              Create Custom Flow
            </button>
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
                placeholder="Search flows, apps, integrations..."
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
            </div>
          </div>
        </div>
      </div>

      {/* Category Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {categories.slice(1).map(category => {
          const categoryItems = filteredItems.filter(item => item.category === category);
          if (categoryItems.length === 0) return null;

          return (
            <div key={category} className="mb-12">
              <div className="flex items-center mb-6">
                <div className="flex items-center">
                  {getCategoryIcon(category)}
                  <h2 className="ml-2 text-2xl font-bold text-gray-900">{category}</h2>
                </div>
                <div className="ml-4 text-sm text-gray-500">
                  {categoryItems.length} items
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <div className="text-3xl mr-3">{item.icon}</div>
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                            <div className="flex items-center mt-1">
                              <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                              <span className="text-xs text-gray-500">{item.category}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {item.isNew && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              New
                            </span>
                          )}
                          {item.isPremium && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                              Premium
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm mb-4">{item.description}</p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {item.tags.map((tag, index) => (
                          <span key={index} className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <StarIcon className="w-4 h-4 text-yellow-400 mr-1" />
                            <span className="text-sm text-gray-600">{item.popularity}%</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <ClockIcon className="w-4 h-4 mr-1" />
                            <span>5 min setup</span>
                          </div>
                        </div>
                        <button className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Use Flow
                          <ArrowRightIcon className="w-4 h-4 ml-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <MagnifyingGlassIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No flows found</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
