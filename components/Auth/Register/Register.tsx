'use client'
import { useRegisterUserMutation } from '@/lib/api/auth';
import React, { useState } from 'react'

const Register = () => {
    const [registerUser, { isLoading, isSuccess, error }] = useRegisterUserMutation();
    const [errors, setErrors] = useState<{ [key: string]: string[] }>({});

    const [data, setData] = useState({
        fullname: '',
        email: '',
        password: '',
        repeat_password: '',
        username: ''
    });

    console.log(isSuccess, error);
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await registerUser(data).unwrap();
        }   catch (err: unknown) {
            if (err && typeof err === 'object' && 'data' in err) {
                const errorData = (err as { data: { [key: string]: string[] } }).data;
                setErrors(errorData);
            }
        }
    }

    return (
        <>
            {errors.non_field_errors && <p className="mb-3 text-md text-red-500 text-center">{errors.non_field_errors[0]}</p>}

            <form onSubmit={handleSubmit}>
                <fieldset className='mb-12'>
                    <input 
                        type='text'
                        name='fullname'
                        value={data.fullname}
                        placeholder='Fullname' 
                        onChange={handleChange}
                        className={`p-4 w-full rounded-xl bg-transparent autofill:bg-transparent border ${errors.fullname ? 'border-red-500' : 'border-jet-stream'} text-base text-gray font-medium`}
                    />

                    {errors.fullname && <p className="mt-1 text-sm text-red-500">{errors.fullname[0]}</p>}
                </fieldset>

                <fieldset className='mb-12'>
                    <input 
                        type='email'
                        name='email'
                        value={data.email}
                        placeholder='Email' 
                        onChange={handleChange}
                        className={`p-4 w-full rounded-xl bg-transparent border ${errors.email ? 'border-red-500' : 'border-jet-stream'} text-base text-gray font-medium`}
                    />

                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email[0]}</p>}
                </fieldset>

                <fieldset className='mb-12'>
                    <input 
                        type='password'
                        name='password'
                        value={data.password}
                        placeholder='Password' 
                        onChange={handleChange}
                        className={`p-4 w-full rounded-xl bg-transparent border ${errors.password ? 'border-red-500' : 'border-jet-stream'} text-base text-gray font-medium`}
                    />

                    {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password[0]}</p>}
                </fieldset>

                <fieldset className='mb-12'>
                    <input 
                        type='password'
                        name='repeat_password'
                        value={data.repeat_password}
                        placeholder='Repeat the password' 
                        onChange={handleChange}
                        className={`p-4 w-full rounded-xl bg-transparent border ${errors.repeat_password ? 'border-red-500' : 'border-jet-stream'} text-base text-gray font-medium`}
                    />

                    {errors.repeat_password && <p className="mt-1 text-sm text-red-500">{errors.repeat_password[0]}</p>}
                </fieldset>

                <fieldset className='mb-12'>
                    <input 
                        type='text'
                        name='username'
                        value={data.username}
                        placeholder='Username' 
                        onChange={handleChange}
                        className={`p-4 w-full rounded-xl bg-transparent border ${errors.username ? 'border-red-500' : 'border-jet-stream'} text-base text-gray font-medium`}
                    />

                    {errors.username && <p className="mt-1 text-sm text-red-500">{errors.username[0]}</p>}
                </fieldset>

                <button 
                    type='submit'
                    className='block w-3/5 py-3 rounded-xl mx-auto bg-bleu-de-france text-base font-medium text-jet-stream'
                >
                    Confirm
                </button>
            </form>
        </>
    )
}

export default Register