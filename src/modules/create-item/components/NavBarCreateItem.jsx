import React from 'react'
import Link from 'next/link'
import ButtonGeneral from '../../../common/ButtonGeneral'
import Logo from '../../../../public/next.svg'

function NavBarCreateItem() {

  const questionButtonHandler = () => {
    console.log("open questions modal")
  }

  const saveAndExitButtonHandler = () => {
    console.log("save and exit")
  }

  return (
    
    <div className='h-[100px] w-full flex flex-row items-center sm:justify-between px-5 sm:px-20'>
        <Link className='hidden sm:block bg-blue-100' href='/'> 
          <Logo className='w-[50px] h-[50px]' />      
          
        </Link>
        <div className='flex flex-row justify-between sm:space-x-4 sm:justify-end w-full'>
          <ButtonGeneral onSubmit={questionButtonHandler}>Questions</ButtonGeneral>
          <ButtonGeneral onSubmit={saveAndExitButtonHandler}>Save And Exit</ButtonGeneral>
        </div>
    </div>
  )
}

export default NavBarCreateItem