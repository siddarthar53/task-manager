import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Spinner from '../components/common/Spinner';
import {
  validateEmail,
  validatePassword,
} from '../utils/validators';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const { register, isLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard', { replace: true });
  }, [isAuthenticated, navigate]);

  const validate = () => {
  const errs = {};

  if (!form.name.trim()) {
    errs.name = 'Name is required';
  } else if (form.name.length < 2) {
    errs.name = 'Name must be at least 2 characters';
  }

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
    const result = await register(form);
    if (result.success) navigate('/dashboard', { replace: true });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  return (
    <div className="min-h-screen bg-ink-900 flex items-center justify-center p-8">
      <div className="w-full max-w-sm animate-slide-up">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-display font-semibold text-ink-50 mb-1">
            Task<span className="text-accent">Flow</span>
          </h1>
          <p className="text-ink-500 text-sm mt-3">Create your account to get started</p>
        </div>

        <div className="card p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-ink-400 mb-1.5">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                className={`input-field ${errors.name ? 'border-danger' : ''}`}
                autoComplete="name"
              />
              {errors.name && <p className="text-danger text-xs mt-1">{errors.name}</p>}
            </div>

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
                placeholder="Min. 6 characters"
                className={`input-field ${errors.password ? 'border-danger' : ''}`}
                autoComplete="new-password"
              />
              {errors.password && <p className="text-danger text-xs mt-1">{errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full flex items-center justify-center gap-2 mt-2"
            >
              {isLoading ? <Spinner size="sm" /> : null}
              Create Account
            </button>
          </form>
        </div>

        <p className="text-center text-ink-500 text-sm mt-5">
          Already have an account?{' '}
          <Link to="/login" className="text-accent hover:text-accent-light transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
