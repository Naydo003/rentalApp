import React, { useState, useContext } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { ItemContext } from '../../../common/contexts/item-context'
import NavBarCreateItem from '../../../modules/create-item/components/NavBarCreateItem'
import FooterCreateItem from '../../../modules/create-item/components/FooterCreateItem'
import ButtonContent from '../../../common/ButtonContent'
import { useForm } from 'react-hook-form'
import { cancellationPolicyCharge, cancellationPolicyTime } from '@/common/utilities/enumerables'

function AddCancellationPolicy() {
  const [isSelected1, setIsSelected1] = useState(null)
  const [isSelected2, setIsSelected2] = useState(null)
  const [isSelected3, setIsSelected3] = useState(null)
  let router = useRouter()
  const { itemId, itemName } = useContext(ItemContext)
  const { register, handleSubmit, setValue } = useForm()

  
  const onSelectHandler1 = (buttonName) => {
    // const buttonName = "asGoodAsNew"

    if (isSelected1 === buttonName) {
      setIsSelected1(null)
      setValue('generalCancellationPolicy', null)
    } else {
      console.log('buttonName')
      console.log(buttonName)

      setIsSelected1(buttonName)
      setValue('generalCancellationPolicy', buttonName)
    }
  }

  const onSelectHandler2 = (buttonName) => {
    // const buttonName = "asGoodAsNew"

    if (isSelected2 === buttonName) {
      setIsSelected2(null)
      setValue('lateCancellationPolicyTime', null)
    } else {
      setIsSelected2(buttonName)
      setValue('lateCancellationPolicyTime', buttonName)
    }
  }

  const onSelectHandler3 = (buttonName) => {
    // const buttonName = "asGoodAsNew"

    if (isSelected3 === buttonName) {
      setIsSelected3(null)
      setValue('lateCancellationPolicyCharge', null)
    } else {
      setIsSelected3(buttonName)
      setValue('lateCancellationPolicyCharge', buttonName)
    }
  }

  const handleCustomPolicyChange = (e) => {
    console.log('value of checkbox : ', e.target.checked);
    if (e.target.checked){
      setValue('generalCancellationPolicy', 'customPolicy')
      setValue('lateCancellationPolicyTime', 'customPolicy')
      setValue('lateCancellationPolicyCharge', 'customPolicy')
    } else {
      setValue('generalCancellationPolicy', isSelected1)
      setValue('lateCancellationPolicyTime', isSelected2)
      setValue('lateCancellationPolicyCharge', isSelected3)
    }
  }

  const onSubmit = async (updateData) => {
    console.log('updateData')

    console.log(updateData)
    if (!updateData.generalCancellationPolicy) {
      console.log('No general cancellation policy selected')
      return
    }

    if (!updateData.lateCancellationPolicyTime) {
      console.log('No time frame selected for late cancellation policy')
      return
    }

    if (!updateData.lateCancellationPolicyCharge) {
      console.log('No charge amount selected for late cancellation policy')
      return
    }
    

    try {
      const result = await axios.patch('/api/items', { updateData, itemId })
    console.log("********result******")
    console.log(result)

    router.push(`/create-a-listing/${itemId}/add-late-return-policy`)

    } catch (err){
      console.log(err)
    }                          
  }

  return (

    <div className='h-screen flex flex-col'>
      <NavBarCreateItem />
      <div className='w-full h-fit flex-1 overflow-auto' >
        <div className='medium-container'>
          {/* <h1 className='heading'>Select your cancellation policy for {itemName}</h1>
          <p className='secondary-text mb-5'>You may add a general cancellation policy and a late cancellation policy</p> */}

          <form id='cancellation-policy-form' className='flex flex-col' onSubmit={handleSubmit(onSubmit)}> 
            <h1 className='heading mb-2'>General Cancellation Policy</h1>
            <p className='secondary-text'>The general cancellation policy is in effect immediately one a booking has been made. </p>
            <h3 className='primary-text my-4'>Select what percentage of the booking should be charged for cancellations in general</h3>

            <input className='hidden' type="text" {...register('generalCancellationPolicy')} />
            <div className='sm:w-[80%] mx-auto'>
              <div className='my-5 grid grid-cols-1 sm:grid-cols-5 gap-2'>
                {cancellationPolicyCharge.reverse().map((policy)=>(
                  <div className='min-w-[140px] sm:min-w-[50px]'>
                    <ButtonContent 
                      key={policy.name} 
                      variant='reducedPadding'
                      buttonName={policy.name} 
                      isSelected={isSelected1 === policy.name} 
                      onSelectHandler={onSelectHandler1}
                    >
                      <h4 className='primary-text text-center'>{policy.title}</h4>
                      {/* <p className='secondary-text text-center leading-loose'>Bug</p> */}
                    </ButtonContent>
                  </div>
                ))}
              </div>
            </div>

            <h1 className='heading mt-10 mb-2'>Late cancellation policy</h1>
            <p className='secondary-text'>The late cancellation option is intended to be stricter to compensate for missed opportunities due to the item being booked. You can choose how close to the pickup date you would like to enforce the late cancellation policy and what percent is charged. </p>
            
            <h4 className='primary-text my-4'>Activate late cancellation if pick-up time is within...</h4>
            <input className='hidden' type="text" {...register('lateCancellationPolicyTime')} />
            <div className='sm:w-[80%] mx-auto'>
              <div className='my-5 grid grid-cols-2 sm:grid-cols-4 gap-2'>
                {cancellationPolicyTime.map((policy)=>(
                  <ButtonContent 
                    key={policy.name} 

                    buttonName={policy.name} 
                    isSelected={isSelected2 === policy.name} 
                    onSelectHandler={onSelectHandler2}
                  >
                    <h4 className='primary-text text-center'>{policy.title}</h4>
                    {/* <p className='secondary-text leading-snug'>{policy.description}</p> */}
                  </ButtonContent>
                ))}
              </div>
            </div>

            

            <h4 className='primary-text my-4'>The percentage of the booking to be charged for late cancellation is...</h4>
            <input className='hidden' type="text" {...register('lateCancellationPolicyCharge')} />
            <div className='sm:w-[80%] mx-auto'>
              <div className='my-5 grid grid-cols-1 sm:grid-cols-5 gap-2'>
                {cancellationPolicyCharge.reverse().map((policy)=>(
                  <div className='min-w-[140px] sm:min-w-[50px]'>
                <ButtonContent 
                  key={policy.name} 
                  variant='reducedPadding'
                  buttonName={policy.name} 
                  isSelected={isSelected3 === policy.name} 
                  onSelectHandler={onSelectHandler3}
                >
                  <h4 className='primary-text text-center'>{policy.title}</h4>
                  {/* <p className='secondary-text leading-snug'>{policy.description}</p> */}
                </ButtonContent>
                  </div>
                  ))}
                </div>
              </div>
          </form>

          <label className="inline-block relative">
            <input type="checkbox" className=' ' onChange={handleCustomPolicyChange}/>
            <span className="slider round"></span>
            <p className='inline'>Disable late cancellation policy &#40;not reccomended&#41;</p>
          </label>

          <p className='secondary-text my-2 underline'>Notes</p>
          <ol>
            <li key='1' className='secondary-text leading-snug my-2 ml-4 list-disc'>There is always a compulsary allowance of 24hours after a booking has been made that a customer is allowed to cancel without any cancellation fees. We believe customers should never be punished for making a mistake during a booking if they act fast to fix it. This 24 hour allowance drops down to 1 hour if a same day booking.</li>
            <li key='2' className='secondary-text leading-snug my-2 ml-4 list-disc'>It is advised to have a late cancellation policy as a minimum to discourage reckless booking of your item</li>
            <li key='3' className='secondary-text leading-snug my-2 ml-4 list-disc'>Having a custom policy will not be handled automatically by xxxx and can only be enforced by dispute claim resolution process which may take a significant time and is not required to apply your contract.</li>
            <li key='4' className='secondary-text leading-snug my-2 ml-4 list-disc'>To understand more about cancellation policies read here or contact a representative </li>
          </ol>
          
        </div>
      </div>
        <FooterCreateItem formId='cancellation-policy-form' prevRoute={`/create-a-listing/${itemId}/add-cancellation-policy`}  />
    </div>
  )
}

export default AddCancellationPolicy