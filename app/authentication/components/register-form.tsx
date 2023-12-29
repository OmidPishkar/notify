"use client";

import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form'
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import useActiveForm from '@/hooks/use-active-form';

const formSchema = zod.object({
  username: zod.string().min(2).max(25),
  email: zod.string().email(),
  password: zod.string().min(6).max(16)
});

const RegisterForm = () => {
  const { setActiveForm } = useActiveForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: ""
    },
  });


  const onSubmit = (values: zod.infer<typeof formSchema>) => {

    setLoading(true)

    console.log(values);

    // use axios for post data to api route in next session!
    axios.post("/api/register", values)
      .then(() => {

        signIn("credentials", {
          ...values,
          redirect: false
        }).then((callback) => {
          if (callback?.ok) {
            router.push("/")
            setLoading(false)
          } else {
            toast.error("Something went wrong");
            setLoading(false)
            reset();
          }
        })

      })
      .catch(err => {
        console.log(err)
        setLoading(false);
      })
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-lg animate-fade-up animate-normal w-full mx-4 sm:w-[400px] bg-[#16191c] py-6 px-5 shadow-2xl transition-all"
    >
      <h4
        className='text-center font-bold text-[1.125rem] text-white mb-2'
      >
        Sign Up
      </h4>

      <p
        className='text-center mb-5'
      >
        Follow the easy steps
      </p>

      {/* 
        you can also use a component for inputs or use shadcn for it!
      */}


      {/* username input and errors */}
      {errors.username && <p className='text-xs text-rose-400 ml-1 mb-1 transition-all'>{errors.username.message}</p>}
      <input
        type='text'
        className='
          text-[#a7a6a8] mb-5 bg-[#1e2126] text-[0.9375rem] px-[1rem] py-[1.3rem] w-full font-semibold rounded-xl outline-none
        '
        placeholder='Username'
        {...register("username")}
      />



      {/* email input and errors */}
      {errors.email && <p className='text-xs text-rose-400 ml-1 mb-1'>{errors.email.message}</p>}
      <input
        type='email'
        className='
          text-[#a7a6a8] mb-5 bg-[#1e2126] text-[0.9375rem] px-[1rem] py-[1.3rem] w-full font-semibold rounded-xl outline-none
        '
        placeholder='Email'
        {...register("email")}
      />

      {/* password input and errors */}
      {errors.password && <p className='text-xs text-rose-400 ml-1 mb-1'>{errors.password.message}</p>}
      <input
        type='text'
        className='
          text-[#a7a6a8] mb-5 bg-[#1e2126] text-[0.9375rem] px-[1rem] py-[1.3rem] w-full font-semibold rounded-xl outline-none
        '
        placeholder='Password'
        {...register("password")}
      />


      {loading ? (
        <button
          className='w-full bg-[#2787f5bd] cursor-not-allowed transition-all font-semibold py-5 rounded-xl hover:bg-[#3127f5]'
        >
          <Loader2 size={24} className='animate-spin text-white mx-auto' />
        </button>
      ) : (
        <button
          type='submit'
          className='w-full bg-[#2787f5] cursor-pointer transition-all font-semibold text-base py-5 rounded-xl hover:bg-[#3127f5]'
        >
          Create Account
        </button>
      )}

      <p
        onClick={() => setActiveForm("login")}
        className='text-indigo-500 text-xs mt-5 font-mono cursor-pointer'
      >
        Are you have already account?
      </p>

    </form>
  )
}

export default RegisterForm