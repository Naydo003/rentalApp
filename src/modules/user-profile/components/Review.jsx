import Image from 'next/image'
import React, { useEffect, useState } from 'react'

function Review({review}) {
  const [ reviewDate, setReviewDate ] = useState(null)

  // Need to do this as when it loads client side it will be a different date to that generated at the server = hydration error
  useEffect(() => {
    setReviewDate((new Date(review.createdAt)).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric'}))
  },[])


  return (
    <li className='shrink-0 flex flex-col justify-between py-6 border-b mb-5'>

      <div className='flex flex-row' >
        <div className='relative border rounded-full w-16 h-16 overflow-hidden'>
          <Image
            src={review.author?.userAccount?.profilePictureUrl || review.item?.itemPhotos[0]?.imageUrl || 'https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png'}
            className="object-cover -z-10"
            fill
            sizes="(max-width: 768px) 25vw, 10vw"
            alt='item image'
          />
        </div>
        <div className='ml-4 flex flex-col justify-between' >
          <div className='flex flex-row items-center space-x-2' >
            <h5 className='primary-text text-lg truncate'>{review.author?.userAccount?.name || review.item?.name }</h5>
            <p className='secondary-text-sm'>{reviewDate}</p>
          </div>
          <p className='secondary-text-sm my-4 line-clamp-3'>"{review.publicComment}"</p>
        </div>
        
      </div>
      
    </li>
  )
}

export default Review