import Image from 'next/image'
import React from 'react'

const GoldenGlobe = () => {
    return (
        <section className='max-md:my-7 md:my-30 max-md:py-7 max-md:pl-7 md:py-15 md:pl-10 bg-goldenrod relative before:absolute before:-top-7 before:left-0 before:w-full before:h-7 before:bg-[linear-gradient(to_bottom,_rgba(0,0,0,0.2),_rgba(0,0,0,0.1)_20%,_goldenrod_100%)]
        after:absolute after:-bottom-7 after:left-0 after:w-full after:h-7 after:bg-[linear-gradient(to_top,_rgba(0,0,0,0.2),_rgba(0,0,0,0.1)_20%,_goldenrod_100%)]'>
            <div className="flex items-center">
                <Image src={'/images/icons/golden-globe.svg'} alt='golden globe' width={639} height={402} className='w-2/5' />
                <figure className='w-3/5 relative before:absolute before:left-0 before:top-0 before:w-20 before:h-full before:bg-[linear-gradient(to_right,_goldenrod_0%,_goldenrod_80%,_rgba(0,0,0,0.1)_100%)]'>
                    <Image src={'/images/icons/golden-2024.svg'} alt='golden 2024' width={796} height={386} className='w-full' />
                </figure>
            </div>
        </section>
    )
}

export default GoldenGlobe