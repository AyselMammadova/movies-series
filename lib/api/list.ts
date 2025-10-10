import { BASE_API_KEY, BASE_API_URL } from '@/constant/constant';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface Card {
  id: number;
  cover: string;
}

export const listApi = createApi({
  reducerPath: 'listApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL }),
  endpoints: (builder) => ({
    getList: builder.query<Card[], void>({
        query: () => `/discover/movie?api_key=${BASE_API_KEY}&language=en-US&sort_by=popularity.desc`,
        transformResponse: (response: any) => {
        return response.results.map((item: any) => ({
          id: item.id,
          cover: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
        }));
      },
    }),
    // getPostById: builder.query<any, number>({
    //   query: (id) => `slider/${id}`,
    // }),
  }),
})

export const { useGetListQuery } = listApi;