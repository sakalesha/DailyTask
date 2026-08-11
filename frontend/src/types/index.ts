export interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
  isTopPriority: boolean;
  orderIndex: number;
  estimatedMinutes?: number;
  scheduledDate?: string;
  timeStart?: string;
  timeEnd?: string;
  deleted?: boolean;
  completedAt?: string;
  createdAt: string; // ISO String
  updatedAt: string; // ISO String
}

export interface DailyPlan {
  id: string;
  date: string; // YYYY-MM-DD
  availableHours: number;
  energyLevel: 1 | 2 | 3 | 4 | 5;
  morningNote?: string;
  reflection?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SyncQueueItem {
  id: string; // uuid
  entity: 'tasks' | 'daily_plans';
  entityId: string;
  operation: 'CREATE' | 'UPDATE' | 'DELETE';
  timestamp: string; // ISO String
  data?: any;
}
