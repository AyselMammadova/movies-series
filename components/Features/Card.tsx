import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
  data: { title: string, cover: string }
}

const Card = ({ data }: Props) => {
    return (
      <Link href="#" className='block max-lg:h-70 max-2xl:h-74 rounded-xl overflow-hidden relative'>
          {data?.cover ? 
            <Image src={data?.cover} alt={data?.title ?? 'cover'} width={208} height={296} className='w-full h-full object-cover' />
          :
            <div className='w-full h-full bg-bleu-de-france text-white flex items-center justify-center'>
              {data?.title}
            </div>
          }

          <button className='absolute top-0 left-0 z-10 rounded-br-xl w-14 h-14 bg-gradient-to-br from-gray-700/80 via-gray-800/60 to-transparent backdrop-blur-xs overflow-hidden flex items-center justify-center'>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#fff"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
      </Link>
    )
}

export default Card