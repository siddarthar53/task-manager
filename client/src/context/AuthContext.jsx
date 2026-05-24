import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
} from 'react';

import { authAPI } from '../services/api';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

const initialState = {
  user: JSON.parse(sessionStorage.getItem('user')) || null,
  token: sessionStorage.getItem('token') || null,
  isLoading: false,
  isAuthenticated: !!sessionStorage.getItem('token'),
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };

    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
      };

    case 'LOGOUT':
      return {
        ...initialState,
        user: null,
        token: null,
        isAuthenticated: false,
      };

    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    authReducer,
    initialState
  );

  // LOGIN
  const login = useCallback(async (credentials) => {
    dispatch({
      type: 'SET_LOADING',
      payload: true,
    });

    try {
      const { data } = await authAPI.login(credentials);

      sessionStorage.setItem('token', data.token);
      sessionStorage.setItem(
        'user',
        JSON.stringify(data.user)
      );

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: data,
      });

      toast.success(data.message || 'Welcome back!');

      return { success: true };
    } catch (error) {
      dispatch({
        type: 'SET_LOADING',
        payload: false,
      });

      const msg =
        error.response?.data?.message ||
        'Login failed.';

      toast.error(msg);

      return {
        success: false,
        message: msg,
      };
    }
  }, []);

  // REGISTER
  const register = useCallback(async (userData) => {
    dispatch({
      type: 'SET_LOADING',
      payload: true,
    });

    try {
      const { data } = await authAPI.register(userData);

      sessionStorage.setItem('token', data.token);

      sessionStorage.setItem(
        'user',
        JSON.stringify(data.user)
      );

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: data,
      });

      toast.success(
        data.message || 'Account created!'
      );

      return { success: true };
    } catch (error) {
      dispatch({
        type: 'SET_LOADING',
        payload: false,
      });

      const msg =
        error.response?.data?.message ||
        'Registration failed.';

      toast.error(msg);

      return {
        success: false,
        message: msg,
      };
    }
  }, []);

  // LOGOUT
  const logout = useCallback(async () => {
    try {
      await authAPI.logout();
    } catch (_) {}

    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');

    dispatch({
      type: 'LOGOUT',
    });

    toast.success('Logged out successfully.');
  }, []);

  // GET CURRENT USER
  const getCurrentUser = useCallback(async () => {
    const token =
      sessionStorage.getItem('token');

    if (!token) return;

    dispatch({
      type: 'SET_LOADING',
      payload: true,
    });

    try {
      const { data } = await authAPI.getMe();

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: data.user,
          token,
        },
      });
    } catch (error) {
      sessionStorage.removeItem('token');

      sessionStorage.removeItem('user');

      dispatch({
        type: 'LOGOUT',
      });
    }
  }, []);

  // RESTORE SESSION
  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error(
      'useAuthContext must be used within AuthProvider'
    );
  }

  return ctx;
};