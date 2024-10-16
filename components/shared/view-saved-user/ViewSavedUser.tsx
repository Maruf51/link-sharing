import { UserTypes } from '@/types/types'
import { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { MdDelete } from 'react-icons/md'
import DeleteModal from '../DeleteModal'
import { useState } from 'react'
import { useSession } from 'next-auth/react'

interface Props {
    user: UserTypes,
    reloadData: () => void
}

const ViewSavedUser: NextPage<Props> = ({ user, reloadData }) => {
    const { firstname, lastname, email, image, username } = user
    const router = useRouter()
    const session = useSession()
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    return (
        <>
            <div className='w-full bg-slate-200 p-2 rounded-sm flex items-center gap-2'>
                <Image
                    width={50}
                    height={50}
                    alt='profile'
                    src={image}
                    className='object-cover w-[50px] h-[50px] rounded-sm cursor-pointer'
                    onClick={() => router.push(`/links/${username}`)}
                />
                <div className='overflow-hidden flex-1'>
                    <h1 className='text-slate-800 text-lg font-medium truncate overflow-hidden cursor-pointer' onClick={() => router.push(`/links/${username}`)}>{firstname} {lastname} - {username}</h1>
                    <a href={`mailto:${email}`} className='text-sm truncate overflow-hidden cursor-pointer'>{email}</a>
                </div>
                <div className='w-8 h-8 bg-white flex justify-center items-center rounded-sm text-slate-600 hover:text-[#643bff] cursor-pointer duration-300 p-1.5' onClick={() => setIsModalOpen(true)} >
                    <MdDelete className='w-full h-full' />
                </div>
            </div>
            {
                isModalOpen && <DeleteModal setIsModalOpen={setIsModalOpen} user={session?.data?.user?.name || ''} username={username} reloadData={reloadData} />
            }
        </>
    )
}

export default ViewSavedUser