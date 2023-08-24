import React, {useContext} from 'react'
import { ItemContext } from '../../../common/contexts/item-context'
import NavBarCreateItem from '../../../modules/create-item/components/NavBarCreateItem'
import FormAddCondition from '../../../modules/create-item/components/FormAddCondition'

import FooterCreateItem from '../../../modules/create-item/components/FooterCreateItem'


function AddConditionPage() {

  const { itemId, itemName } = useContext(ItemContext)

  
  return (
    <div className='h-screen flex flex-col'>
      <NavBarCreateItem />
      <div className='w-full h-fit flex-1 overflow-auto' >
        <div className='small-container'>
          <h1 className='heading'>What condition is the item in?</h1>

          <FormAddCondition />

        </div>
      </div>
        <FooterCreateItem formId='add-condition-form' prevRoute={`/create-a-listing/${itemId}/details`}  />
    </div>
  )
}

export default AddConditionPage