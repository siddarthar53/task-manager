import { NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const navItems = [
  { to: '/dashboard', icon: '⬡', label: 'Dashboard' },
  { to: '/tasks', icon: '◈', label: 'Tasks' },
  { to: '/profile', icon: '◉', label: 'Profile' },
];

const AppLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const initials = user?.name?.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2) || '??';

  return (
    <div className="flex min-h-screen bg-ink-900">
      {/* Sidebar */}
      <aside className="
hidden md:flex
w-64 flex-shrink-0
border-r border-ink-800
flex-col py-8 px-5
sticky top-0 h-screen
">
        {/* Logo */}
        <div className="mb-10">
          <h1 className="text-xl font-display font-semibold text-ink-50 tracking-tight">
            Task<span className="text-accent">Flow</span>
          </h1>
          <p className="text-ink-500 text-xs mt-0.5 font-mono">v1.0</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1">
          {navItems.map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-accent/15 text-accent border border-accent/20'
                    : 'text-ink-400 hover:text-ink-100 hover:bg-ink-800'
                }`
              }
            >
              <span className="text-base">{icon}</span>
              {label}
            </NavLink>
          ))}
        </nav>

        {/* User */}
        <div className="mt-auto">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-ink-800 border border-ink-700 mb-3">
            <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-accent text-xs font-bold font-display">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-ink-100 text-sm font-medium truncate">{user?.name}</p>
              <p className="text-ink-500 text-xs truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-ink-400 hover:text-danger hover:bg-danger/10 transition-all duration-200"
          >
            <span>⤴</span>
            Sign out
          </button>
        </div>
      </aside>

      {/* Mobile Navbar */}
<div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-ink-800 border-t border-ink-700 px-2 py-2">
  <div className="flex justify-around">
    {navItems.map(({ to, icon, label }) => (
      <NavLink
        key={to}
        to={to}
        className={({ isActive }) =>
          `flex flex-col items-center text-xs px-3 py-1 rounded-lg transition-all ${
            isActive
              ? 'text-accent'
              : 'text-ink-400'
          }`
        }
      >
        <span className="text-lg">{icon}</span>
        <span>{label}</span>
      </NavLink>
    ))}
  </div>
</div>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-10 pb-24 md:pb-10">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
