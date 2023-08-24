import ButtonMain from '@/common/ButtonMain'
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import Review from './Review'
import ReviewCard from './ReviewCard'
import ReviewsModal from './ReviewsModal'



function ReviewsSlider({reviews, name, setModalContent}) {
  const sliderRef = useRef(null)
  const [sliderPosition, setSliderPosition] = useState(0)
  const [carouselWidth, setCarouselWidth] = useState(null)
  // const [currentSlide, setCurrentSlide] = useState(0)


  // console.log('carouselWidth')
  // console.log(carouselWidth)

  // console.log('sliderPosition')
  // console.log(sliderPosition)

  let cardWidth = 0.48 * carouselWidth
  let cardMargin = 0.02 * carouselWidth
  let slidesInView = 2

  // console.log('cardWidth')
  // console.log(cardWidth)

  
  
  useEffect(() => {
    function handleWindowResize() {
      setCarouselWidth(sliderRef.current?.clientWidth)
      
    }
    
    window.addEventListener('resize', handleWindowResize);
    
    handleWindowResize()
    
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);
  
  
  const currentSlide = useMemo(() => {
    return Math.round(sliderPosition / (cardWidth + cardMargin))
  }, [sliderPosition, cardWidth, cardMargin])
  
  console.log('currentSlide')
  console.log(currentSlide)


  const prevReview = () => {
    console.log('prev')
    console.log(sliderRef.current)
    console.log(currentSlide)
    // scrollToReview(sliderRef.current, currentSlide - 1)
    if (sliderRef) {
      sliderRef.current.scrollTo({
        left: (currentSlide - 1) * (cardWidth + cardMargin),
        behavior: "smooth"
      })
      // setCurrentSlide(Math.round(sliderPosition / (cardWidth + cardMargin)))
    }
  }
  
  const nextReview = () => {
    console.log('next')
    console.log(sliderRef.current)
    console.log(currentSlide)
    console.log(reviews.length, slidesInView)
    console.log('(currentSlide + 1) * (cardWidth + cardMargin)')
    console.log((currentSlide + 1) * (cardWidth + cardMargin))
    console.log('cardWidth, cardMargin')
    console.log(cardWidth, cardMargin)


    // scrollToReview(sliderRef.current, currentSlide + 1)
    if (sliderRef) {
      sliderRef.current.scrollTo({
        left: (currentSlide + 1) * (cardWidth + cardMargin),
        behavior: "smooth"
      })
      // setCurrentSlide(Math.round(sliderPosition / (cardWidth + cardMargin)))
    }
  }


  return (
    <div className='w-full my-4'>
      <div className='flex flex-row justify-between' >
        <h2 className='subheading mr-4'>What others are saying about {name}</h2>
        <div className='flex flex-row space-x-2' >
          <button disabled={currentSlide === 0} className='rounded-full w-10 h-10 border border-mainBlack-100 flex items-center justify-center hover:border-2 disabled:hover:border disabled:opacity-40' onClick={prevReview} >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
            </svg>
            <span className='sr-only'>Previous Review</span>
          </button>
          <button disabled={currentSlide === (reviews.length - slidesInView)} className='rounded-full w-10 h-10 border border-mainBlack-100 flex items-center justify-center hover:border-2 disabled:hover:border disabled:opacity-40' onClick={nextReview} >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
            </svg>
            <span className='sr-only'>Next Review</span>
          </button>
        </div>
      </div>
      <div id='slider-container' className='relative mt-8 w-full h-64 overflow-hidden z-0' >
        {reviews.length === 0 ? 
          <div className='w-full h-full flex justify-center items-center' >
            <p className='object-center border inline-block'>No reviews yet</p>
          </div>
           :
          <div className='h-60 overflow-hidden' >
            <ul 
              ref={sliderRef} 
              className='relative h-64 flex overflow-x-scroll overflow-y-hidden snap-x snap-mandatory z-20 scrollbar-thin scrollbar-track-gray-400/40 scrollbar-thumb-mainColour-100/80'
              onScroll={(ev) => {
                setSliderPosition(ev.currentTarget.scrollLeft)
              }}
            >
              {reviews.map((review, index)=>{
  
                return <ReviewCard key={review.id} review={review} index={index} total={reviews.length} />
              })}
            </ul>
          </div>
        }
      </div>
      <div className=' -mt-6 mb-6' >
        <ButtonMain 
          classNames='w-fit'
          variant='blackWhite'
          onSubmit={() => setModalContent(<ReviewsModal setModalContent={setModalContent} reviews={reviews} />)} 
        >
          See all {reviews.length} reviews
        </ButtonMain>
      </div>
      
      

    </div>
  )
}

export default ReviewsSlider