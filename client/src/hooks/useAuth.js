import { useAuthContext } from '../context/AuthContext';

/**
 * Custom hook for authentication.
 * Exposes: user, token, isAuthenticated, isLoading, login, register, logout
 */
const useAuth = () => {
  return useAuthContext();
};

export default useAuth;
