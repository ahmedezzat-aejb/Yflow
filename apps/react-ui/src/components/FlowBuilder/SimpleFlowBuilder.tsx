import React, { useState } from 'react';
import { io } from 'socket.io-client';

interface SimpleNode {
  id: string;
  name: string;
  pieceId: string;
  x: number;
  y: number;
  status: 'idle' | 'running' | 'completed' | 'failed';
}

interface FlowBuilderProps {
  flowId?: string;
  projectId?: string;
  onSave?: (flow: any) => void;
}

export const SimpleFlowBuilder: React.FC<FlowBuilderProps> = ({ flowId, projectId, onSave }) => {
  const [nodes, setNodes] = useState<SimpleNode[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);

  // WebSocket connection
  React.useEffect(() => {
    if (flowId && projectId) {
      const newSocket = io('http://localhost:3000');
      // setSocket(newSocket); // Removed - not needed

      newSocket.emit('join-flow', { flowId, projectId });

      newSocket.on('flow-started', (data) => {
        setIsExecuting(true);
        console.log('Flow started:', data);
      });

      newSocket.on('flow-completed', (data) => {
        setIsExecuting(false);
        console.log('Flow completed:', data);
      });

      newSocket.on('step-started', (data) => {
        updateNodeStatus(data.stepId, 'running');
      });

      newSocket.on('step-completed', (data) => {
        updateNodeStatus(data.stepId, 'completed');
      });

      newSocket.on('step-failed', (data) => {
        updateNodeStatus(data.stepId, 'failed');
      });

      return () => {
        newSocket.emit('leave-flow', { flowId });
        newSocket.disconnect();
      };
    }
  }, [flowId, projectId]);

  const updateNodeStatus = (nodeId: string, status: SimpleNode['status']) => {
    setNodes(prevNodes =>
      prevNodes.map(node =>
        node.id === nodeId ? { ...node, status } : node
      )
    );
  };

  const addNode = (pieceId: string, name: string) => {
    const newNode: SimpleNode = {
      id: `${pieceId}-${Date.now()}`,
      name,
      pieceId,
      x: Math.random() * 400 + 50,
      y: Math.random() * 300 + 50,
      status: 'idle',
    };
    setNodes(prevNodes => [...prevNodes, newNode]);
  };

  const executeFlow = async () => {
    if (!flowId || !projectId) return;

    try {
      const flowData = {
        flowId,
        projectId,
        steps: nodes.map(node => ({
          id: node.id,
          pieceId: node.pieceId,
          name: node.name,
          config: {},
          position: { x: node.x, y: node.y },
        })),
      };

      await fetch('http://localhost:3000/api/flows/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(flowData),
      });
    } catch (error) {
      console.error('Error executing flow:', error);
    }
  };

  const saveFlow = () => {
    const flowData = {
      id: flowId,
      projectId,
      name: `Flow ${flowId}`,
      nodes,
    };
    onSave?.(flowData);
  };

  const availablePieces = [
    { id: 'http-request', name: 'HTTP Request', category: 'Developer Tools' },
    { id: 'slack-send-message', name: 'Slack Message', category: 'Communication' },
    { id: 'google-sheets-read', name: 'Google Sheets Read', category: 'Productivity' },
    { id: 'notion-create-page', name: 'Notion Create Page', category: 'Productivity' },
  ];

  const getStatusColor = (status: SimpleNode['status']) => {
    switch (status) {
      case 'running': return 'border-blue-500 bg-blue-50';
      case 'completed': return 'border-green-500 bg-green-50';
      case 'failed': return 'border-red-500 bg-red-50';
      default: return 'border-gray-300 bg-white';
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 p-4 overflow-y-auto">
        <h3 className="font-bold text-lg mb-4">Yflow Components</h3>
        {availablePieces.map((piece) => (
          <div
            key={piece.id}
            className="mb-2 p-2 bg-white rounded cursor-pointer hover:bg-gray-50"
            onClick={() => addNode(piece.id, piece.name)}
          >
            <div className="font-medium text-sm">{piece.name}</div>
            <div className="text-xs text-gray-500">{piece.category}</div>
          </div>
        ))}

        <div className="mt-6 space-y-2">
          <button
            onClick={executeFlow}
            disabled={isExecuting}
            className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
          >
            {isExecuting ? 'Executing...' : 'Execute Flow'}
          </button>
          <button
            onClick={saveFlow}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save Flow
          </button>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 relative bg-gray-50">
        <div className="absolute top-4 left-4 bg-white p-2 rounded shadow">
          <span className="text-sm font-medium">Flow Canvas</span>
        </div>

        {/* Simple node rendering */}
        {nodes.map((node) => (
          <div
            key={node.id}
            className={`absolute px-3 py-2 shadow-lg rounded-lg border-2 cursor-move ${getStatusColor(node.status)}`}
            style={{
              left: `${node.x}px`,
              top: `${node.y}px`,
              minWidth: '120px',
            }}
          >
            <div className="font-semibold text-sm">{node.name}</div>
            <div className="text-xs text-gray-600">{node.pieceId}</div>
            {node.status === 'running' && (
              <div className="mt-1">
                <div className="animate-spin rounded-full h-2 w-2 border-b-2 border-blue-500"></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
