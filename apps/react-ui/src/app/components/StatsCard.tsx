import { memo } from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'increase' | 'decrease' | 'neutral';
  icon: React.ReactNode;
  color: string;
}

export const StatsCard = memo(({ title, value, change, changeType = 'neutral', icon, color }: StatsCardProps) => {
  const getChangeColor = () => {
    switch (changeType) {
      case 'increase': return 'text-green-600 bg-green-100';
      case 'decrease': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center">
        <div className={`p-3 rounded-lg ${color}`}>
          {icon}
        </div>
        <div className="ml-4 flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
        {change && (
          <div className={`px-2 py-1 text-xs font-medium rounded-full ${getChangeColor()}`}>
            {change}
          </div>
        )}
      </div>
    </div>
  );
});

StatsCard.displayName = 'StatsCard';
