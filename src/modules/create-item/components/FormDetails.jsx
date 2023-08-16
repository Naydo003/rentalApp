import React, {useContext} from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import axios from 'axios'
import { ItemContext } from '../../../common/contexts/item-context'

function FormDetails({category, nextRoute }) {

  let router = useRouter()
  let { itemId, itemName } = useContext(ItemContext)      // change to const
  const { register, handleSubmit } = useForm()
  const accountId = 2
 // change this to context maybs

  
  const onSubmit = async (updateData) => {
    console.log("********onsubmit triggered******")

    updateData.category = category

    try {
      const result = await axios.patch('/api/items', { updateData, itemId })
    console.log("********result******")
    console.log(result)

    
    nextRoute ? router.push(nextRoute) : router.push(`/create-a-listing/${itemId}/add-condition`)

    } catch (err){
      console.log(err)
    }                                               // may be able to use single try catch here.
  }

  // const preventEnterKeySubmission = (e) => {
  //   const target = e.target
  //   console.log('target')
  //   console.log(target.tagName)

  //   console.log(e.key)
  //   if (e.key === "Enter" && !["TEXTAREA"].includes(target.tagName)) {
  //     e.preventDefault();
  //     console.log('def prev')
  //   }
  // };

  // onKeyDown={preventEnterKeySubmission} would need to be added to form

  return (
    <div className=''>
      <form id='details-form' className='flex flex-col' onSubmit={handleSubmit(onSubmit)} >                       {/*  Must be done like this because handleSubmit is a react-hook-form funtion. It cannot be modified  */}
        <input className='form-input min-h-[100px] align-text-top' {...register('newName')} placeholder='What would you like to Name this item?' />
        
        <textarea className='form-input min-h-[100px] align-text-top' type="text-area" {...register('description')} placeholder='Paragraph describing your item' rows='4' cols='12'></textarea>
        
        <h3 className='heading mt-10'>Optional descriptors</h3>
        <p className='primary-text mb-5'>Filling these in will help your item be found in users search results</p>
        
        {category === 'Car' && (
            <div>
              <label className='form-label' htmlFor='make'>Make:</label>
              <input className='form-input' type="text" {...register('make')} placeholder='eg. Holden, Toyota'/> 
              <label className='form-label' htmlFor='brand'>Model:</label>
              <input className='form-input' type="text" {...register('brand')} placeholder='eg. Commodore, Hilux' />
              <label className='form-label' htmlFor='year'>Year:</label>
              <input className='form-input' type="text" {...register('year')} placeholder='Year of manufacture' />
              <label className='form-label' htmlFor='odometer'>Odometer:</label>
              <input className='form-input' type="text" {...register('odometer')} placeholder='In km' />
            </div>
        )}
        {category === 'Clothing' && (
            <div>
              <label className='form-label' htmlFor='brand'>Brand:</label>
              <input className='form-input' type="text" {...register('brand')} placeholder='eg. Nike, Channel'/>
              <label className='form-label' htmlFor='label'>Label:</label>
              <input className='form-input' type="text" {...register('label')} placeholder='eg. Air Jordans, Classic'/> 
            </div>
        )}
        {category === 'Book' && (
            <div>
              <label className='form-label' htmlFor='label'>Author:</label>
              <input className='form-input' type="text" {...register('label')} placeholder='eg. Air Jordans, Classic'/> 
              <label className='form-label' htmlFor='brand'>Genre:</label>
              <input className='form-input' type="text" {...register('brand')} placeholder='eg. Bosch, Sony...'/>
            </div>
        )}
        {category !== 'Book' && category !== 'Clothing' && category !== 'Car' && (
            <div>
              <label className='form-label' htmlFor='brand'>Brand:</label>
              <input className='form-input' type="text" {...register('brand')} placeholder='eg. Bosch, Sony...'/>
              <label className='form-label' htmlFor='model'>Model:</label>
              <input className='form-input' type="text" {...register('model')} />
            </div>
        )}

      </form>
    </div>
  )
}

export default FormDetails