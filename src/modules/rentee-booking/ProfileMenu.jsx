import { UserContext } from '@/common/contexts/user-context'
import Link from 'next/link'
import React, { useContext, useState } from 'react'


function ProfileMenu() {
  const [ isOpen, setIsOpen ] = useState(false)
  const { setAccountId, setAccountName, setUserRenteeId, setUserRenterId} = useContext(UserContext)

  const setUserContext = () => {
    setAccountId(15)
    setAccountName('Jimmy')
    setUserRenteeId(11)
    setUserRenterId(11)

    console.log('user context set to Jimmy AccId=15 RenteeId=11 RenterId=11')
  }

  return (
    <>
      <div className='h-[20px] w-[20px] sm:w-[45px] justify-center border border-black rounded-full' onClick={() => setIsOpen(!isOpen)}>
      
      </div>

      {isOpen &&
        <div className='absolute top-[80px] right-5 w-60 h-60 border border-black p-5' >
          <Link className='font-semibold mb-5 block' href='/user/sign-up'>Sign Up</Link>
          <Link className='font-semibold block pb-5 border-b border-gray-500' href='/user/sign-up'>Login</Link>

          <div className='' onClick={setUserContext} >
            Set User Context
          </div>
          

        </div>
      }
    </>
    
  )
}

export default ProfileMenu