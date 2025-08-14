import { useAppSelector } from '@/lib/hooks';
import React from 'react'

const RegisterProfile = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div>
      <h1 className='font-bold text-5xl text-white'>
        {user?.username}
      </h1>
    </div>
  )
}

export default RegisterProfile