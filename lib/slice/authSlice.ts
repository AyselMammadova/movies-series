import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authApi } from '../api/auth';

interface User {
  id: number;
  username: string;
  email: string;
  fullname?: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
}

const getStoredToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token');
  }
  return null;
};

const initialState: AuthState = {
  token: getStoredToken(),
  user: null,
  isAuthenticated: !!getStoredToken(),
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
      }
    },
    setCredentials: (state, action: PayloadAction<{ token: string; user: User }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', action.payload.token);
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.loginUser.matchFulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        if (typeof window !== 'undefined') {
          localStorage.setItem('auth_token', action.payload.token);
        }
      })
      .addMatcher(authApi.endpoints.registerUser.matchFulfilled, (state, action) => {
        if (action.payload.token) {
          state.token = action.payload.token;
          state.isAuthenticated = true;
          if (typeof window !== 'undefined') {
            localStorage.setItem('auth_token', action.payload.token);
          }
        }
      })
      .addMatcher(authApi.endpoints.logoutUser.matchFulfilled, (state) => {
        state.token = null;
        state.user = null;
        state.isAuthenticated = false;
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth_token');
        }
      });
  },
});

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;