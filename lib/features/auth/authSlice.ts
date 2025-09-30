import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authApi } from '../../api/auth';
import { AuthState, User } from '@/lib/types/auth.types';

const getStoredToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token');
  }
  return null;
};

const getStoredUser = (): User | null => {
  if (typeof window !== 'undefined') {
    const userStr = localStorage.getItem('auth_user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        localStorage.removeItem('auth_user'); 
        return null;
      }
    }
  }
  return null;
};

const initialState: AuthState = {
  token: getStoredToken() || '',
  user: getStoredUser() || null,
  isAuthenticated: !!(getStoredToken() && getStoredUser())
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
      }
    },
    setCredentials: (state, action: PayloadAction<{ access: string; user: User }>) => {
      state.token = action.payload.access;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', action.payload.access);
        localStorage.setItem('auth_user', JSON.stringify(action.payload.user));
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.loginUser.matchFulfilled, (state, action) => {
        state.token = action.payload.access;
        state.user = {
          username: action.payload.username,
          avatar: action.payload.avatar
        };
        state.isAuthenticated = true;
        if (typeof window !== 'undefined') {
          localStorage.setItem('auth_token', action.payload.access);
          localStorage.setItem('auth_user', JSON.stringify(state.user));
        }
      })
      .addMatcher(authApi.endpoints.registerUser.matchFulfilled, (state, action) => {
        if (action.payload.access) {
          state.token = action.payload.access;
          state.user = {
            username: action.payload.username
          }
          state.isAuthenticated = true;
          if (typeof window !== 'undefined') {
            localStorage.setItem('auth_token', action.payload.access);
          }
        }
      })
      .addMatcher(authApi.endpoints.logoutUser.matchFulfilled, (state) => {
        state.token = null;
        state.user = null;
        state.isAuthenticated = false;
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth_token');
          localStorage.removeItem('auth_user');
        }
      })
      .addMatcher(authApi.endpoints.logoutUser.matchRejected, (state) => {
        state.token = null;
        state.user = null;
        state.isAuthenticated = false;
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth_token');
          localStorage.removeItem('auth_user');
        }
      });
  },
});

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;