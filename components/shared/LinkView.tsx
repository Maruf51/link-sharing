import { platforms } from '@/assets/data'
import { NextPage } from 'next'
import { FaArrowRight } from 'react-icons/fa6'
import { twMerge } from 'tailwind-merge'

interface Props {
    data: any
}

const LinkView: NextPage<Props> = ({ data }) => {

    return (
        <div className='flex flex-col justify-center gap-2 w-full'>
            {
                data[0] && data.map((link: any, index: number) => <SingleLink key={index} data={link} />)
            }
        </div>
    )
}

export default LinkView


interface SingleLinkProps {
    data: any
}

const SingleLink: NextPage<SingleLinkProps> = ({ data }) => {
    const { platform, link } = data
    const selectedPlatform = platforms[platform]
    const { name, icon, color } = selectedPlatform

    const Icon = icon
    return (
        <a href={link} target='_blank' style={{ background: color }} className={twMerge('w-full flex items-center gap-2 text-white px-3 py-3 md:py-2.5 rounded-md text-sm cursor-pointer')}>
            <Icon />
            <h2>{name}</h2>
            <FaArrowRight className='ml-auto duration-300' />
        </a>
    )
}