import ButtonMain from '@/common/ButtonMain';
import React, { useEffect, useState } from 'react'
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useRouter } from 'next/router';
import PriceCalc from '@/modules/rentee-booking/PriceCalc';
import Image from 'next/image';
import { categoriesTitleMap, conditionTitleMap } from '@/common/utilities/enumerables';





function BookingPanelDisplayOnly({booking, item, pickUpDateTime, returnDateTime}) {

  const router = useRouter()




  return (
    <div className='h-80 border border-gray-600'>

      <div className='flex flex-row my-5'>
        <div className='w-32 h-32 ml-5' >
          <div className='relative h-full overflow-hidden' >
            <Image 
              src={item.itemPhotos[0].imageUrl}
              className="object-cover -z-10"
              fill
              alt='escort image'
            />
  
          </div>
  
          
          {!item.itemPhotos.length && 
            <div className='border border-gray-400 text-center flex flex-col justify-center items-center content-center'>
              <p>
                No Photo
              </p>
            </div>
          }
        </div>
        <div className='flex flex-col justify-between mx-4' >
          <div className='' >
            <p>{categoriesTitleMap[item.category]}</p>
            <h3 className='subheading'>{item.name}</h3>
          </div>
          
          <p className=''>{conditionTitleMap[item.condition]}</p>
        </div>
        
      </div>

      <div className='border-t mx-5 py-5' >
      <div className='' >
        <p>{booking.itemAgreedRate}</p>         
      </div>
      <div className='' >
        <p>${booking.expectedTransactionCost}</p>
      </div>
      <div className='' >
        <p>${booking.agreedDeposit}</p>
      </div>
    </div>
    </div>
  )
}

export default BookingPanelDisplayOnly