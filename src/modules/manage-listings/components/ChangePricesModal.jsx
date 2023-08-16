import ButtonGeneral from '@/common/ButtonGeneral'
import { ItemContext } from '@/common/contexts/item-context'
import FormAddCondition from '@/modules/create-item/components/FormAddCondition'
import FormAddPricingPlan from '@/modules/create-item/components/FormAddPricingPlan'
import React, { useContext } from 'react'

function ChangePricesModal({setModalContent, item}) {     // may be able to delete condition if form can pick up condition value
  const {itemId, itemName } = useContext(ItemContext)

  return (
    <>
      <h2>Change Prices for {itemName}</h2>
      
        <FormAddPricingPlan setModalContent={() => setModalContent(null)} />

        <div className='flex flex-row' >
          <ButtonGeneral 
            type='submit' 
            formId='pricing-plan-form' 
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

export default ChangePricesModal