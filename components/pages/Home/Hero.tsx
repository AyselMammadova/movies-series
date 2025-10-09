'use client'
import Image from 'next/image';
import React, { useState } from 'react';
import { FreeMode, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import StarRating from '@/components/Helpers/StarRating';
import { useGetPostsQuery } from '@/lib/api/slider';

const Hero = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const { data: sliders } = useGetPostsQuery();

  // if (isLoading) return <p>Loading...</p>
  // if (error) return <p>Error occured</p>

  return (
    <main className='relative h-screen'>
      <Swiper
        style={
          {
            '--swiper-navigation-color': '#fff',
            '--swiper-pagination-color': '#fff',
          } as React.CSSProperties
        }
        spaceBetween={10}
        navigation={false}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        modules={[FreeMode, Thumbs]}
        className="carousel py-5 px-8"
      >
        {sliders?.map((slider, i) => (
          <SwiperSlide key={i}>
            <figure className='w-full h-screen relative after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-black after:opacity-60'>
              <Image src={slider?.movie?.cover} alt='slide' width={1440} height={762} className='w-full h-full object-cover' />
            </figure>

            <div className='absolute left-0 bottom-30 z-10 w-1/2 pl-12 pr-28'>
              <h4 className='font-bold text-5xl text-jet-stream'>
                {slider?.movie?.title}
              </h4>

              <p className='text-base font-medium text-white line-clamp-2 mt-2'>
                {slider?.movie?.description}
              </p>

              <div className="flex items-center mt-3">
                <StarRating defaultRating={slider?.movie?.rating} readOnly />

                <div className="flex items-center text-base font-medium text-white ml-2">
                  <Image src={'/images/icons/imdb.png'} alt='imdb' width={37} height={22} />
                  <span>{slider?.movie?.imdb}</span>
                </div>

                <Image src={slider?.movie?.platform} alt='platform' width={53} height={20} className='ml-4' />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute right-10 bottom-10">
        <Swiper
          onSwiper={(swiper) => setThumbsSwiper(swiper)}
          spaceBetween={-15}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Thumbs]}
          className="thumbs"
        >
          {sliders?.map((slider, i) => (
            <SwiperSlide key={i} className={`!w-122px ${i === sliders?.length - 1 ? `z-[${9 - i}]` : 'z-[9]'} transition-transform duration-300 cursor-pointer`}>
              <figure className="w-122px h-122px rounded-2xl overflow-hidden border border-aurometalsaurus transition-transform duration-300 
              relative after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-police-blue after:opacity-50">
                {slider?.movie?.images?.[0]?.image && (
                  <Image src={slider.movie.images[0].image} alt='thumb' width={1440} height={762} className='w-full h-full object-cover' />
                )}
              </figure>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </main>
  )
}

export default Hero