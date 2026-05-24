import { useState, useEffect } from 'react';
import Spinner from '../common/Spinner';
import {
  validateEmail,
  validatePassword,
} from '../../utils/validators';

const TaskModal = ({ isOpen, onClose, onSubmit, task }) => {
  const isEdit = !!task;
  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
    status: 'todo',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title || '',
        description: task.description || '',
        priority: task.priority || 'medium',
        dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
        status: task.status || 'todo',
      });
    } else {
      setForm({ title: '', description: '', priority: 'medium', dueDate: '', status: 'todo' });
    }
    setErrors({});
  }, [task, isOpen]);

const validate = () => {
  const errs = {};

  if (!form.title.trim()) {
    errs.title = 'Title is required';
  }

  if (form.title.length > 100) {
    errs.title = 'Title cannot exceed 100 characters';
  }

  if (form.description.length > 500) {
    errs.description = 'Description cannot exceed 500 characters';
  }

  return errs;
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) return setErrors(errs);
    setLoading(true);
    const payload = {
      ...form,
      dueDate: form.dueDate || null,
    };
    const result = await onSubmit(payload);
    setLoading(false);
    if (result?.success) onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md mx-4 card p-6 animate-scale-in">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-display font-semibold text-ink-50">
            {isEdit ? 'Edit Task' : 'New Task'}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-ink-500 hover:text-ink-200 hover:bg-ink-700 transition-all"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-xs font-medium text-ink-400 mb-1.5">Title *</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="What needs to be done?"
              className={`input-field ${errors.title ? 'border-danger focus:border-danger' : ''}`}
              autoFocus
            />
            {errors.title && <p className="text-danger text-xs mt-1">{errors.title}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-medium text-ink-400 mb-1.5">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Add details..."
              rows={3}
              className="input-field resize-none"
            />

            {errors.description && (
  <p className="text-danger text-xs mt-1">
    {errors.description}
  </p>
)}
          </div>

          {/* Priority + Status row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-ink-400 mb-1.5">Priority</label>
              <select name="priority" value={form.priority} onChange={handleChange} className="input-field">
                <option value="low">↓ Low</option>
                <option value="medium">→ Medium</option>
                <option value="high">↑ High</option>
              </select>
            </div>
            {isEdit && (
              <div>
                <label className="block text-xs font-medium text-ink-400 mb-1.5">Status</label>
                <select name="status" value={form.status} onChange={handleChange} className="input-field">
                  <option value="todo">Todo</option>
                  <option value="in-progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
              </div>
            )}
            <div className={isEdit ? '' : 'col-span-1'}>
              <label className="block text-xs font-medium text-ink-400 mb-1.5">Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={form.dueDate}
                onChange={handleChange}
                className="input-field"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-ghost flex-1">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="btn-primary flex-1 flex items-center justify-center gap-2">
              {loading ? <Spinner size="sm" /> : null}
              {isEdit ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
