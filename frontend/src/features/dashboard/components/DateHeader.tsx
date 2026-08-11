import React from 'react';

export const DateHeader: React.FC = () => {
  const today = new Date();
  
  const formatter = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });
  
  const formattedDate = formatter.format(today);

  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
        Today
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mt-1 font-medium">
        {formattedDate}
      </p>
    </div>
  );
};
