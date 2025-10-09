'use client'
// import { useRegisterUserMutation } from '@/lib/api/auth';
// import { setTab } from '@/lib/features/auth/tabSlice';
// import { useAppDispatch } from '@/lib/hooks';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

interface FormErrors {
  [key: string]: string[];
}

const Register = () => {
     const router = useRouter();
    // const dispatch = useAppDispatch();
    // const [{ isLoading, isSuccess }] = useRegisterUserMutation();
    const [errors, setErrors] = useState<FormErrors>({});

    const [data, setData] = useState({
        fullname: '',
        email: '',
        password: '',
        repeat_password: '',
        username: ''
    });

    // useEffect(() => {
    //     if (isSuccess) {
    //         router.push('/auth/profile');
    //         // dispatch(setTab('login'));
    //     }
    // }, [isSuccess, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
        
        setData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        const newErrors: FormErrors = {};
        
        if (!data.fullname.trim()) newErrors.fullname = ['Fullname is required'];
        if (!data.email.trim()) newErrors.email = ['Email is required'];
        if (!data.username.trim()) newErrors.username = ['Username is required'];
        if (!data.password) newErrors.password = ['Password is required'];
        if (!data.repeat_password) newErrors.repeat_password = ['Repeat password is required'];
        if (data.password !== data.repeat_password) {
            newErrors.repeat_password = ['Passwords do not match'];
        }
        
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            router.push('/auth/profile');
            // await registerUser(data).unwrap();
        } catch (err: unknown) {
            if (err && typeof err === 'object' && 'data' in err) {
                const apiError = err as { data: FormErrors };
                setErrors(apiError.data || {});
            } else {
                setErrors({ 
                    non_field_errors: ['An unexpected error occurred. Please try again.'] 
                });
            }
        }
    };

    console.log(data);


    return (
        <>
            {/* {isSuccess && (
                <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-xl">
                    Registration successful! Redirecting...
                </div>
            )} */}

            {errors.non_field_errors && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-xl">
                    {errors.non_field_errors[0]}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <fieldset className='mb-12'>
                    <input 
                        type='text'
                        name='fullname'
                        value={data.fullname}
                        placeholder='Fullname' 
                        onChange={handleChange}
                        // disabled={isLoading}
                        className={`p-4 w-full rounded-xl bg-transparent autofill:bg-transparent border 
                        ${errors.fullname ? 'border-red-500 focus:border-red-600' : 'border-jet-stream focus:border-bleu-de-france'} 
                        text-base text-gray font-medium`}
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
                        // disabled={isLoading}
                        className={`p-4 w-full rounded-xl bg-transparent border 
                        ${errors.email ? 'border-red-500 focus:border-red-600' : 'border-jet-stream focus:border-bleu-de-france'} 
                        text-base text-gray font-medium`}
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
                        // disabled={isLoading}
                        className={`p-4 w-full rounded-xl bg-transparent border 
                        ${errors.password ? 'border-red-500 focus:border-red-600' : 'border-jet-stream focus:border-bleu-de-france'} 
                        text-base text-gray font-medium`}
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
                        // disabled={isLoading}
                        className={`p-4 w-full rounded-xl bg-transparent border 
                        ${errors.repeat_password ? 'border-red-500 focus:border-red-600' : 'border-jet-stream focus:border-bleu-de-france'} 
                        text-base text-gray font-medium`}
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
                        // disabled={isLoading}
                        className={`p-4 w-full rounded-xl bg-transparent border 
                        ${errors.username ? 'border-red-500 focus:border-red-600' : 'border-jet-stream focus:border-bleu-de-france'} 
                        text-base text-gray font-medium`}
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