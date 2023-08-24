
import React, { useState, useContext } from 'react'
import { ItemContext } from '../../../common/contexts/item-context'
import NavBarCreateItem from '../../../modules/create-item/components/NavBarCreateItem'
import FooterCreateItem from '../../../modules/create-item/components/FooterCreateItem'
import FormDetails from '../../../modules/create-item/components/FormDetails'
import ButtonContent from '../../../common/ButtonContent'
import CategorySelector from '@/common/components/UIElements/CategorySelector'

function details() {
  const [isSelected, setIsSelected] = useState(null)
  const { itemId, itemName } = useContext(ItemContext)
  console.log(itemId)

  // const categories = [
  //   'Kitchen Appliance',
  //   'Tools/DIY',
  //   'Gardening',
  //   'Games',
  //   'Sports Equipment',
  //   'Water Sports',
  //   'Book',
  //   'Arts and Crafts',
  //   'Clothing',
  //   'Outdoor',
  //   'Camping',
  //   'Bikes',
  //   'Car',
  //   'Boats/Jetski',
  //   'Electronics',
  //   'Hobby',
  //   'Other'
  // ]

  // const onSelectHandler = (buttonName) => {
  //   isSelected === buttonName
  //     ? setIsSelected(null)
  //     : setIsSelected(buttonName)
  // }


  return (

    <div className='h-screen flex flex-col'>
      <NavBarCreateItem />
      <div className='w-full h-fit flex-1 overflow-auto' >
        <div className='small-container'>

          <h1 className='heading'>Select a category for {itemName}</h1>


          <CategorySelector isSelected={isSelected} setIsSelected={setIsSelected} />
          <h1 className='heading mt-10'>Tell us about this item</h1>

          <FormDetails category={isSelected} /> 
        </div>
      </div>

      <FooterCreateItem formId='details-form' prevRoute={`/create-a-listing/${itemId}/overview`} />

    </div>
  )
}

export default details