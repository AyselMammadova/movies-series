import { BASE_API_URL } from '@/constant/constant';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { RegisterRequest, RegisterResponse, LoginRequest, LoginResponse } from '../types/auth.types';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL,
    prepareHeaders: (headers, { getState, endpoint }) => {
      const token = (getState() as RootState).auth?.token;
      if (endpoint !== 'loginUser' && endpoint !== 'registerUser') {
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (data) => ({
        url: 'register/',
        method: 'POST',
        body: data,
      }),
    }),

    loginUser: builder.mutation<LoginResponse, LoginRequest>({
      query: (data) => ({
        url: 'login/',
        method: 'POST',
        body: data,
      }),
    }),

    uploadAvatar: builder.mutation<void, FormData>({
      query: (data) => ({
        url: 'profile/',
        method: 'POST',
        body: data,
      }),
    }),
    
    logoutUser: builder.mutation<void, void>({
      query: () => ({
        url: 'logout/',
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useUploadAvatarMutation,
  useLogoutUserMutation,
} = authApi;