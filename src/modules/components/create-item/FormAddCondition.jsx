import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import axios from 'axios'
import ButtonContent from '../../../common/ButtonContent'
import Icon from '../../../public/shopping-bag.svg'

function FormAddCondition() {
  console.log("rerender")
  let router = useRouter()
  const [isSelected, setIsSelected] = useState(null)
  const { register, handleSubmit, setValue } = useForm()

  const itemId = 5

  const onSelectHandler = (buttonName) => {
    // const buttonName = "asGoodAsNew"

    if (isSelected === buttonName) {
      setIsSelected(null)
      setValue('condition', buttonName)
    } else {
      setIsSelected(buttonName)
      setValue('condition', buttonName)
    }
  }

  const onSubmit = async (updateData) => {
    console.log("********onsubmit triggered******")
    
    console.log(updateData)

    try {
      const result = await axios.patch('/api/items', { updateData, itemId })
    console.log("********result******")
    console.log(result)

    router.push(`/create-a-listing/${itemId}/add-location`)

    } catch (err){
      console.log(err)
    }                          
  }

  return (
    <form id='add-condition-form' className='flex flex-col' onSubmit={handleSubmit(onSubmit)}> 
      <input className='hidden' type="text" {...register('condition')} value='undefined' />

      <div className='flex flex-col space-y-4'>
        <ButtonContent buttonName='asGoodAsNew' isSelected={isSelected === 'asGoodAsNew'} onSelectHandler={onSelectHandler}>
          <div className='flex flex-row items-center'>
            <div className='pr-5 sm:pr-16 flex-1'>
              As Good As New
              <p className='secondary-text-sm'>For items that look new, no marks at all or discolouration. Can be an older item as long as it has been well looked after.</p>
            </div>
            <Icon className='w-[40px] h-[40px]' />
          </div>
        </ButtonContent>
        <ButtonContent buttonName='aFewScuffs' isSelected={isSelected === 'aFewScuffs'} onSelectHandler={onSelectHandler}>
          A Few Scuffs
          <p className='secondary-text-sm'>For items that are in very good working order but have a few minor aesthetic blemishes. The item functions perfectly.</p>
        </ButtonContent>
        <ButtonContent buttonName='heavilyUsed' isSelected={isSelected === 'heavilyUsed'} onSelectHandler={onSelectHandler}>
          Heavily Used
          <p className='secondary-text-sm'>For items that are showing signs of a lot of use. They still work fully and will get the job done without any hastle.</p>
        </ButtonContent>
        <ButtonContent buttonName='oldAndTemperamental' isSelected={isSelected === 'oldAndTemperamental'} onSelectHandler={onSelectHandler}>
          Old And Temperamental
          <p className='secondary-text-sm'>The item is missing some of its functionality or its a bit harder to use because of its age. Not the appearance could be good or bad.</p>
        </ButtonContent>
      </div>
    </form>
  )
}

export default FormAddCondition