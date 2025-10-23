'use client'
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { EffectCards } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

type Props = {
    data: {
        title: string;
        examples: string[]
    }
}

const CollectionCard = ({ data }: Props) => {
    return (
        <Link href="#" className='block'> 
            <Swiper
                 slidesPerView={1.2}
                centeredSlides
                spaceBetween={-120} 
                grabCursor
            >
                {data.examples?.map((example, i) => (
                    <SwiperSlide key={i}>
                        <figure className={`rounded-xl w-full h-74 overflow-hidden transition-transform duration-500
          ${i === 0 ? 'z-30 translate-y-0' : i === 1 ? 'z-20 -translate-y-10' : 'z-10 -translate-y-20'}`}>
                            <Image src={example} alt={`example${i}`} width={208} height={296} className='w-full h-full object-cover' />
                        </figure>
                    </SwiperSlide>
                ))}
            </Swiper>
        </Link>
    )
}

export default CollectionCard