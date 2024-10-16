'use client'

import { NextPage } from 'next'
import { useState } from 'react'
import fetchHandler from '../fetchHandler'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import PrimaryButton from './PrimaryButton'

interface Props {
    user: string,
    username: string,
    setIsModalOpen: (e: any) => void,
    reloadData: () => void
}

const DeleteModal: NextPage<Props> = ({ user, username, setIsModalOpen, reloadData }) => {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const deleteHandler = async (e: any) => {
        e.preventDefault()

        setLoading(true)
        const response = await fetchHandler({ route: `user/update-saved`, method: 'POST', data: { user, action: 'remove', username } })
        if (response.success === true) {
            toast.success(response.message)
            setLoading(false)
            reloadData()
            router.refresh()
            setIsModalOpen(false)
        }
        setLoading(false)
    }
    return (
        <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[10] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif] backdrop-blur-sm">
            <div className='absolute w-full h-full top-0 left-0' onClick={() => setIsModalOpen(false)}></div>
            <div className="w-full max-w-md primary-bg shadow-lg rounded-lg p-6 relative bg-white z-20">
                <div className="mb-8">
                    <h4 className="text-slate-800 text-xl font-semibold">Are you absolutely sure?</h4>
                    <p className="secondary-text text-sm mt-4">This action cannot be undone. This will permanently remove this profile.</p>
                </div>

                <div className="flex justify-end gap-2 text-slate-800">
                    <PrimaryButton
                        handler={true}
                        handleClick={() => setIsModalOpen(false)}
                        disabled={loading}
                        name={'Cancel'}
                        className='disabled:bg-white disabled:text-[#633aff] px-5'
                    />
                    <PrimaryButton
                        handler={true}
                        handleClick={deleteHandler}
                        disabled={loading}
                        name={'Delete'}
                        variant='fill'
                        className='bg-red-500 disabled:bg-red-500 border-red-600 hover:bg-red-600 duration-300 px-5'
                    />
                </div>
            </div>
        </div>
    )
}

export default DeleteModal