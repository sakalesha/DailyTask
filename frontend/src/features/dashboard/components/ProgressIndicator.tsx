import React from 'react';

interface ProgressIndicatorProps {
  total: number;
  completed: number;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ total, completed }) => {
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="w-full mt-6 mb-2">
      <div className="flex justify-between items-end mb-2">
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Daily Progress</span>
        <span className="text-sm font-bold text-blue-500">{percentage}%</span>
      </div>
      <div className="h-2.5 w-full bg-gray-100 dark:bg-slate-700/50 rounded-full overflow-hidden">
        <div 
          className="h-full bg-blue-500 rounded-full transition-all duration-700 ease-out shadow-[0_0_10px_rgba(59,130,246,0.5)]"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
