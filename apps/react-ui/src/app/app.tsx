import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/dashboard';
import { Projects } from './pages/projects';
import { Flows } from './pages/flows';
import { Explore } from './pages/explore';
import { Apps } from './pages/apps';
import { Utility } from './pages/utility';
import { Templates } from './pages/Templates';
import { Logs } from './pages/Logs';
import { useState } from 'react';

export function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex h-screen pt-16">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 overflow-y-auto lg:ml-64">
          <div className="p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/flows" element={<Flows />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/apps" element={<Apps />} />
              <Route path="/utility" element={<Utility />} />
              <Route path="/templates" element={<Templates />} />
              <Route path="/logs" element={<Logs />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}
