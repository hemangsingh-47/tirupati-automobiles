import React from 'react';
import { PackageOpen } from 'lucide-react';

const EmptyState = ({ 
  icon: Icon = PackageOpen, 
  title = 'No Data Found', 
  message = 'There is currently no data to display here.',
  action = null
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-surface border border-white/5 rounded-xl">
      <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
        <Icon className="w-10 h-10 text-gray" />
      </div>
      <h3 className="text-xl font-heading font-bold text-white mb-2">{title}</h3>
      <p className="text-gray max-w-md mb-6">{message}</p>
      {action && (
        <div>{action}</div>
      )}
    </div>
  );
};

export default EmptyState;
