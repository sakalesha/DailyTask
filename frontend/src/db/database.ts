import Dexie, { type EntityTable } from 'dexie';
import type { Task, DailyPlan, SyncQueueItem } from '../types';

export class TodayDatabase extends Dexie {
  tasks!: EntityTable<Task, 'id'>;
  dailyPlans!: EntityTable<DailyPlan, 'id'>;
  syncQueue!: EntityTable<SyncQueueItem, 'id'>;

  constructor() {
    super('TodayDB');
    this.version(1).stores({
      tasks: 'id, createdAt, isCompleted, isTopPriority, orderIndex',
      dailyPlans: 'id, date',
      syncQueue: 'id, entity, entityId, timestamp'
    });
  }
}

export const db = new TodayDatabase();
