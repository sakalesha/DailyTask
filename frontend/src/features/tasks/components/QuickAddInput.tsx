import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { taskService } from '../../../services/task-service';

export const QuickAddInput: React.FC = () => {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    await taskService.createTask(title);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex items-center w-full mt-4 mb-6">
      <div className="absolute left-3 text-accent font-bold">
        <Plus size={20} strokeWidth={3} />
      </div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="WHAT NEEDS TO BE EXECUTED?"
        className="w-full pl-10 pr-4 py-3 rounded-none border-2 border-border bg-bg focus:outline-none focus:border-accent transition-none text-text-primary placeholder:text-text-muted font-display font-bold text-sm tracking-wide"
      />
    </form>
  );
};
