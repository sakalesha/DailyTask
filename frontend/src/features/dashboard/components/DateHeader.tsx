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
      <h1 className="text-3xl font-display uppercase tracking-tight text-text-primary m-0">
        Today
      </h1>
      <p className="text-text-muted mt-1 font-data uppercase text-xs">
        {formattedDate}
      </p>
    </div>
  );
};
