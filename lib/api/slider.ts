import { BASE_API_URL } from '@/constant/constant';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type Slider = {
  id: number;
  movie: {cover: string, title: string, description: string, images: [{id: number, image: string}], imdb: number, platform: string, rating: number};
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