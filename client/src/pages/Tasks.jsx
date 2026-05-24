import { useState } from 'react';
import AppLayout from '../components/layout/AppLayout';
import useTasks from '../hooks/useTasks';
import TaskCard from '../components/tasks/TaskCard';
import TaskModal from '../components/tasks/TaskModal';
import TaskFilters from '../components/tasks/TaskFilters';

const Tasks = () => {
  const {
    tasks,
    isLoading,
    error,
    filter,
    setFilter,
    createTask,
    updateTask,
    deleteTask,
    toggleStatus,
  } = useTasks();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const handleEdit = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleSubmit = async (data) => {
    if (editingTask) {
      return updateTask(editingTask._id, data);
    }

    return createTask(data);
  };

  return (
    <AppLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-semibold text-ink-50">
            Tasks
          </h1>

          <p className="text-ink-500 text-sm mt-0.5">
            {tasks.length} task{tasks.length !== 1 ? 's' : ''}
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-primary flex items-center gap-2"
        >
          <span className="text-lg leading-none">+</span>
          New Task
        </button>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <TaskFilters
          filter={filter}
          onFilterChange={setFilter}
        />
      </div>

      {/* Task List */}
      {isLoading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="card p-5 rounded-2xl shimmer-bg h-24"
            />
          ))}
        </div>
      ) : error ? (
        <div className="card p-10 text-center">
          <p className="text-4xl mb-3">⚠️</p>

          <p className="text-danger text-sm mb-4">
            {error}
          </p>

          <button
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Retry
          </button>
        </div>
      ) : tasks.length === 0 ? (
        <div className="card p-16 text-center animate-fade-in">
          <p className="text-5xl mb-4">✨</p>

          <h3 className="text-ink-300 font-display font-semibold mb-2">
            {filter.status || filter.search || filter.priority
              ? 'No tasks match your filters'
              : 'All clear!'}
          </h3>

          <p className="text-ink-500 text-sm mb-6">
            {filter.status || filter.search || filter.priority
              ? 'Try adjusting your filters to see more tasks.'
              : "You don't have any tasks yet. Create your first one!"}
          </p>

          {!filter.status &&
            !filter.search &&
            !filter.priority && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="btn-primary mx-auto"
              >
                Create Task
              </button>
            )}
        </div>
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onToggle={toggleStatus}
              onEdit={handleEdit}
              onDelete={deleteTask}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        task={editingTask}
      />
    </AppLayout>
  );
};

export default Tasks;