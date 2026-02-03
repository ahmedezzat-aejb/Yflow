import { memo } from 'react';

interface ProjectCardProps {
  project: {
    id: number;
    name: string;
    displayName: string;
    plan: string;
    flows: any[];
    createdAt: string;
    updatedAt: string;
  };
  onDelete: (id: number) => void;
}

export const ProjectCard = memo(({ project, onDelete }: ProjectCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{project.displayName}</h3>
          <p className="text-sm text-gray-500">{project.name}</p>
        </div>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          project.plan === 'golden' 
            ? 'bg-yellow-100 text-yellow-800' 
            : 'bg-gray-100 text-gray-800'
        }`}>
          {project.plan}
        </span>
      </div>
      
      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <span>{project.flows.length} flows</span>
        <span>Updated {new Date(project.updatedAt).toLocaleDateString()}</span>
      </div>
      
      <button
        onClick={() => onDelete(project.id)}
        className="w-full bg-red-50 text-red-600 py-2 px-4 rounded-md hover:bg-red-100 transition-colors"
      >
        Delete Project
      </button>
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';
