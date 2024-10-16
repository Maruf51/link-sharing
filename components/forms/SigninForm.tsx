'use client'

import { signin_form_data } from '@/assets/data'
import { NextPage } from 'next'
import InputField from '../shared/InputField'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import PrimaryButton from '../shared/PrimaryButton'
import { signIn } from 'next-auth/react'
import toast from 'react-hot-toast'
import Image from 'next/image'
import logo from '@/images/connect.png'

interface Props { }

const SigninForm: NextPage<Props> = ({ }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSignin = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    setLoading(true)

    const response = await signIn('credentials', { ...data, redirect: false })
    if (response?.error) {
      toast.error(response.error)
      setLoading(false)
    } else {
      router.push('/home')
    }
    setLoading(false)
  }

  return (
    <div className='w-full sm:w-96 h-full sm:h-auto flex flex-col justify-center items-center bg-[#ffffff] shadow-equal p-7 sm:rounded-lg'>
      <div className='bg-[#643bff] w-20 h-20 md:w-16 md:h-16 rounded-lg overflow-hidden'>
        <Image width={80} height={80} src={logo} alt='logo' />
      </div>
      <h1 className='text-2xl font-semibold mt-5'>Sign-in to Link Sharing</h1>
      <form action="submit" onSubmit={handleSignin} className='w-full h-auto flex flex-col gap-2 mt-7'>
        {
          signin_form_data.map((field: any, index: number) => <InputField key={index} data={field} />)
        }
        <p>Don&apos;t have an account? <span className='text-blue-500 hover:underline cursor-pointer' onClick={() => router.push(`register`)}>Register</span></p>
        <PrimaryButton name='Sign in' disabled={loading} />
      </form>
    </div>
  )
}

export default SigninForm