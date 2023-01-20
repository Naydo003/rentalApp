import React from 'react'
import { useForm } from 'react-hook-form'
import axios from "axios"


function NewUser() {
  const { register, handleSubmit } = useForm()


  const onSubmit = async (newUserData) => {
    try {
      await axios.post('/api/users', { newUserData })
    // console.log("********result******")
    // console.log(result)
    } catch (err){
      console.log(err)
    }
  }


  return (
    <div className=''>
      <form onSubmit={handleSubmit(onSubmit)}>                       {/*  Must be done like this because handleSubmit is a react-hook-form funtion. It cannot be modified  */}
        <input type="text" {...register('name')} placeholder='Name' />
        <input type="text" {...register('email')} placeholder='Email'/>
        <input type="text" {...register('phoneNumber')} placeholder='Phone Number' />
        <input type="text" {...register('homeAddress')} placeholder='Home Address'/>
        <button type='submit'>Submit</button>

      </form>
    </div>
  )
}

export default NewUser