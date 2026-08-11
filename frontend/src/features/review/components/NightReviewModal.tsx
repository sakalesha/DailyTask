import React, { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../../db/database';
import { dailyPlanService } from '../../../services/daily-plan-service';
import { taskService } from '../../../services/task-service';
import { useUIStore } from '../../../store/ui-store';
import { Moon, CheckCircle2, CircleDashed } from 'lucide-react';

export const NightReviewModal: React.FC = () => {
  const { setIsNightReviewOpen, setToast } = useUIStore();
  const [reflection, setReflection] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const todayDateString = dailyPlanService.getTodayDateString();
  const allTasks = useLiveQuery(() => db.tasks.toArray()) || [];
  const tasks = allTasks.filter(t => taskService.isTaskRelevantForToday(t, todayDateString));
  
  const completedTasks = tasks.filter(t => t.isCompleted);
  const pendingTasks = tasks.filter(t => !t.isCompleted);

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      await dailyPlanService.saveReflection(reflection);
      setIsNightReviewOpen(false);
      setToast('Day closed successfully. Great work today.');
    } catch (e) {
      setToast('Failed to save reflection.');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-slate-700 max-w-lg w-full p-8 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-500">
        
        <div className="flex items-center gap-3 mb-2">
          <Moon className="text-indigo-500" size={28} />
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Night Review
          </h2>
        </div>
        
        <p className="text-gray-500 dark:text-gray-400 mb-8 font-medium">
          Reflect on what you accomplished today and clear your mind for tomorrow.
        </p>

        <div className="space-y-6">
          {/* Stats */}
          <div className="flex gap-4">
            <div className="flex-1 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-4 border border-emerald-100 dark:border-emerald-800/30">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-500 font-bold mb-1">
                <CheckCircle2 size={18} /> Completed
              </div>
              <div className="text-3xl font-black text-emerald-700 dark:text-emerald-400">
                {completedTasks.length}
              </div>
            </div>
            
            <div className="flex-1 bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-4 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 font-bold mb-1">
                <CircleDashed size={18} /> Left Over
              </div>
              <div className="text-3xl font-black text-slate-700 dark:text-slate-300">
                {pendingTasks.length}
              </div>
            </div>
          </div>

          {/* Reflection */}
          <div>
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Daily Reflection</h3>
            <textarea 
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="What went well? What could be improved? Brain dump any lingering thoughts here..."
              className="w-full h-32 bg-gray-50 dark:bg-slate-900/50 rounded-2xl p-4 border border-gray-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-none text-gray-800 dark:text-gray-200"
            />
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <button
            onClick={() => setIsNightReviewOpen(false)}
            className="flex-1 py-4 px-6 bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-900 dark:text-gray-100 rounded-xl font-bold text-lg transition-all"
          >
            Cancel
          </button>
          
          <button
            onClick={handleSave}
            disabled={isSubmitting}
            className="flex-1 py-4 px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-indigo-500/25 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100"
          >
            {isSubmitting ? "Closing..." : "Close Day"}
          </button>
        </div>
      </div>
    </div>
  );
};
