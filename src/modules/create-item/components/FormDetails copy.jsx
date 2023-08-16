import React, {useContext} from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import axios from 'axios'
import { ItemContext } from '../../common/contexts/item-context'

function FormDetails({category}) {

  let router = useRouter()
  const { itemId, itemName } = useContext(ItemContext)
  const { register, handleSubmit } = useForm()
  const accountId = 2
 // change this to context maybs

  const onSubmit = async (updateData) => {
    console.log("********onsubmit triggered******")



    try {
      const result = await axios.patch('/api/items', { updateData, itemId })
    console.log("********result******")
    console.log(result)

    router.push(`/create-a-listing/${itemId}/add-condition`)

    } catch (err){
      console.log(err)
    }                                               // may be able to use single try catch here.
  }


  return (
    <div className=''>
      <form id='details-form' className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>                       {/*  Must be done like this because handleSubmit is a react-hook-form funtion. It cannot be modified  */}
        
        <input className='form-input min-h-[100px] align-text-top' type="text-area" {...register('description')} placeholder='Paragraph describing your item' />
        
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
              <label className='form-label' htmlFor='brand'>Model:</label>
              <input className='form-input' type="text" {...register('brand')} />
            </div>
        )}

      </form>
    </div>
  )
}

export default FormDetails