import React from 'react'
import { useRouter } from 'next/router'
import NavBarCreateItem from '../../../components/NavBarCreateItem'
import FooterCreateItem from '../../../components/create-item-forms/FooterCreateItem'

function AddPhotosPage() {


  let router = useRouter()
  const itemId = 5
  
  const nextButtonHandler = () => {
    console.log('launch axios request then redirect to ...')

    router.push(`/create-a-listing/${itemId}/add-pricing-plan`)
  }

  return (
    <div className='h-screen flex flex-col'>
      <NavBarCreateItem />
      <div className='w-full h-fit flex-1 overflow-auto' >
        <div className='medium-container'>
          <h1 className='heading'>Add some pictures</h1>
          <p className='secondary-text'>We suggest a couple of nice ones to start and finish with any highlighting the items condition. Max 8 photo's</p>

        


        </div>
      </div>
        <FooterCreateItem nextButtonHandler={nextButtonHandler} prevRoute={`/create-a-listing/${itemId}/add-location`}  />
    </div>
  )
}

export default AddPhotosPage