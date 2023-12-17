import ButtonMain from '@/common/ButtonMain'
import { UserContext } from '@/common/contexts/user-context'
import NavBarRentersProfile from '@/modules/renters-profile/components/NavbarRentersProfile'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'



function index() {

  const router = useRouter()

  const { accountName, userRenterId } = useContext(UserContext)

  return (
    <>
    <NavBarRentersProfile />
    <main>
      <div className='small-container flex-1 overflow-auto'>
        <h1>{accountName} Profile</h1>
        
        <ButtonMain variant='blackWhite' onSubmit={() => router.push(`/renters-profile/${userRenterId}/bookings`)} >See All Bookings</ButtonMain>


          
      </div>
    </main>
  </>
  )
}

export default index

export async function getServerSideProps(context) {

  console.log("getting ssP's")
  const items = await prisma.account.findUnique({
    where: {
      id: JSON.parse(context.params.userRenterId),
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
      userRenterProfile: {
        select: {
          createdAt: true,
          updatedAt: true,
          ownedItems: true,
          isUnrated: true,
          rating: true,
          avgResponseTime: true,
          reviewsWritten: true,
          transactionCount: true,
          claimsAgainst: true,
          isSuspended: true
        }
      },
      accountBlacklistedOn: true, 
    },
  })

  return {
    props: {
      items: JSON.parse(JSON.stringify(items))         // this JSON hack is required as the Date Object in mysql cannot be seriealised hence cannot be sent from backend to frontend.
    }
  }
}