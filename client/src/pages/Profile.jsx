import { useState } from 'react';
import AppLayout from '../components/layout/AppLayout';
import useAuth from '../hooks/useAuth';
import useTasks from '../hooks/useTasks';
import { format } from 'date-fns';

const Profile = () => {
  const { user, logout } = useAuth();
  const { stats } = useTasks();

  const initials = user?.name?.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2) || '??';
  const completionRate = stats.total > 0 ? Math.round((stats.done / stats.total) * 100) : 0;

  return (
    <AppLayout>
      <div className="max-w-2xl">
        <h1 className="text-2xl font-display font-semibold text-ink-50 mb-8">Profile</h1>

        {/* Avatar + Info */}
        <div className="card p-6 mb-5 flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-accent/20 border border-accent/30 flex items-center justify-center text-accent text-2xl font-bold font-display flex-shrink-0">
            {initials}
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-display font-semibold text-ink-50">{user?.name}</h2>
            <p className="text-ink-400 text-sm mt-0.5">{user?.email}</p>
            {user?.createdAt && (
              <p className="text-ink-600 text-xs mt-1 font-mono">
                Member since {format(new Date(user.createdAt), 'MMMM yyyy')}
              </p>
            )}
          </div>
        </div>

        {/* Task stats */}
        <div className="grid grid-cols-3 gap-4 mb-5">
          {[
            { label: 'Total Tasks', value: stats.total, color: 'text-ink-100' },
            { label: 'Done', value: stats.done, color: 'text-success' },
            { label: 'Todo', value: stats.todo, color: 'text-accent' },
          ].map(({ label, value, color }) => (
            <div key={label} className="card p-4 text-center">
              <p className={`text-2xl font-display font-bold ${color}`}>{value}</p>
              <p className="text-ink-500 text-xs mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Completion rate */}
        {stats.total > 0 && (
          <div className="card p-5 mb-5">
            <div className="flex justify-between items-center mb-3">
              <p className="text-sm text-ink-400">Productivity Score</p>
              <span className="text-lg font-display font-bold text-warning">{completionRate}%</span>
            </div>
            <div className="h-2 bg-ink-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-warning to-success rounded-full transition-all duration-700"
                style={{ width: `${completionRate}%` }}
              />
            </div>
            <p className="text-ink-600 text-xs mt-2">
              You've completed {stats.done} out of {stats.total} tasks.{' '}
              {completionRate >= 80 ? '🎉 Outstanding!' : completionRate >= 50 ? '💪 Keep it up!' : '⚡ You can do it!'}
            </p>
          </div>
        )}

        {/* Account */}
        <div className="card p-5">
          <h3 className="text-sm font-medium text-ink-400 uppercase tracking-widest mb-4">Account</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center py-2 border-b border-ink-700">
              <span className="text-sm text-ink-300">Email</span>
              <span className="text-sm text-ink-500 font-mono">{user?.email}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-ink-300">Account ID</span>
              <span className="text-xs text-ink-600 font-mono">{user?._id?.slice(-8)}</span>
            </div>
          </div>
          <button
            onClick={logout}
            className="btn-danger w-full mt-5 flex items-center justify-center gap-2"
          >
            Sign Out
          </button>
        </div>
      </div>
    </AppLayout>
  );
};

export default Profile;
