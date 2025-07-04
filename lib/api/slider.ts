import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type Slider = {
  id: number;
  title: string;
  imageUrl: string;
}

export const myApi = createApi({
  reducerPath: 'myApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://10.20.28.103:8000/api/' }),
  endpoints: (builder) => ({
    getPosts: builder.query<Slider[], void>({
      query: () => 'slider',
    }),
    // getPostById: builder.query<any, number>({
    //   query: (id) => `slider/${id}`,
    // }),
  }),
})

export const { useGetPostsQuery } = myApi