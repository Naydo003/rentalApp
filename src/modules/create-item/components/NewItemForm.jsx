import React from 'react'
import { useForm } from 'react-hook-form'
import { useContext } from 'react'
import axios from "axios"
import { ItemContext } from '../../../common/contexts/item-context'
import { UserContext } from '@/common/contexts/user-context'
import { useRouter } from 'next/router'


function NewItemForm() {

  const { register, handleSubmit } = useForm()
  const { setItemId, setItemName } = useContext(ItemContext)
  let { accountId, userRenterId, setUserRenterId } = useContext(UserContext)       // Need to make const
  let router = useRouter()

  // Each account doesn't necessarily have a RenterId
  accountId = 2
  setUserRenterId = 5                                 // change this to context maybs
  userRenterId = 5

  const onSubmit = async (newItemData) => {
    
    // if there is no renterId (ie if first item this user is renting) this will create a renterId in database and assign it to variable -- needs to be context
    if (!userRenterId) {
      try {
        const { data } = await axios.post('/api/renter-profile', { accountId })
        console.log("*************************************************************************")
        console.log(data)
        setUserRenterId = data.id
      } catch (err){
        console.log(err)
      }
    }

    try {
      const { data } = await axios.post('/api/items', { newItemData, userRenterId })
      const newId = data.id
      await setItemId(newId)
      
      if (!newId) {
        console.log("no itemId")
        return
      }
      setItemName(data.name)
      router.push(`/create-a-listing/${newId}/overview`)
    } catch (err){
      console.log(err)
    }                                               // may be able to use single try catch here.
  }


  return (
    <div className=''>
      <form id='new-item-form' onSubmit={handleSubmit(onSubmit)}>                       {/*  Must be done like this because handleSubmit is a react-hook-form funtion. It cannot be modified  */}
        <input className='form-input' type="text" {...register('name')} placeholder='Name' />

      </form>
    </div>
  )
}

export default NewItemForm