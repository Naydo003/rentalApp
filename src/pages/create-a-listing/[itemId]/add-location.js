import React from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import NavBarCreateItem from '../../../modules/components/NavBarCreateItem'
import FooterCreateItem from '../../../modules/components/create-item-forms/FooterCreateItem'


function AddLocationPage() {

  const { register, handleSubmit } = useForm()

  let router = useRouter()
  const itemId = 5
  

  const onSubmit = async (updateData) => {
    console.log("********onsubmit triggered******")

    try {
      const result = await axios.patch('/api/items', { updateData, itemId })
    console.log("********result******")
    console.log(result)

    router.push(`/create-a-listing/${itemId}/add-photos`)

    } catch (err){
      console.log(err)
    }                          
  }


  return (
    <div className='h-screen flex flex-col'>
      <NavBarCreateItem />
      <div className='w-full h-fit flex-1 overflow-auto' >
        <div className='medium-container'>
          <h1 className='heading'>Where will the item be located?</h1>
          <p className='secondary-text'>Your address will only be shared after someone after they make a booking. This the location where the item will be advertised and is generally where the pickup and drop off point will be.</p>


          {/* This might be done with google api instead */}
          <form id='add-location-form' className='mt-10 max-w-[400px] mx-auto flex flex-col' onSubmit={handleSubmit(onSubmit)}> 
            <label className='form-label' htmlFor='address'>Address:</label>
            <input type='text' {...register('address')} placeholder='7 Alexander St, New York 10011' />
            <input {...register('location')} />
          </form>

          <div className='mt-10 border h-60'>
            Map
          </div>

    
        </div>
      </div>
        <FooterCreateItem prevRoute={`/create-a-listing/${itemId}/add-condition`}  />
    </div>
  )
}

export default AddLocationPage

// need to get location too