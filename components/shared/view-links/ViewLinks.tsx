'use client'

import { UserTypes } from '@/types/types'
import { NextPage } from 'next'
import { FaBookmark, FaRegBookmark } from 'react-icons/fa'
import Image from 'next/image'
import userImage from '@/images/user.png'
import { twMerge } from 'tailwind-merge'
import LinkView from '../LinkView'
import toast from 'react-hot-toast'
import ViewNavbar from './view-navbar/ViewNavbar'
import { useEffect, useState } from 'react'
import fetchHandler from '@/components/fetchHandler'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'


interface Props {
  userData: UserTypes,
  username: string | null,
  success: boolean
}


const ViewLinks: NextPage<Props> = ({ userData, username, success }) => {
  const [saved, setSaved] = useState<boolean>(false)
  const { data: session } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchHandler({ route: `user/get?username=${username}`, method: 'GET' })
      if (success) setSaved(response.data.saved.includes(userData.username))
    }
    if (username) {
      fetchData()
    }
  }, [username])

  const saveHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!loading && session?.user?.name) {
      setLoading(true)
      if (saved) {
        const response = await fetchHandler({ route: `user/update-saved`, method: 'POST', data: { user: username, action: 'remove', username: userData.username } })
        if (response.success) {
          toast.success('Profile removed')
          setSaved(false)
          setLoading(false)
        }
      } else {
        const response = await fetchHandler({ route: `user/update-saved`, method: 'POST', data: { user: username, action: 'save', username: userData.username } })
        if (response.success) {
          toast.success('Profile saved')
          setSaved(true)
          setLoading(false)
        }
      }
    } else {
      router.push('/signin')
    }
  }
  return (
    <div className='w-full h-full'>
      <div className='w-full h-[40%] bg-[#633bfe] rounded-b-3xl absolute top-0 left-0'></div>
      <div className='max-w-[1200px] w-full h-full mx-auto p-5 z-10 relative'>
        <ViewNavbar userData={userData} username={username} success={success} />
        <div className='w-full h-full absolute top-0 left-0 flex justify-center items-center p-5 z-10'>
          <div className='shadow-equal bg-white w-full h-fit mt-[86px] md:max-w-80 rounded-lg p-10 lg:p-8 flex flex-col justify-center items-center relative max-h-[75%]'>
            {
              success === false ?
                <h1 className='text-center block'>There is no user with this username!</h1>
                :
                <>
                  <div className='flex-1 flex flex-col items-center'>
                    <div className='w-[125px] h-[125px] rounded-full relative'>
                      <Image
                        className='w-full h-full object-cover border-[3px] border-[#633aff] rounded-full'
                        width={125}
                        height={125}
                        alt='Profile'
                        src={userData.image || userImage}
                      />
                      {
                        success && userData.username !== username &&
                        <button type='button' onClick={saveHandler} className='absolute top-2 left-2 bg-[#643bff] text-white w-6 h-6 border border-slate-200 p-1 rounded-full cursor-pointer'>
                          {
                            saved ? <FaBookmark className=' w-full h-full' /> : <FaRegBookmark className=' w-full h-full' />
                          }
                        </button>
                      }
                    </div>
                    <h1 className={twMerge('text-2xl font-semibold text-center truncate overflow-hidden mt-5')}>{userData.firstname} {userData.lastname}</h1>
                    <a href={`mailto:${userData.email}`} className='text-slate-600 text-center truncate text-sm cursor-pointer overflow-hidden w-full'>{userData.email}</a>
                  </div>
                  <div className='w-full mt-5 overflow-auto'>
                    {
                      userData?.links[0] ? <LinkView data={userData?.links} />
                        :
                        <div className='flex flex-col gap-2.5'>
                          <div className={twMerge('bg-[#eeeeee] w-full h-9 rounded-md')}>
                          </div>
                          <div className={twMerge('bg-[#eeeeee] w-full h-9 rounded-md')}>
                          </div>
                          <div className={twMerge('bg-[#eeeeee] w-full h-9 rounded-md')}>
                          </div>
                        </div>
                    }
                  </div>
                </>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewLinks