import React from 'react';
import CyberDashboard from '../components/CyberDashboard';
import './Dashboard.css';
import '../locales';

const Dashboard: React.FC = () => {
  return (
    <div className="flex-1 h-full overflow-y-auto">
      <CyberDashboard />
    </div>
  );
};

export default Dashboard;
