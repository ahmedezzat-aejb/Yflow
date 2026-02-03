import React, { useState, useEffect } from 'react';
import SimpleFlowBuilder from '../components/FlowBuilder/simple-flow-builder';
import { YflowApi } from '../services/api';

interface Flow {
  id: string;
  name: string;
  projectId: string;
  nodes?: any[];
  edges?: any[];
}

const FlowBuilderPage: React.FC = () => {
  const [flow, setFlow] = useState<Flow | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // In a real app, you would fetch the flow data from the API
    // For now, we'll just set a default flow
    const defaultFlow: Flow = {
      id: 'flow-123',
      name: 'My Flow',
      projectId: 'project-456',
      nodes: [],
      edges: [],
    };

    setFlow(defaultFlow);
    setLoading(false);
  }, []);

  const handleSaveFlow = async (flowData: any) => {
    try {
      console.log('Saving flow:', flowData);
      // Here you would call the API to save the flow
      await YflowApi.post('/flows', flowData);
      setFlow(flowData);
    } catch (err) {
      console.error('Failed to save flow:', err);
      setError('Failed to save flow');
    }
  };

  const handleExecuteFlow = async (flowId: string) => {
    try {
      console.log('Executing flow:', flowId);
      // Here you would call the API to execute the flow
      await YflowApi.post(`/flows/${flowId}/execute`, {});
    } catch (err) {
      console.error('Failed to execute flow:', err);
      setError('Failed to execute flow');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!flow) {
    return <div>No flow data available</div>;
  }

  return (
    <div className="flow-builder-page">
      <div className="flow-builder-header">
        <h1>{flow.name}</h1>
        <div className="flow-info">
          <span>Project: {flow.projectId}</span>
          <span>Flow ID: {flow.id}</span>
        </div>
      </div>

      <SimpleFlowBuilder
        flowId={flow.id}
        onSave={handleSaveFlow}
        onExecute={handleExecuteFlow}
      />
    </div>
  );
};

export default FlowBuilderPage;
