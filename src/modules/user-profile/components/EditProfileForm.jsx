import ButtonMain from '@/common/ButtonMain'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

function EditProfileForm({user}) {
  const [ isNameOpen, setIsNameOpen ] = useState(false)
  const [ isEmailOpen, setIsEmailOpen ] = useState(false)
  const [ isPhoneOpen, setIsPhoneOpen ] = useState(false)
  const [ isAddressOpen, setIsAddressOpen ] = useState(false)

  const router = useRouter()

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      homeAddress: user.homeAddress,
      profilePictureUrl: user.profilePictureUrl
    }
  })

  const onSubmit = async (userData) => {


    try {
      const result = await axios.patch('/api/users', { userData, accountId: user.id })        // needs to chance to auth
      console.log("********result******")
      console.log(result)

      router.push(`/user/${user.id}`)              // change to auth
      
    } catch (err){
      console.log(err)
    }                                               // may be able to use single try catch here.
  }
  

  return (
    <form className='pl-10' id='new-user-form' onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-row w-full justify-between text-sm py-5 border-b' >
        <div className='' >
          <h3 className='primary-text-sm'>Legal Name</h3>
          {!isNameOpen ? 
            <p className='secondary-text-sm my-4'>{user.name}</p> : 
            <p className='secondary-text-sm my-4'>This has to be the name on your travel document which could be a licence or passport.</p>
          }
          {isNameOpen && 
            <div className='my-4'>
              <input className='form-input' type="text" {...register('name')} placeholder='Name' />
            </div>
          }
        </div>
        <div className='w-fit font-semibold underline' onClick={() => setIsNameOpen(!isNameOpen)}>
          {isNameOpen ? 'Close' : 'Edit'}
        </div>
      </div>
      <div className='flex flex-row w-full justify-between text-sm py-5 border-b' >
        <div className='' >
          <h3 className='primary-text-sm'>Email</h3>
          {!isEmailOpen ? 
            <p className='secondary-text-sm my-4'>{user.email}</p> : 
            <p className='secondary-text-sm my-4'>You can have message alerts and booking confirmations sent to this email </p>
          }
          {isEmailOpen && 
            <div className='my-4'>
              <input className='form-input' type="text" {...register('email')} placeholder='Email' />
            </div>
          }
        </div>
        <div className='w-fit font-semibold underline' onClick={() => setIsEmailOpen(!isEmailOpen)}>
          {isEmailOpen ? 'Close' : 'Edit'}
        </div>
      </div>
      <div className='flex flex-row w-full justify-between text-sm py-5 border-b' >
        <div className='' >
          <h3 className='primary-text-sm'>Phone Number</h3>
          {!isPhoneOpen ? 
            <p className='secondary-text-sm my-4'>{user.phoneNumber}</p> : 
            <p className='secondary-text-sm my-4'>Contact number (for confirmed guests and Airbnb to get in touch). You can add other numbers and choose how they’re used.</p>
          }
          {isPhoneOpen && 
            <div className='my-4'>
              <input className='form-input' type="text" {...register('phoneNumber')} placeholder='Phone Number' />
            </div>
          }
        </div>
        <div className='w-fit font-semibold underline' onClick={() => setIsPhoneOpen(!isPhoneOpen)}>
          {isPhoneOpen ? 'Close' : 'Edit'}
        </div>
      </div>
      <div className='flex flex-row w-full justify-between text-sm py-5 border-b' >
        <div className='' >
          <h3 className='primary-text-sm'>Home Address</h3>
          {!isAddressOpen ? 
            <p className='secondary-text-sm my-4'>{user.homeAddress}</p> : 
            <p className='secondary-text-sm my-4'>Use a permanent address where you can receive mail.</p>
          }
          {isAddressOpen && 
            <div className='my-4'>
              <input className='form-input' type="text" {...register('homeAddress')} placeholder='Phone Number' />
            </div>
          }
        </div>
        <div className='w-fit font-semibold underline' onClick={() => setIsAddressOpen(!isAddressOpen)}>
          {isAddressOpen ? 'Close' : 'Edit'}
        </div>
      </div>
      
      <div className='w-28 mr-0 ml-auto mt-5' >
        <ButtonMain formId='new-user-form' type='submit' >Save</ButtonMain>
      </div>
      
    </form>
  )
}

export default EditProfileForm