'use client'
import Link from 'next/link';
import React from 'react'
import { BsArrowRight } from 'react-icons/bs';

type Props = {
    name: string;
    path: string;
}

const HeadSlider = ({ name, path }: Props) => {
    const[activeTab, setActiveTab] = React.useState<number>(1);

    const tabs:string[] = ['Series', 'Movies'];

    return (
        <div className="font-bold flex items-center justify-between mb-7">
            <h4 className='text-5xl text-jet-stream'>
                {name}
            </h4>

            {name === 'Collection' ? 
                <div className='flex border rounded-3xl border-bleu-de-france text-base font-light overflow-hidden'>
                    {tabs.map((tab, i) => (
                        <button 
                            key={i} 
                            type='button'
                            onClick={() => setActiveTab(i + 1)}
                            className={`${activeTab === (i + 1) ? 'bg-bleu-de-france text-white' : 'bg-transparent text-jet-stream'}
                            ${activeTab === (i + 1) && i === 0 ? 'rounded-r-3xl' : 'rounded-l-3xl'} py-3 px-3.5`}
                        >
                            {tab}
                        </button>
                    ))}
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