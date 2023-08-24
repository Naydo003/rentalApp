import { UserContext } from '@/common/contexts/user-context'
import React, { useContext } from 'react'
import Review from './Review'

function ReviewsModal({reviews, setModalContent}) {
  const {accountName} = useContext(UserContext)

  return (
    <div className='p-0 lg:p-10'>
      <h2>{reviews.length} reviews for {accountName}</h2>
      
      <div className='overflow-y-scroll overflow-x-hidden z-20 scrollbar-thin scrollbar-track-gray-400/40 scrollbar-thumb-mainColour-100/80' >
        <div className='' >
          <ul className='relative flex flex-col  '>
            {reviews.map((review, index) => (
              <Review key={review.id} review={review} index={index} total={reviews.length} />
            ))}
          </ul>
          <div className='relative' >
            <button type='button' onClick={()=>{setModalContent(null)}} >
              Cancel
            </button>
          </div>
        </div>
        
      </div>

    </div>  
  )
}

export default ReviewsModal