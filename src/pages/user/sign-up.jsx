import React from 'react'

import FormNewUser from '@/modules/user-profile/components/NewUserForm'
import NavBarSearch from '@/modules/rentee-booking/NavBarSearch'


function SignUp() {


  return (
    <>
      <NavBarSearch />
      <main>
        <div className='h-screen flex flex-col'>
          <div className='small-container flex-1 overflow-auto'>
            <h1 className='heading'>Sign-up</h1>
            <FormNewUser />
          </div>
          {/* <FooterMain formId='new-item-form' prevRoute={`/`}  /> */}
        </div>
      </main>
    </>
  )
}

export default SignUp