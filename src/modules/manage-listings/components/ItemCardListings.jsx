
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';

import { useRouter } from 'next/router';
// import Modal from '@/common/components/UIElements/Modal';

// import { pad } from '@/modules/booking/utils/booking-utility-functions';



function ItemCardListings({item}) {



  let userRenterId = 5

  const router = useRouter()


  
  return (
    <>
      {/* {!!modalContent && (
        <Modal isOpen={!!modalContent} handleClose={() => setModalContent(null)} >
          {modalContent}
        </Modal>
      )} */}

      <div className='h-[80px] w-full border grid grid-cols-5 gap-x-4 relative' onClick={() => {router.push(`/manage-listings/${item.id}/item-details`)}}>
        <p className='text-lg'>{item.name}</p>
        {/* <p className=''>Date: {pad(startTime.getDate()) + '/' + pad(startTime.getMonth()+1) + '/' + startTime.getFullYear()}</p> */}
        


        <div className='bg-[rd]'>
          <div className={'h-8 w-24 ' + (item.active ? 'bg-green-300' : 'bg-orange-300')} >
            <p>{item.active ? 'ACTIVE' : 'INACTIVE'}</p>
          </div>
        </div>
      </div>
    </>
  )
  
}

export default ItemCardListings