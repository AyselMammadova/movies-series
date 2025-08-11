import { BASE_API_URL } from '@/constant/constant';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

export type RegisterRequest = {
    fullname: string,
    email: string,
    password: string,
    repeat_password: string,
    username: string
};

export type RegisterResponse = {
  id: number;
  username: string;
  email: string;
  token?: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
};

// export type MeResponse = {
//   id: number;
//   username: string;
//   email: string;
// };

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth?.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
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

    // getCurrentUser: builder.query<MeResponse, void>({
    //   query: () => 'auth/me/',
    // }),

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
  useLogoutUserMutation,
} = authApi;