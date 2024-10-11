'use client'

import { register_form_data } from '@/assets/data'
import { NextPage } from 'next'
import InputField from '../shared/InputField'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import PrimaryButton from '../shared/PrimaryButton'
import fetchHandler from '../fetchHandler'
import toast from 'react-hot-toast'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import logo from '@/images/connect.png'

interface Props { }

const RegisterForm: NextPage<Props> = ({ }) => {
    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(false)

    const handleRegister = async (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        try {
            const formData = new FormData(e.currentTarget);
            const data = Object.fromEntries(formData.entries());

            const result = await fetchHandler({ route: 'user/create', method: "POST", data: data })
            if (result.error) {
                throw new Error(result.error)
            } else {
                const response = await signIn('credentials', { email: data.email, password: data.password, redirect: false })
                if (response?.error) {
                    toast.error(response.error)
                    setLoading(false)
                } else {
                    router.push('/home')
                }
                setLoading(false)
            }
        } catch (error: any) {
            console.log(error.message || 'Internal server error')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='w-full sm:w-96 h-full sm:h-auto flex flex-col justify-center items-center bg-[#ffffff] shadow-equal p-7 sm:rounded-lg'>
            <div className='bg-[#643bff] w-20 h-20 md:w-16 md:h-16 rounded-lg overflow-hidden'>
                <Image width={80} height={80} src={logo} alt='logo' />
            </div>
            <h1 className='text-2xl font-semibold mt-5'>Register to Link Sharing</h1>
            <form action="submit" onSubmit={handleRegister} className='w-full h-auto flex flex-col gap-2 mt-7'>
                {
                    register_form_data.map((field: any, index: number) => <InputField key={index} data={field} />)
                }
                <p>Already have an account? <span className='text-blue-500 hover:underline cursor-pointer' onClick={() => router.push(`signin`)}>Signin</span></p>
                <PrimaryButton name='Register' disabled={loading} />
            </form>
        </div>
    )
}

export default RegisterForm