import React from 'react';
import { CheckCircle2, CircleDashed } from 'lucide-react';

interface TaskSummaryProps {
  completed: number;
  remaining: number;
}

export const TaskSummary: React.FC<TaskSummaryProps> = ({ completed, remaining }) => {
  return (
    <div className="flex gap-3 mt-4">
      <div className="flex flex-1 items-center justify-center gap-2 px-3 py-2 bg-surface border-2 border-border shadow-none rounded-none">
        <CheckCircle2 size={18} className="text-success" />
        <span className="text-sm font-data font-bold text-text-primary">
          {completed} <span className="font-display uppercase text-text-muted text-xs font-normal tracking-wider">done</span>
        </span>
      </div>
      <div className="flex flex-1 items-center justify-center gap-2 px-3 py-2 bg-surface border-2 border-border shadow-none rounded-none">
        <CircleDashed size={18} className="text-accent" />
        <span className="text-sm font-data font-bold text-text-primary">
          {remaining} <span className="font-display uppercase text-text-muted text-xs font-normal tracking-wider">left</span>
        </span>
      </div>
    </div>
  );
};
