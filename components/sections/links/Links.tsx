import { platforms } from '@/assets/data'
import fetchHandler from '@/components/fetchHandler'
import InputFieldIcon from '@/components/shared/InputFieldIcon'
import PrimaryButton from '@/components/shared/PrimaryButton'
import { UserTypes } from '@/types/types'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { twMerge } from 'tailwind-merge'

interface Props {
    userData: UserTypes,
    addedLinks: any,
    setAddedLinks: (e: any) => void
}

const Links: NextPage<Props> = ({ userData, addedLinks, setAddedLinks }) => {
    const { links } = userData
    const [platformLists, setPlatformLists] = useState([...platforms.all])


    useEffect(() => {
        const excludedPlatforms = addedLinks.map((link: any) => link.platform);
        const filteredPlatforms = platforms.all.filter((platform: any) => !excludedPlatforms.includes(platform));

        setPlatformLists(filteredPlatforms);
    }, [addedLinks])

    const handleAddPlatform = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setAddedLinks((prevState: any) => {
            return [...prevState, { platform: platformLists[0], link: '' }]
        })
    }

    const saveLinkshandler = async (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (addedLinks.length === 0) {
            toast.error('There is no link to save. Please add one.')
        } else {
            const response = await fetchHandler({ route: 'user/update-links', method: 'POST', data: { uid: userData.uid, links: addedLinks } })
            if (response?.success) toast.success(response.message)
        }
    }
    return (
        <form action={'submit'} onSubmit={saveLinkshandler} className='pt-10 col-span-3 px-3 md:px-5 text-[#808080] h-full flex flex-col justify-between overflow-hidden'>
            <div>
                <h1 className='text-2xl font-bold text-slate-800'>Customize your links</h1>
                <p className='my-3'>Add/edit/remove links below and then share all your profiles with the world!</p>
                <button
                    className={twMerge('border border-[#633aff] rounded-md text-[#633aff] p-2 duration-300 hover:text-white hover:bg-[#633aff] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-[#633aff] w-full')}
                    onClick={handleAddPlatform}
                    type='button'
                    disabled={platformLists[0] ? false : true}
                >
                    + Add new link
                </button>
            </div>
            <div className='mt-3 h-full flex flex-col gap-8 px-3 overflow-auto'>
                {
                    addedLinks.map((link: any, index: number) => <LinkEdit key={index} data={link} serial={index + 1} setAddedLinks={setAddedLinks} platformLists={platformLists} />)
                }
            </div>
            <div className='border-t border-gray-300 mt-3 md:flex'>
                <PrimaryButton name='Save' className='my-3 w-full md:w-auto md:px-12 md:ml-auto bg-[#633aff] text-white ' />
            </div>
        </form>
    )
}

export default Links

interface LinkEditProps {
    data: any,
    serial: number,
    setAddedLinks: (e: any) => void,
    platformLists: string[]
}
const LinkEdit: NextPage<LinkEditProps> = ({ data, serial, setAddedLinks, platformLists }) => {
    const { platform, link } = data
    const Icon = platforms[platform].icon

    const removeHandler = () => {
        setAddedLinks((prevState: any) => {
            return prevState.filter((plt: any) => plt.platform !== platform);
        });
    }

    const handlePlatformChage = (e: any) => {
        setAddedLinks((prevState: any) => {
            let newData = [...prevState]
            const getIndex = newData.findIndex((plt: any) => plt.platform === platform)
            if (getIndex !== -1) {
                newData[getIndex].platform = e.target.value;
            }

            return newData;
        })
    }

    const handleLinkChange = (e: any) => {
        setAddedLinks((prevState: any) => {
            let newData = [...prevState]
            const getIndex = newData.findIndex((plt: any) => plt.platform === platform)
            if (getIndex !== -1) {
                newData[getIndex].link = e.target.value;
            }

            return newData;
        })
    }
    return (
        <div className='flex flex-col gap-1.5'>
            <div className='flex items-center justify-between'>
                <h2 className='text-lg font-semibold'>= Link #{serial}</h2>
                <span onClick={removeHandler} className='hover:underline cursor-pointer'>Remove</span>
            </div>
            <div className='flex flex-col'>
                <label htmlFor={`platform${serial}`}>Platform</label>
                <div className='relative w-full'>
                    <Icon className='w-11 h-11 absolute top-0 left-0 p-3' />
                    <select onChange={(e: any) => handlePlatformChage(e)} className='outline-none w-full h-11 pl-10 pr-3 rounded-md bg-white border border-gray-200 capitalize cursor-pointer text-slate-600' name="platform" value={platform} id={`platform${serial}`}>
                        <option value={platform}>{platform}</option>
                        {
                            platformLists.map((pltfrm: string, index: number) => <option key={index} value={pltfrm}>{pltfrm}</option>)
                        }
                    </select>
                </div>
            </div>
            <InputFieldIcon onChangeHandler={handleLinkChange} data={{ name: platform, label: 'Link', placeholder: 'www.xxxxx.com', type: 'text', value: link }} />
        </div>
    )
}