import Image from 'next/image'
import React from 'react'

type Props = {
    data: { cover: string }
}

const Card = ({ data }: Props) => {
    return (
        <div className='max-xl:h-74 rounded-xl overflow-hidden relative'>
            <Image src={data?.cover} alt='cover' width={208} height={296} className='w-full h-full object-cover' />

            <button className='absolute top-0 left-0 z-10 rounded-br-xl w-14 h-14 bg-gradient-to-br from-gray-700/80 via-gray-800/60 to-transparent backdrop-blur-xs overflow-hidden'>
                +
            </button>
        </div>
    )
}

export default Card