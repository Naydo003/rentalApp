import { UserContext } from '@/common/contexts/user-context'
import Link from 'next/link'
import React, { forwardRef, useContext, useEffect, useRef, useState } from 'react'
import { SignIn, UserButton } from '@clerk/nextjs'
import Modal from '@/common/components/UIElements/Modal'


const ProfileMenu = forwardRef(( props, ref ) => {
  // const [ signInOpen, setSignInOpen ] = useState(false)

  const { accountId, setAccountId, setAccountName, userRenteeId, setUserRenteeId, userRenterId, setUserRenterId, setProfileImage } = useContext(UserContext)
  const menuRef = useRef()
  const {isOpen, setIsOpen} = props
  // console.log(menuButtonRef.current)

  useEffect(() => {

    const closeMenu = (e) => {

      console.log(e.target)

      if (!ref.current.contains(e.target) && e.target !== menuRef.current) {
      setIsOpen(false)
      document.body.removeEventListener('click', closeMenu)
      }
    }

    document.body.addEventListener('click', closeMenu)

    return () => document.body.removeEventListener('click', closeMenu)
    
  }, [])

  const setUserContext = () => {
    setAccountId(1)
    setAccountName('Jimmy')
    setUserRenteeId(1)
    setUserRenterId(1)
    setProfileImage('https://images.unsplash.com/photo-1611145434336-2324aa4079cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=930&q=80')

    console.log('user context set to Jimmy AccId=15 RenteeId=11 RenterId=11')
  }

  

  return (
    <>

      {isOpen &&
        <div ref={menuRef} className='absolute top-[80px] right-0 w-60 h-60 border border-mainBlack-100 bg-white p-5 z-10' >
          <Link className='font-semibold mb-5 block' href='/user/sign-up'>Sign Up</Link>
          <Link className='font-semibold mb-5 block' href='/user/sign-in'>Sign In</Link>
          <button className='font-semibold block pb-5 border-b border-gray-500' onClick={() => props.openSignInModal()} >Login</button>

          <UserButton />
          <div className='mt-2 cursor-pointer' onClick={setUserContext} >
            Set User Context
          </div>

          <Link className='font-semibold block my-2' href={`/renters-profile/${userRenterId}/manage-listings`} >Manage Listings</Link>
          {props.variant === 'renter' ? 
            <Link className='font-semibold block ' href={`/renters-profile/${userRenterId}/bookings`} >All Bookings</Link> :
            <Link className='font-semibold block ' href={`/user/${userRenteeId}/bookings`} >My Bookings</Link>
          }
          <Link className='font-semibold block my-2' href={`/user/${accountId}/account-settings`}>My Account</Link>

        </div>
      }
    </>
    
  )
})

export default ProfileMenu