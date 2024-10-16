import SigninForm from '@/components/forms/SigninForm'
import { NextPage } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'


const Page: NextPage = async ({ }) => {
  const session = await getServerSession()

  if (session?.user?.name) {
    redirect('/home')
  } else {
    return (
      <div className='w-full h-full flex justify-center items-center bg-[#fafafa]'>
        <SigninForm />
      </div>
    )
  }
}

export default Page