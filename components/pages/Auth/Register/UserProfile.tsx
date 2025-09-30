'use client'
import { avatars } from '@/constant/constant';
import { useAppSelector } from '@/lib/hooks';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { HiArrowLeft } from 'react-icons/hi';

const UserProfile = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <section className='w-full min-h-screen bg-[linear-gradient(to_right,_#030A1B_34%,_#9747FF_100%)]'>
      <div className='p-4'>
          <Link 
              href='/auth'
              className='text-2xl text-jet-stream'
          >
              <HiArrowLeft />
          </Link>
      </div>

      <div className='flex flex-col items-center justify-center text-center pt-15 pb-20 px-13'>
        <h1 className='font-bold text-5xl text-white'>
          {user?.username}
        </h1>

        <figure className='w-40 h-40 rounded-full bg-bleu-de-france shadow-bleu-de-france flex items-center justify-center overflow-hidden'>
          <Image src={'/images/icons/user/user-icon.svg'} alt='user icon' width={103} height={131} className='object-contain' />
        </figure>

        <p className='text-2xl font-bold text-jet-stream mt-20 mb-7.5'>
          choose your profile
        </p>

        <div className="grid grid-cols-5 gap-10">
          {avatars.map(avatar => (
            <button key={avatar.id} type='button'>
              <figure className='w-40 h-40 rounded-full bg-bleu-de-france shadow-bleu-de-france flex items-center justify-center overflow-hidden'>
                <Image src={avatar.src} alt={avatar.title} width={160} height={160} className='w-full h-full object-cover object-top' />
              </figure>
            </button>
          ))}

          <button type='button'>
            <figure className='w-40 h-40 rounded-full bg-bleu-de-france shadow-bleu-de-france flex items-center justify-center overflow-hidden'>
              <Image src='/images/icons/user/add-pic.png' alt='add picture' width={100} height={100} className='object-contain' />
            </figure>
          </button>
        </div>
      </div> 
    </section>
  )
}

export default UserProfile