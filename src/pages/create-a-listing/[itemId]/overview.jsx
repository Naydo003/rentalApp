import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import NavBarCreateItem from '../../../modules/create-item/components/NavBarCreateItem'
import FooterCreateItem from '../../../modules/create-item/components/FooterCreateItem'
import { ItemContext } from '../../../common/contexts/item-context'
import MapUI from '../../../common/components/UIElements/MapUI'


function Overview() {

  let router = useRouter()
  const { itemId, itemName } = useContext(ItemContext)

  const nextButtonHandler = () => {
    console.log('launch axios request then redirect to ...')

    router.push(`/create-a-listing/${itemId}/details`)

  }


  return (
    // <div className='h-screen w-screen'>

    //   <MapUI zoom={10} center='{ lat: 44, lng: -80 }' />
    // </div>

    <div className='h-screen flex flex-col'>
      <NavBarCreateItem />
      <div className='small-container flex-1 overflow-auto'>
        <h1 className='heading'>Overview</h1>
        <p>You are about to create {itemName}</p>



      </div>
      <FooterCreateItem nextButtonHandler={nextButtonHandler} prevRoute='/create-a-listing'  />

    </div>
  )
}

export default Overview