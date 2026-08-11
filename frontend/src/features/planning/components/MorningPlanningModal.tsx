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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-slate-700 max-w-md w-full p-8 animate-in fade-in zoom-in-95 duration-500">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-2">
          Good Morning
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 font-medium">
          Take a moment to plan your day intentionally.
        </p>

        <div className="space-y-8">
          {/* Energy Section */}
          <section>
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Energy Level</h3>
            <div className="grid grid-cols-3 gap-3">
              {energyOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setEnergy(opt.value)}
                  className={twMerge(
                    "flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border-2 transition-all",
                    energy === opt.value 
                      ? opt.colorClass
                      : "border-gray-100 dark:border-slate-700 text-gray-400 hover:border-gray-200 dark:hover:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-800/50"
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
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Clock size={16} /> Available Hours
            </h3>
            <div className="flex items-center gap-4 bg-gray-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-gray-100 dark:border-slate-700/50">
              <input
                type="range"
                min="1"
                max="16"
                step="0.5"
                value={hours}
                onChange={(e) => setHours(parseFloat(e.target.value))}
                className="flex-1 accent-blue-500 h-2 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
              />
              <div className="w-16 text-center text-lg font-bold text-gray-900 dark:text-gray-100">
                {hours} <span className="text-sm font-medium text-gray-400">h</span>
              </div>
            </div>
          </section>

          {/* Note Section */}
          <section>
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Morning Intention (Optional)</h3>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="What is your main focus today?"
              className="w-full bg-gray-50 dark:bg-slate-900/50 text-gray-900 dark:text-gray-100 p-4 rounded-2xl border border-gray-100 dark:border-slate-700/50 resize-none outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600"
              rows={2}
            />
          </section>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full mt-10 py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-blue-500/25 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100"
        >
          {isSubmitting ? "Saving..." : "Start My Day"}
        </button>
      </div>
    </div>
  );
};
