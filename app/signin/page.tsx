import SigninForm from '@/components/forms/SigninForm'
import { NextPage } from 'next'

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <div className='w-full h-full flex justify-center items-center bg-[#fafafa]'>
      <SigninForm />
    </div>
  )
}

export default Page