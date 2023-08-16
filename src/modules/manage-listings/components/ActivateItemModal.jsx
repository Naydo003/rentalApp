import { ItemContext } from '@/common/contexts/item-context'
import axios from 'axios'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'

function ActivateItemModal({setModalContent, action, active}) {
  const { register, handleSubmit } = useForm()

  const {itemId, itemName } = useContext(ItemContext)

  const toggleActivationHandler = async () => {
    let updateData = {active: true}
    active ? updateData.active = false : updateData.active = true 

    try {
      const result = await axios.patch('/api/items', { updateData, itemId })

      console.log('result')
      console.log(result)

    // router.push(`/create-a-listing/${itemId}/add-condition`)
      setModalContent(null)

    } catch (err){
      console.log(err)
    }                                               // may be able to use single try catch here.
  }


  

  return (
    <>
      <h2>Are you sure you want to {active ? 'DEACTIVATE' : 'ACTIVATE'} your add for {itemName}</h2>
      
        <div className='flex flex-row' >
          <button 
            type='submit' 
            onClick={toggleActivationHandler} 
          >
            Confirm
          </button>
          <button type='button' onClick={()=>{setModalContent(null)}} >
            Cancel
          </button>
        </div>

    </>  
  )
}

export default ActivateItemModal