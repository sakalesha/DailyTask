import React, { useEffect, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../../db/database';
import { useUIStore } from '../../../store/ui-store';
import { taskService } from '../../../services/task-service';
import { Check, X } from 'lucide-react';

export const FocusPage: React.FC = () => {
  const { focusedTaskId, setFocusedTaskId, focusStartTime, setFocusStartTime } = useUIStore();
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const task = useLiveQuery(() => 
    focusedTaskId ? db.tasks.get(focusedTaskId) : undefined
  , [focusedTaskId]);

  useEffect(() => {
    if (!focusStartTime) return;

    // Immediately calculate initial time on mount
    const ms = Date.now() - focusStartTime;
    setElapsedSeconds(Math.floor(ms / 1000));

    const intervalId = setInterval(() => {
      const currentMs = Date.now() - focusStartTime;
      setElapsedSeconds(Math.floor(currentMs / 1000));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [focusStartTime]);

  if (!task) return null;

  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const handleComplete = async () => {
    await taskService.toggleTaskCompletion(task);
    setFocusedTaskId(null);
    setFocusStartTime(null);
  };

  const handleExit = () => {
    setFocusedTaskId(null);
    setFocusStartTime(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900 text-white flex flex-col items-center justify-center p-8 animate-in fade-in duration-500">
      <div className="max-w-2xl w-full flex flex-col items-center text-center space-y-12">
        <h2 className="text-xl font-medium text-slate-400 uppercase tracking-widest">Focusing On</h2>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight px-4">
          {task.title}
        </h1>

        <div className="text-7xl sm:text-9xl font-light text-blue-400 tabular-nums tracking-tighter drop-shadow-[0_0_20px_rgba(96,165,250,0.4)]">
          {formatTime(elapsedSeconds)}
        </div>

        <div className="flex items-center gap-6 pt-12">
          <button 
            onClick={handleExit}
            className="w-16 h-16 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 transition-transform active:scale-95"
            aria-label="Exit Focus Mode"
          >
            <X size={28} />
          </button>
          
          <button 
            onClick={handleComplete}
            className="px-8 h-16 rounded-full bg-emerald-500 hover:bg-emerald-600 flex items-center justify-center gap-3 text-white font-bold text-xl shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-transform hover:scale-105 active:scale-95"
          >
            <Check size={28} strokeWidth={3} />
            Complete Task
          </button>
        </div>
      </div>
    </div>
  );
};
