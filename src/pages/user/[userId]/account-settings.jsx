import ButtonContent from '@/common/ButtonContent'
import { UserContext } from '@/common/contexts/user-context'
import NavBarSearch from '@/modules/rentee-booking/NavBarSearch'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'

function AccountSettings({user}) {
  const router = useRouter()
  const { accountId, userRenteeId } = useContext(UserContext)

  return (
    <>
      <NavBarSearch />
      <main>
        <div className='medium-container max-w-[850px] flex-1 overflow-auto'>
          <h1 className='heading'>Account</h1>

          <h2 className='text-lg font-semibold'>{user.name}, <span className='font-normal'>{user.email}</span><span className='font-medium'> ~ <Link href={`/user/${accountId}`} >Go To Profile</Link></span></h2>

          <div className='grid grid-cols-3 gap-5 p-5'>
            
              <ButtonContent buttonName='' isSelected='false' onSelectHandler={() => router.push(`/user/${userRenteeId}/edit-user-profile`)}>
                <>
                  <h3 className='primary-text mb-4'>Personal Info</h3>
                  <p className='secondary-text'>Provide Personal Detatils and how we can help you</p>
                </>
              </ButtonContent>
              <ButtonContent buttonName='' isSelected='false' onSelectHandler={() => router.push(`/user/${userRenteeId}/login-and-security`)}>
                <>
                  <h3 className='primary-text mb-4'>Login and Security</h3>
                  <p className='secondary-text'>Update your password and secure your account</p>
                </>
              </ButtonContent>
              <ButtonContent buttonName='' isSelected='false' onSelectHandler={() => router.push(`/user/${userRenteeId}/payments-and-payouts`)}>
                <>
                  <h3 className='primary-text mb-4'>Payments and Payouts</h3>
                  <p className='secondary-text'>Review bank detsils and payouts.</p>
                </>
              </ButtonContent>
              <ButtonContent buttonName='' isSelected='false' onSelectHandler={() => router.push(`/user/${userRenteeId}/taxes`)}>
                <>
                  <h3 className='primary-text mb-4'>Taxes</h3>
                  <p className='secondary-text'>Manage taxpayer information and documentation</p>
                </>
              </ButtonContent>
              <ButtonContent buttonName='' isSelected='false' onSelectHandler={() => router.push(`/user/${userRenteeId}/notifications`)}>
                <>
                  <h3 className='primary-text mb-4'>Notifications</h3>
                  <p className='secondary-text'>Choose notification settings and how you want to be contacted</p>
                </>
              </ButtonContent>
              <ButtonContent buttonName='' isSelected='false' onSelectHandler={() => router.push(`/user/${userRenteeId}/privacy-and-sharing`)}>
                <>
                  <h3 className='primary-text mb-4'>Privacy and Sharing</h3>
                  <p className='secondary-text'>Manage personal data, connected services and data sharing</p>
                </>
              </ButtonContent>
              <ButtonContent buttonName='' isSelected='false' onSelectHandler={() => router.push(`/user/${userRenteeId}/global-preferences`)}>
                <>
                  <h3 className='primary-text mb-4'>Global Preferences</h3>
                  <p className='secondary-text'>Set your default language, currency and timezone</p>
                </>
              </ButtonContent>
              <ButtonContent buttonName='' isSelected='false' onSelectHandler={() => router.push(`/user/${userRenteeId}/work-and-business`)}>
                <>
                  <h3 className='primary-text mb-4'>Work or Business</h3>
                  <p className='secondary-text'>Set up and manage business expenses</p>
                </>
              </ButtonContent>
              <ButtonContent buttonName='' isSelected='false' onSelectHandler={() => router.push(`/user/${userRenteeId}/deactivation`)}>
                <>
                  <h3 className='primary-text mb-4'>Deactivating your account</h3>
                  <p className='secondary-text'>We will be sorry to see you go</p>
                </>
              </ButtonContent>
          </div>

          


            
        </div>
      </main>
    </>
  )
}

export default AccountSettings

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
        reviews: true,
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