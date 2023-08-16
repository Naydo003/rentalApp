import ButtonContent from '@/common/ButtonContent'
import React from 'react'

function CategorySelector({isSelected, setIsSelected}) {

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
    <div className='flex flex-row flex-wrap gap-2 bg-[red]'>

    {categories.map((category)=>(
      <ButtonContent key={category} variant='detailsCategory' buttonName={category} isSelected={isSelected === category} onSelectHandler={onSelectHandler}>{category}</ButtonContent>

    ))}

  </div>
  )
}

export default CategorySelector