import React, { useCallback, useState, useEffect } from 'react';
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  Background,
  BackgroundVariant,
  Connection,
  NodeTypes,
  Handle,
  Position,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { io, Socket } from 'socket.io-client';

// Node Types
const CustomNode = ({ data, selected }: { data: any; selected: boolean }) => {
  const [status, setStatus] = useState<'idle' | 'running' | 'completed' | 'failed'>('idle');

  useEffect(() => {
    if (data.onStatusChange) {
      data.onStatusChange(data.id, setStatus);
    }
  }, [data.id, data.onStatusChange]);

  const getStatusColor = () => {
    switch (status) {
      case 'running': return 'border-blue-500 bg-blue-50';
      case 'completed': return 'border-green-500 bg-green-50';
      case 'failed': return 'border-red-500 bg-red-50';
      default: return 'border-gray-300 bg-white';
    }
  };

  return (
    <div className={`px-4 py-2 shadow-lg rounded-lg border-2 ${getStatusColor()} ${selected ? 'ring-2 ring-blue-400' : ''}`}>
      <Handle type="target" position={Position.Top} />
      <div className="font-semibold text-sm">{data.label}</div>
      <div className="text-xs text-gray-600">{data.pieceId}</div>
      {status === 'running' && (
        <div className="mt-1">
          <div className="animate-spin rounded-full h-2 w-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

const nodeTypes: NodeTypes = {
  custom: CustomNode,
};

interface FlowBuilderProps {
  flowId?: string;
  projectId?: string;
  onSave?: (flow: any) => void;
}

export const FlowBuilder: React.FC<FlowBuilderProps> = ({ flowId, projectId, onSave }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isExecuting, setIsExecuting] = useState(false);

  // WebSocket connection for real-time updates
  useEffect(() => {
    if (flowId && projectId) {
      const newSocket = io('http://localhost:3000');
      // setSocket(newSocket); // Commented out to remove unused variable warning

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

  const updateNodeStatus = (nodeId: string, status: 'idle' | 'running' | 'completed' | 'failed') => {
    setNodes((nds: any[]) =>
      nds.map((node: any) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: {
              ...node.data,
              status,
            },
          };
        }
        return node;
      })
    );
  };

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds: any[]) => addEdge(params, eds)),
    [setEdges]
  );

  const addNode = (pieceId: string, label: string) => {
    const newNode: Node = {
      id: `${pieceId}-${Date.now()}`,
      type: 'custom',
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: {
        label,
        pieceId,
        onStatusChange: updateNodeStatus,
      },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const executeFlow = async () => {
    if (!flowId || !projectId) return;

    try {
      const flowData = {
        flowId,
        projectId,
        steps: nodes.map((node) => ({
          id: node.id,
          pieceId: node.data.pieceId,
          name: node.data.label,
          config: {},
          position: node.position,
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
      edges,
    };
    onSave?.(flowData);
  };

  // Available pieces sidebar
  const availablePieces = [
    { id: 'http-request', name: 'HTTP Request', category: 'Developer Tools' },
    { id: 'slack-send-message', name: 'Slack Message', category: 'Communication' },
    { id: 'google-sheets-read', name: 'Google Sheets Read', category: 'Productivity' },
    { id: 'notion-create-page', name: 'Notion Create Page', category: 'Productivity' },
  ];

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

      {/* Flow Canvas */}
      <div className="flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
        >
          <Controls />
          <MiniMap />
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>
      </div>
    </div>
  );
};
