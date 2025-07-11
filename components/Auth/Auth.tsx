'use client'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { HiArrowLeft } from 'react-icons/hi';
import Login from './Login/Login';
import Register from './Register/Register';
import Image from 'next/image';

const Auth = () => {
    const router = useRouter();
    const [tab, setTab] = useState(2);

    return (
        <section className='w-full min-h-screen bg-[linear-gradient(to_right,_#030A1B_34%,_#9747FF_100%)]'>
            <div className='p-4'>
                <button 
                    type='button' 
                    onClick={() => router.back()}
                    className='text-2xl text-jet-stream'
                >
                    <HiArrowLeft />
                </button>
            </div>

            {/* <div className="flex items-center space-x-14 py-15 px-13"> */}
            <div className="grid grid-cols-12 gap-12 pt-15 pb-20 px-13">
                <div className='col-span-12 md:col-span-6 lg:col-span-5'>
                    <div className="mx-auto min-w-302px lg:w-3/5">
                        <h1 className='text-7xl font-bold text-jet-stream text-center mb-9'>
                            Welcome
                        </h1>

                        <div className="px-4">
                            <div className="flex items-center justify-between text-2xl font-bold text-jet-stream mb-20">
                                <button 
                                    type='button' 
                                    onClick={() => setTab(1)}
                                    className={`relative after:absolute after:left-0 after:-bottom-1 after:z-10
                                    after:w-full after:h-1 after:rounded-full after:blur-2xs ${tab === 1 ? 'after:bg-deep-space-sparkle' : 'after:bg-transparent'}`}
                                >
                                    LOGIN
                                </button>

                                <button 
                                    type='button' 
                                    onClick={() => setTab(2)}
                                    className={`relative after:absolute after:left-0 after:-bottom-1 after:z-10
                                    after:w-full after:h-1 after:rounded-full after:blur-2xs ${tab === 2 ? 'after:bg-deep-space-sparkle' : 'after:bg-transparent'}`}
                                >
                                    SIGNUP
                                </button>
                            </div>

                            {tab === 1 ? <Login /> : tab === 2 ? <Register /> : null}
                        </div>
                    </div>
                </div>

                <div className="hidden md:block md:col-span-6 lg:col-span-7">
                    <figure className='w-full h-full'>
                        <Image src='/images/background/auth.jpeg' alt='auth' width={974} height={795} priority className='w-full h-full max-h-795px object-contain' />
                    </figure>
                </div>
            </div>
        </section>
    )
}

export default Auth