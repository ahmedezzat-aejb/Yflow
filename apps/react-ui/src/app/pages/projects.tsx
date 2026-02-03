import { useState, useEffect } from 'react';
import {
  PlusIcon,
  CubeIcon,
  ArrowRightIcon,
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
  DocumentDuplicateIcon
} from '@heroicons/react/24/outline';

interface Flow {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'draft';
  createdAt: string;
}

interface Project {
  id: number;
  name: string;
  displayName: string;
  plan: 'free' | 'golden';
  flows: Flow[];
  createdAt: string;
  updatedAt: string;
}

const API_BASE_URL = 'http://localhost:3000/api/v1';

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlan, setFilterPlan] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const [newProject, setNewProject] = useState({
    displayName: '',
    plan: 'free' as 'free' | 'golden'
  });

  // Fetch projects from API
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/projects`);
      if (!response.ok) throw new Error('Failed to fetch projects');
      const data = await response.json();
      setProjects(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async () => {
    if (!newProject.displayName.trim()) return;

    try {
      const projectData = {
        displayName: newProject.displayName,
        plan: {
          type: newProject.plan,
          expiresAt: null,
          subscriptionId: null
        }
      };

      const response = await fetch(`${API_BASE_URL}/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) throw new Error('Failed to create project');

      await fetchProjects(); // Refresh the list
      setNewProject({ displayName: '', plan: 'free' });
      setShowCreateForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create project');
    }
  };

  const handleDeleteProject = async (id: number) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete project');

      await fetchProjects(); // Refresh the list
      setSelectedProject(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete project');
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.displayName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlan = filterPlan === 'all' || project.plan === filterPlan;
    return matchesSearch && matchesPlan;
  });

  const getPlanBadge = (plan: Project['plan']) => {
    return plan === 'golden'
      ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white'
      : 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getFlowsCount = (project: Project) => {
    return project.flows?.length || 0;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
              <p className="mt-2 text-gray-600">Manage your automation projects and workflows</p>
            </div>
            <button
              onClick={() => setShowCreateForm(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              New Project
            </button>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <div className="text-red-800">{error}</div>
            <button
              onClick={() => setError(null)}
              className="mt-2 text-red-600 hover:text-red-800 text-sm"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Loading projects...</p>
          </div>
        </div>
      )}

      {/* Filters */}
      {!loading && !error && (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search projects..."
              />
            </div>

            {/* Plan Filter */}
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">Filter by plan:</span>
              <div className="flex space-x-2">
                <button
                  onClick={() => setFilterPlan('all')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    filterPlan === 'all'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilterPlan('free')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    filterPlan === 'free'
                      ? 'bg-gray-100 text-gray-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Free
                </button>
                <button
                  onClick={() => setFilterPlan('golden')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    filterPlan === 'golden'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Golden
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}

      {/* Projects Grid */}
      {!loading && !error && (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                      <CubeIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{project.displayName}</h3>
                      <div className="flex items-center mt-1">
                        <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                        <span className="text-xs text-gray-500">Last updated: {formatDate(project.updatedAt)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
                      className="p-1 text-gray-400 hover:text-gray-600"
                    >
                      <EllipsisVerticalIcon className="w-5 h-5" />
                    </button>

                    {/* Dropdown Menu */}
                    {selectedProject === project.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                        <div className="py-1">
                          <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full">
                            <PencilIcon className="w-4 h-4 mr-2" />
                            Edit
                          </button>
                          <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full">
                            <DocumentDuplicateIcon className="w-4 h-4 mr-2" />
                            Duplicate
                          </button>
                          <button
                            onClick={() => handleDeleteProject(project.id)}
                            className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full"
                          >
                            <TrashIcon className="w-4 h-4 mr-2" />
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4">Project {project.displayName} with {getFlowsCount(project)} flows</p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-900">{getFlowsCount(project)}</div>
                    <div className="text-xs text-gray-500">Flows</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-900">{project.plan === 'golden' ? '∞' : '5'}</div>
                    <div className="text-xs text-gray-500">Executions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-900">{project.plan === 'golden' ? '100' : '10'}</div>
                    <div className="text-xs text-gray-500">Connections</div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPlanBadge(project.plan)}`}>
                    {project.plan === 'golden' ? '⭐ Golden' : 'Free'}
                  </span>
                  <button className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Open Project
                    <ArrowRightIcon className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <CubeIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No projects found</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating a new project.</p>
            <div className="mt-6">
              <button
                onClick={() => setShowCreateForm(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <PlusIcon className="w-4 h-4 mr-2" />
                New Project
              </button>
            </div>
          </div>
        )}
      </div>
      )}

      {/* Create Project Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" onClick={() => setShowCreateForm(false)}>
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Create New Project</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Project Name</label>
                    <input
                      type="text"
                      value={newProject.displayName}
                      onChange={(e) => setNewProject({ ...newProject, displayName: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="My Awesome Project"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Plan</label>
                    <div className="mt-2 space-y-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="free"
                          checked={newProject.plan === 'free'}
                          onChange={() => setNewProject({ ...newProject, plan: 'free' })}
                          className="mr-2"
                        />
                        <div>
                          <span className="font-medium">Free</span>
                          <p className="text-sm text-gray-500">5 executions per month, 10 connections</p>
                        </div>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="golden"
                          checked={newProject.plan === 'golden'}
                          onChange={() => setNewProject({ ...newProject, plan: 'golden' })}
                          className="mr-2"
                        />
                        <div>
                          <span className="font-medium">⭐ Golden</span>
                          <p className="text-sm text-gray-500">Unlimited executions, 100 connections</p>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleCreateProject}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Create Project
                </button>
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
