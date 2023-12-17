import Modal from '@/common/components/UIElements/Modal'
import { UserContext } from '@/common/contexts/user-context'
import { SignIn } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useEffect, useRef, useState } from 'react'
import ProfileMenu from './ProfileMenu'


function ProfileMenuButton({variant}) {
  const [ isOpen, setIsOpen ] = useState(false)
  const [ modalContent, setModalContent ] = useState(null)

  const { profileImage } = useContext(UserContext)
  const menuButtonRef = useRef()

  const openSignInModal = () => setModalContent(<SignIn />)


  return (
    <>
      {!!modalContent && (
        <Modal isOpen={!!modalContent} handleClose={() => setModalContent(null)} >
          {modalContent}
        </Modal>
      )}
      <button ref={menuButtonRef} className='h-[40px] w-[40px] sm:w-[75px] justify-center border border-mainBlack-100 rounded-full z-40 bg-white' onClick={() => setIsOpen(!isOpen)}>
        <div className='flex flex-row justify-end space-x-1 items-center px-1'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hidden sm:block">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          <div className='relative rounded-full overflow-hidden w-[32px] h-[32px]'>
            <Image
              src={profileImage || 'https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png'}
              className="object-cover"
              fill
              sizes="(max-width: 768px) 25vw, 10vw"
              alt='item image'
            />
          </div>

        </div>
      </button>

      {isOpen &&
        <ProfileMenu variant={variant} isOpen={isOpen} setIsOpen={setIsOpen} ref={menuButtonRef} openSignInModal={openSignInModal} />
      }
    </>
    
  )
}

export default ProfileMenuButton