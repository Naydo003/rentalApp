import React, { useState, useContext } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { ItemContext } from '../../../common/contexts/item-context'
import NavBarCreateItem from '../../../modules/create-item/components/NavBarCreateItem'
import FooterCreateItem from '../../../modules/create-item/components/FooterCreateItem'
import ButtonContent from '../../../common/ButtonContent'
import { useForm } from 'react-hook-form'
import { lateReturnPolicies } from '@/common/utilities/enumerables'

function AddLateReturnPolicyPage() {
  const [isSelected, setIsSelected] = useState(null)
  let router = useRouter()
  const { itemId, itemName } = useContext(ItemContext)
  const { register, handleSubmit, setValue } = useForm()

  
  const onSelectHandler = (buttonName) => {
    // const buttonName = "asGoodAsNew"

    if (isSelected === buttonName) {
      setIsSelected(null)
      setValue('lateReturnPolicy', null)
    } else {
      setIsSelected(buttonName)
      setValue('lateReturnPolicy', buttonName)
    }
  }

  const onSubmit = async (updateData) => {
    console.log('updateData')

    console.log(updateData)
    if (!updateData.lateReturnPolicy) {
      console.log('No policy selected')
      return
    }

    try {
      const result = await axios.patch('/api/items', { updateData, itemId })
    console.log("********result******")
    console.log(result)

    router.push(`/create-a-listing/${itemId}/add-insurance`)

    } catch (err){
      console.log(err)
    }                          
  }

  return (
    <div className='h-screen flex flex-col'>
      <NavBarCreateItem />
      <div className='w-full h-fit flex-1 overflow-auto' >
        <div className='small-container'>
          <h1 className='heading'>Which late return policy would you like for {itemName}?</h1>

          <form id='add-late-return-policy-form' className='flex flex-col' onSubmit={handleSubmit(onSubmit)}> 
            <input className='hidden' type="text" {...register('lateReturnPolicy')} />
            <div className='flex flex-col gap-2'>

              {lateReturnPolicies.map((policy)=>(
                <ButtonContent 
                  key={policy.name} 

                  buttonName={policy.name} 
                  isSelected={isSelected === policy.name} 
                  onSelectHandler={onSelectHandler}
                >
                  <h4 className='primary-text text-center mb-2'>{policy.title}</h4>
                  <p className='secondary-text leading-snug'>{policy.description}</p>
                </ButtonContent>
              ))}

            </div>

          </form>
          
          <p className='secondary-text my-2 underline'>Notes</p>
          <ol>
            <li className='secondary-text leading-snug my-2 ml-4 list-disc'>If charging for each additional hour an item is returned late, it is xxxx policy to allow 15 minutes after the set time. This is to avoid any trifiling charges.</li>
            <li className='secondary-text leading-snug my-2 ml-4 list-disc'>Policies which charge on a per hour basis will use the hourly price if available otherwise it will be calculated as the day rate / 12</li>
            <li className='secondary-text leading-snug my-2 ml-4 list-disc'>If charging for each additional day an item is returned late, it is xxxx policy to allow 1 hour after the set time. This is to avoid any trifiling charges. Make sure to shedule the return time to account for this. </li>
            <li className='secondary-text leading-snug my-2 ml-4 list-disc'>Policies which charge on a per day basis are only possible if a day rate is available and the customer has held an item for more than 8 hours. If not the policy will default to "Per Hour"</li>
            <li className='secondary-text leading-snug my-2 ml-4 list-disc'>Policies with penalty rates are intended for businesses where items may be booked back to back and there is a cost to sourcing replacement item or prices fluctuate</li>
            <li className='secondary-text leading-snug my-2 ml-4 list-disc'>Note that the preset policies above will be automatically triggered by the xxxx app, however you have the final say and can either confirm or dismiss the enforcement of the late-return-policy. </li>
            <li className='secondary-text leading-snug my-2 ml-4 list-disc'>Having a custom policy will not be handled automatically by xxxx and can only be enforced by dispute claim resolution process which may take a significant time and is not required to apply your contract. A custom policy of no late payment is not advised.</li>
            <li className='secondary-text leading-snug my-2 ml-4 list-disc'>To understand more about late-return policies read here or contact a representative </li>
          </ol>
          
        </div>
      </div>
        <FooterCreateItem formId='add-late-return-policy-form' prevRoute={`/create-a-listing/${itemId}/add-cancellation-policy`}  />
    </div>
  )
}

export default AddLateReturnPolicyPage