import Image from 'next/image'
import React, { useEffect, useState } from 'react'

function ReviewCard({review}) {
  const [ reviewDate, setReviewDate ] = useState(null)

  // Need to do this as when it loads client side it will be a different date to that generated at the server = hydration error
  useEffect(() => {
    setReviewDate((new Date(review.createdAt)).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric'}))
  },[])

  return (
    <li className='snap-start shrink-0 flex flex-col justify-between border-2 rounded-3xl mr-[2%] last:mr-0 h-52 w-[98%] min-[900px]:w-[48%] p-6'>
      <p className='mb-4 line-clamp-3'>"{review.publicComment}"</p>

      <div className='flex flex-row w-[240px]' >
        <div className='relative border rounded-full overflow-hidden w-16 h-16'>
          <Image
            src={review.author.userAccount.profilePictureUrl || 'https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png'}
            className="object-cover -z-10"
            fill
            sizes="(max-width: 768px) 25vw, 10vw"
            alt='item image'
          />
        </div>
        <div className='ml-4 my-auto' >
          <h5 className='border truncate'>{review.author.userAccount.name}</h5>
          <p className=''>{reviewDate}</p>
        </div>
        
      </div>
      
    </li>
  )
}

export default ReviewCard