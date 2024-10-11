'use client'

import { NextPage } from 'next'
import Navbar from '../navbar/Navbar'
import { UserTypes } from '@/types/types'
import { useState } from 'react'
import Links from '../links/Links'
import Profile from '../profile-details/Profile'
import MobileView from '@/components/shared/MobileView'

interface Props {
    data: UserTypes
}

const HomeDetails: NextPage<Props> = ({ data }) => {
    const [selectedSection, setSelectedSection] = useState<String>('links')
    const [addedLinks, setAddedLinks]: any = useState(data.links)
    const [userData, setUserData] = useState(data)
    return (
        <>
            <Navbar selectedSection={selectedSection} setSelectedSection={setSelectedSection} />
            <div className=' w-full h-full overflow-hidden lg:grid grid-cols-5'>
                <MobileView selectedSection={selectedSection} userData={userData} addedLinks={addedLinks} />
                {
                    selectedSection === 'links' ? <Links addedLinks={addedLinks} setAddedLinks={setAddedLinks} userData={userData} /> : <Profile userData={userData} setUserData={setUserData} />
                }
            </div>
        </>
    )
}

export default HomeDetails