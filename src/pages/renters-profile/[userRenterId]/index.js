import React from 'react'

function index() {
  return (
    <>
    <NavBarRentersProfile />
    <main>
      <div className='small-container flex-1 overflow-auto'>
        <h1>{accountName} Profile</h1>
        


          
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
      id: JSON.parse(context.params.userId),
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
          isSuspende: true
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