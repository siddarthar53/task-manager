import { useEffect,useState } from 'react';
import useDebounce from '../../hooks/useDebounce';

const TaskFilters = ({ filter, onFilterChange }) => {
  const [search, setSearch] = useState(filter.search || '');

const debouncedSearch = useDebounce(search, 400);

useEffect(() => {
  if (debouncedSearch !== filter.search) {
    onFilterChange({
      ...filter,
      search: debouncedSearch,
    });
  }
}, [debouncedSearch]);

  const handleSearchChange = (e) => {
  setSearch(e.target.value);
};

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Search */}
      <div className="relative flex-1 min-w-48">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search tasks..."
          className="input-field pl-9"
        />
      </div>

      {/* Status filter */}
      <div className="flex items-center gap-1 bg-ink-800 border border-ink-700 rounded-xl p-1">
        {['', 'todo', 'in-progress', 'done'].map((s) => (
          <button
            key={s}
            onClick={() => onFilterChange({ ...filter, status: s })}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
              filter.status === s
                ? 'bg-accent text-white'
                : 'text-ink-400 hover:text-ink-200'
            }`}
          >
            {s === '' ? 'All' : s === 'in-progress' ? 'In Progress': s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      {/* Priority filter */}
      <select
        value={filter.priority}
        onChange={(e) => onFilterChange({ ...filter, priority: e.target.value })}
        className="input-field w-auto text-xs py-2 pl-3 pr-8"
      >
        <option value="">All Priorities</option>
        <option value="low">↓ Low</option>
        <option value="medium">→ Medium</option>
        <option value="high">↑ High</option>
      </select>
    </div>
  );
};

export default TaskFilters;
