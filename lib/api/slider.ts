import { BASE_API_URL } from '@/constant/constant';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface MovieImage {
  id: number;
  image: string;
}

export interface Movie {
  id: number;
  cover: string;
  title: string;
  description: string;
  images: MovieImage[];
  imdb: number;
  platform: string;
  rating: number;
}

export interface Slider {
  id: number;
  movie: Movie;
}

export const sliderApi = createApi({
  reducerPath: 'sliderApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL }),
  endpoints: (builder) => ({
    getPosts: builder.query<Slider[], void>({
      query: () => 'slider/',
    }),
    // getPostById: builder.query<any, number>({
    //   query: (id) => `slider/${id}`,
    // }),
  }),
})

export const { useGetPostsQuery } = sliderApi