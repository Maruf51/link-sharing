import { NextPage } from 'next'
import Image from 'next/image'
import userImage from '@/images/user.png'
import PrimaryButton from '@/components/shared/PrimaryButton'
import InputField from '@/components/shared/InputField'
import { UserTypes } from '@/types/types'
import { IoImageOutline } from 'react-icons/io5'
import ImageUpload from '@/components/image-upload/ImageUpload'
import { useState } from 'react'

interface Props {
  userData: UserTypes,
  setUserData: (e: any) => void
}

const Profile: NextPage<Props> = ({ userData, setUserData }) => {
  const { firstname, lastname, email } = userData
  const [image, setImage] = useState<string>(userData.image)
  const [imageUploading, setImageUploading] = useState<boolean>(false)

  const profileFieldHandler = (e: any) => {
    const { name, value } = e.target
    setUserData((prevState: UserTypes) => {
      let newData: any = { ...prevState }
      newData[name] = value
      return newData;
    })
  }

  const saveProfileHandler = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault
  }
  return (
    <form action={'submit'} onSubmit={saveProfileHandler} className='pt-10 col-span-3 px-3 md:px-5 text-[#808080] h-full flex flex-col justify-between overflow-hidden'>
      <div>
        <h1 className='text-2xl font-bold text-slate-800'>Profile Details</h1>
        <p className='my-3'>Add your details to create a personal touch to your profile.</p>
      </div>
      <div className='mt-3 h-full flex flex-col gap-3 px-3 overflow-auto'>
        <ImageUpload image={image} setImage={setImage} setImageUploading={setImageUploading} email={userData.email} />
        <div>
          <label className='text-base' htmlFor="profile picture">Profile picture<span className='md:hidden'>:</span></label>
          <div className='w-full flex flex-col gap-3 items-center justify-center'>
            <div className='border border-slate-200 object-cover rounded-xl w-[125px] h-[125px] relative flex justify-center items-center overflow-hidden cursor-pointer'>
              <Image
                className='w-full h-full object-cover'
                width={125}
                height={125}
                alt='profile'
                src={userImage}
              />
              <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center flex-col gap-2 bg-[#00000070] text-white opacity-100 lg:opacity-0 hover:opacity-100 duration-300'>
                <IoImageOutline className='w-7 h-7' />
                <p className='text-sm'>Change Image</p>
              </div>
            </div>
            <p className='text-sm'>Image must be of PNG, JPG, JPEG format.</p>
          </div>
        </div>
        <InputField
          onChangeHandler={profileFieldHandler}
          data={{ name: 'firstname', label: 'Firstname*', placeholder: 'Firstname', type: 'text', defaultValue: firstname }}
        />
        <InputField
          onChangeHandler={profileFieldHandler}
          data={{ name: 'lastname', label: 'Lastname*', placeholder: 'lastname', type: 'text', defaultValue: lastname }}
        />
        <InputField
          onChangeHandler={profileFieldHandler}
          data={{ name: 'email', label: 'Email*', placeholder: 'Email', type: 'email', defaultValue: email }}
        />
      </div>
      <div className='border-t border-gray-300 mt-3 md:flex'>
        <PrimaryButton name='Save' className='my-3 w-full md:w-auto md:px-12 md:ml-auto bg-[#633aff] text-white ' />
      </div>
    </form>
  )
}

export default Profile