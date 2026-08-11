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
      <div className="absolute left-3 text-gray-400">
        <Plus size={20} />
      </div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What needs to be done today?"
        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow text-gray-900 dark:text-gray-100 placeholder-gray-400"
      />
    </form>
  );
};
