import React from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../../db/database';
import { taskService } from '../../../services/task-service';
import { dailyPlanService } from '../../../services/daily-plan-service';
import { TaskItem } from './TaskItem';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';

export const TaskList: React.FC = () => {
  const todayDateString = dailyPlanService.getTodayDateString();
  
  // Query all tasks, ordered by orderIndex
  const allTasks = useLiveQuery(
    () => db.tasks.orderBy('orderIndex').filter(t => !t.isTopPriority).toArray()
  );

  const tasks = allTasks?.filter(t => taskService.isTaskRelevantForToday(t, todayDateString));

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id && tasks) {
      const oldIndex = tasks.findIndex((t) => t.id === active.id);
      const newIndex = tasks.findIndex((t) => t.id === over.id);
      
      const newTasks = arrayMove(tasks, oldIndex, newIndex);
      taskService.reorderTasks(newTasks.map(t => t.id));
    }
  };

  if (tasks === undefined) {
    return <div className="text-gray-400 animate-pulse py-4">Loading tasks...</div>;
  }

  if (tasks.length === 0) {
    return (
      <div className="py-8 text-center text-gray-400 dark:text-gray-500">
        No other tasks. Add one above!
      </div>
    );
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="flex flex-col">
        <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
        </SortableContext>
      </div>
    </DndContext>
  );
};
