import Image from 'next/image'
import React from 'react'

type Props = {
    data: { cover: string }
}

const Card = ({ data }: Props) => {
    return (
        <div className="relative w-[208px] h-[296px] rounded-xl overflow-hidden bg-[#0b1622]">
      {/* Görsel */}
      <Image
        src={data?.cover}
        alt="cover"
        width={208}
        height={296}
        className="w-full h-full object-cover"
      />

      {/* Köşe efekti */}
      <div className="absolute top-0 left-0 w-16 h-16 bg-[#0b1622] rounded-br-xl z-10 after:absolute after:-right-4 after:top-0 after:w-4 after:h-4 after:rounded-tl-xl after:z-20 after:bg-[#0b1622]" />

      {/* + butonu */}
      <button className="absolute top-0 left-0 bg-black/60 text-white rounded-xl p-2 z-20">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
    </div>
        // <div className='max-xl:h-74 rounded-xl overflow-hidden bg-[#0b1622] relative'>
        //     <Image src={data?.cover} alt='cover' width={208} height={296} className='w-full h-full object-cover' />

        //     <button className="absolute top-0 left-0 bg-black/60 border-r-8 border-b-8 border-r-rich-black border-b-rich-black text-white rounded-xl p-2">
        //         <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
        //         </svg>
        //     </button>
        // </div>
    )
}

export default Card