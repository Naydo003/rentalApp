import React, { useContext } from 'react'
import Link from 'next/link'
import Logo from '../../../../public/next.svg'
import ProfileMenuButton from '@/modules/rentee-booking/ProfileMenuButton'
import SearchBar from '@/modules/rentee-booking/SearchBar'
import { UserContext } from '@/common/contexts/user-context'

function NavBarRentersProfile() {

  const { userRenterId } = useContext(UserContext)

  const openModal = () => {
    console.log('open a modal withh currency and language settings etc')
  }
  
  return (
    <>
      <div className='h-[100px] w-full flex flex-row items-center sm:justify-between px-5 lg:px-20 bg-[red]'>
        <Link className='hidden sm:block bg-blue-100' href='/'> 
          <Logo className='w-[50px] h-[50px]' />      
        </Link>
        

        <div className='flex flex-row justify-between items-center sm:space-x-4 sm:justify-end w-full'>

          <Link className='nav-link hidden sm:block' href='/'>Switch to User</Link> 
 
          <div>
            <span className='nav-link hidden sm:block' onClick={openModal}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
              </svg>
            </span>
          </div>
          
          <ProfileMenuButton variant='renter' />
        </div>
    </div>
      </>
  )
}


export default NavBarRentersProfile