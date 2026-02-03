import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { YflowApi } from '../services/api';
import { getPiecesByGroup, getPieceById, Piece as PieceType } from '../services/pieces';
import {
  Plus,
  Settings,
  Play,
  Save,
  ArrowLeft,
  Trash2,
  GitBranch,
  Database,
  Cloud
} from 'lucide-react';

interface FlowStep {
  id: string;
  type: 'trigger' | 'action';
  pieceId: string;
  name: string;
  config: any;
  position: { x: number; y: number };
}

interface Flow {
  id: string;
  name: string;
  description?: string;
  status: 'draft' | 'published';
  steps: FlowStep[];
}

export default function FlowBuilder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [flow, setFlow] = useState<Flow | null>(null);
  const [selectedStep, setSelectedStep] = useState<FlowStep | null>(null);
  const [activeTab, setActiveTab] = useState<'explore' | 'apps' | 'utility'>('apps');
  const [pieces, setPieces] = useState<PieceType[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    // Update pieces when tab changes
    setPieces(getPiecesByGroup(activeTab));
  }, [activeTab]);

  useEffect(() => {
    if (id) {
      loadFlow(id);
    } else {
      // Create new flow
      setFlow({
        id: '',
        name: 'Untitled',
        status: 'draft',
        steps: []
      });
    }
    // Use real pieces from service
    setPieces(getPiecesByGroup('apps'));
    setLoading(false);
  }, [id]);

  const loadFlow = async (flowId: string) => {
    try {
      const response = await YflowApi.getFlowById(flowId);
      setFlow(response.data);
    } catch (error) {
      console.error('Failed to load flow:', error);
    }
  };

  const saveFlow = async () => {
    if (!flow) return;

    try {
      if (flow.id) {
        await YflowApi.updateFlow(flow.id, flow);
      } else {
        const response = await YflowApi.createFlow(flow);
        setFlow(response.data);
        navigate(`/flows/${response.data.id}`);
      }
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error('Failed to save flow:', error);
    }
  };

  const addStep = (piece: PieceType) => {
    if (!flow) return;

    const newStep: FlowStep = {
      id: `step-${Date.now()}`,
      type: piece.category,
      pieceId: piece.id,
      name: piece.displayName,
      config: {},
      position: {
        x: flow.steps.length * 200,
        y: piece.category === 'trigger' ? 100 : 300
      }
    };

    setFlow({
      ...flow,
      steps: [...flow.steps, newStep]
    });
    setHasUnsavedChanges(true);
  };

  const deleteStep = (stepId: string) => {
    if (!flow) return;

    setFlow({
      ...flow,
      steps: flow.steps.filter(step => step.id !== stepId)
    });
    setHasUnsavedChanges(true);
    if (selectedStep?.id === stepId) {
      setSelectedStep(null);
    }
  };

  const filteredPieces = pieces.filter(piece => piece.categoryGroup === activeTab);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#0d1117] text-white">
        <div className="text-center">
          <GitBranch className="animate-spin mx-auto mb-4 text-[#2df2ff]" size={32} />
          <p>Loading Flow Builder...</p>
        </div>
      </div>
    );
  }

  if (!flow) {
    return <div>Flow not found</div>;
  }

  return (
    <div className="h-screen bg-[#0d1117] text-white flex flex-col">
      {/* Header */}
      <div className="h-16 bg-[#161b22] border-b border-gray-800 flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/flows')}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <input
              type="text"
              value={flow.name}
              onChange={(e) => {
                setFlow({ ...flow, name: e.target.value });
                setHasUnsavedChanges(true);
              }}
              className="bg-transparent text-xl font-bold border-none outline-none"
              placeholder="Flow Name"
            />
            {hasUnsavedChanges && (
              <p className="text-xs text-yellow-400">You have unpublished changes</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-2">
            <Settings size={16} />
            Settings
          </button>
          <button
            onClick={saveFlow}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-2"
          >
            <Save size={16} />
            Save
          </button>
          <button className="px-4 py-2 bg-[#7cfc00] text-black hover:bg-[#6de800] rounded-lg transition-colors flex items-center gap-2 font-bold">
            <Play size={16} />
            Test
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - Pieces */}
        <div className="w-80 bg-[#161b22] border-r border-gray-800 flex flex-col">
          {/* Search */}
          <div className="p-4 border-b border-gray-800">
            <input
              type="text"
              placeholder="Search pieces..."
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:outline-none focus:border-[#2df2ff]"
            />
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-800">
            {(['explore', 'apps', 'utility'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-4 py-3 text-sm font-medium capitalize transition-colors ${
                  activeTab === tab
                    ? 'bg-[#2df2ff] text-black'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Pieces List */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              {filteredPieces.map((piece) => (
                <div
                  key={piece.id}
                  onClick={() => addStep(piece)}
                  className="p-3 bg-gray-800 hover:bg-gray-700 rounded-lg cursor-pointer transition-all hover:shadow-lg hover:shadow-[#2df2ff33] border border-gray-700 hover:border-[#2df2ff33]"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-[#2df2ff1a] rounded-lg text-[#2df2ff]">
                      {piece.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{piece.displayName}</h4>
                      <p className="text-xs text-gray-400 mt-1">{piece.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Canvas */}
        <div className="flex-1 flex">
          {/* Flow Canvas */}
          <div className="flex-1 bg-[#0d1117] relative overflow-auto">
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, #1a1f2e 1px, transparent 1px)', backgroundSize: '20px 20px' }}>

              {/* Flow Steps */}
              {flow.steps.map((step, index) => (
                <div
                  key={step.id}
                  onClick={() => setSelectedStep(step)}
                  className={`absolute bg-[#161b22] border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedStep?.id === step.id
                      ? 'border-[#2df2ff] shadow-lg shadow-[#2df2ff33]'
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                  style={{
                    left: `${step.position.x}px`,
                    top: `${step.position.y}px`,
                    minWidth: '200px'
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-sm">{step.name}</h4>
                      <p className="text-xs text-gray-400 mt-1 capitalize">{step.type}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteStep(step.id);
                      }}
                      className="p-1 hover:bg-red-500/20 rounded text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}

              {/* Connection Lines */}
              <svg className="absolute inset-0 pointer-events-none" style={{ width: '100%', height: '100%' }}>
                {flow.steps.slice(0, -1).map((step, index) => {
                  const nextStep = flow.steps[index + 1];
                  if (!nextStep) return null;

                  return (
                    <line
                      key={`line-${step.id}-${nextStep.id}`}
                      x1={step.position.x + 100}
                      y1={step.position.y + 40}
                      x2={nextStep.position.x + 100}
                      y2={nextStep.position.y + 40}
                      stroke="#2df2ff"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      opacity="0.5"
                    />
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Configuration Panel */}
          {selectedStep && (() => {
            const piece = getPieceById(selectedStep.pieceId);
            if (!piece) return null;

            return (
              <div className="w-96 bg-[#161b22] border-l border-gray-800 overflow-y-auto">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold">{selectedStep.name}</h3>
                    <button
                      onClick={() => setSelectedStep(null)}
                      className="p-1 hover:bg-gray-800 rounded"
                    >
                      ×
                    </button>
                  </div>

                  {/* Connection Status */}
                  {piece.requiresAuth && (
                    <div className="mb-6">
                      <label className="block text-sm font-medium mb-2">Connection</label>
                      <button className="w-full px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors border border-gray-700">
                        Connect your account first
                      </button>
                    </div>
                  )}

                  {/* Dynamic Configuration Form */}
                  {piece.config?.inputs?.map((input) => (
                    <div key={input.name} className="mb-4">
                      <label className="block text-sm font-medium mb-2">
                        {input.label}
                        {input.required && <span className="text-red-400 ml-1">*</span>}
                      </label>

                      {input.type === 'text' && (
                        <input
                          type="text"
                          placeholder={input.placeholder}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:outline-none focus:border-[#2df2ff]"
                        />
                      )}

                      {input.type === 'select' && (
                        <select className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:outline-none focus:border-[#2df2ff]">
                          <option>{input.placeholder || 'Select an option'}</option>
                          {input.options?.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      )}

                      {input.type === 'toggle' && (
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="mr-3 w-4 h-4 text-[#2df2ff] bg-gray-800 border-gray-600 rounded focus:ring-[#2df2ff]"
                          />
                          <span className="text-sm text-gray-300">{input.description}</span>
                        </label>
                      )}

                      {input.type === 'textarea' && (
                        <textarea
                          placeholder={input.placeholder}
                          rows={3}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:outline-none focus:border-[#2df2ff]"
                        />
                      )}

                      {input.description && input.type !== 'toggle' && (
                        <p className="text-xs text-gray-400 mt-1">{input.description}</p>
                      )}
                    </div>
                  ))}

                  {/* Sample Data Section */}
                  {piece.config?.sampleData && (
                    <div className="pt-4 border-t border-gray-700">
                      <h4 className="font-medium mb-3">أنشئ عينة بيانات</h4>
                      <button className="w-full px-4 py-2 bg-[#2df2ff] text-black hover:bg-[#2df2ffcc] rounded-lg font-medium transition-colors">
                        تحميل عينة البيانات
                      </button>

                      {/* Sample Data Preview */}
                      <div className="mt-4 p-3 bg-gray-900 rounded-lg">
                        <pre className="text-xs text-gray-400 overflow-x-auto">
                          {JSON.stringify(piece.config.sampleData, null, 2)}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
