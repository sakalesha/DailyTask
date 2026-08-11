import React from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../../db/database';
import { taskService } from '../../../services/task-service';
import { dailyPlanService } from '../../../services/daily-plan-service';
import { TaskItem } from './TaskItem';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';

export const PrioritySection: React.FC = () => {
  const todayDateString = dailyPlanService.getTodayDateString();
  const allTasks = useLiveQuery(() => 
    db.tasks.orderBy('orderIndex').filter(t => t.isTopPriority).toArray()
  );

  const priorities = allTasks?.filter(t => taskService.isTaskRelevantForToday(t, todayDateString));

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id && priorities) {
      const oldIndex = priorities.findIndex((t) => t.id === active.id);
      const newIndex = priorities.findIndex((t) => t.id === over.id);
      
      const newTasks = arrayMove(priorities, oldIndex, newIndex);
      taskService.reorderTasks(newTasks.map(t => t.id));
    }
  };

  if (!priorities || priorities.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      <h2 className="text-xs font-bold text-amber-600 dark:text-amber-500 uppercase tracking-widest mb-3 px-1">
        Top Priorities
      </h2>
      <div className="bg-amber-50/50 dark:bg-amber-900/10 rounded-xl p-2 border border-amber-100 dark:border-amber-900/30">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <div className="flex flex-col">
            <SortableContext items={priorities.map(t => t.id)} strategy={verticalListSortingStrategy}>
              {priorities.map(task => (
                <TaskItem key={task.id} task={task} />
              ))}
            </SortableContext>
          </div>
        </DndContext>
      </div>
    </div>
  );
};
