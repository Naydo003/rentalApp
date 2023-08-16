import React from 'react'
import Link from 'next/link'
import ButtonMain from '../../../common/ButtonMain'

function FooterCreateItem({ nextButtonHandler, prevRoute, formId, buttonText }) {
  return (
    <footer className='h-16 md:h-24 w-full bg-white pt-1'>
      <div className='h-3 w-full flex flex-row space-x-2'>
        <div className='w-full bg-mainGrey-100 rounded-sm flex'></div>
        <div className='w-full bg-mainGrey-100 rounded-sm flex'></div>
        <div className='w-full bg-mainGrey-100 rounded-sm flex'></div>
      </div>
      <div className='flex flex-row items-center justify-between mt-3'>


        <Link className='primary-text underline ml-4 sm:ml-20' href={`${prevRoute}`} >Back</Link>
        <div className='w-40 sm:mr-20 sm:ml-auto bg-[green]'>
          <ButtonMain type='submit' formId={formId} onSubmit={nextButtonHandler}>{buttonText || 'Next'}</ButtonMain>
        </div>
      </div>
    </footer>

  )
}

export default FooterCreateItem