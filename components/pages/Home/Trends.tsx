'use client'
import Card from '@/components/Features/Card';
import HeadSlider from '@/components/Features/Slider/Head'
import { useGetListQuery } from '@/lib/api/list';
import React from 'react'

const Trends = () => {
    const { data: list } = useGetListQuery();
    console.log(list);
    
    return (
        <section className='p-10'>
            <HeadSlider name='Trends' path='/' />

            <div className="grid grid-cols-6 gap-7">
                {list?.map(item => (
                    <Card key={item?.id} data={item} />
                ))}
            </div>
        </section>
    )
}

export default Trends