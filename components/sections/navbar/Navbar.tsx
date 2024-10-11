'use client'

import { NextPage } from 'next'
import Image from 'next/image'
import { FaEye, FaLink, FaRegUserCircle } from 'react-icons/fa'
import logo from '@/images/connect.png'
import { MdLogout } from 'react-icons/md'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { signOut } from 'next-auth/react'

interface Props {
    selectedSection: String,
    setSelectedSection: (e: any) => void
}

const Navbar: NextPage<Props> = ({ selectedSection, setSelectedSection }) => {

    return (
        <nav className='py-5 flex justify-between flex-1'>
            <div className='flex items-center gap-2'>
                <div className='bg-[#643bff] w-9 sm:w-7 h-9 sm:h-7 p-0.5 rounded-md overflow-hidden'>
                    <Image width={50} height={50} src={logo} alt='logo' />
                </div>
                <h1 className='text-2xl font-bold hidden md:block'>devlinks</h1>
            </div>
            <div className='flex items-center text-sm'>
                <div onClick={() => setSelectedSection('links')} className={twMerge('px-6 py-2 flex justify-center items-center gap-2 rounded-md cursor-pointer select-none text-gray-600 duration-300', selectedSection === 'links' && 'bg-[#653bff1a] text-[#643bff]')}>
                    <FaLink className='w-5 h-5' />
                    <span className='hidden lg:block'>Links</span>
                </div>
                <div onClick={() => setSelectedSection('profile')} className={twMerge('px-6 py-2 flex justify-center items-center gap-2 rounded-md cursor-pointer select-none text-gray-600 duration-300', selectedSection === 'profile' && 'bg-[#653bff1a] text-[#643bff]')}>
                    <FaRegUserCircle className='w-5 h-5' />
                    <span className='hidden lg:block'>Profile</span>
                </div>
            </div>
            <div className='flex items-center gap-2 text-sm'>
                <div className={twMerge('border px-3 md:px-4 py-2 rounded-md border-[#643bff] text-[#643bff] cursor-pointer select-none duration-300 hover:bg-[#653bff1a]')}>
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