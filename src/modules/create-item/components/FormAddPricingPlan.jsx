import React, { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import Switch from "react-switch";
import axios from 'axios';
import { ItemContext } from '../../../common/contexts/item-context'
import InputToggle from '../../../common/components/UIElements/InputToggle';
import { rentalPeriods } from '@/common/utilities/enumerables';


function FormAddPricingPlan({setModalContent}) {
  const [ rentPerHour, setRentPerHour ] = useState(false)
  const [isChecked5, setIsChecked5] = useState(false)


  let router = useRouter()
  const { itemId, itemName } = useContext(ItemContext)
  const { register, handleSubmit, setValue, formState: { isDirty, dirtyFields } } = useForm({
    defaultValues: {
      rentPerHour: true,
      rentPerHourPrice: 0.00,
      rentPerDay: false,
      rentPerDayPrice: 0.00,
      rentPerWeek: false,
      rentPerWeekPrice: 0.00,
      weekendRentPerHour: false,
      weekendRentPerHourPrice: 0.00 ,
      weekendRentPerDay: false,
      weekendRentPerDayPrice: 0.00
    }
  })
  

  const onSubmit = async (updateData) => {


    if (!updateData.rentPerHourPrice && !updateData.rentPerDayPrice && !updateData.rentPerWeekPrice) {
      console.log('Must have at least one price assigned to this item')
      return
    }

    if (!isChecked5) {
      updateData.weekendRentPerHourPrice = 0
      updateData.weekendRentPerDayPrice = 0
      updateData.weekendMinimumRentalPeriod = 'noMinimum'
    }

    if (updateData.rentPerHour && updateData.rentPerHourPrice == 0) {
      console.log('Cannot have no price for rent per hour')
      return
    }

    if (updateData.rentPerDay && updateData.rentPerDayPrice == 0) {
      console.log('Cannot have no price for rent per Day')
      return
    }

    if (updateData.rentPerWeek && updateData.rentPerWeekPrice == 0) {
      console.log('Cannot have no price for rent per Week')
      return
    }

    if (updateData.weekendRentPerHour && updateData.weekendRentPerHourPrice == 0) {
      console.log('Cannot have no price for weekend rent per hour')
      return
    }

    if (updateData.weekendRentPerDay && updateData.weekendRentPerDayPrice == 0) {
      console.log('Cannot have no price for weekend rent per day')
      return
    }

    
    // updateData.rentPerHourPrice ? updateData.rentPerHour = true : (
    //   updateData.rentPerHour = false 
    //   updateData.rentPerHourPrice = 0.00 )
    console.log('updateData')
    console.log(updateData)

    try {
      const result = await axios.patch('/api/items', { updateData, itemId })
    console.log("********result******")
    console.log(result)

    if (setModalContent) {
      setModalContent()
    } else {
      router.push(`/create-a-listing/${itemId}/add-cancellation-policy`)
    }
    

    } catch (err){
      console.log(err)
    }                          
  }

  return (
          <form id='pricing-plan-form' className='flex flex-col' onSubmit={handleSubmit(onSubmit)}> 
            {/* <h2 className='heading mb-2'>Hourly Rate</h2> */}
            <p className='secondary-text mb-16'>How much do you wish to charge per hour, per day and/or per week for this item? You must select at least one.</p>

            <InputToggle 
              initialState={true} 
              type='integer'
              label='Hourly Rate:'
              name={register('rentPerHourPrice').name}
              onChange={register('rentPerHourPrice').onChange}
              onBlur={register('rentPerHourPrice').onBlur}
              inputRef={register('rentPerHourPrice').ref} 
              boolName={register('rentPerHour').name}
              setValue={setValue} />

            <InputToggle 
              initialState={false} 
              type='integer'
              label='Daily Rate:'
              name={register('rentPerDayPrice').name}
              onChange={register('rentPerDayPrice').onChange}
              onBlur={register('rentPerDayPrice').onBlur}
              inputRef={register('rentPerDayPrice').ref} 
              boolName={register('rentPerDay').name}
              setValue={setValue}  />

            <InputToggle 
              initialState={false} 
              type='integer'
              label='Weekly Rate:'
              name={register('rentPerWeekPrice').name}
              onChange={register('rentPerWeekPrice').onChange}
              onBlur={register('rentPerWeekPrice').onBlur}
              inputRef={register('rentPerWeekPrice').ref} 
              boolName={register('rentPerWeek').name}
              setValue={setValue}  />


            <div className='sm:ml-5 my-4 flex flex-row flex-wrap'>
              <label className='form-label mr-5' >Mimimum Rental Period:</label>
              <select className={'form-input block basis-full sm:basis-40'} {...register('minimumRentalPeriod')} >
                {rentalPeriods.map((p) => (
                  <option key={p.name} value={p.name} >{p.title}</option>
                ))}
              </select>
            </div>


            <div className='flex flex-row justify-between mt-10 mb-5'>
              <label className='form-label'>Would you like to add a different pricing model for weekends?</label>
              <Switch 
                className='ml-2 sm:ml-5 my-auto'
                onChange={() => {
                  setIsChecked5(!isChecked5)
                }} 
                checked={isChecked5} />
            </div>
            <div className={isChecked5 ? 'block' : 'hidden'} >
        
              <p className='secondary-text mb-16'>You can charge a different amount for your item on weekends. </p>

              
              <InputToggle 
                initialState={false} 
                type='integer'
                label='Hourly Rate on Weekends:'
                symbol='$'
                name={register('weekendRentPerHourPrice').name}
                onChange={register('weekendRentPerHourPrice').onChange}
                onBlur={register('weekendRentPerHourPrice').onBlur}
                inputRef={register('weekendRentPerHourPrice').ref} 
                boolName={register('weekendRentPerHour').name}
                setValue={setValue}  />


              <InputToggle 
                initialState={false} 
                type='integer'
                label='Daily Rate on Weekends:'
                symbol='$'
                name={register('weekendRentPerDayPrice').name}
                onChange={register('weekendRentPerDayPrice').onChange}
                onBlur={register('weekendRentPerDayPrice').onBlur}
                inputRef={register('weekendRentPerDayPrice').ref} 
                boolName={register('weekendRentPerDay').name}
                setValue={setValue}  />





                <div className='sm:ml-5 my-4 flex flex-row flex-wrap'>
                  <label className='form-label mr-5' >Mimimum Rental Period:</label>
                  <select className='form-input block basis-full sm:basis-40' {...register('weekendMinimumRentalPeriod')} >
                    {rentalPeriods.map((p) => (
                      <option key={p.name} value={p.name} >{p.title}</option>
                    ))}
                  </select>
                </div>


            </div>
          </form>

  )
}

export default FormAddPricingPlan