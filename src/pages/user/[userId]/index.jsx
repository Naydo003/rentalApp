import ButtonGeneral from '@/common/ButtonGeneral'
import Modal from '@/common/components/UIElements/Modal'
import { UserContext } from '@/common/contexts/user-context'
import { prisma } from '@/database/db'
import NavBarSearch from '@/modules/rentee-booking/NavBarSearch'
import ReviewsSlider from '@/modules/user-profile/components/ReviewsSlider'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext, useState } from 'react'

function index({user}) {
  const [ modalContent, setModalContent ] = useState(null)

  const { accountId } = useContext(UserContext)

  const router = useRouter()

  let monthsOnXxx = Math.floor((new Date() - new Date(user.createdAt))/1000/60/60/24/30)
  let yearsOnXxx = Math.round((new Date() - new Date(user.createdAt))/1000/60/60/24/365)

  console.log('yearsOnXxx')
  console.log(monthsOnXxx)



  return (
    <>
    {!!modalContent && (
      <Modal isOpen={!!modalContent} handleClose={() => setModalContent(null)} >
        {modalContent}
      </Modal>
    )}
    <NavBarSearch />
    <main>
      <div className='large-container flex-1 overflow-auto'>
        
        <div className='grid grid-cols-3' >
          <div className='col-span-1' >
            <div className='border rounded-3xl h-60 flex flex-row shadow-lg mb-10' >
              <div className='relative w-[60%]' >
                <div className='relative w-32 h-32 mx-auto mt-6' >
                  <div className='relative rounded-full border w-32 h-32 overflow-hidden' >
                    <Image
                      src={user.profilePictureUrl || 'https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png'}
                      className="object-cover -z-10"
                      fill
                      sizes="(max-width: 768px) 50vw, 15vw"
                      alt='item image'
                      priority
                    />
                  </div>
                  
                  <div className='absolute bottom-0 right-0 rounded-full w-1/3 h-10 text-center bg-white' >
                    <svg className='w-10 h-10 mx-auto' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>

                  </div>
                </div>
                <h2 className='subheading text-lg text-center mt-2 mb-2'>{user.name}</h2>
                <p className='secondary-text-sm text-center'>{user.isRenter ? 'Renter & Leaser' : 'Renter'}</p>
              </div>
              <div className='w-[40%]' >
                <div className='mt-10 ml-4 mr-8 pb-4 border-b text-2xl' >
                  {user.userRenteeProfile.reviews.length}
                  <p className='secondary-text-sm'>reviews</p>
                </div>
                <div className='mt-2 ml-4 mr-8 mb-4 pb-4 text-2xl' >
                  {monthsOnXxx < 12 ? `${monthsOnXxx}` : `${yearsOnXxx}` }
                  <p className='secondary-text-sm'>{monthsOnXxx < 12 ? `months` : `years` } on xxxx</p>
                </div>
                
                
              </div>
              
              
            </div>
            
            <div className='border rounded-3xl h-fit flex flex-col shadow-lg mb-10 px-8 py-4' >

              <h2 className='subheading text-lg'>{user.name}'s verified information</h2>
              
              {user.identityDocumentsVerifiedOn ? (
                <div className='h-10 flex flex-row items-center' >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <p className='ml-4 secondary-text'> Identity</p>
                </div>    
              ) : (
                <div className='h-10 flex flex-row items-center' >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>

                  <p className='ml-4 secondary-text text-center'> Identity unverified</p>
                </div>
              )}

              {user.emailVerifiedOn ? (
                <div className='h-10 flex flex-row items-center' >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <p className='ml-4 secondary-text'> Email</p>
                </div>    
              ) : (
                <div className='h-10 flex flex-row items-center' >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>

                  <p className='ml-4 secondary-text text-center'> Email unverified</p>
                </div>
              )}

              {user.phoneNumberVerifiedOn ? (
                <div className='h-10 flex flex-row items-center' >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <p className='ml-4 secondary-text'> Phone Number</p>
                </div>    
              ) : (
                <div className='h-10 flex flex-row items-center' >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>

                  <p className='ml-4 secondary-text text-center'> Phone Number unverified</p>
                </div>
              )}
              
              <Link className='text-xs font-semibold underline my-4' href='#'>Learn about identity verification</Link>
              
              
            </div>
    
          </div>
          <div className='col-span-2 px-5 md:px-10' >

            <div className='border-b px-2 md:px-5' >
              <h1 className='heading'>{user.name} Profile</h1>
              <ButtonGeneral onSubmit={() => router.push(`/user/${user}/edit-user-profile`)} >Edit</ButtonGeneral>
  
              <p className='my-8'>Lives in {user.homeAddress}</p>
  
              <p className='mb-8'>About me para dcjkdjkdjkjddjckldjkjdkjdkj.</p>
            </div>

            <div className='border-b px-2 md:px-5' >
              <ReviewsSlider reviews={user.userRenteeProfile.reviews} name={user.name} setModalContent={setModalContent} />
            </div>
            <div className='px-2 md:px-5 mt-4'>
              <Link className='font-semibold underline' href={`/user/${accountId}/reviews`} >Reviews you've written</Link>
            </div>
          </div>
          
          
  
        </div>
        
          
      </div>
    </main>
  </>
  )
}

export default index



export async function getServerSideProps(context) {

  console.log("getting ssP's")
  const user = await prisma.account.findUnique({
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
      userRenteeProfile: {
        select: {
          recentSearch1: true,
          recentSearch2: true,
          recentSearch3: true,
          recentSearch4: true,
          isUnrated: true,
          rating: true,
          reviews: {
            select: {
              id: true,
              author: {
                select: {
                  userAccount: {
                    select: {
                      name: true,
                      profilePictureUrl: true
                    }
                  }
                }
              },
              createdAt: true,
              rating: true,
              publicComment: true,
            }
          },
          reviewsWritten: true,
          bookings: true,
          transactionCount: true,
          transactionValue: true,
        }
      },
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