import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BsSunFill } from 'react-icons/bs'
import { FaUser } from 'react-icons/fa'
import { FiSearch } from 'react-icons/fi'
import { IoNotificationsOutline } from 'react-icons/io5'

const Header = () => {
  return (
    <header className='absolute top-10 inset-x-20 z-10'>
      <nav className='border border-atomic-tangerine rounded-3xl backdrop-blur-sm bg-transparent w-full flex items-center justify-between px-7'>
        <div className='flex items-center'>
          <Link href='/' title='Main page' className='mr-14'>
            <Image src="/images/logo-light3.svg" alt='logo-light' width={45} height={80} />
          </Link>

          <ul className='flex items-center space-x-6'>
            <li>
              <Link href='/' title='Home' className='text-2xl font-medium text-white'>
                Home
              </Link>
            </li>

            <li>
              <Link href='/pricing' title='Pricing' className='text-2xl font-medium text-white'>
                Pricing
              </Link>
            </li>

            <li>
              <Link href='/movies' title='Movies' className='text-2xl font-medium text-white'>
                Movies
              </Link>
            </li>

            <li>
              <Link href='/series' title='Series' className='text-2xl font-medium text-white'>
                Series
              </Link>
            </li>

            <li>
              <Link href='/collection' title='Collection' className='text-2xl font-medium text-white'>
                Collection
              </Link>
            </li>

            <li>
              <Link href='/faq' title='FAQ' className='text-2xl font-medium text-white'>
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        <div className='flex items-center space-x-5 text-2xl text-white'>
          <button>
            <FiSearch />
          </button>

          <button>
            <IoNotificationsOutline />
          </button>

          <button>
            <FaUser />
          </button>

          <button>
            <BsSunFill />
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Header