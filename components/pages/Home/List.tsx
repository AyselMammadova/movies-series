'use client'
import Card from '@/components/Features/Card';
import HeadSlider from '@/components/Features/Slider/Head'
import { CardType, useGetMovieGenreListQuery, useGetMovieListQuery, useGetTrendingListQuery, useGetTvGenreListQuery, useGetTvListQuery } from '@/lib/api/list';
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Navigation } from 'swiper/modules';
import 'swiper/css';

type Props = {
    type: string
}

const List = ({ type }: Props) => {
    const { data: trendingList } = useGetTrendingListQuery(undefined, {
        skip: type !== 'Trends',
    });

    const { data: movieList } = useGetMovieListQuery(undefined, {
        skip: type !== 'Movies',
    });

    const { data: tvList } = useGetTvListQuery(undefined, {
        skip: type !== 'Series',
    });

    const { data: movieGenreList } = useGetMovieGenreListQuery(undefined, {
        skip: type !== 'Movies',
    });

    const { data: tvGenreList } = useGetTvGenreListQuery(undefined, {
        skip: type !== 'Series',
    });

    const list = type === 'Trends' ? trendingList : type === 'Movies' ? movieList : tvList;
    const genreList = type === 'Movies' ? movieGenreList : tvGenreList;

    // selected 
    const [selectedGenreIds, setSelectedGenreIds] = React.useState<number[]>([]);

    const availableGenres = React.useMemo(() => {
        if (!genreList || !list) return [];
        return genreList.filter(genre =>
            list.some((item: CardType) => item.genre_ids?.includes(genre.id))
        );
    }, [genreList, list]);

    const filteredList = React.useMemo(() => {
        if (!list) return [];
        if (selectedGenreIds.length === 0) return list;

        return list.filter((item: CardType) =>
            item.genre_ids?.some((id: number) => selectedGenreIds.includes(id))
        );
    }, [list, selectedGenreIds]);

    const handleGenreClick = (id: number) => {
        setSelectedGenreIds(prev =>
            prev.includes(id)
            ? prev.filter(item => item !== id) 
            : [...prev, id] 
        );
    };

    
    return (
        <section className='max-md:p-7 md:p-10 overflow-x-hidden'>
            <HeadSlider name={type} path='/' />

            {type !== 'Trends' &&
                <div className='mb-14'>
                    <Swiper
                        spaceBetween={20}
                        slidesPerView={'auto'}
                        navigation={true}
                        freeMode={true}
                        grabCursor={true}
                        modules={[FreeMode, Navigation]}
                        className='genres-carousel'
                    >
                        {availableGenres?.map(genre => (
                            <SwiperSlide key={genre?.id} className='!w-auto !flex-none'>
                                <button 
                                    onClick={() => handleGenreClick(genre.id)}
                                    className={`py-3 px-7 border border-persian-pink rounded-3xl font-medium text-sm text-white leading-4 whitespace-nowrap
                                    transition ${selectedGenreIds.includes(genre.id) ? 'bg-persian-pink' : 'bg-transparent'}`}
                                >
                                    {genre?.name}
                                </button>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            }

            <div className="max-md:-mr-12 md:-mr-15">
                <Swiper
                    spaceBetween={28}
                    slidesPerView={7}
                    navigation={false}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    modules={[FreeMode, Autoplay]}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                            spaceBetween: 12
                        },
                        400: {
                            slidesPerView: 2,
                            spaceBetween: 20
                        },
                        576: {
                            slidesPerView: 3,
                            spaceBetween: 20
                        },
                        768: {
                            slidesPerView: 4
                        },
                        991: {
                            slidesPerView: 5
                        },
                        1300: {
                            slidesPerView: 6
                        },
                        1500: {
                            slidesPerView: 7
                        },
                    }}
                >
                    {filteredList?.map(item => (
                        <SwiperSlide key={item?.id}>
                            <Card data={item} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    )
}

export default List