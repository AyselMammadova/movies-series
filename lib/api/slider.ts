import { BASE_API_KEY, BASE_API_KEY_IMDB, BASE_API_URL } from '@/constant/constant';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface TrendingMovie {
  id: number;
  media_type: string;
  name?: string;
  title?: string;
  overview: string;
  vote_average: number;
  backdrop_path: string | null;
  poster_path: string | null;
  first_air_date?: string;
  release_date?: string;
  genre_ids: number[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface Slider {
  id: number;
  media_type: string;
  title: string;
  description: string;
  rating: number;
  cover: string;
  release_date?: string;
  thumb: string;
  genres: string[];
  imdb: number;
}

export const sliderApi = createApi({
  reducerPath: 'sliderApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL }),
  endpoints: (builder) => ({
    getSliderMovies: builder.query<Slider[], void>({
      async queryFn(_, _queryApi, _extraOptions, baseQuery) {
        const trending = await baseQuery(`/trending/all/day?api_key=${BASE_API_KEY}&language=en-US`);
        if (trending.error) return { error: trending.error };
        const movies = (trending.data as { results: TrendingMovie[] }).results.slice(0, 5); 

         const moviesWithDetails: Slider[] = await Promise.all(
          movies.map(async (movie) => {
            const movieDetailRes = await baseQuery(`/${movie.media_type}/${movie.id}?api_key=${BASE_API_KEY}`);
            const movieDetailData = movieDetailRes.data as {
              imdb_id?: string;
              genres?: { id: number; name: string }[];
            };

            const movieGenres = movieDetailData?.genres?.map((g) => g.name) || [];

            let imdbRating = Math.round(movie.vote_average * 10) / 10; 
            if (movieDetailData?.imdb_id && BASE_API_KEY_IMDB) {
              try {
                const omdbRes = await fetch(
                  `https://www.omdbapi.com/?i=${movieDetailData.imdb_id}&apikey=${BASE_API_KEY_IMDB}`
                );
                const omdbData = await omdbRes.json();
                imdbRating = parseFloat(omdbData.imdbRating) || Math.round(movie.vote_average * 10) / 10;
              } catch (err) {
                console.error('OMDb fetch failed:', err);
              }
            }

            return {
              id: movie.id,
              media_type: movie.media_type,
              title: movie.media_type === 'tv' ? movie.name! : movie.title!,
              description: movie.overview,
              cover: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
              thumb: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
              genres: movieGenres,
              rating: movie.vote_average,
              imdb: imdbRating,
              release_date: movie.media_type === 'tv' ? movie.first_air_date : movie.release_date
            };
          })
        );

        return { data: moviesWithDetails };
      },
    }),
    // getPostById: builder.query<any, number>({
    //   query: (id) => `slider/${id}`,
    // }),
  }),
})

export const { useGetSliderMoviesQuery } = sliderApi;