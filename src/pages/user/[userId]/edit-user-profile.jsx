import { prisma } from '@/database/db'
import NavBarSearch from '@/modules/rentee-booking/NavBarSearch'
import EditProfileForm from '@/modules/user-profile/components/EditProfileForm'
import Image from 'next/image'
import React from 'react'

function EditUserProfile({user}) {

  console.log('user')
  console.log(user)
  
  const editPictureHandler = () => {
    console.log('open edit pic modal')
  }

  return (
    <>
      <NavBarSearch />
      <main>
        <div className='medium-container max-w-[850px] flex-1 overflow-auto'>
          <h1 className='heading'>Edit Profile</h1>

          <div className='grid grid-cols-8'>
            <div className='col-span-3' >
              <div className='relative rounded-full border w-60 h-60 m-auto' >
                <Image
                  src={user.profilePictureUrl || 'https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png'}
                  className="object-cover -z-10"
                  fill
                  alt='item image'
                />
                <div className='absolute -bottom-5 inset-x-1/3 border rounded-full w-1/3 h-10 text-center pt-2 bg-white hover:cursor-pointer hover:border-4 hover:pt-1' onClick={editPictureHandler}>
                  Edit
                </div>
              </div>
            </div>
            <div className='col-span-5' >
              <EditProfileForm user={user} />
            </div>

          </div>
        </div>
      </main>
    </>
  )
}

export default EditUserProfile

export async function getServerSideProps(context) {

  console.log("getting ssP's")
  const user = await prisma.account.findUnique({
    where: {
      id: 15,
    },
    select: {
      id: true,
      createdAt: true,
      updatedAt: true,
      name: true,
      email: true,
      emailVerifiedOn: true,
      phoneNumber: true,
      phoneNumberVerifiedOn: true,
      homeAddress: true,
      identificationDoc1url: true,
      identificationDoc2url: true,
      identifyingImageUrl: true,
      profilePictureUrl: true,
      identityDocumentsVerifiedOn: true,
      userRenteeProfile: true,
      isRenter: true,
      userRenterProfile: true,
      accountBlacklistedOn: true, 
    },
  })

  return {
    props: {
      user: JSON.parse(JSON.stringify(user))         // this JSON hack is required as the Date Object in mysql cannot be seriealised hence cannot be sent from backend to frontend.
    }
  }
}