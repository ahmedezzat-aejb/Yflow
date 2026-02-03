import React, { useEffect, useState } from 'react';
import { YflowApi, handleApiError } from '../services/api';
import { Play, Trash2, Edit3, Plus, Activity, AlertCircle, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Flow {
  id: string;
  name: string;
  description?: string;
  status: 'active' | 'inactive' | 'running' | 'error';
  projectId: string;
  lastRun?: string;
  createdAt: string;
  updatedAt: string;
}

export default function FlowsPage() {
  const [flows, setFlows] = useState<Flow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadFlows();
  }, []);

  const loadFlows = async () => {
    try {
      setLoading(true);
      const response = await YflowApi.getFlows();
      setFlows(response.data);
      setError(null);
    } catch (err: any) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this flow?')) {
      try {
        await YflowApi.deleteFlow(id);
        setFlows(flows.filter(f => f.id !== id));
      } catch (err: any) {
        alert(handleApiError(err));
      }
    }
  };

  const handleRunFlow = async (id: string) => {
    try {
      const response = await YflowApi.executeFlow(id);
      alert('🚀 تم تشغيل الفلو بنجاح!');
      console.log('Flow execution response:', response.data);
      // Update flow status to running
      setFlows(flows.map(f =>
        f.id === id ? { ...f, status: 'running' } : f
      ));
      // Reload flows after a delay to get updated status
      setTimeout(loadFlows, 2000);
    } catch (error) {
      alert('❌ فشل التشغيل، اتأكد إن الـ Engine والـ Redis شغالين');
      console.error('Flow execution error:', error);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
        return <Activity className="animate-pulse" size={16} />;
      case 'active':
        return <CheckCircle size={16} />;
      case 'error':
        return <AlertCircle size={16} />;
      default:
        return <Activity size={16} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'text-blue-400 bg-blue-400/10';
      case 'active':
        return 'text-green-400 bg-green-400/10';
      case 'error':
        return 'text-red-400 bg-red-400/10';
      default:
        return 'text-gray-400 bg-gray-400/10';
    }
  };

  if (loading) {
    return (
      <div className="p-8 bg-[#0d1117] min-h-screen text-white flex items-center justify-center">
        <div className="text-center">
          <Activity className="animate-spin mx-auto mb-4 text-[#2df2ff]" size={32} />
          <p className="text-gray-400">Loading workflows...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-[#0d1117] min-h-screen text-white">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black italic text-[#2df2ff] mb-2">WORKFLOW ENGINE</h1>
          <p className="text-gray-400 text-sm">Manage and execute your automation flows</p>
        </div>
        <button
          onClick={() => navigate('/flows/new')}
          className="bg-[#7cfc00] text-black px-6 py-3 rounded font-bold flex items-center gap-2 hover:bg-[#6de800] transition-colors"
        >
          <Plus size={18} /> CREATE NEW FLOW
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 flex items-center gap-3">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      {flows.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-[#2df2ff1a] rounded-full flex items-center justify-center mx-auto mb-6">
            <Activity className="text-[#2df2ff]" size={32} />
          </div>
          <h3 className="text-xl font-bold text-gray-300 mb-2">No flows found</h3>
          <p className="text-gray-500 mb-6">Create your first automation flow to get started</p>
          <button
            onClick={() => navigate('/flows/new')}
            className="bg-[#2df2ff] text-black px-6 py-3 rounded font-bold hover:bg-[#2df2ffcc] transition-colors"
          >
            Create Your First Flow
          </button>
        </div>
      ) : (
        <div className="grid gap-4">
          {flows.map((flow) => (
            <div key={flow.id} className="bg-[#161b22] border border-gray-800 p-6 rounded-xl flex justify-between items-center group hover:border-[#2df2ff33] transition-all">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg shadow-[0_0_20px_#2df2ff33] ${getStatusColor(flow.status)}`}>
                  {getStatusIcon(flow.status)}
                </div>
                <div>
                  <h3 className="font-bold text-gray-200 text-lg">{flow.name}</h3>
                  {flow.description && (
                    <p className="text-sm text-gray-500 mt-1">{flow.description}</p>
                  )}
                  <div className="flex items-center gap-4 mt-2">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(flow.status)}`}>
                      {flow.status.toUpperCase()}
                    </span>
                    <span className="text-[10px] text-gray-600">
                      Last run: {flow.lastRun || 'Never'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleRunFlow(flow.id)}
                  className="p-3 hover:bg-gray-800 text-blue-400 rounded-lg transition-colors"
                  title="Run Flow"
                >
                  <Play size={18} />
                </button>
                <button
                  className="p-3 hover:bg-gray-800 text-yellow-400 rounded-lg transition-colors"
                  title="Edit Flow"
                >
                  <Edit3 size={18} />
                </button>
                <button
                  onClick={() => handleDelete(flow.id)}
                  className="p-3 hover:bg-gray-800 text-red-500 rounded-lg transition-colors"
                  title="Delete Flow"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
