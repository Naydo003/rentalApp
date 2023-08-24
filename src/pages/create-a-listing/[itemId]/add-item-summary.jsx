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


function AddItemSummary() {

  const { itemId, itemName } = useContext(ItemContext)
  let router = useRouter()

 
  const nextButtonHandler = () => {
    console.log('launch axios request then redirect to ...')

    router.push(`/manage-listings/${itemId}/item-details`)

  }


  return (
    <div className='h-screen flex flex-col'>
      <NavBarCreateItem />
      <div className='w-full h-fit flex-1 overflow-auto' >
        <div className='small-container'>
          <h1 className='heading'>Please review the details for {itemName}. If you confirm this item will be added to your Rented Items Manager where you can fill out a calendar of when the item is available and then activate the advert.</h1>

        </div>
      </div>
        <FooterCreateItem nextButtonHandler={nextButtonHandler} buttonText='Activate Listing' prevRoute={`/create-a-listing/${itemId}/add-photos`} />
    </div>
  )
}

export default AddItemSummary