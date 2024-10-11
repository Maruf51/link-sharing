import { UserTypes } from '@/types/types'
import { NextPage } from 'next'
import Image from 'next/image'
import userImage from '@/images/user.png'
import { twMerge } from 'tailwind-merge'
import LinkView from './LinkView'

interface Props {
    selectedSection: String,
    userData: UserTypes,
    addedLinks: any
}

const MobileView: NextPage<Props> = ({ selectedSection, userData, addedLinks }) => {
    return (
        <div className='hidden lg:flex col-span-2 w-full h-full justify-center items-center overflow-auto'>
            <div className='w-[260px] h-[500px] border border-gray-400 rounded-[30px] flex justify-center items-center relative'>
                <div className='w-[245px] h-[485px] border border-gray-400 rounded-[22px] flex flex-col gap-2 justify-center items-center bg-white overflow-hidden'>
                    <div className='w-[75px] h-[20px] border border-gray-400 border-t-0 absolute top-[7px] rounded-b-md'>
                        <div className='w-[73px] h-[10px] absolute -top-1 bg-white'>
                        </div>
                    </div>
                    <div className='w-[75px] h-[75px] rounded-full overflow-hidden'>
                        <Image
                            className='w-full h-full object-cover border-[3px] border-[#633aff] rounded-full'
                            width={75}
                            height={75}
                            alt='Profile'
                            src={userData.image || userImage}
                        />
                    </div>
                    <h1 className={twMerge('text-md font-medium truncate')}>{userData.firstname} {userData.lastname}</h1>
                    <a href={`mailto:${userData.email}`} className='text-slate-600 text-xs cursor-pointer'>{userData.email}</a>
                    <div className='w-[80%] mt-3'>
                        {
                            addedLinks[0] ? <LinkView data={addedLinks} />
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
                </div>
            </div>
        </div>
    )
}

export default MobileView