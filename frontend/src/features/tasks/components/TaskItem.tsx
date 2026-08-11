import React, { useState, useRef, useEffect } from 'react';
import { Check, GripVertical, Trash2, Star, Target } from 'lucide-react';
import type { Task } from '../../../types';
import { taskService } from '../../../services/task-service';
import { useUIStore } from '../../../store/ui-store';
import { twMerge } from 'tailwind-merge';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface TaskItemProps {
  task: Task;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
  };

  const { editingTaskId, setEditingTaskId, setToast, setFocusedTaskId, setFocusStartTime } = useUIStore();
  const isEditing = editingTaskId === task.id;
  const [editTitle, setEditTitle] = useState(task.title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleToggle = async () => {
    await taskService.toggleTaskCompletion(task);
  };

  const handleSave = async () => {
    if (editTitle.trim() !== task.title) {
      if (editTitle.trim() === '') {
        await taskService.deleteTask(task.id);
      } else {
        await taskService.updateTaskTitle(task.id, editTitle);
      }
    }
    setEditingTaskId(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') {
      setEditTitle(task.title);
      setEditingTaskId(null);
    }
  };

  const handlePriorityToggle = async () => {
    try {
      await taskService.toggleTopPriority(task);
    } catch (error: any) {
      setToast(error.message || 'Failed to toggle priority');
    }
  };

  const handleFocus = () => {
    setFocusedTaskId(task.id);
    setFocusStartTime(Date.now());
  };

  return (
    <div 
      ref={setNodeRef}
      style={style}
      className={twMerge(
        "group flex items-center gap-1 py-2 px-1 border-b-2 border-border transition-none bg-bg",
        task.isCompleted && "opacity-50",
        isDragging && "shadow-none border-accent opacity-100 ring-2 ring-accent bg-surface"
      )}
    >
      <button 
        className="text-gray-300 hover:text-gray-500 cursor-grab active:cursor-grabbing p-2 min-w-[44px] min-h-[44px] flex items-center justify-center touch-none"
        aria-label="Drag to reorder"
        {...attributes}
        {...listeners}
      >
        <GripVertical size={18} />
      </button>

      <button
        onClick={handleToggle}
        className="relative flex items-center justify-center min-w-[44px] min-h-[44px]"
        aria-label={task.isCompleted ? "Mark incomplete" : "Mark complete"}
      >
        <div className={twMerge(
          "w-6 h-6 rounded-none border-2 flex items-center justify-center transition-none",
          task.isCompleted 
            ? "bg-accent border-accent text-bg" 
            : "border-border hover:border-accent"
        )}>
          {task.isCompleted && <Check size={14} strokeWidth={3} />}
        </div>
      </button>

      <div className="flex-1 min-w-0 px-2 cursor-text" onClick={() => !isEditing && setEditingTaskId(task.id)}>
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent outline-none border-b-2 border-accent py-1 font-body text-text-primary"
          />
        ) : (
          <span className={twMerge(
            "block truncate transition-none py-1 font-body text-text-primary",
            task.isCompleted && "line-through text-text-muted"
          )}>
            {task.title}
          </span>
        )}
      </div>

      <button 
        onClick={handlePriorityToggle}
        className={twMerge(
          "opacity-0 group-focus-within:opacity-100 group-hover:opacity-100 transition-none min-w-[44px] min-h-[44px] flex items-center justify-center",
          task.isTopPriority ? "opacity-100 text-warning" : "text-text-muted hover:text-warning"
        )}
        aria-label={task.isTopPriority ? "Remove priority" : "Mark as priority"}
      >
        <Star size={18} fill={task.isTopPriority ? "currentColor" : "none"} />
      </button>

      <button 
        onClick={handleFocus}
        className="opacity-0 group-focus-within:opacity-100 group-hover:opacity-100 text-text-muted hover:text-accent transition-none min-w-[44px] min-h-[44px] flex items-center justify-center"
        aria-label="Focus on task"
      >
        <Target size={18} />
      </button>

      <button 
        onClick={() => taskService.deleteTask(task.id)}
        className="opacity-0 group-focus-within:opacity-100 group-hover:opacity-100 text-text-muted hover:text-error transition-none min-w-[44px] min-h-[44px] flex items-center justify-center"
        aria-label="Delete task"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};
