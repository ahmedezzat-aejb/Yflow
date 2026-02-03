import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SimpleFlowBuilder from '../components/FlowBuilder/simple-flow-builder';
import { YflowApi } from '../services/api';

interface Flow {
  id: string;
  name: string;
  projectId: string;
  nodes?: any[];
  edges?: any[];
}

export const FlowBuilderPage: React.FC = () => {
  const { flowId, projectId } = useParams<{ flowId?: string; projectId?: string }>();
  const navigate = useNavigate();
  const [flow, setFlow] = useState<Flow | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (flowId) {
      loadFlow();
    } else {
      setLoading(false);
    }
  }, [flowId]);

  const loadFlow = async () => {
    try {
      const response = await YflowApi.getFlowById(flowId!);
      setFlow(response.data);
    } catch (error) {
      console.error('Error loading flow:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (flowData: any) => {
    try {
      if (flowId) {
        await YflowApi.updateFlow(flowId, flowData);
      } else {
        const response = await YflowApi.createFlow(flowData);
        navigate(`/flows/${response.data.id}/builder`);
      }
      console.log('Flow saved successfully');
    } catch (error) {
      console.error('Error saving flow:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="h-screen">
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              {flow?.name || 'New Flow'}
            </h1>
            <p className="text-gray-600">
              {flowId ? 'Edit your automation flow' : 'Create a new automation flow'}
            </p>
          </div>
          <button
            onClick={() => navigate(`/projects/${projectId}`)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Back to Project
          </button>
        </div>
      </div>

      <SimpleFlowBuilder
        flowId={flowId}
        projectId={projectId}
        onSave={handleSave}
      />
    </div>
  );
};
