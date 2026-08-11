import React from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db/database';
import { QuickAddInput } from '../features/tasks/components/QuickAddInput';
import { TaskList } from '../features/tasks/components/TaskList';
import { PrioritySection } from '../features/tasks/components/PrioritySection';
import { MorningPlanningModal } from '../features/planning/components/MorningPlanningModal';
import { FocusPage } from '../features/focus/components/FocusPage';
import { NightReviewModal } from '../features/review/components/NightReviewModal';
import { DateHeader } from '../features/dashboard/components/DateHeader';
import { ProgressIndicator } from '../features/dashboard/components/ProgressIndicator';
import { TaskSummary } from '../features/dashboard/components/TaskSummary';
import { useUIStore } from '../store/ui-store';
import { dailyPlanService } from '../services/daily-plan-service';
import { taskService } from '../services/task-service';
import { syncService } from '../services/sync-service';
import { Moon, Cloud, CloudOff, RefreshCw } from 'lucide-react';

const App: React.FC = () => {
  const todayDateString = dailyPlanService.getTodayDateString();
  
  // Query all tasks and filter to only show today's relevant tasks
  const allTasks = useLiveQuery(() => db.tasks.toArray()) || [];
  const tasks = allTasks.filter(t => taskService.isTaskRelevantForToday(t, todayDateString));
  
  const total = tasks.length;
  const completed = tasks.filter(t => t.isCompleted).length;
  const remaining = total - completed;

  const { toast, focusedTaskId, isNightReviewOpen, setIsNightReviewOpen, isSyncing, lastSyncedAt } = useUIStore();

  React.useEffect(() => {
    syncService.startAutoSync();
    syncService.sync(); // Initial sync on load
  }, []);

  const dailyPlanArray = useLiveQuery(() => db.dailyPlans.where('date').equals(todayDateString).toArray());
  const isLoadingPlan = dailyPlanArray === undefined;
  const needsPlanning = !isLoadingPlan && dailyPlanArray.length === 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-gray-100 p-4 sm:p-8 flex justify-center font-sans">
      {focusedTaskId && <FocusPage />}
      {needsPlanning && <MorningPlanningModal onComplete={() => {}} />}
      {isNightReviewOpen && <NightReviewModal />}
      <div className="max-w-xl w-full bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700/50 overflow-hidden flex flex-col">
        {/* Dashboard Header Section */}
        <div className="p-6 sm:p-8 pb-0">
          <div className="flex justify-between items-start mb-6">
            <DateHeader />
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-400">
              {isSyncing ? (
                <>
                  <RefreshCw size={14} className="animate-spin text-blue-500" />
                  <span className="text-blue-500">Syncing...</span>
                </>
              ) : lastSyncedAt ? (
                <>
                  <Cloud size={14} className="text-emerald-500" />
                  <span className="text-emerald-500">Synced</span>
                </>
              ) : (
                <>
                  <CloudOff size={14} />
                  <span>Offline</span>
                </>
              )}
            </div>
          </div>
          <ProgressIndicator total={total} completed={completed} />
          <TaskSummary completed={completed} remaining={remaining} />
        </div>

        {/* Action Section */}
        <div className="px-6 sm:px-8 mt-2">
          <QuickAddInput />
        </div>
        
        {/* Task List Section */}
        <div className="flex-1 px-6 sm:px-8 pb-8 pt-2">
          <PrioritySection />
          
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 px-1">Other Tasks</h2>
          <div className="bg-gray-50/50 dark:bg-slate-900/50 rounded-xl p-2 border border-gray-50 dark:border-slate-800">
            <TaskList />
          </div>
          
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setIsNightReviewOpen(true)}
              className="flex items-center gap-2 px-6 py-3 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 font-semibold rounded-full border border-indigo-100 dark:border-indigo-800/50 transition-all hover:bg-indigo-100 dark:hover:bg-indigo-900/40 active:scale-95"
            >
              <Moon size={18} />
              Review Day
            </button>
          </div>
        </div>
      </div>
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-gray-900 text-white rounded-lg shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4">
          <span className="text-sm font-medium">{toast}</span>
        </div>
      )}
    </div>
  );
};

export default App;
