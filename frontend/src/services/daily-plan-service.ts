import { dailyPlanRepository } from '../db/repositories/daily-plan-repository';
import type { DailyPlan } from '../types';

export class DailyPlanService {
  getTodayDateString(): string {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  }

  async getTodayPlan(): Promise<DailyPlan | undefined> {
    return dailyPlanRepository.getPlanByDate(this.getTodayDateString());
  }

  async saveTodayPlan(hours: number, energy: DailyPlan['energyLevel'], note?: string): Promise<DailyPlan> {
    const today = this.getTodayDateString();
    const existingPlan = await dailyPlanRepository.getPlanByDate(today);
    
    if (existingPlan) {
      const now = new Date().toISOString();
      await dailyPlanRepository.updatePlan(existingPlan.id, {
        availableHours: hours,
        energyLevel: energy,
        morningNote: note || existingPlan.morningNote,
        updatedAt: now,
      });
      return { ...existingPlan, availableHours: hours, energyLevel: energy, morningNote: note || existingPlan.morningNote, updatedAt: now };
    }

    const now = new Date().toISOString();
    const newPlan: DailyPlan = {
      id: crypto.randomUUID(),
      date: today,
      availableHours: hours,
      energyLevel: energy,
      morningNote: note,
      createdAt: now,
      updatedAt: now,
    };
    await dailyPlanRepository.addPlan(newPlan);
    return newPlan;
  }

  async saveReflection(reflection: string): Promise<void> {
    const existing = await this.getTodayPlan();
    if (existing) {
      const now = new Date().toISOString();
      await dailyPlanRepository.updatePlan(existing.id, {
        reflection,
        updatedAt: now,
      });
    }
  }
}

export const dailyPlanService = new DailyPlanService();
