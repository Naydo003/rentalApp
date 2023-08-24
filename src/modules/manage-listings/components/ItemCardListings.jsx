
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';

import { useRouter } from 'next/router';
import Image from 'next/image';
// import Modal from '@/common/components/UIElements/Modal';

// import { pad } from '@/modules/booking/utils/booking-utility-functions';



function ItemCardListings({item}) {



  let userRenterId = 5

  const router = useRouter()

  const createdOn = new Date(item.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric'})

  
  return (
    <>

      <div className='h-24 w-full flex flex-row relative ' onClick={() => {router.push(`/manage-listings/${item.id}/item-details`)}}>
        <div className='relative overflow-hidden w-24 h-24 rounded-xl shrink-0'>
          <Image
            src={item.itemPhotos[0]?.imageUrl || 'https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png'}
            className="object-cover"
            fill
            sizes="(max-width: 768px) 25vw, 10vw"
            alt='item image'
          />
        </div>
        <div className='px-5 flex flex-col justify-between' >
          <p className='subheading text-lg mb-0'>{item.name}</p>
          <p className='paragraph-text grow'>Created: {createdOn}</p>
          <div className='flex flex-row space-x-2 mb-1' >
            {item.rentPerHour && <p className='secondary-text-sm text-right'>${item.rentPerHourPrice} /Hour</p>}
            {item.rentPerDay && <p className='secondary-text-sm text-right'>${item.rentPerDayPrice} /Day</p>}
            {item.rentPerWeek && <p className='secondary-text-sm text-right'>${item.rentPerWeekPrice} /Week</p>}

          </div>
        </div>
        <div className='flex flex-col justify-center items-center space-y-1' >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="red" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
          <p className='primary-text text-center'>Notices go here</p>
        </div>
        
          <div className='absolute -top-1 -left-1 h-4 w-4 rounded-full overflow-hidden border outline outline-offset-1'>
            <div className={item.active ? 'bg-green-300 h-full w-full' : 'bg-orange-300 h-full w-full'} >
              {/* <p>{item.active ? 'ACTIVE' : 'INACTIVE'}</p> */}
            </div>
          </div>
        
      </div>
    </>
  )
  
}

export default ItemCardListings