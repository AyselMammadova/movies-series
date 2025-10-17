import { BASE_API_KEY, BASE_API_URL } from '@/constant/constant';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface CardResponse {
  id: number;
  name: string;
  poster_path: string;
  genre_ids: number[];
}

export interface CardType {
  id: number;
  title: string;
  cover: string;
  genre_ids: number[];
}

export interface Genre {
  id: number;
  name: string;
}


export const listApi = createApi({
  reducerPath: 'listApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL }),
  endpoints: (builder) => ({
    getTrendingList: builder.query<CardType[], void>({
      query: () => `/trending/all/week?api_key=${BASE_API_KEY}&language=en-US`,
      transformResponse: (response: {results: CardResponse[]}) => {
        return response.results.map((item: CardResponse) => ({
          id: item.id,
          title: item.name,
          cover: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
          genre_ids: item.genre_ids ? item.genre_ids.map(g => Number(g)) : []
        }))
      },
    }),

    getMovieList: builder.query<CardType[], void>({
      query: () => `/discover/movie?api_key=${BASE_API_KEY}&language=en-US&sort_by=popularity.desc`,
      transformResponse: (response: {results: CardResponse[]}) => {
        return response.results.map((item: CardResponse) => ({
          id: item.id,
          title: item.name,
          cover: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
          genre_ids: item.genre_ids ? item.genre_ids.map(g => Number(g)) : []
        }))
      },
    }),

    getTvList: builder.query<CardType[], void>({
      query: () => `/discover/tv?api_key=${BASE_API_KEY}&language=en-US&sort_by=popularity.desc`,
      transformResponse: (response: {results: CardResponse[]}) => {
        return response.results.map((item: CardResponse) => ({
          id: item.id,
          title: item.name,
          cover: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
          genre_ids: item.genre_ids ? item.genre_ids.map(g => Number(g)) : []
        }))
      },
    }),

    getMovieGenreList: builder.query<Genre[], void>({
      query: () => `/genre/movie/list?api_key=${BASE_API_KEY}&language=en`,
      transformResponse: (response: {genres: Genre[]}) => {
        return response.genres
      },
    }),

    getTvGenreList: builder.query<Genre[], void>({
      query: () => `/genre/tv/list?api_key=${BASE_API_KEY}&language=en`,
      transformResponse: (response: {genres: Genre[]}) => {
        return response.genres
      },
    }),
  }),
})

export const {
  useGetTrendingListQuery,
  useGetMovieListQuery,
  useGetTvListQuery,
  useGetMovieGenreListQuery,
  useGetTvGenreListQuery
} = listApi;