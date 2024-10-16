import SigninForm from '@/components/forms/SigninForm'
import { NextPage } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'


interface Props { }

const Page: NextPage<Props> = async ({ }) => {
  const session: any = await getServerSession()

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