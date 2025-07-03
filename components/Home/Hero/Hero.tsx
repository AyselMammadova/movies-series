'use client'
import Image from 'next/image';
import React, { useState } from 'react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

const Hero = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const movies: string[] = [
    '/images/slider/slide1.png',
    '/images/slider/slide2.png',
  ]

  const thumbs: string[] = [
    '/images/slider/thumb1.jpg',
    '/images/slider/slide2.png',
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
        navigation={true}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="carousel py-5 px-8"
      >
        {movies.map((movie, i) => (
          <SwiperSlide key={i} className='w-full h-760'>
            <Image src={movie} alt='slide' width={1440} height={760} className='w-full h-full object-cover' />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute right-20 bottom-20 w-488">
        <Swiper
          onSwiper={(swiper) => setThumbsSwiper(swiper)}
          spaceBetween={-80}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="thumbs"
        >
          {thumbs.map((movie, i) => (
            <SwiperSlide key={i}>
              <figure className="w-122 h-122 rounded-2xl overflow-hidden border border-deer relative 
              after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-dark-lava after:opacity-50">
                <Image src={movie} alt='thumb' width={1587} height={690} className='w-full h-full object-cover' />
              </figure>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </main>
  )
}

export default Hero