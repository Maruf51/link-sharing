import ViewLinks from '@/components/shared/view-links/ViewLinks';
import { NextPage } from 'next'
import { getServerSession } from 'next-auth';

const base_url = process.env.NEXT_PUBLIC_BASE_URL;

interface Props {
    params: {
        username: string;
    }
}

export const generateMetadata = ({ params }: Props) => ({
    title: `${params?.username || 'Link'} | Link-Sharing`,
})

const Page: NextPage<Props> = async ({ params }) => {
    const session = await getServerSession()

    const response = await fetch(`${base_url}/api/user/get?username=${params?.username}`, {
        method: 'GET',
        cache: 'no-store',
    });
    const user = await response.json()

    return (
        <>
            <ViewLinks success={user.success} userData={user?.data} username={session?.user?.name || null} />
        </>
    )
}

export default Page