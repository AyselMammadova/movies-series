'use client'
import { NavLinks } from '@/constant/constant'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { BsSunFill } from 'react-icons/bs'
import { FaUser } from 'react-icons/fa'
import { IoNotificationsSharp } from 'react-icons/io5'
import { RiSearch2Line } from 'react-icons/ri'

const Header = () => {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith('/auth');
  if (isAuthPage) return null;

  return (
    <header className='absolute top-10 inset-x-20 z-30'>
      <nav className='border border-deep-space-sparkle rounded-3xl backdrop-blur-sm bg-transparent w-full flex items-center justify-between px-7'>
        <div className='flex items-center'>
          <Link href='/' title='Main page' className='mr-14'>
            <Image src="/images/logo-light.svg" alt='logo-light' width={45} height={80} priority />
          </Link>

          <ul className='flex items-center space-x-6'>
            {NavLinks.map(link => (
              <li key={link.id}>
                <Link 
                  href={link.path} 
                  title={link.title} 
                  className={`inline-block text-2xl font-medium text-white relative after:absolute after:left-0 after:-bottom-1 after:z-10
                  after:w-full after:h-1 after:rounded-full after:blur-2xs ${pathname === link.path ? 'after:bg-deep-space-sparkle' : 'after:bg-transparent'}`}
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className='flex items-center space-x-5 text-2xl text-white'>
          <button>
            <RiSearch2Line className='text-3xl' />
          </button>

          <button>
            <IoNotificationsSharp className='text-3xl' />
          </button>

          <Link href='/auth'>
            <FaUser />
          </Link>

          <button>
            <BsSunFill />
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Header