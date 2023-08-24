import { categoriesTitleMap, conditionTitleMap } from '@/common/utilities/enumerables';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react'

function ItemCard({item}) {
  const router = useRouter();

  console.log(item.photos)

  return (
    <div className='relative h-[250px] border-2 border-mainBlack-100 overflow-hidden' key={item.id} onClick={()=>{ router.push(`/${item.id}`)}} >
      {item.itemPhotos?.length ? 
        <Image 
        src={item.itemPhotos[0]?.imageUrl}
        className="object-cover -z-10"
        fill
        alt='item image'
        /> :
        <div className='absolute object-cover -z-10 h-full w-full flex flex-col justify-center items-center'>
          <p className=''>No Photo</p>
        </div>
      }
      <p className='mx-2 mt-2'>{categoriesTitleMap[item.category]}</p>

      <div className='absolute bottom-0 w-full bg-white/50' >
        <h3 className='primary-text-sm mx-2 mt-2'>{item.name}</h3>

        <div className='m-2 flex flex-row justify-between' >
          <div className='flex flex-col mt-auto mb-0' >
            <p className='secondary-text-sm'>{conditionTitleMap[item.condition]}</p>
          </div>
          
          <div className='flex flex-col w-20' >
            {item.rentPerHour && <p className='secondary-text-sm text-right'>${item.rentPerHourPrice} /Hour</p>}
            {item.rentPerDay && <p className='secondary-text-sm text-right'>${item.rentPerDayPrice} /Day</p>}
          </div>
          
        </div>
        
      </div>
      


    </div>
  )
}

export default ItemCard