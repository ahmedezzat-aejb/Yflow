import React, { useState, useEffect } from 'react';
import './fixed-flow-builder.css';
import { io, Socket } from 'socket.io-client';

// Simple Flow Builder without ReactFlow dependencies
interface FlowNode {
  id: string;
  type: 'trigger' | 'action';
  name: string;
  pieceName: string;
  config: any;
  position: { x: number; y: number };
}

interface FlowEdge {
  id: string;
  source: string;
  target: string;
}

interface FlowBuilderProps {
  flowId?: string;
  onSave?: (flow: any) => void;
  onExecute?: (flowId: string) => void;
}

const FlowBuilder: React.FC<FlowBuilderProps> = ({ flowId, onSave, onExecute }) => {
  const [nodes, setNodes] = useState<FlowNode[]>([]);
  const [edges, setEdges] = useState<FlowEdge[]>([]);
  const [selectedNode, setSelectedNode] = useState<FlowNode | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);

  // Available pieces
  const availablePieces = [
    { name: 'HTTP Request', type: 'action', pieceName: 'http' },
    { name: 'Send Slack Message', type: 'action', pieceName: 'slack' },
    { name: 'Google Sheets', type: 'action', pieceName: 'google-sheets' },
    { name: 'Notion', type: 'action', pieceName: 'notion' },
  ];

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io(process.env.REACT_APP_WEBSOCKET_URL || 'ws://localhost:3000');
    setSocket(newSocket);

    // Listen for flow execution events
    newSocket.on('flow-started', (data) => {
      console.log('Flow started:', data);
      setIsExecuting(true);
    });

    newSocket.on('flow-completed', (data) => {
      console.log('Flow completed:', data);
      setIsExecuting(false);
    });

    newSocket.on('flow-failed', (data) => {
      console.log('Flow failed:', data);
      setIsExecuting(false);
    });

    newSocket.on('step-started', (data) => {
      console.log('Step started:', data);
      updateNodeStatus(data.stepId, 'running');
    });

    newSocket.on('step-completed', (data) => {
      console.log('Step completed:', data);
      updateNodeStatus(data.stepId, 'completed');
    });

    newSocket.on('step-failed', (data) => {
      console.log('Step failed:', data);
      updateNodeStatus(data.stepId, 'failed');
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const updateNodeStatus = (nodeId: string, status: 'idle' | 'running' | 'completed' | 'failed') => {
    setNodes(prevNodes =>
      prevNodes.map(node =>
        node.id === nodeId ? { ...node, status } : node
      )
    );
  };

  const addNode = (piece: any) => {
    const newNode: FlowNode = {
      id: `node-${Date.now()}`,
      type: 'action',
      name: piece.name,
      pieceName: piece.pieceName,
      config: {},
      position: { x: Math.random() * 400, y: Math.random() * 300 },
    };
    setNodes([...nodes, newNode]);
  };

  const deleteNode = (nodeId: string) => {
    setNodes(nodes.filter(node => node.id !== nodeId));
    setEdges(edges.filter(edge => edge.source !== nodeId && edge.target !== nodeId));
  };

  const addEdge = (sourceId: string, targetId: string) => {
    const newEdge: FlowEdge = {
      id: `edge-${sourceId}-${targetId}`,
      source: sourceId,
      target: targetId,
    };
    setEdges([...edges, newEdge]);
  };

  const updateNodeConfig = (nodeId: string, config: any) => {
    setNodes(nodes.map(node =>
      node.id === nodeId ? { ...node, config } : node
    ));
  };

  const executeFlow = () => {
    if (!flowId) {
      alert('Please save the flow first');
      return;
    }

    setIsExecuting(true);
    onExecute?.(flowId);

    // Send flow execution request
    socket?.emit('execute-flow', {
      flowId,
      projectId: 'default-project',
      triggerData: {},
      userId: 'current-user',
    });
  };

  const saveFlow = () => {
    const flowData = {
      id: flowId || `flow-${Date.now()}`,
      name: 'Untitled Flow',
      description: 'Created with Yflow Flow Builder',
      nodes,
      edges,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    onSave?.(flowData);
  };

  const renderNode = (node: FlowNode) => {
    const isSelected = selectedNode?.id === node.id;

    return (
      <div
        key={node.id}
        className={`flow-node ${isSelected ? 'selected' : ''}`}
        style={{
          position: 'absolute',
          left: node.position.x,
          top: node.position.y,
          padding: '12px',
          border: '2px solid #3b82f6',
          borderRadius: '8px',
          backgroundColor: '#ffffff',
          cursor: 'pointer',
          minWidth: '150px',
        }}
        onClick={() => setSelectedNode(node)}
      >
        <div className="node-header">
          <strong>{node.name}</strong>
          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteNode(node.id);
            }}
            style={{
              marginLeft: '8px',
              background: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '2px 6px',
              cursor: 'pointer',
            }}
          >
            ×
          </button>
        </div>
        <div className="node-body">
          <small>{node.pieceName}</small>
        </div>
      </div>
    );
  };

  return (
    <div className="flow-builder">
      <div className="flow-builder-header">
        <h2>Yflow Flow Builder</h2>
        <div className="flow-builder-actions">
          <button onClick={saveFlow} className="btn btn-primary">
            Save Flow
          </button>
          <button
            onClick={executeFlow}
            disabled={isExecuting}
            className={`btn ${isExecuting ? 'btn-secondary' : 'btn-success'}`}
          >
            {isExecuting ? 'Executing...' : 'Execute Flow'}
          </button>
        </div>
      </div>

      <div className="flow-builder-content">
        <div className="pieces-sidebar">
          <h3>Available Pieces</h3>
          <div className="pieces-list">
            {availablePieces.map((piece, index) => (
              <div
                key={index}
                className="piece-item"
                onClick={() => addNode(piece)}
              >
                {piece.name}
              </div>
            ))}
          </div>
        </div>

        <div className="flow-canvas">
          <div className="flow-nodes">
            {nodes.map(renderNode)}
          </div>

          {selectedNode && (
            <div className="node-config-panel">
              <h3>Configure: {selectedNode.name}</h3>
              <div className="config-form">
                <div className="form-group">
                  <label>Configuration</label>
                  <textarea
                    value={JSON.stringify(selectedNode.config || {}, null, 2)}
                    onChange={(e) => {
                      try {
                        const config = JSON.parse(e.target.value);
                        updateNodeConfig(selectedNode.id, config);
                      } catch (error) {
                        // Invalid JSON, ignore
                      }
                    }}
                    placeholder="Enter JSON configuration"
                    rows={10}
                    style={{ width: '100%', fontFamily: 'monospace' }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      </div>
  );
};

export default FlowBuilder;
