import { memo } from 'react';
import { CheckCircleIcon, XCircleIcon, ClockIcon } from '@heroicons/react/24/outline';

interface StatusBadgeProps {
  status: 'success' | 'error' | 'warning' | 'info' | 'loading';
  text: string;
  size?: 'sm' | 'md' | 'lg';
}

export const StatusBadge = memo(({ status, text, size = 'md' }: StatusBadgeProps) => {
  const getStatusStyles = () => {
    const baseStyles = "inline-flex items-center font-medium rounded-full";
    
    const sizeStyles = {
      sm: "px-2 py-1 text-xs",
      md: "px-3 py-1 text-sm",
      lg: "px-4 py-2 text-base"
    };
    
    const statusStyles = {
      success: "bg-green-100 text-green-800",
      error: "bg-red-100 text-red-800",
      warning: "bg-yellow-100 text-yellow-800",
      info: "bg-blue-100 text-blue-800",
      loading: "bg-gray-100 text-gray-800"
    };
    
    return `${baseStyles} ${sizeStyles[size]} ${statusStyles[status]}`;
  };

  const getIcon = () => {
    switch (status) {
      case 'success': return <CheckCircleIcon className="w-4 h-4 mr-1" />;
      case 'error': return <XCircleIcon className="w-4 h-4 mr-1" />;
      case 'warning': return <ClockIcon className="w-4 h-4 mr-1" />;
      case 'loading': return <ClockIcon className="w-4 h-4 mr-1 animate-spin" />;
      default: return null;
    }
  };

  return (
    <span className={getStatusStyles()}>
      {getIcon()}
      {text}
    </span>
  );
});

StatusBadge.displayName = 'StatusBadge';
