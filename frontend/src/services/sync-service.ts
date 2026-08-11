import { supabase } from '../db/supabase';
import { db } from '../db/database';
import { syncQueueRepository } from '../db/repositories/sync-queue-repository';
import { useUIStore } from '../store/ui-store';

export class SyncService {
  private syncing = false;

  async sync() {
    if (!supabase) return; // Supabase not configured
    if (this.syncing) return;
    if (!navigator.onLine) return;

    this.syncing = true;
    useUIStore.getState().setIsSyncing(true);

    try {
      // 1. Push local changes
      const pendingItems = await syncQueueRepository.getPendingItems();
      
      for (const item of pendingItems) {
        try {
          if (item.operation === 'CREATE' || item.operation === 'UPDATE') {
            const { error } = await supabase.from(item.entity).upsert(item.data);
            if (error) throw error;
          } else if (item.operation === 'DELETE') {
            const { error } = await supabase.from(item.entity).delete().eq('id', item.entityId);
            if (error) throw error;
          }
          // If successful, remove from queue
          await syncQueueRepository.removeItems([item.id]);
        } catch (e) {
          console.error(`Sync error for item ${item.id}`, e);
          // Break to maintain chronological order in the queue
          break;
        }
      }

      // 2. Pull remote changes
      const lastSync = useUIStore.getState().lastSyncedAt;
      
      const pullEntities = async (table: 'tasks' | 'daily_plans') => {
        if (!supabase) return;
        let query = supabase.from(table).select('*');
        if (lastSync) {
          query = query.gt('updatedAt', lastSync);
        }
        
        const { data, error } = await query;
        if (error) throw error;
        
        if (data && data.length > 0) {
          if (table === 'daily_plans') {
            await db.dailyPlans.bulkPut(data);
          } else {
            await db.tasks.bulkPut(data);
          }
        }
      };

      await Promise.all([
        pullEntities('tasks'),
        pullEntities('daily_plans')
      ]);

      useUIStore.getState().setLastSyncedAt(new Date().toISOString());
      
    } catch (e) {
      console.error('Sync failed', e);
    } finally {
      this.syncing = false;
      useUIStore.getState().setIsSyncing(false);
    }
  }

  startAutoSync() {
    // Listen for online events
    window.addEventListener('online', () => this.sync());
    
    // Periodically sync every minute if online
    setInterval(() => {
      if (navigator.onLine) {
        this.sync();
      }
    }, 60000);
  }
}

export const syncService = new SyncService();
