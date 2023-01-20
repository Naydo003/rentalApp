import React from 'react'

import NavBarCreateItem from '../../../modules/components/NavBarCreateItem'
import FormAddCondition from '../../../modules/components/create-item-forms/FormAddCondition'

import FooterCreateItem from '../../../modules/components/create-item-forms/FooterCreateItem'


function AddConditionPage() {

  console.log('page-rerender')
  const itemId = 5

  
  return (
    <div className='h-screen flex flex-col'>
      <NavBarCreateItem />
      <div className='w-full h-fit flex-1 overflow-auto' >
        <div className='medium-container'>
          <h1 className='heading'>What condition is the item in?</h1>

          <FormAddCondition />

        </div>
      </div>
        <FooterCreateItem formId='add-condition-form' prevRoute={`/create-a-listing/${itemId}/details`}  />
    </div>
  )
}

export default AddConditionPage