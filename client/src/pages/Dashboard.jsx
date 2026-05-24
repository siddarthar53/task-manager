import { useEffect, useState } from 'react';
import AppLayout from '../components/layout/AppLayout';
import useTasks from '../hooks/useTasks';
import useAuth from '../hooks/useAuth';
import PriorityBadge from '../components/common/PriorityBadge';
import { format } from 'date-fns';

const StatCard = ({ label, value, color, icon }) => (
  <div className="card p-5">
    <div className="flex items-center justify-between mb-3">
      <span className="text-ink-500 text-sm">{label}</span>
      <span className="text-xl">{icon}</span>
    </div>
    <p className={`text-3xl font-display font-semibold ${color}`}>{value}</p>
  </div>
);

const Dashboard = () => {
  const { user } = useAuth();
  const { tasks, stats, isLoading } = useTasks();

  const recentTasks = tasks.slice(0, 5);
  const highPriorityCount = tasks.filter((t) => t.priority === 'high' && t.status !== 'done').length;
  const completionRate = stats.total > 0 ? Math.round((stats.done / stats.total) * 100) : 0;

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <AppLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-display font-semibold text-ink-50">
          {greeting()}, {user?.name?.split(' ')[0]} 👋
        </h1>
        <p className="text-ink-500 text-sm mt-1">
          {format(new Date(), "EEEE, MMMM do yyyy")}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
  <StatCard
    label="Total Tasks"
    value={stats.total}
    color="text-ink-50"
    icon="◈"
  />

  <StatCard
    label="Todo"
    value={stats.todo}
    color="text-accent"
    icon="⬡"
  />

  <StatCard
    label="In Progress"
    value={stats.inProgress}
    color="text-warning"
    icon="◎"
  />

  <StatCard
    label="Done"
    value={stats.done}
    color="text-success"
    icon="✓"
  />

  <StatCard
    label="Completion"
    value={`${completionRate}%`}
    color="text-warning"
    icon="◉"
  />
</div>

      {/* Progress bar */}
      {stats.total > 0 && (
        <div className="card p-5 mb-8">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-ink-300">Overall Progress</p>
            <span className="text-xs text-ink-500 font-mono">{stats.done} / {stats.total}</span>
          </div>
          <div className="h-2 bg-ink-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-accent to-accent-light rounded-full transition-all duration-700"
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </div>
      )}

      {/* High priority alert */}
      {highPriorityCount > 0 && (
        <div className="flex items-center gap-3 bg-danger/10 border border-danger/20 rounded-2xl p-4 mb-8">
          <span className="text-danger text-lg">⚠</span>
          <div>
            <p className="text-sm font-medium text-danger">
              {highPriorityCount} high priority task{highPriorityCount > 1 ? 's' : ''} pending
            </p>
            <p className="text-xs text-ink-500 mt-0.5">These need your immediate attention</p>
          </div>
        </div>
      )}

      {/* Recent tasks */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-display font-semibold text-ink-300 uppercase tracking-widest">
            Recent Tasks
          </h2>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="card p-4 shimmer-bg h-16 rounded-2xl" />
            ))}
          </div>
        ) : recentTasks.length === 0 ? (
          <div className="card p-10 text-center">
            <p className="text-4xl mb-3">📋</p>
            <p className="text-ink-400 text-sm">No tasks yet. Go create your first one!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentTasks.map((task) => (
              <div key={task._id} className="card p-4 flex items-center gap-4">
                <div
                  className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                    task.status === 'done' ? 'bg-success' : 'bg-accent'
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${task.status === 'done' ? 'line-through text-ink-500' : 'text-ink-100'}`}>
                    {task.title}
                  </p>
                </div>
                <PriorityBadge priority={task.priority} />
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Dashboard;
