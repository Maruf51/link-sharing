import fetchHandler from '@/components/fetchHandler';
import ViewSavedUser from '@/components/shared/view-saved-user/ViewSavedUser';
import { UserTypes } from '@/types/types';
import { NextPage } from 'next'
import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

export const metadata = {
    title: 'Links | Link-Sharing',
};

interface Props {
    username: string,
}

const Saved: NextPage<Props> = ({ username }) => {
    const [searchValue, setSearchValue] = useState<string>('')
    const [savedUsers, setSavedUsers] = useState<UserTypes[]>([])
    const [fetchedSavedUsers, setFetchedSavedUsers] = useState<UserTypes[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        if (searchValue && fetchedSavedUsers[0]) {
            const searchedUsers = fetchedSavedUsers.filter(user =>
                user.firstname.toLowerCase().includes(searchValue.toLowerCase()) ||
                user.lastname.toLowerCase().includes(searchValue.toLowerCase()) ||
                user.email.toLowerCase().includes(searchValue.toLowerCase()) ||
                user.username.toLowerCase().includes(searchValue.toLowerCase())
            )
            setSavedUsers(searchedUsers)
        } else {
            setSavedUsers(fetchedSavedUsers)
        }
    }, [searchValue])

    const fetchUsernames = async () => {
        setLoading(true)
        const response = await fetchHandler({ route: '/user/get-saved', method: 'POST', data: { username } })
        if (response.success) {
            setSavedUsers(response.data)
            setFetchedSavedUsers(response.data)
            setLoading(false)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchUsernames()
    }, [username])

    return (
        <div className='pt-10 pb-5 col-span-3 px-3 md:px-5 text-[#808080] h-full flex flex-col justify-between overflow-hidden'>
            <div>
                <h1 className='text-2xl font-bold text-slate-800'>Saved profiles</h1>
                <p className='my-3'>Search saved links or remove saved links from here!</p>
            </div>
            <div className='relative w-full'>
                <input
                    className='border w-full h-11 pl-10 pr-3 text-sm border-gray-200 rounded-md outline-none text-slate-700'
                    name='search'
                    type='text'
                    placeholder="Search by name/email/username"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                <FaSearch className='w-11 h-11 absolute top-0 left-0 p-3' />
            </div>
            <div className='mt-3 w-full h-full flex flex-col gap-2 overflow-auto'>
                {
                    loading && <p className='w-full text-center my-10'>Loading data...</p>
                }
                {
                    !loading && !searchValue && !savedUsers[0] && <p className='w-full text-center my-5'>There is no saved user.</p>
                }
                {
                    searchValue && !savedUsers[0] && <p className='w-full text-center my-5'>There is no saved user with the parameter "{searchValue}".</p>
                }
                {
                    !loading && savedUsers[0] && savedUsers.map((user: UserTypes, index: number) => <ViewSavedUser key={index} user={user} reloadData={fetchUsernames} />)
                }
            </div>
        </div>
    )
}

export default Saved