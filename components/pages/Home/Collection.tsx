// import Card from '@/components/Features/Card'
import CollectionCard from '@/components/Features/CollectionCard'
import HeadSlider from '@/components/Features/Slider/Head'
import { collections } from '@/constant/constant'
// import Image from 'next/image'
import React from 'react'
// import { Autoplay, FreeMode } from 'swiper/modules'
// import { Swiper, SwiperSlide } from 'swiper/react'

const Collection = () => {
    return (
        <section className='max-md:p-7 md:p-10'>
            <HeadSlider name='Collection' path='/' />

            <div className="grid grid-cols-7 gap-7">
                {collections.map(collection => (
                    <div key={collection.id}>
                        <CollectionCard data={collection} />
                    </div>
                ))}
            </div>

            {/* <div className="max-md:-mr-12 md:-mr-15">
                <Swiper
                    spaceBetween={28}
                    slidesPerView={6}
                    navigation={false}
                    // autoplay={{
                    //     delay: 3000,
                    //     disableOnInteraction: false,
                    // }}
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
            </div> */}
        </section>
    )
}

export default Collection