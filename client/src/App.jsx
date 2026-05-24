import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

          {/* Redirects */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#1F1F1F',
            color: '#F5F5F5',
            border: '1px solid #333',
            borderRadius: '12px',
            fontFamily: 'Satoshi, sans-serif',
            fontSize: '14px',
          },
          success: {
            iconTheme: { primary: '#22C55E', secondary: '#0D0D0D' },
          },
          error: {
            iconTheme: { primary: '#EF4444', secondary: '#0D0D0D' },
          },
        }}
      />
    </AuthProvider>
  );
};

export default App;
