import React, { useState } from 'react';
import PriorityBadge from '../common/PriorityBadge';
import { format } from 'date-fns';

const TaskCard = React.memo(({ task, onToggle, onEdit, onDelete }) => {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    await onDelete(task._id);
    setDeleting(false);
  };

  const isCompleted = task.status === 'done';

  return (
    <div
      className={`card p-5 transition-all duration-200 hover:border-ink-600 animate-slide-up group ${isCompleted ? 'opacity-60' : ''
        }`}
    >
      <div className="flex items-start gap-4">
        {/* Checkbox */}
        <button
          onClick={() => onToggle(task._id, task.status)}
          className={`w-5 h-5 mt-0.5 rounded-md border-2 flex-shrink-0 transition-all duration-200 flex items-center justify-center ${isCompleted
            ? 'bg-success border-success'
            : 'border-ink-600 hover:border-accent'
            }`}
        >
          {isCompleted && (
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3
            className={`text-sm font-medium leading-snug ${isCompleted ? 'line-through text-ink-500' : 'text-ink-100'
              }`}
          >
            {task.title}
          </h3>
          {task.description && (
            <p className="text-ink-400 text-xs mt-1 line-clamp-2">{task.description}</p>
          )}
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <PriorityBadge priority={task.priority} />
            {task.dueDate && (
              <span className="text-xs text-ink-500 font-mono">
                Due {format(new Date(task.dueDate), 'MMM dd')}
              </span>
            )}
            <span className="text-xs text-ink-600 font-mono ml-auto">
              {format(new Date(task.createdAt), 'MMM dd, yyyy')}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => onEdit(task)}
            className="p-1.5 rounded-lg text-ink-500 hover:text-ink-200 hover:bg-ink-700 transition-all duration-150"
            title="Edit task"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="p-1.5 rounded-lg text-ink-500 hover:text-danger hover:bg-danger/10 transition-all duration-150"
            title="Delete task"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
});

TaskCard.displayName = 'TaskCard';
export default TaskCard;
