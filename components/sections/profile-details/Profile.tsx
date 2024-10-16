import { NextPage } from 'next'
import Image from 'next/image'
import userImage from '@/images/user.png'
import PrimaryButton from '@/components/shared/PrimaryButton'
import InputField from '@/components/shared/InputField'
import { UserTypes } from '@/types/types'
import ImageUpload from '@/components/image-upload/ImageUpload'
import { useState } from 'react'
import toast from 'react-hot-toast'
import fetchHandler from '@/components/fetchHandler'

export const metadata = {
  title: 'Profile | Link-Sharing',
};

interface Props {
  userData: UserTypes,
  setUserData: (e) => void
}

const Profile: NextPage<Props> = ({ userData, setUserData }) => {
  const { firstname, lastname, email, username } = userData
  const [imageUploading, setImageUploading] = useState<boolean>(false)

  const uploadImageHandler = (img: string) => {
    setUserData((prevState: UserTypes) => {
      const newState = { ...prevState }
      newState.image = img
      return newState;
    })
  }

  const profileFieldHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserData((prevState: UserTypes) => {
      const newData: UserTypes = { ...prevState }
      newData[name] = value
      return newData;
    })
  }

  const saveProfileHandler = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!imageUploading) {
      const response = await fetchHandler({ route: 'user/update-profile', method: 'POST', data: { uid: userData.uid, firstname: userData.firstname, lastname: userData.lastname, image: userData.image, email: userData.email } })
      if (response?.success) toast.success(response.message)
    } else {
      toast.error('Uploading profile image. Please wait.')
    }
  }
  return (
    <form action={'submit'} onSubmit={saveProfileHandler} className='pt-10 col-span-3 px-3 md:px-5 text-[#808080] h-full flex flex-col justify-between overflow-hidden'>
      <div>
        <h1 className='text-2xl font-bold text-slate-800'>Profile Details - {username}</h1>
        <p className='my-3'>Add your details to create a personal touch to your profile.</p>
      </div>
      <div className='mt-3 md:mt-5 h-full flex flex-col gap-3 px-3 overflow-auto'>
        <div className='md:grid grid-cols-3'>
          <label className='text-base col-span-1 md:flex items-center' htmlFor="profile picture">Profile picture<span className='md:hidden'>:</span></label>
          <div className='w-full flex flex-col gap-3 md:gap-1 mt-2 md:mt-0 items-center md:items-start justify-center col-span-2'>
            <div className='flex flex-col md:flex-row justify-center items-center gap-3 md:gap-5'>
              <div className='border border-slate-200 object-cover rounded-xl w-[125px] h-[125px] relative flex justify-center items-center overflow-hidden'>
                <Image
                  className='w-[125px] h-[125px] object-cover'
                  width={125}
                  height={125}
                  alt='profile'
                  src={userData.image || userImage}
                />
              </div>
              <p className='text-sm md:flex-1'>Image must be of PNG, JPG, JPEG format.</p>
            </div>
            <ImageUpload image={userData.image} setImage={uploadImageHandler} setImageUploading={setImageUploading} email={userData.email} />
          </div>
        </div>
        <InputField
          className='md:grid grid-cols-3'
          labelClassName='md:flex md:items-center'
          onChangeHandler={profileFieldHandler}
          data={{ name: 'username', label: 'Username*', placeholder: 'Username', type: 'text', defaultValue: username }}
          disabled={true}
        />
        <InputField
          className='md:grid grid-cols-3'
          labelClassName='md:flex md:items-center'
          onChangeHandler={profileFieldHandler}
          data={{ name: 'firstname', label: 'Firstname*', placeholder: 'Firstname', type: 'text', defaultValue: firstname }}
        />
        <InputField
          className='md:grid grid-cols-3'
          labelClassName='md:flex md:items-center'
          onChangeHandler={profileFieldHandler}
          data={{ name: 'lastname', label: 'Lastname*', placeholder: 'lastname', type: 'text', defaultValue: lastname }}
        />
        <InputField
          className='md:grid grid-cols-3'
          labelClassName='md:flex md:items-center'
          onChangeHandler={profileFieldHandler}
          data={{ name: 'email', label: 'Email*', placeholder: 'Email', type: 'email', defaultValue: email }}
        />
      </div>
      <div className='border-t border-gray-300 mt-3 md:flex'>
        <PrimaryButton name='Save' className='my-3 w-full md:w-auto md:px-12 md:ml-auto' variant='fill' />
      </div>
    </form>
  )
}

export default Profile