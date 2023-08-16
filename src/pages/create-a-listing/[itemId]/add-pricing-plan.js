import React, { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import Switch from "react-switch";
import axios from 'axios';
import { ItemContext } from '../../../common/contexts/item-context'
import NavBarCreateItem from '../../../modules/create-item/components/NavBarCreateItem'
import FooterCreateItem from '../../../modules/create-item/components/FooterCreateItem'
import ButtonContent from '../../../common/ButtonContent'
import FormAddPricingPlan from '../../../modules/create-item/components/FormAddPricingPlan';


function AddPricingPlan() {

  const { itemId, itemName } = useContext(ItemContext)
 



  return (
    <div className='h-screen flex flex-col'>
      <NavBarCreateItem />
      <div className='w-full h-fit flex-1 overflow-auto' >
        <div className='medium-container'>
          <h1 className='heading'>Create a Pricing Plan for {itemName}</h1>
          <FormAddPricingPlan />
        </div>
      </div>
        <FooterCreateItem formId='pricing-plan-form' prevRoute={`/create-a-listing/${itemId}/add-photos`} />
    </div>
  )
}

export default AddPricingPlan