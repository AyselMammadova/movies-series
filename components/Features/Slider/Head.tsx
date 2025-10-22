import Link from 'next/link';
import React from 'react'
import { BsArrowRight } from 'react-icons/bs';

type Props = {
    name: string;
    path: string;
}

const HeadSlider = ({ name, path }: Props) => {
    return (
        <div className="font-bold flex items-center justify-between mb-7">
            <h4 className='text-5xl text-jet-stream'>
                {name}
            </h4>

            {name === 'Collection' ? 
                <div className='flex border rounded-3xl border-bleu-de-france text-base font-light overflow-hidden'>
                    <div className="bg-transparent text-jet-stream py-3 px-3.5">
                        Series
                    </div>

                    <div className="rounded-l-3xl bg-bleu-de-france text-white p-3 px-3.5">
                        Movies
                    </div>
                </div>
            :
                <Link href={path} title={name} className='text-2xl text-bleu-de-france flex items-center'>
                    See More
                    <BsArrowRight className='ml-1.5' />
                </Link>
            }
        </div>
    )
}

export default HeadSlider