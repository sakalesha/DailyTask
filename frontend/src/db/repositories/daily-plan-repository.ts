import { db } from '../database';
import type { DailyPlan } from '../../types';
import { syncQueueRepository } from './sync-queue-repository';

export class DailyPlanRepository {
  async getPlanByDate(date: string): Promise<DailyPlan | undefined> {
    return await db.dailyPlans.where('date').equals(date).first();
  }

  async addPlan(plan: DailyPlan): Promise<void> {
    await db.transaction('rw', db.dailyPlans, db.syncQueue, async () => {
      await db.dailyPlans.add(plan);
      await syncQueueRepository.logMutation('daily_plans', plan.id, 'CREATE', plan);
    });
  }

  async updatePlan(id: string, updates: Partial<DailyPlan>): Promise<void> {
    await db.transaction('rw', db.dailyPlans, db.syncQueue, async () => {
      await db.dailyPlans.update(id, updates);
      await syncQueueRepository.logMutation('daily_plans', id, 'UPDATE', updates);
    });
  }
}

export const dailyPlanRepository = new DailyPlanRepository();
