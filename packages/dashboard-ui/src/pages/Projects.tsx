import React, { useState } from 'react';
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Eye, Folder } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  description: string;
  flows: number;
  status: 'active' | 'inactive';
  lastModified: string;
}

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [projects] = useState<Project[]>([
    {
      id: '1',
      name: 'E-commerce Automation',
      description: 'Automate order processing and inventory management',
      flows: 12,
      status: 'active',
      lastModified: '2024-01-15'
    },
    {
      id: '2',
      name: 'Marketing Campaigns',
      description: 'Email marketing and social media automation',
      flows: 8,
      status: 'active',
      lastModified: '2024-01-14'
    },
    {
      id: '3',
      name: 'Customer Support',
      description: 'Ticket routing and response automation',
      flows: 6,
      status: 'inactive',
      lastModified: '2024-01-10'
    }
  ]);

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600 mt-2">Manage your automation projects</p>
        </div>
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus size={20} />
          <span>New Project</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          <Filter size={18} />
          <span>Filter</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div key={project.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{project.description}</p>
              </div>
              <div className="relative">
                <button className="p-1 hover:bg-gray-100 rounded">
                  <MoreHorizontal size={18} />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                <span className="text-gray-500">
                  {project.flows} flows
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  project.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {project.status}
                </span>
              </div>
              <span className="text-gray-400 text-xs">
                {project.lastModified}
              </span>
            </div>

            <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-gray-100">
              <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm">
                <Eye size={16} />
                <span>View</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-700 text-sm">
                <Edit size={16} />
                <span>Edit</span>
              </button>
              <button className="flex items-center space-x-1 text-red-600 hover:text-red-700 text-sm">
                <Trash2 size={16} />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Folder size={32} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
          <p className="text-gray-600 mb-4">Get started by creating your first automation project</p>
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mx-auto">
            <Plus size={20} />
            <span>Create Project</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Projects;
