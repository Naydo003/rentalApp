import React from 'react'
import { useForm } from 'react-hook-form'
import axios from "axios"


function NewItemForm() {
  const { register, handleSubmit } = useForm()
  const accountId = 2
  let userRenterId = 5                                 // change this to context maybs


  const onSubmit = async (newItemData) => {
    
    if (!userRenterId) {
      try {
        const { data } = await axios.post('/api/renter-profile', { accountId })
        console.log("*************************************************************************")
        console.log(data)
        userRenterId = data.id
      } catch (err){
        console.log(err)
      }
    }

    try {
      await axios.post('/api/items', { newItemData, userRenterId })
    // console.log("********result******")
    // console.log(result)
    } catch (err){
      console.log(err)
    }                                               // may be able to use single try catch here.
  }


  return (
    <div className=''>
      <form onSubmit={handleSubmit(onSubmit)}>                       {/*  Must be done like this because handleSubmit is a react-hook-form funtion. It cannot be modified  */}
        <input type="text" {...register('name')} placeholder='Name' />
        <input type="text" {...register('description')} placeholder='Description'/>
        <button type='submit'>Submit</button>

      </form>
    </div>
  )
}

export default NewItemForm