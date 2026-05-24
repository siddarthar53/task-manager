import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Spinner from '../components/common/Spinner';
import {
  validateEmail,
  validatePassword,
} from '../utils/validators';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const { login, isLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  useEffect(() => {
    if (isAuthenticated) navigate(from, { replace: true });
  }, [isAuthenticated, navigate, from]);

  const validate = () => {
  const errs = {};

  if (!form.email) {
    errs.email = 'Email is required';
  } else if (!validateEmail(form.email)) {
    errs.email = 'Invalid email';
  }

  if (!form.password) {
    errs.password = 'Password is required';
  } else if (!validatePassword(form.password)) {
    errs.password = 'Password must be at least 6 characters';
  }

  return errs;
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) return setErrors(errs);
    setErrors({});
    const result = await login(form);
    if (result.success) navigate(from, { replace: true });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  return (
    <div className="min-h-screen bg-ink-900 flex">
      {/* Left panel */}
      <div className="hidden lg:flex w-1/2 flex-col justify-between p-16 bg-ink-800 border-r border-ink-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent" />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />

        <div className="relative">
          <h1 className="text-3xl font-display font-semibold text-ink-50">
            Task<span className="text-accent">Flow</span>
          </h1>
        </div>

        <div className="relative">
          <blockquote className="text-3xl font-display font-semibold text-ink-50 leading-snug mb-4">
            "Clarity through<br />organized action."
          </blockquote>
          <p className="text-ink-500 text-sm">Manage your work, one task at a time.</p>
        </div>

        <div className="relative flex items-center gap-4">
          <div className="flex -space-x-2">
            {['#6C63FF', '#22C55E', '#F59E0B'].map((c, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full border-2 border-ink-800 flex items-center justify-center text-xs font-bold"
                style={{ backgroundColor: c + '30', borderColor: c + '50', color: c }}
              >
                {['A', 'B', 'C'][i]}
              </div>
            ))}
          </div>
          <p className="text-ink-500 text-sm">Join thousands of productive people.</p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm animate-slide-up">
          <div className="mb-8">
            <h2 className="text-2xl font-display font-semibold text-ink-50 mb-1">Welcome back</h2>
            <p className="text-ink-500 text-sm">Sign in to continue to TaskFlow</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-ink-400 mb-1.5">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={`input-field ${errors.email ? 'border-danger' : ''}`}
                autoComplete="email"
              />
              {errors.email && <p className="text-danger text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-ink-400 mb-1.5">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={`input-field ${errors.password ? 'border-danger' : ''}`}
                autoComplete="current-password"
              />
              {errors.password && <p className="text-danger text-xs mt-1">{errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full flex items-center justify-center gap-2 mt-6"
            >
              {isLoading ? <Spinner size="sm" /> : null}
              Sign In
            </button>
          </form>

          <p className="text-center text-ink-500 text-sm mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-accent hover:text-accent-light transition-colors">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
