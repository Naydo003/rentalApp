import React from 'react'
import { SignUp } from '@clerk/nextjs'
import FormNewUser from '@/modules/user-profile/components/NewUserForm'
import NavBarSearch from '@/modules/rentee-booking/NavBarSearch'


function SignUpPage() {


  return (
    <>
      <NavBarSearch />
      <main>
        <div className='h-screen flex flex-col'>
          <div className='small-container flex-1 overflow-auto'>
            <h1 className='heading'>Sign-up</h1>
            {/* <FormNewUser /> */}
            <SignUp />
          </div>
          {/* <FooterMain formId='new-item-form' prevRoute={`/`}  /> */}
        </div>
      </main>
    </>
  )
}

export default SignUpPage