
import React, { useState } from 'react'
import NavBarCreateItem from '../../../components/NavBarCreateItem'
import FooterCreateItem from '../../../components/create-item-forms/FooterCreateItem'
import FormDetails from '../../../components/create-item-forms/FormDetails'
import ButtonContent from '../../../components/ButtonContent'

function details() {
  const [isSelected, setIsSelected] = useState(null)
  const itemName ='cool red bike'
  const itemId = 5

  const categories = [
    'Kitchen Appliance',
    'Tools/DIY',
    'Gardening',
    'Games',
    'Sports Equipment',
    'Water Sports',
    'Book',
    'Arts and Crafts',
    'Clothing',
    'Outdoor',
    'Camping',
    'Bikes',
    'Car',
    'Boats/Jetski',
    'Electronics',
    'Hobby',
    'Other'
  ]

  const onSelectHandler = (buttonName) => {
    isSelected === buttonName
      ? setIsSelected(null)
      : setIsSelected(buttonName)
  }

  

  

  return (

    <div className='h-screen flex flex-col'>
      <NavBarCreateItem />
      <div className='w-full h-fit flex-1 overflow-auto' >
        <div className='medium-container'>

          <h1 className='heading'>Select a category for {itemName}</h1>

          <div className='flex flex-row flex-wrap gap-2 bg-[red]'>

            {categories.map((category)=>(
              <ButtonContent key={category} variant='detailsCategory' buttonName={category} isSelected={isSelected === category} onSelectHandler={onSelectHandler}>{category}</ButtonContent>

            ))}

          </div>
          <h1 className='heading mt-10'>Tell us about this item</h1>

          <FormDetails category={isSelected} /> 
        </div>
      </div>

      <FooterCreateItem formId='details-form' prevRoute={`/create-a-listing/${itemId}/overview`} />

    </div>
  )
}

export default details