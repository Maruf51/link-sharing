import HomeDetails from '@/components/sections/home-details/HomeDetails'
import { NextPage } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

const base_url = process.env.BASE_URL

export const metadata = {
  title: 'Home | Link-Sharing',
};

const Page: NextPage = async ({ }) => {
  const session = await getServerSession()

  if (!session?.user?.name) {
    redirect('/signin');
  }

  const response = await fetch(`${base_url}/api/user/get?username=${session?.user?.name}`, {
    method: 'GET',
    cache: 'no-store'
  });
  const user = await response.json();

  if(!user?.success) return <h1>Something went worng. Please reload the page.</h1>

  return (
    <div className="max-w-[1200px] w-full px-5 md:px-10 m-auto h-full flex flex-col overflow-hidden">
      <HomeDetails data={user.data} />
    </div>
  );
}

export default Page