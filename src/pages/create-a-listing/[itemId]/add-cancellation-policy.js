import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import NavBarCreateItem from '../../../components/NavBarCreateItem'
import FooterCreateItem from '../../../components/create-item-forms/FooterCreateItem'


function AddCancellationPolicy() {


    let router = useRouter()
    const itemId = 5
    
    const nextButtonHandler = () => {
      console.log('launch axios request then redirect to ...')
  
      router.push(`/create-a-listing/${itemId}/add-late-return-policy`)
    }



  return (
    <div className='h-screen flex flex-col'>
      <NavBarCreateItem />
      <div className='w-full h-fit flex-1 overflow-auto' >
        <div className='medium-container'>
          <h1 className='heading'>What condition is the item in?</h1>


        </div>
      </div>
        <FooterCreateItem nextButtonHandler={nextButtonHandler} prevRoute={`/create-a-listing/${itemId}/add-pricing-plan`}  />
    </div>
 
)
}

export default AddCancellationPolicy