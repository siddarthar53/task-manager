import { useState, useEffect, useCallback } from 'react';
import { tasksAPI } from '../services/api';
import toast from 'react-hot-toast';

/**
 * Custom hook for task management.
 * Exposes: tasks, stats, isLoading, error, filter, setFilter,
 *          createTask, updateTask, deleteTask, toggleStatus, refetch
 */
const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({ total: 0, todo: 0,inProgress: 0,done: 0, });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({ status: '', priority: '', search: '' });
  const [actionLoading, setActionLoading] = useState(false);

  const fetchTasks = useCallback(async (signal) => {
    setIsLoading(true);
    setError(null);
    try {
      const params = {};
      if (filter.status) params.status = filter.status;
      if (filter.priority) params.priority = filter.priority;
      if (filter.search) params.search = filter.search;

      const { data } = await tasksAPI.getAll(params,signal);
      setTasks(data.tasks);
      setStats({
        total: data.tasks.length,
        todo: data.tasks.filter((t) => t.status === 'todo').length,
        inProgress: data.tasks.filter((t) => t.status === 'in-progress').length,
        done: data.tasks.filter((t) => t.status === 'done').length,
      });
    } catch (err) {
        if (err.name === 'CanceledError') return;

        const msg =
          err.response?.data?.message || 'Failed to load tasks.';

        setError(msg);
      } finally {
      setIsLoading(false);
    }
  }, [
  filter.status,
  filter.priority,
  filter.search,
]);

useEffect(() => {
  const controller = new AbortController();

  fetchTasks(controller.signal);

  return () => {
    controller.abort();
  };
}, [fetchTasks]);

 const createTask = useCallback(async (taskData) => {
  setActionLoading(true);

  try {
    const { data } = await tasksAPI.create(taskData);

    setTasks((prev) => [data.task, ...prev]);

    setStats((prev) => ({
      ...prev,
      total: prev.total + 1,
      todo:
        data.task.status === 'todo'
          ? prev.todo + 1
          : prev.todo,
      inProgress:
        data.task.status === 'in-progress'
          ? prev.inProgress + 1
          : prev.inProgress,
      done:
        data.task.status === 'done'
          ? prev.done + 1
          : prev.done,
    }));

    toast.success('Task created!');

    return { success: true };
  } catch (err) {
    const msg =
      err.response?.data?.message ||
      'Failed to create task.';

    toast.error(msg);

    return { success: false };
  } finally {
    setActionLoading(false);
  }
}, []);

  const updateTask = useCallback(async (id, updates) => {
  setActionLoading(true);

    try {
      const { data } = await tasksAPI.update(id, updates);
      setTasks((prev) => prev.map((t) => (t._id === id ? data.task : t)));
      // Recalculate stats
      setStats((prev) => {
        const updated = { ...prev };
        if (updates.status) {
          const old = tasks.find((t) => t._id === id);
          if (old && old.status !== updates.status) {
            if (updates.status === 'done') {
              updated.done += 1;
              updated.todo -= 1;
            } else {
              updated.done -= 1;
              updated.todo += 1;
            }
          }
        }
        return updated;
      });
      toast.success('Task updated!');
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to update task.';
      toast.error(msg);
      return { success: false };
    }finally {
  setActionLoading(false);
}
  }, [tasks]);

  const deleteTask = useCallback(async (id) => {
    setActionLoading(true);
    const task = tasks.find((t) => t._id === id);
    try {
      await tasksAPI.delete(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
      setStats((prev) => ({
        ...prev,
        total: prev.total - 1,
        todo: task?.status === 'todo' ? prev.todo - 1 : prev.todo,
        done: task?.status === 'done' ? prev.done - 1 : prev.done,
      }));
      toast.success('Task deleted.');
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to delete task.';
      toast.error(msg);
      return { success: false };
    }
    finally {
  setActionLoading(false);
}
  }, [tasks]);

  const toggleStatus = useCallback(async (id, currentStatus) => {
    const newStatus = currentStatus === 'done' ? 'todo' : 'done';
    return updateTask(id, { status: newStatus });
  }, [updateTask]);

  return {
    tasks,
    stats,
    isLoading,
    actionLoading,
    error,
    filter,
    setFilter,
    createTask,
    updateTask,
    deleteTask,
    toggleStatus,
    refetch: fetchTasks,
  };
};

export default useTasks;
