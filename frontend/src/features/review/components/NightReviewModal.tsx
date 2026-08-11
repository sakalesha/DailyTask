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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg/90 backdrop-blur-none p-4 transition-none">
      <div className="bg-surface border-2 border-border max-w-lg w-full p-8 max-h-[90vh] overflow-y-auto transition-none shadow-none rounded-none">
        
        <div className="flex items-center gap-3 mb-2">
          <Moon className="text-text-primary" size={28} />
          <h2 className="text-3xl font-display uppercase tracking-tight text-text-primary">
            Night Review
          </h2>
        </div>
        
        <p className="text-text-muted mb-8 font-body">
          Reflect on what you accomplished today and clear your mind for tomorrow.
        </p>

        <div className="space-y-6">
          {/* Stats */}
          <div className="flex gap-4">
            <div className="flex-1 bg-bg rounded-none p-4 border-2 border-success text-success">
              <div className="flex items-center gap-2 font-display uppercase mb-1">
                <CheckCircle2 size={18} /> Completed
              </div>
              <div className="text-3xl font-data font-bold text-success">
                {completedTasks.length}
              </div>
            </div>
            
            <div className="flex-1 bg-bg rounded-none p-4 border-2 border-accent text-accent">
              <div className="flex items-center gap-2 font-display uppercase mb-1">
                <CircleDashed size={18} /> Left Over
              </div>
              <div className="text-3xl font-data font-bold text-accent">
                {pendingTasks.length}
              </div>
            </div>
          </div>

          {/* Reflection */}
          <div>
            <h3 className="text-sm font-display text-text-muted uppercase tracking-widest mb-3">Daily Reflection</h3>
            <textarea 
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="What went well? What could be improved? Brain dump any lingering thoughts here..."
              className="w-full h-32 bg-bg rounded-none p-4 border-2 border-border focus:outline-none focus:border-accent transition-none resize-none text-text-primary font-body placeholder:text-text-muted"
            />
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <button
            onClick={() => setIsNightReviewOpen(false)}
            className="flex-1 py-4 px-6 bg-surface hover:bg-bg border-2 border-border text-text-primary rounded-none font-display uppercase font-bold text-lg transition-none"
          >
            Cancel
          </button>
          
          <button
            onClick={handleSave}
            disabled={isSubmitting}
            className="flex-1 py-4 px-6 bg-accent hover:bg-bg hover:text-text-primary hover:border-accent border-2 border-accent text-bg rounded-none font-display uppercase font-bold text-lg shadow-none transition-none disabled:opacity-50"
          >
            {isSubmitting ? "Closing..." : "Close Day"}
          </button>
        </div>
      </div>
    </div>
  );
};
