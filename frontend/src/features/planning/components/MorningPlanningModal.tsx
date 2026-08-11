import React, { useState } from 'react';
import { BatteryFull, BatteryMedium, BatteryLow, Clock } from 'lucide-react';
import type { DailyPlan } from '../../../types';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../../db/database';
import { dailyPlanService } from '../../../services/daily-plan-service';
import { twMerge } from 'tailwind-merge';

interface MorningPlanningModalProps {
  onComplete: () => void;
}

export const MorningPlanningModal: React.FC<MorningPlanningModalProps> = ({ onComplete }) => {
  const todayDateString = dailyPlanService.getTodayDateString();
  const existingPlan = useLiveQuery(() => db.dailyPlans.get({ date: todayDateString }));
  
  const [energy, setEnergy] = useState<DailyPlan['energyLevel']>(5);
  const [hours, setHours] = useState<number>(8);
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize from existing plan if it loads
  React.useEffect(() => {
    if (existingPlan) {
      setEnergy(existingPlan.energyLevel);
      setHours(existingPlan.availableHours);
      if (existingPlan.morningNote) setNote(existingPlan.morningNote);
    }
  }, [existingPlan]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await dailyPlanService.saveTodayPlan(hours, energy, note);
    onComplete();
  };

  const energyOptions: { value: DailyPlan['energyLevel'], icon: React.ReactNode, label: string, colorClass: string }[] = [
    { value: 5, icon: <BatteryFull size={24} />, label: 'High', colorClass: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/40 border-emerald-200 dark:border-emerald-800' },
    { value: 3, icon: <BatteryMedium size={24} />, label: 'Medium', colorClass: 'text-amber-500 bg-amber-50 dark:bg-amber-900/40 border-amber-200 dark:border-amber-800' },
    { value: 1, icon: <BatteryLow size={24} />, label: 'Low', colorClass: 'text-rose-500 bg-rose-50 dark:bg-rose-900/40 border-rose-200 dark:border-rose-800' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg/90 backdrop-blur-none p-4 transition-none">
      <div className="bg-surface border-2 border-border max-w-md w-full p-8 transition-none rounded-none shadow-none max-h-[90vh] overflow-y-auto">
        <h2 className="text-3xl font-display uppercase tracking-tight text-text-primary mb-2">
          Good Morning
        </h2>
        <p className="text-text-muted mb-8 font-body">
          Take a moment to plan your day intentionally.
        </p>

        <div className="space-y-8">
          {/* Energy Section */}
          <section>
            <h3 className="text-sm font-display text-text-muted uppercase tracking-widest mb-4">Energy Level</h3>
            <div className="grid grid-cols-3 gap-3">
              {energyOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setEnergy(opt.value)}
                  className={twMerge(
                    "flex flex-col items-center justify-center gap-2 p-4 rounded-none border-2 transition-none",
                    energy === opt.value 
                      ? "border-accent text-accent bg-bg"
                      : "border-border text-text-muted hover:border-accent hover:text-accent bg-surface"
                  )}
                >
                  {opt.icon}
                  <span className="text-sm font-semibold">{opt.label}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Hours Section */}
          <section>
            <h3 className="text-sm font-display text-text-muted uppercase tracking-widest mb-4 flex items-center gap-2">
              <Clock size={16} /> Available Hours
            </h3>
            <div className="flex items-center gap-4 bg-bg p-4 rounded-none border-2 border-border">
              <input
                type="range"
                min="1"
                max="16"
                step="0.5"
                value={hours}
                onChange={(e) => setHours(parseFloat(e.target.value))}
                className="flex-1 accent-accent h-2 bg-border rounded-none appearance-none cursor-pointer"
              />
              <div className="w-16 text-center text-lg font-data font-bold text-text-primary">
                {hours} <span className="text-sm font-body text-text-muted">h</span>
              </div>
            </div>
          </section>

          {/* Note Section */}
          <section>
            <h3 className="text-sm font-display text-text-muted uppercase tracking-widest mb-4">Morning Intention (Optional)</h3>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="What is your main focus today?"
              className="w-full bg-bg text-text-primary p-4 rounded-none border-2 border-border resize-none outline-none focus:border-accent transition-none placeholder:text-text-muted font-body"
              rows={2}
            />
          </section>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full mt-10 py-4 px-6 bg-accent text-bg rounded-none font-display uppercase font-bold text-lg shadow-none transition-none hover:bg-bg hover:text-text-primary hover:border-accent border-2 border-accent disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : "Start My Day"}
        </button>
      </div>
    </div>
  );
};
