'use client'
import { avatars } from '@/constant/constant';
import { useUploadAvatarMutation } from '@/lib/api/auth';
import { User } from '@/lib/types/auth.types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { HiArrowLeft } from 'react-icons/hi';

const UserProfile = () => {
  const [user, setUser] = React.useState<User | null>(null);
  const [file, setFile] = React.useState<File | null>(null);
  const [uploadAvatar] = useUploadAvatarMutation();
  const [mounted, setMounted] = React.useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files?.[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return; 

    const formData = new FormData();
    // formData.append('id', user?.id);
    formData.append('avatar', file);

    try {
      await uploadAvatar(formData).unwrap();
    } catch(err)  {
      console.log(err);
    }
  };

  React.useEffect(() => {
    setMounted(true); 
    const storedUser = localStorage.getItem('auth_user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  if (!mounted) return null;

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
        <h1 className='font-bold text-5xl text-white min-h-12 mb-12'>
          {user?.username}
        </h1>

        <figure className='w-40 h-40 rounded-full bg-bleu-de-france shadow-bleu-de-france flex items-center justify-center overflow-hidden'>
          <Image src={file ? URL.createObjectURL(file) : '/images/icons/user/user-icon.svg'} alt='user icon' width={103} height={131} className='object-contain' />
        </figure>

        <p className='text-2xl font-bold text-jet-stream mt-20 mb-7.5'>
          choose your profile
        </p>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-5 gap-10">
            {avatars.map(avatar => (
              <button key={avatar.id} type='button'>
                <figure className='w-40 h-40 rounded-full bg-bleu-de-france shadow-bleu-de-france flex items-center justify-center overflow-hidden'>
                  <Image src={avatar.src} alt={avatar.title} width={160} height={160} className='w-full h-full object-cover object-top' />
                </figure>
              </button>
            ))}

            <label className='relative overflow-hidden cursor-pointer'>
              <input 
                type="file" 
                name="file" 
                onChange={handleChange}
                className='absolute top-0 left-0 w-full h-full opacity-0 invisible' 
              />
              <figure className='w-40 h-40 rounded-full bg-bleu-de-france shadow-bleu-de-france flex items-center justify-center overflow-hidden'>
                <Image src='/images/icons/user/add-pic.png' alt='add picture' width={100} height={100} className='object-contain' />
              </figure>
            </label>
          </div>

          <button 
            type='submit' 
            className='border border-jet-stream bg-bleu-de-france rounded-xl w-40 h-12 flex items-center justify-center text-center text-base font-medium text-jet-stream mt-15 mx-auto'
          >
            Confirm
          </button>
        </form>
      </div> 
    </section>
  )
}

export default UserProfile