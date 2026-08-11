import React from 'react';
import { CheckCircle2, CircleDashed } from 'lucide-react';

interface TaskSummaryProps {
  completed: number;
  remaining: number;
}

export const TaskSummary: React.FC<TaskSummaryProps> = ({ completed, remaining }) => {
  return (
    <div className="flex gap-3 mt-4">
      <div className="flex flex-1 items-center justify-center gap-2 px-3 py-2.5 bg-gray-50/80 dark:bg-slate-800/80 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm backdrop-blur-sm">
        <CheckCircle2 size={18} className="text-emerald-500" />
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
          {completed} <span className="text-gray-400 dark:text-gray-500 font-medium">done</span>
        </span>
      </div>
      <div className="flex flex-1 items-center justify-center gap-2 px-3 py-2.5 bg-gray-50/80 dark:bg-slate-800/80 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm backdrop-blur-sm">
        <CircleDashed size={18} className="text-blue-500" />
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
          {remaining} <span className="text-gray-400 dark:text-gray-500 font-medium">left</span>
        </span>
      </div>
    </div>
  );
};
