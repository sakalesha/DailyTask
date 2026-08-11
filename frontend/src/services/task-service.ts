import { taskRepository } from '../db/repositories/task-repository';
import { db } from '../db/database';
import { syncQueueRepository } from '../db/repositories/sync-queue-repository';
import type { Task } from '../types';

export class TaskService {
  async createTask(title: string): Promise<Task> {
    const now = new Date().toISOString();
    const existingTasks = await taskRepository.getTasks();
    const newOrderIndex = existingTasks.length; // place at bottom
    
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: title.trim(),
      isCompleted: false,
      isTopPriority: false,
      orderIndex: newOrderIndex,
      createdAt: now,
      updatedAt: now,
    };
    await taskRepository.addTask(newTask);
    return newTask;
  }

  async toggleTaskCompletion(task: Task): Promise<void> {
    const now = new Date().toISOString();
    const isCompleted = !task.isCompleted;
    await taskRepository.updateTask(task.id, {
      isCompleted,
      updatedAt: now,
      // If we uncomplete, we should technically remove completedAt, 
      // but IndexedDB update with undefined might not delete the key, it sets it to undefined.
      completedAt: isCompleted ? now : undefined,
    });
  }

  async updateTaskTitle(id: string, title: string): Promise<void> {
    const now = new Date().toISOString();
    await taskRepository.updateTask(id, {
      title: title.trim(),
      updatedAt: now,
    });
  }

  async toggleTopPriority(task: Task): Promise<void> {
    const now = new Date().toISOString();
    
    // If we are setting it to true, verify we don't exceed the limit
    if (!task.isTopPriority) {
      const allTasks = await taskRepository.getTasks();
      const priorityCount = allTasks.filter(t => t.isTopPriority).length;
      if (priorityCount >= 3) {
        throw new Error('You can only have 3 top priorities.');
      }
    }

    await taskRepository.updateTask(task.id, {
      isTopPriority: !task.isTopPriority,
      updatedAt: now,
    });
  }

  async reorderTasks(taskIdsInOrder: string[]): Promise<void> {
    const now = new Date().toISOString();
    await db.transaction('rw', db.tasks, db.syncQueue, async () => {
      for (let i = 0; i < taskIdsInOrder.length; i++) {
        const id = taskIdsInOrder[i];
        await db.tasks.update(id, { orderIndex: i, updatedAt: now });
        await syncQueueRepository.logMutation('tasks', id, 'UPDATE', { orderIndex: i, updatedAt: now });
      }
    });
  }

  async deleteTask(id: string): Promise<void> {
    await taskRepository.deleteTask(id);
  }

  isTaskRelevantForToday(task: Task, todayDateStr: string): boolean {
    if (!task.isCompleted) return true;
    if (!task.completedAt) return true; // Include it if we don't know when it was completed
    return task.completedAt.startsWith(todayDateStr);
  }
}

export const taskService = new TaskService();
