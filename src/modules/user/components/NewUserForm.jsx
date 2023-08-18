import React, { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import axios from "axios"
import { UserContext } from '@/common/contexts/user-context'
import ButtonMain from '@/common/ButtonMain'

function FormNewUser() {
  const [ isChecked, setIschecked ] = useState(false)
  const { register, handleSubmit } = useForm()
  const { accountId, setAccountId, setAccountName, setAccountEmail, userRenteeId, setUserRenteeId  } = useContext(UserContext)
  let router = useRouter()

  const onSubmit = async (newUserData) => {
    console.log('onSubmit')

    try {
      const { data } = await axios.post('/api/users', { newUserData })   
      console.log(data)
      if (!data.newAccount.id) {
        console.log("no itemId")
        return
      }
      console.log("new data.newAccount.id")
      console.log(data.newAccount.id)


      setAccountId(data.newAccount.id)
      setAccountName(data.newAccount.name)
      setAccountEmail(data.newAccount.email)
      setUserRenteeId(data.newRenteeProfile.id)

      router.push(`/user/${data.newRenteeProfile.id}/bookings`)
    } catch (err){
      console.log(err)
    }                                        
  }

  return (
  
      <form id='new-user-form' onSubmit={handleSubmit(onSubmit)}>                       {/*  Must be done like this because handleSubmit is a react-hook-form funtion. It cannot be modified  */}
        <label>Name</label>
        <input className='form-input' type="text" {...register('name')} placeholder='Name' />
        <p>This does not have to be your real name.</p>
        <label>Email</label>
        <input className='form-input' type="text" {...register('email')} placeholder='Email' />
        <p>This email is for us to contact you. It will never be shared with anyone else.</p>
        <label>Phone Number</label>
        <input className='form-input' type="text" {...register('phoneNumber')} placeholder='04XX XXX XXX' />
        <label>Home Address</label>
        <input className='form-input' type="text" {...register('homeAddress')} placeholder='Address' />
        <label>Wants to be Renter</label>
        <input className='form-input' type="checkbox" {...register('isRenter')} checked={isChecked} onClick={() => setIschecked(!isChecked)} />
        <ButtonMain type='submit' formId='new-user-form' >Sign Up</ButtonMain>
      </form>
  )
}

export default FormNewUser