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

  // Each account doesn't necessarily have a RenterId yet. RenterId set when first item created.


  const onSubmit = async (newItemData) => {
    let newRenterId
    // if there is no renterId (ie if first item this user is renting) this will create a renterId in database and assign it to variable -- needs to be context
    if (!userRenterId) {
      try {
        const { data } = await axios.post('/api/renter-profile', { accountId })
        console.log("*************************************************************************")
        console.log(data)
        setUserRenterId(data.id)
        newRenterId = data.id             // needed because setState is too slow
      } catch (err){
        console.log(err)
      }
    }

    let renterId = newRenterId || userRenterId
    
    console.log('renterId')
    console.log(renterId)

    try {
      const { data } = await axios.post('/api/items', { newItemData, userRenterId: renterId })
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