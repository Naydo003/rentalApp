import React, { useEffect, useState } from 'react'

function PriceCalc({prices, pickUpDateTime, returnDateTime, setAgreedRate, setAgreedPrice}) {
  const calcDuration = () => {
  
    let duration = (returnDateTime - pickUpDateTime)/1000/60/60

    console.log(duration)
  
    return duration
  }
  const [ duration, setDuration ] = useState(calcDuration())
  const [ price, setPrice ] = useState()
  const [ rate, setRate ] = useState()

  console.log('PriceCalc DateTimes')
  console.log(pickUpDateTime)
  console.log(returnDateTime)

  
  const calcPrice = () => {
    let priceEstimate
    if (prices.rentPerHour) {
      priceEstimate = Math.ceil(duration) * prices.rentPerHourPrice
      setRate(`$${prices.rentPerHourPrice} per Hour for ${Math.ceil(duration)} hours`)
      setAgreedRate(`${prices.rentPerHourPrice}/Hour`)
    } 
    
    if (prices.rentPerDay){
      let priceEstimate2 = Math.ceil(duration / 24) * prices.rentPerDayPrice 
      if (priceEstimate2 <= priceEstimate) {
        setRate(`$${prices.rentPerDayPrice} per Day for ${Math.ceil(duration / 24)} days`)
        setAgreedRate(`${prices.rentPerDayPrice}/Day`)
        priceEstimate = priceEstimate2
      }
    } 
    
    if (prices.rentPerWeek){
      let priceEstimate2 = Math.ceil(duration / 24 / 7) * prices.rentPerWeekPrice 
      if (priceEstimate2 <= priceEstimate) {
        setRate(`$${prices.rentPerWeekPrice} per Week for ${Math.ceil(duration / 24 / 7)} weeks`)
        setAgreedRate(`${prices.rentPerWeekPrice}/Week`)
        priceEstimate = priceEstimate2
      }
    } 
    
    setAgreedPrice(priceEstimate)
    return priceEstimate
  }

  useEffect(() => {
    setDuration(calcDuration())
    setPrice(calcPrice())
  }, [pickUpDateTime, returnDateTime])



  return (
    <div className='border-t mx-5 py-5' >
      <div className='' >
        <p>{rate}</p>         
      </div>
      <div className='' >
        <p>${price}</p>
      </div>
    </div>
  )
}

export default PriceCalc