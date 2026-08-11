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
        <span className="text-sm font-display uppercase tracking-widest text-text-muted">Daily Progress</span>
        <span className="text-sm font-data font-bold text-accent">{percentage}%</span>
      </div>
      <div className="h-4 w-full bg-bg border-2 border-border overflow-hidden">
        <div 
          className="h-full bg-accent transition-none"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
