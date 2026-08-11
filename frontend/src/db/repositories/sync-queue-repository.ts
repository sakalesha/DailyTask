import { db } from '../database';
import type { SyncQueueItem } from '../../types';

export class SyncQueueRepository {
  async logMutation(entity: 'tasks' | 'daily_plans', entityId: string, operation: 'CREATE' | 'UPDATE' | 'DELETE', data?: any) {
    const item: SyncQueueItem = {
      id: crypto.randomUUID(),
      entity,
      entityId,
      operation,
      timestamp: new Date().toISOString(),
      data
    };
    await db.syncQueue.add(item);
  }

  async getPendingItems() {
    return db.syncQueue.orderBy('timestamp').toArray();
  }

  async removeItems(ids: string[]) {
    await db.syncQueue.bulkDelete(ids);
  }
}

export const syncQueueRepository = new SyncQueueRepository();
