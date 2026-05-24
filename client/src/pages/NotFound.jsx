import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="min-h-screen bg-ink-900 flex items-center justify-center text-center p-8">
    <div className="animate-slide-up">
      <p className="text-8xl font-display font-bold text-ink-800 mb-4">404</p>
      <h1 className="text-2xl font-display font-semibold text-ink-200 mb-2">Page not found</h1>
      <p className="text-ink-500 text-sm mb-8">The page you're looking for doesn't exist.</p>
      <Link to="/dashboard" className="btn-primary inline-block">
        Back to Dashboard
      </Link>
    </div>
  </div>
);

export default NotFound;
