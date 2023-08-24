import React, { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { ItemContext } from '../../../common/contexts/item-context'
import NavBarCreateItem from '../../../modules/create-item/components/NavBarCreateItem'
import FooterCreateItem from '../../../modules/create-item/components/FooterCreateItem'
import MapUI from '../../../common/components/UIElements/MapUI';
import { getCoordsForAddress } from '../../../common/utilities/getLocation'

function AddLocationPage() {
  const [ coords, setCoords ] = useState({lat: -33.8688197, lng: 151.2092955})
  const { register, handleSubmit, setValue } = useForm()

  let router = useRouter()
  const { itemId, itemName } = useContext(ItemContext)
  

  const onSubmit = async (updateData) => {
    console.log("********onsubmit triggered******")
    console.log(updateData)
    

    try {
      const result = await axios.patch('/api/items', { updateData, itemId })
    console.log("********result******")
    console.log(result)

    router.push(`/create-a-listing/${itemId}/add-photos`)
 
    } catch (err){
      console.log(err)
    }                          
  }

  async function processAddress(e) {
    console.log('process address')

    console.log(e.target.value)
    const response = await getCoordsForAddress(e.target.value)
    console.log(response)

    setCoords(response)
    setValue('locationCoordinates', response)      // may have to convert this to number not object
  }

  return (
    <div className='h-screen flex flex-col'>
      <NavBarCreateItem />
      <div className='w-full h-fit flex-1 overflow-auto' >
        <div className='small-container'>
          <h1 className='heading'>Where will the item be located?</h1>
          <p className='secondary-text'>Your address will only be shared after someone after they make a booking. This the location where the item will be advertised and is generally where the pickup and drop off point will be.</p>


          {/* This might be done with google api instead */}
          <form id='add-location-form' className='mt-10 max-w-[400px] mx-auto flex flex-col' onSubmit={handleSubmit(onSubmit)}> 
            <label className='form-label' htmlFor='address'>Address:</label>
            <input type='text' {...register('pickUpAddress')} placeholder='7 Alexander St, New York 10011' onBlur={processAddress}/>
            <input {...register('locationCoordinates')} />
          </form>



          <div className='mt-10 border h-60'>
            <MapUI center={coords} zoom={10} />
          </div>

    
        </div>
      </div>
        <FooterCreateItem formId='add-location-form' prevRoute={`/create-a-listing/${itemId}/add-condition`}  />
    </div>
  )
}

export default AddLocationPage

// need to get location too

// || {lat: -33.8688197, lng: 151.2092955}