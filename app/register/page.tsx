import RegisterForm from '@/components/forms/RegisterForm'
import { NextPage } from 'next'

interface Props { }

const Page: NextPage<Props> = ({ }) => {
    return (
        <div className='w-full h-full flex justify-center items-center bg-[#fafafa]'>
            <RegisterForm />
        </div>
    )
}

export default Page