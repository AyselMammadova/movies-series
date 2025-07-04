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
const { data: sliders, error, isLoading } = useGetPostsQuery();

if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error occured</p>

  console.log(sliders);
  

  const movies: string[] = [
    '/images/slider/slide1.jpg',
    '/images/slider/slide2.jpg',
    '/images/slider/slide3.jpg',
    '/images/slider/slide4.jpg',
  ]

  const thumbs: string[] = [
    '/images/slider/thumb1.jpg',
    '/images/slider/thumb2.jpg',
    '/images/slider/thumb3.jpg',
    '/images/slider/thumb4.jpg',
  ]

  return (
    <main className='relative'>
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
        {movies.map((movie, i) => (
          <SwiperSlide key={i}>
            <figure className='w-full h-screen relative after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-black after:opacity-60'>
              <Image src={movie} alt='slide' width={1440} height={762} className='w-full h-full object-cover' />
            </figure>

            <div className='absolute left-0 bottom-30 z-10 w-1/2 pl-12 pr-28'>
              <h4 className='font-bold text-5xl text-jet-stream'>
                Sherlock
              </h4>

              <p className='text-base font-medium text-white line-clamp-2 mt-2'>
                The quirky spin on Conan Doyle&apos;s iconic sleuth pitches him as a &quot;high-functioning sociopath`&quot; in modern-day London. Assisting him in his investigations: Afghanistan War vet John Watson, who&apos;s introduced to Holmes by a mutual acquaintance.
              </p>

              <div className="flex items-center mt-3">
                <StarRating defaultRating={4.5} readOnly />

                <div className="flex items-center text-base font-medium text-white ml-2">
                  <Image src={'/images/icons/imdb.png'} alt='imdb' width={37} height={22} />
                  <span>9.0</span>
                </div>

                <Image src={'/images/icons/bbc-logo.png'} alt='bbc' width={53} height={20} className='ml-4' />
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
          {thumbs.map((movie, i) => (
            <SwiperSlide key={i} className={`!w-122 ${i === thumbs.length - 1 ? `z-[${9 - i}]` : 'z-[9]'} transition-transform duration-300 cursor-pointer`}>
              <figure className="w-122 h-122 rounded-2xl overflow-hidden border border-aurometalsaurus transition-transform duration-300 
              relative after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-police-blue after:opacity-50">
                <Image src={movie} alt='thumb' width={1440} height={762} className='w-full h-full object-cover' />
              </figure>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </main>
  )
}

export default Hero