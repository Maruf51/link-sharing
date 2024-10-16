import { UserTypes } from '@/types/types'
import { NextPage } from 'next'
import PrimaryButton from '../../PrimaryButton'
import { useRouter } from 'next/navigation'
import { FaRegCopy } from 'react-icons/fa'
import Image from 'next/image'
import logo from '@/images/connect.png'
import toast from 'react-hot-toast'

const base_url = process.env.NEXT_PUBLIC_BASE_URL

interface Props {
  userData: UserTypes,
  username: string | null,
  success: boolean
}

const btnClassName = 'px-5'

const ViewNavbar: NextPage<Props> = ({ userData, username, success }) => {
  const router = useRouter()

  const copyButtonHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const linkToCopy = `${base_url}/links/${userData.username}`;
      await navigator.clipboard.writeText(linkToCopy);
      toast.success('Link Copied.');
    } catch (error) {
      console.log(error?.message || error)
      toast.error('Failed to copy!');
    }
  };

  const shareButtonHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const linkToShare = `${base_url}/links/${userData.username}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check out this link!',
          url: linkToShare,
        });
        toast.success('Link shared successfully!');
      } catch (error) {
        console.error('Error sharing:', error);
        toast.error('Failed to share the link.');
      }
    } else {
      toast.error('Web Share API is not supported in this browser.');
    }
  }
  return (
    <nav className='w-full flex bg-white p-3 rounded-lg justify-between items-center z-20 relative'>
      {
        success && username ?
          (userData.username === username ?
            <>
              <PrimaryButton
                name={<span className='flex items-center gap-1'><span className='hidden md:block'> Back to</span>Editor</span>}
                className={btnClassName}
                handler={true}
                handleClick={() => router.push('/home')}
              />
              <PrimaryButton
                name={<span className='flex items-center gap-2'><FaRegCopy /><span className='hidden md:block'>Copy Link</span></span>}
                className={`${btnClassName} h-10`}
                variant='fill'
                handler={true}
                handleClick={copyButtonHandler}
              />
              <PrimaryButton
                name={<span className='flex items-center gap-1'>Share<span className='hidden md:block'> Link</span></span>}
                variant='fill'
                className={btnClassName}
                handler={true}
                handleClick={shareButtonHandler}
              />
            </>
            :
            <>
              <div className='flex items-center gap-2 cursor-pointer' onClick={() => router.push('/')}>
                <div className='bg-[#643bff] w-9 sm:w-7 h-9 sm:h-7 p-0.5 rounded-md overflow-hidden'>
                  <Image width={50} height={50} src={logo} alt='logo' />
                </div>
                <h1 className='text-2xl font-bold text-[#633bfe]'>devlinks</h1>
              </div>
              <PrimaryButton
                name={'Home'}
                className={btnClassName}
                handler={true}
                handleClick={() => router.push('/home')}
              />
            </>)
          :
          <>
            <div className='flex items-center gap-2 cursor-pointer' onClick={() => router.push('/')}>
              <div className='bg-[#643bff] w-9 sm:w-7 h-9 sm:h-7 p-0.5 rounded-md overflow-hidden'>
                <Image width={50} height={50} src={logo} alt='logo' />
              </div>
              <h1 className='text-2xl font-bold text-[#633bfe]'>devlinks</h1>
            </div>
            <PrimaryButton
              name={'Signin'}
              className={btnClassName}
              handler={true}
              handleClick={() => router.push('/signin')}
            />
          </>
      }
    </nav>
  )
}

export default ViewNavbar