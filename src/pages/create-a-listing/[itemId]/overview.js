import React from 'react'
import { useRouter } from 'next/router'
import NavBarCreateItem from '../../../components/NavBarCreateItem'
import FooterCreateItem from '../../../components/create-item-forms/FooterCreateItem'


function Overview() {

  let router = useRouter()
  const itemId = 5
  
  const nextButtonHandler = () => {
    console.log('launch axios request then redirect to ...')

    router.push(`/create-a-listing/${itemId}/details`)

  }


  return (
    <div className='h-screen flex flex-col'>
      <NavBarCreateItem />
      <div className='medium-container flex-1 overflow-auto'>
        <h1 className='heading'>Become A Renter</h1>



      </div>
      <FooterCreateItem nextButtonHandler={nextButtonHandler} prevRoute='/create-a-listing'  />

    </div>
  )
}

export default Overview