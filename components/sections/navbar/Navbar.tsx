'use client'

import { NextPage } from 'next'
import Image from 'next/image'
import { FaBookmark, FaEye, FaLink, FaRegBookmark, FaRegUserCircle } from 'react-icons/fa'
import logo from '@/images/connect.png'
import { MdLogout } from 'react-icons/md'
import { twMerge } from 'tailwind-merge'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { UserTypes } from '@/types/types'

interface Props {
    selectedSection: string,
    setSelectedSection: (e: string) => void,
    userData: UserTypes,
}

const Navbar: NextPage<Props> = ({ selectedSection, setSelectedSection, userData }) => {

    const router = useRouter()
    return (
        <nav className='py-5 flex justify-between flex-1'>
            <div className='flex items-center gap-2'>
                <div className='bg-[#643bff] w-9 sm:w-7 h-9 sm:h-7 p-0.5 rounded-md overflow-hidden'>
                    <Image width={50} height={50} src={logo} alt='logo' />
                </div>
                <h1 className='text-2xl font-bold hidden md:block'>devlinks</h1>
            </div>
            <div className='flex items-center text-sm relative overflow-hidden'>
                <div style={{left: selectedSection === 'links' ? '0' : (selectedSection === 'profile' ? '33.3%' : '66.7%')}} className='w-14 lg:w-28 h-[38px] rounded-md absolute duration-300 top-0 bg-[#653bff1a]'></div>
                <div onClick={() => setSelectedSection('links')} className={twMerge('w-14 lg:w-28 h-[38px] flex justify-center items-center gap-2 rounded-md cursor-pointer select-none text-gray-600 duration-300 bg-transparent z-10', selectedSection === 'links' && 'text-[#643bff]')}>
                    <FaLink className='w-5 h-5' />
                    <span className='hidden lg:block'>Links</span>
                </div>
                <div onClick={() => setSelectedSection('profile')} className={twMerge('w-14 lg:w-28 h-[38px] flex justify-center items-center gap-2 rounded-md cursor-pointer select-none text-gray-600 duration-300 bg-transparent z-10', selectedSection === 'profile' && 'text-[#643bff]')}>
                    <FaRegUserCircle className='w-5 h-5' />
                    <span className='hidden lg:block'>Profile</span>
                </div>
                <div onClick={() => setSelectedSection('saved')} className={twMerge('w-14 lg:w-28 h-[38px] flex justify-center items-center gap-2 rounded-md cursor-pointer select-none text-gray-600 duration-300 bg-transparent z-10', selectedSection === 'saved' && 'text-[#643bff]')}>
                    {
                        selectedSection === 'saved' ? <FaBookmark className='w-5 h-5' /> : <FaRegBookmark className='w-5 h-5' />
                    }
                    <span className='hidden lg:block'>Saved</span>
                </div>
            </div>
            <div className='flex items-center gap-2 text-sm'>
                <div onClick={() => router.push(`/links/${userData.username}`)} className={twMerge('border px-3 md:px-4 py-2 rounded-md border-[#643bff] text-[#643bff] cursor-pointer select-none duration-300 hover:bg-[#653bff1a]')}>
                    <FaEye className='w-5 h-5 md:hidden' />
                    <span className='hidden md:block'>Preview</span>
                </div>
                <div onClick={() => signOut()} title='Sign out' className={twMerge('border px-3 md:px-4 py-2 rounded-md border-[#643bff] text-[#643bff] cursor-pointer select-none duration-300 hover:bg-[#653bff1a] flex gap-1.5 items-center')}>
                    <span className='hidden md:block'>Sign out</span>
                    <MdLogout className='w-5 h-5' />
                </div>
            </div>
        </nav>
    )
}

export default Navbar