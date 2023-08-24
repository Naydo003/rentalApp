import React, { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import Switch from "react-switch";
import axios from 'axios';
import { ItemContext } from '../../../common/contexts/item-context'
import NavBarCreateItem from '../../../modules/create-item/components/NavBarCreateItem'
import FooterCreateItem from '../../../modules/create-item/components/FooterCreateItem'




function AddInsurancePage() {
  const [isChecked, setIsChecked] = useState(false)

  let router = useRouter()
  const { itemId, itemName } = useContext(ItemContext)
  const { register, handleSubmit, setValue } = useForm()
  
  // Register an input value for the form and initially set it to false.
  const insuranced = register('insuranced')
  useEffect(() => setValue('insuranced', false), [])


  const onSubmit = async (updateData) => {

    
    console.log('updateData')
    console.log(updateData)

    try {
      const result = await axios.patch('/api/items', { updateData, itemId })
    console.log("********result******")
    console.log(result)

    router.push(`/create-a-listing/${itemId}/add-item-summary`)

    } catch (err){
      console.log(err)
    }                          
  }

  return (
    <div className='h-screen flex flex-col'>
      <NavBarCreateItem />
      <div className='w-full h-fit flex-1 overflow-auto' >
        <div className='small-container'>
          <h1 className='heading'>Would you like insurance?</h1>

          <form id='add-insurance-form' className='' onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-row justify-center'>
              <Switch 
                className=''
                onChange={() => {
                  setValue('insuranced', !isChecked)
                  setIsChecked(!isChecked)
                }} 
                checked={isChecked} />
            </div>

            {isChecked && (
              <div className='mt-10'>
                <label className='form-label' htmlFor='itemNewValue'>Item New Value</label>
                <input className='form-input w-28' type='number' {...register('itemNewValue')} />
              </div>
            )}
          </form>


        </div>
      </div>
        <FooterCreateItem formId='add-insurance-form' prevRoute={`/create-a-listing/${itemId}/add-late-return-policy`}  />
    </div>
  )
}

export default AddInsurancePage