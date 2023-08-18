import ButtonMain from '@/common/ButtonMain';
import React, { useEffect, useState } from 'react'
import { DateRange } from 'react-date-range';
import { useForm } from 'react-hook-form';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { VALIDATOR_REQUIRE } from '@/common/utilities/validators';
import TimeSelector from '@/common/components/FormElements/TimeSelector';
import { useRouter } from 'next/router';
import PriceCalce from './PriceCalc';
import PriceCalc from './PriceCalc';
import Image from 'next/image';
import { categoriesTitleMap, conditionTitleMap } from '@/common/utilities/enumerables';





function BookingPanel2({item, pickUpDateTime, returnDateTime, setAgreedPrice, setAgreedRate}) {

  const router = useRouter()

  const onClickHandler = () => {

      router.push({
        pathname: `/${item.id}/book`,
        query: {
          pickUpDateTime: bookingData.pickUpTime,
          returnDateTime: bookingData.returnTime
        }
      })                                       
  }

  return (
    <div className='h-80 border border-gray-600'>

      <div className='flex flex-row my-5'>
        <div className='w-32 h-32 ml-5' >
          <div className='relative h-full overflow-hidden' key={item.itemPhotos[0].id} >
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

      <PriceCalc item={item} pickUpDateTime={pickUpDateTime} returnDateTime={returnDateTime} setAgreedRate={setAgreedRate} setAgreedPrice={setAgreedPrice} />
    </div>
  )
}

export default BookingPanel2