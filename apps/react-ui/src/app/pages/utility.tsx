import { useState } from 'react';
import {
  MagnifyingGlassIcon,
  CogIcon,
  ClockIcon,
  FunnelIcon,
  ArrowRightIcon,
  PlayIcon,
  EyeIcon,
  PencilIcon,
  StarIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

interface Utility {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  color: string;
  isAvailable: boolean;
  isPremium: boolean;
  lastUsed?: string;
  usage: number;
  action?: string;
}

const utilities: Utility[] = [
  // Data Processing
  {
    id: 'data-transformer',
    name: 'Data Transformer',
    description: 'Transform and manipulate data between different formats',
    category: 'Data Processing',
    icon: '🔄',
    color: 'bg-blue-500',
    isAvailable: true,
    isPremium: false,
    lastUsed: '2 hours ago',
    usage: 156,
    action: 'Transform'
  },
  {
    id: 'csv-processor',
    name: 'CSV Processor',
    description: 'Process and manipulate CSV files',
    category: 'Data Processing',
    icon: '📊',
    color: 'bg-green-500',
    isAvailable: true,
    isPremium: false,
    lastUsed: '1 day ago',
    usage: 89,
    action: 'Process'
  },
  {
    id: 'json-validator',
    name: 'JSON Validator',
    description: 'Validate and format JSON data',
    category: 'Data Processing',
    icon: '✅',
    color: 'bg-purple-500',
    isAvailable: true,
    isPremium: false,
    lastUsed: '30 minutes ago',
    usage: 234,
    action: 'Validate'
  },
  {
    id: 'data-merger',
    name: 'Data Merger',
    description: 'Merge multiple data sources into one',
    category: 'Data Processing',
    icon: '🔗',
    color: 'bg-indigo-500',
    isAvailable: true,
    isPremium: true,
    lastUsed: '3 days ago',
    usage: 45,
    action: 'Merge'
  },

  // Text Processing
  {
    id: 'text-formatter',
    name: 'Text Formatter',
    description: 'Format and clean text data',
    category: 'Text Processing',
    icon: '📝',
    color: 'bg-yellow-500',
    isAvailable: true,
    isPremium: false,
    lastUsed: '5 hours ago',
    usage: 178,
    action: 'Format'
  },
  {
    id: 'url-encoder',
    name: 'URL Encoder/Decoder',
    description: 'Encode and decode URLs and parameters',
    category: 'Text Processing',
    icon: '🔗',
    color: 'bg-blue-600',
    isAvailable: true,
    isPremium: false,
    lastUsed: '1 hour ago',
    usage: 92,
    action: 'Encode'
  },
  {
    id: 'base64-converter',
    name: 'Base64 Converter',
    description: 'Convert text to and from Base64 encoding',
    category: 'Text Processing',
    icon: '🔐',
    color: 'bg-gray-600',
    isAvailable: true,
    isPremium: false,
    lastUsed: '4 hours ago',
    usage: 67,
    action: 'Convert'
  },
  {
    id: 'hash-generator',
    name: 'Hash Generator',
    description: 'Generate various hash types (MD5, SHA1, SHA256)',
    category: 'Text Processing',
    icon: '🔑',
    color: 'bg-red-600',
    isAvailable: true,
    isPremium: false,
    lastUsed: '2 days ago',
    usage: 123,
    action: 'Generate'
  },

  // File Operations
  {
    id: 'file-converter',
    name: 'File Converter',
    description: 'Convert files between different formats',
    category: 'File Operations',
    icon: '📄',
    color: 'bg-green-600',
    isAvailable: true,
    isPremium: true,
    lastUsed: '1 week ago',
    usage: 34,
    action: 'Convert'
  },
  {
    id: 'image-resizer',
    name: 'Image Resizer',
    description: 'Resize and optimize images',
    category: 'File Operations',
    icon: '🖼️',
    color: 'bg-purple-600',
    isAvailable: true,
    isPremium: false,
    lastUsed: '3 hours ago',
    usage: 201,
    action: 'Resize'
  },
  {
    id: 'pdf-tools',
    name: 'PDF Tools',
    description: 'Merge, split, and manipulate PDF files',
    category: 'File Operations',
    icon: '📕',
    color: 'bg-red-500',
    isAvailable: true,
    isPremium: true,
    lastUsed: '2 days ago',
    usage: 78,
    action: 'Process'
  },
  {
    id: 'zip-extractor',
    name: 'ZIP Extractor',
    description: 'Extract and create ZIP archives',
    category: 'File Operations',
    icon: '📦',
    color: 'bg-yellow-600',
    isAvailable: true,
    isPremium: false,
    lastUsed: '6 hours ago',
    usage: 145,
    action: 'Extract'
  },

  // Testing & Debugging
  {
    id: 'webhook-tester',
    name: 'Webhook Tester',
    description: 'Test and debug webhook endpoints',
    category: 'Testing & Debugging',
    icon: '🎣',
    color: 'bg-blue-500',
    isAvailable: true,
    isPremium: false,
    lastUsed: '1 hour ago',
    usage: 267,
    action: 'Test'
  },
  {
    id: 'api-tester',
    name: 'API Tester',
    description: 'Test REST API endpoints',
    category: 'Testing & Debugging',
    icon: '🌐',
    color: 'bg-green-500',
    isAvailable: true,
    isPremium: false,
    lastUsed: '30 minutes ago',
    usage: 189,
    action: 'Test'
  },
  {
    id: 'regex-tester',
    name: 'Regex Tester',
    description: 'Test and debug regular expressions',
    category: 'Testing & Debugging',
    icon: '🔍',
    color: 'bg-purple-500',
    isAvailable: true,
    isPremium: false,
    lastUsed: '4 hours ago',
    usage: 156,
    action: 'Test'
  },
  {
    id: 'json-path-tester',
    name: 'JSONPath Tester',
    description: 'Test JSONPath expressions',
    category: 'Testing & Debugging',
    icon: '🛤️',
    color: 'bg-indigo-500',
    isAvailable: true,
    isPremium: true,
    lastUsed: '2 days ago',
    usage: 43,
    action: 'Test'
  },

  // System Tools
  {
    id: 'cron-generator',
    name: 'Cron Generator',
    description: 'Generate and validate cron expressions',
    category: 'System Tools',
    icon: '⏰',
    color: 'bg-orange-500',
    isAvailable: true,
    isPremium: false,
    lastUsed: '5 hours ago',
    usage: 134,
    action: 'Generate'
  },
  {
    id: 'timestamp-converter',
    name: 'Timestamp Converter',
    description: 'Convert between different timestamp formats',
    category: 'System Tools',
    icon: '🕐',
    color: 'bg-blue-600',
    isAvailable: true,
    isPremium: false,
    lastUsed: '2 hours ago',
    usage: 198,
    action: 'Convert'
  },
  {
    id: 'uuid-generator',
    name: 'UUID Generator',
    description: 'Generate various types of UUIDs',
    category: 'System Tools',
    icon: '🆔',
    color: 'bg-green-600',
    isAvailable: true,
    isPremium: false,
    lastUsed: '1 hour ago',
    usage: 245,
    action: 'Generate'
  },
  {
    id: 'color-picker',
    name: 'Color Picker',
    description: 'Pick and convert colors between formats',
    category: 'System Tools',
    icon: '🎨',
    color: 'bg-pink-500',
    isAvailable: true,
    isPremium: false,
    lastUsed: '3 hours ago',
    usage: 167,
    action: 'Pick'
  },

  // Security Tools
  {
    id: 'password-generator',
    name: 'Password Generator',
    description: 'Generate secure passwords',
    category: 'Security Tools',
    icon: '🔐',
    color: 'bg-red-600',
    isAvailable: true,
    isPremium: false,
    lastUsed: '1 day ago',
    usage: 289,
    action: 'Generate'
  },
  {
    id: 'ssl-checker',
    name: 'SSL Checker',
    description: 'Check SSL certificate validity',
    category: 'Security Tools',
    icon: '🛡️',
    color: 'bg-green-600',
    isAvailable: true,
    isPremium: true,
    lastUsed: '4 days ago',
    usage: 56,
    action: 'Check'
  },
  {
    id: 'jwt-decoder',
    name: 'JWT Decoder',
    description: 'Decode and validate JWT tokens',
    category: 'Security Tools',
    icon: '🔓',
    color: 'bg-blue-600',
    isAvailable: true,
    isPremium: false,
    lastUsed: '2 hours ago',
    usage: 176,
    action: 'Decode'
  }
];

const categories = ['All', 'Data Processing', 'Text Processing', 'File Operations', 'Testing & Debugging', 'System Tools', 'Security Tools'];
const sortByOptions = ['Recently Used', 'Most Used', 'Name', 'Category'];

export function Utility() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Recently Used');
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  const filteredUtilities = utilities.filter(utility => {
    const matchesSearch = utility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         utility.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || utility.category === selectedCategory;
    const matchesAvailable = !showAvailableOnly || utility.isAvailable;
    return matchesSearch && matchesCategory && matchesAvailable;
  }).sort((a, b) => {
    if (sortBy === 'Recently Used') {
      const timeA = a.lastUsed || '';
      const timeB = b.lastUsed || '';
      return timeB.localeCompare(timeA);
    }
    if (sortBy === 'Most Used') return b.usage - a.usage;
    if (sortBy === 'Name') return a.name.localeCompare(b.name);
    if (sortBy === 'Category') return a.category.localeCompare(b.category);
    return 0;
  });

  const formatUsage = (usage: number) => {
    if (usage >= 1000) return `${(usage / 1000).toFixed(1)}k`;
    return usage.toString();
  };

  const getStatusIcon = (utility: Utility) => {
    if (!utility.isAvailable) {
      return <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />;
    }
    if (utility.isPremium) {
      return <StarIcon className="w-5 h-5 text-yellow-500" />;
    }
    return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Utility Tools</h1>
              <p className="mt-2 text-gray-600">Helpful tools for data processing, testing, and development</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-sm text-gray-500">
                {utilities.filter(u => u.isAvailable).length} of {utilities.length} tools available
              </div>
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <CogIcon className="w-5 h-5 mr-2" />
                Settings
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
                placeholder="Search utility tools..."
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
                  className="block w-40 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  {sortByOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={showAvailableOnly}
                  onChange={(e) => setShowAvailableOnly(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Available only</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Utilities Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredUtilities.map((utility) => (
            <div key={utility.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 ${utility.color} rounded-lg flex items-center justify-center mr-3`}>
                      <span className="text-lg">{utility.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{utility.name}</h3>
                      <div className="flex items-center mt-1">
                        <div className={`w-2 h-2 rounded-full ${utility.isAvailable ? 'bg-green-500' : 'bg-red-500'} mr-2`}></div>
                        <span className="text-xs text-gray-500">{utility.category}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {utility.isPremium && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        Premium
                      </span>
                    )}
                    {getStatusIcon(utility)}
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4">{utility.description}</p>

                {/* Stats */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <ClockIcon className="w-4 h-4 mr-1" />
                    <span>{utility.lastUsed || 'Never used'}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <PlayIcon className="w-4 h-4 mr-1" />
                    <span>{formatUsage(utility.usage)} uses</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2">
                  <button
                    className={`flex-1 flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      utility.isAvailable
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                    disabled={!utility.isAvailable}
                  >
                    {utility.action || 'Use'}
                    <ArrowRightIcon className="w-4 h-4 ml-1" />
                  </button>

                  <div className="flex items-center space-x-1">
                    <button
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                      title="View Details"
                    >
                      <EyeIcon className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                      title="Configure"
                    >
                      <PencilIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredUtilities.length === 0 && (
          <div className="text-center py-12">
            <MagnifyingGlassIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No utilities found</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
