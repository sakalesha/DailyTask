import { db } from '../database';
import type { Task } from '../../types';
import { syncQueueRepository } from './sync-queue-repository';

export class TaskRepository {
  async getTasks(): Promise<Task[]> {
    return await db.tasks.orderBy('createdAt').reverse().toArray();
  }

  async addTask(task: Task): Promise<void> {
    await db.transaction('rw', db.tasks, db.syncQueue, async () => {
      await db.tasks.add(task);
      await syncQueueRepository.logMutation('tasks', task.id, 'CREATE', task);
    });
  }

  async updateTask(id: string, updates: Partial<Task>): Promise<void> {
    await db.transaction('rw', db.tasks, db.syncQueue, async () => {
      await db.tasks.update(id, updates);
      await syncQueueRepository.logMutation('tasks', id, 'UPDATE', updates);
    });
  }

  async deleteTask(id: string): Promise<void> {
    await db.transaction('rw', db.tasks, db.syncQueue, async () => {
      await db.tasks.delete(id);
      await syncQueueRepository.logMutation('tasks', id, 'DELETE');
    });
  }
}

export const taskRepository = new TaskRepository();
