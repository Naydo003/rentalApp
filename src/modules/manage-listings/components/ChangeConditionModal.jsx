import ButtonGeneral from '@/common/ButtonGeneral'
import { ItemContext } from '@/common/contexts/item-context'
import FormAddCondition from '@/modules/create-item/components/FormAddCondition'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'

function ChangeConditionModal({setModalContent, condition}) {     // may be able to delete condition if form can pick up condition value
  const {itemId, itemName } = useContext(ItemContext)

  return (
    <>
      <h2>Change condition for {itemName}</h2>
      
        <FormAddCondition setModalContent={() => setModalContent(null)} />

        <div className='flex flex-row' >
          <ButtonGeneral 
            type='submit' 
            formId='add-condition-form' 
          >
            Confirm
          </ButtonGeneral>
          <button type='button' onClick={()=>{setModalContent(null)}} >
            Cancel
          </button>
        </div>

    </>  
  )
}

export default ChangeConditionModal