import Link from 'next/link';
import React from 'react'
import { BsArrowRight } from 'react-icons/bs';

type Props = {
    name: string;
    path: string;
}

const HeadSlider = ({ name, path }: Props) => {
    return (
        <div className="font-bold flex items-center justify-between">
            <h4 className='text-5xl text-jet-stream'>
                {name}
            </h4>

            <Link href={path} title={name} className='text-2xl text-bleu-de-france'>
                See More
                <BsArrowRight />
            </Link>
        </div>
    )
}

export default HeadSlider